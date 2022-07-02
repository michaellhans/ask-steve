# Ask Steve Messenger Bot

## Description
Shadow Bot is the simple messenger bot that can:
1. Ask your first name
2. Ask your birth date (using YYYY-MM-DD format)
3. Ask if you want to know how many days until your next birthday. You can response it with:
  - Positive answer: ["yes", "yeah", "sure", "yup", "why not", "yaaa", "iyes"]
  - Negative answer: ["no", "nah", "nope", "tidak", "no thanks"]

## Getting Started
To test the Facebook Messenger Bot, you can directly jump into this link and have a chit-chat with the bot.
https://www.facebook.com/profile.php?id=100083051795668

Remember to login first before you can chat with the Shadow Bot.

## Run The Application
The application has been deployed in https://ask-steve-shadow.herokuapp.com/

There are an available Postman Collection in this repository that can be used to test the REST API of the application.

## Facebook Messenger Bot Demo
![](demo/Messenger_Demo.gif)
<br>

## REST API Endpoints
| Attribute             | Type Data   |
| --------------------- | ----------- |
| POST /webhook         | Handle incoming messages from Messenger |
| GET /webhook          | Create a connection with Messenger and verify the token Facebook app |
| GET /messages         | Get all messages |
| GET /messages/:id     | Get a message by certain ID |
<br>

## How to Run Locally
1. Install all dependencies and modules that required to run the app
```npm install```
2. Run the application by using this command
```npm start:dev```
3. You can test the REST API with the Postman
<br><br>

## Data Structure
### 1. Users
| Attribute   | Type Data   |
| ----------- | ----------- |
| user        | String      |
| name        | String      |
| birthDate   | Date        |
| state       | Number(0-3) |
<br>

### 2. Messages
| Attribute   | Type Data   |
| ----------- | ----------- |
| id          | String      |
| user        | String      |
| message     | String      |
| timestamp   | Date        |
<br>

## Built With
Tech Stack
* Node.js
* Facebook Webhook
* MongoDB

Library Used
* axios v0.27.2
* express v4.18.1
* body-parser v1.20.0
* mongoose v6.4.2
* dotenv v16.0.1
* lint v0.7.0
* mocha v10.0.0
* chai v4.3.6
* supertest v6.2.4

## Testing
All codes in this repository have already tested with Mocha as the tools for automated testing. There are two kinds of testing that are made in this repository.
1. Functional Testing ==> test every function in the code as the smallest unit can be tested in the application
2. Integration Testing ==> test every routes in the REST API

To run the test script, simply just run this command from the root directory.
```$ npm test```

## Author
Michael Hans