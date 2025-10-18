'use client';

import { useState, useEffect } from 'react';

interface InvestmentResult {
  principal: number;
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

export default function InvestmentCalculator() {
  const [principal, setPrincipal] = useState<string>('100000');
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('5000');
  const [annualReturn, setAnnualReturn] = useState<string>('12');
  const [years, setYears] = useState<string>('10');
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const calculateInvestment = () => {
    const P = parseFloat(principal);
    const PMT = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 100 / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total months

    if (P <= 0 || PMT <= 0 || r < 0 || n <= 0) {
      setResult(null);
      return;
    }

    // Future Value of Lump Sum
    const fvLumpSum = P * Math.pow(1 + r, n);
    
    // Future Value of Annuity (Monthly investments)
    const fvAnnuity = PMT * ((Math.pow(1 + r, n) - 1) / r);
    
    const finalAmount = fvLumpSum + fvAnnuity;
    const totalInvested = P + (PMT * n);
    const totalReturns = finalAmount - totalInvested;

    // Yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= parseFloat(years); year++) {
      const monthsInYear = year * 12;
      const yearInvested = P + (PMT * monthsInYear);
      const yearFV = P * Math.pow(1 + r, monthsInYear) + PMT * ((Math.pow(1 + r, monthsInYear) - 1) / r);
      const yearReturns = yearFV - yearInvested;
      
      yearlyBreakdown.push({
        year,
        invested: parseFloat(yearInvested.toFixed(2)),
        returns: parseFloat(yearReturns.toFixed(2)),
        total: parseFloat(yearFV.toFixed(2))
      });
    }

    setResult({
      principal: P,
      monthlyInvestment: PMT,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalReturns: parseFloat(totalReturns.toFixed(2)),
      finalAmount: parseFloat(finalAmount.toFixed(2)),
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateInvestment();
  }, [principal, monthlyInvestment, annualReturn, years, calculateInvestment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate compound interest and investment returns. Plan your financial future 
            with systematic investments and see how your money grows over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Investment Details
            </h2>
            
            <div className="space-y-6">
              {/* Initial Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Initial Investment (Lump Sum)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter initial investment"
                  />
                </div>
              </div>

              {/* Monthly Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Investment (SIP)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter monthly investment"
                  />
                </div>
              </div>

              {/* Annual Return Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
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
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="10"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    Years
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Investment Results
            </h2>
            
            {result ? (
              <div className="space-y-6">
                {/* Final Amount */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">Final Investment Value</p>
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
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Enter investment details to calculate returns
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Yearly Breakdown */}
        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Yearly Investment Growth
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Year</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Invested</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Returns</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{row.year}</td>
                      <td className="py-3 px-2 text-right text-gray-900 dark:text-white">
                        {formatCurrency(row.invested)}
                      </td>
                      <td className="py-3 px-2 text-right text-green-600 dark:text-green-400">
                        {formatCurrency(row.returns)}
                      </td>
                      <td className="py-3 px-2 text-right text-blue-600 dark:text-blue-400 font-semibold">
                        {formatCurrency(row.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            About Investment Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-medium mb-2">Investment Types</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Lump Sum Investment: One-time investment</li>
                <li>SIP: Systematic Investment Plan</li>
                <li>Compound Interest: Interest on interest</li>
                <li>Long-term Growth: Power of compounding</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Investment Tips</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Start early to maximize compounding</li>
                <li>Invest regularly through SIP</li>
                <li>Diversify your portfolio</li>
                <li>Review and rebalance periodically</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Expected Returns</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Equity Funds: 12-15% annually</li>
                <li>Debt Funds: 6-8% annually</li>
                <li>Hybrid Funds: 8-12% annually</li>
                <li>FD/RD: 5-7% annually</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Risk Factors</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Market volatility</li>
                <li>Inflation impact</li>
                <li>Economic conditions</li>
                <li>Regulatory changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
