import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap - RedoHelp',
  description: 'Complete sitemap of RedoHelp - Find all our tools, blog posts, and resources organized by category.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapPage() {
  const tools = [
    { name: 'Calculator', url: '/tools/calculator', description: 'Advanced calculator with scientific functions' },
    { name: 'EMI Calculator', url: '/tools/emi-calculator', description: 'Calculate EMI for loans' },
    { name: 'Home Loan Calculator', url: '/tools/home-loan-calculator', description: 'Calculate home loan EMI and eligibility' },
    { name: 'Investment Calculator', url: '/tools/investment-calculator', description: 'Calculate compound interest and investment returns' },
    { name: 'Invoice Generator', url: '/tools/invoice-generator', description: 'Create professional invoices' },
    { name: 'Rent Slip Generator', url: '/tools/rent-slip-generator', description: 'Generate professional rent receipts' },
    { name: 'Salary Calculator', url: '/tools/salary-calculator', description: 'Calculate take-home salary and deductions' },
    { name: 'SIP Calculator', url: '/tools/sip-calculator', description: 'Calculate SIP returns and maturity amount' },
    { name: 'Tech Stack Builder', url: '/tools/tech-stack-builder', description: 'Build your perfect tech stack for projects' },
  ];

  const categories = [
    { name: 'Automobile', url: '/automobile', description: 'Cars, bikes, reviews and automotive content' },
    { name: 'Technology', url: '/technology', description: 'AI, cybersecurity, tech news and insights' },
    { name: 'Finance', url: '/finance', description: 'Investment, crypto, personal finance tips' },
    { name: 'Business', url: '/business', description: 'Startup, leadership, business strategies' },
    { name: 'Job & Career', url: '/job', description: 'Career advice, interviews, professional development' },
  ];

  const mainPages = [
    { name: 'Home', url: '/', description: 'Main homepage with latest content' },
    { name: 'About Us', url: '/about', description: 'Learn about RedoHelp and our mission' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sitemap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete overview of all tools, blog posts, and resources available on RedoHelp. 
            Find everything you need organized by category.
          </p>
        </div>

        {/* Main Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Main Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainPages.map((page) => (
              <Link
                key={page.url}
                href={page.url}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {page.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Useful Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.url}
                href={tool.url}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Blog Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.url}
                href={category.url}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Information */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            About This Sitemap
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              This sitemap provides a comprehensive overview of all content available on RedoHelp. 
              Our site is regularly updated with new tools and blog posts.
            </p>
            <p>
              <strong>XML Sitemap:</strong> For search engines, visit{' '}
              <Link href="/sitemap.xml" className="text-blue-600 dark:text-blue-400 hover:underline">
                /sitemap.xml
              </Link>
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
