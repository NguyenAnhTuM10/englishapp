-- Enable pgcrypto for gen_random_uuid() used in all tables
CREATE EXTENSION IF NOT EXISTS pgcrypto;
