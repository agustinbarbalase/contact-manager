CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "username" VARCHAR(80) NOT NULL UNIQUE,
  "password" VARCHAR(80) NOT NULL,
  CONSTRAINT "id_users" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "contacts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "name" VARCHAR(80) NOT NULL,
  "description" VARCHAR(120),
  "phone" VARCHAR(20) NOT NULL,
  "email" VARCHAR(80),
  CONSTRAINT "id_contacts" PRIMARY KEY ("id"),
  CONSTRAINT "id_users_fk" FOREIGN KEY ("user_id") REFERENCES users("id")
);

-- https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql
CREATE TABLE IF NOT EXISTS "sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
) WITH (OIDS=FALSE);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire"); 