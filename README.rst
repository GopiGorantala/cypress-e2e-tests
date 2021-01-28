*****************
cypress-e2e-tests
*****************

This repo contains e2e tests written in Cypress for different edX applications

=======================
Introduction to Cypress
=======================

Cypress is a relatively new automated tests tool which is gaining popularity at a very rapid pace. (https://www.cypress.io)

Cypress newcomer tutorial: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell

Starting tutorial videos: https://docs.cypress.io/examples/examples/tutorials.html#Best-Practices

==============
E2E Tests Repo
==============

This repo is meant to contain multiple projects, for now there is one project:

Enterprise Admin Portals (Active)

With time we will add more projects in the repo

=========================
Protocols for Test Design
=========================

We don't yet have well defined protocols for writing Cypress tests for edX application, so this work was mostly experimental

The first project was MIT Journals (which has since been deprecated and removed).

In the second project, Enterprise Admin Portal, the following approach was used:

* Page Object model is used in spite of what Cypress site says, it increases readability of code and is much easier to manage

* Instead of using arrow functions traditional named functions are used, this is done to to be able to use **this**, which is not working with arrow functions

* Cypress commands and helper functions are still utilized

The tests for Enterprise Admin Portal are present in following path

https://github.com/edx/cypress-e2e-tests/tree/master/cypress/integration/admin_portal

To manage multiple projects customized config files are used so user is able to run any project without making any change in the code

Config files for projects are placed here

https://github.com/edx/cypress-e2e-tests/tree/master/config


====================
 Configuration Setup
====================

1. Fill in the Environment Variable values in `env_vars.env`. Example config for use with the devstack-provisioned data: 

  `CYPRESS_LMS_USER_EMAIL=enterprise_learner@example.com`

  `CYPRESS_LMS_USER_PASSWORD=edx`

  `CYPRESS_ADMIN_USER_EMAIL=enterprise_admin@example.com`

  `CYPRESS_ADMIN_USER_PASSWORD=edx`


  The following environment vars are required for using google api to read gmail inbox

  `CYPRESS_GMAIL_ID`

  `CYPRESS_GMAIL_CLIENT_ID`

  `CYPRESS_GMAIL_CLIENT_SECRET`

  `CYPRESS_GMAIL_ACCESS_TOKEN`

  `CYPRESS_GMAIL_REFRESH_TOKEN`

  Note: You can use the method described in the below link to get these auth tokens for any personal gmail account

  https://developers.google.com/identity/protocols/OAuth2WebServer#creatingcred>

===========================
Setup and Run Tests locally
===========================

You need to have Node.js and a n installed before using Cypress. 

From the repository root folder:

`npm install`

To run admin portal tests in interactive mode use following command

`npm run cy:open_admin_portal`

To run admin portal tests in normal mode use following command

`npm run cy:run_admin_portal`

======================================================
Setup and Run Tests in Normal mode via Docker
======================================================

Docker setup is also available for those who want to run the tests without installing 
node locally:

1. Provide the values for environment variables in the env_vars.env
2. Use following command in terminal:

  `docker-compose -f docker-compose.yml -f cy-run.yml up` 


====================================================
Setup and Run Tests in Interactive Mode via Docker
====================================================

Executing tests in interactive mode from Docker requires the following extra steps:

1. As a pre-requisite you need to install XQuartz on your host machine. If you are on a Mac, you can use brew. XQuartz is also installable from <https://www.xquartz.org/>

  `brew cask install xquartz`

2. Once installed, open XQuartz using following command in terminal:

  `open -a XQuartz`

3. In the XQuartz preferences, go to the “Security” tab and make sure you’ve got “Allow connections from network clients” ticked

4. Ensure you have finished the Configuration Setup step by 
providing the values for environment variables in the env_vars.env

5. Locate the IP of your host machine and add it to the allowed X11 hosts by running these commands:

  `IP=$(ipconfig getifaddr en0)`
  
  `/usr/X11/bin/xhost + $IP`

6. Pass the environment variable DISPLAY to show Cypress GUI on the host system by running the following command:

  `DISPLAY=$IP:0`

6. Bring up your docker container:

  `docker-compose -f docker-compose.yml -f cy-open.yml up`

=============
Using ES LInt
=============

ESLint is also setup in the repo, you can use it by typing following command in terminal

`npm run lint`

