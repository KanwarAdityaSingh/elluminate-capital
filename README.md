# Elluminate Capital - Investment Banking Website

A luxury, professional investment banking website built with Next.js 15, TypeScript, and a sophisticated theme system.

## Features

- **Next.js 15** with TypeScript
- **Static Site Generation** (SSG) for optimal SEO and performance
- **Luxury Purple & Gold Theme System** with sophisticated dark mode design inspired by the company logo
- **SSR-Compatible** dark theme with no hydration mismatches
- **Professional Design** with gold accents and modern typography
- **Responsive Design** with mobile-first approach
- **SEO Optimized** with proper metadata and Open Graph tags

## Theme System

The website features a comprehensive theme system with:

- **CSS Variables**: All styling uses CSS custom properties for consistent theming
- **Luxury Purple & Gold Theme**: Sophisticated dark theme with purple and gold accents matching the company branding
- **Luxury Color Palette**: Purple backgrounds (#4a2c5a) with gold accents (#d4af37) creating an elegant, modern aesthetic
- **Typography**: Professional font stack (Inter, Playfair Display, JetBrains Mono)
- **Smooth Transitions**: All theme changes are animated for a polished experience

## Getting Started

### Development

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
```

### Export Static Site

```bash
npm run export
```

This creates a static export in the `out` directory, ready for deployment to any static hosting service.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and theme imports
├── components/
│   └── ServiceCard.tsx     # Interactive service cards
├── contexts/
│   └── ThemeContext.tsx    # Purple & Gold luxury theme context and provider
└── styles/
    └── themes.css          # Theme variables and base styles
```

## Theme Usage

All components use CSS variables for theming. Key variables include:

- `--color-primary` / `--color-secondary`
- `--bg-primary` / `--bg-secondary`
- `--text-primary` / `--text-secondary`
- `--color-accent` (gold)
- `--font-family-primary` / `--font-family-heading`
- `--shadow-*` (shadow system)
- `--gradient-*` (gradient combinations)

## Deployment

The site is configured for static export and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Custom Properties** - Theme system
- **Google Fonts** - Typography (Inter, Playfair Display, JetBrains Mono)

## License

Private project for Elluminate Capital.