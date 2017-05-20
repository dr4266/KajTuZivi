import { KajTuZiviFrontendPage } from './app.po';

describe('kaj-tu-zivi-frontend App', () => {
  let page: KajTuZiviFrontendPage;

  beforeEach(() => {
    page = new KajTuZiviFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
