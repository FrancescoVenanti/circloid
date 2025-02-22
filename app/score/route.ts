import { supabase } from "@/supabase";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from("score")
    .select()
    .order("score", { ascending: false })
    .limit(10);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ scores: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase.from("score").insert([body]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase.from("score").delete().match({ id });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ message: "Record deleted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
