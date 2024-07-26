export function formatTextToHTML(text: string): string {

    // issue, hindi naggegenerate yung # kahit sa loob na ng ``` ```
    

    // Convert headers (e.g., ## Header to <h2>Header</h2>)
    text = text.replace(/^(#{1,6})\s*(.*)$/gm, (_, hashes, content) => {
      const level = hashes.length;
      return `<h${level}>${content}</h${level}>`;
    });
  
    // Convert bold text (e.g., **text** to <strong>text</strong>)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Convert italic text (e.g., *text* or _text_ to <em>text</em>)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');
  
    // Convert code blocks (e.g., ```code``` to <pre><code>code</code></pre>)
    text = text.replace(/```([^```]+)```/g, '<pre><code>$1</code></pre>');
    
    // Convert inline code (e.g., `code` to <code>code</code>)
    //text = text.replace(/`(.*?)`/g, '<code>$1</code>');
  
  
    // Convert links (e.g., [text](url) to <a href="url">text</a>)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
    // Convert unordered list items (e.g., - item to <ul><li>item</li></ul>)
    text = text.replace(/^- (.*)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);
  
    // Convert ordered list items (e.g., 1. item to <ol><li>item</li></ol>)
    //text = text.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    //text = text.replace(/(<li>.*<\/li>\n?)+/g, match => `<ol>${match}</ol>`);
  
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
  
    return text;
  }
  