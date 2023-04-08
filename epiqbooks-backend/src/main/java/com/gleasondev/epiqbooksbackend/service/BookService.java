package com.gleasondev.epiqbooksbackend.service;

import com.gleasondev.epiqbooksbackend.dto.BookDTO;
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

public static class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String message) {
        super(message);
    }
}

@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    private HistoryRepository historyRepository;
    private UserRepository userRepository;

    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findByEmail(userEmail);

        if (book.isEmpty() || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book not found or Already Checked Out by user!");
        }

        if (user.isEmpty()) {
            throw new Exception("User not found!");
        }

        Checkout existingCheckout = checkoutRepository.findByUserEmailAndBook_Id(userEmail, bookId);
        if (existingCheckout != null) {
            throw new Exception("Book already checked out by user!");
        }

        Checkout checkout = new Checkout(
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get(),
                user.get()
        );

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());
        checkoutRepository.save(checkout);

        return book.get();
    }

    public Boolean isBookCheckedOut(String userEmail, Long bookId) {
        Checkout checkout = checkoutRepository.findByUserEmailAndBook_Id(userEmail, bookId);
        return checkout != null;
    }

    public Integer currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findBooksByUserEmail(userEmail);

        List<Long> bookIdList = new ArrayList<>();
        for (Checkout checkout : checkoutList) {
            bookIdList.add(checkout.getBookId());
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (Book book : books) {
            Optional<Checkout> checkout = checkoutList.stream()
                                                      .filter(c -> c.getBook() != null && c.getBook()
                                                                                           .getId()
                                                                                           .equals(book.getId()))
                                                      .findFirst();
            BookDTO bookDTO = new BookDTO(book);

            if (checkout.isPresent()) {
                Date date1 = simpleDateFormat.parse(checkout.get().getReturnDate());
                Date date2 = simpleDateFormat.parse(LocalDate.now().toString());

                TimeUnit timeUnit = TimeUnit.DAYS;
                long differenceInTime = timeUnit.convert(date1.getTime() - date2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(bookDTO, (int) differenceInTime));
            }
        }
        return shelfCurrentLoansResponses;
    }

    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findByEmail(userEmail);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBook_Id(userEmail, bookId);

        if (book.isEmpty() || validateCheckout == null) {
            throw new BookNotFoundException("Book id " + bookId + " not found in database!");
        }
        if (user.isEmpty()) {
            throw new Exception("User not found!");
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
                book.get(),
                user.get()
        );
        historyRepository.save(history);
    }


    public void renewBook(String userEmail, Long bookId) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBook_Id(userEmail, bookId);
        if (validateCheckout == null) {
            throw new Exception("Book not found or not checked out by user!");
        }

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

