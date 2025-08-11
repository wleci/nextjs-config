# 🚀 Wleci Next.js Full-Stack Template

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.0.0-purple?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)

A complete full-stack Next.js template with authentication, role-based access control, database integration, and beautiful UI components.

## ✨ Features

### 🎨 Frontend

- **Modern UI** - Built with Tailwind CSS 4 and shadcn/ui
- **Smooth Animations** - Powered by Framer Motion 12.23.12
- **Beautiful Icons** - Lucide React icons 0.539.0
- **Dark Mode** - Built-in theme support
- **Responsive Design** - Mobile-first approach
- **Internationalization** - Multi-language support (English/Polish)

### 🔐 Authentication & Security

- **NextAuth.js v5** - Complete authentication system
- **Role-Based Access Control** - USER, ADMIN, MODERATOR roles
- **Secure Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Middleware-based route protection
- **Custom Cookies** - Branded session management

### 🗄️ Database & Backend

- **Prisma ORM** - Type-safe database operations
- **SQLite Database** - Ready-to-use local database
- **User Management** - Full CRUD operations
- **Database Migrations** - Version-controlled schema changes
- **API Routes** - RESTful API endpoints

### 🛡️ Admin Dashboard

- **User Management** - View, edit, delete users
- **Role Management** - Assign and manage user roles
- **Analytics Dashboard** - User statistics and insights
- **Settings Panel** - Application configuration

### ⚡ Performance & Development

- **Turbopack** - Ultra-fast development server
- **TypeScript** - Full type safety
- **SEO Ready** - Auto-generated sitemap.xml and robots.txt
- **Health Checks** - Application monitoring endpoints

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15.4.6 (App Router)
- **React:** 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui + Custom UI components
- **Animations:** Framer Motion 12.23.12
- **Icons:** Lucide React 0.539.0
- **i18n:** next-intl 4.3.4

### Backend & Database

- **ORM:** Prisma 6.13.0
- **Database:** SQLite (easily configurable for PostgreSQL/MySQL)
- **Authentication:** NextAuth.js 5.0.0-beta.29
- **Password Hashing:** bcryptjs 3.0.2
- **Charts:** Chart.js 4.5.0 + react-chartjs-2 5.3.0

### Development Tools

- **Build Tool:** Turbopack (Next.js)
- **Linting:** ESLint 9
- **Type Checking:** TypeScript 5
- **Database Tools:** Prisma Studio
- **Script Runner:** tsx 4.20.3

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/wleci/nextjs-config.git
   cd wleci-nextjs-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   AUTH_TRUST_HOST="true"

   # Application
   NEXT_PUBLIC_BASE_URL="https://your-domain.com"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Run database migrations
   npx prisma migrate dev --name init

   # Create admin user
   npx tsx scripts/create-admin.ts
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   > **Note:** This project uses Turbopack for faster development

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Default Users

After running the setup, you'll have these default accounts:

### Administrator

- **Email:** `admin@wleci.com`
- **Password:** `admin123`
- **Role:** `ADMIN`
- **Access:** Full dashboard access including user management

### Test User

- **Email:** `user@wleci.com`
- **Password:** `user123`
- **Role:** `USER`
- **Access:** Basic dashboard access (no user management)

## 📦 What's Included

### 🎨 UI Components

- **Dashboard Layout** - Responsive sidebar navigation
- **Authentication Forms** - Login and registration pages
- **User Management** - CRUD interface for user operations
- **Modal System** - Reusable modal components
- **Toast Notifications** - Success/error message system
- **Charts & Analytics** - Data visualization components

### 🔐 Authentication System

- **NextAuth.js Integration** - Complete auth solution
- **Role-Based Access** - USER, ADMIN, MODERATOR roles
- **Protected Routes** - Middleware-based protection
- **Session Management** - Secure session handling
- **Password Security** - bcrypt hashing with salt

### 🗄️ Database Features

- **Prisma ORM** - Type-safe database operations
- **User Model** - Complete user management schema
- **Migrations** - Version-controlled database changes
- **Seeding Scripts** - Automated user creation
- **Database Studio** - Visual database management

### 🛠️ Developer Tools

- **TypeScript** - Full type safety throughout
- **ESLint** - Code quality enforcement
- **Turbopack** - Ultra-fast development builds
- **Hot Reload** - Instant development feedback
- **Database Scripts** - User management utilities

## 🎨 Customization

### Colors & Themes

The template uses Tailwind CSS 4 with the new `@theme` syntax. Customize colors in `src/app/globals.css`:

```css
/* src/app/globals.css */
@theme inline {
  --color-primary: oklch(0.646 0.222 41.116);
  --color-secondary: oklch(0.6 0.118 184.704);
  /* Add your custom colors */
}

:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* Customize theme variables */
}
```

### Animations

Customize Framer Motion animations in `src/app/page.tsx`:

```tsx
const customVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};
```

### SEO Configuration

Update your domain in the SEO route handlers:

```typescript
// src/app/(seo)/sitemap.xml/route.ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";
```

Add your domain to `.env.local`:

```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 🌍 Internationalization

This template includes full internationalization support with next-intl:

### Supported Languages

- 🇺🇸 **English** (`en`)
- 🇵🇱 **Polish** (`pl`)

### Language Switching

Users can switch languages using the language switcher in the navigation bar. The selected language is stored in a cookie (`lang`) and persists across sessions.

### Adding New Languages

1. **Create a new locale file**

   ```bash
   # Add your language file
   touch locales/de.json  # German example
   ```

2. **Add translations**

   ```json
   {
     "nav": {
       "home": "Startseite",
       "features": "Funktionen",
       "docs": "Dokumentation",
       "github": "GitHub"
     },
     "hero": {
       "title": "Modern",
       "subtitle": "Next.js Vorlage",
       "description": "Schöne, schnelle und moderne Webanwendungen...",
       "getStarted": "Loslegen",
       "viewSource": "Quellcode anzeigen"
     }
   }
   ```

3. **Update the language switcher**
   ```tsx
   // Add your language button in src/app/page.tsx
   <Button
     variant="ghost"
     size="sm"
     onClick={() => switchLanguage("de")}
     className="px-2"
   >
     DE
   </Button>
   ```

### Configuration

The i18n configuration is located in `src/i18n/request.ts`:

```typescript
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "pl";

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
```

## 🗄️ Database Management

### Available Scripts

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create database migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: Deletes all data)
npm run db:reset

# Open Prisma Studio (Visual database editor)
npm run db:studio

# Create new user interactively
npm run db:create-user
```

### User Roles

The application supports three user roles:

- **USER** - Basic access to dashboard
- **MODERATOR** - Extended permissions (future use)
- **ADMIN** - Full access including user management

### Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handlers
- `GET /api/auth/session` - Get current session

### User Management (Admin Only)

- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Profile Management

- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update current user profile
- `PUT /api/profile/password` - Change password

### System

- `GET /health` - Health check endpoint
- `GET /sitemap.xml` - Dynamic sitemap
- `GET /robots.txt` - Dynamic robots.txt

## 📁 Project Structure

```
src/
├── app/
│   ├── .well-known/           # Security.txt RFC compliance
│   ├── (seo)/                 # SEO route handlers
│   │   ├── robots.txt/
│   │   ├── security.txt/
│   │   └── sitemap.xml/
│   ├── api/                   # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   │   ├── [...nextauth]/ # NextAuth.js handler
│   │   │   └── register/      # User registration
│   │   ├── profile/           # User profile management
│   │   └── users/             # User CRUD operations
│   ├── auth/                  # Authentication pages
│   │   ├── login/             # Login page
│   │   └── register/          # Registration page
│   ├── dashboard/             # Protected dashboard
│   │   ├── analytics/         # Analytics page
│   │   ├── settings/          # Settings page
│   │   ├── users/             # User management (Admin only)
│   │   ├── layout.tsx         # Dashboard layout
│   │   └── page.tsx           # Dashboard home
│   ├── health/                # Health check endpoint
│   ├── test/                  # Test page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── toast.tsx
│   └── SessionProvider.tsx    # NextAuth session provider
├── i18n/
│   └── request.ts             # Internationalization config
├── lib/
│   ├── auth-middleware.ts     # Authentication helpers
│   ├── prisma.ts              # Database client
│   └── utils.ts               # Utility functions
├── types/
│   └── next-auth.d.ts         # NextAuth type extensions
├── auth.ts                    # NextAuth configuration
└── middleware.ts              # Route protection middleware

prisma/
├── migrations/                # Database migrations
├── schema.prisma              # Database schema
└── dev.db                     # SQLite database file

scripts/
├── create-admin.ts            # Create admin user script
├── create-test-user.ts        # Create test user script
└── create-user.ts             # Interactive user creation

locales/
├── en.json                    # English translations
└── pl.json                    # Polish translations
```

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

```env
# Database (use PostgreSQL/MySQL for production)
DATABASE_URL="your-production-database-url"

# NextAuth.js (REQUIRED for production)
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
NEXTAUTH_URL="https://your-domain.com"
AUTH_TRUST_HOST="true"

# Application
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

### Vercel (Recommended)

1. **Push your code to GitHub**
2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
3. **Configure Environment Variables**
   - Add all required environment variables
   - Set `DATABASE_URL` to your production database
4. **Deploy**
   - Vercel will automatically build and deploy

### Railway

1. **Connect GitHub repository**
2. **Add PostgreSQL database**
3. **Set environment variables**
4. **Deploy automatically**

### Database Migration for Production

```bash
# For production deployment, run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET` (min 32 characters)
- [ ] Configure production database (PostgreSQL/MySQL)
- [ ] Update `NEXT_PUBLIC_BASE_URL` to your domain
- [ ] Run database migrations
- [ ] Create admin user in production
- [ ] Test authentication flow
- [ ] Verify role-based access control

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Development Tips

### Adding New Features

1. **New API Route**

   ```bash
   # Create new API route
   mkdir src/app/api/your-feature
   touch src/app/api/your-feature/route.ts
   ```

2. **New Dashboard Page**

   ```bash
   # Create new dashboard page
   mkdir src/app/dashboard/your-page
   touch src/app/dashboard/your-page/page.tsx
   ```

3. **Database Schema Changes**
   ```bash
   # Update schema.prisma, then:
   npx prisma migrate dev --name add_your_feature
   ```

### Debugging

- **Database Issues**: Use `npm run db:studio` to inspect data
- **Authentication Issues**: Check browser cookies and session data
- **API Issues**: Check Network tab in browser dev tools
- **Build Issues**: Run `npm run build` to check for TypeScript errors

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication library

---

⭐ **Star this repository if you found it helpful!**

## 📊 Features Overview

| Feature                 | Status | Description                  |
| ----------------------- | ------ | ---------------------------- |
| 🎨 Modern UI            | ✅     | Tailwind CSS 4 + shadcn/ui   |
| 🔐 Authentication       | ✅     | NextAuth.js v5 with roles    |
| 🗄️ Database             | ✅     | Prisma + SQLite/PostgreSQL   |
| 👥 User Management      | ✅     | Full CRUD with role control  |
| 🌍 Internationalization | ✅     | English + Polish support     |
| 📱 Responsive Design    | ✅     | Mobile-first approach        |
| 🎭 Animations           | ✅     | Framer Motion integration    |
| 🔍 SEO                  | ✅     | Dynamic sitemap + robots.txt |
| ⚡ Performance          | ✅     | Turbopack + optimizations    |
| 🛡️ Security             | ✅     | bcrypt + protected routes    |

### SEO Configuration

The SEO files automatically use your environment variables:

```typescript
// Automatically reads from .env.local
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
```

**Available URLs:**

- `/sitemap.xml` - Dynamic sitemap
- `/robots.txt` - Dynamic robots.txt
- `/security.txt` - Security contact information
- `/.well-known/security.txt` - RFC 9116 compliant security.txt
- `/health` - Health check endpoint (JSON)

SEO files use your `NEXT_PUBLIC_BASE_URL` from `.env.local`
