CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"completed_at" timestamp,
	"deleted_at" timestamp
);
