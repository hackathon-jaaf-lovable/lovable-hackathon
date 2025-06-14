const { useState, useEffect, useRef } = React;

function AudienceSimulator() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  const sendMessage = async () => {
    const text = inputRef.current.value;
    if (!text) return;
    setMessages(msgs => [...msgs, { from: 'You', text }]);
    inputRef.current.value = '';
    try {
      const resp = await fetch('/audience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await resp.json();
      setMessages(msgs => [...msgs, { from: 'Audience', text: data.response }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'Error', text: err.message }]);
    }
  };

  return (
    <div className="box">
      <h2 className="title is-4">Audience Simulator</h2>
      <div id="chat-box">
        {messages.map((m, i) => (
          <div key={i}><strong>{m.from}:</strong> {m.text}</div>
        ))}
      </div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input ref={inputRef} className="input" type="text" placeholder="Say something"/>
        </div>
        <div className="control">
          <button className="button is-link" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

function SpeechCoach() {
  const [tips, setTips] = useState('');
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const analyze = async () => {
    const resp = await fetch('/analyze', { method: 'POST' });
    const data = await resp.json();
    setTips(data.tips);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Speech Coach</h2>
      <video ref={videoRef} width="480" height="360" autoPlay className="mb-2"></video>
      <button className="button is-info" onClick={analyze}>Analyze Body Language</button>
      <div className="mt-2">{tips}</div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState('audience');
  return (
    <div className="container">
      <h1 className="title">Public Speaking Trainer</h1>
      <div className="tabs">
        <ul>
          <li className={tab === 'audience' ? 'is-active' : ''}><a onClick={() => setTab('audience')}>Audience</a></li>
          <li className={tab === 'coach' ? 'is-active' : ''}><a onClick={() => setTab('coach')}>Coach</a></li>
        </ul>
      </div>
      {tab === 'audience' ? <AudienceSimulator/> : <SpeechCoach/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
