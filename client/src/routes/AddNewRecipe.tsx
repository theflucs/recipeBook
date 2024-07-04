import { useMutation } from "@tanstack/react-query";
import { postNewRecipe } from "../api/calls";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  useCuisinesQuery,
  useDifficultiesQuery,
  useDietsQuery,
} from "../hooks/optionsQueries";
import { Option } from "../types/api";
import { useEffect, useRef, useState } from "react";
import Alert from "../components/Alert";
import { useNavigate } from "react-router";

type FormInputs = {
  name: string;
  ingredients: { value: string }[];
  instructions: string;
  cuisineId: Option["id"];
  dietId: Option["id"];
  difficultyId: Option["id"];
  image: FileList;
};

function AddNewRecipe() {
  const { data: cuisines, error: cuisinesError } = useCuisinesQuery();
  const { data: difficulties, error: difficultiesError } =
    useDifficultiesQuery();
  const { data: diets, error: dietsError } = useDietsQuery();
  const navigate = useNavigate();
  const timeoutRef = useRef<number | null>(null);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      ingredients: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const postNewRecipeMutation = useMutation({
    mutationFn: (formData: FormData) => postNewRecipe(formData),
    onSuccess: (data) => {
      setAlert({
        type: "success",
        message: "Your recipe was posted successfully!",
      });
      timeoutRef.current = window.setTimeout(() => {
        navigate(`/recipes/${data.id}`);
      }, 3000);
    },
    onError: () => {
      setAlert({
        type: "error",
        message:
          "There was an error posting your recipe. Please try again or caome back later.",
      });
    },
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleIngredients(ingredients: { value: string }[]): string[] {
    return [
      ...new Set(
        ingredients
          .map((i) => i.value.trim())
          .filter((ingredient) => ingredient)
          .map(
            (ingredient) =>
              ingredient.charAt(0).toUpperCase() +
              ingredient.slice(1).toLowerCase()
          )
      ),
    ];
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    const ingredientsArray = handleIngredients(data.ingredients);
    formData.append("ingredients", ingredientsArray.join(", "));

    formData.append("instructions", data.instructions);
    formData.append("cuisineId", data.cuisineId);
    formData.append("dietId", data.dietId);
    formData.append("difficultyId", data.difficultyId);

    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    postNewRecipeMutation.mutate(formData);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">Add Your Recipe</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Recipe name is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter recipe name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center mt-1 mb-2">
              <input
                {...register(`ingredients.${index}.value`, {
                  required:
                    index === 0
                      ? "At least one ingredient is required"
                      : undefined,
                })}
                className={`flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                  errors.ingredients?.[index]?.value ? "border-red-500" : ""
                }`}
                placeholder="Enter an ingredient"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className={`px-4 py-2 rounded-md ${
                  fields.length === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Remove
              </button>
            </div>
          ))}
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ingredients[0]?.value?.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            {...register("instructions", {
              required: "Instructions are required",
            })}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
              errors.instructions ? "border-red-500" : ""
            }`}
            placeholder="Enter recipe instructions"
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.instructions.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cuisineId"
            className="block text-sm font-medium text-gray-700"
          >
            Cuisine
          </label>
          {cuisinesError ? (
            <p className="text-red-500 text-sm mt-1">Failed to load cuisines</p>
          ) : (
            <select
              id="cuisineId"
              {...register("cuisineId", { required: "Cuisine is required" })}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                errors.cuisineId ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Cuisine</option>
              {cuisines?.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </option>
              ))}
            </select>
          )}
          {errors.cuisineId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cuisineId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="dietId"
            className="block text-sm font-medium text-gray-700"
          >
            Diet
          </label>
          {dietsError ? (
            <p className="text-red-500 text-sm mt-1">Failed to load diets</p>
          ) : (
            <select
              id="dietId"
              {...register("dietId", { required: "Diet is required" })}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                errors.dietId ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Diet</option>
              {diets?.map((diet) => (
                <option key={diet.id} value={diet.id}>
                  {diet.name}
                </option>
              ))}
            </select>
          )}
          {errors.dietId && (
            <p className="text-red-500 text-sm mt-1">{errors.dietId.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="difficultyId"
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty
          </label>
          {difficultiesError ? (
            <p className="text-red-500 text-sm mt-1">
              Failed to load difficulties
            </p>
          ) : (
            <select
              id="difficultyId"
              {...register("difficultyId", {
                required: "Difficulty is required",
              })}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                errors.difficultyId ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Difficulty</option>
              {difficulties?.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          )}
          {errors.difficultyId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.difficultyId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
              errors.image ? "border-red-500" : ""
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewRecipe;
