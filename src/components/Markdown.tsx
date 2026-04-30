import { markdownToHtml } from '@/lib/markdown';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const html = markdownToHtml(content);

  return (
    <div
      className={`prose prose-slate max-w-none dark:prose-invert prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary-500 prose-a:no-underline prose-strong:font-semibold prose-img:rounded-xl prose-img:shadow-lg prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-slate-950 prose-pre:p-4 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono dark:prose-code:bg-slate-800 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
