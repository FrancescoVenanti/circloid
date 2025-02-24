"use server";

import { supabase } from "@/supabase";

export async function getTopScores() {
  const { data, error } = await supabase
    .from("score")
    .select()
    .order("score", { ascending: false })
    .limit(10);

  if (error) throw new Error(error.message);
  return data;
}

export async function addScore(body: { name: string; score: number }) {
  const { data, error } = await supabase.from("score").insert([body]);

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteScore(id: string) {
  const { error } = await supabase.from("score").delete().match({ id });

  if (error) throw new Error(error.message);
  return { message: "Record deleted successfully" };
}
