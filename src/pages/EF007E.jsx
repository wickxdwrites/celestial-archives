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
                  padding: 8px 12px;
                  margin: 10px 0;
                  font-family: "Orbitron", monospace;
                  font-size: 10px;
                  box-shadow: 0 0 12px rgba(0, 225, 255, 0.15), inset 0 1px 0 rgba(0, 255, 200, 0.08);
                  border-radius: 3px;
                }
                
                .tron-story-content .hud-red {
                  background: linear-gradient(135deg, rgba(40, 0, 0, 0.9) 0%, rgba(60, 10, 10, 0.8) 100%);
                  border: 1px solid rgba(255, 80, 80, 0.6);
                  box-shadow: 0 0 12px rgba(255, 80, 80, 0.2), inset 0 1px 0 rgba(255, 100, 100, 0.15);
                  padding: 8px 12px;
                  margin: 10px 0;
                  font-family: "Orbitron", monospace;
                  font-size: 10px;
                  border-radius: 3px;
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
                  margin-bottom: 6px;
                  font-size: 9px;
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  gap: 6px;
                }
                
                .tron-story-content .hud-line {
                  border: none;
                  height: 1px;
                  background: linear-gradient(90deg, transparent 0%, rgba(0, 225, 255, 0.6) 50%, transparent 100%);
                  margin: 6px 0;
                }
                
                .tron-story-content .hud-msg {
                  color: #bff3ff;
                  font-size: 11px;
                  letter-spacing: 0.05em;
                  line-height: 1.4;
                  margin: 6px 0;
                }
                
                .tron-story-content .hud-warn {
                  color: #ffaa00;
                  font-weight: 700;
                  text-shadow: 0 0 6px rgba(255, 170, 0, 0.6);
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