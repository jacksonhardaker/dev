const AVG_WORDS_PER_MINUTE = 250;

const calculateReadingTime = text => {
  const parsedText = text.replace(/\s/, ' ').split(' ');
  const minutes = parsedText.length / AVG_WORDS_PER_MINUTE;
  const rounded = Math.round(minutes);

  return `${rounded} min read`;
};

export default calculateReadingTime;
