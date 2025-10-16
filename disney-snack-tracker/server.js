const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());            // Allow requests from your HTML frontend
app.use(express.json());    // Parse JSON bodies

/**
 * POST /snacks
 * Create a new snack
 * Request body: { name, park, type, rating }
 */
app.post("/snacks", (req, res) => {
  const { name, park, type, rating } = req.body;

  if (!name || !park) {
    return res.status(400).json({ error: "Name and park are required!" });
  }

  const newSnack = {
    id: snacks.length ? snacks[snacks.length - 1].id + 1 : 1,
    name,
    park,
    type: type || "Unknown",
    rating: rating || 0
  };

  snacks.push(newSnack);
  res.status(201).json(newSnack);
});

/**
 * PUT /snacks/:id
 * Modify a snack’s details
 * Example: PUT /snacks/123 with body { rating: 5 }
 */
app.put("/snacks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, park, type, rating } = req.body;

  const snack = snacks.find(s => s.id === id);
  if (!snack) {
    return res.status(404).json({ error: "Snack not found!" });
  }

  snack.name = name ?? snack.name;
  snack.park = park ?? snack.park;
  snack.type = type ?? snack.type;
  snack.rating = rating ?? snack.rating;

  res.json(snack);
});

/**
 * GET /snacks
 * Fetch all snacks
 */
app.get("/snacks", (req, res) => {
  res.json(snacks);
});

// Start server
app.listen(PORT, () => {
  console.log(`🍭 Disney Snack Tracker API running on http://localhost:${PORT}`);
});
