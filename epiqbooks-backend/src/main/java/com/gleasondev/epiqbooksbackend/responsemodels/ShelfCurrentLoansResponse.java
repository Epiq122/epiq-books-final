// this is a model used for a responce from the client to our frontendpackage com.gleasondev.epiqbooksbackend.responsemodels;import com.gleasondev.epiqbooksbackend.entity.Book;import lombok.Data;@Datapublic class ShelfCurrentLoansResponse {    private Book book;    private Integer daysLeft;    public ShelfCurrentLoansResponse(Book book, Integer daysLeft) {        this.book = book;        this.daysLeft = daysLeft;    }}