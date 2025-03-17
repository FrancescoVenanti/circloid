"use server";

import { supabase } from "@/lib/supabase";
import { List } from "postcss/lib/list";

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

export async function getSponsor(): Promise<any[]> {
  try {
    const data = await fetch(
      "https://developers.buymeacoffee.com/api/v1/supporters",
      {
        headers: {
          Authorization: `Bearer ${process.env.COFFEE_TOKEN}`,
        },
      }
    );
    const result = await data.json();
    return result.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
