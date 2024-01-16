import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

app.use(express.json());
app.use(cors());

const featuresSchema = new mongoose.Schema({
  icon: String,
  title: String,
  text: String,
});

const featuresModel = mongoose.model("features", featuresSchema);

app.get("/features", async (req, res) => {
  try {
    const allFeatures = await featuresModel.find({});
    res.status(200).json(allFeatures);
  } catch (error) {
    res.send("Features are not found!");
  }
});

app.get("/features/:id", async (req, res) => {
  const { id } = req.params;
  const feature = await featuresModel.findById(id);
  res.send(feature);
});

app.post("/features", async (req, res) => {
  try {
    const { icon, title, text } = req.body;
    const newFeatures = new featuresModel({ icon, title, text });
    await newFeatures.save();
    res.send("Features are created!");
  } catch (error) {
    res.send("Features aren't created!");
  }
});

app.put("/features/:id", async (req, res) => {
  const { id } = req.params;
  const { icon, title, text } = req.body;
  const feature = await featuresModel.findByIdAndUpdate(id, {
    icon,
    title,
    text,
  });
  res.send(feature);
});

app.delete("/features/:id", async (req, res) => {
  const { id } = req.params;
  const feature = await featuresModel.findByIdAndDelete(id);
  res.send(feature);
});

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
