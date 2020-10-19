const express = require('express');
const app = express();
const morgan = require('morgan');

require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/games', gameRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})