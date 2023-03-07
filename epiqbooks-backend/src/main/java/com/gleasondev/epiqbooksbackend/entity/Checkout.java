package com.gleasondev.epiqbooksbackend.entity;


import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "checkout_date")
    private String checkoutDate;

    @Column(name = "return_date")
    private String returnDate;

    // Change 1
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;


    public Checkout() {

    }

    public Checkout(String userEmail, String checkoutDate, String returnDate, Book book) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.book = book;
    }

    public Long getBookId() {
        return book.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Checkout checkout = (Checkout) o;
        return Objects.equals(id, checkout.id) &&
                Objects.equals(userEmail, checkout.userEmail) &&
                Objects.equals(checkoutDate, checkout.checkoutDate) &&
                Objects.equals(returnDate, checkout.returnDate) &&
                Objects.equals(book, checkout.book); // add null check for bookId
    }

}
