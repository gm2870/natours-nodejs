const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get('/:id', reviewController.getReview);

router
    .get('/', reviewController.getAllReviews)
    .post(
        '/',
        authController.restrictsTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview
    );

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(
        authController.restrictsTo('user', 'admin'),
        reviewController.updateReview
    )
    .delete(
        authController.restrictsTo('user', 'admin'),
        reviewController.deleteReview
    );
module.exports = router;
