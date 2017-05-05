import { DemoBasicPage } from './app.po';

describe('demo-basic App', () => {
  let page: DemoBasicPage;

  beforeEach(() => {
    page = new DemoBasicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
