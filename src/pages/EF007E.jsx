import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EF007EChapters from "../data/EF007E";
import { saveComment } from "../utils/comments";
import { getTheme } from "../themes/registry";
import "../styles/ef007e-theme.css";

export default function TronFile() {
  const [selectedChapterId, setSelectedChapterId] = useState(EF007EChapters[0].id);
  const [alias, setAlias] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const theme = getTheme("ef007e");

  const activeChapter =
    EF007EChapters.find((chapter) => chapter.id === selectedChapterId) ||
    EF007EChapters[0];
    
  // Periodic glitch effect
  useEffect(() => {
    // Add scanline animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scanlineShift {
        0% { transform: translateY(0); }
        100% { transform: translateY(4px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.1); }
      }
    `;
    document.head.appendChild(style);
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 10000 + 15000); // Random interval 15-25 seconds
    
    return () => {
      clearInterval(glitchInterval);
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alias.trim() || !commentText.trim()) return;

    saveComment({
      alias: alias.trim(),
      story: "EF007E",
      chapter: activeChapter.label,
      comment: commentText.trim(),
    });

    setAlias("");
    setCommentText("");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div 
      className={`tron-page ${theme.classes.page} ${glitchActive ? 'tron-glitch-active' : ''}`}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #010810 0%, #041018 25%, #06141f 50%, #041018 75%, #010810 100%)',
        color: '#bff3ff',
        position: 'relative'
      }}
    >
      <div 
        className="tron-scanlines"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 200, 0.04) 0px, rgba(0, 255, 200, 0.04) 1px, transparent 1px, transparent 3px)',
          zIndex: 2,
          animation: 'scanlineShift 20s linear infinite'
        }}
      />
      <div 
        className="tron-grid-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.015,
          backgroundImage: 'linear-gradient(rgba(0, 225, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 225, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 2
        }}
      />

      <div className="tron-shell">
        <style jsx>{`
          @media (max-width: 1024px) {
            .tron-reader-layout {
              flex-direction: column !important;
            }
            .tron-reader-sidebar {
              width: 100% !important;
              min-width: unset !important;
              margin-bottom: 24px;
            }
          }
        `}</style>
        <header 
          className="tron-topbar"
          style={{
            border: '2px solid rgba(0, 225, 255, 0.6)',
            background: 'linear-gradient(90deg, rgba(0, 10, 25, 0.95) 0%, rgba(0, 20, 40, 0.98) 50%, rgba(0, 10, 25, 0.95) 100%)',
            boxShadow: '0 0 40px rgba(0, 183, 255, 0.3), inset 0 2px 0 rgba(0, 255, 200, 0.2)',
            padding: '15px 24px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '60px'
          }}
        >
          <div 
            className="tron-brand" 
            data-text="EF007E"
            style={{
              color: '#00e1ff',
              fontFamily: '"Orbitron", monospace',
              fontSize: '20px',
              fontWeight: '900',
              letterSpacing: '0.15em',
              textShadow: '0 0 8px rgba(0, 225, 255, 0.8), 0 0 16px rgba(0, 225, 255, 0.4)',
              flexShrink: 0
            }}
          >EF007E</div>

          <nav 
            className="tron-nav"
            style={{
              display: 'flex',
              gap: '1px',
              alignItems: 'center',
              background: 'rgba(0, 30, 60, 0.3)',
              border: '1px solid rgba(0, 225, 255, 0.3)',
              padding: '4px',
              borderRadius: '2px'
            }}
          >
            <Link 
              to="/"
              style={{
                color: '#bff3ff',
                textDecoration: 'none',
                padding: '8px 14px',
                fontFamily: '"Orbitron", monospace',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0, 20, 40, 0.4)',
                border: '1px solid rgba(0, 225, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >HOME</Link>
            <span>•</span>
            <Link 
              to="/fics"
              style={{
                color: '#bff3ff',
                textDecoration: 'none',
                padding: '8px 14px',
                fontFamily: '"Orbitron", monospace',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0, 20, 40, 0.4)',
                border: '1px solid rgba(0, 225, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >FICS</Link>
            <span>•</span>
            <Link 
              to="/originals"
              style={{
                color: '#bff3ff',
                textDecoration: 'none',
                padding: '8px 14px',
                fontFamily: '"Orbitron", monospace',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0, 20, 40, 0.4)',
                border: '1px solid rgba(0, 225, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >ORIGINALS</Link>
            <span>•</span>
            <Link 
              to="/extras"
              style={{
                color: '#bff3ff',
                textDecoration: 'none',
                padding: '8px 14px',
                fontFamily: '"Orbitron", monospace',
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(0, 20, 40, 0.4)',
                border: '1px solid rgba(0, 225, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >EXTRAS</Link>
          </nav>

          <div 
            className="tron-status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#67f5c8',
              fontFamily: '"Orbitron", monospace',
              fontSize: '9px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              flexShrink: 0
            }}
          >
            <span 
              className="tron-status-indicator"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#67f5c8',
                boxShadow: '0 0 8px #67f5c8',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            ></span>
            FILE READER ONLINE
          </div>
        </header>

        <section className="tron-reader-layout" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <aside 
            className="tron-reader-sidebar"
            style={{
              width: '240px',
              minWidth: '240px',
              flexShrink: 0,
              background: 'rgba(0, 20, 40, 0.4)',
              border: '1px solid rgba(0, 225, 255, 0.3)',
              padding: '16px',
              borderRadius: '8px'
            }}
          >
            <div 
              className="tron-panel-title"
              style={{
                color: '#00e1ff',
                fontFamily: '"Orbitron", monospace',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '1px solid rgba(0, 225, 255, 0.3)',
                textShadow: '0 0 8px rgba(0, 225, 255, 0.6)'
              }}
            >FILE INDEX</div>

            <div className="tron-story-meta">
              <div className="tron-meta-row">
                <span className="tron-meta-label">TITLE</span>
                <span className="tron-meta-value">EF007E</span>
              </div>

              <div className="tron-meta-row">
                <span className="tron-meta-label">STATUS</span>
                <span className="tron-meta-value">ONGOING</span>
              </div>

              <div className="tron-meta-row">
                <span className="tron-meta-label">CURRENT</span>
                <span className="tron-meta-value">
                  {activeChapter.label.replace("Chapter ", "CH. ")}
                </span>
              </div>
            </div>

            <div 
              className="tron-chapter-select-wrap"
              style={{
                marginBottom: '16px'
              }}
            >
              <label 
                className="tron-select-label" 
                htmlFor="tron-chapter-select"
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: '#67f5c8',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textShadow: '0 0 6px rgba(103, 245, 200, 0.6)'
                }}
              >
                Select Chapter
              </label>

              <select
                id="tron-chapter-select"
                className="tron-chapter-select"
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 30, 60, 0.4)',
                  border: '1px solid rgba(0, 225, 255, 0.3)',
                  borderRadius: '0',
                  padding: '8px 12px',
                  color: '#bff3ff',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '10px',
                  fontWeight: '500',
                  letterSpacing: '0.04em',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 8px rgba(0, 225, 255, 0.1)',
                  appearance: 'none',
                  backgroundImage: 'linear-gradient(45deg, transparent 50%, rgba(0, 225, 255, 0.6) 50%), linear-gradient(135deg, rgba(0, 225, 255, 0.6) 50%, transparent 50%)',
                  backgroundPosition: 'calc(100% - 16px) calc(1em + 1px), calc(100% - 12px) calc(1em + 1px)',
                  backgroundSize: '4px 4px, 4px 4px',
                  backgroundRepeat: 'no-repeat'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 225, 255, 0.6)';
                  e.target.style.boxShadow = '0 0 15px rgba(0, 225, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 225, 255, 0.3)';
                  e.target.style.boxShadow = '0 0 10px rgba(0, 225, 255, 0.1)';
                }}
              >
                {EF007EChapters.map((chapter) => (
                  <option 
                    key={chapter.id} 
                    value={chapter.id}
                    style={{
                      background: '#041018',
                      color: '#bff3ff',
                      padding: '8px'
                    }}
                  >
                    {chapter.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tron-chapter-nav">
              <h4 style={{
                color: '#67f5c8',
                fontFamily: '"Orbitron", monospace',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                textShadow: '0 0 8px rgba(103, 245, 200, 0.6)'
              }}>Chapter Navigation</h4>
              {EF007EChapters.map((chapter) => (
                <button
                  key={chapter.id}
                  className={selectedChapterId === chapter.id ? 'active' : ''}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    margin: '3px 0',
                    padding: '6px 10px',
                    background: selectedChapterId === chapter.id 
                      ? 'rgba(0, 225, 255, 0.2)' 
                      : 'rgba(0, 20, 40, 0.4)',
                    border: selectedChapterId === chapter.id 
                      ? '1px solid rgba(0, 225, 255, 0.6)' 
                      : '1px solid rgba(0, 225, 255, 0.2)',
                    color: selectedChapterId === chapter.id 
                      ? '#00e1ff' 
                      : '#bff3ff',
                    fontFamily: '"Orbitron", monospace',
                    fontSize: '9px',
                    fontWeight: '500',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedChapterId === chapter.id 
                      ? '0 0 12px rgba(0, 225, 255, 0.3)' 
                      : 'none'
                  }}
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          </aside>

          <main 
            className="tron-reader-main"
            style={{
              flex: '1',
              minWidth: 0,
              background: 'rgba(0, 20, 40, 0.2)',
              border: '1px solid rgba(0, 225, 255, 0.2)',
              borderRadius: '8px',
              padding: '20px',
              overflow: 'hidden'
            }}
          >
            <section className="tron-story-header">
              <div 
                className="tron-eyebrow"
                style={{
                  color: '#67f5c8',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}
              >ARCHIVE ENTRY 001</div>
              <h1 
                className="tron-story-title"
                style={{
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '22px',
                  fontWeight: '900',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  margin: '0 0 8px 0',
                  textShadow: '0 0 16px rgba(0, 225, 255, 0.8), 0 0 32px rgba(0, 225, 255, 0.4)'
                }}
              >{activeChapter.label}</h1>
              <p 
                className="tron-story-subtitle"
                style={{
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  color: '#8fefff',
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  opacity: '0.9'
                }}
              >{activeChapter.summary}</p>

              <div 
                className="tron-tags"
                style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                  marginBottom: '8px'
                }}
              >
                <span style={{
                  background: 'rgba(0, 225, 255, 0.1)',
                  border: '1px solid rgba(0, 225, 255, 0.3)',
                  color: '#00e1ff',
                  padding: '3px 8px',
                  fontSize: '8px',
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>TRON</span>
                <span style={{
                  background: 'rgba(0, 225, 255, 0.1)',
                  border: '1px solid rgba(0, 225, 255, 0.3)',
                  color: '#00e1ff',
                  padding: '3px 8px',
                  fontSize: '8px',
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>SCI-FI</span>
                <span style={{
                  background: 'rgba(0, 225, 255, 0.1)',
                  border: '1px solid rgba(0, 225, 255, 0.3)',
                  color: '#00e1ff',
                  padding: '3px 8px',
                  fontSize: '8px',
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>ANGST</span>
                <span style={{
                  background: 'rgba(0, 225, 255, 0.1)',
                  border: '1px solid rgba(0, 225, 255, 0.3)',
                  color: '#00e1ff',
                  padding: '3px 8px',
                  fontSize: '8px',
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>INTERACTIVE POTENTIAL</span>
              </div>
            </section>

            <section 
              className="tron-reading-panel"
              style={{
                border: '1px solid rgba(0, 225, 255, 0.2)',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(7, 24, 38, 0.7), rgba(10, 30, 45, 0.65))',
                padding: '14px',
                marginTop: '12px'
              }}
            >
              <div 
                className="tron-panel-title"
                style={{
                  color: '#00e1ff',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(0, 225, 255, 0.3)',
                  textShadow: '0 0 10px rgba(0, 225, 255, 0.6)'
                }}
              >CHAPTER FILE</div>

              <div className="tron-chapter-content">
                {typeof activeChapter.content === 'string' ? (
                  <div 
                    className="tron-story-content" 
                    dangerouslySetInnerHTML={{ __html: activeChapter.content }}
                    style={{
                      fontFamily: 'Georgia, serif',
                      lineHeight: '1.8',
                      fontSize: '16px',
                      color: 'rgba(215, 251, 255, 0.95)'
                    }}
                  />
                ) : (
                  <div className="tron-story-content" style={{
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.6',
                    fontSize: '14px',
                    color: 'rgba(215, 251, 255, 0.95)'
                  }}>
                    {activeChapter.content.map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '12px' }}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
              
              <style jsx>{`
                .tron-story-content .hud {
                  background: linear-gradient(135deg, rgba(0, 20, 40, 0.9) 0%, rgba(0, 30, 60, 0.8) 100%);
                  border: 1px solid rgba(0, 225, 255, 0.4);
                  padding: 8px 12px 6px 12px;
                  margin: 8px 0 4px 0;
                  font-family: "Orbitron", monospace;
                  font-size: 11px;
                  box-shadow: 0 0 10px rgba(0, 225, 255, 0.15), inset 0 1px 0 rgba(0, 255, 200, 0.08);
                  border-radius: 3px;
                }
                
                .tron-story-content .hud-red {
                  background: linear-gradient(135deg, rgba(60, 0, 0, 0.95) 0%, rgba(80, 15, 15, 0.9) 50%, rgba(40, 5, 5, 0.95) 100%);
                  border: 2px solid rgba(255, 60, 60, 0.8);
                  box-shadow: 0 0 20px rgba(255, 60, 60, 0.4), inset 0 2px 0 rgba(255, 120, 120, 0.2), inset 0 -2px 0 rgba(120, 0, 0, 0.3);
                  padding: 12px 16px;
                  margin: 12px 0;
                  font-family: "Orbitron", monospace;
                  font-size: 11px;
                  border-radius: 4px;
                  position: relative;
                  text-align: center;
                }
                
                .tron-story-content .hud-critical {
                  background: 
                    linear-gradient(135deg, rgba(60, 0, 0, 0.95) 0%, rgba(80, 15, 15, 0.9) 50%, rgba(40, 5, 5, 0.95) 100%),
                    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 0, 0, 0.05) 2px, rgba(255, 0, 0, 0.05) 4px);
                  border: 2px solid rgba(255, 60, 60, 0.8);
                  box-shadow: 
                    0 0 25px rgba(255, 60, 60, 0.5),
                    inset 0 2px 0 rgba(255, 120, 120, 0.15),
                    inset 0 -2px 0 rgba(120, 0, 0, 0.4),
                    0 0 50px rgba(255, 0, 0, 0.2);
                  padding: 20px;
                  margin: 16px 0;
                  font-family: "Orbitron", monospace;
                  font-size: 13px;
                  border-radius: 0;
                  position: relative;
                  animation: error-flicker 0.15s infinite linear;
                  overflow: hidden;
                }
                
                .tron-story-content .error-header {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 12px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid rgba(255, 60, 60, 0.4);
                }
                
                .tron-story-content .error-icon {
                  font-size: 18px;
                  color: #ff3030;
                  animation: critical-pulse 1s infinite;
                }
                
                .tron-story-content .error-title {
                  font-weight: 800;
                  font-size: 14px;
                  color: #ffffff;
                  letter-spacing: 0.1em;
                  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
                }
                
                .tron-story-content .error-code {
                  font-family: "JetBrains Mono", monospace;
                  font-size: 10px;
                  color: #ff9999;
                  background: rgba(0, 0, 0, 0.3);
                  padding: 2px 6px;
                  border: 1px solid rgba(255, 60, 60, 0.3);
                }
                
                .tron-story-content .error-message {
                  text-align: center;
                  font-size: 16px;
                  font-weight: 700;
                  color: #ffffff;
                  margin: 12px 0;
                  text-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
                  animation: glitch-text 0.3s infinite;
                }
                
                .tron-story-content .system-status {
                  margin: 16px 0;
                  padding: 8px 0;
                  border-top: 1px solid rgba(255, 60, 60, 0.3);
                  border-bottom: 1px solid rgba(255, 60, 60, 0.3);
                }
                
                .tron-story-content .status-line {
                  display: flex;
                  justify-content: space-between;
                  margin: 4px 0;
                  font-size: 11px;
                }
                
                .tron-story-content .status-line .label {
                  color: #bbbbbb;
                  font-weight: 400;
                }
                
                .tron-story-content .status-line .value {
                  font-weight: 700;
                  font-family: "JetBrains Mono", monospace;
                }
                
                .tron-story-content .status-line .value.error {
                  color: #ff4444;
                  text-shadow: 0 0 6px rgba(255, 68, 68, 0.8);
                }
                
                .tron-story-content .status-line .value.critical {
                  color: #ff0000;
                  text-shadow: 0 0 8px rgba(255, 0, 0, 1);
                  animation: critical-pulse 0.8s infinite;
                }
                
                .tron-story-content .status-line .value.warning {
                  color: #ffaa00;
                  text-shadow: 0 0 6px rgba(255, 170, 0, 0.8);
                }
                
                .tron-story-content .stack-trace {
                  margin: 16px 0;
                }
                
                .tron-story-content .trace-header {
                  font-size: 10px;
                  color: #ff9999;
                  margin-bottom: 6px;
                  font-weight: 600;
                  letter-spacing: 0.1em;
                }
                
                .tron-story-content .trace-line {
                  font-family: "JetBrains Mono", monospace;
                  font-size: 10px;
                  color: #ffaaaa;
                  margin: 2px 0;
                  opacity: 0.9;
                  animation: data-corruption 3s infinite;
                }
                
                .tron-story-content .emergency-action {
                  margin-top: 16px;
                  padding-top: 12px;
                  border-top: 1px solid rgba(255, 60, 60, 0.4);
                }
                
                .tron-story-content .countdown-wrapper {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
                }
                
                .tron-story-content .action-label {
                  font-size: 12px;
                  font-weight: 700;
                  color: #ff6666;
                  letter-spacing: 0.1em;
                }
                
                .tron-story-content .countdown-timer {
                  font-family: "JetBrains Mono", monospace;
                  font-size: 16px;
                  font-weight: 900;
                  color: #ff0000;
                  text-shadow: 0 0 12px rgba(255, 0, 0, 1);
                  animation: critical-pulse 0.5s infinite;
                }
                
                .tron-story-content .progress-bar {
                  width: 100%;
                  height: 4px;
                  background: rgba(0, 0, 0, 0.5);
                  border: 1px solid rgba(255, 60, 60, 0.3);
                  position: relative;
                  overflow: hidden;
                }
                
                .tron-story-content .progress-fill {
                  height: 100%;
                  background: linear-gradient(90deg, #ff0000, #ff4444, #ff0000);
                  width: 0%;
                  transition: width 1s ease-out;
                  animation: progress-glow 1.5s ease-in-out infinite;
                }
                
                @keyframes progress-glow {
                  0%, 100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
                  50% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.8); }
                }
                
                @keyframes critical-flash {
                  0%, 50% { opacity: 1; }
                  25%, 75% { opacity: 0.3; }
                }
                
                /* Enhanced Diagnostic HUD */
                .tron-story-content .diagnostic-hud {
                  background: linear-gradient(135deg, rgba(0, 40, 60, 0.95) 0%, rgba(0, 60, 90, 0.9) 50%, rgba(0, 30, 50, 0.95) 100%);
                  border: 2px solid rgba(0, 200, 255, 0.6);
                  border-radius: 8px;
                  padding: 16px;
                  margin: 16px 0;
                  font-family: "Orbitron", monospace;
                  position: relative;
                  overflow: hidden;
                  box-shadow: 0 0 20px rgba(0, 200, 255, 0.3), inset 0 2px 0 rgba(0, 255, 255, 0.1);
                }
                
                .tron-story-content .hud-scan-line {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 2px;
                  background: linear-gradient(90deg, transparent, #00ccff, transparent);
                  animation: scan-sweep 3s linear infinite;
                }
                
                .tron-story-content .diag-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 12px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid rgba(0, 200, 255, 0.3);
                }
                
                .tron-story-content .diag-title {
                  color: #00ccff;
                  font-size: 12px;
                  font-weight: 700;
                  letter-spacing: 0.1em;
                }
                
                .tron-story-content .diag-timestamp {
                  color: #66ddff;
                  font-size: 10px;
                  font-family: "JetBrains Mono", monospace;
                  background: rgba(0, 0, 0, 0.3);
                  padding: 2px 6px;
                  border: 1px solid rgba(0, 200, 255, 0.3);
                }
                
                .tron-story-content .status-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 8px;
                  margin: 12px 0;
                }
                
                .tron-story-content .status-item {
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  padding: 6px 8px;
                  background: rgba(0, 0, 0, 0.2);
                  border: 1px solid rgba(0, 200, 255, 0.2);
                  border-radius: 3px;
                  font-size: 9px;
                }
                
                .tron-story-content .status-item.primary {
                  grid-column: span 2;
                  border-color: rgba(0, 255, 0, 0.4);
                  background: rgba(0, 40, 0, 0.2);
                }
                
                .tron-story-content .status-icon {
                  font-size: 8px;
                  width: 12px;
                  text-align: center;
                }
                
                .tron-story-content .status-name {
                  color: #88ddff;
                  font-weight: 500;
                  flex: 1;
                }
                
                .tron-story-content .status-value {
                  font-weight: 700;
                  font-family: "JetBrains Mono", monospace;
                }
                
                .tron-story-content .status-value.good {
                  color: #00ff88;
                  text-shadow: 0 0 4px rgba(0, 255, 136, 0.6);
                }
                
                .tron-story-content .status-value.warning {
                  color: #ffaa00;
                  text-shadow: 0 0 4px rgba(255, 170, 0, 0.6);
                }
                
                .tron-story-content .tactical-info {
                  margin: 12px 0;
                  padding: 8px 0;
                  border-top: 1px solid rgba(0, 200, 255, 0.2);
                }
                
                .tron-story-content .threat-level {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  font-size: 9px;
                }
                
                .tron-story-content .threat-label {
                  color: #ff6666;
                  font-weight: 600;
                  letter-spacing: 0.05em;
                }
                
                .tron-story-content .threat-bar {
                  flex: 1;
                  height: 6px;
                  background: rgba(0, 0, 0, 0.5);
                  border: 1px solid rgba(255, 100, 100, 0.3);
                  position: relative;
                  overflow: hidden;
                }
                
                .tron-story-content .threat-fill {
                  height: 100%;
                  background: linear-gradient(90deg, #ff4444, #ff0000);
                  transition: width 0.5s ease-out;
                  animation: threat-pulse 2s ease-in-out infinite;
                }
                
                .tron-story-content .threat-value {
                  color: #ff3030;
                  font-weight: 800;
                  text-shadow: 0 0 6px rgba(255, 48, 48, 0.8);
                }
                
                .tron-story-content .mission-directive {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 8px 12px;
                  background: linear-gradient(90deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.05));
                  border: 1px solid rgba(255, 60, 60, 0.4);
                  border-radius: 3px;
                  margin-top: 12px;
                }
                
                .tron-story-content .directive-label {
                  color: #ff9999;
                  font-size: 10px;
                  font-weight: 600;
                }
                
                .tron-story-content .directive-command {
                  color: #ff3030;
                  font-size: 11px;
                  font-weight: 800;
                  text-shadow: 0 0 6px rgba(255, 48, 48, 0.8);
                  animation: directive-pulse 1.5s ease-in-out infinite;
                }
                
                /* System Broadcast Styling */
                .tron-story-content .system-broadcast {
                  background: linear-gradient(135deg, rgba(0, 30, 50, 0.95) 0%, rgba(0, 50, 80, 0.9) 50%, rgba(0, 25, 45, 0.95) 100%);
                  border: 2px solid rgba(0, 150, 255, 0.6);
                  border-radius: 6px;
                  padding: 14px;
                  margin: 12px 0;
                  font-family: "Orbitron", monospace;
                  box-shadow: 0 0 15px rgba(0, 150, 255, 0.25);
                }
                
                .tron-story-content .broadcast-header {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  margin-bottom: 10px;
                  padding-bottom: 6px;
                  border-bottom: 1px solid rgba(0, 150, 255, 0.3);
                }
                
                .tron-story-content .broadcast-icon {
                  font-size: 12px;
                  color: #0088ff;
                }
                
                .tron-story-content .broadcast-origin {
                  color: #00aaff;
                  font-size: 10px;
                  font-weight: 700;
                  letter-spacing: 0.1em;
                }
                
                .tron-story-content .broadcast-priority {
                  margin-left: auto;
                  background: rgba(255, 150, 0, 0.2);
                  color: #ffaa00;
                  font-size: 8px;
                  padding: 2px 6px;
                  border: 1px solid rgba(255, 150, 0, 0.4);
                  border-radius: 2px;
                }
                
                .tron-story-content .message-header {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                  font-size: 9px;
                }
                
                .tron-story-content .msg-type {
                  color: #66bbff;
                  font-weight: 600;
                }
                
                .tron-story-content .msg-id {
                  color: #88ccff;
                  font-family: "JetBrains Mono", monospace;
                }
                
                .tron-story-content .message-body {
                  color: #ffffff;
                  font-size: 12px;
                  font-weight: 500;
                  line-height: 1.4;
                  margin: 8px 0;
                  text-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
                }
                
                .tron-story-content .broadcast-footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-top: 8px;
                  padding-top: 6px;
                  border-top: 1px solid rgba(0, 150, 255, 0.2);
                  font-size: 8px;
                }
                
                .tron-story-content .broadcast-time {
                  color: #99ddff;
                  font-family: "JetBrains Mono", monospace;
                }
                
                .tron-story-content .broadcast-status {
                  color: #00ff88;
                  font-weight: 600;
                }
                
                /* Arena Announcement Styling */
                .tron-story-content .arena-announcement {
                  background: linear-gradient(135deg, rgba(50, 20, 0, 0.95) 0%, rgba(80, 40, 0, 0.9) 50%, rgba(40, 15, 0, 0.95) 100%);
                  border: 2px solid rgba(255, 150, 0, 0.8);
                  border-radius: 8px;
                  padding: 16px;
                  margin: 16px 0;
                  font-family: "Orbitron", monospace;
                  box-shadow: 0 0 20px rgba(255, 150, 0, 0.3);
                }
                
                .tron-story-content .announcement-header {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 12px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid rgba(255, 150, 0, 0.4);
                }
                
                .tron-story-content .arena-icon {
                  font-size: 14px;
                  color: #ffaa00;
                }
                
                .tron-story-content .arena-title {
                  color: #ffcc00;
                  font-size: 12px;
                  font-weight: 800;
                  letter-spacing: 0.1em;
                }
                
                .tron-story-content .match-status {
                  margin-left: auto;
                  background: rgba(255, 0, 0, 0.2);
                  color: #ff6666;
                  font-size: 9px;
                  padding: 3px 8px;
                  border: 1px solid rgba(255, 0, 0, 0.4);
                  border-radius: 3px;
                  font-weight: 700;
                }
                
                .tron-story-content .match-display {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin: 12px 0;
                  padding: 12px 0;
                }
                
                .tron-story-content .competitor {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 4px;
                }
                
                .tron-story-content .player-id {
                  font-size: 10px;
                  font-weight: 600;
                  color: #ffaa00;
                  font-family: "JetBrains Mono", monospace;
                }
                
                .tron-story-content .player-id.threat {
                  color: #ff3030;
                  text-shadow: 0 0 6px rgba(255, 48, 48, 0.8);
                  animation: threat-glow 1.5s ease-in-out infinite;
                }
                
                .tron-story-content .player-name {
                  font-size: 12px;
                  font-weight: 700;
                  color: #ffffff;
                  text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
                }
                
                .tron-story-content .player-name.corrupted {
                  color: #ff6666;
                  text-shadow: 0 0 6px rgba(255, 102, 102, 0.8);
                  animation: corruption-flicker 0.3s infinite;
                }
                
                .tron-story-content .versus-separator {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 4px;
                }
                
                .tron-story-content .vs-text {
                  font-size: 14px;
                  font-weight: 900;
                  color: #ffdd00;
                  text-shadow: 0 0 8px rgba(255, 221, 0, 0.8);
                }
                
                .tron-story-content .vs-line {
                  width: 40px;
                  height: 2px;
                  background: linear-gradient(90deg, transparent, #ffaa00, transparent);
                }
                
                .tron-story-content .match-info {
                  margin-top: 12px;
                  padding-top: 8px;
                  border-top: 1px solid rgba(255, 150, 0, 0.3);
                }
                
                .tron-story-content .arena-stats {
                  display: flex;
                  justify-content: space-between;
                  font-size: 8px;
                  color: #ffcc88;
                }
                
                .tron-story-content .stat-item {
                  font-family: "JetBrains Mono", monospace;
                  font-weight: 500;
                }
                
                .tron-story-content .hud-critical::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: 
                    repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      rgba(255, 0, 0, 0.03) 1px,
                      transparent 2px,
                      rgba(255, 0, 0, 0.02) 3px
                    );
                  pointer-events: none;
                  opacity: 0.7;
                  animation: static-lines 0.1s infinite linear;
                }
                
                @keyframes static-lines {
                  0% { transform: translateY(0px); }
                  100% { transform: translateY(4px); }
                }
                
                .tron-story-content .hud-white {
                  background: linear-gradient(135deg, rgba(40, 40, 50, 0.9) 0%, rgba(50, 50, 60, 0.8) 100%);
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  box-shadow: 0 0 12px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08);
                  padding: 8px 12px;
                  margin: 10px 0;
                  font-family: "Orbitron", monospace;
                  font-size: 10px;
                  border-radius: 3px;
                }
                
                .tron-story-content .hud-compact {
                  padding: 6px 10px;
                  margin: 8px 0;
                  font-size: 9px;
                }
                
                .tron-story-content .hud-header {
                  color: #00e1ff;
                  font-weight: 600;
                  letter-spacing: 0.08em;
                  text-transform: uppercase;
                  margin-bottom: 4px;
                  font-size: 10px;
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  gap: 4px;
                }
                
                .tron-story-content .hud-line {
                  border: none;
                  height: 1px;
                  background: linear-gradient(90deg, transparent 0%, rgba(0, 225, 255, 0.6) 50%, transparent 100%);
                  margin: 4px 0;
                }
                
                .tron-story-content .hud-msg {
                  color: #bff3ff;
                  font-size: 11px;
                  letter-spacing: 0.04em;
                  line-height: 1.3;
                  margin: 4px 0;
                }
                
                .tron-story-content .hud-warn {
                  color: #ffaa00;
                  font-weight: 600;
                  font-size: 11px;
                  text-shadow: 0 0 4px rgba(255, 170, 0, 0.6);
                }
                
                .tron-story-content .hud-label {
                  color: #67f5c8;
                  font-weight: 600;
                  text-shadow: 0 0 4px rgba(103, 245, 200, 0.5);
                }
                
                .tron-story-content .hud-value {
                  color: #00e1ff;
                  font-weight: 700;
                  text-shadow: 0 0 6px rgba(0, 225, 255, 0.6);
                }
                
                .tron-story-content .hud-dim {
                  color: rgba(191, 243, 255, 0.6);
                  font-weight: 400;
                }
                
                .tron-story-content .critical {
                  color: #ff3030;
                  text-shadow: 0 0 8px rgba(255, 48, 48, 0.8);
                  font-weight: 700;
                }
                
                .tron-story-content .error-line {
                  color: #ffffff;
                  font-weight: 700;
                  font-size: 16px;
                  text-shadow: 
                    0 0 8px rgba(255, 255, 255, 0.9),
                    0 0 15px rgba(255, 60, 60, 0.6);
                  letter-spacing: 0.1em;
                  margin: 8px 0;
                  text-align: center;
                  animation: glitch-text 0.3s infinite;
                  position: relative;
                }
                
                .tron-story-content .crash-line {
                  color: #ff8888;
                  font-weight: 400;
                  font-size: 12px;
                  opacity: 0.85;
                  margin: 3px 0;
                  font-family: "JetBrains Mono", "Consolas", monospace;
                  text-align: center;
                  animation: data-corruption 2s infinite;
                  filter: blur(0.2px);
                }
                
                .tron-story-content .reboot-warning {
                  color: #ff9999;
                  font-weight: 800;
                  font-size: 12px;
                  text-shadow: 0 0 8px rgba(255, 153, 153, 0.9);
                  letter-spacing: 0.1em;
                  margin-top: 8px;
                  animation: pulse-error 1.5s infinite;
                  text-align: center;
                }
                
                .tron-story-content .countdown {
                  color: #ff3030;
                  font-weight: 900;
                  font-size: 15px;
                  text-shadow: 
                    0 0 10px rgba(255, 48, 48, 1),
                    0 0 20px rgba(255, 0, 0, 0.8);
                  letter-spacing: 0.15em;
                  margin-top: 10px;
                  animation: critical-pulse 0.8s infinite;
                  text-align: center;
                  text-transform: uppercase;
                }
                
                @keyframes pulse-error {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.7; transform: scale(1.02); }
                }
                
                @keyframes error-flicker {
                  0%, 94%, 100% { opacity: 1; }
                  95%, 97% { opacity: 0.95; }
                  96% { opacity: 0.92; transform: translate(1px, 0); }
                  98% { opacity: 0.97; transform: translate(-1px, 0); }
                }
                
                @keyframes glitch-text {
                  0%, 90%, 100% { 
                    transform: translate(0, 0);
                    filter: hue-rotate(0deg);
                  }
                  91% { 
                    transform: translate(-1px, 0);
                    filter: hue-rotate(5deg);
                  }
                  92% { 
                    transform: translate(1px, 0);
                    filter: hue-rotate(-5deg);
                  }
                  93% { 
                    transform: translate(0, -1px);
                    filter: hue-rotate(3deg);
                  }
                  94% { 
                    transform: translate(0, 1px);
                    filter: hue-rotate(-3deg);
                  }
                }
                
                @keyframes data-corruption {
                  0%, 85%, 100% { 
                    transform: translateX(0);
                    opacity: 0.85;
                  }
                  86% { 
                    transform: translateX(-2px);
                    opacity: 0.7;
                  }
                  87% { 
                    transform: translateX(2px);
                    opacity: 0.9;
                  }
                  88% { 
                    transform: translateX(-1px);
                    opacity: 0.6;
                  }
                }
                
                @keyframes critical-pulse {
                  0%, 50%, 100% { 
                    transform: scale(1);
                    text-shadow: 
                      0 0 10px rgba(255, 48, 48, 1),
                      0 0 20px rgba(255, 0, 0, 0.8);
                  }
                  25% { 
                    transform: scale(1.05);
                    text-shadow: 
                      0 0 15px rgba(255, 48, 48, 1),
                      0 0 25px rgba(255, 0, 0, 0.9),
                      0 0 30px rgba(255, 0, 0, 0.5);
                  }
                  75% { 
                    transform: scale(0.98);
                    text-shadow: 
                      0 0 8px rgba(255, 48, 48, 1),
                      0 0 18px rgba(255, 0, 0, 0.7);
                  }
                }
                
                @keyframes countdown-blink {
                  0%, 50% { opacity: 1; }
                  51%, 100% { opacity: 0.3; }
                }
                
                @keyframes scan-sweep {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
                
                @keyframes threat-pulse {
                  0%, 100% { opacity: 0.8; }
                  50% { opacity: 1; }
                }
                
                @keyframes directive-pulse {
                  0%, 100% { text-shadow: 0 0 6px rgba(255, 48, 48, 0.8); }
                  50% { text-shadow: 0 0 12px rgba(255, 48, 48, 1), 0 0 18px rgba(255, 0, 0, 0.6); }
                }
                
                @keyframes threat-glow {
                  0%, 100% { text-shadow: 0 0 6px rgba(255, 48, 48, 0.8); }
                  50% { text-shadow: 0 0 10px rgba(255, 48, 48, 1), 0 0 15px rgba(255, 0, 0, 0.8); }
                }
                
                @keyframes corruption-flicker {
                  0%, 90%, 100% { opacity: 1; }
                  95% { opacity: 0.7; }
                }
                
                .tron-story-content .glitchy {
                  animation: hud-glitch 0.1s infinite linear alternate-reverse;
                }
                
                .tron-story-content .glitch {
                  animation: text-glitch 0.3s ease-in-out infinite;
                }
                
                @keyframes hud-glitch {
                  0% { clip: rect(32px, 9999px, 34px, 0); transform: skew(0.3deg); }
                  20% { clip: rect(8px, 9999px, 45px, 0); transform: skew(0.1deg); }
                  40% { clip: rect(65px, 9999px, 22px, 0); transform: skew(0.4deg); }
                  60% { clip: rect(12px, 9999px, 38px, 0); transform: skew(0.15deg); }
                  80% { clip: rect(75px, 9999px, 18px, 0); transform: skew(0.2deg); }
                  100% { clip: rect(0px, 9999px, 0px, 0); transform: skew(0deg); }
                }
                
                @keyframes text-glitch {
                  0%, 100% { transform: translateX(0); filter: hue-rotate(0deg); }
                  25% { transform: translateX(-1px); filter: hue-rotate(90deg); }
                  50% { transform: translateX(1px); filter: hue-rotate(180deg); }
                  75% { transform: translateX(-0.5px); filter: hue-rotate(270deg); }
                }
                
                .tron-story-content .matrix-rain {
                  position: relative;
                  height: 160px;
                  margin: 16px 0;
                  background: rgba(0, 0, 0, 0.95);
                  border: 1px solid rgba(0, 204, 255, 0.3);
                  border-radius: 6px;
                  overflow: hidden;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                
                .tron-story-content .matrix-rain::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 204, 255, 0.03) 2px,
                    rgba(0, 204, 255, 0.03) 4px
                  );
                  pointer-events: none;
                }
                
                .tron-story-content .rain-letter {
                  position: absolute;
                  color: #00ccff;
                  font-family: "Orbitron", monospace;
                  font-size: 14px;
                  font-weight: 700;
                  text-shadow: 0 0 8px rgba(0, 204, 255, 0.8);
                  animation: matrix-rain-fall 4s linear infinite;
                }
                
                .tron-story-content .rain-letter:nth-child(1) { 
                  left: 7%; 
                  animation-delay: -0.3s;
                  animation-duration: 3.8s;
                }
                .tron-story-content .rain-letter:nth-child(2) { 
                  left: 23%; 
                  animation-delay: -1.7s;
                  animation-duration: 4.2s;
                }
                .tron-story-content .rain-letter:nth-child(3) { 
                  left: 41%; 
                  animation-delay: -0.9s;
                  animation-duration: 3.5s;
                }
                .tron-story-content .rain-letter:nth-child(4) { 
                  left: 58%; 
                  animation-delay: -2.1s;
                  animation-duration: 4.6s;
                }
                .tron-story-content .rain-letter:nth-child(5) { 
                  left: 74%; 
                  animation-delay: -0.6s;
                  animation-duration: 3.9s;
                }
                .tron-story-content .rain-letter:nth-child(6) { 
                  left: 19%; 
                  animation-delay: -3.2s;
                  animation-duration: 4.1s;
                }
                .tron-story-content .rain-letter:nth-child(7) { 
                  left: 36%; 
                  animation-delay: -1.4s;
                  animation-duration: 3.7s;
                }
                .tron-story-content .rain-letter:nth-child(8) { 
                  left: 52%; 
                  animation-delay: -2.8s;
                  animation-duration: 4.3s;
                }
                .tron-story-content .rain-letter:nth-child(9) { 
                  left: 81%; 
                  animation-delay: -0.2s;
                  animation-duration: 4.0s;
                }
                
                @keyframes matrix-rain-fall {
                  0% {
                    top: -20px;
                    opacity: 0;
                    color: #ffffff;
                    transform: scale(0.8) translateX(0px);
                  }
                  10% {
                    opacity: 0.8;
                    color: #88ccff;
                    transform: scale(0.9) translateX(-2px);
                  }
                  20% {
                    opacity: 1;
                    color: #00ccff;
                    transform: scale(1) translateX(1px);
                  }
                  50% {
                    opacity: 1;
                    color: #00ccff;
                    transform: scale(1) translateX(-1px);
                  }
                  80% {
                    opacity: 1;
                    color: #00ccff;
                    transform: scale(1) translateX(2px);
                  }
                  90% {
                    opacity: 0.6;
                    color: #004488;
                    transform: scale(0.9) translateX(0px);
                  }
                  100% {
                    top: 220px;
                    opacity: 0;
                    color: #002244;
                    transform: scale(0.7) translateX(-1px);
                  }
                }
                
                .tron-story-content .red {
                  color: #ff3030;
                  font-weight: 700;
                  text-shadow: 0 0 8px rgba(255, 48, 48, 0.8);
                }
              `}</style>

              <div className="tron-callout">
                <div className="tron-callout-title">SYSTEM NOTE</div>
                <p>
                  This space can hold in-universe notes, corrupted inserts,
                  faux-terminal interruptions, or file fragments later.
                </p>
              </div>
            </section>

            <section 
              className="tron-reader-footer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(0, 225, 255, 0.2)'
              }}
            >
              <button
                className="tron-secondary"
                onClick={() => {
                  const currentIndex = EF007EChapters.findIndex(
                    (chapter) => chapter.id === selectedChapterId
                  );
                  if (currentIndex > 0) {
                    setSelectedChapterId(EF007EChapters[currentIndex - 1].id);
                  }
                }}
                style={{
                  background: 'rgba(0, 30, 60, 0.4)',
                  border: '1px solid rgba(0, 225, 255, 0.3)',
                  color: '#bff3ff',
                  padding: '8px 18px',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 40, 80, 0.6)';
                  e.target.style.borderColor = 'rgba(0, 225, 255, 0.6)';
                  e.target.style.boxShadow = '0 0 15px rgba(0, 225, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 30, 60, 0.4)';
                  e.target.style.borderColor = 'rgba(0, 225, 255, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                PREVIOUS CHAPTER
              </button>

              <button
                className="tron-primary"
                onClick={() => {
                  const currentIndex = EF007EChapters.findIndex(
                    (chapter) => chapter.id === selectedChapterId
                  );
                  if (currentIndex < EF007EChapters.length - 1) {
                    setSelectedChapterId(EF007EChapters[currentIndex + 1].id);
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 225, 255, 0.2), rgba(103, 245, 200, 0.15))',
                  border: '1px solid rgba(0, 225, 255, 0.6)',
                  color: '#00e1ff',
                  padding: '8px 18px',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  textShadow: '0 0 8px rgba(0, 225, 255, 0.8)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(0, 225, 255, 0.4), rgba(103, 245, 200, 0.3))';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 225, 255, 0.5)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(0, 225, 255, 0.2), rgba(103, 245, 200, 0.15))';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                NEXT CHAPTER
              </button>
            </section>

            <section 
              className="tron-comment-panel"
              style={{
                border: '1px solid rgba(0, 225, 255, 0.2)',
                borderRadius: '16px',
                background: 'rgba(0, 20, 40, 0.3)',
                padding: '14px',
                marginTop: '20px'
              }}
            >
              <div 
                className="tron-panel-title"
                style={{
                  color: '#00e1ff',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(0, 225, 255, 0.3)',
                  textShadow: '0 0 10px rgba(0, 225, 255, 0.6)'
                }}
              >LEAVE A SIGNAL</div>

              <form className="tron-comment-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 30, 60, 0.4)',
                    border: '1px solid rgba(0, 225, 255, 0.3)',
                    borderRadius: '0',
                    padding: '8px',
                    color: '#bff3ff',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '12px',
                    marginBottom: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(0, 225, 255, 0.6)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 225, 255, 0.2)';
                    e.target.style.background = 'rgba(0, 30, 60, 0.6)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 225, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(0, 30, 60, 0.4)';
                  }}
                />

                <textarea
                  rows="4"
                  placeholder="Leave your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    resize: 'vertical',
                    background: 'rgba(0, 30, 60, 0.4)',
                    border: '1px solid rgba(0, 225, 255, 0.3)',
                    borderRadius: '0',
                    padding: '8px',
                    color: '#bff3ff',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '12px',
                    marginBottom: '12px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(0, 225, 255, 0.6)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 225, 255, 0.2)';
                    e.target.style.background = 'rgba(0, 30, 60, 0.6)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 225, 255, 0.3)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(0, 30, 60, 0.4)';
                  }}
                />

                <button 
                  type="submit" 
                  className="tron-primary"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 225, 255, 0.2), rgba(103, 245, 200, 0.15))',
                    border: '1px solid rgba(0, 225, 255, 0.6)',
                    color: '#00e1ff',
                    padding: '8px 18px',
                    fontFamily: '"Orbitron", monospace',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textShadow: '0 0 8px rgba(0, 225, 255, 0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(0, 225, 255, 0.4), rgba(103, 245, 200, 0.3))';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 225, 255, 0.5)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(0, 225, 255, 0.2), rgba(103, 245, 200, 0.15))';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  SUBMIT SIGNAL
                </button>
              </form>

              {submitted && (
                <div 
                  className="tron-comment-success"
                  style={{
                    color: '#67f5c8',
                    fontFamily: '"Orbitron", monospace',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '8px',
                    textShadow: '0 0 6px rgba(103, 245, 200, 0.6)',
                    padding: '8px 12px',
                    border: '1px solid rgba(103, 245, 200, 0.3)',
                    borderRadius: '6px',
                    background: 'rgba(103, 245, 200, 0.05)',
                    textAlign: 'center'
                  }}
                >
                  Signal recorded. It should now appear on the homepage.
                </div>
              )}
            </section>
          </main>
        </section>
      </div>
    </div>
  );
}