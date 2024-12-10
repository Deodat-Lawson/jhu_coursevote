CREATE TABLE IF NOT EXISTS "click_to_punch_nlp_courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"teacher" varchar(256) NOT NULL,
	"course_code" varchar(256) NOT NULL,
	"image_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP INDEX IF EXISTS "unique_user_image_rating";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "click_to_punch_nlp_courses" ADD CONSTRAINT "click_to_punch_nlp_courses_image_id_click_to_punch_nlp_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."click_to_punch_nlp_image"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "course_image_id_idx" ON "click_to_punch_nlp_courses" USING btree ("image_id");