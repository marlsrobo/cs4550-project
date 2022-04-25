import AlbumReviewItem from "./AlbumReviewItem";

const AlbumReviewList = ({reviews}) => {

    const formatReviews = () => {
        try {
            return reviews.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
                .map(review => <AlbumReviewItem review={review} reviewList={reviews}/>);
        } catch (e) {

        }
    }

    return (
      <ul className="list-group">
          {/*{JSON.stringify(reviews)}*/}
          {formatReviews()}
      </ul>
    );
};

export default AlbumReviewList;