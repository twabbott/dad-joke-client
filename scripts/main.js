const getMoreBtn = document.getElementById('get-more');
const status = document.getElementById('status');
const list = document.getElementById('list');

async function getJokes(count) {
  const url = `https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/${count}`;

  let data = [];
  try {
    status.textContent = "Loading...";

    const result = await fetch(url);
    data = await result.json();

    status.textContent = "";
  } catch (err) {
    console.error(err);
    status.textContent = err.message;
  }

  return data;
}

getMoreBtn.addEventListener('click', async () => {
  const jokes = await getJokes(50);

  console.log(jokes);
});
