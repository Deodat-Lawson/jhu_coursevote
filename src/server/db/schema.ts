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
        courseId: integer("course_id")
            .notNull()
            .references(() => courses.id, {
                onDelete: "cascade", // Delete comments when the parent course is deleted
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
        // Index for faster comment lookups by course
        courseIndex: index("course_id_idx").on(comment.courseId),
        // Index for faster comment lookups by user
        userIndex: index("user_id_idx").on(comment.userId),
    })
);


export const ratings = createTable(
    "rating",
    {
        id: serial("id").primaryKey(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        rating: integer("rating").notNull(), // Constrain rating as needed (e.g., 1-5)
        courseId: integer("course_id")
            .notNull()
            .references(() => courses.id, {
                onDelete: "cascade", // Delete ratings when the parent course is deleted
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
        // Index for faster rating lookups by course
        courseIndex: index("rating_course_id_idx").on(rating.courseId),
        // Index for faster rating lookups by user
        userIndex: index("rating_user_id_idx").on(rating.userId),

        // Unique constraint (optional) to prevent multiple ratings
        // from the same user on the same course
        // uniqueRating: uniqueIndex("unique_user_course_rating").on(rating.userId, rating.courseId),
    })
);


export const courses = createTable(
    "courses",
    {
        id: serial("id").primaryKey(),
        title: varchar("title", { length: 256 }).notNull(),
        imageUrl: varchar("url", { length: 512 }).notNull(),
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
