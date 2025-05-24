# AI Copilot Chat Support App

A sleek, desktop-only customer support chat application built with ReactJS and Tailwind CSS, featuring an AI Copilot panel. Designed to replicate a professional inbox and conversation interface like modern CRM or helpdesk platforms.

- 🔗 Live Demo: https://nihhhhhhhhhhh.github.io/customer-support-app/
- 👨‍💻 Author: Nihal Gavandi.

---

## 🚀 Features

- 📨 **Inbox View** for managing multiple customer conversations.
- 💬 **Conversation Panel** to view and respond to customer queries.
- 🤖 **AI Copilot Sidebar** to get AI-suggested replies based on conversation context.
- 📋 **Quick Actions** panel for frequent operations.
- 🔍 **Details View** for viewing customer/conversation info.
- ✅ **Typing Indicator**, **Message List**, and **Input Field**.
- 📚 Modular component structure and clean state management.

---

## 🧩 Tech Stack

- **Frontend:** React.js (Vite or CRA)
- **Styling:** Tailwind CSS
- **State Management:** Local state (via hooks)
- **AI & Data:** Mock data (`mockData.js`) and AI service stub (`aiService.js`)

---

## 📁 Project Structure

```bash
src/
├── assets/                # Images, icons, etc.
├── components/            # Reusable UI Components
│   ├── AICopilot.jsx
│   ├── ConversationList.jsx
│   ├── ConversationView.jsx
│   ├── MessageInput.jsx
│   ├── ...
├── data/
│   └── mockData.js        # Sample mock messages
├── hooks/                 # Custom hooks for logic separation
│   ├── useAIService.js
│   ├── useAppState.js
│   └── useChatMessages.js
├── services/
│   └── aiService.js       # AI assistant logic (stubbed)
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## 🛠️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/your-username/ai-copilot-chat-app.git
cd ai-copilot-chat-app
```

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

---

📏 Responsiveness

- ✅ Responsive for desktop viewports (≥1024px)
- ❌ Not optimized for mobile or tablet screens


---

🧪 Future Enhancements

 - Mobile responsiveness
 - Backend integration with real-time data
 - Authentication and user roles
 - Drag-and-drop chat assignment
 - Enhanced AI suggestions with OpenAI API

---





