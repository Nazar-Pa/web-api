// scraper/turboScraper.js
import axios from "axios";
import { rateDelay } from "../utils/limiter.js";

function buildUrl(filters) {
  const baseUrl = "https://turbo.az/autos";
  const params = new URLSearchParams();

  // Helper to append array params like q[model][]
  const appendArray = (key, values) => {
    if (!values) return;
    console.log(`Appending array param: ${key} with values`, values);
    values.forEach(v => {
      params.append(`q[${key}][]`, v);
    });
  };

  // Basic filters
  if (filters.page) params.append("page", filters.page);
  appendArray("make", [].concat(filters.make || []));
  appendArray("model", [].concat(filters.models || []));

  if (filters.yearFrom) params.append("q[year_from]", filters.yearFrom);
  if (filters.yearTo) params.append("q[year_to]", filters.yearTo);

  if (filters.priceFrom) params.append("q[price_from]", filters.priceFrom);
  if (filters.priceTo) params.append("q[price_to]", filters.priceTo);

  // Defaults (important!)
  // params.append("q[currency]", "azn");
  // params.append("q[loan]", "0");
  // params.append("q[barter]", "0");

  console.log("Built URL:", `${baseUrl}?${params.toString()}`);

  return `${baseUrl}?${params.toString()}`;
}

async function scrapeTurbo(filters) {
  await rateDelay();

  const url = buildUrl(filters);

  const res = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Language": "az,en;q=0.9"
    }
  });

  return res.data;
}

export default scrapeTurbo;