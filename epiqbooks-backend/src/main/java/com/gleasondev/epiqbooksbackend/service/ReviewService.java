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


    // Post Review Function
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());

        if (validateReview != null) {
            throw new Exception("You have already reviewed this book");
        }
        // create a new review
        Review review = new Review();
        // set the book id to the request id
        review.setBookId(reviewRequest.getBookId());
        // set the rating to the request rating
        review.setRating(reviewRequest.getRating());
        // set the user email to the request email
        review.setUserEmail(userEmail);
        // if the request has a review description, change it to a string and save it to the DB after setting the date
        if (reviewRequest.getReviewDescription().isPresent()) {
            // allows us to copy all the data from the optional to our string
            review.setReviewDescription(reviewRequest.getReviewDescription().map(Objects::toString).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    // See if a user has already left a review or not
    public Boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateReview != null;
    }


}


