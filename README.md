# Course Selling App (Backend Only)

## Introduction

The Course Selling App is a backend application designed to manage a platform for selling courses, similar to platforms like Udemy. This application allows Admins to create and manage courses, while Users can browse, purchase, and view the courses they've bought. This backend-only application uses MongoDB for data persistence and is built with Node.js and Express.

## Techniques Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, enabling server-side scripting and handling asynchronous operations efficiently.
- **Express.js**: A minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications, including routing and middleware.
- **MongoDB**: A NoSQL database that stores data in a flexible, JSON-like format, allowing for scalable and efficient data management.
- **Middleware**: Used for handling request and response cycles, including authentication checks by sending credentials in request headers.

This project focuses on creating a secure and scalable backend system that handles various user roles and manages course data effectively.
## Features

### Admin
- **Sign Up**: Admins can create an account to manage courses.
- **Create Courses**: Admins can create new courses with a title, description, price, and image link.
- **View All Courses**: Admins can view a list of all created courses.

### User
- **Sign Up**: Users can create an account to browse and purchase courses.
- **View Courses**: Users can view all available courses.
- **Purchase Courses**: Users can purchase courses by specifying the course ID.
- **View Purchased Courses**: Users can view a list of all the courses they have purchased.
