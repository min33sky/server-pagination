import { z } from 'zod';

const Environment = z.object({
  TMDB_READ_ACCESS_TOKEN: z.string(),
});

export type Environment = z.infer<typeof Environment>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}
