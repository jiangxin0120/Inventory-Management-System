# Inventory Management API

## Overview

This is an Inventory Management API built with ASP.NET Core, DynamoDB, and AutoMapper. The API manages products, categories, and users for an inventory system, allowing for CRUD operations. It integrates with AWS DynamoDB for data storage and supports standard RESTful endpoints for interacting with resources like products, categories, and users.

---

## Features

- **Product Management**: Create, Read, Update, Delete (CRUD) products.
- **Category Management**: Manage product categories.
- **User Management**: Manage users with authentication capabilities.
- **Partial Update with JSON Patch**: Ability to partially update resources.
- **Swagger UI**: Integrated API documentation for testing endpoints.
- **DynamoDB**: AWS DynamoDB for fast, scalable NoSQL data storage.

---

## Technologies Used

- **ASP.NET Core 6.0**: The framework used to build the API.
- **AutoMapper**: Used for object-to-object mapping between Models and DTOs.
- **AWS DynamoDB**: NoSQL database service for storing product, category, and user data.
- **Amazon DynamoDB SDK**: For interacting with DynamoDB in the application.
- **JSON Patch**: Allows for partial updates on resources.
- **Swagger UI**: For easy API testing and documentation.

---

## Setup Instructions

### Prerequisites

- **.NET SDK 6.0** or higher
- **AWS Account** with DynamoDB configured
- **AWS CLI** configured on your local machine (optional but recommended for testing DynamoDB)
- **Postman** or any HTTP client to test the API (or Swagger UI for testing directly in the browser)

### Installation Steps

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/inventory-management-api.git
   cd inventory-management-api
