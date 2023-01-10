# Epiq Books

This is a Full Stack CRUD app for my final project at Coders Campus Bootcamp

## Description

This is a Full Sack Java app where users can checkout books from a fake library, they will also beable to leave a review
for the book they checked out.
You will beable login and see what books you have checked out.

There will be an admin page where the admin can add books to the library, and quantity of books.

## Technologies Used

* Database: MySQL
* FrontEnd: HTML, CSS, TypeScript, Bootstrap, React
* BackEnd: Java, Spring Boot,Spring Boot Data JPA, Okta, Lombok, Maven

# Learning Goals

Learning more about React/TypeScript for the frontend. Learning more about Boostrap and Tailwind for the styling.

# Features

## Main Features

#### MySql DataBase

* books saved to database, keeping record of titles,author,book description,copies and copies available
* checkout history stored in database including user email, book id, return date and checkout date
* all messages are stored in the database including user email title questions, and if the admin has responsed or not
* reviews are stored in database with date it was entered as well as book ids and the review description

#### Normal User

* Add up to 5 books into your library
* Books have a Loan period if the loan period is exceeded you cannot take out any other books
* You have the option to renew books
* You can leave a Star or a Text review for a book
* You can submit a question to an admin and get back a response

#### Admin User

* Respond to messages from users
* Increase or decrease books that will all be saved to the DB
* Ability to add new books, all information will be saved to the DB
* Ability to delete books from the library

## Login Information to test

#### Normal User

* Email: testuser@email.com Password: Test1234

#### Admin User

* Email: adminuser@email.com Password: admin1234