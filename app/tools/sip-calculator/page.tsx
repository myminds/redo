'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SIPResult {
  monthlyInvestment: number;
  totalInvested: number;
  totalReturns: number;
  finalAmount: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    returns: number;
    total: number;
  }>;
}

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('5000');
  const [annualReturn, setAnnualReturn] = useState<string>('12');
  const [years, setYears] = useState<string>('10');
  const [result, setResult] = useState<SIPResult | null>(null);

  const calculateSIP = () => {
    const PMT = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 100 / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total months

    if (PMT <= 0 || r < 0 || n <= 0) {
      setResult(null);
      return;
    }

    // Future Value of SIP
    const fv = PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = PMT * n;
    const totalReturns = fv - totalInvested;

    // Yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= parseFloat(years); year++) {
      const monthsInYear = year * 12;
      const yearInvested = PMT * monthsInYear;
      const yearFV = PMT * ((Math.pow(1 + r, monthsInYear) - 1) / r) * (1 + r);
      const yearReturns = yearFV - yearInvested;
      
      yearlyBreakdown.push({
        year,
        invested: parseFloat(yearInvested.toFixed(2)),
        returns: parseFloat(yearReturns.toFixed(2)),
        total: parseFloat(yearFV.toFixed(2))
      });
    }

    setResult({
      monthlyInvestment: PMT,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalReturns: parseFloat(totalReturns.toFixed(2)),
      finalAmount: parseFloat(fv.toFixed(2)),
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, annualReturn, years]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            SIP Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate SIP returns and maturity amount. Plan your systematic investment 
            journey and see how regular investments can grow your wealth over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              SIP Details
            </h2>
            
            <div className="space-y-6">
              {/* Monthly Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly SIP Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter monthly SIP amount"
                  />
                </div>
              </div>

              {/* Expected Return */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Historical equity returns: 12-15% annually
                </p>
              </div>

              {/* Investment Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Period
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="10"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    Years
                  </span>
                </div>
              </div>

              {/* Quick Amounts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Amount Selection
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMonthlyInvestment('1000')}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    ₹1,000
                  </button>
                  <button
                    onClick={() => setMonthlyInvestment('5000')}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    ₹5,000
                  </button>
                  <button
                    onClick={() => setMonthlyInvestment('10000')}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    ₹10,000
                  </button>
                  <button
                    onClick={() => setMonthlyInvestment('25000')}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    ₹25,000
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              SIP Returns
            </h2>
            
            {result ? (
              <div className="space-y-6">
                {/* Final Amount */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">Maturity Amount</p>
                    <p className="text-3xl font-bold">{formatCurrency(result.finalAmount)}</p>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.totalInvested)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Returns</p>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(result.totalReturns)}
                    </p>
                  </div>
                </div>

                {/* Return Percentage */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-green-800 dark:text-green-200 mb-1">
                    Return on Investment
                  </p>
                  <p className="text-xl font-semibold text-green-900 dark:text-green-100">
                    {((result.totalReturns / result.totalInvested) * 100).toFixed(2)}%
                  </p>
                </div>

                {/* Wealth Multiplier */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                    Wealth Multiplier
                  </p>
                  <p className="text-xl font-semibold text-blue-900 dark:text-blue-100">
                    {(result.finalAmount / result.totalInvested).toFixed(2)}x
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Your money grows by this factor
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Enter SIP details to calculate returns
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Yearly Breakdown */}
        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Yearly SIP Growth
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Year</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Invested</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Returns</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Total Value</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Growth %</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row, index) => (
                    <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{row.year}</td>
                      <td className="py-3 px-2 text-right text-gray-900 dark:text-white">
                        {formatCurrency(row.invested)}
                      </td>
                      <td className="py-3 px-2 text-right text-green-600 dark:text-green-400">
                        {formatCurrency(row.returns)}
                      </td>
                      <td className="py-3 px-2 text-right text-red-600 dark:text-red-400 font-semibold">
                        {formatCurrency(row.total)}
                      </td>
                      <td className="py-3 px-2 text-right text-blue-600 dark:text-blue-400">
                        {index > 0 ? 
                          (((row.total - result.yearlyBreakdown[index-1].total) / result.yearlyBreakdown[index-1].total) * 100).toFixed(1) + '%' 
                          : '-'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-4">
            About SIP Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-red-800 dark:text-red-200">
            <div>
              <h4 className="font-medium mb-2">What is SIP?</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Systematic Investment Plan</li>
                <li>Regular monthly investments</li>
                <li>Rupee cost averaging</li>
                <li>Disciplined investing approach</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">SIP Benefits</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Power of compounding</li>
                <li>Reduces market timing risk</li>
                <li>Affordable investment amounts</li>
                <li>Flexible investment options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Expected Returns</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Large Cap Funds: 10-12%</li>
                <li>Mid Cap Funds: 12-15%</li>
                <li>Small Cap Funds: 15-18%</li>
                <li>Index Funds: 10-12%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">SIP Tips</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Start early for maximum benefit</li>
                <li>Increase SIP amount annually</li>
                <li>Stay invested for long term</li>
                <li>Don't stop during market falls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
