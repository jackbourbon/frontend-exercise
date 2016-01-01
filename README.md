#Exercise Solution
The given package contains a solution for the proposed exercise. The solution includes:

* The optional part of displaying the current position of each driver of the team in the team details page
* Implementations of at least a service, a directive and a filter in AngularJS
* Tests
* Some UI candy

## Package contents

Inside the package you can find the following relevant files and directories:

For the backend part:

* **app.py**: The application file with the backend code
* **app_test.py**: Unit tests for the backend

For the frontend part:

* **static/index.html**: Index page for the application
* **static/css/main.css**: CSS stylesheet for the application
* **static/js/app.js**: Angular declarations and implementations
* **static/partials/standings.html**: Partial template to show the current standings
* **static/partials/team-detail.html**: Partial template to show the details page for each team
* **static/img**: Directory which adds a few images for the application's look & feel.
* **test/unit/apiSpec.js**: A simple unit test about the API call
* **test/e2e/scenarios.js**: Tests for some end to end scenarios

##Running the application
First, activate the virtual environment for this project:

    source env/bin/activate

If it is the first time you are running the project, install the dependencies for the project running:

    pip install -r requirements.txt
    
If it is the first time you are running the project, install bower dependencies with:

    bower install

And finally run the app with:

    python app.py

After this the application should be available at the address [http://localhost:5000](http://localhost:5000)


## Testing
###Tool Installation
I am using **Karma** for unit testing and **Protractor** for end to end testing.

In case you don't have these tools installed you can do it easily following the instructions specified at their web pages:

[Karma installation page](http://karma-runner.github.io/0.13/intro/installation.htm)

[Protractor reference page](https://angular.github.io/protractor/#)

Also, both tools are set to work in Chrome

###Backend
I used Python's **unittest** package to write unit tests for the API. To run them execute

    python app_test.py

###Frontend


To run the unit tests execute:


    karma start test/karma.conf.js


To run the end-to-end tests:

* The application should be running
* You should start **webdriver-manager** with `webdriver-manager start` and leave it running
* And finally run protractor with protractor `test/protractor-conf.js`