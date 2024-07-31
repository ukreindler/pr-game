import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import jakana from './images/jakana.jpeg'; // Import the image

function generateRandomCommitHash() {
  const length = 40; // Length of a Git commit hash
  const characters = 'abcdef0123456789';
  let hash = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters[randomIndex];
  }

  return hash;
}

const reviewComments = [
  "LGTM... if you're okay with mediocrity",
  "Did you mean to commit this to the \"Trash\" branch?",
  "I think I found the bug: it’s your code.",
  "Code smells like it was written in a hurry...by someone who hates their job.",
  "Is this a pull request or a cry for help?",
  "I see your code is as robust as my morning coffee (weak and full of regret).",
  "Can we frame this and put it in the \"How Not to Code\" hall of fame?",
  "Just curious: Did you test this? On real computers?",
  "This is a great example of why we have code reviews.",
  "I've seen cleaner code in my spam folder.",
  "This PR is a great example of how not to code. You’ve really outdone yourself in creating confusion.",
  "Is there a prize for the most poorly implemented feature? Because this PR is a strong contender.",
  "Your PR reads like a cautionary tale about why we need code reviews. Well done on setting the bar low.",
  "It’s impressive how you’ve managed to introduce so many issues with such little code. A true talent.",
  "I’m not sure if this is code or an elaborate prank. Either way, it’s not what we needed.",
  "Looks like this PR was an exercise in futility. Here’s hoping the next one is slightly more functional.",
  "Congratulations on turning a simple task into a monumental disaster. Your skills are truly unparalleled.",
  "This PR is a masterpiece of what happens when code goes horribly wrong. Can’t wait to see the sequel.",
  "The only thing more confusing than this PR is trying to understand why it was submitted in the first place.",
  "If the goal was to make me question my sanity, this PR has succeeded beyond expectations.",
  "You’ve managed to create a PR so flawed that it’s practically a case study in bad coding practices. Impressive.",
  "This PR is so horrendous, it’s almost impressive. I didn’t think anyone could make a mess this big.",
  "I see Tyler’s signature touch on this one. It’s a masterpiece of chaos, as always. Thanks for keeping us on our toes!",
  "Seeing how this PR ties into Tyler’s changes, I’m almost intrigued by how creatively it’s chosen to ignore any semblance of stability.",
]

function chooseRandomReview() {
  return reviewComments[Math.floor(Math.random() * reviewComments.length)];
}

function App() {
  // Commit message text
  const [commitMessage, setCommitMessage] = useState('');

  // Commit message history
  const [commitHistory, setCommitHistory] = useState([]);

  // Pull request comment text
  const [prComment, setPrComment] = useState('');

  // State to show the pull request widget
  const [prCreated, setPrCreated] = useState(false);

  // Finalized pull request comment to display
  const [finalPrComment, setFinalPrComment] = useState('');

  // State to track review requests
  const [reviewRequests, setReviewRequests] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setCommitMessage(e.target.value);
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (commitMessage) {
      setCommitHistory([...commitHistory, commitMessage + ' - ' + generateRandomCommitHash().substring(0, 7)]);
      setCommitMessage('');
    }
  };

  // Handle pull request comment change
  const handlePRCommentChange = (e) => {
    setPrComment(e.target.value);
  };

  // Handle create pull request button click
  const handleCreatePRClick = async () => {
    if (prComment.trim()) {
      setFinalPrComment(prComment); // Save the comment
      setPrCreated(true); // Show the PR widget
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(500);
      setReviewRequests([...reviewRequests, chooseRandomReview()]); // Add new review request
      setPrComment(''); // Clear the comment
    }
  };

  const handleReRequestClick = () => {
    setReviewRequests([...reviewRequests, chooseRandomReview()]); // Add new review request
    setPrComment(''); // Clear the comment
  };

  const isPRCommentDisabled = () => {
    return prCreated;
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Commits</h1>
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
            <li key={index}>
              <strong>{commit}</strong>
              </li>
          ))}
        </ul>
      </div>
      <div class="container">
        {/* Render pull request section only if there are commits */}
        {commitHistory.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h1>Open Pull Request</h1>
            <input
              type="text"
              placeholder="Enter Comment"
              value={prComment}
              onChange={handlePRCommentChange}
              disabled={isPRCommentDisabled()}
            />
            <button onClick={prCreated ? handleReRequestClick : handleCreatePRClick}>
              {prCreated ? 'Re-request Review' : 'Publish PR'}
            </button>
          </div>
        )}

        {/* Display the pull request widget if created */}
        {prCreated && (
          <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
            <h3>Pull Request Comment:</h3>
            <p>{finalPrComment}</p>
            <div style={{ marginTop: '10px', padding: '5px', backgroundColor: '#f0f0f0' }}>
              <strong>Review Requested</strong>
            </div>
          </div>
        )}

        {/* Display all review request widgets */}
        {reviewRequests.map((request, index) => (
          <div key={index} style={{ marginTop: '20px', border: '1px solid red', padding: '10px', color: 'red' }}>
            <div className="centerMe"><img src={jakana} alt="Jakana" className='circular-image' /><strong className="centerMe">{request}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
