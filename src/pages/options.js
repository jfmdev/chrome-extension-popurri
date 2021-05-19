import App from "./components/options.svelte";

console.log("Hello Options!");

const app = new App({
  target: document.getElementById("root"), // entry point in ../public/index.html
});

export default app;
