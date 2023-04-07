package com.gleasondev.epiqbooksbackend.controller;


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.responsemodels.ShelfCurrentLoansResponse;
import com.gleasondev.epiqbooksbackend.service.BookService;
import com.gleasondev.epiqbooksbackend.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin("http://localhost:3000") // to prevent coors error
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;


    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans")
    public ResponseEntity<List<ShelfCurrentLoansResponse>> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        List<ShelfCurrentLoansResponse> currentLoans = bookService.currentLoans(userEmail);
        return new ResponseEntity<>(currentLoans, HttpStatus.OK);
    }


    @GetMapping("/secure/currentloans/count")


    public Integer currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        return bookService.currentLoansCount(userEmail);
    }


    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId, @RequestHeader(value = "Authorization") String token) {
//        String userEmail = "gordontest@email.com";
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.isBookCheckedOut(userEmail, bookId);
    }


    @PutMapping("/secure/checkout")
    public ResponseEntity<Book> checkoutBook(@RequestParam Long bookId, @RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        Book book = bookService.checkoutBook(userEmail, bookId);
        URI location = URI.create("/api/books/" + book.getId());
        return ResponseEntity.created(location).body(book);

    }


    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.returnBook(userEmail, bookId);
    }


    @PutMapping("/secure/renew/loan")
    public void renewBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.renewBook(userEmail, bookId);
    }


}

