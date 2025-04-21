export interface Organization {
  id: string;
  name: string;
  domain?: string;
  logo_url?: string;
  settings?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Team {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  is_system_role: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  created_at: Date;
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  created_at: Date;
}

export interface MFAType {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  phone?: string;
  location?: string;
  department?: string;
  role_id?: string;
  organization_id?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  avatar_url?: string;
  email_verified: boolean;
  reset_token?: string;
  reset_token_expires?: Date;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserMFA {
  id: string;
  user_id: string;
  mfa_type_id: string;
  identifier?: string;
  secret?: string;
  is_primary: boolean;
  is_verified: boolean;
}

export interface UserSession {
  id: string;
  user_id: string;
  token: string;
  created_at: Date;
}

export interface SecurityEvent {
  id: string;
  user_id: string;
  event_type: string;
  created_at: Date;
}

export interface UserLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  created_at: Date;
}