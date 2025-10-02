import axios from "axios";

// -------------------- Chatbot (Rasa) --------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Replace this with your actual Rasa Render URL
    const rasaURL = "https://e-commerce-website-with-rasa-ai-chatbot-8.onrender.com";

    const response = await axios.post(rasaURL, {
      sender: "user1", // you can use user id from auth
      message: message,
    });

    res.json(response.data);
  } catch (err) {
    console.error("Rasa connection failed:", err.message);
    res.status(500).json({ error: "Failed to connect to Rasa" });
  }
});
