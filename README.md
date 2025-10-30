
# 🌸 Bloomly – AI-Powered PCOS Detection & Wellness Platform  

> **Your Personalized Health Companion for Early PCOS Detection & Wellness Tracking**

Bloomly is an intelligent, user-friendly web platform designed to empower women by predicting the likelihood of **Polycystic Ovary Syndrome (PCOS)** using machine learning — while also providing personalized wellness recommendations.  
Built with a **React frontend** and a **Flask + MySQL backend**, Bloomly combines **AI-powered insights**, **secure authentication**, and a **beautiful user experience**.  

---
### Home Page, Detection Page
https://github.com/user-attachments/assets/c130d4b9-d745-4a34-99fa-e6bdc2e8d808

### Diet Page, Tracking Page
https://github.com/user-attachments/assets/ea143d8c-b1db-40ff-a416-42b5134b793d

### Wellness Page, Login & Sign up Pages
https://github.com/user-attachments/assets/4b80571e-19ea-4ccf-976c-9ff6c74dc44d

---

## ✨ Features

### 🧠 Smart PCOS Prediction
- Predicts PCOS risk using a trained **XGBoost model** based on user health inputs.  
- Delivers accurate and explainable results instantly.

### 💖 Personalized User Dashboard
- Welcomes users dynamically (e.g., *“Welcome back, Vaishu!”* 🌸).  
- Displays tailored insights, health stats, and detection results.

### 🔐 Secure Authentication
- Fully functional **Login** and **Registration** system with JWT authentication.  
- Credentials stored securely using **Flask + MySQL**.  
- Environment variables managed safely via `.env`.

### 🌈 Modern UI/UX
- Responsive and elegant design with **Tailwind CSS** and **Framer Motion** animations.  
- **SweetAlert2 modals** for interactive success/error alerts.  
- Soft pastel theme inspired by wellness & self-care aesthetics.

### 🌿 Wellness Integration
- Sections for **Diet**, **Tracking**, and **Wellness** to help users monitor lifestyle choices.  
- Designed for holistic well-being and awareness.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- **React.js**  
- **TypeScript**  
- **Tailwind CSS**  
- **Framer Motion**  
- **SweetAlert2**  
- **Axios**

### ⚙️ Backend
- **Flask (Python)**  
- **Flask-CORS**, **Flask-JWT-Extended**  
- **MySQL** (via `mysql.connector`)  
- **dotenv** for environment variables  
- **XGBoost** for ML prediction model  

### 🧩 Tools & Version Control
- **Git & GitHub**  
- **Figma** (UI Design)  
- **Postman** (API Testing)  

---

## ⚗️ Machine Learning Model

- Model trained using health datasets with features such as BMI, insulin level, and hormonal ratios.  
- Utilized **XGBoost** for high accuracy and explainability.  
- Serialized model using `pickle` → `pcos_model_v3.pkl` for fast Flask integration.

---

## 🚀 Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/bloomly-pcos-detector.git
cd bloomly-pcos-detector
```

```bash
cd backend
python app.py
```

```bash 
cd Frontend 
npm install
npm run dev
```

### 👩‍💻 Author
Vaishnavi U.B.
💌 Empowering women through technology and AI-driven wellness.

📫 Connect on [LinkedIn 🌐](https://linkedin.com/in/vaishnavi-ub) • [GitHub 🧠](https://github.com/vaishnavi-ub)



⭐ If you like this project, give it a star and share positivity! 🌷
“Your wellness journey begins with awareness — and Bloomly is here to guide you.” 🌼

