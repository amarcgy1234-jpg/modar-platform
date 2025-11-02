// /.netlify/functions/chat
export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) return json(400, { error: "message is required" });

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "أنت معاون عقاري ذكي يرد بإيجاز وبالعربية الفصحى." },
          { role: "user", content: message }
        ],
        temperature: 0.3
      })
    });

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content?.trim()
               || "تم الاستلام وسأعودك بالتفاصيل.";
    return json(200, { reply });
  } catch (e) {
    return json(500, { error: e.message || "server error" });
  }
}

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});
