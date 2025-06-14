﻿# Next.js Learning Management System

A full-stack Learning Management System built with modern technologies and cloud infrastructure.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful UI components
- **Clerk** - Authentication and user management

### Backend & Infrastructure
- **AWS Lambda** - Serverless functions
- **DynamoDB** - NoSQL database
- **S3** - File storage
- **ECR** - Container registry
- **Docker** - Containerization
- **Node.js** - Runtime environment

## 🏗️ Project Structure

```
├── app/                 # Next.js App Router
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── aws/               # AWS Lambda functions
├── docker/            # Docker configurations
└── docs/              # Project documentation
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker
- AWS CLI (configured)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OfekYosef-D/learning-management-system
cd learning-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

## 📝 Development Progress

This project is being built following a crash course. Progress is tracked through meaningful commits and feature branches.

### 🏗️ Core Features Status
- [x] Project initialization & setup
- [x] Authentication system (Clerk integration)
- [x] Backend API development
- [x] Database setup & seeding
- [x] User sign in/out functionality
- [x] Navigation components
- [x] Non-dashboard navbar
- [x] Course management foundation
- [x] Dashboard architecture
- [x] API route handlers
- [ ] Sidebar navigation *(currently working on)*

### 🎨 UI/UX Components  
- [x] Main navbar component
- [x] Authentication pages
- [x] Dashboard layout structure
- [ ] Sidebar component *(in progress)*
- [ ] Course cards/listings
- [ ] User profile components
- [ ] Mobile responsive design

### ⚙️ Infrastructure & Deployment
- [ ] AWS infrastructure setup *(you have some backend, but full infrastructure pending)*
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Environment configuration
- [ ] Database optimization

### 📚 Learning Management Features
- [x] Course data structure
- [ ] Course enrollment system
- [ ] Progress tracking
- [ ] Video/content delivery
- [ ] Assignments & quizzes
- [ ] User dashboard analytics

## 🔄 Git Workflow

This project follows professional Git practices:
- **Feature branches** for new features
- **Conventional commits** for clear history
- **Pull requests** for code review
- **Semantic versioning** for releases

### Commit Convention
```
<type>: <subject>

Types:
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code restructuring
test: Adding tests
chore: Maintenance
```

## 🚀 Deployment

The application is deployed using:
- **Vercel/AWS** for frontend hosting
- **AWS Lambda** for backend functions
- **Docker** for containerization
- **ECR** for container storage

## 📖 Learning Resources

This project is based on a comprehensive crash course covering:
- Modern React/Next.js patterns
- AWS cloud services integration
- Professional development workflows
- Production deployment strategies

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

## 📄 License

MIT License - see LICENSE file for details
