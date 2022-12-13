package com.gleasondev.epiqbooksbackend.repository;

import com.gleasondev.epiqbooksbackend.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    // find out how many books are checked out by a user
    List<Checkout>findBooksByUserEmail(String userEmail);

}



