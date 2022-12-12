package com.gleasondev.epiqbooksbackend.repository;


import com.gleasondev.epiqbooksbackend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;


public interface BookRepository extends JpaRepository<Book, Long> {


    // this is used to search for books that container certain keywords
    // It calls our book entitty
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    // search by the category of the book
    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);
}