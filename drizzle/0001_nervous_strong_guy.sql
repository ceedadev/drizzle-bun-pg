CREATE TABLE IF NOT EXISTS "tenants" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
