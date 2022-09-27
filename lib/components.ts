import { By, WebElement, WebElementPromise, until } from "selenium-webdriver";
import { Browser } from ".";

export class WebComponent {
  constructor(protected browser: Browser, public selector: By) {}

  public async click() {
    try {
      const element = await this.getElement();
      return await element.click();
    } catch (clickErr) {
      try {
        const element = await this.getElement();
        await element
          .getDriver()
          .executeScript("arguments[0].click();", element);
      } catch (jsErr) {
        throw clickErr;
      }
    }
  }

  public async getElement(): Promise<WebElement> {
    await this.browser.wait(until.elementLocated(this.selector));
    return this.browser.findElementBySelector(this.selector);
  }

  public async isDisplayed() {
    try {
      const element = await this.getElement();
      return await element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText() {
    const element = await this.getElement();
    return await element.getText();
  }

  public async isLocated(): Promise<boolean> {
    return !!(await this.browser.wait(until.elementLocated(this.selector)));
  }
}

export class Button extends WebComponent {
  constructor(protected browser: Browser, public selector: By) {
    super(browser, selector);
  }

  public async isDisabled() {
    try {
      const element = await this.getElement();
      return (await element.getAttribute("disabled")) === "disabled";
    } catch (ex) {
      return false;
    }
  }
}

export class TextInput extends WebComponent {
  constructor(browser: Browser, selector: By) {
    super(browser, selector);
  }

  public async type(text: string) {
    const element = await this.getElement();
    return element.sendKeys(text);
  }
}
