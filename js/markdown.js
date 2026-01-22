window.renderMarkdown = async function(mdFilePath, containerSelector) {
  try {
    const res = await fetch(mdFilePath);
    if (!res.ok) throw new Error('Markdown読み込み失敗');
    const mdText = await res.text();

    let html = mdText;

    // 見出し
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // 太字
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // 箇条書き（連続するliを1つのulにまとめる）
    html = html.replace(/^(?:\*|-)\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // 空行で段落を作る
    html = html.replace(/\n{2,}/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // 不要な <p> を調整
    html = html
      .replace('<p><ul>', '<ul>')
      .replace('</ul></p>', '</ul>')
      .replace(/<p>(<h[1-3]>)/g, '$1')
      .replace(/(<\/h[1-3]>)<\/p>/g, '$1');

    const container = document.querySelector(containerSelector);
    if (container) container.innerHTML = html;

  } catch(err) {
    console.error(err);
  }
};
