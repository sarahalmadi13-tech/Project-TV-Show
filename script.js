//You can edit ALL of the code here
let allEpisodes = []; // global store to keep original data

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return episode.name.toLowerCase().includes(searchTerm) || 
             episode.summary.toLowerCase().includes(searchTerm);
    });
    makePageForEpisodes(filteredEpisodes);
  });
  setupSearch();
  setupSelector();
}

//The Main rendering function. Once you have the list of episodes,
//then makePageForEpisodes will create elements to show the episode's name, season, number, image
//and summary and add them to the page.
function getEpisodeId(episode) {
  const season = episode.season.toString().padStart(2, "0");
  const number = episode.number.toString().padStart(2, "0");
  return `S${season}E${number}`;
}

function createEpisodeCard(episode) {
  const episodeId = getEpisodeId(episode);
  const episodeTitle = `${episodeId} - ${episode.name}`;
  const episodeElement = document.createElement("div");
  episodeElement.className = "episode-card";
  episodeElement.id = `ep-${episode.id}`;

  episodeElement.innerHTML = `
    <h3>${episodeTitle}</h3>
    <img src="${episode.image.medium}" alt="${episode.name}">
    <p>${episode.summary}</p>
    <a href="${episode.url}" target="_blank">View on TVMaze</a>
  `;
  return episodeElement;
}

//this function takes an episode list and creates HTML elements for each episode,
//then adds them to the page
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const countElem = document.getElementById("episode-count");
  rootElem.innerHTML = ""; // clear the page
  countElem.innerText = `Displaying ${episodeList.length}/${allEpisodes.length} episodes`;

  // Loop through the episode list and create a card for each episode
  episodeList.forEach((episode) => {
    rootElem.appendChild(createEpisodeCard(episode));
  });
}

function setupSearch() {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
      );
    });
    makePageForEpisodes(filteredEpisodes);
  });
}

function setupSelector() {
  const select = document.getElementById("episode-select");
  
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `${getEpisodeId(episode)} - ${episode.name}`;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const element = document.getElementById(`ep-${selectedId}`);
      element.scrollIntoView({ behavior: "smooth" });
    }
  });
}

//run setup when page loads, this will fetch the episode data and render the UI
window.onload = setup;
