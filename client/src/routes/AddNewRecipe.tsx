import { useMutation } from "@tanstack/react-query";
import { postNewRecipe } from "../api/calls";
import { useState } from "react";

function AddNewRecipe() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const postNewRecipeMutation = useMutation({
    mutationFn: (formData: FormData) => postNewRecipe(formData),
  });

  const submitNewRecipe = () => {
    const formData = new FormData();
    formData.append("name", "Pane frattau");
    formData.append(
      "ingredients",
      "Pane carasau, Sugo, Uova, Formaggio grattugiato"
    );
    formData.append(
      "instructions",
      "Bagna il pane, metti il sugo e il formaggio a strati."
    );
    formData.append("cuisineId", "1");
    formData.append("dietId", "1");
    formData.append("difficultyId", "1");
    formData.append("image", imageFile as File);

    postNewRecipeMutation.mutate(formData);
  };

  return (
    <>
      <h1>Add New Recipe</h1>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Recipe Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected preview"
              className="mt-2 w-40 h-40 object-cover border border-gray-300 rounded"
            />
          )}
        </div>
      </div>
      <button onClick={submitNewRecipe}>Submit</button>
    </>
  );
}

export default AddNewRecipe;
