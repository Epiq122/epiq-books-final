// This is used to consume the API response from the backend ( BOOK )
class BookModel {
  id: number;
  title: string;
  author?: string;
  description?: string;
  copies?: number;
  copiesAvailable?: number;
  category?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    author?: string,
    description?: string,
    copies?: number,
    copiesAvailable?: number,
    category?: string,
    img?: string,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.copies = copies;
    this.copiesAvailable = copiesAvailable;
    this.category = category;
    this.img = img;
  }
}

export default BookModel;

// the ? means that the property is optional
