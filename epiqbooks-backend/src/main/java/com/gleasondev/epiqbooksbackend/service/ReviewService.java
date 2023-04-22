package com.gleasondev.epiqbooksbackend.service;


import com.gleasondev.epiqbooksbackend.entity.Review;
import com.gleasondev.epiqbooksbackend.repository.ReviewRepository;
import com.gleasondev.epiqbooksbackend.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;


    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;
    }


    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());

        if (validateReview != null) {
            throw new Exception("You have already reviewed this book");
        }

        Review review = new Review();

        review.setBookId(reviewRequest.getBookId());

        review.setRating(reviewRequest.getRating());

        review.setUserEmail(userEmail);

        if (reviewRequest.getReviewDescription().isPresent()) {

            review.setReviewDescription(reviewRequest.getReviewDescription().map(Objects::toString).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }


    public Boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateReview != null;
    }


}


