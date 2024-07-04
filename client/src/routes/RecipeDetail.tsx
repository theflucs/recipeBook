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
  getRecipeDetail,
  postComment,
} from "../api/calls";
import CountryFlag from "../components/CountryFlag";
import { Comment, Rating } from "../types/api";
import Alert from "../components/Alert";
import { useCommentsQuery } from "../hooks/useCommentsQuery";

function ReceipeDetail() {
  const id = useParams<{ id: string }>().id as string;

  const { data, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetail(id),
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
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { data, error } = useCommentsQuery(id);

  const postCommentMutation = useMutation({
    mutationFn: (newComment: PostRecipeCommentPayload) => {
      return postComment(newComment);
    },
    onMutate: (newComment) => {
      const data: Comment = {
        recipeId: newComment.id,
        id: "temp-id",
        comment: newComment.comment,
        rating: newComment.rating as Rating,
        date: newComment.date,
      };
      queryClient.setQueryData(["comments", id], (oldData: Comment[]) => [
        ...oldData,
        data,
      ]);
      setTimeout(() => {
        const commentElement = document.getElementById(`comment-${data.id}`);
        commentElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1000);
    },
    onSuccess: (data) => {
      setAlert({
        type: "success",
        message: "Your comment was posted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["comments", data.id] });
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
    postCommentMutation.mutate(payload);
    resetComment();
  };

  const resetComment = () => {
    setComment("");
    setRating(0);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {data.length > 0 ? (
          data.map((comment) => (
            <div
              className="mb-6 pb-4 border-b"
              key={comment.id}
              id={`comment-${comment.id}`}
            >
              <p className="font-bold text-lg mb-2">{comment.comment}</p>
              <Ratings rating={comment.rating} />
              <p className="text-gray-500 mb-2">
                {format(parseISO(comment.date), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            There are no comments yet.{" "}
            <span className="font-bold">Leave yours!</span>
          </p>
        )}
      </div>

      <div>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <h2 className="text-xl font-bold mb-4">Leave a comment</h2>
        <Ratings rating={rating} setRating={setRating} />
        <textarea
          className="w-full h-24 p-2 mb-4 border rounded"
          onChange={onChangeTextArea}
          value={comment}
        ></textarea>

        <button
          className={`
            text-white py-2 px-4 rounded
            ${
              !comment || !rating
                ? "bg-gray-300"
                : "bg-amber-400 hover:bg-amber-500"
            }
          `}
          onClick={submitComment}
          disabled={!comment || !rating}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default ReceipeDetail;
