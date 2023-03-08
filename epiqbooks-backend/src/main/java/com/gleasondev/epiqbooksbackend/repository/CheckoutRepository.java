package com.gleasondev.epiqbooksbackend.repository;

import com.gleasondev.epiqbooksbackend.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBook_Id(String userEmail, Long bookId);

    // find out how many books are checked out by a user
    List<Checkout> findBooksByUserEmail(String userEmail);

    // to delete a book and all of checkout repositories associated with it
    // we modify the record because we are going to delete it
    @Modifying
    @Query("delete from Checkout where book_id in :book_id")
    void deleteAllByBookId(@Param("book_id") Long bookId);

}



