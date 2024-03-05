
`# Auto Parts POS System

This project is a Point of Sale (POS) system. The system allows users to manage inventory, track sales, and perform various other tasks related to running a business in the auto parts industry.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

`git@github.com:kevin-wairi/sparespos.git` 

2. Open file

    `cd auto-parts-pos`

3.  Install the required dependencies:

bashCopy code

`npm install` 

## Usage

To run the application locally, use the following command:

bashCopy code

`npm start` 

This will start the development server, and you can access the application at `http://localhost:3000` in your web browser.


Also to run the JSON-server, first install requires dependency

`npm install -g json-server`

To start the server run


`json-server --watch db.json
`

## Features

The POS system includes the following features:

-   View remaining stock
-   Search for stock using type, description, car make, car model, or year
-   Record and issue receipts for stock purchases
-   Request discounts on specific items and sell them below marked price
-   Accept payment against a specific invoice
-   View commission made
-   Add goods to the shop inventory
-   Specify market price and buying price for goods/items
-   Manage goods in transit
-   Approve discount requests
-   View buying price for a given commodity
-   Record purchases and issue invoices
-   Accept returned goods and issue credit notes
-   Break the bulk of an item and track its history
-   Add and manage users with specific roles and permissions
-   View sales, invoices, credit notes, and payments on a daily, weekly, and monthly basis
-   View money owed to and by the business from credit-worthy customers
-   View the financial standing of the business

## Dependencies

The project relies on the following npm packages:

-   `react-router-dom`: For handling routing in the React application.
-   `bootstrap`: For styling and UI components.
-   `jsonwebtoken`: For working with JSON Web Tokens for user authentication.
-   `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`: For using Font Awesome icons.
-   `react-hot-toast`: For displaying toast notifications.

## Contributing

Contributions to the project are welcome. Please follow the [contribution guidelines](https://chat.openai.com/c/CONTRIBUTING.md) for details.

## License

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).