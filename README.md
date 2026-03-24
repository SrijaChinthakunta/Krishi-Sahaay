# 🌾 Krishi Sahaay

AI-powered mobile application to assist farmers with crop disease detection, smart recommendations, and government schemes.

---

## 🚀 Features

- 🤖 **AI Chat Assistant**
  - Ask farming-related questions
  - Supports **English, Telugu, Hindi**

- 🌿 **Crop Disease Detection**
  - Upload image or capture using camera
  - Get:
    - Disease name
    - Treatment
    - Organic solutions

- 📸 **Real-time Camera Integration**
  - Capture crop images directly from phone

- 🏛 **Government Schemes**
  - Information about farmer support schemes

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Capacitor (Android App)

### Backend
- FastAPI
- Groq API (LLM)
- TensorFlow (ML Model)

---

## 📱 Mobile App

- Built using Capacitor
- Runs on Android devices
- APK available for installation

---

## 🌐 Live Backend

https://krishi-backend-bx6e.onrender.com

---

## 📂 Project Structure

```
Krishi-Sahaay/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── model/
│   └── main.py
│
├── frontend/
│   └── krishi-frontend/
│       ├── src/
│       ├── public/
│       └── package.json
```

---

## ⚙️ Setup Instructions

### Backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

---

### Build Android App

```
npm run build
npx cap sync
npx cap open android
```

---

## 🔐 Environment Variables

```
GROQ_API_KEY=your_api_key
```

---

## 🎯 Future Enhancements

- 🎤 Voice input support
- 🌦 Weather integration
- 📊 Crop analytics dashboard
- 🌍 Multi-language expansion

---

## 👩‍💻 Author

**Srija Chinthakunta**

- LinkedIn: https://www.linkedin.com/in/srija-chinthakunta-932ba3317  
- GitHub: https://github.com/SrijaChinthakunta  
- Email: siri240807@gmail.com  

---

## 💚 Vision

To empower farmers with AI-driven tools for better decision-making and sustainable agriculture.
