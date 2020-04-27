describe('Tutorial', () => {
  afterEach(async () => {
    console.log('Test Start');
  })
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have tutorial screen 1', async () => {
    await expect(element(by.text('WELCOME TO HUMANTIV!'))).toBeVisible();
  });

  it('should have tutorial screen 2', async () => {
    await element(by.id("tutorial-view")).swipe('left');
    await expect(element(by.text('REPORT'))).toBeVisible();
  });

  it('should have tutorial screen 2', async () => {
    await element(by.id("tutorial-view")).swipe('left');
    await element(by.id("tutorial-view")).swipe('left');
    await expect(element(by.text('MANAGE CONTENT'))).toBeVisible();
  });

  // it('should go to register view', async () => {
  //   await expect(element(by.text('GET STARTED'))).toBeVisible()
  //   await element(by.text('GET STARTED')).tap()
  //   await expect(element(by.text('Name'))).toBeVisible()
  //   await expect(element(by.text('Email address'))).toBeVisible()
  //   await expect(element(by.text('Password'))).toBeVisible()
  // })
});