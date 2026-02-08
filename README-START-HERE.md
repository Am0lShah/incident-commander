# 🚀 Incident Commander - Start Here

## Overview
This is a production-ready **Multilingual Incident Command Center** that enables operations teams to manage incidents in English, Spanish, Hindi, Japanese, and Portuguese.

## 🛠️ Tech Stack
- **Frontend:** React + Vite + Tailwind CSS (Shadcn UI Theme)
- **Backend:** Supabase (Database + Realtime)
- **Localization:** i18next + Lingo.dev

## ⚡ Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. **Database Setup**
   Run the SQL in `src/lib/schema.sql` in your Supabase SQL Editor.

4. **Start Development**
   ```bash
   npm run dev
   ```

## 🌍 Localization Workflow
Translations are managed by Lingo.dev.
1. Run `lingo init` to setup.
2. Run `lingo build` to generate translations.
