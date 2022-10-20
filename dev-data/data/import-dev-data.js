const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

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
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        await Tour.create(tours);
        console.log('data imported!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
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
