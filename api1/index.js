const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { user } = req.body;
  if (!user)
    return res.status(400).send({ error: "El campo 'user' es requerido" });

  try {
    const response = await axios.post("http://api2:3001", { user });
    const count = response.data.count;
    return res.json({ count });
  } catch (error) {
    console.error("Error en la comunicación con la API2:", error.message);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API1 corriendo en el puerto ${PORT}`));
