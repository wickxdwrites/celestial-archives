import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArchiveLayout from '../components/layout/ArchiveLayout';
import './Extras.css';

const SUGGESTIONS_STORAGE_KEY = 'celestial-suggestions';
const SUGGESTION_VOTES_STORAGE_KEY = 'celestial-suggestion-votes';

const extrasData = {
  games: [
    {
      id: 'ef007e-terminal-chat',
      title: 'EF007E: Terminal Interface',
      description: 'Step into the Grid and engage in real-time conversations with the digital consciousnesses from EF007E. Experience the story through interactive dialogue.',
      status: 'beta',
      icon: '💬',
      path: '/extras/ef007e-terminal',
      difficulty: 'Medium',
      estimatedTime: '15-30 min',
      tags: ['interactive fiction', 'chat simulation', 'EF007E', 'terminal interface']
    },
    {
      id: 'serenity-match',
      title: 'Serenity Match',
      description: 'A relaxing card matching game with 10 levels and a secret to unlock. Match the cards to reveal hidden images.',
      status: 'in-development',
      icon: '🪷',
      path: '/extras/serenity-match',
      difficulty: 'Easy → Hard',
      estimatedTime: '10-20 min',
      tags: ['matching', 'memory', 'relaxation', 'massage & therapy'],
      nsfw: true
    }
  ],
  quizzes: [
    {
      id: 'bread-quiz',
      title: 'What Type of Bread Are You?',
      description: 'A chaotic personality quiz to reveal your true baked identity. Soft loaf? Salty bagel? Dramatic croissant?',
      status: 'active',
      icon: '🍞',
      questions: 15,
      path: '/extras/bread-quiz',
      tags: ['comedy', 'personality', 'bread lore']
    }
  ],
  tools: [],
  experiments: []
};

const statusConfig = {
  active: { label: 'Live', color: '#64ffc8', bg: 'rgba(100, 255, 200, 0.15)' },
  beta: { label: 'Beta', color: '#78c8ff', bg: 'rgba(120, 200, 255, 0.15)' },
  'in-development': { label: 'In Development', color: '#ffc864', bg: 'rgba(255, 200, 100, 0.15)' },
  planned: { label: 'Coming Soon', color: '#78c8ff', bg: 'rgba(120, 200, 255, 0.15)' },
  concept: { label: 'In Development', color: '#ffc864', bg: 'rgba(255, 200, 100, 0.15)' }
};

const difficultyConfig = {
  Easy: { color: '#70ff9a', icon: '⭐' },
  Medium: { color: '#ffc864', icon: '⭐⭐' },
  Hard: { color: '#ff9999', icon: '⭐⭐⭐' },
  'Easy → Hard': { color: '#c9a0dc', icon: '⭐→⭐⭐⭐' }
};

export default function Extras() {
  const [activeSection, setActiveSection] = useState('games');
  const [showNsfw, setShowNsfw] = useState(() => {
    try { return localStorage.getItem('celestial-nsfw') === 'true'; } catch { return false; }
  });
  const [nsfwModal, setNsfwModal] = useState(false);
  const [suggestionAlias, setSuggestionAlias] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestions, setSuggestions] = useState(() => {
    try {
      const stored = localStorage.getItem(SUGGESTIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [voteMap, setVoteMap] = useState(() => {
    try {
      const stored = localStorage.getItem(SUGGESTION_VOTES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(suggestions));
    } catch {}
  }, [suggestions]);

  useEffect(() => {
    try {
      localStorage.setItem(SUGGESTION_VOTES_STORAGE_KEY, JSON.stringify(voteMap));
    } catch {}
  }, [voteMap]);

  const handleNsfwToggle = () => {
    if (showNsfw) {
      setShowNsfw(false);
      try { localStorage.setItem('celestial-nsfw', 'false'); } catch {}
    } else {
      setNsfwModal(true);
    }
  };

  const confirmNsfw = () => {
    setShowNsfw(true);
    setNsfwModal(false);
    try { localStorage.setItem('celestial-nsfw', 'true'); } catch {}
  };

  const denyNsfw = () => {
    setNsfwModal(false);
  };

  const handleSuggestionSubmit = (event) => {
    event.preventDefault();

    const trimmedText = suggestionText.trim();
    if (!trimmedText) return;

    const trimmedAlias = suggestionAlias.trim();
    const newSuggestion = {
      id: Date.now().toString(),
      alias: trimmedAlias || 'Anonymous',
      text: trimmedText,
      yay: 0,
      nay: 0,
      createdAt: new Date().toISOString(),
    };

    setSuggestions((prev) => [newSuggestion, ...prev]);
    setSuggestionText('');
    setSuggestionAlias('');
  };

  const handleVote = (suggestionId, voteType) => {
    const previousVote = voteMap[suggestionId];
    if (previousVote === voteType) return;

    setSuggestions((prev) =>
      prev.map((item) => {
        if (item.id !== suggestionId) return item;

        const yayDelta = (voteType === 'yay' ? 1 : 0) - (previousVote === 'yay' ? 1 : 0);
        const nayDelta = (voteType === 'nay' ? 1 : 0) - (previousVote === 'nay' ? 1 : 0);

        return {
          ...item,
          yay: Math.max(0, item.yay + yayDelta),
          nay: Math.max(0, item.nay + nayDelta),
        };
      })
    );

    setVoteMap((prev) => ({
      ...prev,
      [suggestionId]: voteType,
    }));
  };

  const filterNsfw = (items) => showNsfw ? items : items.filter(item => !item.nsfw);
  
  const renderGameCard = (game) => (
    <div key={game.id} className={`extras-card extras-card--${game.status} ${game.nsfw ? 'extras-card--nsfw' : ''}`}>
      <div className="card-icon-header">
        <span className="card-icon">{game.icon}</span>
        <div className="card-badges">
          {game.nsfw && <span className="nsfw-badge">NSFW</span>}
          <div className="card-status-badge" style={{ 
            color: statusConfig[game.status].color,
            background: statusConfig[game.status].bg
          }}>
            {statusConfig[game.status].label}
          </div>
        </div>
      </div>
      
      <h3 className="card-title">{game.title}</h3>
      <p className="card-description">{game.description}</p>
      
      <div className="card-meta-grid">
        <div className="meta-item">
          <span className="meta-label">Difficulty</span>
          <div className="difficulty-indicator" style={{ color: difficultyConfig[game.difficulty].color }}>
            {difficultyConfig[game.difficulty].icon} {game.difficulty}
          </div>
        </div>
        <div className="meta-item">
          <span className="meta-label">Time</span>
          <span className="meta-value">{game.estimatedTime}</span>
        </div>
      </div>
      
      <div className="card-tags">
        {game.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="card-footer">
        {(game.status === 'active' || game.status === 'beta') && game.path ? (
          <Link to={game.path} className="card-action card-action--active">
            {game.status === 'beta' ? 'Play Beta' : 'Play Now'}
          </Link>
        ) : (
          <button 
            className="card-action card-action--disabled"
            disabled
          >
            In Development
          </button>
        )}
      </div>
    </div>
  );
  
  const renderQuizCard = (quiz) => (
    <div key={quiz.id} className={`extras-card extras-card--${quiz.status}`}>
      <div className="card-icon-header">
        <span className="card-icon">{quiz.icon}</span>
        <div className="card-status-badge" style={{
          color: statusConfig[quiz.status].color,
          background: statusConfig[quiz.status].bg
        }}>
          {statusConfig[quiz.status].label}
        </div>
      </div>
      
      <h3 className="card-title">{quiz.title}</h3>
      <p className="card-description">{quiz.description}</p>
      
      <div className="quiz-meta">
        <span className="questions-count">{quiz.questions} Questions</span>
        <span className="estimated-time">~{Math.ceil(quiz.questions * 1.5)} minutes</span>
      </div>
      
      <div className="card-tags">
        {quiz.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="card-footer">
        {quiz.status === 'active' && quiz.path ? (
          <Link to={quiz.path} className="card-action card-action--active">
            Take Quiz
          </Link>
        ) : (
          <button 
            className="card-action card-action--disabled"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
  
  const renderToolCard = (tool) => (
    <div key={tool.id} className={`extras-card extras-card--${tool.status}`}>
      <div className="card-icon-header">
        <span className="card-icon">{tool.icon}</span>
        <div className="card-status-badge" style={{
          color: statusConfig[tool.status].color,
          background: statusConfig[tool.status].bg
        }}>
          {statusConfig[tool.status].label}
        </div>
      </div>
      
      <h3 className="card-title">{tool.title}</h3>
      <p className="card-description">{tool.description}</p>
      
      <div className="features-list">
        <span className="features-label">Features:</span>
        <ul className="features-items">
          {tool.features.map(feature => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div className="card-tags">
        {tool.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="card-footer">
        <button 
          className={`card-action ${tool.status === 'active' ? 'card-action--active' : 'card-action--disabled'}`}
          disabled={tool.status !== 'active'}
        >
          {tool.status === 'active' ? 'Use Tool' : 'Coming Soon'}
        </button>
      </div>
    </div>
  );
  
  const renderExperimentCard = (experiment) => (
    <div key={experiment.id} className={`extras-card extras-card--${experiment.status}`}>
      <div className="card-icon-header">
        <span className="card-icon">{experiment.icon}</span>
        <div className="card-status-badge" style={{
          color: statusConfig[experiment.status].color,
          background: statusConfig[experiment.status].bg
        }}>
          {statusConfig[experiment.status].label}
        </div>
      </div>
      
      <h3 className="card-title">{experiment.title}</h3>
      <p className="card-description">{experiment.description}</p>
      
      {experiment.participants && (
        <div className="participants-info">
          <span className="participants-icon">👥</span>
          <span className="participants-text">{experiment.participants} participants</span>
        </div>
      )}
      
      <div className="card-tags">
        {experiment.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <div className="card-footer">
        <button 
          className={`card-action ${experiment.status === 'active' ? 'card-action--active' : 'card-action--disabled'}`}
          disabled={experiment.status !== 'active'}
        >
          {experiment.status === 'active' ? 'Join Experiment' : 'Coming Soon'}
        </button>
      </div>
    </div>
  );

  return (
    <ArchiveLayout>
      <section className="extras-section">
        <div className="section-header">
          <div className="section-heading-row">
            <p className="section-label">Interactive Archives</p>
            <h1 className="section-title">Celestial Extras</h1>
            <p className="section-description">
              Games, quizzes, tools, and experimental experiences that expand the boundaries of storytelling
            </p>
          </div>
          <div className="nsfw-toggle-row">
            <label className="nsfw-toggle">
              <span className="nsfw-toggle-label">Show NSFW Content</span>
              <div className={`nsfw-switch ${showNsfw ? 'nsfw-switch--on' : ''}`} onClick={handleNsfwToggle}>
                <div className="nsfw-switch-thumb" />
              </div>
            </label>
          </div>
        </div>
        
        <div className="extras-navigation">
          {Object.keys(extrasData).map(section => (
            <button
              key={section}
              className={`nav-tab ${activeSection === section ? 'nav-tab--active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              <span className="nav-tab-text">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
              <span className="nav-tab-count">
                {extrasData[section].length}
              </span>
            </button>
          ))}
        </div>
        
        <div className="extras-grid">
          {activeSection === 'games' && filterNsfw(extrasData.games).map(renderGameCard)}
          {activeSection === 'quizzes' && filterNsfw(extrasData.quizzes).map(renderQuizCard)}
          {activeSection === 'tools' && filterNsfw(extrasData.tools).map(renderToolCard)}
          {activeSection === 'experiments' && filterNsfw(extrasData.experiments).map(renderExperimentCard)}
        </div>
        
        <div className="extras-footer">
          <div className="contribution-callout">
            <h3 className="callout-title">Have an Idea?</h3>
            <p className="callout-text">
              Suggestions for new games, quizzes, or interactive experiments are always welcome. 
              The cosmic archives are ever-expanding!
            </p>
            <form className="suggestion-form" onSubmit={handleSuggestionSubmit}>
              <input
                type="text"
                className="suggestion-input suggestion-input--alias"
                placeholder="Your alias (optional)"
                value={suggestionAlias}
                onChange={(e) => setSuggestionAlias(e.target.value)}
                maxLength={30}
              />
              <textarea
                className="suggestion-input suggestion-input--text"
                placeholder="Share your idea for a new game, quiz, tool, or experiment..."
                value={suggestionText}
                onChange={(e) => setSuggestionText(e.target.value)}
                rows={3}
                maxLength={300}
              />
              <button type="submit" className="callout-button">Suggest Something</button>
            </form>
          </div>

          <div className="suggestions-board">
            <h4 className="suggestions-title">Community Suggestion Board</h4>
            {suggestions.length === 0 ? (
              <p className="suggestions-empty">No suggestions yet. Be the first to add one.</p>
            ) : (
              <div className="suggestions-list">
                {suggestions.map((item) => (
                  <article key={item.id} className="suggestion-card">
                    <div className="suggestion-card-header">
                      <span className="suggestion-author">{item.alias}</span>
                      <time className="suggestion-date">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="suggestion-body">{item.text}</p>
                    <div className="suggestion-votes">
                      <button
                        type="button"
                        className={`vote-btn vote-btn--yay ${voteMap[item.id] === 'yay' ? 'vote-btn--selected' : ''}`}
                        onClick={() => handleVote(item.id, 'yay')}
                      >
                        Yay ({item.yay})
                      </button>
                      <button
                        type="button"
                        className={`vote-btn vote-btn--nay ${voteMap[item.id] === 'nay' ? 'vote-btn--selected' : ''}`}
                        onClick={() => handleVote(item.id, 'nay')}
                      >
                        Nay ({item.nay})
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {nsfwModal && (
        <div className="nsfw-modal-overlay" onClick={denyNsfw}>
          <div className="nsfw-modal" onClick={e => e.stopPropagation()}>
            <div className="nsfw-modal-icon">🔞</div>
            <h2 className="nsfw-modal-title">Age Verification Required</h2>
            <p className="nsfw-modal-text">
              Some content in the Celestial Archives is intended for mature audiences only. 
              By enabling NSFW content, you confirm that:
            </p>
            <ul className="nsfw-modal-terms">
              <li>You are at least <strong>18 years of age</strong> (or the age of majority in your jurisdiction)</li>
              <li>You understand that NSFW content may contain adult themes</li>
              <li>You accept responsibility for viewing this content</li>
            </ul>
            <div className="nsfw-modal-actions">
              <button className="nsfw-modal-btn nsfw-modal-btn--confirm" onClick={confirmNsfw}>
                I am 18+ — Show NSFW Content
              </button>
              <button className="nsfw-modal-btn nsfw-modal-btn--deny" onClick={denyNsfw}>
                No, Keep It Hidden
              </button>
            </div>
          </div>
        </div>
      )}
    </ArchiveLayout>
  );
}