const { Builder, By, Key } = require('selenium-webdriver');
const sleep = require('sleep');

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  driver.manage().setTimeouts({ implicit: 1000 });
  await driver.get('localhost:3000');
});

it('navigates to all hikes list and has expected elements', async () => {
  await driver.findElement(By.id('all-hikes-nav')).click();
  const h2Text = await driver.findElement(By.tagName('h2')).getText();
  expect(h2Text).toBe('All Hikes');
  await driver.findElement(By.tagName('table'));
});

it('to add a hike, get directed to all hikes table with new hike added, and delete the hike', async () => {
  const rowIdentifier = Math.random();
  const expectedName = rowIdentifier.toString() + ' Hike';
  const expectedDistanceFromBostonHours = (rowIdentifier + 1).toString();
  const expectedHikeDistanceMiles = (rowIdentifier + 2).toString();
  await driver.findElement(By.id('add-nav')).click();
  await driver.findElement(By.id('name')).sendKeys(expectedName);
  await driver.findElement(By.id('distanceFromBostonHours')).sendKeys(expectedDistanceFromBostonHours);
  await driver.findElement(By.id('hikeDistanceMiles')).sendKeys(expectedHikeDistanceMiles);
  await driver.findElement(By.tagName('button')).click();

  await driver.findElement(By.tagName('table'));
  const h2Text = await driver.findElement(By.tagName('h2')).getText();
  expect(h2Text).toBe('All Hikes');
  const tableRows = await driver.findElement(By.tagName('tbody')).findElements(By.tagName('tr'));
  let thisHikeRow;
  for(const i in tableRows) {
    const name =  await tableRows[i].findElement(By.className('cell-name')).getText();
    if(name === expectedName) {
      thisHikeRow = tableRows[i];
      break;
    }
  }
  expect(thisHikeRow).toBeDefined();
  expect(thisHikeRow.findElement(By.className('cell-hikeDistanceMiles')).getText()).resolves.toBe(expectedHikeDistanceMiles);
  expect(thisHikeRow.findElement(By.className('cell-distanceFromBostonHours')).getText()).resolves.toBe(expectedDistanceFromBostonHours);

  await thisHikeRow.findElement(By.tagName('button')).click();

  const updatedTableRows = await driver.findElement(By.tagName('tbody')).findElements(By.tagName('tr'));
  let missingHikeRow;
  for(const i in updatedTableRows) {
    const name =  await updatedTableRows[i].findElement(By.className('cell-name')).getText();
    if(name === expectedName) {
      missingHikeRow = updatedTableRows[i];
      break;
    }
  }
  expect(missingHikeRow).not.toBeDefined();
});

it('to be unable to add hike with invalid params', async () => {
  const rowIdentifier = Math.random();
  const expectedName = rowIdentifier.toString() + ' Hike';
  const expectedDistanceFromBostonHours = (rowIdentifier + 1).toString();
  const expectedHikeDistanceMiles = (rowIdentifier + 2).toString();
  let submitButtonEnabled;

  await driver.findElement(By.id('add-nav')).click();
  
  submitButtonEnabled = await driver.findElement(By.tagName('button')).isEnabled();
  expect(submitButtonEnabled).toBe(false);

  await driver.findElement(By.id('name')).sendKeys(expectedName);
  submitButtonEnabled = await driver.findElement(By.tagName('button')).isEnabled();
  expect(submitButtonEnabled).toBe(false);

  await driver.findElement(By.id('distanceFromBostonHours')).sendKeys(expectedDistanceFromBostonHours);
  submitButtonEnabled = await driver.findElement(By.tagName('button')).isEnabled();
  expect(submitButtonEnabled).toBe(false);

  await driver.findElement(By.id('hikeDistanceMiles')).sendKeys(expectedHikeDistanceMiles);
  submitButtonEnabled = await driver.findElement(By.tagName('button')).isEnabled();
  expect(submitButtonEnabled).toBe(true);
});

afterAll((done) => {
  driver.quit().then(() => done());
});
