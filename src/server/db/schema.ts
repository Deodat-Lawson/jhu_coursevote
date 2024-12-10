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
    uniqueIndex,
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


export const ratings = createTable(
    "rating",
    {
        id: serial("id").primaryKey(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        rating: integer("rating")
            .notNull(),// Constrains rating to 1-5
        imageId: integer("image_id")
            .notNull()
            .references(() => images.id, {
                onDelete: "cascade" // Delete ratings when parent image is deleted
            }),
        userId: varchar("user_id", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
            () => new Date()
        ),
    },
    (rating) => ({
        // Index for faster rating lookups by image
        imageIndex: index("rating_image_id_idx").on(rating.imageId),
        // Index for faster rating lookups by user
        userIndex: index("rating_user_id_idx").on(rating.userId),

        // Unique constraint to prevent multiple ratings from same user on same image
        // uniqueRating: uniqueIndex("unique_user_image_rating").on(rating.userId, rating.imageId),
    })
);


export const courses = createTable(
    "courses",
    {
        id: serial("id").primaryKey(),
        title: varchar("title", { length: 256 }).notNull(),
        imageId: integer("image_id")
            .references(() => images.id, { onDelete: "set null" }),
        teacher: varchar("teacher", { length: 256 }).notNull(),
        courseNumber: varchar("course_number", { length: 256 }).notNull(),
        description: text("description").notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
            () => new Date()
        ),
    }
);
