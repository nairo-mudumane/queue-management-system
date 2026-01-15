import { v } from 'convex/values';

export const TABLE_TIMESTAMPS = {
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
  deletedAt: v.optional(v.string()),
};
