const jokesEngines = {
  chuckNorris: async function() {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return data.value;    
  },

  jokeApi: async function() {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();
    return data.joke;
  }
};

export default jokesEngines;