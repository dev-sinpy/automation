import { By } from "selenium-webdriver";
import config from "../config";
import {
  WebComponent,
  Browser,
  Page,
  findBy,
  elementIsVisible,
  TextInput,
  Button,
} from "../lib";

export class RegisterPage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/registration`);
  }

  @findBy(
    By.xpath('//input[@formcontrolname="firstName"]/parent::div/parent::div')
  )
  public FirstNameLabel: TextInput;

  @findBy(By.css('input[formcontrolname="firstName"]'))
  public FirstName: TextInput;

  @findBy(By.css('button[type="submit"]'))
  public Signup: Button;

  public loadCondition() {
    return elementIsVisible(() => {
      return this.FirstName;
    });
  }

  public async signIn() {
    console.log(
      await this.FirstName.isLocated(),
      await this.FirstName.isDisplayed()
    );
    await this.browser.sleep(5000);
    console.log(
      await this.FirstName.isLocated(),
      await this.FirstName.isDisplayed()
    );
    await this.FirstName.type("talwinder");
    await this.Signup.click();
    await this.browser.sleep(5000);
  }
}
