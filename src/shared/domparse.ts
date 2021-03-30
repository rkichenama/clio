
const domParser = new DOMParser();

export default function firstNChars (html: string, n: number = 100) {
  const doc = domParser.parseFromString(html, 'text/html');
  return doc.body.innerText.slice(0, n) + '...';
}