//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
//The Main rendering function. Once you have the list of episodes,
//then makePageForEpisodes will create elements to show the episode's name, season, number, image
//and summary and add them to the page.
function getEpisodeId(episode) {
  const season = episode.season.toString().padStart(2, "0");
  const number = episode.number.toString().padStart(2, "0");
  return `S${season}E${number}`;
}
//this function takes an episode list and creates HTML elements for each episode,
//then adds them to the page
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // clear the page
  // Loop through the episode list and create a card for each episode
  episodeList.forEach((episode) => {
    const episodeId = getEpisodeId(episode);
    const episodeTitle = `${episodeId} - ${episode.name}`;
    const episodeElement = document.createElement("div");
    episodeElement.className = "episode-card";
    // Set the inner HTML of the episode card
    episodeElement.innerHTML = `
      <h3>${episodeTitle}</h3>
      <img src="${episode.image.medium}" alt="${episode.name}">
      <p>${episode.summary}</p>
      <a href="${episode.url}" target="_blank">View on TVMaze</a>
    `;

    rootElem.appendChild(episodeElement);
  });
}
//run setup when page loads, this will fetch the episode data and render the UI
window.onload = setup;
