export default (name: string, len = 2) =>
  name
    .replace(/-/g, '')
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .map(n => n[0])
    .slice(0, len)
    .join('')
    .toUpperCase();
