
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const UserAnswer = pgTable("user_answer", {
  id: serial("id").primaryKey(),
  mockIdref:varchar("mockId"),
  question:varchar("question" ),
  correctAns:text('correctAns'),
  userAns:text("userAns"),
  feedback:text("feedback"),
  rating: varchar("rating"),
  createdAt: varchar("createdAt"),
  userEmail: varchar("userEmail")
});