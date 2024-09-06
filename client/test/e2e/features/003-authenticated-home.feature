@mode:serial
Feature: Ui Examples Web App Authenticated Page (Home)

    Scenario: See Home Page Navigation
        Given 003 - I am logged in
        When 003 - The home page loads
        Then 003 - I see the home page navigation items

    Scenario: Check Home Page Title
        Given 003 - I am already logged in
        When 003 - At the home page
        Then 003 - I see the home page title

    Scenario: Check Home Page Contents
        Given 003 - I am already logged in - 2
        When 003 - At the home page - 2
        Then 003 - I see the home page contents
