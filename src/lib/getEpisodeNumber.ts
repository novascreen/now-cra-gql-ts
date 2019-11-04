export default (season = 0, episode = 0) => {
  const episodeNumber = episode.toString().padStart(2, '0');

  return `${season}x${episodeNumber}`;
};
