'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import type { Ace } from 'ace-builds';

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [minifiedJson, setMinifiedJson] = useState('');
  const [isFormatted, setIsFormatted] = useState(false);
  const [previewJson, setPreviewJson] = useState('');
  const [error, setError] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [isAutoFormat, setIsAutoFormat] = useState(true);
  const [inputEditor, setInputEditor] = useState<Ace.Editor | null>(null);
  const [previewEditor, setPreviewEditor] = useState<Ace.Editor | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fetchUrl, setFetchUrl] = useState('');
  const [curlCommand, setCurlCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [isCurlExpanded, setIsCurlExpanded] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');

  // Auto-expand cURL textarea based on content
  useEffect(() => {
    if (curlCommand.trim().length > 0) {
      setIsCurlExpanded(true);
    } else {
      setIsCurlExpanded(false);
    }
  }, [curlCommand]);

  // Helper function to format JSON parse errors with line/column info
  const formatJsonError = (error: Error, jsonString: string) => {
    // Try to extract position from error message
    const positionMatch = error.message.match(/position (\d+)/);
    if (positionMatch) {
      const position = parseInt(positionMatch[1]);
      
      // Find the line and column by counting characters
      let errorLine = 1;
      let errorColumn = 1;
      
      for (let i = 0; i < position && i < jsonString.length; i++) {
        if (jsonString[i] === '\n') {
          errorLine++;
          errorColumn = 1;
        } else {
          errorColumn++;
        }
      }
      
      // Split into lines for better display
      const lines = jsonString.split('\n');
      const errorLineContent = lines[errorLine - 1] || '';
      
      let errorMessage = `Parse error on line ${errorLine}:\n`;
      
      // Show the error line with context
      if (errorLineContent.length > 0) {
        // For single-line JSON, show a truncated version
        let displayLine = errorLineContent;
        if (displayLine.length > 60) {
          const start = Math.max(0, errorColumn - 30);
          const end = Math.min(displayLine.length, errorColumn + 30);
          displayLine = displayLine.substring(start, end);
          if (start > 0) displayLine = '...' + displayLine;
          if (end < errorLineContent.length) displayLine = displayLine + '...';
        }
        
        errorMessage += `...${displayLine}...\n`;
        
        // Create visual indicator - adjust for truncated line
        let indicatorPos = errorColumn - 3;
        if (displayLine.startsWith('...')) {
          indicatorPos = errorColumn - 3 - (displayLine.indexOf('...') + 3);
        }
        indicatorPos = Math.max(0, Math.min(indicatorPos, displayLine.length - 1));
        const indicator = '-'.repeat(indicatorPos) + '^';
        errorMessage += `${indicator}\n`;
      }
      
      // Clean up the error message to be more readable
      let cleanErrorMessage = error.message;
      if (cleanErrorMessage.includes('Unexpected non-whitespace character')) {
        cleanErrorMessage = cleanErrorMessage.replace('Unexpected non-whitespace character after JSON', 'Unexpected character after JSON');
      }
      errorMessage += `${cleanErrorMessage}\n`;
      
      return errorMessage;
    } else {
      return `${error.message}`;
    }
  };

  // Real-time preview as user types
  useEffect(() => {
    if (!inputJson.trim()) {
      setPreviewJson('');
      setPreviewError('');
      return;
    }

    if (isAutoFormat) {
      try {
        const parsed = JSON.parse(inputJson);
        const formatted = JSON.stringify(parsed, null, indentSize);
        setPreviewJson(formatted);
        setPreviewError('');
      } catch (err) {
        const errorMessage = formatJsonError(err as Error, inputJson);
        setPreviewJson(errorMessage);
        setPreviewError('Invalid JSON format');
      }
    }
  }, [inputJson, indentSize, isAutoFormat]);

  const formatJson = () => {
    try {
      setError('');
      if (!inputJson.trim()) {
        setPreviewJson('❌ Error: Please enter JSON data to format');
        setPreviewError('Please enter JSON data to format');
        return;
      }

      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indentSize);
      const minified = JSON.stringify(parsed);
      
      setFormattedJson(formatted);
      setMinifiedJson(minified);
      setIsFormatted(true);
      setInputJson(formatted); // Update input with formatted version
      setPreviewJson(formatted);
      setPreviewError('');
    } catch (err) {
      const errorMessage = formatJsonError(err as Error, inputJson);
      setPreviewJson(errorMessage);
      setPreviewError('Invalid JSON format. Please check your input.');
      setFormattedJson('');
      setMinifiedJson('');
      setIsFormatted(false);
    }
  };

  const minifyJson = () => {
    try {
      setError('');
      if (!inputJson.trim()) {
        setPreviewJson('❌ Error: Please enter JSON data to minify');
        setPreviewError('Please enter JSON data to minify');
        return;
      }

      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      
      setMinifiedJson(minified);
      setFormattedJson('');
      setIsFormatted(true);
      setPreviewJson(minified);
      setPreviewError('');
    } catch (err) {
      const errorMessage = formatJsonError(err as Error, inputJson);
      setPreviewJson(errorMessage);
      setPreviewError('Invalid JSON format. Please check your input.');
      setMinifiedJson('');
      setIsFormatted(false);
    }
  };

  const validateJson = () => {
    try {
      setError('');
      if (!inputJson.trim()) {
        setPreviewJson('❌ Error: Please enter JSON data to validate');
        setPreviewError('Please enter JSON data to validate');
        return;
      }

      JSON.parse(inputJson);
      const successMessage = `✅ Valid JSON Format!\n\nThe JSON is syntactically correct and well-formed.\n\nInput JSON:\n${inputJson}`;
      setPreviewJson(successMessage);
      setPreviewError('');
      setIsFormatted(true);
    } catch (err) {
      const errorMessage = formatJsonError(err as Error, inputJson);
      setPreviewJson(errorMessage);
      setPreviewError('Invalid JSON format');
      setIsFormatted(false);
    }
  };

  const convertToXml = () => {
    try {
      setError('');
      if (!inputJson.trim()) {
        setPreviewJson('❌ Error: Please enter JSON data to convert to XML');
        setPreviewError('Please enter JSON data to convert to XML');
        return;
      }

      const parsed = JSON.parse(inputJson);
      const xml = jsonToXml(parsed, 'root');
      setXmlOutput(xml);
      setPreviewJson(xml);
      setPreviewError('');
      setIsFormatted(true);
    } catch (err) {
      const errorMessage = formatJsonError(err as Error, inputJson);
      setPreviewJson(errorMessage);
      setPreviewError('Invalid JSON format');
      setIsFormatted(false);
    }
  };

  const convertToCsv = () => {
    try {
      setError('');
      if (!inputJson.trim()) {
        setPreviewJson('❌ Error: Please enter JSON data to convert to CSV');
        setPreviewError('Please enter JSON data to convert to CSV');
        return;
      }

      const parsed = JSON.parse(inputJson);
      const csv = jsonToCsv(parsed);
      setCsvOutput(csv);
      setPreviewJson(csv);
      setPreviewError('');
      setIsFormatted(true);
    } catch (err) {
      const errorMessage = formatJsonError(err as Error, inputJson);
      setPreviewJson(errorMessage);
      setPreviewError('Invalid JSON format');
      setIsFormatted(false);
    }
  };

  const jsonToXml = (obj: unknown, rootName: string = 'root', isRoot: boolean = true, indent: string = ''): string => {
    const xmlDeclaration = isRoot ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '';
    
    if (typeof obj === 'string') {
      return xmlDeclaration + `${indent}<${rootName}>${obj}</${rootName}>`;
    }
    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return xmlDeclaration + `${indent}<${rootName}>${obj}</${rootName}>`;
    }
    if (obj === null) {
      return xmlDeclaration + `${indent}<${rootName}></${rootName}>`;
    }
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return xmlDeclaration + `${indent}<${rootName}></${rootName}>`;
      }
      const items = obj.map((item) => jsonToXml(item, `${rootName}_item`, false, indent + '  ')).join('\n');
      return xmlDeclaration + items;
    }
    if (typeof obj === 'object' && obj !== null) {
      const children = Object.keys(obj as Record<string, unknown>).map(key => jsonToXml((obj as Record<string, unknown>)[key], key, false, indent + '  ')).join('\n');
      return xmlDeclaration + `${indent}<${rootName}>\n${children}\n${indent}</${rootName}>`;
    }
    return xmlDeclaration + `${indent}<${rootName}>${obj}</${rootName}>`;
  };

  const jsonToCsv = (obj: unknown): string => {
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '';
      
      // Get all unique keys from all objects
      const allKeys = [...new Set(obj.flatMap(item => 
        typeof item === 'object' && item !== null ? Object.keys(item) : []
      ))];
      
      if (allKeys.length === 0) return '';
      
      // Create header row
      const header = allKeys.join(',');
      
      // Create data rows
      const rows = obj.map(item => {
        if (typeof item === 'object' && item !== null) {
          return allKeys.map(key => {
            const value = item[key];
            if (value === null || value === undefined) return '';
            if (typeof value === 'string' && value.includes(',')) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',');
        }
        return `"${item}"`;
      });
      
      return [header, ...rows].join('\n');
    }
    
    // For single object, convert to single row CSV
    if (typeof obj === 'object' && obj !== null) {
      const keys = Object.keys(obj as Record<string, unknown>);
      const header = keys.join(',');
      const row = keys.map(key => {
        const value = (obj as Record<string, unknown>)[key];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
      return `${header}\n${row}`;
    }
    
    return `value\n"${obj}"`;
  };

  const clearAll = () => {
    setInputJson('');
    setFormattedJson('');
    setMinifiedJson('');
    setPreviewJson('');
    setPreviewError('');
    setError('');
    setIsFormatted(false);
    // Clear data loading options
    setFetchUrl('');
    setCurlCommand('');
    setFetchError('');
    setIsLoading(false);
    setIsCurlExpanded(false);
    setSelectedFileName('');
    setXmlOutput('');
    setCsvOutput('');
    // Clear file input
    const fileInput = document.getElementById('input-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Toolbar functions
  const undoEditor = (editor: Ace.Editor) => {
    if (editor) {
      editor.undo();
    }
  };

  const redoEditor = (editor: Ace.Editor) => {
    if (editor) {
      editor.redo();
    }
  };

  const findInEditor = (editor: Ace.Editor) => {
    if (editor) {
      editor.execCommand('find');
    }
  };

  const selectAllInEditor = (editor: Ace.Editor) => {
    if (editor) {
      editor.selectAll();
    }
  };

  const duplicateContent = (editor: Ace.Editor) => {
    if (editor) {
      const content = editor.getValue();
      editor.setValue(content + '\n' + content);
    }
  };

  const toggleFullscreen = (editorType: 'input' | 'preview') => {
    const editor = editorType === 'input' ? inputEditor : previewEditor;
    if (editor) {
      const container = editor.container;
      const editorDiv = container.closest('.flex.flex-col');
      
      if (!isFullscreen) {
        // Enter fullscreen mode
        setIsFullscreen(true);
        editorDiv?.classList.add('fixed', 'inset-0', 'z-50', 'bg-white', 'dark:bg-gray-900');
        (editorDiv as HTMLElement)?.style.setProperty('padding', '20px');
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.className = 'fixed top-4 right-4 z-60 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors';
        closeButton.onclick = () => toggleFullscreen(editorType);
        document.body.appendChild(closeButton);
        
        // Resize editor to fill the space
        setTimeout(() => {
          editor.resize();
          editor.setOption('maxLines', Infinity);
        }, 100);
      } else {
        // Exit fullscreen mode
        setIsFullscreen(false);
        editorDiv?.classList.remove('fixed', 'inset-0', 'z-50', 'bg-white', 'dark:bg-gray-900');
        (editorDiv as HTMLElement)?.style.removeProperty('padding');
        
        // Remove close button
        const closeButton = document.querySelector('.fixed.top-4.right-4');
        if (closeButton) {
          document.body.removeChild(closeButton);
        }
        
        // Reset editor size
        setTimeout(() => {
          editor.resize();
          editor.setOption('maxLines', 1000);
        }, 100);
      }
    }
  };

  const downloadJson = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadXml = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCsv = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>, editor: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (editor === 'input') {
          setInputJson(content);
        } else {
          setPreviewJson(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const loadSampleJson = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
      },
      "hobbies": ["reading", "coding", "traveling"],
      "isActive": true
    };
    const sampleJson = JSON.stringify(sample);
    setInputJson(sampleJson);
  };

  const fetchFromUrl = async () => {
    if (!fetchUrl.trim()) {
      setFetchError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setFetchError('');

    try {
      // Add https:// if no protocol is specified
      let url = fetchUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.text();
      
      // Try to parse as JSON to validate
      try {
        JSON.parse(data);
        setInputJson(data);
        setFetchError('');
      } catch (_parseError) {
        setFetchError('Response is not valid JSON');
        setInputJson(data); // Still show the response
      }
    } catch (error) {
      setFetchError(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCurlCommand = async () => {
    if (!curlCommand.trim()) {
      setFetchError('Please enter a curl command');
      return;
    }

    setIsLoading(true);
    setFetchError('');

    try {
      // Clean up the curl command - remove line breaks and normalize spaces
      const cleanCommand = curlCommand
        .replace(/\\\s*\n/g, ' ') // Remove backslashes and line breaks
        .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
        .trim();

      // Extract URL from curl command - handle both quoted and unquoted URLs
      const urlMatch = cleanCommand.match(/(?:curl\s+)?['"]?([^'"\s]+)['"]?/);
      if (!urlMatch) {
        throw new Error('Invalid curl command format - could not find URL');
      }

      let url = urlMatch[1];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      // Extract headers from curl command - handle both single and double quotes
      const headers: Record<string, string> = {};
      
      // Match -H followed by quoted header
      const headerPattern = /-H\s+['"]([^'"]+)['"]/g;
      let headerMatch;
      
      while ((headerMatch = headerPattern.exec(cleanCommand)) !== null) {
        const headerString = headerMatch[1];
        const colonIndex = headerString.indexOf(':');
        if (colonIndex > 0) {
          const key = headerString.substring(0, colonIndex).trim();
          const value = headerString.substring(colonIndex + 1).trim();
          if (key && value) {
            headers[key] = value;
          }
        }
      }

      // Extract method from curl command
      let method = 'GET';
      const methodMatch = cleanCommand.match(/-X\s+(\w+)/i);
      if (methodMatch) {
        method = methodMatch[1].toUpperCase();
      }

      // Extract data from curl command - handle both single and double quotes
      let body: string | undefined;
      const dataMatch = cleanCommand.match(/-d\s+['"]([^'"]+)['"]/);
      if (dataMatch) {
        body = dataMatch[1];
      }

      // Prepare fetch options
      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Accept': 'application/json',
          ...headers,
        },
      };

      // Only add Content-Type if not already specified
      if (!headers['content-type'] && !headers['Content-Type']) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Content-Type': 'application/json',
        };
      }

      // Add body if present
      if (body) {
        fetchOptions.body = body;
      }

      console.log('Fetching URL:', url);
      console.log('Fetch options:', fetchOptions);

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.text();
      
      // Try to parse as JSON to validate
      try {
        JSON.parse(data);
        setInputJson(data);
        setFetchError('');
      } catch (_parseError) {
        setFetchError('Response is not valid JSON');
        setInputJson(data); // Still show the response
      }
    } catch (error) {
      console.error('Curl execution error:', error);
      setFetchError(`Failed to execute curl: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            JSON Formatter & Validator
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Format, minify, and validate JSON data. Make your JSON readable and error-free with our powerful JSON tools.
          </p>
        </div>

        {/* Data Source Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
            📥 Load JSON Data
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* URL Fetch */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                🌐 Fetch from URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={fetchUrl}
                  onChange={(e) => setFetchUrl(e.target.value)}
                  placeholder="https://api.example.com/data"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-[48px]"
                />
                <button
                  onClick={fetchFromUrl}
                  disabled={isLoading}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {isLoading ? '⏳' : '📥'}
                </button>
              </div>
            </div>

            {/* Curl Command */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                💻 Execute cURL Command
              </label>
              <div className="flex gap-2">
                <textarea
                  value={curlCommand}
                  onChange={(e) => setCurlCommand(e.target.value)}
                  placeholder="curl 'https://jsonplaceholder.typicode.com/todos' \
  -H 'accept: application/json' \
  -H 'content-type: application/json'"
                  rows={isCurlExpanded ? 4 : 1}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 h-[48px]"
                />
                <button
                  onClick={executeCurlCommand}
                  disabled={isLoading}
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-300 disabled:to-green-400 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {isLoading ? '⏳' : '🚀'}
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  📁 Load JSON File
                </label>
                {selectedFileName && (
                  <button
                    onClick={() => {
                      setSelectedFileName('');
                      setInputJson('');
                      const fileInput = document.getElementById('input-file') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex-1 relative group">
                  <input
                    type="file"
                    accept=".json,.txt"
                    onChange={(e) => loadFile(e, 'input')}
                    id="input-file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="h-[48px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center transition-all duration-200 group-hover:border-purple-400 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-500">📄</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {selectedFileName || 'Choose JSON file or drag & drop...'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => document.getElementById('input-file')?.click()}
                  className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  📁 Browse
                </button>
              </div>
              {selectedFileName && (
                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-md">
                  <span>✅</span>
                  <span>File loaded: {selectedFileName}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({Math.round((inputJson.length / 1024) * 100) / 100} KB)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {fetchError && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-700 dark:text-red-300">
                ❌ {fetchError}
              </p>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                ⏳ Loading data...
              </p>
            </div>
          )}
        </div>

        {/* Main Editor Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              JSON Editor
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Indent:</label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={3}>3 Spaces</option>
                  <option value={4}>4 Spaces</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Auto Format:</label>
                <input
                  type="checkbox"
                  checked={isAutoFormat}
                  onChange={(e) => setIsAutoFormat(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={loadSampleJson}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  📄 Load Sample
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>
          
          {/* Editor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Input Editor */}
            <div className="flex flex-col lg:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  JSON Input Editor
                </label>
                <button
                  onClick={() => copyToClipboard(inputJson)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                >
                  📋 Copy Input
                </button>
              </div>
              
              {/* Input Editor Toolbar */}
              <div className="flex items-center gap-1 p-2 bg-gray-200 dark:bg-gray-600 border-b border-gray-300 dark:border-gray-500">
                <button
                  onClick={() => undoEditor(inputEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Undo"
                >
                  ↶
                </button>
                <button
                  onClick={() => redoEditor(inputEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Redo"
                >
                  ↷
                </button>
                <div className="w-px h-4 bg-gray-400 dark:bg-gray-500 mx-1"></div>
                <button
                  onClick={() => findInEditor(inputEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Find"
                >
                  🔍
                </button>
                <button
                  onClick={() => selectAllInEditor(inputEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Select All"
                >
                  ⚏
                </button>
                <div className="w-px h-4 bg-gray-400 dark:bg-gray-500 mx-1"></div>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => loadFile(e, 'input')}
                  className="hidden"
                  id="input-file"
                />
                <label
                  htmlFor="input-file"
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 cursor-pointer text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Open File"
                >
                  📁
                </label>
                <button
                  onClick={() => downloadJson(inputJson, 'input.json')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Save"
                >
                  💾
                </button>
                <button
                  onClick={() => validateJson()}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Validate"
                >
                  ✓
                </button>
                <div className="w-px h-4 bg-gray-400 dark:bg-gray-500 mx-1"></div>
                <button
                  onClick={() => duplicateContent(inputEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Duplicate"
                >
                  ⧉
                </button>
                <button
                  onClick={() => setInputJson('')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Clear"
                >
                  ✕
                </button>
                <button
                  onClick={() => toggleFullscreen('input')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Fullscreen"
                >
                  ⛶
                </button>
                <button
                  onClick={() => downloadJson(inputJson, 'input.json')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Download JSON"
                >
                  💾
                </button>
              </div>
              <div className="border border-gray-300 dark:border-gray-600 overflow-hidden flex-1">
                <AceEditor
                  mode="json"
                  theme="github"
                  value={inputJson}
                  onChange={setInputJson}
                  height="500px"
                  width="100%"
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={true}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: indentSize,
                    useSoftTabs: true,
                    wrap: true,
                  }}
                  onLoad={(editor) => {
                    setInputEditor(editor);
                    editor.setTheme('ace/theme/github');
                    (editor.container as HTMLElement).style.backgroundColor = '#ddd';
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-2 sm:gap-3 lg:gap-3">
              <button
                onClick={formatJson}
                className="w-full sm:w-auto lg:w-32 px-3 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-green-400"
              >
                🎨 Format JSON
              </button>
              <button
                onClick={minifyJson}
                className="w-full sm:w-auto lg:w-32 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-blue-400"
              >
                📦 Minify JSON
              </button>
              <button
                onClick={validateJson}
                className="w-full sm:w-auto lg:w-32 px-3 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-purple-400"
              >
                ✅ Validate JSON
              </button>
              <button
                onClick={convertToXml}
                className="w-full sm:w-auto lg:w-32 px-3 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-orange-400"
              >
                📄 JSON to XML
              </button>
              <button
                onClick={convertToCsv}
                className="w-full sm:w-auto lg:w-32 px-3 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-teal-400"
              >
                📊 JSON to CSV
              </button>
            </div>


            {/* Preview Editor */}
            <div className="flex flex-col lg:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Live Preview & Results
                </label>
                <button
                  onClick={() => copyToClipboard(previewJson)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                >
                  📋 Copy Preview
                </button>
              </div>
              
              {/* Preview Editor Toolbar */}
              <div className="flex items-center gap-1 p-2 bg-gray-200 dark:bg-gray-600 border-b border-gray-300 dark:border-gray-500">
                <button
                  onClick={() => findInEditor(previewEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Find"
                >
                  🔍
                </button>
                <button
                  onClick={() => selectAllInEditor(previewEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Select All"
                >
                  ⚏
                </button>
                <div className="w-px h-4 bg-gray-400 dark:bg-gray-500 mx-1"></div>
                <button
                  onClick={() => downloadJson(previewJson, 'preview.json')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Save"
                >
                  💾
                </button>
                <button
                  onClick={() => validateJson()}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Validate"
                >
                  ✓
                </button>
                <div className="w-px h-4 bg-gray-400 dark:bg-gray-500 mx-1"></div>
                <button
                  onClick={() => duplicateContent(previewEditor!)}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Duplicate"
                >
                  ⧉
                </button>
                <button
                  onClick={() => setPreviewJson('')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Clear"
                >
                  ✕
                </button>
                <button
                  onClick={() => toggleFullscreen('preview')}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Fullscreen"
                >
                  ⛶
                </button>
                <button
                  onClick={() => {
                    if (formattedJson) downloadJson(formattedJson, 'formatted.json');
                    else if (minifiedJson) downloadJson(minifiedJson, 'minified.json');
                    else if (xmlOutput) downloadXml(xmlOutput, 'converted.xml');
                    else if (csvOutput) downloadCsv(csvOutput, 'converted.csv');
                    else downloadJson(previewJson, 'preview.json');
                  }}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Download Content"
                >
                  💾
                </button>
              </div>
              <div className="border border-gray-300 dark:border-gray-600 overflow-hidden flex-1">
                <AceEditor
                  mode="json"
                  theme="github"
                  value={previewJson || '📝 Live Preview & Results\n\nThis editor will show:\n• Real-time JSON formatting (if Auto Format is enabled)\n• Validation results\n• Error messages\n• Formatted/minified output\n\nStart typing JSON in the left editor to see the preview here!'}
                  height="500px"
                  width="100%"
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={true}
                  readOnly={true}
                  setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: indentSize,
                    useSoftTabs: true,
                    wrap: true,
                  }}
                  onLoad={(editor) => {
                    setPreviewEditor(editor);
                    editor.setTheme('ace/theme/github');
                    (editor.container as HTMLElement).style.backgroundColor = '#ddd';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {isFormatted && (formattedJson || minifiedJson || xmlOutput || csvOutput) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Formatted JSON */}
            {formattedJson && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Formatted JSON
                  </h3>
                  <button
                    onClick={() => copyToClipboard(formattedJson)}
                    className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <div className="flex justify-end items-center bg-gray-100 dark:bg-gray-700 p-2 border-b border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => copyToClipboard(formattedJson)}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Copy"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => downloadJson(formattedJson, 'formatted.json')}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Download"
                    >
                      💾
                    </button>
                  </div>
                  <AceEditor
                    mode="json"
                    theme="github"
                    value={formattedJson}
                    height="300px"
                    width="100%"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    readOnly={true}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: indentSize,
                      useSoftTabs: true,
                      wrap: true,
                    }}
                    onLoad={(editor) => {
                      editor.setTheme('ace/theme/github');
                      (editor.container as HTMLElement).style.backgroundColor = '#ddd';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Minified JSON */}
            {minifiedJson && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Minified JSON
                  </h3>
                  <button
                    onClick={() => copyToClipboard(minifiedJson)}
                    className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <div className="flex justify-end items-center bg-gray-100 dark:bg-gray-700 p-2 border-b border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => copyToClipboard(minifiedJson)}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Copy"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => downloadJson(minifiedJson, 'minified.json')}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Download"
                    >
                      💾
                    </button>
                  </div>
                  <AceEditor
                    mode="json"
                    theme="github"
                    value={minifiedJson}
                    height="300px"
                    width="100%"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    readOnly={true}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: indentSize,
                      useSoftTabs: true,
                      wrap: true,
                    }}
                    onLoad={(editor) => {
                      editor.setTheme('ace/theme/github');
                      (editor.container as HTMLElement).style.backgroundColor = '#ddd';
                    }}
                  />
                </div>
              </div>
            )}

            {/* XML Output */}
            {xmlOutput && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    XML Output
                  </h3>
                  <button
                    onClick={() => copyToClipboard(xmlOutput)}
                    className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md"
                  >
                    📋 Copy XML
                  </button>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <div className="flex justify-end items-center bg-gray-100 dark:bg-gray-700 p-2 border-b border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => copyToClipboard(xmlOutput)}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Copy XML"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => downloadXml(xmlOutput, 'converted.xml')}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Download XML"
                    >
                      💾
                    </button>
                  </div>
                  <AceEditor
                    mode="xml"
                    theme="github"
                    value={xmlOutput}
                    height="300px"
                    width="100%"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    readOnly={true}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                      useSoftTabs: true,
                      wrap: true,
                    }}
                    onLoad={(editor) => {
                      editor.setTheme('ace/theme/github');
                      (editor.container as HTMLElement).style.backgroundColor = '#ddd';
                    }}
                  />
                </div>
              </div>
            )}

            {/* CSV Output */}
            {csvOutput && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    CSV Output
                  </h3>
                  <button
                    onClick={() => copyToClipboard(csvOutput)}
                    className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md"
                  >
                    📋 Copy CSV
                  </button>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <div className="flex justify-end items-center bg-gray-100 dark:bg-gray-700 p-2 border-b border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => copyToClipboard(csvOutput)}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Copy CSV"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => downloadCsv(csvOutput, 'converted.csv')}
                      className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                      title="Download CSV"
                    >
                      💾
                    </button>
                  </div>
                  <AceEditor
                    mode="text"
                    theme="github"
                    value={csvOutput}
                    height="300px"
                    width="100%"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    readOnly={true}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                      useSoftTabs: true,
                      wrap: true,
                    }}
                    onLoad={(editor) => {
                      editor.setTheme('ace/theme/github');
                      (editor.container as HTMLElement).style.backgroundColor = '#ddd';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎨</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Format JSON
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Beautify your JSON with proper indentation and line breaks for better readability.
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📦</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Minify JSON
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Compress JSON by removing unnecessary whitespace to reduce file size.
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">✅</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Validate JSON
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Check if your JSON is valid and get detailed error messages if there are issues.
            </p>
          </div>
        </div>

        {/* Back to Tools */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-gray-500"
          >
            ← Back to Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
