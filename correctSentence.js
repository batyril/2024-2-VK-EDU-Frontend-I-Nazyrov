export default function correctSentence(text) {
  let isPoint = ".";
  const checkPoint = text.at(-1) === ".";
  if (checkPoint) {
    isPoint = "";
  }
  return `${text.charAt(0).toUpperCase() + text.slice(1) + isPoint}`;
}
