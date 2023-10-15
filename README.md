# RESTful API with TypeScript and Express.js

The following project implements a RESTful API that allows CRUD (Create, Read, Update, Delete) operations on a set of users and messages stored in a database. It also takes into account some best practices for a production-ready solution.

## Technologies used

- **Node.js:** The runtime environment that allows JavaScript to be executed on the server side.
- **TypeScript:** A superset of JavaScript, providing static typing and object-oriented capabilities, enhancing code quality and understandability.
- **Express.js:** A minimalist web framework for Node.js, designed for building web applications and APIs. It simplifies the server creation process that is already available in Node. In this project, Express.js facilitates the routing, handling HTTP requests, and crafting responses.
- **PostgreSQL:** A powerful, open-source relational database system used for data persistence in this application.
- **Docker:** A platform used to develop, ship, and run applications inside containers. In this project, Docker helps to ensure that the application runs the same way in every environment by encapsulating it and its dependencies into a container. Additionally, with Docker Compose, it allows for defining and running multi-container Docker applications, making it simpler to manage both the express server and the database locally.
- **Drizzle ORM:** An ORM (Object Relational Mapper) designed specifically for TypeScript. It provides a way to interact with the PostgreSQL database using TypeScript classes and objects. With Drizzle ORM, the developer can focus on the business logic while the ORM handles the data persistence, relations, and transactions, ensuring type-safety and reducing boilerplate code.

## Getting started

### Prerequisites

- Node.js (16.x or higher)
- A modern web browser
- Docker

After ensuring the prerequisites are met, follow these steps to set up and run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/cmayoracurzio/rest-api-express.git
   cd rest-api-express
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server using Docker**:

   ```bash
   docker-compose up --build
   ```

   Open your browser and navigate to `http://localhost:3000/users` to see the application in action.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
