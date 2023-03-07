package com.gleasondev.epiqbooksbackend.service;


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.entity.Checkout;
import com.gleasondev.epiqbooksbackend.entity.History;
import com.gleasondev.epiqbooksbackend.repository.BookRepository;
import com.gleasondev.epiqbooksbackend.repository.CheckoutRepository;
import com.gleasondev.epiqbooksbackend.repository.HistoryRepository;
import com.gleasondev.epiqbooksbackend.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    private HistoryRepository historyRepository;

    //Constructor for our book service ( this is called Constructor  Dependency Injection)
    // this sets up our book repository and checkout repository so we can use them in our service
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
    }

    //    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
//
//        Optional<Book> book = bookRepository.findById(bookId);
//
//        //we only want a user to be able to check out a single book one time
//        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
//
//
//        // checking to see if the book is available, the user doesnt currently have it checked out, and if the book exists
//        if (book.isEmpty() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
//            throw new Exception("Book not found or Already Checked Out by user!");
//        }
//
//        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
//        // update to DB
//        bookRepository.save(book.get());
//
//        // this is our checkout object that we will save to the DB
//        Checkout checkout = new Checkout(
//                userEmail,
//                // this is saying whats todays date and that it needs to be returned in 7 days
//                LocalDate.now().toString(),
//                LocalDate.now().plusDays(7).toString(),
//                book.get().getId()
//
//        );
//
//        // save to DB
//        checkoutRepository.save(checkout);
//
//        return book.get();
//
//
//    }
    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        if (book.isEmpty() || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book not found or Already Checked Out by user!");
        }

        Checkout existingCheckout = checkoutRepository.findByUserEmailAndBook(userEmail, book.get());
        if (existingCheckout != null) {
            throw new Exception("Book already checked out by user!");
        }

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get()
        );

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());
        checkoutRepository.save(checkout);

        return book.get();


    }

    // verify if book is checked out by the user or not
    public Boolean isBookCheckedOut(String userEmail, Long bookId) {
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        return checkout != null;
    }

    // find out how many books are checked out by a user
//    public Integer currentLoansCount(String userEmail) {
//        return checkoutRepository.findBooksByUserEmailAndBook(userEmail, book).size();
//    }

    public Integer currentLoansCount(String userEmail) {
        List<Checkout> checkouts = checkoutRepository.findByUserEmail(userEmail);
        return checkouts.size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        // get a list of all the books that are checked out by the user
        List<Checkout> checkoutList = checkoutRepository.findByUserEmail(userEmail);

        List<Long> bookIdList = new ArrayList<>();
        for (Checkout checkout : checkoutList) {
            bookIdList.add(checkout.getBookId());
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (Book book : books) {
            // c is going to be each item in our checkoutList
            // finds a checkout that matches the book id

            Optional<Checkout> checkout = checkoutList.stream()
                                                      .filter(c -> c.getBookId() != null && c.getBookId()
                                                                                             .equals(book.getId()))
                                                      .findFirst();

            if (checkout.isPresent()) {
                // creates the date the book is to be returned and a date for today
                Date date1 = simpleDateFormat.parse(checkout.get().getReturnDate());
                Date date2 = simpleDateFormat.parse(LocalDate.now().toString());

                TimeUnit timeUnit = TimeUnit.DAYS;
                long differenceInTime = timeUnit.convert(date1.getTime() - date2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) differenceInTime));
            }
        }
        return shelfCurrentLoansResponses;

    }

    // RETURN BOOK
    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (book.isEmpty() || validateCheckout == null) {
            throw new BookNotFoundException("Book id " + bookId + " not found in database!");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        bookRepository.save(book.get());

        checkoutRepository.deleteById(validateCheckout.getId());

        // Saves new history record into the DB
        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                book.get().getTitle(),
                book.get().getAuthor(),
                book.get().getDescription(),
                book.get().getImg()

        );
        history.setBook(book.get());
        historyRepository.save(history);


    }

    // RENEW A BOOK
    public void renewBook(String userEmail, Long bookId) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout == null) {
            throw new Exception("Book not found or not checked out by user!");
        }
        // checks to make sure the book is not passed the due date
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = simpleDateFormat.parse(validateCheckout.getReturnDate());
        Date date2 = simpleDateFormat.parse(LocalDate.now().toString());

        // Adds 7 days to the return date if the book is not past the due date
        if (date1.compareTo(date2) > 0 || date1.compareTo(date2) == 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);


        }
    }

    public static class BookNotFoundException extends RuntimeException {
        public BookNotFoundException(String message) {
            super(message);
        }
    }
}
