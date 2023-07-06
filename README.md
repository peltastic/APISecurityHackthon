# API Security Hackathon Project
This repo contains code for the #APISecurityHackathon organised by treblle. The details for the hack can be accessed here [https://blog.treblle.com/api-security-hackathon/](https://blog.treblle.com/api-security-hackathon/)

# Project Description
InvoicePlus is an application that enables freelancers to create, send and receive invoices to/from their clients. This will be solving the biggest problem of the freelancing world by making it easier for freelancers to easily send invoices to their clients and have a record of them stored automatically in the database. Subsequently, InvoicePlus will enable the sending of invoices to clients through mails and also enable the automation of payments using paystack API

## Features
1. Secure File Protection: invoicePlus implements robust encryption to safeguard the invoice files, ensuring only authorized users can access them with a unique password.
2. Effortless Invoice Management: Easily upload and manage your invoices using the intuitive interface provided by invoicePlus. The platform handles the necessary security measures and storage of your invoice data.
3. Google Authentication: Securely log in to invoicePlus using your Google account, leveraging the robust authentication mechanisms provided by Google Auth to enhance user security and convenience.
4. Two-Factor Authentication (2FA): Strengthen the security of your invoicePlus account with an additional layer of protection through two-factor authentication. Users can enable 2FA using methods like SMS verification codes or authenticator apps.
5. Automated Password Generation: invoicePlus automatically generates strong and secure passwords for each uploaded invoice, enhancing data protection and minimizing the risk of unauthorized access.
6. Advanced Search and Filtering: Find specific invoices quickly using advanced search and filtering options provided by invoicePlus, making it easy to locate and retrieve relevant invoice records.
7. 
### User Authentication:

* Sign up new users.
* Log in existing users.
* Generate and validate OTP for authentication.
* Disable OTP for authentication.

### Client Management:

* Create new clients.
* Get a list of all clients.
* Get a specific client by ID.
* Update a specific client by ID.
* Delete a specific client by ID.
  
### Google Authentication:

* Initiate Google authentication.
* Handle successful Google authentication.

### Invoice Management:

* Create new invoices.
* Get a list of all invoices.
* Get a specific invoice by ID.
* Update a specific invoice by ID.
* Delete a specific invoice by ID.

# Getting Started
## Prerequisites
Make sure you have the following installed on your machine:
* Node.js (version >= 14.20.1)
* Yarn (optional, but recommended)

# Installation
Please follow these steps to get the project running on your local computer

1. Clone the repository:
   ```git clone https://github.com/your-repo/api-security-hackathon.git```
2. cd to project directory
    ```cd api-security-hackathon```
3. install dependencies
```yarn install``

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

* Get /auth/google: Initiate Google authentication.
* Get /auth/google/redirect: Handle successful Google authentication.

 
Invoice Routes

* POST /invoice/create-invoice: Create a new invoice.
* GET /invoice/all: Get all invoices.
* GET /invoice/client/:id: Get a specific invoice by ID.
* DELETE /invoice/client/:id: Delete a specific invoice by ID.
* PUT /invoice/client/:id: Update a specific invoice by ID.

User Routes

* POST /users/login-user: Login a user.
* POST /users/create-user: Create a new user.

# Documentation
The project is hosted treblle [treblle](https://www.treblle.com/)
Treblle is a library that provides monitoring and analytics for applications. It offers features such as performance monitoring, error tracking, request tracing, auto-documentation generation and log aggregation. With Treblle, you can gain insights into the health and performance of your application, identify and debug issues, and track user activity. Please feel free to access it here [https://app.treblle.com/projects/6d66e3cf-048b-43ed-9a99-bf774f37ea20/documentation](https://app.treblle.com/projects/6d66e3cf-048b-43ed-9a99-bf774f37ea20/documentation)

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.


License
This project is licensed under the MIT License.

