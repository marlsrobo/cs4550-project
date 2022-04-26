import HomeReviewItem from "./HomeReviewItem";

const HomeReviewList = ({reviews}) => {

    const formatReviews = () => {
        try {
            return reviews.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
                .map(review => <HomeReviewItem review={review} reviewList={reviews}/>);
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

export default HomeReviewList;