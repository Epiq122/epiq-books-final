package com.gleasondev.epiqbooksbackend.entity;

// our Book entity for the database


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "book")
// this is from Lombok it will generate getters and setters for us
@Data
public class Book {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
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


}