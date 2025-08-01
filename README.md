# Popular Streaming

![alt text](img/home_form_showing.png)

## Project Overview

This is full-stack web application that allows the users to search for tv shows and movies that are streaming across many services. The user can login to save their own watch list and list of previously seen shows. While the user is logged it all of the shows will highlight the ones from their watch list and previously seen lists.

## Tech Overview

3rd Party API that finds information about shows on

- [Streaming Availability](https://www.movieofthenight.com/about/api)

Backend Stack

- [NodeJS](https://nodejs.org/en)
- [ExpressJS](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)

Frontend Stack

- HTML, CSS, Javascript
- [ReactJS](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

## Features

| Requirement                                                                                                                                                                           | Implementation                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Retrieve data from a third-party API**                                                                                                                                              | • Integrated Nutritionix API for food nutrition data<br>• Implemented YouTube API for video metadata                                       |
| **Use a regular expression to validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved).** | • Built a robust Express server with multiple routes<br>• Implemented API endpoints for nutrition and YouTube data                         |
| **Use arrays, objects to store and retrieve information**                                                                                                                             | • Created a comprehensive workout database using JavaScript objects<br>• Organized exercises in categorized arrays (push/pull/legs)        |
| **Persist data to an internal API and make the stored data accessible in your app.**                                                                                                  | • Designed organized exercise cards with clear visual hierarchy<br>• Created macro-calculator with specific results                        |
| **Responsive Design**                                                                                                                                                                 | • Implemented responsive layouts using Flexbox<br>• Created media queries for different screen sizes<br>• Built with mobile-first approach |
| **Create a node.js web server using a modern framework such as Express.js.**                                                                                                          | • Implemented responsive layouts using Flexbox<br>• Created media queries for different screen sizes<br>• Built with mobile-first approach |
| **Interact with a SQLite database to store and retrieve information**                                                                                                                 | • Implemented responsive layouts using Flexbox<br>• Created media queries for different screen sizes<br>• Built with mobile-first approach |
| **Develop your project using a common JavaScript framework such as React, Svelte, or Vue.**                                                                                           | • Implemented responsive layouts using Flexbox<br>• Created media queries for different screen sizes<br>• Built with mobile-first approach |

---

## Setup

1.  **Clone the repo to your desktop using git**

    ```bash

    git clone https://github.com/AnthonyTGarrett/popular_streaming.git
    ```

2.  **Change directory into the cloned folder**

    ```bash
    cd popular_streaming
    ```

3.  **Change directory into the backend folder and install dependencies**

    ```bash
    cd popular_streaming/backend
    npm install
    ```

4.  **Change directory into the frontend folder and install dependencies**
    ```bash
    cd popular_streaming/frontend
    npm install
    ```
5.  **You will need an environment file for the backend to access the API**
    ```bash
    cd popular_streaming/backend
    touch .env
    ```

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3000

To give yourself administrator permissions on the chat, you will have to type `/role [your-name]` in the app console.

---

## License

> You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
