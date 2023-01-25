// class AddBookRequest {
//   title: string;
//   author: string;
//   description: string;
//   copies: number;
//   category: string;
//   img?: string;

//   constructor(
//     title: string,
//     author: string,
//     description: string,
//     copies: number,
//     category: string
//   ) {
//     this.title = title;
//     this.author = author;
//     this.description = description;
//     this.copies = copies;
//     this.category = category;
//   }
// }

// export default AddBookRequest;

class AddBookRequest {
  constructor(
    public title: string,
    public author: string,
    public description: string,
    public copies: number,
    public category: string,
    public img?: string,
  ) {}
}

export default AddBookRequest;
