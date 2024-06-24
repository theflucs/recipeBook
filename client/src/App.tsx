import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import queryClient from "./queryClient";
import AppLayout from "./components/AppLayout";
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppLayout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
