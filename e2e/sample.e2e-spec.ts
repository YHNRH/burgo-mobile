import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";

describe("smart home testing:", () => {
    let driver: AppiumDriver;
    let testName = "Test name"
    let newTestName = "New test name"
    let testUrlStatus = "http://test.com/status"
    let testUrlEnable = "http://test.com/enable"
    let testUrlDisable = "http://test.com/disable"
    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        await driver.logTestArtifacts("report");
    });
    it("create relay", async () => {
        let createBtn = await driver.findElementByText('create')
        await createBtn.click()
        let name = await driver.findElementByText("name")
        await name.sendKeys(testName)
        await driver.hideDeviceKeyboard()
        let status = await driver.findElementByText("status url")
        await status.sendKeys(testUrlStatus)
        await driver.hideDeviceKeyboard()

        let enable = await driver.findElementByText("enable url")
        await enable.sendKeys(testUrlEnable)
        await driver.hideDeviceKeyboard()

        let disable = await driver.findElementByText("disable url")
        await disable.sendKeys(testUrlDisable)
        await driver.hideDeviceKeyboard()

        let submit = await driver.findElementByText("Submit")
        await submit.click()

        let newRelay = await driver.findElementByTextIfExists(testName)
        expect(await newRelay.exists()).toBeTrue()
    });


    it("edit relay", async () => {
        let relay = await driver.findElementByText(testName)
        await relay.hold(1000)
        let name = await driver.findElementByText(testName)
        await name.sendKeys(newTestName)
        await driver.hideDeviceKeyboard()
       
        let submit = await driver.findElementByText("Submit")
        await submit.click()
        await driver.sleep(1000)
        let newRelay = await driver.findElementByTextIfExists(newTestName)
        expect(await newRelay.exists()).toBeTrue()
        expect(await newRelay.text()).toBe(newTestName)
    });

    it("delete relay", async () => {
        let relay = await driver.findElementByText(newTestName)
        await relay.hold(1000)
        let deleteBtn = await driver.findElementByText("Delete")
        await deleteBtn.click()
       
        await driver.sleep(1000)
        let newRelay1 = await driver.findElementByTextIfExists(newTestName)
        expect(newRelay1).toBeUndefined()
    });
});