require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mesaRoutes = require("./routes/mesa.routes");
const authRoutes = require("./routes/auth.routes");
const reservacionRoutes = require("./routes/reservacion.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/mesas", mesaRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/reservaciones", reservacionRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});