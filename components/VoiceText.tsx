'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function VoiceWriter() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState<'en-US' | 'hi-IN'>('en-US');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = lang;
        recognition.continuous = true;
        recognition.interimResults = false; // ✅ only final text
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          let finalText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalText += event.results[i][0].transcript.trim() + ' ';
            }
          }
          if (finalText) {
            setText((prev) => prev + finalText);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech error:', e.error);
        };

        recognition.onend = () => {
          // ✅ Restart automatically if still listening
          if (isListening) {
            recognition.start();
          }
        };

        recognitionRef.current = recognition;
      } else {
        alert('Your browser does not support Speech Recognition.');
      }
    }
  }, [lang, isListening]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearText = () => setText('');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en-US' ? 'hi-IN' : 'en-US'));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🎙️ Voice Content Writer</h1>

      <div className="flex gap-3 mb-4 flex-wrap justify-center">
        {!isListening ? (
          <button
            onClick={startListening}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            ⏹ Stop
          </button>
        )}

        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          🌐 {lang === 'en-US' ? 'Switch to Hindi' : 'Switch to English'}
        </button>

        <button
          onClick={clearText}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          🧹 Clear
        </button>
      </div>

      <div className="w-full max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Start speaking (${
            lang === 'en-US' ? 'English' : 'Hindi'
          })...`}
          className="w-full h-[400px] p-4 text-lg border rounded-lg resize-none"
        />
      </div>
    </div>
  );
}
