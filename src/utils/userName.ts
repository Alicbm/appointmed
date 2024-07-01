export const userName = (text: string) => {
  text = text.trim();  
  const words = text.split(/\s+/);
  const firstWord = words[0];

  const capitalizedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  return capitalizedFirstWord;
}