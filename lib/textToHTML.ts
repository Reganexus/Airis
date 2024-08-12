
  export function formatTextToHTML(text: string): string {

    // Convert code blocks (e.g., ```code``` to <pre><code>code</code></pre>)
    text = text.replace(/```([^```]+)```/g, "---<br><pre><code>$1</code></pre><br>---");
    
    // Convert inline code (e.g., `code` to <code>code</code>)
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // HEADERS
    text = text.replace(/###### (.*)/g, '<h6>$1</h6>');
    text = text.replace(/##### (.*)/g, '<h5>$1</h5>');
    text = text.replace(/#### (.*)/g, '<h4>$1</h4>');
    text = text.replace(/### (.*)/g, '<h3>$1</h3>');
    text = text.replace(/## (.*)/g, '<h2>$1</h2>');
    text = text.replace(/# (.*)/g, '<h1>$1</h1>');

    // Convert markdown tables into  table body
    // STILL HAS ISSUES
    text = text.replace(
      /\|(.+?)\|\n\|([ -:|]+)\|\n((?:\|.+?\|\n)+)/g,
      (match, headerRow, separatorRow, rows) => {
        const headers = headerRow
          .split('|')
          .map((header: string) => `<th>${header.trim()}</th>`)
          .join('');
  
        const bodyRows = rows
          .trim()
          .split('\n')
          .map((row: string) => {
            const cells = row
              .split('|')
              .filter((cell: string) => cell.trim() !== '') // Filter out empty strings ( can be removedd it causes a problem)
              .map((cell: string) => `<td>${cell.trim()}</td>`)
              .join('');
            return `<tr>${cells}</tr>`;
          })
          .join('');
  
        return `<table><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      }
    );


    
    // Convert headers (e.g., ## Header to <h2>Header</h2>)
    text = text.replace(/^(#{2,6})\s*(.*)$/gm, (_, hashes, content) => {
      const level = hashes.length;
      return `<h${level}>${content}</h${level}>`;
    });
    

    // Convert bold text (e.g., **text** to <strong>text</strong>)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Convert italic text (e.g., *text* or _text_ to <em>text</em>)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/(^|[^_\w])_(\w.*?)_([^_\w]|$)/g, '$1<em>$2</em>$3');

  
    // Convert links (e.g., [text](url) to <a href="url">text</a>)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
    // Convert unordered list items (e.g., - item to <ul><li>item</li></ul>)
    text = text.replace(/^- (.*)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);
    
    // Convert strikethrough items
    text = text.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  
    // Convert ordered list items (e.g., 1. item to <ol><li>item</li></ol>)
    //text = text.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    //text = text.replace(/(<li>.*<\/li>\n?)+/g, match => `<ol>${match}</ol>`);
  
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
    text = text.replace(/---/g, '<hr />');
    //text = text.replace(/> (.*)/g, '<blockquote>$1</blockquote>');
    
  
    return text;
  }
  
  