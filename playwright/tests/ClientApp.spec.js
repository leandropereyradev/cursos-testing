// @ts-check
import { test, expect } from "@playwright/test";

test("Successful login displays exactly 8 product titles", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();

  await page.waitForLoadState("networkidle");
  //await page.waitForSelector(".card-body b");
  //await page.locator(".card-body b").first().waitFor()

  const allTittles = await page.locator(".card-body b").allTextContents();

  expect(allTittles).toHaveLength(9);
});
