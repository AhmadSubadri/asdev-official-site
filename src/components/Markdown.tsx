interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-a:no-underline prose-a:text-primary prose-strong:font-semibold prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-neutral-900 prose-code:font-mono prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
