import { Browser, WaitCondition } from "./";

export interface NewablePage<T extends Page> {
  new (browser: Browser): T;
}

export abstract class Page {
  private url: string;

  protected setUrl(url: string) {
    this.url = url;
  }

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url);
  }

  public abstract loadCondition(): any;

  public constructor(protected browser: Browser) {}
}
