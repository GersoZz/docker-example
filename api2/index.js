const express = require("express");
const mongoose = require("mongoose");

// Conexión a MongoDB usando mongoose
const MONGO_URL = "mongodb://mongodb:27017/testdb";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// Definimos el modelo de la colección
const userSchema = new mongoose.Schema({ user: String });
const User = mongoose.model("User", userSchema);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).send({ error: "User is required" });

  try {
    // Insertamos el usuario en la base de datos
    await User.create({ user });

    // Contamos cuántas veces aparece el usuario en la colección
    const count = await User.countDocuments({ user });

    // Devolvemos la cuenta al cliente
    return res.json({ count });
  } catch (error) {
    console.error("Error handling request:", error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API2 running on port ${PORT}`));
