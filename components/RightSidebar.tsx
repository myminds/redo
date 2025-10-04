import Link from "next/link";

export default function RightSidebar({ className = "" }: { className?: string }) {
  return (
    <aside className={`w-full lg:w-80 space-y-4 lg:space-y-6 md:sticky top-16 sm:top-20 h-fit ${className}`}>
      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stay Updated</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Get the latest articles and insights delivered to your inbox.
        </p>
        <div className="space-y-3">
          <form action="/api/newsletter" method="POST" className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-sm"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Links</h3>
        </div>
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">🏠</span>
            </div>
            <span className="font-medium">Home</span>
          </Link>
          <Link href="/technology" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-sm">💻</span>
            </div>
            <span className="font-medium">Technology</span>
          </Link>
          <Link href="/finance" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-sm">💰</span>
            </div>
            <span className="font-medium">Finance</span>
          </Link>
          <Link href="/business" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 text-sm">🏢</span>
            </div>
            <span className="font-medium">Business</span>
          </Link>
          <Link href="/job" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 dark:text-orange-400 text-sm">💼</span>
            </div>
            <span className="font-medium">Job & Career</span>
          </Link>
          <Link href="/automobile" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 text-sm">🚗</span>
            </div>
            <span className="font-medium">Automobile</span>
          </Link>
          <Link href="/about" className="flex items-center gap-3 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-400 transition-all duration-200 hover:shadow-sm">
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">ℹ️</span>
            </div>
            <span className="font-medium">About Us</span>
          </Link>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Follow Us</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <a href="https://facebook.com/readindo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200">
            <span className="text-blue-600 dark:text-blue-400">📘</span>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Facebook</span>
          </a>
          <a href="https://twitter.com/readindo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200">
            <span className="text-blue-600 dark:text-blue-400">🐦</span>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Twitter</span>
          </a>
          <a href="https://instagram.com/readindo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-200">
            <span className="text-pink-600 dark:text-pink-400">📷</span>
            <span className="text-sm font-medium text-pink-800 dark:text-pink-200">Instagram</span>
          </a>
          <a href="https://linkedin.com/company/readindo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200">
            <span className="text-blue-600 dark:text-blue-400">💼</span>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Ad Space */}
      {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-2xl">📢</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Advertisement</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Your ad could be here
          </p>
          <a 
            href="/contact" 
            className="inline-block text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div> */}
    </aside>
  );
}
