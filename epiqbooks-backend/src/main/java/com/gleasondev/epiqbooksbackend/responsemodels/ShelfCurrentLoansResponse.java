// this is a model used for a responce from the client to our frontendpackage com.gleasondev.epiqbooksbackend.responsemodels;import com.gleasondev.epiqbooksbackend.entity.Book;import com.gleasondev.epiqbooksbackend.entity.Checkout;import lombok.Data;@Datapublic class ShelfCurrentLoansResponse {    private Book book;    private Checkout checkout;    private Integer daysLeft;    public ShelfCurrentLoansResponse(Book book, Checkout checkout, Integer daysLeft) {        this.book = book;        this.checkout = checkout;        this.daysLeft = daysLeft;    }}