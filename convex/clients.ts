import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { TableClientSchema } from './schemas/client';
import { getTimestamps } from './utils/table-timestamps';

export const createClient = mutation({
  args: TableClientSchema,
  async handler(ctx, args) {
    const timestamps = getTimestamps();
    const clientId = await ctx.db.insert('clients', { ...args, timestamps });
    return clientId;
  },
});

export const getClients = query({
  args: {},
  async handler(ctx) {
    // const now = new Date().toISOString();
    const data = await ctx.db
      .query('clients')
      .order('asc')
      // .filter((q) =>
      //   q.or(q.eq(q.field('deletedAt'), null), q.gte(q.field('deletedAt'), now))
      // )
      .collect();
    return data;
  },
});

export const deleteClient = mutation({
  args: { clientId: v.id('clients') },
  async handler(ctx, args) {
    const { clientId } = args;
    const now = new Date().toISOString();
    await ctx.db.patch(clientId, { deletedAt: now, updatedAt: now });
  },
});
