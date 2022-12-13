package com.gleasondev.epiqbooksbackend.controller;
// This is out API endpoint that will be calling our books service


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.service.BookService;
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
    public Integer currentLoansCount() {
        String userEmail = "gordontest@email.com";

        return bookService.currentLoansCount(userEmail);
    }


    // checkout book by user
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId){
        String userEmail = "gordontest@email.com";
        return bookService.isBookCheckedOut(userEmail, bookId);
    }




    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId) throws Exception  {
        String userEmail = "gordontest@email.com";
        return bookService.checkoutBook(userEmail, bookId);
    }

    }

