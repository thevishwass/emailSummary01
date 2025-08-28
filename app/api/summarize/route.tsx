import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emailText } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY!}`,
        "Content-Type": "application/json",
        // Optional headers
        "HTTP-Referer": process.env.SITE_URL || "",
        "X-Title": process.env.SITE_NAME || ""
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are an AI assistant that summarizes emails clearly and concisely. Summarize the following email in a short paragraph. Use bullet points only if there are multiple tasks, deadlines, or key items that are easier to read as a list. Do not add extra commentary. " },
          { role: "user", content: `Summarize this email:\n\n${emailText}` }
        ]
      })
    });

    const data = await response.json();
    const summary = data?.choices?.[0]?.message?.content ?? "No summary generated.";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to summarize email." }, { status: 500 });
  }
}
