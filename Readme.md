# 🏥 Medical Document Portal

A simple full-stack application where users can upload, view, download, and delete their medical PDF
documents. Built using **React + TypeScript (Vite)** on the frontend and **Node.js + Express + SQLite**
on the backend.

---

## 🚀 Features

- Upload PDF documents  
- View uploaded documents  
- Download files  
- Delete documents  
- Toast notifications  
- Clean modular backend structure  

---

## 🛠 Tech Stack

### **Frontend**
- React  
- TypeScript  
- Vite  
- Axios  
- React Toastify  

### **Backend**
- Node.js  
- Express  
- Multer  
- SQLite  

---
```
## 📁 Project Folder Structure

project/
├── frontend/ # React + TypeScript frontend
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # Handles requests & responses
│ │ ├── routes/ # API endpoint definitions
│ │ ├── services/ # Business logic
│ │ ├── models/ # Database queries
│ │ ├── middlewares/ # Multer upload, validation, etc.
│ │ ├── config/ # DB config, environment setup
│ │ ├── app.js # Express app configuration
│ │ └── server.js # Server entry point
│ │
│ ├── uploads/ # Stored PDF files
│ └── documents.sqlite # SQLite database file
│
├── design.md # Architecture & assignment answers
└── README.md # Project documentation
```




## ⚙️ Installation & Setup

### **Backend Setup**

cd backend
npm install
npm start

Backend runs on:

👉 http://localhost:4000

---

### **Frontend Setup**

cd frontend
npm install
npm run dev
