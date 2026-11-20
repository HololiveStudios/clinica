-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Users table (base table for authentication)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_type TEXT CHECK(user_type IN ('admin', 'doctor', 'patient', 'staff')) NOT NULL
);

-- Doctors table
CREATE TABLE doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    crm TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    phone TEXT,
    working_days TEXT, -- JSON array of working days
    working_hours TEXT, -- JSON object with start and end times
    consultation_duration INTEGER DEFAULT 30, -- in minutes
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Patients table
CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    full_name TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    gender TEXT CHECK(gender IN ('M', 'F', 'Other')),
    phone TEXT,
    address TEXT,
    emergency_contact TEXT,
    blood_type TEXT,
    allergies TEXT,
    medical_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT CHECK(status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')) NOT NULL,
    appointment_type TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Medical Records table
CREATE TABLE medical_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    appointment_id INTEGER,
    record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    symptoms TEXT,
    diagnosis TEXT,
    treatment TEXT,
    prescription TEXT,
    notes TEXT,
    follow_up_date DATE,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Prescriptions table
CREATE TABLE prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medical_record_id INTEGER NOT NULL,
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    duration TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id)
);

-- Clinic Settings table
CREATE TABLE clinic_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notification Templates table
CREATE TABLE notification_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_name TEXT UNIQUE NOT NULL,
    template_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Initial clinic settings
INSERT INTO clinic_settings (setting_key, setting_value) VALUES
    ('clinic_name', 'MedClinic'),
    ('working_hours_start', '08:00'),
    ('working_hours_end', '18:00'),
    ('appointment_duration', '30'),
    ('weekend_working', 'false'),
    ('notification_email_enabled', 'true'),
    ('notification_sms_enabled', 'true'),
    ('notification_whatsapp_enabled', 'true');

-- Initial notification templates
INSERT INTO notification_templates (template_name, template_content) VALUES
    ('appointment_confirmation', 'Olá {patient_name}, sua consulta com Dr(a). {doctor_name} está confirmada para {date} às {time}.'),
    ('appointment_reminder', 'Lembrete: Você tem uma consulta amanhã às {time} com Dr(a). {doctor_name}.'),
    ('appointment_cancellation', 'Sua consulta do dia {date} às {time} foi cancelada. Entre em contato para reagendamento.');