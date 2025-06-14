# Lovable Hackathon: Public Speaking Trainer

This repo now contains a small Node + React web application. It simulates an audience you can chat with and provides a webcam based speech coach. Both the audience and coach integrate with the OpenAI API when the `OPENAI_API_KEY` environment variable is set.

## Running Locally

Install dependencies and start the server:

```bash
npm install
npm run start
```

During development you can run the app with hot reload using:

```bash
npm run dev
```

Then visit `http://localhost:3000` in your browser.

The **Coach** tab shows your webcam and lets you chat with an AI-powered speech coach. Type questions or request feedback and it will reply in the chat box.
