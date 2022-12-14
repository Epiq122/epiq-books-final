// used to consume the API response from the backend ( REVIEW )

class ReviewModel {
  id: number;
  book_Id: number;
  userEmail: string;
  rating: number;
  reviewDescription?: string;
  date: string;

  constructor(
    id: number,
    bookId: number,
    userEmail: string,
    rating: number,
    reviewDescription: string,
    date: string
  ) {
    this.id = id;
    this.book_Id = bookId;
    this.userEmail = userEmail;
    this.rating = rating;
    this.reviewDescription = reviewDescription;
    this.date = date;
  }
}

export default ReviewModel;
