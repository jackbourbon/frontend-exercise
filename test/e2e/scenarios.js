describe('Protractor Demo App', function() {
  beforeEach(function() {
    var EC = protractor.ExpectedConditions;
    var table = $('table.standings');
    var isReady = EC.presenceOf(table);

    browser.get('/');
    browser.wait(isReady, 2000);
  });

  it('should have 11 drivers in the standings', function() {
    var driverList = element.all(by.repeater("driver in Standings.driver"));
    expect(driverList.count()).toBe(11);
  });

  it('the teams in the standings should link to a team details page', function() {
    element.all(by.linkText('Scuderia Ferrari')).get(1).click();
    //Checking we went to the right page
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toEqual('http://localhost:5000/#/teams/1');
    });
    //Checking that the car model appears
    expect(element(by.css('.team-car')).getText()).toEqual('Ferrari 059/3');

    //Checking that standings with the two drivers of the team appear
    var driverList = element.all(by.repeater("driver in Standings.driver"));
    expect(driverList.count()).toBe(2);
  });
});
