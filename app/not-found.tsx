import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - RedoHelp",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Go Home
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/automobile" className="hover:text-blue-600 dark:hover:text-blue-400 mr-4">
              Automobile
            </Link>
            <Link href="/technology" className="hover:text-blue-600 dark:hover:text-blue-400 mr-4">
              Technology
            </Link>
            <Link href="/finance" className="hover:text-blue-600 dark:hover:text-blue-400 mr-4">
              Finance
            </Link>
            <Link href="/business" className="hover:text-blue-600 dark:hover:text-blue-400 mr-4">
              Business
            </Link>
            <Link href="/job" className="hover:text-blue-600 dark:hover:text-blue-400">
              Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
