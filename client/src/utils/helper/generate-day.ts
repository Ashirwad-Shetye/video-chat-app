function getCurrentDay(): string {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const dayOfMonth = now.getDate();

  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}

export default getCurrentDay