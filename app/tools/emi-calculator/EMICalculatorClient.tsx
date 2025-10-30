'use client';

import { useState, useEffect, useCallback } from 'react';

interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  schedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState<string>('1000000');
  const [rate, setRate] = useState<string>('8.5');
  const [tenure, setTenure] = useState<string>('20');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<EMIResult | null>(null);
  const [showSchedule] = useState(true);

  // Calculate EMI
  const calculateEMI = useCallback(() => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100 / 12; // Monthly interest rate
    const N = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (P <= 0 || R < 0 || N <= 0) {
      setResult(null);
      return;
    }

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    // Generate amortization schedule
    const schedule = [];
    let balance = P;

    for (let month = 1; month <= N; month++) {
      const interestPayment = balance * R;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: parseFloat(emi.toFixed(2)),
        principal: parseFloat(principalPayment.toFixed(2)),
        interest: parseFloat(interestPayment.toFixed(2)),
        balance: Math.max(0, parseFloat(balance.toFixed(2)))
      });
    }

    setResult({
      emi: parseFloat(emi.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      schedule
    });
  }, [principal, rate, tenure, tenureType]);

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure, tenureType, calculateEMI]);

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
            EMI Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your Equated Monthly Installment (EMI) for home loans, personal loans, 
            car loans, and other financial products. Get detailed amortization schedule and 
            understand your loan better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Loan Details
            </h2>
            
            <div className="space-y-6">
              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount (Principal)
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
                    placeholder="Enter loan amount"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter interest rate"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Tenure
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter tenure"
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              EMI Calculation Results
            </h2>
            
            {result ? (
              <div className="space-y-6">
                {/* EMI Amount */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                    <p className="text-3xl font-bold">{formatCurrency(result.emi)}</p>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.totalAmount)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                </div>

                {/* Interest Percentage */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-1">
                    Interest as % of Principal
                  </p>
                  <p className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">
                    {((result.totalInterest / parseFloat(principal)) * 100).toFixed(2)}%
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Enter loan details to calculate EMI
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Amortization Schedule */}
        {result && showSchedule && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Amortization Schedule
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Month</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">EMI</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Principal</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Interest</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 12).map((row) => (
                    <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{row.month}</td>
                      <td className="py-3 px-2 text-right text-gray-900 dark:text-white">
                        {formatCurrency(row.emi)}
                      </td>
                      <td className="py-3 px-2 text-right text-green-600 dark:text-green-400">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="py-3 px-2 text-right text-red-600 dark:text-red-400">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-900 dark:text-white">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                  {result.schedule.length > 12 && (
                    <tr>
                      <td colSpan={5} className="py-3 px-2 text-center text-gray-500 dark:text-gray-400">
                        ... and {result.schedule.length - 12} more months
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            About EMI Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-medium mb-2">What is EMI?</h4>
              <p>
                EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower 
                to a lender at a specified date each calendar month.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">EMI Formula</h4>
              <p>
                EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]<br/>
                Where P = Principal, R = Monthly Interest Rate, N = Number of months
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Factors Affecting EMI</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Loan amount (Principal)</li>
                <li>Interest rate</li>
                <li>Loan tenure</li>
                <li>Processing fees</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips to Reduce EMI</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Increase down payment</li>
                <li>Choose longer tenure</li>
                <li>Negotiate lower interest rate</li>
                <li>Compare different lenders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
