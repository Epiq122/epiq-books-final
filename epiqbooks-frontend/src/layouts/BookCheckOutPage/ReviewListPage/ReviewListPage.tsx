import { useEffect, useState } from 'react';
import ReviewModel from '../../../models/ReviewModel';
import { LoadingSpinner } from '../../Utils/LoadingSpinner';
import { Pagination } from '../../Utils/Pagination';
import { Review } from '../../Utils/Review';

export function ReviewListPage() {
  // OUR STATE

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // this is for adding our book to look up our reviews for
  const bookId = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}&page=${
        currentPage - 1
      }&size=${reviewsPerPage}`;
      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error('Something went wrong!');
      }
      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;
      setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
      setTotalPages(responseJsonReviews.page.totalPages);

      const loadedReviews: ReviewModel[] = [];

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          book_Id: responseData[key].bookId,
          date: responseData[key].date,
          rating: responseData[key].rating,
          userEmail: responseData[key].userEmail,
          reviewDescription: responseData[key].reviewDescription,
        });
      }
      // find the average of the weighted star review

      setReviews(loadedReviews);
      setIsLoading(false);
    };
    fetchReviews().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [bookId, currentPage, reviewsPerPage]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  // Pagination
  const indexOfLastReview: number = currentPage * reviewsPerPage;
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

  const lastItem =
    reviewsPerPage * currentPage <= totalAmountOfReviews
      ? reviewsPerPage * currentPage
      : totalAmountOfReviews;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container m-5'>
      <div>
        <h3 className='text-white'>Comments: ({reviews.length})</h3>
      </div>
      <p className='text-white mb-4'>
        {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
      </p>
      <div className='row text-white =i py-4'>
        {/* this  maps through all the current reviews and then creates review component */}
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
}
