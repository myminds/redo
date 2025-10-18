import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 py-8 mt-16 print:hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tools/calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/emi-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    EMI Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/salary-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Salary Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/investment-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Investment Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/home-loan-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Home Loan Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/sip-calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    SIP Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/tech-stack-builder" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Tech Stack Builder
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/invoice-generator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Invoice Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/rent-slip-generator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Rent Slip Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/technology" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link href="/finance" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Finance
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/automobile" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Automobile
                                </Link>
                            </li>
                            <li>
                                <Link href="/business" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Business
                                </Link>
                            </li>
                            <li>
                                <Link href="/job" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Tools</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tools/emi-calculator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">
                                    🏦 EMI Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/salary-calculator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">
                                    💼 Salary Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/investment-calculator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    📊 Investment Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/sip-calculator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    📈 SIP Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/home-loan-calculator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    🏠 Home Loan Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/tech-stack-builder" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    💻 Tech Stack Builder
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/invoice-generator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    📄 Invoice Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/rent-slip-generator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    🏠 Rent Slip Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/calculator" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    🔢 Advanced Calculator
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} RedoHelp Tools – Fast tools, easy life.
                </p>
                </div>
            </div>
        </footer>
    );
}
