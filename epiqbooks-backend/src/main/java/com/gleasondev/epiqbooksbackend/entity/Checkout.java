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

    @Column(name = "checkout_date")
    private String checkoutDate;

    @Column(name = "return_date")
    private String returnDate;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Checkout() {
    }

    public Checkout(String checkoutDate, String returnDate, Book book, User user) {
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.book = book;
        this.user = user;
    }

    public Long getBookId() {
        if (book != null) {
            return book.getId();
        } else {
            // Handle the case where book is null
            return null;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Checkout checkout = (Checkout) o;
        return Objects.equals(id, checkout.id) &&
                Objects.equals(checkoutDate, checkout.checkoutDate) &&
                Objects.equals(returnDate, checkout.returnDate) &&
                Objects.equals(book, checkout.book) &&
                Objects.equals(user, checkout.user);
    }
}
