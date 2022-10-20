const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const Review = require('../../models/reviewModel');
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const importData = async () => {
    try {
        await Review.create(reviews);
        console.log('data imported!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
    } catch (error) {
        console.log(error);
    }
    process.exit();
};
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
