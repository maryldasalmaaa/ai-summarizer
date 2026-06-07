ITESG-Marylda Salma Wajendra Dewi-Technical Test

Link Vercel : https://ai-summarizer-gamma-ebon.vercel.app/

# 🧠 AI Text Summarizer

A simple fullstack web application that uses AI to summarize long text into concise and meaningful summaries. The results are stored in a MySQL database for history tracking.

# 🚀 Features

- Input long text
- AI-powered summarization using Gemini API
- Store original text and summary into MySQL database
- Simple and responsive UI
- REST API using Next.js Route Handler

# 🛠 Tech Stack
Frontend :
- Next.js (App Router)
- Tailwind CSS

Backend : 
- Next.js API Routes
- Google Gemini AI

Database :
- MySQL (Railway)

# 📦 Installation
1. Clone repository
   ```bash
   git clone https://github.com/your-username/ai_summarizer.git
   cd ai_summarizer
2. Install dependencies

   npm install
4. Setup environment variables

   Create a .env file in the root project:

   GEMINI_API_KEY=your_gemini_api_key

   DATABASE_URL=mysql://user:password@host:port/railway
6. Run the project

   npm run dev

   Open http://localhost:3000

# Database
Table : Summary
| Field        | Type      |
| ------------ | --------- |
| id           | INT (PK)  |
| originalText | LONGTEXT  |
| summary      | LONGTEXT  |
| createdAt    | TIMESTAMP |
