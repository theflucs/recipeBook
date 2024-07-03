import { Rating } from "../types/api";
import Star from "./Star";

function Ratings(props: {
  rating: Rating;
  setRating?: (rating: Rating) => void;
}) {
  const { rating, setRating } = props;
  return (
    <div className="flex flex-row pb-4">
      <Star
        selected={rating > 0}
        handleClick={() => {
          setRating?.(1);
        }}
      />
      <Star
        selected={rating > 1}
        handleClick={() => {
          setRating?.(2);
        }}
      />
      <Star
        selected={rating > 2}
        handleClick={() => {
          setRating?.(3);
        }}
      />
      <Star
        selected={rating > 3}
        handleClick={() => {
          setRating?.(4);
        }}
      />
      <Star
        selected={rating > 4}
        handleClick={() => {
          setRating?.(5);
        }}
      />
    </div>
  );
}

export default Ratings;
