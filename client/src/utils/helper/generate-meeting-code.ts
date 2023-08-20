function generateMeetingCode(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';

  for (let i = 0; i < 9; i++) {
    if (i > 0 && i % 3 === 0) {
      randomString += '-';
    }
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }

  return randomString;
}

export default generateMeetingCode