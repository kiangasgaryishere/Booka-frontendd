# 📚 Booka Frontend

> An intelligent web application designed to make learning from non-fiction books an engaging, personalized, and lasting experience.

## 🚀 Features

- **Persian RTL Support** - Complete right-to-left layout with Persian typography
- **Passwordless Authentication** - Google OAuth and OTP-based authentication
- **Interactive Onboarding** - Comprehensive user journey with Dana mascot
- **Mobile-First Design** - Responsive design starting at 375px base width
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Eye-Friendly Design** - Soft color palette to reduce eye strain
- **8px Grid System** - Consistent spacing throughout the application

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development
- **Tailwind CSS** with RTL support
- **Framer Motion** for animations
- **React Router DOM** for navigation
- **Zod** for validation

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── mascot/         # Dana mascot component
│   └── magicui/        # Special effect components
├── features/           # Feature-based architecture
│   ├── authentication/ # Authentication & onboarding
│   ├── dashboard/      # Dashboard pages
│   ├── library/        # Library pages
│   ├── group/          # Group pages
│   ├── settings/       # Settings pages
│   ├── profile/        # Profile pages
│   └── core/           # Core app pages (loading, etc.)
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kiangasgaryishere/Booka-frontend.git
cd Booka-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Design System

- **Primary Color**: #6E61FF (Purple)
- **Typography**: IRANSansX (Persian) + Nunito (English)
- **Grid System**: 8px base unit
- **Breakpoints**: Mobile-first responsive design

## 🔐 Authentication Flow

1. **Google Users**: OAuth → Onboarding → Success
2. **Regular Users**: Email/Phone → OTP → Onboarding → Success

## 📱 Pages

- Welcome & Authentication
- Life Improvement Goals
- Daily Reading Time
- Name & Age Input
- Platform Discovery
- Success Celebration

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 🚀 Deployment

Build the application:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📄 License

This project is experimental and part of the Booka application development.

---

**Note**: This is an experimental frontend for the Booka application, designed to transform passive reading into active learning through AI-driven summaries, adaptive quizzes, and gamification.
