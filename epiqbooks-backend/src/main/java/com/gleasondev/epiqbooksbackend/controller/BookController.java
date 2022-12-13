package com.gleasondev.epiqbooksbackend.controller;
// This is out API endpoint that will be calling our books service


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.service.BookService;
import com.gleasondev.epiqbooksbackend.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000") // to prevent coors error
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
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
    public Boolean checkoutBookByUser(@RequestParam Long bookId, @RequestHeader(value = "Authorization") String token) {
//        String userEmail = "gordontest@email.com";
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.isBookCheckedOut(userEmail, bookId);
    }


    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId, @RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBook(userEmail, bookId);
    }

    }

