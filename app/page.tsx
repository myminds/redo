import Link from "next/link";
import { getAllPosts } from "../lib/post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Tools & Expert Blog | EMI Calculator, Investment Calculator, Salary Calculator",
  description: "Access 10+ free online tools including EMI calculator, investment calculator, salary calculator, home loan calculator, SIP calculator, and expert content on technology, finance, business, career, and automobile. Get instant calculations and professional insights.",
  keywords: [
    "free online tools", "EMI calculator", "investment calculator", "salary calculator", 
    "home loan calculator", "SIP calculator", "tech stack builder", "invoice generator", 
    "rent slip generator", "JSON formatter", "compound interest calculator", 
    "loan calculator", "financial planning tools", "online calculator", 
    "technology blog", "finance blog", "business blog", "career blog", 
    "automobile blog", "tech news", "business tips", "career advice", 
    "investment planning", "financial advice", "tech stack", "web development tools"
  ],
  openGraph: {
    title: "Free Online Tools & Expert Blog | EMI Calculator, Investment Calculator, Salary Calculator",
    description: "Access 10+ free online tools including EMI calculator, investment calculator, salary calculator, home loan calculator, SIP calculator, and expert content on technology, finance, business, career, and automobile.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "RedoHelp Free Online Tools and Expert Blog",
      }
    ],
  },
  twitter: {
    title: "Free Online Tools & Expert Blog | EMI Calculator, Investment Calculator, Salary Calculator",
    description: "Access 10+ free online tools including EMI calculator, investment calculator, salary calculator, home loan calculator, SIP calculator, and expert content.",
    images: ["/twitter-home.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com",
  },
};

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 6);

  // Structured data for tools
  const toolsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online Tools",
    "description": "Collection of free online tools for financial calculations, business utilities, and development tools",
    "numberOfItems": 10,
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "name": "EMI Calculator",
        "url": "https://redohelp.com/tools/emi-calculator",
        "description": "Calculate EMI for home loans, personal loans, car loans and other financial products",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Investment Calculator",
        "url": "https://redohelp.com/tools/investment-calculator",
        "description": "Calculate compound interest and investment returns for financial planning",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Salary Calculator",
        "url": "https://redohelp.com/tools/salary-calculator",
        "description": "Calculate take-home salary, deductions and tax implications",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Home Loan Calculator",
        "url": "https://redohelp.com/tools/home-loan-calculator",
        "description": "Calculate home loan EMI and eligibility",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "SIP Calculator",
        "url": "https://redohelp.com/tools/sip-calculator",
        "description": "Calculate SIP returns and maturity amount",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Tech Stack Builder",
        "url": "https://redohelp.com/tools/tech-stack-builder",
        "description": "Build your perfect tech stack for projects",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Invoice Generator",
        "url": "https://redohelp.com/tools/invoice-generator",
        "description": "Create professional invoices with automatic calculations",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Rent Slip Generator",
        "url": "https://redohelp.com/tools/rent-slip-generator",
        "description": "Generate professional rent receipts for landlords and tenants",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "JSON Formatter",
        "url": "https://redohelp.com/tools/json-formatter",
        "description": "Format, minify, and validate JSON data with ease",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolsStructuredData)
        }}
      />
      
      <div className="font-sans min-h-screen bg-white dark:bg-black flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-8 bg-gradient-to-b from-blue-50 dark:from-[#181818] to-white dark:to-black">
        <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
          <h1 className="text-lg sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            Free Online Tools & Expert Blog | <span className="text-blue-600">EMI Calculator, Investment Calculator, Salary Calculator</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Access 10+ free online tools including EMI calculator, investment calculator, salary calculator, home loan calculator, SIP calculator, and expert content on <span className="font-semibold text-green-600">Technology</span>, <span className="font-semibold text-red-600">Finance</span>, <span className="font-semibold text-purple-600">Business</span>, <span className="font-semibold text-orange-600">Career</span>, and <span className="font-semibold text-teal-600">Automobile</span>. Get instant calculations and professional insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            {/* Automobile Category - Commented out until content is added */}
            {/* <Link
              href="/automobile"
              className="bg-blue-600 text-white font-semibold rounded px-6 py-3 shadow hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto text-base"
              prefetch
            >
              Explore Automobile
            </Link> */}
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
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Expert Content Categories
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Discover expert insights, practical tips, and comprehensive guides across technology, finance, business, career, and automobile topics. Stay updated with the latest trends and best practices.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Automobile Category Card - Commented out until content is added */}
          {/* <Link
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
          </Link> */}

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

          {/* Finance Category Card - Commented out until content is added */}
          {/* <Link
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
          </Link> */}

          {/* Business Category Card - Commented out until content is added */}
          {/* <Link
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
          </Link> */}

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
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Free Online Tools for Financial Planning & Business
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Access our comprehensive collection of free online calculators and tools. Calculate EMI, investment returns, salary breakdowns, and more with our professional-grade calculators designed for accuracy and ease of use.
        </p>
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

          <Link href="/tools/invoice-generator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Invoice Generator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Create professional invoices with automatic calculations</p>
                <div className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/rent-slip-generator" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Rent Slip Generator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Generate professional rent receipts for landlords and tenants</p>
                <div className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/json-formatter" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JSON Formatter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Format, minify, and validate JSON data with ease</p>
                <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200 text-sm font-medium inline-block">
                  Use Tool
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto w-full py-12 px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Latest Expert Articles & Guides
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Stay informed with our latest articles covering technology trends, financial planning, business strategies, career advice, and automobile insights. Expert-written content to help you make informed decisions.
        </p>
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
    </>
  );
}