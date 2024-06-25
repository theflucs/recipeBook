import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold">Online Recipe Book</h1>
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
