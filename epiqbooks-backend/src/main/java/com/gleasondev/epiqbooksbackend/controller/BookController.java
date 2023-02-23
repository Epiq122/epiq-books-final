

package com.gleasondev.epiqbooksbackend.controller;
// This is out API endpoint that will be calling our books service


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.responsemodels.ShelfCurrentLoansResponse;
import com.gleasondev.epiqbooksbackend.service.BookService;
import com.gleasondev.epiqbooksbackend.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000") // to prevent coors error
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token)
            throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.currentLoans(userEmail);
    }


    @GetMapping("/secure/currentloans/count")

    // this is expecting something in the request header that has a key of authorization and pass it into a variable
    // called token
    public Integer currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        return bookService.currentLoansCount(userEmail);
    }


    // checkout book by user
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestBody Book book, @RequestHeader(value = "Authorization") String token) {
//        String userEmail = "gordontest@email.com";
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.isBookCheckedOut(userEmail, book);
    }


    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Book book, @RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBook(userEmail, book);
    }

    // RETURN BOOK
    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token, @RequestParam Book book) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.returnBook(userEmail, book);
    }

    // RENEW BOOK
    @PutMapping("/secure/renew/loan")
    public void renewBook(@RequestHeader(value = "Authorization") String token, @RequestParam Book book) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.renewBook(userEmail, book);
    }
}
