import BookModel from './BookModel';
import CheckoutModel from './CheckoutModel';

class ShelfCurrentLoans {
  book: BookModel;
  checkout: CheckoutModel;
  daysLeft: number;
  constructor(book: BookModel, checkout: CheckoutModel, daysLeft: number) {
    this.book = book;
    this.checkout = checkout;
    this.daysLeft = daysLeft;
  }
}

export default ShelfCurrentLoans;
