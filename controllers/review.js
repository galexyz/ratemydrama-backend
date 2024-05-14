import Review from "../models/review.js";

export const getReviews = (req, res, next) => {
    Review.findAll()
        .then((reviews) => {
            res.status(200).json({ reviews: reviews });
        })
        .catch((e) => console.log(e));
};

// get review by drama
export const getReviewByDrama = (req, res, next) => {
    const dramaId = req.params.dramaId;
    Review.findAll({
        where: { dramaId: dramaId },
        // include: [Drama],
    })
        .then((reviews) => {
            res.status(200).json({ reviews: reviews });
        })
        .catch((e) => console.log(e));
};

export const incrementLike = (req, res) => {
    const reviewId = req.params.reviewId;
    console.log("reviewId", reviewId);
    Review.findByPk(reviewId)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }
            review.likes += 1;
            return review.save();
        })
        .then((r) => {
            res.status(200).json({ message: "review liked", review: r });
        })
        .catch((e) => console.log(e));
};

export const decrementLike = (req, res) => {
    const reviewId = req.params.reviewId;
    console.log("reviewId", reviewId);

    Review.findByPk(reviewId)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }
            review.likes -= 1;
            console.log(review);

            return review.save();
        })
        .then((r) => {
            res.status(200).json({
                message: "review like reverted",
                review: r,
            });
        })
        .catch((e) => console.log(e));
};

// get review by pk
export const getReviewByPK = (req, res, next) => {
    const reviewId = req.params.reviewId;
    Review.findByPk(reviewId)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review not found!" });
            }
            res.status(200).json({ review: review });
        })
        .catch((e) => console.log(e));
};

// create review
export const createReview = (req, res, next) => {
    const rating = req.body.rating;
    const dramaId = req.body.dramaId;
    const comment = req.body.comment;
    const time = req.body.time;
    Review.create({
        rating: rating,
        dramaId: dramaId,
        comment: comment,
        time: time,
    })
        .then((r) => {
            console.log("created review");
            res.status(201).json({
                message: "Review created successfully",
                review: r,
            });
        })
        .catch((e) => console.log(e));
};

export const updateReview = (req, res, next) => {
    const reviewId = req.body.reviewId;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const time = req.body.time;
    Review.findByPk(reviewId)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }
            review.rating = rating;
            review.comment = comment;
            review.time = time;
            return review.save();
        })
        .then((r) => {
            res.status(200).json({ message: "review updated", review: r });
        })
        .catch((e) => console.log(e));
};
