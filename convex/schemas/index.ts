import { defineSchema, defineTable } from 'convex/server';
import { TableClientSchema } from './client';

export default defineSchema({
  clients: defineTable(TableClientSchema),
});
