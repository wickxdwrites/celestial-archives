import React, { useState } from 'react';
import ArchiveLayout from '../components/layout/ArchiveLayout';
import './Extras.css';

const extrasData = {
  games: [
    {
      id: 'constellation-match',
      title: 'Constellation Matching',
      description: 'Test your knowledge of star patterns and celestial mythology in this interactive matching game.',
      status: 'planned',
      icon: '✨',
      difficulty: 'Medium',
      estimatedTime: '10-15 min',
      tags: ['astronomy', 'mythology', 'memory']
    },
    {
      id: 'space-word-weaver',
      title: 'Space Word Weaver',
      description: 'Create cosmic stories by selecting words and watching your tale unfold among the stars.',
      status: 'concept',
      icon: '🌌',
      difficulty: 'Easy',
      estimatedTime: '5-10 min',
      tags: ['creative writing', 'story building', 'interactive']
    },
    {
      id: 'stellar-navigator',
      title: 'Stellar Navigator',
      description: 'Navigate through procedurally generated star systems and discover hidden cosmic treasures.',
      status: 'concept',
      icon: '🚀',
      difficulty: 'Hard', 
      estimatedTime: '20-30 min',
      tags: ['exploration', 'strategy', 'adventure']
    }
  ],
  quizzes: [
    {
      id: 'character-archetype',
      title: 'Character Archetype Analysis',
      description: 'Discover which archetypal role you embody in the grand cosmic narrative.',
      status: 'planned',
      icon: '🎭',
      questions: 12,
      tags: ['personality', 'character analysis', 'mythology']
    },
    {
      id: 'writing-style-detector',
      title: 'Writing Style Detector', 
      description: 'Analyze text samples to identify your unique authorial voice and writing patterns.',
      status: 'concept',
      icon: '📝',
      questions: 8,
      tags: ['writing analysis', 'style', 'creativity']
    },
    {
      id: 'cosmic-compatibility',
      title: 'Cosmic Compatibility Test',
      description: 'Find out which fictional universe would be your perfect home among the stars.',
      status: 'planned',
      icon: '🌟',
      questions: 15,
      tags: ['personality', 'fiction', 'universe matching']
    }
  ],
  tools: [
    {
      id: 'name-generator',
      title: 'Celestial Name Generator',
      description: 'Generate mystical names for characters, places, and cosmic entities.',
      status: 'planned',
      icon: '🔮',
      features: ['Character names', 'Planet names', 'Star system names', 'Mystical titles'],
      tags: ['generator', 'creative writing', 'worldbuilding']
    },
    {
      id: 'plot-constellation',
      title: 'Plot Constellation Mapper',
      description: 'Visualize story structures as interconnected star maps with character arcs and plot threads.',
      status: 'concept',
      icon: '🗺️',
      features: ['Story structure', 'Character tracking', 'Plot threads', 'Visual mapping'],
      tags: ['plotting', 'story structure', 'visualization']
    },
    {
      id: 'word-cloud-cosmos',
      title: 'Word Cloud Cosmos',
      description: 'Transform your writing into beautiful cosmic word clouds with thematic clustering.',
      status: 'concept', 
      icon: '☁️',
      features: ['Text analysis', 'Visual generation', 'Theme detection', 'Export options'],
      tags: ['text analysis', 'visualization', 'writing tools']
    }
  ],
  experiments: [
    {
      id: 'infinite-scroll-story',
      title: 'The Infinite Scroll',
      description: 'An ever-expanding collaborative story that grows with each visitor contribution.',
      status: 'active',
      icon: '📜',
      participants: 23,
      tags: ['collaborative', 'storytelling', 'experimental']
    },
    {
      id: 'emotional-color-synth',
      title: 'Emotional Color Synthesizer',
      description: 'Watch colors shift and blend based on the emotional tone of text you input.',
      status: 'planned',
      icon: '🎨',
      tags: ['experimental', 'emotion analysis', 'visual art']
    }
  ]
};

const statusConfig = {
  active: { label: 'Live', color: '#64ffc8', bg: 'rgba(100, 255, 200, 0.15)' },
  planned: { label: 'Coming Soon', color: '#78c8ff', bg: 'rgba(120, 200, 255, 0.15)' },
  concept: { label: 'In Development', color: '#ffc864', bg: 'rgba(255, 200, 100, 0.15)' }
};

const difficultyConfig = {
  Easy: { color: '#70ff9a', icon: '⭐' },
  Medium: { color: '#ffc864', icon: '⭐⭐' },
  Hard: { color: '#ff9999', icon: '⭐⭐⭐' }
};

export default function Extras() {
  const [activeSection, setActiveSection] = useState('games');
  
  const renderGameCard = (game) => (
    <div key={game.id} className={`extras-card extras-card--${game.status}`}>
      <div className="card-icon-header">
        <span className="card-icon">{game.icon}</span>
        <div className="card-status-badge" style={{ 
          color: statusConfig[game.status].color,
          background: statusConfig[game.status].bg
        }}>
          {statusConfig[game.status].label}
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
        <button 
          className={`card-action ${game.status === 'active' ? 'card-action--active' : 'card-action--disabled'}`}
          disabled={game.status !== 'active'}
        >
          {game.status === 'active' ? 'Play Now' : 'Coming Soon'}
        </button>
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
        <button 
          className={`card-action ${quiz.status === 'active' ? 'card-action--active' : 'card-action--disabled'}`}
          disabled={quiz.status !== 'active'}
        >
          {quiz.status === 'active' ? 'Take Quiz' : 'Coming Soon'}
        </button>
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
          {activeSection === 'games' && extrasData.games.map(renderGameCard)}
          {activeSection === 'quizzes' && extrasData.quizzes.map(renderQuizCard)}
          {activeSection === 'tools' && extrasData.tools.map(renderToolCard)}
          {activeSection === 'experiments' && extrasData.experiments.map(renderExperimentCard)}
        </div>
        
        <div className="extras-footer">
          <div className="contribution-callout">
            <h3 className="callout-title">Have an Idea?</h3>
            <p className="callout-text">
              Suggestions for new games, quizzes, or interactive experiments are always welcome. 
              The cosmic archives are ever-expanding!
            </p>
            <button className="callout-button">Suggest Something ✨</button>
          </div>
        </div>
      </section>
    </ArchiveLayout>
  );
}