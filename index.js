require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/client");
const mesaRoutes = require("./routes/mesa.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/mesas", mesaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});