package com.gleasondev.epiqbooksbackend.service;


import com.gleasondev.epiqbooksbackend.entity.Book;
import com.gleasondev.epiqbooksbackend.entity.Checkout;
import com.gleasondev.epiqbooksbackend.entity.History;
import com.gleasondev.epiqbooksbackend.entity.User;
import com.gleasondev.epiqbooksbackend.repository.BookRepository;
import com.gleasondev.epiqbooksbackend.repository.CheckoutRepository;
import com.gleasondev.epiqbooksbackend.repository.HistoryRepository;
import com.gleasondev.epiqbooksbackend.repository.UserRepository;
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

    private UserRepository userRepository;


    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository,
                       HistoryRepository historyRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {

        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findByEmail(userEmail);

        if (user.isEmpty()) {
            throw new Exception("User not found");
        }

        Checkout validateCheckout = checkoutRepository.findByUserAndBookId(user.get(), bookId);


        if (book.isEmpty() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book not found or Already Checked Out by user!");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);

        bookRepository.save(book.get());


        Checkout checkout = new Checkout(
                user.get(),

                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()

        );


        checkoutRepository.save(checkout);

        return book.get();


    }


    public Boolean isBookCheckedOut(String userEmail, Long bookId) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isEmpty()) {
            return false;
        }
        Checkout checkout = checkoutRepository.findByUserAndBookId(user.get(), bookId);
        return checkout != null;
    }


    public Integer currentLoansCount(String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.isEmpty()) {
            return 0;
        }
        return checkoutRepository.findByUser(user.get()).size();
    }


    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        Optional<User> user = userRepository.findByEmail(userEmail);


        List<Checkout> checkoutList = checkoutRepository.findByUser(user.get());

        List<Long> bookIdList = new ArrayList<>();
        for (Checkout checkout : checkoutList) {
            bookIdList.add(checkout.getBookId());
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (Book book : books) {

            Optional<Checkout> checkout = checkoutList.stream().filter(c -> c.getBookId().equals(book.getId())).findFirst();

            if (checkout.isPresent()) {

                Date date1 = simpleDateFormat.parse(checkout.get().getReturnDate());
                Date date2 = simpleDateFormat.parse(LocalDate.now().toString());

                TimeUnit timeUnit = TimeUnit.DAYS;
                long differenceInTime = timeUnit.convert(date1.getTime() - date2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) differenceInTime));
            }
        }
        return shelfCurrentLoansResponses;

    }


    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        Optional<User> user = userRepository.findByEmail(userEmail);


        Checkout validateCheckout = checkoutRepository.findByUserAndBookId(user.get(), bookId);


        if (book.isEmpty() || validateCheckout == null) {
            throw new Exception("Book not found or not checked out by user!");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        bookRepository.save(book.get());

        checkoutRepository.deleteById(validateCheckout.getId());


        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                book.get().getTitle(),
                book.get().getAuthor(),
                book.get().getDescription(),
                book.get().getImg()

        );
        historyRepository.save(history);


    }


    public void renewBook(String userEmail, Long bookId) throws Exception {
        Optional<User> user = userRepository.findByEmail(userEmail);
        Checkout validateCheckout = checkoutRepository.findByUserAndBookId(user.get(), bookId);
        if (validateCheckout == null) {
            throw new Exception("Book not found or not checked out by user!");
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = simpleDateFormat.parse(validateCheckout.getReturnDate());
        Date date2 = simpleDateFormat.parse(LocalDate.now().toString());


        if (date1.compareTo(date2) > 0 || date1.compareTo(date2) == 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);


        }
    }
}
