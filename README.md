📱 MyTaxi App

A modern React Native (Expo) mobile application for taxi clients.
Users can request rides, manage profiles, track cashback, and view their order history with real-time updates.

🚀 Features

🚖 Ride booking system
📍 Select pickup & destination using device location
👤 User profile management
💰 Cashback tracking
📜 Order history
🔔 Push notifications (order status updates)
🔐 Login with phone number & PIN
⚡ Global state management using Redux Toolkit

🛠️ Tech Stack

React Native 0.81
Expo 54
React Navigation 7
Redux Toolkit
Expo Notifications
Expo Location
Async Storage

📁 Project Structure
mytaxi-app/
│── assets/
│── src/
│   ├── api/
│   ├── components/
│   ├── screens/
│   ├── redux/
│   ├── hooks/
│   └── utils/
│── App.js
│── package.json
│── README.md

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/username/mytaxi-app.git
cd mytaxi-app

2️⃣ Install dependencies
npm install

3️⃣ Start the app
npm start

Run on Android:
npm run android

Run on iOS:
npm run ios

🔧 Environment Variables

Create a .env file:

API_URL=https://your-api.com
GOOGLE_MAPS_KEY=YOUR_KEY
EXPO_PUBLIC_SOCKET_URL=ws://your-socket-url

📦 Main Dependencies
{
  "@react-navigation/native": "^7.1.22",
  "@react-navigation/native-stack": "^7.8.3",
  "@reduxjs/toolkit": "^2.11.0",
  "expo-location": "~19.0.7",
  "expo-notifications": "~0.32.13",
  "react-redux": "^9.2.0"
}

📸 Screenshots (optional)

Place screenshots inside:

/screenshots
   home.png
   booking.png
   profile.png

🤝 Contributing

Contributions are welcome!
Please follow clean code practices and standard Git workflow.

📄 License

MIT License