from app import app
import unittest
import json

class AppTestCase(unittest.TestCase):

    def setUp(self):
        # creates a test client
        self.app = app.test_client()
        # propagate the exceptions to the test client
        self.app.testing = True 

    def tearDown(self):
        pass

    def get_drivers_points(self):
        result = self.app.get('/api/standings.json')
        result_parsed = json.loads(result.data)
        drivers_points = map(lambda x: x['points'], result_parsed)
        total_points = reduce(lambda x,y: x+y, drivers_points)
        return total_points

    def test_home_status_code(self):
        # sends HTTP GET request to the application
        # on the specified path
        result = self.app.get('/')

        # assert the status code of the response
        self.assertEqual(result.status_code, 200)

    # Basic test for standings call
    # Tests that the existing 11 drivers are returned
    def test_standings_returned(self):
        result = self.app.get('/api/standings.json')
        self.assertEqual(result.status_code, 200)
        self.assertEqual(len(json.loads(result.data)), 11)

    # Test that checks that one of the drivers gets incremented their points by one after each call
    def test_standings_increment_points(self):
        total_points_request_1 = self.get_drivers_points()
        total_points_request_2 = self.get_drivers_points()

        self.assertEqual(total_points_request_2, total_points_request_1 + 1)

    # Basic test for the teams call
    def test_team_details_returned(self):
        result = self.app.get('/api/team/1.json')
        self.assertEqual(result.status_code, 200)

        parsed_result = json.loads(result.data)
        assert isinstance(parsed_result, dict)
        assert 'Ferrari' in parsed_result['team']

    # If the team id does not exist we return error 404
    def test_team_details_not_found(self):
        result = self.app.get('/api/team/33.json')
        self.assertEqual(result.status_code, 404)

if __name__ == '__main__':
    unittest.main()
