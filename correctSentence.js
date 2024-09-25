export default function correctSentence(text) {
  return `${text.charAt(0).toUpperCase() + text.slice(1)}${text.at(-1) === '.' ? '' : '.'}`;
}
