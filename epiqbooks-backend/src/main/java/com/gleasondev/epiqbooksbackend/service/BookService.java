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

    private final BookRepository bookRepository;
    private final CheckoutRepository checkoutRepository;

    private final HistoryRepository historyRepository;

    //Constructor for our book service ( this is called Constructor  Dependency Injection)
    // this sets up our book repository and checkout repository so we can use them in our service
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
    }

    public Book checkoutBook(String userEmail, Book book) throws Exception {

        Optional<Book> optionalBook = bookRepository.findById(book.getId());

        //we only want a user to be able to check out a single book one time
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBook(userEmail, optionalBook.get());

        // checking to see if the book is available, the user doesnt currently have it checked out, and if the book exists
        if (optionalBook.isEmpty() || validateCheckout != null || optionalBook.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book not found or Already Checked Out by user!");
        }

        optionalBook.get().setCopiesAvailable(optionalBook.get().getCopiesAvailable() - 1);
        // update to DB
        bookRepository.save(optionalBook.get());

        // this is our checkout object that we will save to the DB
        Checkout checkout = new Checkout(
                userEmail,
                // this is saying whats todays date and that it needs to be returned in 7 days
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                optionalBook.get()
        );

        // save to DB
        checkoutRepository.save(checkout);

        return optionalBook.get();


    }

    // verify if book is checked out by the user or not
    public Boolean isBookCheckedOut(String userEmail, Book book) {
        Checkout checkout = checkoutRepository.findByUserEmailAndBook(userEmail, book);
        return checkout != null;
    }

    // find out how many books are checked out by a user
    public Integer currentLoansCount(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        // get a list of all the books that are checked out by the user
        List<Checkout> checkoutList = checkoutRepository.findByUserEmail(userEmail);

        if (checkoutList.isEmpty()) {
            return new ArrayList<>();
        }

        List<Long> bookIdList = new ArrayList<>();
        for (Checkout checkout : checkoutList) {
            Book book = checkout.getBook();
            if (book != null) {
                bookIdList.add(book.getId());
            }
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (Book book : books) {
            // c is going to be each item in our checkoutList
            // finds a checkout that matches the book id

            Optional<Checkout> checkoutOptional = checkoutList.stream()
                                                              .filter(c -> c.getBook() != null && c.getBook().equals(book))
                                                              .findFirst();
            if (checkoutOptional.isPresent()) {
                Checkout checkout = checkoutOptional.get();
                // creates the date the book is to be returned and a date for today
                Date date1 = simpleDateFormat.parse(checkout.getReturnDate());
                Date date2 = simpleDateFormat.parse(LocalDate.now().toString());

                TimeUnit timeUnit = TimeUnit.DAYS;
                long differenceInTime = timeUnit.convert(date1.getTime() - date2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, checkout, (int) differenceInTime));
            }
        }
        return shelfCurrentLoansResponses;

    }

    // RETURN BOOK
    public void returnBook(String userEmail, Book book) throws Exception {
        Optional<Book> optionalBook = bookRepository.findById(book.getId());

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBook(userEmail, optionalBook.get());

        if (optionalBook.isEmpty() || validateCheckout == null) {
            throw new Exception("Book not found or not checked out by user!");
        }
        optionalBook.get().setCopiesAvailable(optionalBook.get().getCopiesAvailable() + 1);
        bookRepository.save(optionalBook.get());

        checkoutRepository.deleteById(validateCheckout.getId());

        // Saves new history record into the DB
        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                optionalBook.get().getTitle(),
                optionalBook.get().getAuthor(),
                optionalBook.get().getDescription(),
                optionalBook.get().getImg()

        );
        historyRepository.save(history);


    }

    // RENEW A BOOK
    public void renewBook(String userEmail, Book book) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBook(userEmail, book);
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
}
