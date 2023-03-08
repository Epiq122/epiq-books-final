import BookModel from './BookModel';

class HistoryModel {
  id: number;
  userEmail: string;
  checkoutDate: string;
  returnedDate: string;
  title: string;
  author: string;
  description: string;
  img: string;
  book: BookModel;

  constructor(
    id: number,
    userEmail: string,
    checkoutDate: string,
    returnedDate: string,
    title: string,
    author: string,
    description: string,
    img: string,
    book: BookModel,
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.checkoutDate = checkoutDate;
    this.returnedDate = returnedDate;
    this.title = title;
    this.author = author;
    this.description = description;
    this.img = img;
    this.book = book;
  }
}

export default HistoryModel;
