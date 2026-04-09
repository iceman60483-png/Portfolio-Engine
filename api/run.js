export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: req.body.prompt || "Say hello"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      output: JSON.stringify(data, null, 2)
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}