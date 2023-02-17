describe("E2E initial", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have info about cancel subscription", async () => {
    const HomeScreenInfo = await element(
      by.text("Cancel anytime. Ofter terms apply.")
    );
    await expect(HomeScreenInfo).toBeVisible();
  });

  it("should subscribe to the premium plan", async () => {
    await element(by.id("option-premium")).tap();
    await element(by.id("input-email")).tap();
    await element(by.id("input-email")).typeText("binaryleo@mail.com");
    await element(by.id("keyboard")).tap();
    await element(by.id("button-subscribe")).tap();
    await device.takeScreenshot('snapshot-premium-plan-test');
  });
});
