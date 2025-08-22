export const calculateWPM = (typedText, startTime, endTime) => {
  if (!startTime || !typedText) return 0;
  
  const timeElapsed = (endTime - startTime) / 1000 / 60; // in minutes
  const wordsTyped = typedText.trim().split(' ').length;
  
  return timeElapsed > 0 ? wordsTyped / timeElapsed : 0;
};

export const calculateAccuracy = (typedText, expectedText) => {
  if (!typedText || !expectedText) return 100;
  
  let correctChars = 0;
  const minLength = Math.min(typedText.length, expectedText.length);
  
  for (let i = 0; i < minLength; i++) {
    if (typedText[i] === expectedText[i]) {
      correctChars++;
    }
  }
  
  return minLength > 0 ? (correctChars / minLength) * 100 : 100;
};

export const calculateNetWPM = (wpm, accuracy) => {
  return wpm * (accuracy / 100);
};