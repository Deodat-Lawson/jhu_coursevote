// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
    index,
    text,
    integer,
    pgTableCreator, serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `click_to_punch_nlp_${name}`);

export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", {  length: 256 }).notNull(),
    url: varchar("url", { length: 256 }).notNull(),

    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);



export const comments = createTable(
    "comment",
    {
        id: serial("id").primaryKey(),
        content: text("content").notNull(),
        imageId: integer("image_id").notNull().references(() => images.id, {
            onDelete: "cascade" // This will delete comments when the parent image is deleted
        }),
        userId: varchar("user_id", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
            () => new Date()
        ),
    },
    (comment) => ({
        // Index for faster comment lookups by image
        imageIndex: index("image_id_idx").on(comment.imageId),
        // Index for faster comment lookups by user
        userIndex: index("user_id_idx").on(comment.userId),
    })
);


