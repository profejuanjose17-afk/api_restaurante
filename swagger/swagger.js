const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Restaurante",
            version: "1.0.0",
            description: "API REST para gestión de reservaciones"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);