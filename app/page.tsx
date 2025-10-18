import Link from "next/link";
import { getAllPosts } from "../lib/post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RedoHelp - Technology, Finance, Business, Career & Automobile Blog",
  description: "Your trusted source for technology, finance, business, career, and automobile content. Expert insights and practical advice.",
  keywords: ["technology", "finance", "business", "career", "automobile", "blog", "news", "tips", "guides"],
};

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="font-sans min-h-screen bg-white dark:bg-black flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-8 bg-gradient-to-b from-blue-50 dark:from-[#181818] to-white dark:to-black">
        <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Welcome to <span className="text-blue-600">Tools Kit</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">Where knowledge meets progress—your one stop for <span className="font-semibold text-blue-600">Automobiles</span>, <span className="font-semibold text-green-600">Technology</span>, <span className="font-semibold text-purple-600">Finance</span>, <span className="font-semibold text-orange-600">Business</span>, <span className="font-semibold text-red-600">Jobs</span> and smart <span className="font-semibold text-teal-600">Tools</span> to unlock productivity—crunch numbers, make conversions, and get answers faster than ever.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <Link
              href="/automobile"
              className="bg-blue-600 text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto text-base"
              prefetch
            >
              Explore Automobile
            </Link>
            <Link
              href="/technology"
              className="bg-green-600 text-white font-semibold rounded px-6 py-3 shadow hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto text-base"
              prefetch
            >
              Explore Technology
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto w-full py-12 px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link
            href="/automobile"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Automobile</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Cars, bikes, reviews</p>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                {allPosts.filter(post => post.category === "automobile").length} posts
              </span>
            </div>
          </Link>

          <Link
            href="/technology"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Technology</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">AI, cybersecurity, tech</p>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                {allPosts.filter(post => post.category === "technology").length} posts
              </span>
            </div>
          </Link>

          <Link
            href="/finance"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Finance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Investment, crypto</p>
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                {allPosts.filter(post => post.category === "finance").length} posts
              </span>
            </div>
          </Link>

          <Link
            href="/business"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Business</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Startup, leadership</p>
              <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                {allPosts.filter(post => post.category === "business").length} posts
              </span>
            </div>
          </Link>

          <Link
            href="/job"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Job</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Career, interviews</p>
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                {allPosts.filter(post => post.category === "job").length} posts
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-6xl mx-auto w-full py-12 px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Useful Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/tools/investment-calculator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Investment Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Calculate compound interest and investment returns</p>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/emi-calculator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">🏦</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">EMI Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Calculate EMI for home loans, personal loans, car loans & more</p>
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/salary-calculator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Salary Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Calculate take-home salary, deductions & tax implications</p>
                <div className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/home-loan-calculator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Home Loan Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Calculate home loan EMI and eligibility</p>
                <div className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/sip-calculator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">SIP Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Calculate SIP returns and maturity amount</p>
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/tech-stack-builder" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tech Stack Builder</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Build your perfect tech stack for projects</p>
                <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto w-full py-12 px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Latest Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.category}/${post.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <span className="text-4xl">
                  {post.category === "automobile" ? "🚗" : 
                   post.category === "technology" ? "💻" :
                   post.category === "finance" ? "💰" :
                   post.category === "business" ? "🏢" : "💼"}
                </span>
              </div>
              <div className="p-6">
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
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}