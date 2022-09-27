import { Browser } from "../lib";
import { FacebookSignInPage } from "./FacebookSignInPage";
import { GoogleSignInPage } from "./GoogleSignInPage";
import { HomePage } from "./HomePage";
import { RegisterPage } from "./Register";
import { ShowIdeaPage } from "./ShowIdeaPage";

export {
  RegisterPage,
  ShowIdeaPage,
  HomePage,
  GoogleSignInPage,
  FacebookSignInPage,
};

export class AllPages {
  public register: RegisterPage;

  constructor(public browser: Browser) {
    this.register = new RegisterPage(browser);
  }

  public async dispose(): Promise<void> {
    await this.browser.close();
  }
}
