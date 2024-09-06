Feature: Ui Examples Web App Login

    Scenario: Fill Username and Password
        Given 002 - I start my Ui Examples web application
        When 002 - The login page loads
        Then 002 - I am able to fill the username and password fields
        
    Scenario: Login Successfully and Get to Home Page
        Given 002 - I am at the login page
        When 002 - I fill the username and password fields
        Then 002 - I am able login successfully and get to the home page

    Scenario: Login Fails and Get Error Message
        Given 002 - I am at the login page once again
        When 002 - I fill the username and password fields with incorrect credentials
        Then 002 - I am NOT able login successfully and get an error message
