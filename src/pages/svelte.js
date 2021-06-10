import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.min.css";

import Scraper from "./components/scraper.svelte";
import Options from "./components/options.svelte";

const type = document.getElementsByTagName("body")[0].getAttribute("data-type");

const params = {
  target: document.getElementById("root"),
};

const app = type === "scraper" ? new Scraper(params) : new Options(params);

export default app;
