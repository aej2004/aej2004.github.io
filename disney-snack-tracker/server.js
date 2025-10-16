const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

main();

async function main() {
  mongoose.connect(`mongodb://localhost/snackdb`);

  app.use(express.json());  
  app.use(cors());            

  const snackSchema = new mongoose.Schema({
    name: {type: String, required: true},
    park: {type: String, required: true},
    type: {type: String, required: true, default: "Unknown"},
    rating: {type: Number, required: true, default: 0}
  });

  const Snack = mongoose.model("Snack", snackSchema);

  snacks = {1:{"name": "Churro", "park": "Magic Kingdom", "type": "Dessert", "rating": 3},
            2:{"name": "Dole Whip", "park": "Magic Kingdom", "type": "Dessert", "rating": 5}
  }

  /**
   * POST /snacks
   * Create a new snack
   * Request body: { name, park, type, rating }
   */
  app.post("/snacks", async function(req, res) {
    snack = await Snack.create(req.body);
    res.send({"name": snack.name, "park": snack.park, "type": snack.type, "rating": snack.rating});
  });

  /**
   * PUT /snacks/:id
   * Modify a snack’s details
   * Example: PUT /snacks/123 with body { rating: 5 }
   */
  app.put("/snacks/:id", async function(req, res) {
    newSnack = req.body;
    id = req.params.id;
    snack = await Snack.findById(id);

    if (snack) {
      await Snack.updateOne({_id: id}, {$set: newSnack});
      snack = await Snack.findById(id);
      res.send ({"name": snack.name, "park": snack.park, "type": snack.type, "rating": snack.rating});
    } else {
      res.status(404).send({error: "Snack not found"});
    }

  });

  /**
   * GET /snacks
   * Fetch all snacks
   */
  app.get("/snacks", async function(req, res) {
    snacks = await Snack.find();
    res.send(snacks);
  });

  // Start server
  app.listen(3000, function() {
    console.log(`Disney Snack Tracker API running on http://localhost:3000/`);
  });
}