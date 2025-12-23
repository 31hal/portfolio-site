// 任意のページでMarkdownをロードしてHTML変換
window.renderMarkdown = async function(mdFilePath, containerSelector) {
  try {
    const res = await fetch(mdFilePath);
    if (!res.ok) throw new Error('Markdown読み込み失敗');
    const mdText = await res.text();

    let html = mdText;
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^(?:\*|\-) (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/\n/g, '<br>');

    const container = document.querySelector(containerSelector);
    if (container) container.innerHTML = html;

  } catch(err) {
    console.error(err);
  }
};
