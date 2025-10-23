'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function AdvancedCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);
  const [isScientific, setIsScientific] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [expression] = useState('');
  // const [showExpression] = useState(false);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  // const [precision] = useState(10);
  const [showConstants, setShowConstants] = useState(false);
  const [showConverter, setShowConverter] = useState(false);
  const [converterType, setConverterType] = useState('length');
  const [converterFrom, setConverterFrom] = useState('meter');
  const [converterTo, setConverterTo] = useState('kilometer');
  const [converterValue, setConverterValue] = useState('1');

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculateValue(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculateValue(previousValue, inputValue, operation);
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const calculateValue = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '^':
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const performScientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;
    let funcName: string;

    const angleMultiplier = angleMode === 'DEG' ? Math.PI / 180 : 1;

    switch (func) {
      case 'sin':
        result = Math.sin(value * angleMultiplier);
        funcName = 'sin';
        break;
      case 'cos':
        result = Math.cos(value * angleMultiplier);
        funcName = 'cos';
        break;
      case 'tan':
        result = Math.tan(value * angleMultiplier);
        funcName = 'tan';
        break;
      case 'asin':
        result = Math.asin(value) / angleMultiplier;
        funcName = 'sin⁻¹';
        break;
      case 'acos':
        result = Math.acos(value) / angleMultiplier;
        funcName = 'cos⁻¹';
        break;
      case 'atan':
        result = Math.atan(value) / angleMultiplier;
        funcName = 'tan⁻¹';
        break;
      case 'sinh':
        result = Math.sinh(value);
        funcName = 'sinh';
        break;
      case 'cosh':
        result = Math.cosh(value);
        funcName = 'cosh';
        break;
      case 'tanh':
        result = Math.tanh(value);
        funcName = 'tanh';
        break;
      case 'log':
        result = Math.log10(value);
        funcName = 'log';
        break;
      case 'ln':
        result = Math.log(value);
        funcName = 'ln';
        break;
      case 'log2':
        result = Math.log2(value);
        funcName = 'log₂';
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        funcName = '√';
        break;
      case 'cbrt':
        result = Math.cbrt(value);
        funcName = '∛';
        break;
      case 'square':
        result = Math.pow(value, 2);
        funcName = 'x²';
        break;
      case 'cube':
        result = Math.pow(value, 3);
        funcName = 'x³';
        break;
      case 'factorial':
        result = factorial(value);
        funcName = '!';
        break;
      case 'abs':
        result = Math.abs(value);
        funcName = '|x|';
        break;
      case 'ceil':
        result = Math.ceil(value);
        funcName = '⌈x⌉';
        break;
      case 'floor':
        result = Math.floor(value);
        funcName = '⌊x⌋';
        break;
      case 'round':
        result = Math.round(value);
        funcName = 'round';
        break;
      case 'exp':
        result = Math.exp(value);
        funcName = 'eˣ';
        break;
      case 'pi':
        result = Math.PI;
        funcName = 'π';
        break;
      case 'e':
        result = Math.E;
        funcName = 'e';
        break;
      case 'random':
        result = Math.random();
        funcName = 'rand';
        break;
      default:
        return;
    }

    const calculation = `${funcName}(${value}) = ${result}`;
    setHistory(prev => [calculation, ...prev.slice(0, 9)]);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const memoryOperation = (op: string) => {
    const value = parseFloat(display);
    switch (op) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + value);
        break;
      case 'M-':
        setMemory(memory - value);
        break;
    }
  };

  // Unit conversion functions
  const convertUnit = (value: number, from: string, to: string, type: string): number => {
    const conversions: { [key: string]: { [key: string]: number } } = {
      length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        inch: 39.3701,
        foot: 3.28084,
        yard: 1.09361,
        mile: 0.000621371
      },
      weight: {
        kilogram: 1,
        gram: 1000,
        pound: 2.20462,
        ounce: 35.274,
        ton: 0.001,
        stone: 0.157473
      },
      temperature: {
        celsius: 1,
        fahrenheit: 1,
        kelvin: 1
      },
      area: {
        'square meter': 1,
        'square kilometer': 0.000001,
        'square foot': 10.7639,
        'square inch': 1550,
        acre: 0.000247105,
        hectare: 0.0001
      },
      volume: {
        liter: 1,
        milliliter: 1000,
        'cubic meter': 0.001,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        cup: 4.22675
      }
    };

    if (type === 'temperature') {
      if (from === 'celsius' && to === 'fahrenheit') return (value * 9/5) + 32;
      if (from === 'fahrenheit' && to === 'celsius') return (value - 32) * 5/9;
      if (from === 'celsius' && to === 'kelvin') return value + 273.15;
      if (from === 'kelvin' && to === 'celsius') return value - 273.15;
      if (from === 'fahrenheit' && to === 'kelvin') return ((value - 32) * 5/9) + 273.15;
      if (from === 'kelvin' && to === 'fahrenheit') return ((value - 273.15) * 9/5) + 32;
      return value;
    }

    const fromFactor = conversions[type]?.[from] || 1;
    const toFactor = conversions[type]?.[to] || 1;
    return (value / fromFactor) * toFactor;
  };

  const performConversion = () => {
    const value = parseFloat(converterValue);
    const result = convertUnit(value, converterFrom, converterTo, converterType);
    setDisplay(String(result));
    setHistory(prev => [`${value} ${converterFrom} = ${result} ${converterTo}`, ...prev.slice(0, 9)]);
  };

  // Mathematical constants
  const constants = {
    'π': Math.PI,
    'e': Math.E,
    'φ': 1.618033988749, // Golden ratio
    '√2': Math.sqrt(2),
    '√3': Math.sqrt(3),
    '√5': Math.sqrt(5),
    'ln(2)': Math.log(2),
    'ln(10)': Math.log(10),
    'log₂(e)': Math.log2(Math.E),
    'c': 299792458, // Speed of light
    'G': 6.67430e-11, // Gravitational constant
    'h': 6.62607015e-34, // Planck constant
    'k': 1.380649e-23, // Boltzmann constant
    'R': 8.314462618, // Gas constant
    'Nₐ': 6.02214076e23, // Avogadro's number
  };

  const insertConstant = (constant: string) => {
    const value = constants[constant as keyof typeof constants];
    setDisplay(String(value));
    setWaitingForOperand(true);
    setShowConstants(false);
  };

  const Button = ({ onClick, className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={`h-10 rounded-lg font-medium text-base transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const NumberButton = ({ number }: { number: string }) => (
    <Button
      onClick={() => inputNumber(number)}
      className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
    >
      {number}
    </Button>
  );

  const OperationButton = ({ op, className = '' }: { op: string; className?: string }) => (
    <Button
      onClick={() => performOperation(op)}
      className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} ${className}`}
    >
      {op}
    </Button>
  );

  const ScientificButton = ({ func, label }: { func: string; label: string }) => (
    <Button
      onClick={() => performScientificFunction(func)}
      className={`${isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'} text-sm`}
    >
      {label}
    </Button>
  );

  const MemoryButton = ({ op, label }: { op: string; label: string }) => (
    <Button
      onClick={() => memoryOperation(op)}
      className={`${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} text-sm`}
    >
      {label}
    </Button>
  );

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [backspace, calculate, clear, inputDecimal, inputNumber, performOperation]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Main Calculator Area */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calculator */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl shadow-2xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Display */}
              <div className={`mb-3 p-3 rounded-lg text-right ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
                <div className="text-2xl font-mono font-bold overflow-hidden min-h-[40px] flex items-center justify-end">
                  {display}
                </div>
                {memory !== 0 && (
                  <div className="text-xs text-blue-500 mt-1">
                    Memory: {memory}
                  </div>
                )}
          </div>

              {/* Controls */}
              <div className="flex flex-wrap justify-between items-center mb-2 gap-1">
                <div className="flex gap-1 flex-wrap">
                  <Button
                    onClick={() => setIsScientific(!isScientific)}
                    className={`${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'} text-xs px-2 h-7`}
                  >
                    {isScientific ? 'Basic' : 'Scientific'}
                  </Button>
                  <Button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`${isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'} text-xs px-2 h-7`}
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </Button>
                  <Button
                    onClick={() => setShowConstants(!showConstants)}
                    className={`${isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'} text-xs px-2 h-7`}
                  >
                    Constants
                  </Button>
                  <Button
                    onClick={() => setShowConverter(!showConverter)}
                    className={`${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} text-xs px-2 h-7`}
                  >
                    Converter
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
                    className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} text-xs px-2 h-7`}
                  >
                    {angleMode}
                  </Button>
                  <Button
                    onClick={clear}
                    className={`${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} text-xs px-2 h-7`}
                  >
                    Clear
                  </Button>
                </div>
                      </div>
                      
              {/* Memory Functions */}
              <div className="grid grid-cols-4 gap-1 mb-2">
                <MemoryButton op="MC" label="MC" />
                <MemoryButton op="MR" label="MR" />
                <MemoryButton op="M+" label="M+" />
                <MemoryButton op="M-" label="M-" />
                        </div>
                        
              {/* Scientific Functions */}
              {isScientific && (
                <div className="grid grid-cols-6 gap-1 mb-2">
                  <ScientificButton func="sin" label="sin" />
                  <ScientificButton func="cos" label="cos" />
                  <ScientificButton func="tan" label="tan" />
                  <ScientificButton func="asin" label="sin⁻¹" />
                  <ScientificButton func="acos" label="cos⁻¹" />
                  <ScientificButton func="atan" label="tan⁻¹" />
                  <ScientificButton func="sinh" label="sinh" />
                  <ScientificButton func="cosh" label="cosh" />
                  <ScientificButton func="tanh" label="tanh" />
                  <ScientificButton func="log" label="log" />
                  <ScientificButton func="ln" label="ln" />
                  <ScientificButton func="log2" label="log₂" />
                  <ScientificButton func="sqrt" label="√" />
                  <ScientificButton func="cbrt" label="∛" />
                  <ScientificButton func="square" label="x²" />
                  <ScientificButton func="cube" label="x³" />
                  <ScientificButton func="factorial" label="n!" />
                  <ScientificButton func="abs" label="|x|" />
                  <ScientificButton func="ceil" label="⌈x⌉" />
                  <ScientificButton func="floor" label="⌊x⌋" />
                  <ScientificButton func="round" label="round" />
                  <ScientificButton func="exp" label="eˣ" />
                  <ScientificButton func="pi" label="π" />
                  <ScientificButton func="e" label="e" />
                  <ScientificButton func="random" label="rand" />
                  <OperationButton op="^" className="text-sm" />
                </div>
              )}

              {/* Constants Panel */}
              {showConstants && (
                <div className={`mb-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Mathematical Constants
                  </h3>
                  <div className="grid grid-cols-4 gap-1">
                    {Object.keys(constants).map((constant) => (
                      <Button
                        key={constant}
                        onClick={() => insertConstant(constant)}
                        className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} text-xs h-7`}
                      >
                        {constant}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Unit Converter Panel */}
              {showConverter && (
                <div className={`mb-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Unit Converter
                  </h3>
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    <select
                      value={converterType}
                      onChange={(e) => setConverterType(e.target.value)}
                      className={`p-1 rounded text-xs ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    >
                      <option value="length">Length</option>
                      <option value="weight">Weight</option>
                      <option value="temperature">Temperature</option>
                      <option value="area">Area</option>
                      <option value="volume">Volume</option>
                    </select>
                    <input
                      type="number"
                      value={converterValue}
                      onChange={(e) => setConverterValue(e.target.value)}
                      placeholder="Value"
                      className={`p-1 rounded text-xs ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    <select
                      value={converterFrom}
                      onChange={(e) => setConverterFrom(e.target.value)}
                      className={`p-1 rounded text-xs ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    >
                      {converterType === 'length' && (
                        <>
                          <option value="meter">Meter</option>
                          <option value="kilometer">Kilometer</option>
                          <option value="centimeter">Centimeter</option>
                          <option value="inch">Inch</option>
                          <option value="foot">Foot</option>
                        </>
                      )}
                      {converterType === 'weight' && (
                        <>
                          <option value="kilogram">Kilogram</option>
                          <option value="gram">Gram</option>
                          <option value="pound">Pound</option>
                          <option value="ounce">Ounce</option>
                        </>
                      )}
                      {converterType === 'temperature' && (
                        <>
                          <option value="celsius">Celsius</option>
                          <option value="fahrenheit">Fahrenheit</option>
                          <option value="kelvin">Kelvin</option>
                        </>
                      )}
                    </select>
                    <select
                      value={converterTo}
                      onChange={(e) => setConverterTo(e.target.value)}
                      className={`p-1 rounded text-xs ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    >
                      {converterType === 'length' && (
                        <>
                          <option value="kilometer">Kilometer</option>
                          <option value="meter">Meter</option>
                          <option value="centimeter">Centimeter</option>
                          <option value="inch">Inch</option>
                          <option value="foot">Foot</option>
                        </>
                      )}
                      {converterType === 'weight' && (
                        <>
                          <option value="pound">Pound</option>
                          <option value="kilogram">Kilogram</option>
                          <option value="gram">Gram</option>
                          <option value="ounce">Ounce</option>
                        </>
                      )}
                      {converterType === 'temperature' && (
                        <>
                          <option value="fahrenheit">Fahrenheit</option>
                          <option value="celsius">Celsius</option>
                          <option value="kelvin">Kelvin</option>
                        </>
                      )}
                    </select>
                  </div>
                  <Button
                    onClick={performConversion}
                    className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} text-xs h-7`}
                  >
                    Convert
                  </Button>
                </div>
              )}

              {/* Main Calculator Grid */}
              <div className="grid grid-cols-4 gap-1">
                {/* Row 1 */}
                <Button
                  onClick={backspace}
                  className={`${isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                >
                  ⌫
                </Button>
                <Button
                  onClick={() => setDisplay('0')}
                  className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  C
                </Button>
                <Button
                  onClick={() => setDisplay(String(-parseFloat(display)))}
                  className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  ±
                </Button>
                <OperationButton op="÷" />

                {/* Row 2 */}
                <NumberButton number="7" />
                <NumberButton number="8" />
                <NumberButton number="9" />
                <OperationButton op="×" />

                {/* Row 3 */}
                <NumberButton number="4" />
                <NumberButton number="5" />
                <NumberButton number="6" />
                <OperationButton op="-" />

                {/* Row 4 */}
                <NumberButton number="1" />
                <NumberButton number="2" />
                <NumberButton number="3" />
                <OperationButton op="+" />

                {/* Row 5 */}
                <NumberButton number="0" />
                <Button
                  onClick={inputDecimal}
                  className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                  .
                </Button>
                <Button
                  onClick={calculate}
                  className={`${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} col-span-2`}
                >
                  =
                </Button>
                          </div>
                      </div>
                    </div>

          {/* History Panel */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl shadow-2xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                History
              </h2>
              <div className={`max-h-80 overflow-y-auto space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {history.length === 0 ? (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No calculations yet
                  </p>
                ) : (
                  history.map((item, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-xs font-mono ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      {item}
                    </div>
                  ))
                )}
                </div>
              {history.length > 0 && (
                <Button
                  onClick={() => setHistory([])}
                  className={`w-full mt-3 ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} text-sm h-10`}
                >
                  Clear History
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mt-6">
          <Link href="/" className="inline-block mb-3">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
              ← Back to Home
            </span>
          </Link>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Advanced Calculator
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Scientific calculator with history, memory, and keyboard support
          </p>
        </div>

        {/* Instructions */}
        <div className={`mt-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="text-sm">
            💡 Use your keyboard: Numbers (0-9), Operators (+, -, *, /), Enter (=), Escape (Clear), Backspace
          </p>
        </div>
      </div>
    </div>
  );
}
