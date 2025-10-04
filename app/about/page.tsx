import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Reagdindonstyf.com",
  description: "Learn about Reagdindonstyf.com - your trusted source for technology, finance, business, career, and automobile content. Discover our mission and values.",
  keywords: ["about", "readindo", "blog", "technology", "finance", "business", "career", "automobile"],
  openGraph: {
    title: "About Us - Reagdindonstyf.com",
    description: "Learn about Reagdindonstyf.com - your trusted source for technology, finance, business, career, and automobile content.",
    type: "website",
    url: "https://Reagdindonstyf.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Reagdindonstyf.com",
    description: "Learn about Reagdindonstyf.com - your trusted source for technology, finance, business, career, and automobile content.",
  },
};

export default function About() {
  return (
    <div className="font-sans min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">About</span>
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Reagdindonstyf.com
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your trusted source for insightful content on technology, finance, business, career development, and automobiles.
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            {/* Mission */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                At Reagdindonstyf.com, we believe that knowledge is the key to success. Our mission is to provide high-quality, 
                actionable content that helps our readers make informed decisions in their personal and professional lives.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We cover a wide range of topics including cutting-edge technology trends, smart financial strategies, 
                business insights, career advancement tips, and the latest in automotive innovation.
              </p>
            </section>

            {/* What We Cover */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What We Cover</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-blue-600">💻</span>
                    Technology
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    AI, cybersecurity, smartphone trends, and the latest tech innovations that shape our digital world.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-green-600">💰</span>
                    Finance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Investment strategies, cryptocurrency insights, and personal finance tips for financial growth.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-purple-600">🏢</span>
                    Business
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Entrepreneurship, leadership skills, digital marketing, and strategies for business success.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-orange-600">💼</span>
                    Career
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Job search tips, interview strategies, remote work advice, and career development insights.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-red-600">🚗</span>
                    Automobile
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Car reviews, maintenance tips, electric vehicles, and the latest automotive industry trends.
                  </p>
                </div>
              </div>
            </section>

            {/* Values */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Content</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We prioritize accuracy, depth, and practical value in every article we publish.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">User Experience</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Our platform is designed for speed, accessibility, and seamless reading experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Continuous Learning</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We stay updated with the latest trends and technologies to bring you fresh insights.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Have questions, suggestions, or want to contribute? We'd love to hear from you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Explore Our Content
                  </Link>
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Subscribe to Updates
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
