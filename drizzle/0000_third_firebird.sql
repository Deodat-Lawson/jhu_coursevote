CREATE TABLE IF NOT EXISTS "click_to_punch_nlp_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"image_id" integer NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "click_to_punch_nlp_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"url" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "click_to_punch_nlp_comment" ADD CONSTRAINT "click_to_punch_nlp_comment_image_id_click_to_punch_nlp_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."click_to_punch_nlp_image"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "image_id_idx" ON "click_to_punch_nlp_comment" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "click_to_punch_nlp_comment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "click_to_punch_nlp_image" USING btree ("name");