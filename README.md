# Docify

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Docify is a powerful and intuitive web application designed to help developers effortlessly generate professional and comprehensive `README.md` files for their GitHub repositories. By integrating directly with GitHub, Docify streamlines the process of creating high-quality documentation, ensuring your projects are well-presented and easily understood.

## ✨ Features

*   **GitHub Authentication:** Securely log in with your GitHub account to access your repositories.
*   **Repository Listing:** View a list of your public and private GitHub repositories.
*   **File Structure Analysis:** Automatically analyze your repository's file and directory structure.
*   **Intelligent README Generation:** Generate a professional `README.md` based on your project's content and structure.
*   **Real-time Preview:** See a live markdown preview of the generated README.
*   **Copy to Clipboard:** Easily copy the generated README content with a single click.
*   **User-Friendly Interface:** A clean and modern UI for an optimal user experience.

## 🚀 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (React Framework)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (or similar component library)
*   **Package Manager**: [npm](https://www.npmjs.com/) / [Yarn](https://yarnpkg.com/)

## 🛠️ Installation Guide

Follow these steps to set up Docify locally on your machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or Yarn

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/docify.git
    cd docify
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add the following:

    ```env
    GITHUB_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET
    NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET # A random string, e.g., generated with `openssl rand -base64 32`
    # If using an AI service for README generation (e.g., OpenAI, Anthropic)
    # OPENAI_API_KEY=your_openai_api_key
    ```

    *   **GitHub OAuth Application:**
        *   Go to your GitHub Developer Settings: [Settings > Developer settings > OAuth Apps](https://github.com/settings/developers).
        *   Click "New OAuth App".
        *   **Application name:** `Docify Local` (or anything you prefer)
        *   **Homepage URL:** `http://localhost:3000`
        *   **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
        *   Generate a new client secret and copy your Client ID and Client Secret into your `.env.local` file.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
.
├── .gitignore
├── README.md
├── auth.ts
├── components.json
├── eslint.config.mjs
├── next-auth.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   ├── fetchReposContent.ts
│   │   │   ├── generateReadme
│   │   │   │   └── route.tsx
│   │   │   └── token.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── repos
│   │       └── [repo]
│   │           └── page.tsx
│   ├── components
│   │   ├── CopyButton.tsx
│   │   ├── FileTree.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ReadmeButton.tsx
│   │   ├── ReadmeContent.tsx
│   │   ├── Repos.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   └── lib
│       └── utils.ts
└── tsconfig.json
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

-- made by docify --
