
const status = document.getElementById('status');
const loadBtn = document.getElementById('loadBtn');
const countText = document.getElementById('countText');

async function getJokes(count) {
  const url = `https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/${count}`;

  let data = [];
  try {
    status.textContent = "Loading...";
    loadBtn.disabled = true;

    const response = await fetch(url);
    data = await response.json();

    status.textContent = "";
  } catch (err) {
    status.textContent = err.message;
  }

  loadBtn.disabled = false;

  return data;
}

function makeButton() {
  const button = document.createElement('button');
  button.type='button';
  button.textContent = 'Show';

  return button;
}

function makeQuestion(joke) {
  const p = document.createElement('p');
  p.textContent = joke.setup;

  return p;
}

function makeAnswer(joke) {
  const p = document.createElement('p');
  p.textContent = joke.punchline;
  p.style.display = 'none';
  p.classList.add('answer');

  return p;
}

function makeJoke(joke) {
  const section = document.createElement('section');

  const button = makeButton();
  section.appendChild(button);

  const question = makeQuestion(joke);
  section.appendChild(question);

  const answer = makeAnswer(joke);
  section.appendChild(answer);

  let visible = false;
  button.addEventListener('click', () => {
    if (visible) {
      answer.style.display = 'none';
      button.textContent = 'Show';
    } else {
      answer.style.display = 'block';
      button.textContent = 'Hide';
    }

    visible = !visible;
  });

  return section;
}

function makeJokeList(jokes) {
  const main = document.getElementById('list');
  main.textContent = '';

  for (let j of jokes) {
    const joke = makeJoke(j);

    main.appendChild(joke);
  }
}

async function onLoad() {
  const count = parseInt(countText.value);
  const jokes = await getJokes(count);

  makeJokeList(jokes);
}

loadBtn.addEventListener('click', onLoad);
window.addEventListener('load', onLoad);
