const PLACEHOLDER_PREFIX = '__MD_TOKEN_';
const HIGHLIGHT_PLACEHOLDER_PREFIX = '__MD_HL_';

function slugifyHeading(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

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

function highlightEscapedCode(escapedCode: string, language: string): string {
  const lang = language.toLowerCase();
  const tokens: string[] = [];
  let html = escapedCode;

  const stash = (value: string) => {
    const key = `${HIGHLIGHT_PLACEHOLDER_PREFIX}${tokens.length}__`;
    tokens.push(value);
    return key;
  };

  const wrapByRegex = (regex: RegExp, className: string) => {
    html = html.replace(regex, (match) => stash(`<span class="${className}">${match}</span>`));
  };

  if (lang === 'js' || lang === 'jsx' || lang === 'ts' || lang === 'tsx' || lang === 'javascript' || lang === 'typescript') {
    wrapByRegex(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, 'tok-comment');
    wrapByRegex(/(&quot;(?:\\.|[^&])*?&quot;|&#39;(?:\\.|[^&])*?&#39;|`(?:\\.|[^`])*`)/g, 'tok-string');
    wrapByRegex(/\b(import|export|from|default|return|if|else|for|while|switch|case|break|continue|new|const|let|var|function|class|extends|implements|interface|type|async|await|try|catch|finally|throw|typeof|instanceof|in|of|void|null|undefined|true|false)\b/g, 'tok-keyword');
    wrapByRegex(/\b([0-9]+(?:\.[0-9]+)?)\b/g, 'tok-number');
    wrapByRegex(/\b([A-Za-z_$][\w$]*)(?=\s*\()/g, 'tok-function');
  } else if (lang === 'json') {
    wrapByRegex(/(&quot;[^&]*&quot;)(\s*:)/g, 'tok-key');
    wrapByRegex(/:\s*(&quot;[^&]*&quot;)/g, 'tok-string');
    wrapByRegex(/:\s*(true|false|null)\b/g, 'tok-keyword');
    wrapByRegex(/:\s*(-?[0-9]+(?:\.[0-9]+)?)\b/g, 'tok-number');
  } else if (lang === 'bash' || lang === 'sh' || lang === 'shell' || lang === 'zsh') {
    wrapByRegex(/(^|\s)(#[^\n]*)/g, 'tok-comment');
    wrapByRegex(/(&quot;(?:\\.|[^&])*?&quot;|&#39;(?:\\.|[^&])*?&#39;)/g, 'tok-string');
    wrapByRegex(/\$[A-Za-z_][A-Za-z0-9_]*/g, 'tok-variable');
    wrapByRegex(/\b(if|then|else|fi|for|do|done|case|esac|while|in|function|echo|export|sudo|cd|ls|cat|grep|find|npm|pnpm|yarn|npx|git)\b/g, 'tok-keyword');
  } else {
    wrapByRegex(/(\/\/[^\n]*|#[^\n]*)/g, 'tok-comment');
    wrapByRegex(/(&quot;(?:\\.|[^&])*?&quot;|&#39;(?:\\.|[^&])*?&#39;)/g, 'tok-string');
    wrapByRegex(/\b([0-9]+(?:\.[0-9]+)?)\b/g, 'tok-number');
  }

  return html.replace(new RegExp(`${HIGHLIGHT_PLACEHOLDER_PREFIX}(\\d+)__`, 'g'), (_, index: string) => tokens[Number(index)] || '');
}

function renderCodeBlock(lines: string[], language?: string): string {
  const normalizedLanguage = (language || '').trim().toLowerCase();
  const safeLanguage = normalizedLanguage.replace(/[^a-z0-9_-]/g, '');
  const languageLabel = safeLanguage || 'text';
  const languageAttribute = safeLanguage ? ` data-language="${escapeHtml(safeLanguage)}"` : '';
  const escapedCode = escapeHtml(lines.join('\n'));
  const highlightedCode = highlightEscapedCode(escapedCode, safeLanguage);
  const codeClass = safeLanguage ? ` class="language-${escapeHtml(safeLanguage)}"` : '';

  return [
    `<figure class="md-code-block"${languageAttribute}>`,
    `<figcaption class="md-code-toolbar">`,
    `<span class="md-code-language">${escapeHtml(languageLabel)}</span>`,
    `<button type="button" class="md-code-copy" data-copy-code>Copy</button>`,
    `</figcaption>`,
    `<pre><code${codeClass}>${highlightedCode}</code></pre>`,
    `</figure>`,
  ].join('');
}

function parseTableRow(line: string): string[] {
  const normalized = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return normalized.split('|').map((cell) => cell.trim());
}

function isTableSeparatorRow(line: string): boolean {
  const cells = parseTableRow(line);
  if (cells.length === 0) return false;
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderCallout(type: string, lines: string[]): string {
  const kind = type.toLowerCase();
  const labelMap: Record<string, string> = {
    note: 'Note',
    tip: 'Tip',
    important: 'Important',
    warning: 'Warning',
    caution: 'Caution',
  };
  const title = labelMap[kind] || 'Note';
  const content = lines.map((line) => line.trim()).filter(Boolean);
  const body = content.map((line) => `<p>${renderInline(line)}</p>`).join('');
  return `<aside class="md-callout md-callout-${escapeHtml(kind)}"><p class="md-callout-title">${title}</p>${body}</aside>`;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const chunks: string[] = [];

  let inCodeBlock = false;
  let codeFenceMarker = '```';
  let codeLanguage = '';
  let codeLines: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    chunks.push(`<p>${renderInline(paragraphBuffer.join(' '))}</p>`);
    paragraphBuffer = [];
  };

  const closeList = () => {
    if (listType) {
      chunks.push(`</${listType}>`);
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const nextLine = lines[i + 1] || '';

    const fence = line.match(/^(```|~~~)\s*([a-zA-Z0-9_-]+)?\s*$/);
    if (fence) {
      closeList();
      flushParagraph();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeFenceMarker = fence[1];
        codeLanguage = fence[2] || '';
        codeLines = [];
      } else if (fence[1] === codeFenceMarker) {
        chunks.push(renderCodeBlock(codeLines, codeLanguage));
        inCodeBlock = false;
        codeFenceMarker = '```';
        codeLanguage = '';
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const indentedCode = line.match(/^(?:\t| {4})(.*)$/);
    if (indentedCode) {
      closeList();
      flushParagraph();
      const indentedLines: string[] = [indentedCode[1]];

      while (i + 1 < lines.length) {
        const upcoming = lines[i + 1];
        const upcomingMatch = upcoming.match(/^(?:\t| {4})(.*)$/);
        if (!upcomingMatch) break;
        indentedLines.push(upcomingMatch[1]);
        i += 1;
      }

      chunks.push(renderCodeBlock(indentedLines));
      continue;
    }

    if (/^\s*$/.test(line)) {
      closeList();
      flushParagraph();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      closeList();
      flushParagraph();
      chunks.push('<hr />');
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      flushParagraph();
      const level = heading[1].length;
      const headingText = heading[2].trim();
      const headingId = slugifyHeading(headingText);
      const idAttribute = headingId ? ` id="${escapeHtml(headingId)}"` : '';
      chunks.push(`<h${level}${idAttribute}>${renderInline(headingText)}</h${level}>`);
      continue;
    }

    if (line.includes('|') && isTableSeparatorRow(nextLine)) {
      closeList();
      flushParagraph();

      const headerCells = parseTableRow(line);
      i += 1;
      const rows: string[][] = [];

      while (i + 1 < lines.length) {
        const row = lines[i + 1];
        if (!row.includes('|') || /^\s*$/.test(row)) break;
        rows.push(parseTableRow(row));
        i += 1;
      }

      const thead = `<thead><tr>${headerCells.map((cell) => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`;
      const tbody = rows.length
        ? `<tbody>${rows
            .map((row) => `<tr>${headerCells.map((_, index) => `<td>${renderInline(row[index] || '')}</td>`).join('')}</tr>`)
            .join('')}</tbody>`
        : '';

      chunks.push(`<div class="md-table-wrap"><table>${thead}${tbody}</table></div>`);
      continue;
    }

    const callout = line.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/i);
    if (callout) {
      closeList();
      flushParagraph();

      const type = callout[1];
      const bodyLines: string[] = [];
      if (callout[2].trim()) bodyLines.push(callout[2].trim());

      while (i + 1 < lines.length) {
        const nextQuote = lines[i + 1].match(/^>\s?(.*)$/);
        if (!nextQuote) break;
        bodyLines.push(nextQuote[1]);
        i += 1;
      }

      chunks.push(renderCallout(type, bodyLines));
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      closeList();
      flushParagraph();

      const quoteLines = [quote[1]];
      while (i + 1 < lines.length) {
        const nextQuote = lines[i + 1].match(/^>\s?(.*)$/);
        if (!nextQuote) break;
        quoteLines.push(nextQuote[1]);
        i += 1;
      }
      chunks.push(`<blockquote><p>${renderInline(quoteLines.join(' '))}</p></blockquote>`);
      continue;
    }

    const ul = line.match(/^[-*+]\s+(.*)$/);
    if (ul) {
      if (listType !== 'ul') {
        closeList();
        flushParagraph();
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
        flushParagraph();
        listType = 'ol';
        chunks.push('<ol>');
      }
      chunks.push(`<li>${renderInline(ol[1])}</li>`);
      continue;
    }

    closeList();
    paragraphBuffer.push(line.trim());
    if (nextLine.trim() === '') {
      flushParagraph();
    }
  }

  if (inCodeBlock) {
    chunks.push(renderCodeBlock(codeLines, codeLanguage));
  }

  closeList();
  flushParagraph();
  return chunks.join('\n');
}

export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\|/g, ' ')
    .replace(/---+/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export { slugifyHeading };
