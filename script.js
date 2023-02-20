// Utils
function api_request({
  path = '',
  body = undefined,
  method = 'GET',
  baseURL = 'https://rickandmortyapi.com/api',
  headers = {}
}) {
  const request_init = {
    body, headers, method
  }
  return fetch(baseURL + path, request_init).then(async response => {
    const content_type = response.headers.get('Content-Type')
    if (content_type.startsWith('application/json'))
      return response.json()
    return response.text()
  })
}
const api = {
  locations: {
    get: () => api_request({ method: 'GET', path: '/location' }),
    id: (location_id = '') => ({
      get: () => api_request({ method: 'GET', path: `/location/${location_id}` }),
    })
  },
  characters: {
    get: () => api_request({ method: 'GET', path: '/character' }),
    id: (character_id = '') => ({
      get: () => api_request({ method: 'GET', path: `/character/${character_id}` }),
    })
  },
  episodes: {
    get: () => api_request({ method: 'GET', path: '/episode' }),
    id: (episode_id = '') => ({
      get: () => api_request({ method: 'GET', path: `/episode/${episode_id}` }),
    })
  },
}
// script
async function main() {
  const characters = await api.characters.get()
    .then(({ results }) => (
      results
        .sort(() => Math.random() > .5 ? 1 : -1)
        .slice(0, 6)
    ))
  const showcase = document.getElementsByClassName('showcase')[0]
  for (const character of characters) {
    const character_card = document.createElement('div')
    character_card.className = 'character-card'
    character_card.innerHTML = `
      <div class="character-card">
        <img class="character-img" src="${character.image}" />
        <div class="character-info">
          <a class="character-name" href="${character.url}" target="_blank">
            ${character.name}
          </a>
          <div class="character-status">
            <span class="status-point" data-status="${character.status}"></span>
            <span>${character.status} - ${character.species}</span>
          </div>
          <div class="character-section">
            <div class="section-title">Last known location:</div>
            <div class="section-value">${character.location.name}</div>
          </div>
          <div class="character-section">
            <div class="section-title">First seen in:</div>
            <div class="section-value">${character.origin.name}</div>
          </div>
        </div>
      </div>
    `
    showcase.appendChild(character_card)
  }
}
window.addEventListener('load', main)