import React from "react";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import PlusCircle from "./PlusCircle";
import SearchBar from "./SearchBar";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("q") || "";

  const isHomePage = window.location.pathname === "/";
  const isAddNewRecipePage = window.location.pathname === "/recipes/new";

  const handleSearchSubmit = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
    navigate(`/?${newParams.toString()}`);
  };

  const handleClearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("q");
    setSearchParams(newParams);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-amber-400 shadow-sm text-white">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-3 space-y-2 md:space-y-0">
          <h1 className="text-lg font-semibold">Online Recipe Book</h1>
          <SearchBar
            search={search}
            onSearchSubmit={handleSearchSubmit}
            onClear={handleClearSearch}
          />
          <nav className="flex items-center space-x-4 mt-2 md:mt-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-700 font-bold cursor-not-allowed"
                  : "text-gray-600 hover:text-orange-700"
              }
              aria-disabled={isHomePage}
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes/new"
              className={({ isActive }) =>
                isAddNewRecipePage
                  ? "text-orange-700 font-bold cursor-not-allowed"
                  : isActive
                  ? "text-orange-700 font-bold"
                  : "text-gray-600 hover:text-orange-700"
              }
              aria-disabled={isAddNewRecipePage}
            >
              <PlusCircle />
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-4 sm:px-4 lg:px-6 xl:px-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Xtream challenge
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
