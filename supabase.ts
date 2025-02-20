import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.DATABASE_URL || "L",
  process.env.DATABASE_KEY || "k"
);
