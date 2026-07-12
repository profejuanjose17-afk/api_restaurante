require("dotenv").config();

const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/client");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API Restaurante funcionando"
    });
});

const PORT = process.env.PORT || 3000;

async function conectarBD() {
    try {
        await prisma.$connect();
        console.log("Base de datos conectada.");
    } catch (error) {
        console.error(error);
    }
}

conectarBD();

async function prueba() {
    const mesas = await prisma.mesas.findMany();
    console.log(mesas);
}

prueba();

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});