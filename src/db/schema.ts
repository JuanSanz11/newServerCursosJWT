import { uuid, pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import { uniqueIndex, timestamp } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('users_role', [
  'student',
  'manager'
])

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().unique(),
  password: text().notNull(),
  role: userRole('role').notNull().default('student')

});

export const courses = pgTable("courses", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull().unique(),
  description: text('description').notNull(),
});


export const enrollments = pgTable(
  'enrollments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    courseId: uuid('course_id').notNull().references(() => courses.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('enrollment_unique').on(table.userId, table.courseId),
  ]
);

