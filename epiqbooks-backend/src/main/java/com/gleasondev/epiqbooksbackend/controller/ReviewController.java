package com.gleasondev.epiqbooksbackend.controller;


import com.gleasondev.epiqbooksbackend.requestmodels.ReviewRequest;
import com.gleasondev.epiqbooksbackend.service.ReviewService;
import com.gleasondev.epiqbooksbackend.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000") // to prevent coors error
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User not found");
        }
        return reviewService.userReviewListed(userEmail, bookId);
    }


    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token, @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User not found");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
}

