import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    username: v.string(),
    content: v.string(),
    imageUrl: v.string(),
    createdAt: v.number(),
  }),
  users: defineTable({
    name: v.string(),
    password: v.string(),
  }),
});