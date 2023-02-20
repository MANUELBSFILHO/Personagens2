const container = document.querySelector('.container');
const apiUrl = 'https://rickandmortyapi.com/api/character';

fetch(apiUrl)  /* REALIZA A REQUISIÇÃO */
  .then(response => response.json())
  .then(data => {
    const characters = data.results;
    const shuffledCharacters = shuffle(characters); /* shuffl e função usa o algoritmo de embaralhamento */
    const randomCharacters = shuffledCharacters.slice(0, 6); /*  código usa o slice()método para extrair um conjunto aleatório de 6 caracteres */
    randomCharacters.forEach(character => {     
      const card = createCard(character);
      container.appendChild(card);
    });
  })
  .catch(error => console.log(error));

function shuffle(array) {  /* aleatorização ou reorganização de uma lista de itens */
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(character) {  /* cria um elemento de card com base nas informações de um personagem */
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = character.image;
  image.alt = character.name;

  const name = document.createElement('h3');
  name.textContent = character.name;

  const species = document.createElement('p');
  species.textContent = `Species: ${character.species}`;

  const status = document.createElement('p');
  status.textContent = `Status: ${character.status}`;

  const location = document.createElement('p');
  location.textContent = `Location: ${character.location.name}`;

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(species);
  card.appendChild(status);
  card.appendChild(location);

  return card;
}
