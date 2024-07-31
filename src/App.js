import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // Commit message text
  const [commitMessage, setCommitMessage] = useState('');

  // Commit message history
  const [commitHistory, setCommitHistory] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setCommitMessage(e.target.value);
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (commitMessage) {
      setCommitHistory([...commitHistory, commitMessage]);
      setCommitMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Commit History</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter commit message"
          value={commitMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Commit</button>
      </form>
      <ul>
        {commitHistory.map((commit, index) => (
          <li key={index}>{commit}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;
