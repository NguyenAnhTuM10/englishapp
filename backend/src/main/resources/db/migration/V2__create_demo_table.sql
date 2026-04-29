CREATE TABLE demo_pings (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    message     TEXT        NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
