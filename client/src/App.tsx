import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import queryClient from "./queryClient";
import AppLayout from "./components/AppLayout";
import Home from "./routes/Home";
import RecipeDetail from "./routes/RecipeDetail";
import AddNewRecipe from "./routes/AddNewRecipe";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/recipes/new" element={<AddNewRecipe />} />
          </Routes>
        </AppLayout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
