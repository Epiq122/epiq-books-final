package com.gleasondev.epiqbooksbackend.repository;


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {


    Checkout findByUserEmailAndBook(String userEmail, Book book);

    List<Checkout> findCheckoutByBook(Book book);

    List<Checkout> findByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where book = :book")
    void deleteAllByBook(Book book);


}
