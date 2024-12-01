CREATE TABLE IF NOT EXISTS "click_to_punch_nlp_rating" (
	"id" serial PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"image_id" integer NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "click_to_punch_nlp_rating" ADD CONSTRAINT "click_to_punch_nlp_rating_image_id_click_to_punch_nlp_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."click_to_punch_nlp_image"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rating_image_id_idx" ON "click_to_punch_nlp_rating" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rating_user_id_idx" ON "click_to_punch_nlp_rating" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_image_rating" ON "click_to_punch_nlp_rating" USING btree ("user_id","image_id");