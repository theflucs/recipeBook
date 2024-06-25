import { useState } from "react";
import Star from "./Star";

function Ratings(props: { onChange?: (rating: number) => void }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-row pb-4">
      <Star
        selected={rating > 0}
        handleClick={() => {
          setRating(1);
          props.onChange?.(1);
        }}
      />
      <Star
        selected={rating > 1}
        handleClick={() => {
          setRating(2);
          props.onChange?.(2);
        }}
      />
      <Star
        selected={rating > 2}
        handleClick={() => {
          setRating(3);
          props.onChange?.(3);
        }}
      />
      <Star
        selected={rating > 3}
        handleClick={() => {
          setRating(4);
          props.onChange?.(4);
        }}
      />
      <Star
        selected={rating > 4}
        handleClick={() => {
          setRating(5);
          props.onChange?.(5);
        }}
      />
    </div>
  );
}

export default Ratings;
