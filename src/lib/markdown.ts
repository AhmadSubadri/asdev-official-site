const PLACEHOLDER_PREFIX = '__MD_TOKEN_';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(input: string): string {
  const value = input.trim();

  if (value.startsWith('/') || value.startsWith('#')) return value;

  try {
    const parsed = new URL(value);
    const protocol = parsed.protocol.toLowerCase();
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:' || protocol === 'tel:') {
      return parsed.toString();
    }
  } catch {
    return '#';
  }

  return '#';
}

function renderInline(text: string): string {
  const tokens: string[] = [];
  const placeholder = () => `${PLACEHOLDER_PREFIX}${tokens.length}__`;

  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, (_, code: string) => {
    const key = placeholder();
    tokens.push(`<code>${escapeHtml(code)}</code>`);
    return key;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, url: string) => {
    const key = placeholder();
    const safeUrl = sanitizeUrl(url);
    const escapedLabel = escapeHtml(label);
    const external = safeUrl.startsWith('http://') || safeUrl.startsWith('https://');
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    tokens.push(`<a href="${escapeHtml(safeUrl)}"${attrs}>${escapedLabel}</a>`);
    return key;
  });

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  return html.replace(new RegExp(`${PLACEHOLDER_PREFIX}(\\d+)__`, 'g'), (_, index: string) => tokens[Number(index)] || '');
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const chunks: string[] = [];

  let inCodeBlock = false;
  let codeLanguage = '';
  let codeLines: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (listType) {
      chunks.push(`</${listType}>`);
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const fence = line.match(/^```\s*([a-zA-Z0-9_-]+)?\s*$/);
    if (fence) {
      closeList();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = fence[1] || '';
        codeLines = [];
      } else {
        const langClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : '';
        chunks.push(`<pre><code${langClass}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        inCodeBlock = false;
        codeLanguage = '';
        codeLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (/^\s*$/.test(line)) {
      closeList();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      closeList();
      chunks.push('<hr />');
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      chunks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      closeList();
      chunks.push(`<blockquote><p>${renderInline(quote[1])}</p></blockquote>`);
      continue;
    }

    const ul = line.match(/^[-*+]\s+(.*)$/);
    if (ul) {
      if (listType !== 'ul') {
        closeList();
        listType = 'ul';
        chunks.push('<ul>');
      }
      chunks.push(`<li>${renderInline(ul[1])}</li>`);
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      if (listType !== 'ol') {
        closeList();
        listType = 'ol';
        chunks.push('<ol>');
      }
      chunks.push(`<li>${renderInline(ol[1])}</li>`);
      continue;
    }

    closeList();
    chunks.push(`<p>${renderInline(line)}</p>`);
  }

  if (inCodeBlock) {
    const langClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : '';
    chunks.push(`<pre><code${langClass}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  }

  closeList();

  return chunks.join('\n');
}

export function markdownToPlainText(markdown: string): string {
  const withoutCodeFences = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/---+/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return withoutCodeFences;
}
