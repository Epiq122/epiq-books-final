package com.gleasondev.epiqbooksbackend.service;


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.entity.Checkout;
import com.gleasondev.epiqbooksbackend.repository.BookRepository;
import com.gleasondev.epiqbooksbackend.repository.CheckoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    //Constructor for our book service ( this is called Constructor  Dependency Injection)
    // this sets up our book repository and checkout repository so we can use them in our service
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {

        Optional<Book> book = bookRepository.findById(bookId);

        //we only want a user to be able to check out a single book one time
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);


        // checking to see if the book is available, the user doesnt currently have it checked out, and if the book exists
        if(book.isEmpty() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book not found or Already Checked Out by user!");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        // update to DB
        bookRepository.save(book.get());

        // this is our checkout object that we will save to the DB
        Checkout checkout = new Checkout(
                userEmail,
                // this is saying whats todays date and that it needs to be returned in 7 days
                LocalDate.now().toString(),
            LocalDate.now().plusDays(7).toString(),
                book.get().getId()

        );

        // save to DB
        checkoutRepository.save(checkout);

            return book.get();



    }

    // verify if book is checked out by the user or not
    public Boolean isBookCheckedOut(String userEmail, Long bookId) {
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        return checkout != null;
    }

    // find out how many books are checked out by a user
    public Integer currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }
}
