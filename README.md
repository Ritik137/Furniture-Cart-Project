# 🪑 Furniture E-Commerce Project (Full Documentation)

## 📌 Project Overview

This is a **full-stack furniture e-commerce web application** built using modern technologies and microservices architecture.
It allows users to browse products, add items to cart, and manage purchases, while admins can manage products and banners.

---

# 🧱 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Context API (State management)
* Framer Motion (Animations)

## Backend (Microservices)

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Cloudinary (Image upload)

## Architecture

* Microservices-based architecture:

  * auth-service
  * product-service
  * banner-service
  * order-service
  * user-service
  * upload-service

---

# 🔐 Authentication System

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

* JWT Authentication
* Role-based access
* Image upload system
* Microservices communication
* Persistent cart
* Dynamic UI rendering

---

# 🎯 Interview Explanation (IMPORTANT)

## Short Pitch:

"I built a full-stack furniture e-commerce application using React and Node.js with a microservices architecture. It includes JWT authentication, role-based access, Cloudinary image upload, and a persistent cart system."

---

## Advanced Points:

* Implemented RBAC for admin control
* Used microservices for scalability
* Integrated third-party cloud storage
* Built dynamic UI with animations

---

# 🚀 Future Improvements

* Payment gateway (Razorpay/Stripe)
* Order management system
* Wishlist feature
* Reviews & ratings
* Banner slider (carousel)
* API Gateway

---

# 🧠 Key Learning

* Full-stack development
* API design
* Microservices architecture
* Authentication & security
* State management

---

# 🔥 Conclusion

This project demonstrates real-world application development with scalable architecture, modern UI, and production-level features.

---
