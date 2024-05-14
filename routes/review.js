import {
    getReviewByPK,
    getReviews,
    getReviewByDrama,
    createReview,
    updateReview,
    incrementLike,
    decrementLike,
} from "../controllers/review.js";
import express from "express";
const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/incrementLike/reviewId=:reviewId", incrementLike);
reviewRouter.post("/decrementLike/reviewId=:reviewId", decrementLike);
reviewRouter.get("/reviewId=:reviewId", getReviewByPK);
reviewRouter.get("/dramas/dramaId=:dramaId", getReviewByDrama);
reviewRouter.post("/", createReview);
reviewRouter.post("/reviewId:reviewId", updateReview);

export default reviewRouter;
