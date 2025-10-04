import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Readindo.com - Your trusted source for quality content
                </p>
            </div>
        </footer>
    );
}
