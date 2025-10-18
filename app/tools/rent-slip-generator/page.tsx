'use client';

import React, { useState, useCallback } from 'react';

interface RentSlipData {
  receiptNumber: string;
  receiptDate: string;
  periodFrom: string;
  periodTo: string;
  landlord: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  tenant: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  property: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    type: string;
  };
  rentDetails: {
    monthlyRent: number;
    maintenance: number;
    waterCharges: number;
    electricityCharges: number;
    otherCharges: number;
    totalAmount: number;
    paymentMethod: string;
    paymentDate: string;
  };
  notes: string;
}

export default function RentSlipGenerator() {
  const [rentSlipData, setRentSlipData] = useState<RentSlipData>({
    receiptNumber: `RENT-${Date.now()}`,
    receiptDate: new Date().toISOString().split('T')[0],
    periodFrom: new Date().toISOString().split('T')[0],
    periodTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    landlord: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: ''
    },
    tenant: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: ''
    },
    property: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      type: 'Apartment'
    },
    rentDetails: {
      monthlyRent: 0,
      maintenance: 0,
      waterCharges: 0,
      electricityCharges: 0,
      otherCharges: 0,
      totalAmount: 0,
      paymentMethod: 'Cash',
      paymentDate: new Date().toISOString().split('T')[0]
    },
    notes: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const updateRentSlipData = useCallback((field: string, value: any) => {
    setRentSlipData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateLandlord = useCallback((field: string, value: string) => {
    setRentSlipData(prev => ({
      ...prev,
      landlord: {
        ...prev.landlord,
        [field]: value
      }
    }));
  }, []);

  const updateTenant = useCallback((field: string, value: string) => {
    setRentSlipData(prev => ({
      ...prev,
      tenant: {
        ...prev.tenant,
        [field]: value
      }
    }));
  }, []);

  const updateProperty = useCallback((field: string, value: string) => {
    setRentSlipData(prev => ({
      ...prev,
      property: {
        ...prev.property,
        [field]: value
      }
    }));
  }, []);

  const updateRentDetails = useCallback((field: string, value: any) => {
    setRentSlipData(prev => {
      const updatedRentDetails = {
        ...prev.rentDetails,
        [field]: value
      };
      
      // Calculate total amount
      updatedRentDetails.totalAmount = 
        updatedRentDetails.monthlyRent +
        updatedRentDetails.maintenance +
        updatedRentDetails.waterCharges +
        updatedRentDetails.electricityCharges +
        updatedRentDetails.otherCharges;

      return {
        ...prev,
        rentDetails: updatedRentDetails
      };
    });
  }, []);

  const handleRentInputChange = (field: string, value: string) => {
    // Remove leading zeros and convert to number
    const numericValue = value === '' ? 0 : parseFloat(value) || 0;
    updateRentDetails(field, numericValue);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePrint = () => {
    if (!showPreview) {
      setShowPreview(true);
      setTimeout(() => {
        window.print();
      }, 100);
    } else {
      window.print();
    }
  };

  const generateNewSlip = () => {
    setRentSlipData(prev => ({
      ...prev,
      receiptNumber: `RENT-${Date.now()}`,
      receiptDate: new Date().toISOString().split('T')[0],
      periodFrom: new Date().toISOString().split('T')[0],
      periodTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rentDetails: {
        ...prev.rentDetails,
        paymentDate: new Date().toISOString().split('T')[0],
        totalAmount: 0
      },
      notes: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-8 print:bg-white print:py-0">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              margin: 0 !important;
              size: A4 !important;
            }
            * {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
            .print-container {
              height: 100vh !important;
              max-height: 100vh !important;
              overflow: hidden !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              padding-top: 100px !important;
            }
            .print-container * {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            .print-content {
              padding: 10px !important;
            }
            .tenant-section {
              margin-top: 40px !important;
            }
            .rent-period-section {
              margin-top: 40px !important;
            }
            .notes-section {
              margin-top: 40px !important;
            }
            .signature-section {
              margin-top: 24px !important;
              padding-top: 24px !important;
            }
            .print-container .signature-section {
              margin-top: 24px !important;
              padding-top: 24px !important;
            }
            .print-content .signature-section {
              margin-top: 24px !important;
              padding-top: 24px !important;
            }
          }
        `
      }} />
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Home Rent Slip Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate professional rent receipts for landlords and tenants. 
            Create detailed rent slips with all necessary information and calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:grid-cols-1 print:gap-0">
          {/* Rent Slip Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 print:hidden">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Rent Slip Details
            </h2>
            
            <div className="space-y-6">
              {/* Receipt Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Receipt Number
                  </label>
                  <input
                    type="text"
                    value={rentSlipData.receiptNumber}
                    onChange={(e) => updateRentSlipData('receiptNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Receipt Date
                  </label>
                  <input
                    type="date"
                    value={rentSlipData.receiptDate}
                    onChange={(e) => updateRentSlipData('receiptDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={rentSlipData.rentDetails.paymentDate}
                    onChange={(e) => updateRentDetails('paymentDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Rent Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rent Period From
                  </label>
                  <input
                    type="date"
                    value={rentSlipData.periodFrom}
                    onChange={(e) => updateRentSlipData('periodFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rent Period To
                  </label>
                  <input
                    type="date"
                    value={rentSlipData.periodTo}
                    onChange={(e) => updateRentSlipData('periodTo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Landlord Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Landlord Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Landlord Name
                    </label>
                    <input
                      type="text"
                      value={rentSlipData.landlord.name}
                      onChange={(e) => updateLandlord('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Landlord Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={rentSlipData.landlord.phone}
                      onChange={(e) => updateLandlord('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={rentSlipData.landlord.email}
                      onChange={(e) => updateLandlord('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={rentSlipData.landlord.city}
                      onChange={(e) => updateLandlord('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="City"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <textarea
                      value={rentSlipData.landlord.address}
                      onChange={(e) => updateLandlord('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Landlord Address"
                    />
                  </div>
                </div>
              </div>

              {/* Tenant Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tenant Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tenant Name
                    </label>
                    <input
                      type="text"
                      value={rentSlipData.tenant.name}
                      onChange={(e) => updateTenant('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tenant Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={rentSlipData.tenant.phone}
                      onChange={(e) => updateTenant('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={rentSlipData.tenant.email}
                      onChange={(e) => updateTenant('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={rentSlipData.tenant.city}
                      onChange={(e) => updateTenant('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="City"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <textarea
                      value={rentSlipData.tenant.address}
                      onChange={(e) => updateTenant('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tenant Address"
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Type
                    </label>
                    <select
                      value={rentSlipData.property.type}
                      onChange={(e) => updateProperty('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Office">Office</option>
                      <option value="Shop">Shop</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={rentSlipData.property.city}
                      onChange={(e) => updateProperty('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Property City"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Address
                    </label>
                    <textarea
                      value={rentSlipData.property.address}
                      onChange={(e) => updateProperty('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Property Address"
                    />
                  </div>
                </div>
              </div>

              {/* Rent Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Rent Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monthly Rent
                    </label>
                    <input
                      type="number"
                      value={rentSlipData.rentDetails.monthlyRent || ''}
                      onChange={(e) => handleRentInputChange('monthlyRent', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Maintenance Charges
                    </label>
                    <input
                      type="number"
                      value={rentSlipData.rentDetails.maintenance || ''}
                      onChange={(e) => handleRentInputChange('maintenance', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Water Charges
                    </label>
                    <input
                      type="number"
                      value={rentSlipData.rentDetails.waterCharges || ''}
                      onChange={(e) => handleRentInputChange('waterCharges', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Electricity Charges
                    </label>
                    <input
                      type="number"
                      value={rentSlipData.rentDetails.electricityCharges || ''}
                      onChange={(e) => handleRentInputChange('electricityCharges', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Other Charges
                    </label>
                    <input
                      type="number"
                      value={rentSlipData.rentDetails.otherCharges || ''}
                      onChange={(e) => handleRentInputChange('otherCharges', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={rentSlipData.rentDetails.paymentMethod}
                      onChange={(e) => updateRentDetails('paymentMethod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="Online Payment">Online Payment</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={rentSlipData.notes}
                  onChange={(e) => updateRentSlipData('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Any additional notes or terms..."
                />
              </div>
            </div>
          </div>

          {/* Rent Slip Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 print:hidden">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Rent Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly Rent:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(rentSlipData.rentDetails.monthlyRent)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Maintenance:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(rentSlipData.rentDetails.maintenance)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Water Charges:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(rentSlipData.rentDetails.waterCharges)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Electricity:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(rentSlipData.rentDetails.electricityCharges)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Other Charges:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(rentSlipData.rentDetails.otherCharges)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Amount:</span>
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(rentSlipData.rentDetails.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full py-3 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              
              <button
                onClick={handlePrint}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Print Receipt
              </button>
              
              <button
                onClick={generateNewSlip}
                className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                New Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Rent Slip Preview */}
        {showPreview && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 print:shadow-none print:rounded-none print:mt-0 print:bg-white print:block print:p-0 print:page-break-inside-avoid print:max-h-screen print:overflow-hidden print:h-screen print:break-inside-avoid print:break-after-avoid print:break-before-avoid print-container print:absolute print:top-0 print:left-0 print:w-full print:z-50">
            <div className="max-w-4xl mx-auto print:max-w-none print:mx-0 print:h-full print:flex print:flex-col print-content">
              {/* Receipt Header */}
              <div className="text-center mb-3 print:mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 print:text-base print:mb-0">RENT RECEIPT</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 print:text-xs">
                  Receipt No: {rentSlipData.receiptNumber} | Date: {new Date(rentSlipData.receiptDate).toLocaleDateString()}
                </p>
              </div>

              {/* Receipt Details - More Compact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 print:mb-1 print:gap-2 print:grid-cols-2 tenant-section">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 print:text-sm">Received From (Tenant):</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">
                    <p className="font-semibold">{rentSlipData.tenant.name}</p>
                    <p>{rentSlipData.tenant.address}</p>
                    <p>{rentSlipData.tenant.city}, {rentSlipData.tenant.state} {rentSlipData.tenant.zipCode}</p>
                    <p>Phone: {rentSlipData.tenant.phone}</p>
                    <p>Email: {rentSlipData.tenant.email}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 print:text-sm">Property Details:</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">
                    <p className="font-semibold">{rentSlipData.property.type}</p>
                    <p>{rentSlipData.property.address}</p>
                    <p>{rentSlipData.property.city}, {rentSlipData.property.state} {rentSlipData.property.zipCode}</p>
                  </div>
                </div>
              </div>

              {/* Rent Period - Compact */}
              <div className="mb-2 print:mb-1 rent-period-section">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 print:text-sm print:mb-0">Rent Period:</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">
                  From: {new Date(rentSlipData.periodFrom).toLocaleDateString()} 
                  To: {new Date(rentSlipData.periodTo).toLocaleDateString()}
                </p>
              </div>

              {/* Rent Breakdown - Compact Table */}
              <div className="mb-3 print:mb-1">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm print:text-xs">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-white print:px-2 print:py-1">Description</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-right font-semibold text-gray-900 dark:text-white print:px-2 print:py-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300 print:px-2 print:py-1">Monthly Rent</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-right text-gray-700 dark:text-gray-300 print:px-2 print:py-1">{formatCurrency(rentSlipData.rentDetails.monthlyRent)}</td>
                    </tr>
                    {rentSlipData.rentDetails.maintenance > 0 && (
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300 print:px-2 print:py-1">Maintenance Charges</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-right text-gray-700 dark:text-gray-300 print:px-2 print:py-1">{formatCurrency(rentSlipData.rentDetails.maintenance)}</td>
                      </tr>
                    )}
                    {rentSlipData.rentDetails.waterCharges > 0 && (
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300 print:px-2 print:py-1">Water Charges</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-right text-gray-700 dark:text-gray-300 print:px-2 print:py-1">{formatCurrency(rentSlipData.rentDetails.waterCharges)}</td>
                      </tr>
                    )}
                    {rentSlipData.rentDetails.electricityCharges > 0 && (
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300 print:px-2 print:py-1">Electricity Charges</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-right text-gray-700 dark:text-gray-300 print:px-2 print:py-1">{formatCurrency(rentSlipData.rentDetails.electricityCharges)}</td>
                      </tr>
                    )}
                    {rentSlipData.rentDetails.otherCharges > 0 && (
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300 print:px-2 print:py-1">Other Charges</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-right text-gray-700 dark:text-gray-300 print:px-2 print:py-1">{formatCurrency(rentSlipData.rentDetails.otherCharges)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total Amount - Compact */}
              <div className="flex justify-end mb-3 print:mb-1">
                <div className="w-56 print:w-48">
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-2">
                    <div className="flex justify-between py-1">
                      <span className="text-base font-semibold text-gray-900 dark:text-white print:text-sm">Total Amount:</span>
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400 print:text-base">{formatCurrency(rentSlipData.rentDetails.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details & Landlord - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 print:mb-1 print:gap-2 print:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 print:text-sm">Landlord Details:</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">
                    <p className="font-semibold">{rentSlipData.landlord.name}</p>
                    <p>{rentSlipData.landlord.address}</p>
                    <p>{rentSlipData.landlord.city}, {rentSlipData.landlord.state} {rentSlipData.landlord.zipCode}</p>
                    <p>Phone: {rentSlipData.landlord.phone}</p>
                    <p>Email: {rentSlipData.landlord.email}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 print:text-sm">Payment Details:</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">
                    Payment Method: {rentSlipData.rentDetails.paymentMethod} | 
                    Payment Date: {new Date(rentSlipData.rentDetails.paymentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Notes - Compact */}
              {rentSlipData.notes && (
                <div className="mb-3 print:mb-1 notes-section">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 print:text-sm print:mb-0">Notes:</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap print:text-xs">{rentSlipData.notes}</p>
                </div>
              )}

              {/* Signature Line - Compact */}
              <div className="mt-4 print:mt-2 signature-section" style={{marginTop: '24px', paddingTop: '24px'}}>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">Landlord Signature</p>
                    <div className="border-b border-gray-300 dark:border-gray-600 w-40 mt-1 print:w-32 print:mt-0"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 print:text-xs">Date</p>
                    <div className="border-b border-gray-300 dark:border-gray-600 w-28 mt-1 print:w-24 print:mt-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 print:hidden">
          <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
            About Rent Slip Generator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-amber-800 dark:text-amber-200">
            <div>
              <h4 className="font-medium mb-2">Rent Receipt Components</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Receipt number and dates</li>
                <li>Landlord and tenant details</li>
                <li>Property information</li>
                <li>Rent breakdown and calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Legal Requirements</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Valid rent receipt for tax purposes</li>
                <li>Proof of rent payment</li>
                <li>Required for HRA claims</li>
                <li>Maintain proper records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Automatic calculations</li>
                <li>Professional formatting</li>
                <li>Print-ready receipts</li>
                <li>Comprehensive details</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Benefits</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Save time on manual receipts</li>
                <li>Professional appearance</li>
                <li>Legal compliance</li>
                <li>Easy record keeping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
