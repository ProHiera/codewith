'use client';

import React, { useEffect, useMemo, useRef } from 'react';

type CodeEditorProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: number;
  ariaLabel?: string;
};

export default function CodeEditor({
  value,
  onChange,
  placeholder = '/* 여기에 코드를 입력하세요 */',
  minHeight = 300,
  ariaLabel = '코드 에디터',
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const lines = useMemo(() => {
    // 최소 1줄은 표시
    const count = value.split('\n').length;
    const arr: number[] = [];
    for (let i = 1; i <= Math.max(1, count); i++) arr.push(i);
    return arr;
  }, [value]);

  useEffect(() => {
    const ta = textareaRef.current;
    const gut = gutterRef.current;
    if (!ta || !gut) return;
    const onScroll = () => {
      if (gut) gut.scrollTop = ta.scrollTop;
    };
    ta.addEventListener('scroll', onScroll);
    return () => ta.removeEventListener('scroll', onScroll);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const indent = '  ';
      const newValue = value.substring(0, start) + indent + value.substring(end);
      onChange(newValue);
      // 커서를 들여쓰기 뒤로 이동
      queueMicrotask(() => {
        el.selectionStart = el.selectionEnd = start + indent.length;
      });
    }
  }

  return (
    <div
      className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 overflow-hidden"
      style={{ minHeight }}
    >
      <div className="grid grid-cols-[48px_minmax(0,1fr)]">
        {/* Gutter */}
        <div
          ref={gutterRef}
          aria-hidden
          className="select-none text-right pr-2 py-4 bg-gray-900 text-gray-500 font-mono text-xs overflow-hidden"
          style={{ minHeight }}
        >
          <div className="leading-6 whitespace-pre">
            {lines.map((i) => (
              <div key={i}>{i}</div>
            ))}
          </div>
        </div>
        {/* Editor */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            aria-label={ariaLabel}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            spellCheck={false}
            className="w-full h-full min-h-[inherit] p-4 font-mono text-sm bg-transparent text-gray-100 caret-white outline-none resize-none leading-6 overflow-auto"
          />
          {/* Subtle top border gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        </div>
      </div>
    </div>
  );
}
