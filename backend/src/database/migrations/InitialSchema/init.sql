CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('ADMIN', 'OWNER', 'DRIVER');
CREATE TYPE account_status AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');
CREATE TYPE vehicle_status AS ENUM ('PENDING_APPROVAL', 'AVAILABLE', 'LEASED', 'MAINTENANCE');
CREATE TYPE lease_status AS ENUM ('PENDING_REQUIREMENTS', 'ACTIVE', 'NOTICE_SENT', 'TERMINATED');
CREATE TYPE incident_type AS ENUM ('DEFECT', 'ACCIDENT', 'SCHEDULED_SERVICE');
CREATE TYPE incident_status AS ENUM ('REPORTED', 'IN_REPAIR', 'RESOLVED');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    status account_status DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    make_model_year VARCHAR(150) NOT NULL,
    license_plate VARCHAR(30) UNIQUE NOT NULL,
    document_urls TEXT[] DEFAULT '{}',
    status vehicle_status DEFAULT 'PENDING_APPROVAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE,
    daily_rate DECIMAL(10, 2) NOT NULL,
    security_deposit DECIMAL(10, 2) NOT NULL,
    deposit_refunded DECIMAL(10, 2) DEFAULT 0.00,
    status lease_status DEFAULT 'PENDING_REQUIREMENTS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lease_id UUID REFERENCES leases(id) ON DELETE CASCADE,
    amount_due DECIMAL(10, 2) NOT NULL,
    late_fee DECIMAL(10, 2) DEFAULT 0.00,
    is_paid BOOLEAN DEFAULT FALSE,
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lease_id UUID REFERENCES leases(id) ON DELETE RESTRICT,
    reported_by UUID REFERENCES users(id) ON DELETE RESTRICT,
    type incident_type NOT NULL,
    description TEXT NOT NULL,
    liable_cost DECIMAL(10, 2) DEFAULT 0.00,
    status incident_status DEFAULT 'REPORTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_leases_status ON leases(status);
CREATE INDEX idx_invoices_unpaid ON invoices(lease_id) WHERE is_paid = FALSE;
CREATE INDEX idx_incidents_status ON incidents(status);