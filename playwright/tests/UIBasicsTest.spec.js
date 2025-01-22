// @ts-check
import { test, expect } from "@playwright/test";

test("Browser Context Declaration", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page test", async ({ page }) => {
  await page.goto("https://google.com");
});

// test.only("Page test", async ({ page }) => {
//   await page.goto("https://google.com");
// });

test("Title Google test", async ({ page }) => {
  await page.goto("https://google.com");

  const title = await page.title();

  expect(title).toBe("Google");

  // Forma directa
  await expect(page).toHaveTitle("Google");
});

test("Error message for incorrect username/password on sign in", async ({
  browser,
}) => {
  // Se recomienda instalar extensión en Chrome llamado SelectorsHub - XPath Helper

  /*
  If ID is present
    css -> tagname#id (or) #id

  If class attribute is present
    css -> tagname.class (or) .class

  Write css based on any Attribute
    css -> [attribute="value"]

  Write css traversing from Parent to Child
    css -> parenttagname >> childtagname

  If needs to write the locator based on text
    text=""
  */

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator("#username").fill("rahulshetty");
  await page.locator("#password").fill("learning");
  await page.locator("#signInBtn").click();

  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );
});

test("Successful sign in with correct username/password", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.locator("#signInBtn").click();
  //console.log(await page.locator(".card-body a").nth(0).textContent());

  // Garantiza que el selector .card-body a esté presente en el DOM antes de intentar interactuar con él.
  await page.waitForSelector(".card-body a");

  //Guarda un Array con todos los titles encontrados
  const allTittles = await page.locator(".card-body a").allTextContents();

  //console.log(allTittles);

  expect(allTittles).toHaveLength(4);
});

test("Successful login Select option", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  await page.locator("select.form-control").selectOption({ value: "consult" });
  await page.locator("#terms").click();

  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await expect(page.locator("#terms")).toBeChecked();

  //await page.pause();
});

test("Child windows handling test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.locator("#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    //Si necesitamos mas de una ventana secundaria se debe especificar [newPage, newPage2]
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  const textArray = text?.split("@");
  const domain = textArray?.[1].split(" ")[0];

  console.log(domain);

  if (!domain) throw new Error("Domain is undefined");

  await page.locator("#username").fill(domain);
});

//Para que la prueba vaya paso a paso se debe ejecutar por consola --> npx playwright test tests/UIBasicsTest.spec.js --debug

//Para auto generar el test se debe ejecutar por consola la web a testear --> npx playwright codegen https://leandro-pereyra-dev.vercel.app/
