package com.gleasondev.epiqbooksbackend.entity;

// our Book entity for the database


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "books")
@Data

public class Book {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "title")
    private String title;
    @NotBlank
    @Column(name = "author")
    private String author;
    @NotBlank
    @Column(name = "description")
    private String description;
    @Column(name = "copies")
    private Integer copies;
    @Column(name = "copies_available")
    private Integer copiesAvailable;
    @Column(name = "category")
    private String category;
    @Column(name = "img")
    private String img;

    @OneToMany(mappedBy = "book")
    private List<Checkout> checkouts;

    @OneToMany(mappedBy = "book")
    private List<History> histories;

    public Book() {
    }

    public Book(Long id, String title, String author, String description, Integer copies, Integer copiesAvailable, String category, String img, List<Checkout> checkouts, List<History> histories) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
        this.checkouts = checkouts;
        this.histories = histories;
    }
}
