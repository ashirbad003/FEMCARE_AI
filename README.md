# 🌸 FEMCARE AI

<div align="center">

### AI-Powered Women's Healthcare Platform

An intelligent healthcare platform designed to empower women's wellness through AI-driven symptom analysis, menstrual cycle tracking, secure patient management, and personalized healthcare insights.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

</div>

---

# 📖 Overview

**FEMCARE AI** is a modern full-stack healthcare platform built to improve women's health through Artificial Intelligence.

The application combines AI-powered health assistance with secure patient management, symptom analysis, and menstrual cycle tracking to provide an intelligent and user-friendly healthcare experience.

The project follows a scalable client-server architecture using **React**, **FastAPI**, and **SQLite**.

---

# ✨ Features

- 🤖 AI Healthcare Chatbot
- 🩺 Symptom Analysis
- 📅 Menstrual Cycle Tracking
- 📊 Personalized Health Insights
- 🔐 Secure User Authentication
- 👩 Patient Dashboard
- ⚡ RESTful API
- 💾 SQLite Database
- 🐳 Docker Support
- 📈 Scalable Backend Architecture

---

# 🏗️ System Architecture

```
                 React Frontend
                        │
                        ▼
                 FastAPI Backend
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
 Authentication     AI Services     Health APIs
      │                 │                 │
      └─────────────────┼─────────────────┘
                        │
                        ▼
                 SQLite Database
```

---

# 📂 Project Structure

```
FEMCARE_AI
│
├── Backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── database.py
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── main.py
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 💻 Technology Stack

## Frontend

- React.js
- Vite
- Axios
- HTML5
- CSS3

## Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

## Database

- SQLite

## DevOps

- Docker
- Git
- GitHub

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ashirbad003/FEMCARE_AI.git
cd FEMCARE_AI
```

---

## Backend Setup

```bash
cd Backend

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Home |
| POST | `/login` | User Login |
| POST | `/register` | User Registration |
| POST | `/symptom-analysis` | AI Symptom Analysis |
| POST | `/cycle-predict` | Menstrual Cycle Prediction |
| GET | `/health` | Health Check |

---

# 📸 Screenshots

## Dashboard

> Add Dashboard Screenshot

---

## AI Healthcare Chat

> Add AI Chat Screenshot

---

## Cycle Tracker

> Add Cycle Tracker Screenshot

---

## Login Page

> Add Login Screenshot

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Environment Variables
- API Validation
- Secure Database Access

---

# 📈 Future Enhancements

- AI Disease Prediction
- Voice-Based Healthcare Assistant
- OCR Prescription Scanner
- Cloud Database Integration
- Doctor Appointment Booking
- Medical Report Analysis
- Push Notifications
- Mobile Application
- Multi-language Support
- Analytics Dashboard

---

# 👨‍💻 Developer

## Ashirbad Pattnaik

**B.Tech – Computer Science & Technology**

### Connect with me

- GitHub: https://github.com/ashirbad003
- LinkedIn: *Add Your LinkedIn Profile*

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Your support helps improve the project and motivates future development.

---

<div align="center">

### 🌸 Empowering Women's Healthcare Through Artificial Intelligence

Made with ❤️ by **Ashirbad Pattnaik**

</div>
