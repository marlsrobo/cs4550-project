import AlbumReviewItem from "./AlbumReviewItem";

const AlbumReviewList = ({reviews}) => {

    const formatReviews = () => {
        try {
            console.log(new Date(reviews[1].datePosted) - new Date(reviews[0].datePosted));
            return reviews.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
                .map(review => <AlbumReviewItem review={review}/>);
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