import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import DifficultyCardBadge from "../components/DifficultyBadge";
import { format, parseISO } from "date-fns";
import queryClient from "../queryClient";
import { BASE_API_URL } from "../api/BASE_API_URL";
import Ratings from "../components/Ratings";
import {
  PostRecipeCommentPayload,
  getRecipeComments,
  getRecipeDetail,
  postComment,
} from "../api/calls";
import CountryFlag from "../components/CountryFlag";
import { Rating } from "../types/api";

function ReceipeDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetail(id as string),
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe</p>;
  }
  const { name, image, difficultyId, instructions, ingredients, cuisine } =
    data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <img
            loading="lazy"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            src={`${BASE_API_URL}${image}`}
            alt={name}
          />
          <div className="absolute top-4 right-4">
            <DifficultyCardBadge
              difficultyId={difficultyId}
              showHeader={false}
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <CountryFlag cuisine={cuisine} />
          <h2 className="text-xl font-bold mt-4 mb-2">Ingredients:</h2>
          <ul className="list-disc pl-8">
            {ingredients?.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-2 mt-2">Instructions:</h2>
          <p>{instructions}</p>
          <div className="mt-4"></div>
        </div>
      </div>

      {id && <Comments id={id} />}
    </section>
  );
}

function Comments(props: { id: string }) {
  const { id } = props;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<Rating>(0);

  const { data, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getRecipeComments(id as string),
  });

  const postCommentMutation = useMutation({
    mutationFn: (newComment: PostRecipeCommentPayload) => {
      return postComment(newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recipe</p>;
  }

  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const submitComment = () => {
    const payload: PostRecipeCommentPayload = {
      id,
      comment,
      rating,
      date: new Date().toISOString(),
    };
    if (payload.comment && payload.rating) {
      postCommentMutation.mutate(payload);
      setRating(0);
      setComment("");
    } else {
      alert("Comment cannot be empty");
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {data.map((comment) => (
          <div className="mb-6 pb-4 border-b" key={comment.id}>
            <p className="font-bold text-lg mb-2">{comment.comment}</p>
            <Ratings rating={comment.rating} />
            <p className="text-gray-500 mb-2">
              {format(parseISO(comment.date), "dd/MM/yyyy HH:mm")}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Add a comment</h2>
        <Ratings rating={rating} setRating={setRating} />
        <textarea
          className="w-full h-24 p-2 mb-4 border rounded"
          onChange={onChangeTextArea}
          value={comment}
        ></textarea>

        <button
          className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-4 rounded"
          onClick={submitComment}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default ReceipeDetail;
