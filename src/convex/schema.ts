import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  convexCategoryEnum,
  convexDifficultyEnum,
} from "@/convex/agents/prompts/types";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    access: v.optional(v.boolean()),
    waitlist: v.optional(v.boolean()),
    admin: v.optional(v.boolean()),
  }).index("by_user_id", ["userId"]),
  threadMetadata: defineTable({
    title: v.string(),
    threadId: v.string(),
    userId: v.string(),
    updatedAt: v.number(),
    state: v.union(
      v.literal("idle"),
      v.literal("waiting"),
      v.literal("streaming"),
    ),
    category: v.optional(convexCategoryEnum),
    pinned: v.optional(v.boolean()),
    followUpQuestions: v.optional(v.array(v.string())),
  })
    .index("by_user_time", ["userId", "updatedAt"])
    .index("by_thread_id", ["threadId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["userId"],
    }),
  messageMetadata: defineTable({
    messageId: v.string(),
    threadId: v.string(),
    userId: v.string(),
    category: convexCategoryEnum,
    difficulty: convexDifficultyEnum,
    model: v.string(),
    inputTokens: v.number(),
    outputTokens: v.number(),
    inputCost: v.number(),
    outputCost: v.number(),
    otherCost: v.number(),
    totalCost: v.number(),
  }).index("by_user_thread", ["userId", "threadId"]),
});
