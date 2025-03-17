# Chat-with-GitHub

An AI-powered tool that allows you to interact with any public GitHub repository through a chat interface.  Simply provide a GitHub repo link, and the app will fetch and provide insights about the project, such as its structure, dependencies, and functionality. Whether you're exploring open-source projects, analyzing codebases, or quickly grasping a new library, this tool makes it easy to gather insights through a conversational AI interface.

**[Live Demo](https://chat-with-github.vercel.app/)**


https://github.com/user-attachments/assets/f8734dc8-ce08-45e3-9b25-7a4ddb087817


## Features

*   **Chat with any Public GitHub Repo:**  Just paste the URL, and start asking questions!
*   **AI-Powered Insights:**  Get summaries and answers about the repo's structure, functionality, and more.
*   **Easy Exploration:**  Quickly understand the purpose and key components of a project.
*   **Time-Saving:**  Avoid endless scrolling and documentation diving. Get the information you need, fast.
*   **Open-Source:**  Contribute, suggest improvements, and customize the tool to your needs.

## How to Use

1.  Open the app in your browser: [https://chat-with-github.vercel.app/](https://chat-with-github.vercel.app/)
2.  Paste the link to any *public* GitHub repository into the input field.
3.  Click "Start Chatting".
4.  Start asking questions about the repo! You can try questions like:
    *   "What are the main features?"
    *   "Can you explain the code structure?"
    *   "How do I use [specific function/class]?"

## Tech Stack

*   **Frontend:**  Next.js
*   **Backend:**  Next.js API routes
*   **Database:**  Supabase (for persistent storage of chat history and repository data)
*   **Styling:**  Tailwind CSS
*   **AI Engine:** [Optional: Mention which LLM you are using]

## Development

### Prerequisites

*   Node.js (version >= 19)
*   npm or yarn
*   Supabase account and project setup

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Payalsahuj/Chat-With-Github.git
    cd Chat-With-Github
    ```

2.  Install dependencies:

    ```bash
    npm install  # or yarn install
    ```

3.  Set up environment variables:
    *   Create a `.env.local` file in the root directory.
    *   Add your Supabase URL and API key:

        ```
        NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```
        **[Important: Replace these with your actual Supabase credentials!]**

### Running the App

```bash
npm run dev  # or yarn dev
