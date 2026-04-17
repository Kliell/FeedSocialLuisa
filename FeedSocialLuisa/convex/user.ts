import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: { username: v.string(), content: v.string(), imageUrl: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", {
      username: args.username,
      content: args.content,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});

export const getPosts = query({
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});