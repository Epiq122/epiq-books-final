package com.gleasondev.epiqbooksbackend.repository;

import com.gleasondev.epiqbooksbackend.entity.Checkout;
import com.gleasondev.epiqbooksbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserAndBookId(User user, Long bookId);

    List<Checkout> findByUser(User user);

    @Modifying
    @Query("delete from Checkout where book_id in :book_id")
    void deleteAllByBookId(@Param("book_id") Long bookId);

}



