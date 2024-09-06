@mode:serial
Feature: Ui Examples Web App Authenticated Page (Modals - Continued)

    @auth
    Scenario: Open Modal 
        Given 009 - I am at the modals page
        When 009 - I click on Open Modal button
        Then 009 - I see the modal and can close it

    @auth
    Scenario: Open Form Modal
        Given 009 - I am at the modals page 2
        When 009 - I click on Open Form Modal button
        Then 009 - I see the modal with form and can close it 2
    
    @auth
    Scenario: Open Left Position Modal
        Given 009 - I am at the modals page 3
        When 009 - I click on Open Left Position Modal button
        Then 009 - I see the modal with left position and can close it

