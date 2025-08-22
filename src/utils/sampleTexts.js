const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is perfect for testing typing speed and accuracy.",
  
  "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat.",
  
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity.",
  
  "To be or not to be, that is the question. Whether it is nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles.",
  
  "The art of programming is the skill of controlling complexity. The great programs are written when people know what to build and, just as importantly, what not to build.",
  
  "Space exploration has always captured the human imagination. From the first moon landing to modern space stations, we continue to push the boundaries of what is possible.",
  
  "Technology has transformed the way we communicate, work, and live. Social media connects people across the globe, while artificial intelligence assists in countless daily tasks.",
  
  "The ocean covers more than seventy percent of Earth's surface. Despite its vastness, we have explored less than five percent of our planet's underwater realm.",
  
  "Music has the power to evoke emotions, trigger memories, and bring people together. Whether classical symphonies or modern pop songs, rhythm and melody speak a universal language.",
  
  "Reading books expands our horizons and improves our vocabulary. Fiction allows us to experience different worlds, while non-fiction teaches us about reality and helps us grow.",
  
  "Climate change represents one of the greatest challenges of our time. Rising temperatures, melting ice caps, and extreme weather events require immediate global action.",
  
  "The invention of the internet revolutionized information sharing. What once took days or weeks to communicate can now happen instantly across any distance around the world.",
  
  "Photography captures moments in time that would otherwise be lost forever. From family portraits to stunning landscapes, images tell stories without using words.",
  
  "Cooking is both an art and a science. The perfect balance of ingredients, temperature, and timing creates dishes that nourish the body and delight the senses.",
  
  "Exercise and physical activity are essential for maintaining good health. Regular movement strengthens muscles, improves cardiovascular function, and boosts mental wellbeing."
];

export const getRandomText = () => {
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  return sampleTexts[randomIndex];
};