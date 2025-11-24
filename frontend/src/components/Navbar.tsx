interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  return (
    <nav className={`bg-primary-600 text-white shadow-lg ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-xl font-bold">UML Generator</span>
          </a>
          
          <div className="flex items-center space-x-6">
            <a
              href="/"
              className="hover:text-primary-200 transition-colors"
            >
              Home
            </a>
            <a
              href="/history"
              className="hover:text-primary-200 transition-colors"
            >
              History
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
