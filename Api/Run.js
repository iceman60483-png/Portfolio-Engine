export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
        max_output_tokens: 1000
      })
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({ error: text });
    }

    const data = JSON.parse(text);

    const output =
      data.output?.[0]?.content?.[0]?.text ||
      "No output returned";

    res.status(200).json({ output });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}