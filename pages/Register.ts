import { By, Key } from "selenium-webdriver";
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
    this.setUrl(`${config.baseUrl}/registration/business`);
  }

  @findBy(By.css('input[formcontrolname="firstName"]'))
  public FirstName: TextInput;

  @findBy(By.css('input[formcontrolname="lastName"]'))
  public LastName: TextInput;

  @findBy(By.css('input[formcontrolname="email"]'))
  public Email: TextInput;

  @findBy(By.css('input[formcontrolname="password"]'))
  public Password: TextInput;

  @findBy(By.css('input[formcontrolname="confirmPass"]'))
  public ConfirmPassword: TextInput;

  @findBy(By.css('button[type="submit"]'))
  public Signup: Button;

  public loadCondition() {
    return elementIsVisible(() => {
      return this.FirstName;
    });
  }

  public async signIn() {
    await this.Signup.waitUntilLocatedAndDisplayed(10000);
    await this.FirstName.pressTabAndType("Talwinder");
    await this.LastName.pressTabAndType("Singh");
    await this.Email.pressTabAndType("singhtalwinder756@gmail.com");
    await this.Password.pressTabAndType("Talwinder@1234");
    await this.ConfirmPassword.pressTabAndType("Talwinder@1234");
    await this.Signup.click();
    await this.browser.sleep(5000);
  }
}
