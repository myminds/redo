'use client';

import { useState, useEffect } from 'react';

interface HomeLoanResult {
  loanAmount: number;
  emi: number;
  totalAmount: number;
  totalInterest: number;
  eligibility: number;
  schedule: Array<{
    year: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function HomeLoanCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>('5000000');
  const [downPayment, setDownPayment] = useState<string>('1000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [tenure, setTenure] = useState<string>('20');
  const [income, setIncome] = useState<string>('100000');
  const [result, setResult] = useState<HomeLoanResult | null>(null);

  const calculateHomeLoan = () => {
    const propertyVal = parseFloat(propertyValue);
    const downPay = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const months = parseFloat(tenure) * 12; // Total months
    const monthlyIncome = parseFloat(income);

    if (propertyVal <= 0 || downPay < 0 || rate < 0 || months <= 0 || monthlyIncome <= 0) {
      setResult(null);
      return;
    }

    const loanAmount = propertyVal - downPay;
    
    if (loanAmount <= 0) {
      setResult(null);
      return;
    }

    // EMI Calculation
    const emi = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;

    // Eligibility calculation (EMI should not exceed 40% of monthly income)
    const maxEMI = monthlyIncome * 0.4;
    const eligibleLoanAmount = (maxEMI * (Math.pow(1 + rate, months) - 1)) / (rate * Math.pow(1 + rate, months));

    // Yearly breakdown
    const schedule = [];
    let balance = loanAmount;

    for (let year = 1; year <= parseFloat(tenure); year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interestPayment = balance * rate;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
      }
      
      schedule.push({
        year,
        emi: parseFloat((emi * 12).toFixed(2)),
        principal: parseFloat(yearlyPrincipal.toFixed(2)),
        interest: parseFloat(yearlyInterest.toFixed(2)),
        balance: Math.max(0, parseFloat(balance.toFixed(2)))
      });
    }

    setResult({
      loanAmount: parseFloat(loanAmount.toFixed(2)),
      emi: parseFloat(emi.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      eligibility: parseFloat(eligibleLoanAmount.toFixed(2)),
      schedule
    });
  };

  useEffect(() => {
    calculateHomeLoan();
  }, [propertyValue, downPayment, interestRate, tenure, income, calculateHomeLoan]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Home Loan Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate home loan EMI, eligibility, and total interest. Plan your home purchase 
            with detailed loan analysis and repayment schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Loan Details
            </h2>
            
            <div className="space-y-6">
              {/* Property Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Property Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter property value"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter down payment"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Down Payment: {((parseFloat(downPayment) / parseFloat(propertyValue)) * 100).toFixed(1)}% of property value
                </p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (Annual)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="8.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Tenure
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="20"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    Years
                  </span>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter monthly income"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Loan Analysis
            </h2>
            
            {result ? (
              <div className="space-y-6">
                {/* EMI */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                    <p className="text-3xl font-bold">{formatCurrency(result.emi)}</p>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Loan Amount</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.loanAmount)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-green-800 dark:text-green-200 mb-1">
                    Maximum Loan Eligibility
                  </p>
                  <p className="text-xl font-semibold text-green-900 dark:text-green-100">
                    {formatCurrency(result.eligibility)}
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Based on 40% of monthly income
                  </p>
                </div>

                {/* EMI to Income Ratio */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-1">
                    EMI to Income Ratio
                  </p>
                  <p className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">
                    {((result.emi / parseFloat(income)) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Recommended: Below 40%
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

        {/* Yearly Breakdown */}
        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Yearly Repayment Schedule
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Year</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">EMI</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Principal</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Interest</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 10).map((row) => (
                    <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{row.year}</td>
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
                  {result.schedule.length > 10 && (
                    <tr>
                      <td colSpan={5} className="py-3 px-2 text-center text-gray-500 dark:text-gray-400">
                        ... and {result.schedule.length - 10} more years
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4">
            About Home Loan Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-orange-800 dark:text-orange-200">
            <div>
              <h4 className="font-medium mb-2">Loan Components</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Principal: Loan amount borrowed</li>
                <li>Interest: Cost of borrowing</li>
                <li>EMI: Equated Monthly Installment</li>
                <li>Down Payment: Initial payment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Eligibility Factors</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Monthly income</li>
                <li>Credit score</li>
                <li>Employment stability</li>
                <li>Existing liabilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tax Benefits</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Section 80C: Principal repayment</li>
                <li>Section 24: Interest deduction</li>
                <li>Section 80EE: First-time buyers</li>
                <li>Section 80EEA: Affordable housing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips for Home Loan</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Compare interest rates</li>
                <li>Check processing fees</li>
                <li>Consider prepayment options</li>
                <li>Maintain good credit score</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
