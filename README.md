# 🪑 Furniture E-Commerce Project (Full Documentation)

## 📌 Project Overview

This is a **full-stack furniture e-commerce web application** built using modern technologies and microservices architecture.
It allows users to browse products, add items to cart, and manage purchases, while admins can manage products and banners.

---

# 🧱 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Context API (State Management)
- Framer Motion (Animations)

## Backend (Microservices)

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Upload)
- Docker (Containerization)

## Architecture

- Microservices-based architecture:
  - auth-service
  - product-service
  - banner-service
  - order-service
  - user-service
  - upload-service

- **Each microservice is independently containerized using Docker for better portability and scalability.**

---
# 🐳 Docker Containerization

To provide a consistent and isolated runtime environment, all backend microservices have been containerized using Docker.

## Dockerized Services

- auth-service
- product-service
- banner-service
- order-service
- user-service
- upload-service

## Docker Features

- Separate Dockerfile for each service
- Independent service deployment
- Environment variable support using `.env`
- Improved portability and scalability
- Consistent development and production environments
- Ready for orchestration with Docker Compose and Kubernetes

## Container Flow

Source Code → Docker Image → Docker Container → Service Execution

---
# � Authentication System

* JWT-based authentication
* Token stored in localStorage
* Role-based access control (RBAC)

  * Admin → full access
  * User → limited access

## Flow:

Login → Token generate → Store in localStorage → Send in headers

---

# 📦 Product Management

## Features:

* Add product (Admin)
* Update product
* Delete product
* Get all products
* Get single product

## Fields:

* name
* price
* description
* category
* image
* createdBy

## Extra:

* Image upload via Cloudinary
* Multer for file handling

---

# 🛒 Cart System

## Features:

* Add to cart
* Remove from cart
* Persist cart using localStorage

## Logic:

* Each item has unique `cartId`
* Cart stored in Context API
* Synced with localStorage (for refresh persistence)

---

# 🖼️ Banner System (NEW 🔥)

## Features:

* Admin can upload banner
* Banner stored in Cloudinary
* Latest banner shown on homepage

## Fields:

* image
* title
* subtitle

## Flow:

Admin → Upload → Cloudinary → DB → Frontend fetch → Display

---

# 🧠 Microservices Communication

## Auth Validation:

* banner-service calls auth-service
* token verified via API

## Flow:

Frontend → banner-service → auth-service → verify → allow/deny

---

# 🎨 Frontend Features

## Pages:

* Home
* Product Detail
* Cart
* Admin Panel
* Login/Register
* About

## UI Features:

* Animated UI (Framer Motion)
* Responsive design
* Dynamic product cards
* Banner integration

---

# 📄 Product Detail Page

## Features:

* Full product view
* Price formatting
* Stock status
* Add to cart
* Back navigation

---

# ⚙️ Admin Panel

## Features:

* Add product
* Upload image
* Upload banner
* Role-based access

---

# 🚀 API Structure

## Product APIs:

* POST /add
* GET /getall
* GET /get/:id
* PUT /update/:id
* DELETE /delete/:id

## Banner APIs:

* POST /upload
* GET /get

---

# 💾 Database (MongoDB)

## Collections:

* Users
* Products
* Banners

---

# ☁️ Cloudinary Integration

* Image storage in cloud
* Returns secure URL
* Used for:

  * Product images
  * Banner images

---

# 🔄 State Management

* Context API used for:

  * Cart
  * Auth

---

# 🧪 Error Handling

* Try-catch in backend
* API error responses
* Frontend fallback UI (emoji if image fails)

---

# 📈 Real-World Features Implemented

- JWT Authentication
- Role-Based Access Control (RBAC)
- Cloudinary Image Upload System
- Microservices Communication
- Persistent Cart System
- Dynamic UI Rendering
- Docker Containerization
- Environment-Based Configuration
- Modular and Scalable Architecture

---

# 🎯 Advanced Points

- Implemented RBAC for admin control
- Used microservices architecture for scalability
- Integrated third-party cloud storage using Cloudinary
- Built responsive and animated UI with Framer Motion
- Containerized backend services using Docker
- Designed services for independent deployment and scalability

---

# 🚀 Future Improvements

- Docker Compose
- Redis Caching
- RabbitMQ for asynchronous communication
- Payment Gateway (Razorpay / Stripe)
- Order Management System
- Wishlist Feature
- Reviews & Ratings
- Banner Slider (Carousel)
- API Gateway
- Swagger Documentation
- Logging with Winston
- CI/CD Pipeline
- Kubernetes
- AWS Deployment

---

# 🧠 Key Learning

- Full-Stack Development
- REST API Design
- Microservices Architecture
- Authentication & Security
- State Management
- Cloud Storage Integration
- Docker Containerization
- Scalable Backend Design

---

# 🔥 Conclusion

This project demonstrates real-world application development using React, Node.js, Express, and MongoDB with a microservices architecture. It incorporates JWT-based authentication, role-based access control, Cloudinary image management, persistent cart functionality, and Docker containerization, making the application modular, scalable, and production-ready.

---
