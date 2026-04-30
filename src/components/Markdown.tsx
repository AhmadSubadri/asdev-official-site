'use client';

import { useEffect, useMemo, useRef } from 'react';
import { markdownToHtml } from '@/lib/markdown';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const html = useMemo(() => markdownToHtml(content), [content]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleClick = async (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const button = target.closest('[data-copy-code]') as HTMLButtonElement | null;
      if (!button) return;

      const wrapper = button.closest('.md-code-block');
      const codeElement = wrapper?.querySelector('pre code');
      const rawCode = codeElement?.textContent || '';
      if (!rawCode.trim()) return;

      try {
        await navigator.clipboard.writeText(rawCode);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Failed';
      }

      window.setTimeout(() => {
        button.textContent = 'Copy';
      }, 1600);
    };

    root.addEventListener('click', handleClick);
    return () => root.removeEventListener('click', handleClick);
  }, [html]);

  return (
    <div
      ref={rootRef}
      className={`markdown-content prose prose-slate max-w-none dark:prose-invert prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary-500 prose-a:no-underline prose-strong:font-semibold prose-img:rounded-xl prose-img:shadow-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
