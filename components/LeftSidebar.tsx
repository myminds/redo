import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "../lib/post";

export default function LeftSidebar({ className = "" }: { className?: string }) {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 5);

  return (
    <aside className={`w-full lg:w-80 space-y-4 lg:space-y-6 md:sticky top-16 sm:top-20 h-fit ${className}`}>
      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Recent Posts</h3>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.category}/${post.slug}`}
              className="block group p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 relative rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/blog/default.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 32px, 40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <Link
            href="/technology"
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm">💻</span>
              </div>
              <span className="font-medium text-sm sm:text-base">Technology</span>
            </div>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
              {allPosts.filter(post => post.category === "technology").length}
            </span>
          </Link>
          <Link
            href="/finance"
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-xs sm:text-sm">💰</span>
              </div>
              <span className="font-medium text-sm sm:text-base">Finance</span>
            </div>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
              {allPosts.filter(post => post.category === "finance").length}
            </span>
          </Link>
          <Link
            href="/business"
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm">🏢</span>
              </div>
              <span className="font-medium text-sm sm:text-base">Business</span>
            </div>
            <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
              {allPosts.filter(post => post.category === "business").length}
            </span>
          </Link>
          <Link
            href="/job"
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 text-xs sm:text-sm">💼</span>
              </div>
              <span className="font-medium text-sm sm:text-base">Job & Career</span>
            </div>
            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
              {allPosts.filter(post => post.category === "job").length}
            </span>
          </Link>
          <Link
            href="/automobile"
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 text-xs sm:text-sm">🚗</span>
              </div>
              <span className="font-medium text-sm sm:text-base">Automobile</span>
            </div>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
              {allPosts.filter(post => post.category === "automobile").length}
            </span>
          </Link>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["technology", "finance", "business", "career", "automobile", "ai", "investment", "startup", "tips", "guide"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-200 cursor-pointer font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
