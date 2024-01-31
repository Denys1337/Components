export function truncateString(text: string, length: number, clamp = '...'): string {
  if (text.length <= length) {
    return text;
  }

  const [firstWord] = text.split('');
  const lastSpaceIndex = text.lastIndexOf(' ', length);
  const truncatedStringBasic = text.substring(0, lastSpaceIndex > -1 ? lastSpaceIndex : length);
  const result = truncatedStringBasic.includes(firstWord)
    ? truncatedStringBasic
    : firstWord.substring(0, length);
  return result + clamp;
}
