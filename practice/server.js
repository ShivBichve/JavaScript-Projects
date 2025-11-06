import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generateSignature", async (req, res) => {
  const { walletAddress } = req.body;
  const response = await fetch("https://www.harmonybot.xyz/api/warplet/generateSignature/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));