'use client';

import { useState, useEffect } from 'react';

interface SalaryBreakdown {
  grossSalary: number;
  basicSalary: number;
  hra: number;
  da: number;
  allowances: number;
  providentFund: number;
  esi: number;
  professionalTax: number;
  incomeTax: number;
  netSalary: number;
  totalDeductions: number;
  ctc: number;
}

interface TaxSlab {
  min: number;
  max: number;
  rate: number;
}

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState<string>('600000');
  const [basicPercentage, setBasicPercentage] = useState<string>('40');
  const [hraPercentage, setHraPercentage] = useState<string>('40');
  const [daPercentage, setDaPercentage] = useState<string>('10');
  const [pfPercentage, setPfPercentage] = useState<string>('12');
  const [esiPercentage, setEsiPercentage] = useState<string>('0.75');
  const [professionalTax, setProfessionalTax] = useState<string>('200');
  const [result, setResult] = useState<SalaryBreakdown | null>(null);
  const [showBreakdown] = useState(true);

  // Indian Income Tax Slabs for FY 2024-25
  const taxSlabs: TaxSlab[] = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 600000, rate: 5 },
    { min: 600000, max: 900000, rate: 10 },
    { min: 900000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 }
  ];

  const calculateIncomeTax = (annualIncome: number): number => {
    let tax = 0;
    let remainingIncome = annualIncome;

    for (const slab of taxSlabs) {
      if (remainingIncome <= 0) break;
      
      const taxableInThisSlab = Math.min(remainingIncome, slab.max - slab.min);
      if (taxableInThisSlab > 0) {
        tax += (taxableInThisSlab * slab.rate) / 100;
        remainingIncome -= taxableInThisSlab;
      }
    }

    return tax;
  };

  const calculateSalary = () => {
    const ctcAmount = parseFloat(ctc);
    const basicPercent = parseFloat(basicPercentage) / 100;
    const hraPercent = parseFloat(hraPercentage) / 100;
    const daPercent = parseFloat(daPercentage) / 100;
    const pfPercent = parseFloat(pfPercentage) / 100;
    const esiPercent = parseFloat(esiPercentage) / 100;
    const profTax = parseFloat(professionalTax);

    if (ctcAmount <= 0) {
      setResult(null);
      return;
    }

    // Calculate components
    const basicSalary = ctcAmount * basicPercent;
    const hra = basicSalary * hraPercent;
    const da = basicSalary * daPercent;
    const allowances = ctcAmount - basicSalary - hra - da;
    
    // Monthly calculations
    const monthlyBasic = basicSalary / 12;
    const monthlyHra = hra / 12;
    const monthlyDa = da / 12;
    const monthlyAllowances = allowances / 12;
    const grossSalary = monthlyBasic + monthlyHra + monthlyDa + monthlyAllowances;

    // Deductions
    const providentFund = monthlyBasic * pfPercent;
    const esi = grossSalary * esiPercent;
    const monthlyProfTax = profTax;

    // Annual income for tax calculation
    const annualGrossSalary = grossSalary * 12;
    const annualIncomeTax = calculateIncomeTax(annualGrossSalary);
    const monthlyIncomeTax = annualIncomeTax / 12;

    const totalDeductions = providentFund + esi + monthlyProfTax + monthlyIncomeTax;
    const netSalary = grossSalary - totalDeductions;

    setResult({
      grossSalary: parseFloat(grossSalary.toFixed(2)),
      basicSalary: parseFloat(monthlyBasic.toFixed(2)),
      hra: parseFloat(monthlyHra.toFixed(2)),
      da: parseFloat(monthlyDa.toFixed(2)),
      allowances: parseFloat(monthlyAllowances.toFixed(2)),
      providentFund: parseFloat(providentFund.toFixed(2)),
      esi: parseFloat(esi.toFixed(2)),
      professionalTax: parseFloat(monthlyProfTax.toFixed(2)),
      incomeTax: parseFloat(monthlyIncomeTax.toFixed(2)),
      netSalary: parseFloat(netSalary.toFixed(2)),
      totalDeductions: parseFloat(totalDeductions.toFixed(2)),
      ctc: ctcAmount
    });
  };

  useEffect(() => {
    calculateSalary();
  }, [ctc, basicPercentage, hraPercentage, daPercentage, pfPercentage, esiPercentage, professionalTax, calculateSalary]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Salary Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your take-home salary, deductions, and tax implications. 
            Get detailed breakdown of your CTC, gross salary, and net salary with 
            all statutory deductions as per Indian tax laws.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Salary Details
            </h2>
            
            <div className="space-y-6">
              {/* CTC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cost to Company (CTC)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter CTC"
                  />
                </div>
              </div>

              {/* Basic Salary Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Basic Salary (% of CTC)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={basicPercentage}
                    onChange={(e) => setBasicPercentage(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="40"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* HRA Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  HRA (% of Basic)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={hraPercentage}
                    onChange={(e) => setHraPercentage(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="40"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* DA Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  DA (% of Basic)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={daPercentage}
                    onChange={(e) => setDaPercentage(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="10"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* PF Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Provident Fund (% of Basic)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={pfPercentage}
                    onChange={(e) => setPfPercentage(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* ESI Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ESI (% of Gross)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={esiPercentage}
                    onChange={(e) => setEsiPercentage(e.target.value)}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="0.75"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>

              {/* Professional Tax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Tax (Monthly)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={professionalTax}
                    onChange={(e) => setProfessionalTax(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Salary Breakdown
            </h2>
            
            {result ? (
              <div className="space-y-6">
                {/* Net Salary */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">Take Home Salary</p>
                    <p className="text-3xl font-bold">{formatCurrency(result.netSalary)}</p>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gross Salary</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.grossSalary)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Deductions</p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.totalDeductions)}
                    </p>
                  </div>
                </div>

                {/* Deduction Percentage */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-1">
                    Deduction as % of Gross
                  </p>
                  <p className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">
                    {((result.totalDeductions / result.grossSalary) * 100).toFixed(2)}%
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Enter salary details to calculate take-home pay
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Breakdown */}
        {result && showBreakdown && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Detailed Salary Breakdown
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Earnings */}
              <div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                  Earnings (Monthly)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Basic Salary</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.basicSalary)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">HRA</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.hra)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">DA</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.da)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Other Allowances</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(result.allowances)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-50 dark:bg-green-900/20 rounded-lg px-3">
                    <span className="font-semibold text-green-800 dark:text-green-200">Gross Salary</span>
                    <span className="font-bold text-green-900 dark:text-green-100">
                      {formatCurrency(result.grossSalary)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Deductions (Monthly)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Provident Fund</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.providentFund)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">ESI</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.esi)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Professional Tax</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.professionalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Income Tax (TDS)</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(result.incomeTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-red-50 dark:bg-red-900/20 rounded-lg px-3">
                    <span className="font-semibold text-red-800 dark:text-red-200">Total Deductions</span>
                    <span className="font-bold text-red-900 dark:text-red-100">
                      {formatCurrency(result.totalDeductions)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                  Net Take-Home Salary
                </span>
                <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatCurrency(result.netSalary)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
            About Salary Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-purple-800 dark:text-purple-200">
            <div>
              <h4 className="font-medium mb-2">Salary Components</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Basic Salary: Core salary component</li>
                <li>HRA: House Rent Allowance</li>
                <li>DA: Dearness Allowance</li>
                <li>Other Allowances: Transport, medical, etc.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Statutory Deductions</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Provident Fund (PF): 12% of basic salary</li>
                <li>ESI: Employee State Insurance</li>
                <li>Professional Tax: State-specific</li>
                <li>Income Tax: As per tax slabs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tax Slabs (FY 2024-25)</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Up to ₹3,00,000: 0%</li>
                <li>₹3,00,001 - ₹6,00,000: 5%</li>
                <li>₹6,00,001 - ₹9,00,000: 10%</li>
                <li>₹9,00,001 - ₹12,00,000: 15%</li>
                <li>₹12,00,001 - ₹15,00,000: 20%</li>
                <li>Above ₹15,00,000: 30%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips to Optimize Salary</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Maximize HRA exemption</li>
                <li>Utilize Section 80C deductions</li>
                <li>Claim medical allowances</li>
                <li>Consider LTA benefits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
