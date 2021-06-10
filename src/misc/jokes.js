import Storage from "./storage";

export const JOKES_APIS = [
  { key: "chuck", name: "Chuck Norris" },
  { key: "jokeapi", name: "Joke API" },
];

export async function chuckNorris() {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await response.json();
  return data.value;
}

export async function jokeApi() {
  const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
  const data = await response.json();
  return data.joke;
}

export function getApiKey() {
  return Storage.getSingle(Storage.Keys.JOKES);
}

export async function getJoke() {
  const selected = await getApiKey();
  return selected !== JOKES_APIS[0].key ? jokeApi() : chuckNorris();
}

export function setApiKey(apiKey) {
  return Storage.setSingle(Storage.Keys.JOKES, apiKey);
}

export default {
  JOKES_APIS,
  chuckNorris,
  jokeApi,
  getApiKey,
  getJoke,
  setApiKey,
};
