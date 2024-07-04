import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import queryClient from "./queryClient";
import AppLayout from "./components/AppLayout";
import Home from "./routes/Home";
import RecipeDetail from "./routes/RecipeDetail";
import AddNewRecipe from "./routes/AddNewRecipe";
import { useEffect } from "react";
import { i18n } from "@lingui/core";
import { useStore } from "./store";
import { I18nProvider } from "@lingui/react";

function App() {
  const lang = useStore((state) => state.lang);
  useEffect(() => {
    dynamicActivate(lang);
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nProvider i18n={i18n}>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/recipes/new" element={<AddNewRecipe />} />
            </Routes>
          </AppLayout>
        </I18nProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/${locale}.po`);

  i18n.load(locale, messages);
  i18n.activate(locale);
}

export default App;
