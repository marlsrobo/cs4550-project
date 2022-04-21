import AlbumReviewItem from "./AlbumReviewItem";

const AlbumReviewList = ({reviews}) => {
    return (
      <ul className="list-group">
          {/*{JSON.stringify(reviews)}*/}
          {reviews.map(review => <AlbumReviewItem review={review}/>)}
      </ul>
    );
};

export default AlbumReviewList;