import BookModel from './BookModel';

class CheckoutModel {
  id: number;
  userEmail: string;
  checkoutDate: string;
  returnDate: string;
  book: BookModel;

  constructor(
    id: number,
    userEmail: string,
    checkoutDate: string,
    returnDate: string,
    book: BookModel,
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.checkoutDate = checkoutDate;
    this.returnDate = returnDate;
    this.book = book;
  }
}

export default CheckoutModel;
