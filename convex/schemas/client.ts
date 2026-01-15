import { v } from 'convex/values';
import { TABLE_TIMESTAMPS } from './timestamps';

export const TableClientSchema = {
  ...TABLE_TIMESTAMPS,
  name: v.string(),
};
