import React from 'react';

interface HighlightTextProps {
  text: string;
  type?: 'primary' | 'warning' | 'robot';
}

export default function HighlightText({ text, type = 'primary' }: HighlightTextProps) {
  if (!text) return null;

  // Split by asterisk (*) to extract parts to highlight
  const parts = text.split(/\*(.*?)\*/g);

  return (
    <span className="leading-relaxed">
      {parts.map((part, idx) => {
        // Odd index means it was enclosed in asterisks
        if (idx % 2 === 1) {
          let highlightStyle = 'bg-yellow-100/90 text-slate-800 font-extrabold px-1.5 py-0.5 rounded shadow-sm';
          if (type === 'warning') {
            highlightStyle = 'bg-orange-100 text-orange-900 font-extrabold px-1.5 py-0.5 rounded shadow-sm';
          } else if (type === 'robot') {
            highlightStyle = 'bg-indigo-100 text-indigo-900 font-black px-2 py-0.8 rounded-lg border border-indigo-200/50 shadow-sm';
          }
          return (
            <mark key={idx} className={`${highlightStyle} bg-no-repeat bg-bottom inline-block`}>
              {part}
            </mark>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
}
