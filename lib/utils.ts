import "reflect-metadata";
import { By } from "selenium-webdriver";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function findBy(selector: By | string) {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function () {
        if (typeof selector === "string") {
          return new type(this.browser, By.css(selector));
        }
        return new type(this.browser, selector);
      },
    });
  };
}
