export default function convertBytesToHuman(bytes) {
  const isInvalidBytes =
    typeof bytes !== 'number' || bytes < 0 || !isFinite(bytes);

  if (isInvalidBytes) {
    return false;
  }

  const SIZES = ['B', 'KB', 'MB', 'GB', 'TB'];
  const UNIT_SIZE = 1024;
  let counter = 0;

  while (bytes >= UNIT_SIZE && counter < SIZES.length - 1) {
    bytes /= UNIT_SIZE;
    counter++;
  }

  const isInteger = bytes % 1 === 0;

  return isInteger
    ? `${bytes} ${SIZES[counter]}`
    : `${bytes.toFixed(2)} ${SIZES[counter]}`;
}
