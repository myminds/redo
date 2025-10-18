'use client';

import { useState, useCallback } from 'react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billTo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billFrom: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: InvoiceItem[];
  notes: string;
  taxRate: number;
  discount: number;
}

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    billTo: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    billFrom: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    items: [
      { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    notes: '',
    taxRate: 18,
    discount: 0
  });

  const [showPreview, setShowPreview] = useState(false);

  const updateInvoiceData = useCallback((field: string, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateBillTo = useCallback((field: string, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      billTo: {
        ...prev.billTo,
        [field]: value
      }
    }));
  }, []);

  const updateBillFrom = useCallback((field: string, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      billFrom: {
        ...prev.billFrom,
        [field]: value
      }
    }));
  }, []);

  const updateItem = useCallback((id: string, field: string, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  }, []);

  const addItem = useCallback(() => {
    const newId = (invoiceData.items.length + 1).toString();
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  }, [invoiceData.items.length]);

  const removeItem = useCallback((id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  }, []);

  const calculateSubtotal = useCallback(() => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  }, [invoiceData.items]);

  const calculateTax = useCallback(() => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    return (taxableAmount * invoiceData.taxRate) / 100;
  }, [calculateSubtotal, invoiceData.discount, invoiceData.taxRate]);

  const calculateTotal = useCallback(() => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * invoiceData.discount) / 100;
    const tax = calculateTax();
    return subtotal - discountAmount + tax;
  }, [calculateSubtotal, calculateTax, invoiceData.discount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handlePrint = () => {
    // Show invoice preview if hidden
    if (!showPreview) {
      setShowPreview(true);
      // Wait for DOM to update, then print
      setTimeout(() => {
        window.print();
      }, 100);
    } else {
      window.print();
    }
  };

  const generateNewInvoice = () => {
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
      notes: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-8 print:bg-white print:py-0">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Invoice Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create professional invoices quickly and easily. Generate, preview, and print 
            invoices with automatic calculations and professional formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:grid-cols-1 print:gap-0">
        {/* Invoice Form */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 print:hidden">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Invoice Details
            </h2>
            
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => updateInvoiceData('invoiceNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    value={invoiceData.invoiceDate}
                    onChange={(e) => updateInvoiceData('invoiceDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => updateInvoiceData('dueDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Bill From */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bill From</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billFrom.name}
                      onChange={(e) => updateBillFrom('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={invoiceData.billFrom.email}
                      onChange={(e) => updateBillFrom('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <textarea
                      value={invoiceData.billFrom.address}
                      onChange={(e) => updateBillFrom('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Street Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billFrom.city}
                      onChange={(e) => updateBillFrom('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billFrom.state}
                      onChange={(e) => updateBillFrom('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billFrom.zipCode}
                      onChange={(e) => updateBillFrom('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="ZIP Code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billFrom.country}
                      onChange={(e) => updateBillFrom('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bill To</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billTo.name}
                      onChange={(e) => updateBillTo('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Client Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={invoiceData.billTo.email}
                      onChange={(e) => updateBillTo('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="client@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <textarea
                      value={invoiceData.billTo.address}
                      onChange={(e) => updateBillTo('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Client Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billTo.city}
                      onChange={(e) => updateBillTo('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billTo.state}
                      onChange={(e) => updateBillTo('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billTo.zipCode}
                      onChange={(e) => updateBillTo('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="ZIP Code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={invoiceData.billTo.country}
                      onChange={(e) => updateBillTo('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Items</h3>
                  <button
                    onClick={addItem}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-4">
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Item description"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Qty
                        </label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rate
                        </label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Amount
                        </label>
                        <input
                          type="number"
                          value={item.amount}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="col-span-1">
                        {invoiceData.items.length > 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax and Discount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={invoiceData.taxRate}
                    onChange={(e) => updateInvoiceData('taxRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={invoiceData.discount}
                    onChange={(e) => updateInvoiceData('discount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={invoiceData.notes}
                  onChange={(e) => updateInvoiceData('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Additional notes or terms..."
                />
              </div>
            </div>
          </div>

        {/* Invoice Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 print:hidden">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Invoice Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(calculateSubtotal())}
                </span>
              </div>
              
              {invoiceData.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Discount ({invoiceData.discount}%):</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    -{formatCurrency((calculateSubtotal() * invoiceData.discount) / 100)}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax ({invoiceData.taxRate}%):</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(calculateTax())}
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              
              <button
                onClick={handlePrint}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Print Invoice
              </button>
              
              <button
                onClick={generateNewInvoice}
                className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                New Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Preview */}
        {showPreview && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 print:shadow-none print:rounded-none print:mt-0 print:bg-white print:block print:page-break-inside-avoid">
            <div className="max-w-4xl mx-auto">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">INVOICE</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Invoice #: {invoiceData.invoiceNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400">
                    Date: {new Date(invoiceData.invoiceDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Due: {new Date(invoiceData.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Bill From & Bill To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:grid-cols-2 print:gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill From:</h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p className="font-semibold">{invoiceData.billFrom.name}</p>
                    <p>{invoiceData.billFrom.email}</p>
                    <p>{invoiceData.billFrom.address}</p>
                    <p>{invoiceData.billFrom.city}, {invoiceData.billFrom.state} {invoiceData.billFrom.zipCode}</p>
                    <p>{invoiceData.billFrom.country}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill To:</h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p className="font-semibold">{invoiceData.billTo.name}</p>
                    <p>{invoiceData.billTo.email}</p>
                    <p>{invoiceData.billTo.address}</p>
                    <p>{invoiceData.billTo.city}, {invoiceData.billTo.state} {invoiceData.billTo.zipCode}</p>
                    <p>{invoiceData.billTo.country}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8 print:page-break-inside-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">Description</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold text-gray-900 dark:text-white">Qty</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">Rate</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">{item.description}</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-700 dark:text-gray-300">{item.quantity}</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-gray-700 dark:text-gray-300">{formatCurrency(item.rate)}</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-gray-700 dark:text-gray-300">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8 print:page-break-inside-avoid">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  
                  {invoiceData.discount > 0 && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Discount ({invoiceData.discount}%):</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        -{formatCurrency((calculateSubtotal() * invoiceData.discount) / 100)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">Tax ({invoiceData.taxRate}%):</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(calculateTax())}</span>
                  </div>
                  
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-2">
                    <div className="flex justify-between py-2">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-400">{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {invoiceData.notes && (
                <div className="mb-8 print:page-break-inside-avoid">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notes:</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{invoiceData.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 print:hidden">
          <h3 className="text-xl font-semibold text-teal-900 dark:text-teal-100 mb-4">
            About Invoice Generator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-teal-800 dark:text-teal-200">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Professional invoice templates</li>
                <li>Automatic calculations</li>
                <li>Tax and discount support</li>
                <li>Print-ready formatting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Invoice Components</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Invoice number and dates</li>
                <li>Bill from/to information</li>
                <li>Itemized billing</li>
                <li>Tax calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips for Professional Invoices</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear, descriptive item names</li>
                <li>Include payment terms</li>
                <li>Add your business logo</li>
                <li>Set appropriate due dates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Legal Considerations</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Include all required business details</li>
                <li>Follow local tax regulations</li>
                <li>Keep invoice records</li>
                <li>Use proper invoice numbering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
