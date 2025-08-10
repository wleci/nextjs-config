# 🚀 Wleci Next.js Template

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A modern Next.js template with beautiful animations, responsive navbar, and elegant hero section.

## ✨ Features

- 🎨 **Modern UI** - Built with Tailwind CSS 4 and shadcn/ui
- 🎭 **Smooth Animations** - Powered by Framer Motion 12.23.12
- 🎯 **Icons** - Beautiful Lucide React icons 0.539.0
- 🌙 **Dark Mode** - Built-in theme support
- 📱 **Responsive** - Mobile-first design
- ⚡ **Performance** - Optimized for speed with Turbopack
- 🔧 **TypeScript** - Full type safety

## 🛠️ Tech Stack

- **Framework:** Next.js 15.4.6 (App Router)
- **React:** 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Animations:** Framer Motion 12.23.12
- **Icons:** Lucide React 0.539.0

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/wleci-nextjs-template.git
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

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   > **Note:** This project uses Turbopack for faster development

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 What's Included

### Components

- **Navbar** - Responsive navigation bar with animations
- **Hero Section** - Eye-catching main section with gradient text
- **Feature Cards** - Cards showcasing key features
- **Responsive Layout** - Works on all device sizes

### Libraries

- **Framer Motion 12.23.12** - Pre-configured smooth animations
- **Lucide Icons 0.539.0** - Comprehensive icon library
- **shadcn/ui** - Modern component system (Button, Card, Badge)
- **Tailwind CSS 4** - Utility-first styling

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

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
└── lib/
    └── utils.ts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

- **Netlify:** `npm run build && npm run export`
- **Railway:** Connect GitHub repository

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [shadcn/ui](https://ui.shadcn.com/) - Component library

---

⭐ **Star this repository if you found it helpful!**
