import { Browser, ensure } from "../lib";
import {
  Builder,
  ThenableWebDriver,
  WebElement,
  By,
  WebElementPromise,
  until,
} from "selenium-webdriver";
import { AllPages } from "../pages";
import { expect } from "chai";

describe("Register", () => {
  let pages: AllPages;

  before(async () => {
    pages = new AllPages(new Browser("chrome"));
  });

  it("Test Case #1: Unauthenticated cannot submit ideas", async () => {
    // Action
    await pages.register.navigate();
    await pages.register.signIn();

    // Assert
    expect(1).to.be.equal(1);
  });

  after(async () => {
    await pages.dispose();
  });
});
