import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PlusCircle from "./PlusCircle";

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAddNewRecipePage = location.pathname === "/recipes/new";

  return (
    <div className="bg-gray-100">
      <header className="bg-amber-400 shadow-sm text-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold">Online Recipe Book</h1>
          <nav className="flex items-center space-x-4">
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
