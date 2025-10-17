import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "../../lib/post";
import type { Metadata } from "next";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Automobile Blog - RedoHelp",
    description: "Read the latest blog posts and articles about automobiles, cars, bikes, and the automotive industry.",
    keywords: ["automobile", "cars", "bikes", "automotive", "reviews", "tips"],
    openGraph: {
      title: "Automobile Blog - RedoHelp",
      description: "Latest news, reviews, and tips about cars, bikes, and the world of automobiles.",
      type: "website",
      url: "https://RedoHelp/automobile",
    },
    twitter: {
      card: "summary_large_image",
      title: "Automobile Blog - RedoHelp",
      description: "Latest news, reviews, and tips about cars, bikes, and the world of automobiles.",
    },
  };
}

export default function AutomobileBlog() {
  const blogPosts = getPostsByCategory("automobile");

  return (
    <div className="font-sans min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">Automobile</span>
          </div>
        </nav>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 py-4 lg:py-8">
          {/* Left Sidebar */}
          <LeftSidebar className="order-2 lg:order-1" />
          
          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-none order-1 lg:order-2">
            <div className="space-y-6">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/automobile/${post.slug}`}
                    className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-3 lg:p-4 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                      {/* Small Image */}
                      <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-24 relative">
                        <Image
                          src={post.image || "/blog/default.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 640px) 100vw, 128px"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span className="font-medium text-blue-600 dark:text-blue-400 uppercase">
                            {post.category}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(post.date).toLocaleDateString("en-IN", { 
                              year: "numeric", 
                              month: "short", 
                              day: "numeric" 
                            })}
                          </span>
                          <span>•</span>
                          <span>{post.author || "Anonymous"}</span>
                        </div>
                        
                        <h2 className="text-base lg:text-lg font-bold mb-2 text-gray-900 dark:text-white leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        {post.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No automobile posts found.
                  </p>
                </div>
              )}
            </div>
          </main>
          
          {/* Right Sidebar */}
          <RightSidebar className="order-3" />
        </div>
      </div>
    </div>
  );
}
