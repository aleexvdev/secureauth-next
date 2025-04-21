CREATE TABLE user_mfa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mfa_type_id UUID REFERENCES mfa_types(id) ON DELETE CASCADE,
    identifier VARCHAR(255),
    secret TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE
);