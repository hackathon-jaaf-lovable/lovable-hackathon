from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Audience agent responses could be backed by a language model.
# This example uses OpenAI API if OPENAI_API_KEY is provided.
try:
    import openai
    openai.api_key = os.getenv("OPENAI_API_KEY")
except Exception:
    openai = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/audience', methods=['POST'])
def audience():
    data = request.get_json(force=True)
    prompt = data.get('message', '')
    response_text = ""
    if openai and openai.api_key:
        try:
            completion = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "system", "content": "You are a simulated audience."},
                         {"role": "user", "content": prompt}]
            )
            response_text = completion.choices[0].message.content
        except Exception as e:
            response_text = f"Error contacting OpenAI: {e}"
    else:
        # Fallback simple echo if OpenAI is not configured
        response_text = f"Audience agent: {prompt}"
    return jsonify({'response': response_text})

@app.route('/coach')
def coach_view():
    return render_template('coach.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    # Placeholder for body language analysis using mediapipe.
    # This should receive video frames from client and process them.
    # For simplicity, we just return a dummy tip.
    return jsonify({'tips': 'Keep your shoulders back and maintain eye contact.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
