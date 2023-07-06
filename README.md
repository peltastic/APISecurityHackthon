# API Security Hackathon Project
This repo contains code for the #APISecurityHackathon organised by treblle. The details for the hack can be accessed here [https://blog.treblle.com/api-security-hackathon/](https://blog.treblle.com/api-security-hackathon/)
This project focuses on building an API called InvoicePlus. InvoicePlus helps users to create, send and receive invoices to their clients.

# Getting Started
## Prerequisites
Make sure you have the following installed on your machine:

# Installation
Please follow these steps to get the project running on your local computer
1. Clone the repository:
   ```git clone https://github.com/your-repo/api-security-hackathon.git```
2. Install the dependencies:
    ```cd api-security-hackathon
      yarn install```

## Configuration
* Create a .env file in the root directory of the project.
* Copy the variables in the example.env file
* Paste them into the .env file and add their necessary values

# Usage
To start the application in development mode, run the following command:
``yarn run dev``
This will start the server using nodemon to watch for file changes and automatically restart the server when changes are detected.

By default, the server will be accessible at http://localhost:3000.

## API Endpoints
The API provides the following endpoints:

* Auth Routes

* POST /auth/otp/generate: Generate OTP for authentication.
* POST /auth/otp/verify: Verify OTP for authentication.
* POST /auth/otp/validate: Validate OTP for authentication.
* POST /auth/otp/disable: Disable OTP for authentication.
  
Clients Routes

* POST /clients/create-client: Create a new client.
* GET /clients/all: Get all clients.
* GET /clients/client/:id: Get a specific client by ID.
* DELETE /clients/client/:id: Delete a specific client by ID.
* PUT /clients/client/:id: Update a specific client by ID.

  
Google Auth Routes

*POST /auth/google: Initiate Google authentication.
* POST /auth/google/redirect: Handle successful Google authentication.
Invoice Routes

POST /invoice/create-invoice: Create a new invoice.
GET /invoice/all: Get all invoices.
GET /invoice/client/:id: Get a specific invoice by ID.
DELETE /invoice/client/:id: Delete a specific invoice by ID.
PUT /invoice/client/:id: Update a specific invoice by ID.
User Routes

POST /users/login-user: Login a user.
POST /users/create-user: Create a new user.

Node.js (version >= 14.20.1)
Yarn (optional, but recommended)



## Features

- Users can create Accounts and Login
- Users can create clients and create/send invoices to them
- Reminders to clients about pending and overdue payments





## Install Locally

Install APISecurityHackthon with npm/yarn

```bash
  //Navigate to project:
  cd APISecurityHackthon
  //Install Project Dependencies:
  yarn install or npm install
  // start project server locally:
  yarn run dev or npm run dev
```
    
