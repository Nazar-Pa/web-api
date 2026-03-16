// scraper/parser.js
import * as cheerio from 'cheerio';

export default function parse(html) {
  const $ = cheerio.load(html);
  const cars = [];

  const productsAmountText = $(".products-title-amount").first().text();
  const productsAmount = parseInt(productsAmountText.replace(/[^\d]/g, ""), 10);
  const perPage = 24;
  const totalPages = Math.ceil(productsAmount / perPage);

  $(".products-i:not(.products-i--promotion-card)").each((i, el) => {
    const item = $(el);

    // 🔼 TOP section (image, badges)
    const top = item.find(".products-i__top");

    const image =
      top.find("img").attr("src") ||
      top.find("img").attr("data-src");

    const isVip = top.find(".products-i__paid").length > 0;

    // 🔽 BOTTOM section (main data)
    const bottom = item.find(".products-i__bottom");

    const name = bottom.find(".products-i__name").text().trim();
    const priceText = bottom.find(".products-i__price").text().trim();
    const attr = bottom.find(".products-i__attributes").text().trim();
    const datetime = bottom.find(".products-i__datetime").text().trim();

    const link = item.find("a.products-i__link").attr("href");
    let id = null;
    if (link) {
      const slug = link.split("/").pop(); // "10149130-audi-a4"
      id = slug.split("-")[0];            // "10149130"
    }
    // Parse attributes
    let year, engine, mileage;

    if (attr) {
      const parts = attr.split(",").map(p => p.trim());
      year = parts[0];
      engine = parts[1];
      mileage = parts[2];
    }

    // Clean price
    const price = parseInt(priceText.replace(/[^\d]/g, ""), 10);

    cars.push({
      id,
      name,
      price,
      currency: "AZN",
      year,
      engine,
      mileage,
      image,
      isVip,
      location_time: datetime,
      link: link ? `https://turbo.az${link}` : null
    });
  });

  return { cars, count: productsAmount, totalPages };
};