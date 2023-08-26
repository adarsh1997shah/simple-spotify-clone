export function getMinAndSec(duration) {
  const min = Math.floor(duration / 60);
  const seconds = duration - 60 * min;

  return { min, seconds };
}
