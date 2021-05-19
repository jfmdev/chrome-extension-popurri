import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.min.css";

import App from "./components/scraper.svelte";

const app = new App({
  target: document.getElementById("root"),
});

export default app;