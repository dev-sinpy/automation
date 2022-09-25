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
        let promise;
        if (typeof selector === "string") {
          promise = (this as any).browser.findElement(selector);
        } else {
          promise = (this as any).browser.findElementBySelector(selector);
        }
        return new type(promise, selector);
      },
    });
  };
}
