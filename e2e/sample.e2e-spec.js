"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nativescript_dev_appium_1 = require("nativescript-dev-appium");
describe("smart home testing:", () => {
    let driver;
    let testName = "Test name";
    let newTestName = "New test name";
    let testUrlStatus = "http://test.com/status";
    let testUrlEnable = "http://test.com/enable";
    let testUrlDisable = "http://test.com/disable";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        driver = yield (0, nativescript_dev_appium_1.createDriver)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield driver.quit();
        console.log("Quit driver!");
    }));
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.logTestArtifacts("report");
        });
    });
    it("create relay", () => __awaiter(void 0, void 0, void 0, function* () {
        let createBtn = yield driver.findElementByText('create');
        yield createBtn.click();
        let name = yield driver.findElementByText("name");
        yield name.sendKeys(testName);
        yield driver.hideDeviceKeyboard();
        let status = yield driver.findElementByText("status url");
        yield status.sendKeys(testUrlStatus);
        yield driver.hideDeviceKeyboard();
        let enable = yield driver.findElementByText("enable url");
        yield enable.sendKeys(testUrlEnable);
        yield driver.hideDeviceKeyboard();
        let disable = yield driver.findElementByText("disable url");
        yield disable.sendKeys(testUrlDisable);
        yield driver.hideDeviceKeyboard();
        let submit = yield driver.findElementByText("Submit");
        yield submit.click();
        let newRelay = yield driver.findElementByTextIfExists(testName);
        expect(yield newRelay.exists()).toBeTrue();
    }));
    it("edit relay", () => __awaiter(void 0, void 0, void 0, function* () {
        let relay = yield driver.findElementByText(testName);
        yield relay.hold(1000);
        let name = yield driver.findElementByText(testName);
        yield name.sendKeys(newTestName);
        yield driver.hideDeviceKeyboard();
        let submit = yield driver.findElementByText("Submit");
        yield submit.click();
        yield driver.sleep(1000);
        let newRelay = yield driver.findElementByTextIfExists(newTestName);
        expect(yield newRelay.exists()).toBeTrue();
        expect(yield newRelay.text()).toBe(newTestName);
    }));
    it("delete relay", () => __awaiter(void 0, void 0, void 0, function* () {
        let relay = yield driver.findElementByText(newTestName);
        yield relay.hold(1000);
        let deleteBtn = yield driver.findElementByText("Delete");
        yield deleteBtn.click();
        yield driver.sleep(1000);
        let newRelay1 = yield driver.findElementByTextIfExists(newTestName);
        expect(newRelay1).toBeUndefined();
    }));
});
//# sourceMappingURL=sample.e2e-spec.js.map