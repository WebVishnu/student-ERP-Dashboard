# Student ERP Dashboard

A modern and comprehensive Student Enterprise Resource Planning (ERP) system built with Next.js 14, featuring a responsive design, real-time analytics, and AI-powered assistance.

## Features

- 📊 **Interactive Dashboard**
  - Real-time analytics and statistics
  - Student performance metrics
  - Fee collection insights
  - Attendance tracking visualization

- 👥 **User Management**
  - Student profiles and records
  - Teacher management
  - Class and section organization
  - Role-based access control

- 🎓 **Academic Tools**
  - Class scheduling
  - Attendance tracking
  - Fee management
  - Report generation
  - Academic performance tracking

- 🔍 **Smart Search**
  - Global search functionality
  - Context-aware suggestions
  - Quick navigation
  - Advanced filtering

- 🤖 **AI Assistant Integration**
  - Smart recommendations
  - Automated responses
  - Predictive analytics
  - Learning pattern analysis

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Context API
- **Icons**: [Lucide Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/WebVishnu/student-ERP-Dashboard.git
   cd student-ERP-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```plaintext
/app                    # Next.js app directory
  ├── layout.tsx       # Root layout
  ├── page.tsx         # Dashboard page
  ├── students/        # Student management
  ├── teachers/        # Teacher management
  ├── classes/         # Class management
  ├── attendance/      # Attendance tracking
  ├── fees/           # Fee management
  └── ai-assistant/    # AI features

/components
  ├── ui/             # UI components
  └── app-sidebar.tsx # Main sidebar

/hooks                # Custom React hooks
/lib                  # Utility functions
```

## Key Features Breakdown

### Dashboard Analytics
- Total student count with trends
- Faculty member statistics
- Attendance rate tracking
- Fee collection insights
- Recent activity feed

### Student Management
- Student profile management
- Academic performance tracking
- Attendance records
- Fee payment history

### Teacher Portal
- Class management
- Attendance tracking
- Performance reporting
- Resource allocation

### Smart Search
- Global search functionality
- Context-aware suggestions
- Quick actions
- Advanced filtering

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Vercel](https://vercel.com/) - Deployment Platform
