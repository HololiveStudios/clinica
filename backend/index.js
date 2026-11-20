const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./clinic.db');
const SECRET = 'clinicsafira';

app.use(express.json());

// Middleware para permitir requisições CORS (se necessário)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Update your CORS middleware to include Authorization header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Add the /me endpoint to get user info
app.get('/api/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    db.get('SELECT id, email, user_type as role FROM users WHERE id = ?', [decoded.id], (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    // Comparar a senha fornecida com a senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Rota de registro
app.post('/api/register', express.json(), async (req, res) => {
    const { email, password, user_type } = req.body;
  
    // Verificar se os campos obrigatórios estão presentes
    if (!email || !password || !user_type) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
  
    // Verificar se o user_type é válido
    if (user_type !== 'admin' && user_type !== 'atendente') {
      return res.status(400).json({ error: 'Tipo de usuário inválido' });
    }
  
    // Criptografar a senha antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Inserir usuário com a senha criptografada e o tipo de usuário
    db.run('INSERT INTO users (email, password_hash, user_type) VALUES (?, ?, ?)', [email, hashedPassword, user_type], function (err) {
      if (err) {
        console.error('Erro ao inserir no banco de dados:', err.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }
  
      console.log('Usuário registrado com sucesso:', this.lastID);
      res.status(201).json({ id: this.lastID, email, user_type });
    });
  });
  
// Rota para buscar paciente por nome ou CPF
app.get('/api/patient', (req, res) => {
  const searchTerm = req.query.searchTerm; // Recebe o termo de pesquisa

  // Realiza a consulta ao banco de dados
  db.get(
    'SELECT * FROM patients WHERE name LIKE ? OR cpf = ?',
    [`%${searchTerm}%`, searchTerm],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        res.json(row); // Retorna os dados do paciente
      } else {
        res.status(404).json({ message: 'Paciente não encontrado' });
      }
    }
  );
});

// Rota para buscar horários disponíveis
app.get('/api/timeSlots', (req, res) => {
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];
  res.json(timeSlots); // Retorna os horários disponíveis
});

// Rota para buscar médicos
app.get('/api/doctors', (req, res) => {
  db.all('SELECT * FROM doctors', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Retorna os dados dos médicos
  });
});

// Rota para buscar tipos de consulta
app.get('/api/appointmentTypes', (req, res) => {
  const appointmentTypes = [
    { id: 1, name: 'Consulta Geral', duration: 30 },
    { id: 2, name: 'Acompanhamento', duration: 15 },
    { id: 3, name: 'Consulta Especializada', duration: 45 },
    { id: 4, name: 'Emergência', duration: 60 }
  ];
  res.json(appointmentTypes); // Retorna os tipos de consulta
});

// Rota para obter os dados de appointments
app.get('/api/appointments', (req, res) => {
  const query = 'SELECT * FROM appointments'; // Altere conforme a estrutura do seu banco de dados

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Retorna os dados em formato JSON
  });
});

// Rota para adicionar um appointment (exemplo de inserção)
app.post('/api/appointments', express.json(), (req, res) => {
    const { doctor_id, patient_id, appointment_date, appointment_time, status, appointment_type, notes } = req.body;
  
    if (!doctor_id || !patient_id || !appointment_date || !appointment_time || !status || !appointment_type) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
  
    const created_at = new Date().toISOString(); // Data de criação do agendamento
  
    const query = `
      INSERT INTO appointments (
        doctor_id, 
        patient_id, 
        appointment_date, 
        appointment_time, 
        status, 
        appointment_type, 
        notes, 
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.run(query, [doctor_id, patient_id, appointment_date, appointment_time, status, appointment_type, notes, created_at], function (err) {
      if (err) {
        console.error('Erro ao inserir no banco de dados:', err.message);
        return res.status(500).json({ error: 'Erro interno ao registrar o agendamento' });
      }
  
      res.status(201).json({ id: this.lastID, doctor_id, patient_id, appointment_date, appointment_time, status, appointment_type, notes, created_at });
    });
  });
  

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
