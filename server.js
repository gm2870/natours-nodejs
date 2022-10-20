const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtExeption', (err) => {
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const server = app.listen(3001);

process.on('unhandledRejection', (err) => {
    server.close(() => {
        process.exit(1);
    });
});
