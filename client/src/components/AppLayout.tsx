import React from "react";
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom";
import PlusCircle from "./PlusCircle";
import SearchBar from "./SearchBar";
import { useStore } from "../store";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("q") || "";
  const isAddNewRecipePage = window.location.pathname === "/recipes/new";

  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);

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
    navigate(`/?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-amber-400 shadow-sm text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 space-y-2 md:space-y-0">
          <Link to="/">
            <h1 className="text-3xl font-semibold ml-6">Online Recipe Book</h1>
          </Link>
          <SearchBar
            search={search}
            onSearchSubmit={handleSearchSubmit}
            onClear={handleClearSearch}
          />
          <nav className="flex items-center space-x-4 mt-2 md:mt-0">
            <NavLink
              to="/recipes/new"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-600 hover:text-orange-600"
                  : "text-orange-700 font-bold"
              }
              aria-disabled={isAddNewRecipePage}
            >
              <PlusCircle />
            </NavLink>
          </nav>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-gray-700 block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="EN">English</option>
            <option value="IT">Italian</option>
          </select>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">{children}</main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-3">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Xtream challenge
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
