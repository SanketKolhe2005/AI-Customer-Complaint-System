# AI-Powered Customer Complaint Management System

## Overview

The AI-Powered Customer Complaint Management System is a web application designed to automate customer complaint handling in the pharmaceutical manufacturing industry. It leverages Artificial Intelligence to analyse customer complaints, extract important information, assess complaint risk, identify possible root causes, and recommend Corrective and Preventive Actions (CAPA).

The application follows a modular AI workflow using LangGraph and Large Language Models (LLMs), helping Quality Assurance (QA) teams process complaints faster and more consistently.

---

## Features

- AI-powered complaint analysis
- Automatic complaint information extraction
- AI-generated complaint summary
- Risk classification (High, Medium, Low)
- Root cause recommendation
- CAPA (Corrective and Preventive Action) recommendation
- Duplicate complaint detection
- Complaint status management
- Dashboard analytics
- Complaint history search
- Export reports to Excel and PDF
- Responsive user interface

---

## Technology Stack

### Frontend

- React.js
- Redux
- Tailwind CSS
- Axios
- Recharts

### Backend

- Python
- FastAPI
- SQLAlchemy
- LangGraph

### AI

- Groq API
- Gemma2-9B-IT / Llama-3.3-70B
- Prompt Engineering

### Database

- MySQL (Production)
- SQLite (Development)

---

## System Architecture

```
                User
                  │
                  ▼
          React Frontend
                  │
          REST API Request
                  │
                  ▼
            FastAPI Backend
                  │
                  ▼
          LangGraph Workflow
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
 Information   Risk      Root Cause
 Extraction Assessment Recommendation
                  │
                  ▼
      CAPA Recommendation
                  │
                  ▼
          MySQL / SQLite
                  │
                  ▼
         React Dashboard
```

---

## AI Workflow

The complaint passes through multiple AI agents:

1. Complaint Information Extraction
2. Complaint Summary
3. Risk Assessment
4. Root Cause Recommendation
5. CAPA Recommendation
6. Store Complaint in Database
7. Display Results on Dashboard

---

## Project Structure

```
AI-Customer-Complaint-System/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── database/
│   │   ├── langgraph/
│   │   ├── models/
│   │   ├── services/
│   │   ├── prompts/
│   │   └── utils/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>

cd AI-Customer-Complaint-System
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key

DATABASE_URL=mysql+pymysql://username:password@localhost/customer_complaints
```

For SQLite (Development):

```env
DATABASE_URL=sqlite:///./complaints.db
```

---

## API Endpoints

### Process Complaint

```
POST /process
```

Sample Request

```json
{
  "complaint_text": "Customer reported broken tablets in Batch B123."
}
```

---

### Dashboard

```
GET /dashboard
```

Returns dashboard statistics.

---

### Complaint History

```
GET /dashboard/complaints
```

Returns all saved complaints.

---

### Update Complaint Status

```
PUT /status/{complaint_id}
```

Updates complaint status.

---

## AI Features

- Complaint Information Extraction
- Complaint Summary
- Risk Classification
- Root Cause Recommendation
- CAPA Recommendation
- Duplicate Complaint Detection

---

## Dashboard Features

- Total Complaints
- High Risk Complaints
- Duplicate Complaints
- Today's Complaints
- Complaint History
- Complaint Search
- Risk Distribution Chart
- Complaint Trend Chart
- Export to Excel
- Export to PDF

---

## Sample Workflow

```
User submits complaint
          │
          ▼
React Frontend
          │
          ▼
FastAPI API
          │
          ▼
LangGraph Workflow
          │
          ▼
Extract Complaint Information
          │
          ▼
Generate Summary
          │
          ▼
Risk Classification
          │
          ▼
Root Cause Recommendation
          │
          ▼
CAPA Recommendation
          │
          ▼
Save to Database
          │
          ▼
Display Results on Dashboard
```

---

## Future Enhancements

- JWT Authentication
- OCR for PDF and Email Complaint Processing
- Email Notifications
- Role-Based Access Control (RBAC)
- ERP/QMS Integration
- Cloud Deployment
- Multi-user Support
- Audit Logs

---

## Screenshots

Include screenshots of:

- Dashboard
- Complaint Submission Form
- AI Analysis Results
- Complaint History
- Risk Distribution Chart
- Complaint Trend Chart
- Export Reports

---

## Author

**Sanket Kolhe**

B.Tech Computer Engineering

MIT Academy of Engineering, Pune

---

## Acknowledgements

This project was developed as part of the **AIVOA AI Product Engineer (Intern) Assignment**.

The application demonstrates the use of **React, FastAPI, LangGraph, Groq LLM, and SQL databases** to automate customer complaint analysis for pharmaceutical quality management systems.