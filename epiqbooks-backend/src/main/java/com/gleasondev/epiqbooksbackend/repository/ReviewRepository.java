package com.gleasondev.epiqbooksbackend.repository;

import com.gleasondev.epiqbooksbackend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {


    //Find reviews by book id
    Page<Review> findByBookId(@RequestParam("id") Long bookId, Pageable pageable);

    //Find by user email and book id
    Review findByUserEmailAndBookId(String userEmail, Long bookId);
}