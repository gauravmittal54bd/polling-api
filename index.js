const express = require('express');
require('./connection/db_connection');
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');


const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
global.serverUrl = process.env.SERVER_URL || `http://localhost:${port}`;

app.use(express.json());

const swaggerSpec = require('./swaggerUi/swaggerConfig');

// Use the routes
app.use('/questions', questionRoutes);
app.use('/options', optionRoutes);

// Set up Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, (err) => {
    console.log(`server running at : ${serverUrl}`);
});


