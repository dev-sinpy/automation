import { By, WebElement, until, Key } from "selenium-webdriver";
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
    return await this.browser.findElementBySelector(this.selector);
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

  public async isLocated(timeout: number = 3000): Promise<boolean> {
    return !!(await this.browser.wait(until.elementLocated(this.selector), timeout));
  }

  public async clickAndWaitStaleness(waitTime: number = 3000) {
    const element = await this.getElement();
    await element.click();
    await this.browser.wait(until.stalenessOf(element), waitTime);
  }

  public async waitUntilLocatedAndDisplayed(timeout: number = 3000): Promise<void> {
    await this.browser.wait(async () => {
      if (await this.isLocated(5000)) {
        return this.isDisplayed();
      } else {
        return false;
      }
    }, timeout);
  }

  public async sendKeys(key: string | number) {
    const element = await this.getElement();
    return await element.sendKeys(key);
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

  public async pressTabAndType(text: string) {
    await this.browser.getDriver().actions().sendKeys(Key.TAB).perform();
    const element = await this.getElement();
    return await element.sendKeys(text);
  }

  public async type(text: string) {
    const element = await this.getElement();
    return await element.sendKeys(text);
  }
}
