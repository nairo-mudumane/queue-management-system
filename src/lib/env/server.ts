import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
  CONVEX_DEPLOYMENT: z.string().min(1),
});

export const SERVER_ENV = serverEnvSchema.parse(process.env);
