import { test, expect } from "@playwright/test";

test.describe("Kanban board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with 5 columns", async ({ page }) => {
    for (const title of [
      "Backlog",
      "In Progress",
      "Review",
      "Done",
      "Blocked",
    ]) {
      await expect(
        page.getByRole("button", { name: title, exact: true }),
      ).toBeVisible();
    }
  });

  test("loads with pre-populated cards", async ({ page }) => {
    await expect(page.getByText("Set up CI/CD pipeline")).toBeVisible();
    await expect(page.getByText("User authentication")).toBeVisible();
  });

  test("adds a card to a column", async ({ page }) => {
    await page.getByRole("button", { name: "Add card" }).first().click();
    await page.getByPlaceholder("Card title").fill("My new task");
    await page.getByPlaceholder("Details (optional)").fill("Some details");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await expect(page.getByText("My new task")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    await page.getByText("Set up CI/CD pipeline").hover();
    await page.getByLabel("Delete card").first().click();
    await expect(page.getByText("Set up CI/CD pipeline")).not.toBeVisible();
  });

  test("opens and closes the card detail modal", async ({ page }) => {
    await page.getByText("Set up CI/CD pipeline").click();
    await expect(
      page.getByRole("heading", { name: "Set up CI/CD pipeline" }),
    ).toBeVisible();
    await page.getByLabel("Close").click();
    await expect(
      page.getByRole("heading", { name: "Set up CI/CD pipeline" }),
    ).not.toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    await page.getByRole("button", { name: "Backlog" }).click();
    const input = page.locator('[data-testid="column-col-1"] input');
    await input.fill("Todo");
    await input.press("Enter");
    await expect(page.getByRole("button", { name: "Todo" })).toBeVisible();
  });

  test("drags a card to another column", async ({ page }) => {
    const card = page.getByText("Set up CI/CD pipeline").first();
    const destColumn = page.locator('[data-testid="column-col-2"]');
    const cardBox = await card.boundingBox();
    const destBox = await destColumn.boundingBox();
    // dnd-kit uses pointer events, not native drag — use mouse API
    await page.mouse.move(
      cardBox!.x + cardBox!.width / 2,
      cardBox!.y + cardBox!.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      destBox!.x + destBox!.width / 2,
      destBox!.y + destBox!.height / 2,
      { steps: 20 },
    );
    await page.mouse.up();
    await expect(destColumn.getByText("Set up CI/CD pipeline")).toBeVisible();
  });
});
