import puppeteer from "https://deno.land/x/puppeteer/mod.ts";
import { cheerio } from "https://deno.land/x/cheerio/mod.ts";

const url =
  "https://www.villefortentrega.com.br/produtos/departamento/mercearia/atomatado";
console.log("%cScraping", "background-color: blue");
console.log(url);

try {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForNavigation();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const html = await page.content();

  const $ = cheerio.load(html);
  const products = $(".border-promotion");

  products.each((i, product) => {
    const name = $(product).find(".description").text().trim();
    const price = $(product)
      .find(".info-price")
      .contents()
      .filter(function () {
        return this.type === "text";
      })
      .text()
      .trim();
    console.log("%cName:", "color: #FFC0CB", name);
    console.log("%cPrice:", "color: #FFC0CB", price);
  });
} catch (error) {
  console.error(error);
}
