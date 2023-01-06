export default function check(date) {
  const realTime = new Date().getFullYear();

  const firstMovie = 1888;
  if (+date > realTime || +date < firstMovie || isNaN(date)) {
    return null;
  } else {
    return date;
  }
}
