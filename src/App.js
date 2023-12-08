import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { headers } from './env';

function App() {
  const [pitchDeckText, setPitchDeckText] = useState('');
  const [summary, setSummary] = useState("");
  const [loading,setloading]=useState('Generate Summary')

  {/*function for summary gentator */}
  const onSummary=async()=>{
    if(pitchDeckText=='')
        return;
    setSummary('')
    setloading('Please Wait')
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: headers,
      data: {
        messages: [
          {
            role: 'user',
            content: 'summarize this -'+pitchDeckText
          }
        ],
        tone: 'Balanced'
      }
    };
    try {
      const response = await axios.request(options);
      setSummary(response?.data?.result)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setloading('Generate Summary')
  }

  return (
    <div className="App">
      {/* for summary gentator */}
      <h1>Pitch Deck Summary Generator</h1>
      <form onSubmit={(event)=>{event.preventDefault()}}>
        <label htmlFor="pitchDeckText">Enter Pitch Deck Text:</label>
        <textarea id="pitchDeckText" value={pitchDeckText} onChange={(e) => setPitchDeckText(e.target.value)} />
        <div style={{flexDirection:'row',alignSelf:'end'}} >
          <button onClick={onSummary}>{loading}</button>
          <button onClick={onHistory} >View History</button>
        </div>
      </form>
      {summary && (
        <div className="summary">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
