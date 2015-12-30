describe('api service', function () {
  var api, $httpBackend;

  const API_RESPONSE = [
    {
      "points": 3,
      "driver": "Fernando Alonso",
      "country": "es",
      "team": 1
    },
    {
      "points": 12,
      "driver": "Nico Rosberg",
      "country": "de",
      "team": 2
    },
    {
      "points": 7,
      "driver": "Daniel Ricciardo",
      "country": "au",
      "team": 3
    }
  ];

  //Load our module before each test
  beforeEach(module('grandprixApp'));

  beforeEach(inject(function(_$httpBackend_, _api_){
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('api/standings.json').respond(API_RESPONSE);
    api = _api_
  }));

  it('getStandings should return 3 drivers', function(){
    api.getStandings().then(function(result) {
      expect(result.data).toEqual(API_RESPONSE);
    });
    $httpBackend.flush();
  });
});

