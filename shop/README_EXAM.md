# Exam Notes (Template)

Use this file as your exam explanation for the project. Fill the sections below after you finish the Figma and code integration.

## Project summary
- Project: ShopHub (simple, modern e-commerce UI for exam)
- Pages implemented: Home, Product Detail, Cart, Checkout, Login, Register, About, Contact
- Tech: React, Vite, React Router

## Figma -> Implementation
- Figma file: (paste link or file name)
- Primary pages created in Figma: Home, Product, Cart, Checkout, Login/Register, About, Contact
- Key components designed in Figma: Header (logo + nav), Footer, Product Card, Product Detail, Cart Summary, Forms

## Libraries used
- `react` / `react-dom`
- `react-router-dom` for routing
- `vite` as dev server

## File structure (important files)
- `src/router.jsx` — routes configuration
- `src/components/Header.jsx` — site header
- `src/components/Footer.jsx` — site footer
- `src/components/Layout.jsx` — layout wrapper (imports Header/Footer)
- `src/pages/*` — page components
- `public/shophub.png` — logo (add after uploading images)

## Styling notes
- Main layout styles are in `src/components/layout/Layout.css` (kept next to components for exam simplicity).
- Page-specific styles remain in `src/styles/*` for clarity.

## Tricky parts / things to highlight in exam
- Routing: used `createBrowserRouter` + `RouterProvider` to have nested routes and `Outlet`.
- Cart calculation: subtotal, tax, and shipping are computed in `Cart.jsx` (explain formula and why show totals).
- Forms: Login/Register/Checkout use controlled components — explain validation steps.

## Q&A prompts (practice answers you can paste)
- Why React Router? — For client-side navigation and nested layouts using `Outlet`.
- How do you manage cart state? — For the exam demo we used local component state; next step would be Context or Redux for cross-page state persistence.
- How did you convert Figma to code? — I exported assets (logo, product images), recreated layout using flex/grid, and matched spacing/colors with CSS variables.

## When images are ready
1. Place `shophub.png` and other assets in `public/` or `public/assets/`.
2. Update `<img src="/shophub.png" />` if in `public/` or `/assets/shophub.png` if in `public/assets/`.

---
Fill the sections above after you finalize the Figma; I'll help you craft the exact text so it reads like you wrote it.
