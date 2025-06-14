# Lovable Hackathon: Public Speaking Trainer

This repo contains a simple Flask web application that can be imported into Lovable.
It provides two main features:

1. **Audience Simulator** – Chat with virtual audience agents backed by OpenAI
   (if an API key is configured) or a simple echo fallback.
2. **Speech Coach** – Capture webcam input and request analysis from the server.
   The current server implementation returns a placeholder tip but can be extended
   with Mediapipe to process body language.

## Running Locally

Install dependencies and start the server:

```bash
pip install -r requirements.txt
python app/main.py
```

Visit `http://localhost:5000` in your browser.
