import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, LEVEL_IMAGES, generateDeck } from '../data/matchGameData';
import './MatchGame.css';

export default function MatchGame() {
  // ===== STATE =====
  const [screen, setScreen] = useState('menu'); // 'menu' | 'playing' | 'levelComplete' | 'gameComplete'
  const [currentLevel, setCurrentLevel] = useState(0); // index into LEVELS
  const [completedLevels, setCompletedLevels] = useState(new Set());
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices of currently flipped cards
  const [matched, setMatched] = useState(new Set()); // pairIds that have been matched
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [locked, setLocked] = useState(false); // prevent clicks during flip-back
  const [failed, setFailed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0); // 0-1, how much of photo is revealed

  const timerRef = useRef(null);

  const config = LEVELS[currentLevel];
  const secretUnlocked = completedLevels.size >= 10;

  const bgLayer = (
    <div className="mg-bg-layer">
      <div className="mg-bg-orb" />
      <div className="mg-bg-orb" />
      <div className="mg-bg-orb" />
      <div className="mg-bg-orb" />
      <div className="mg-bg-orb" />
      <div className="mg-bg-stars" />
    </div>
  );

  // ===== TIMER =====
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timerRef.current);
    }
    if (timerActive && timeLeft === 0 && config?.timeLimit > 0) {
      // Time's up
      setTimerActive(false);
      setFailed(true);
    }
  }, [timerActive, timeLeft, config]);

  // ===== REVEAL PROGRESS =====
  useEffect(() => {
    if (config && cards.length > 0) {
      setRevealProgress(matched.size / config.pairs);
    }
  }, [matched, config, cards]);

  // ===== START LEVEL =====
  const startLevel = useCallback((levelIdx) => {
    const lvl = LEVELS[levelIdx];
    if (!lvl) return;
    setCurrentLevel(levelIdx);
    setCards(generateDeck(levelIdx));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setFailed(false);
    setRevealProgress(0);
    setLocked(false);
    if (lvl.timeLimit > 0) {
      setTimeLeft(lvl.timeLimit);
      setTimerActive(true);
    } else {
      setTimeLeft(0);
      setTimerActive(false);
    }
    setScreen('playing');
  }, []);

  // ===== CARD CLICK =====
  const handleCardClick = useCallback((index) => {
    if (locked || failed) return;
    if (flipped.includes(index)) return;
    if (matched.has(cards[index]?.pairId)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].pairId === cards[second].pairId) {
        // Match!
        const newMatched = new Set([...matched, cards[first].pairId]);
        setMatched(newMatched);
        setFlipped([]);

        // Check win
        if (newMatched.size === config.pairs) {
          setTimerActive(false);
          const newCompleted = new Set([...completedLevels, currentLevel]);
          setCompletedLevels(newCompleted);
          setTimeout(() => setScreen('levelComplete'), 600);
        }
      } else {
        // No match — flip back after delay
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, config.flipBackDelay);
      }
    }
  }, [locked, failed, flipped, matched, cards, config, currentLevel, completedLevels]);

  // ===== RETRY =====
  const retry = useCallback(() => {
    startLevel(currentLevel);
  }, [currentLevel, startLevel]);

  // ===== NEXT LEVEL =====
  const nextLevel = useCallback(() => {
    if (currentLevel < LEVELS.length - 1) {
      // Skip secret level unless unlocked
      const next = currentLevel + 1;
      if (LEVELS[next]?.secret && !secretUnlocked) {
        setScreen('gameComplete');
      } else {
        startLevel(next);
      }
    } else {
      setScreen('gameComplete');
    }
  }, [currentLevel, secretUnlocked, startLevel]);

  // ===== RENDER: MENU =====
  if (screen === 'menu') {
    return (
      <div className="match-game">
        {bgLayer}
        <Link to="/" className="mg-home-link">HOME</Link>
        <Link to="/extras" className="mg-back-link">&lt; RETURN TO EXTRAS</Link>
        <div className="mg-menu">
          <div className="mg-title-group">
            <div className="mg-logo-icon">🪷</div>
            <div className="mg-title">Serenity Match</div>
            <div className="mg-subtitle">Match the cards. Reveal the image.</div>
            <div className="mg-divider"><span>✦</span></div>
          </div>
          <div className="mg-level-grid">
            {LEVELS.map((lvl, i) => {
              const isCompleted = completedLevels.has(i);
              const isSecret = lvl.secret;
              const isLocked = isSecret && !secretUnlocked;
              const previewEmojis = ['💆', '🧴', '🕯️', '🌿', '💎', '🧘', '🌸', '♨️', '🫧', '🪷', '✨'];
              const diffLabel = i <= 2 ? 'Easy' : i <= 5 ? 'Medium' : i <= 8 ? 'Hard' : 'Expert';
              return (
                <button
                  key={i}
                  className={`mg-level-btn ${isCompleted ? 'completed' : ''} ${isSecret ? 'secret' : ''} ${isLocked ? 'locked' : ''}`}
                  onClick={() => !isLocked && startLevel(i)}
                  disabled={isLocked}
                >
                  <div className="mg-level-emoji">{isLocked ? '🔒' : isCompleted ? '✅' : previewEmojis[i]}</div>
                  <div className="mg-level-num">{isSecret ? '?' : lvl.level}</div>
                  <div className="mg-level-info">
                    {isLocked ? 'Locked' : isCompleted ? 'Complete' : `${lvl.pairs * 2} cards`}
                  </div>
                  {!isLocked && !isCompleted && (
                    <div className={`mg-level-diff mg-diff-${diffLabel.toLowerCase()}`}>{diffLabel}</div>
                  )}
                  {lvl.timeLimit > 0 && !isLocked && !isCompleted && (
                    <div className="mg-level-timer">⏱ {lvl.timeLimit}s</div>
                  )}
                </button>
              );
            })}
          </div>
          {secretUnlocked && (
            <div className="mg-secret-msg">✨ Secret level unlocked!</div>
          )}
        </div>
      </div>
    );
  }

  // ===== RENDER: LEVEL COMPLETE =====
  if (screen === 'levelComplete') {
    const imgData = LEVEL_IMAGES[currentLevel];
    const isLastNormal = currentLevel === 9;
    const isSecret = config?.secret;
    return (
      <div className="match-game">
        {bgLayer}
        <Link to="/" className="mg-home-link">HOME</Link>
        <div className="mg-complete">
          <div className="mg-complete-title">
            {isSecret ? '✨ Secret Level Complete! ✨' : `Level ${config.level} Complete!`}
          </div>
          <div className="mg-complete-stats">
            <span>Moves: {moves}</span>
            {config.timeLimit > 0 && <span>Time remaining: {timeLeft}s</span>}
          </div>
          <div className="mg-reveal-frame">
            {imgData?.src ? (
              <img src={imgData.src} alt={imgData.alt} className="mg-reveal-img" />
            ) : (
              <div
                className="mg-reveal-placeholder"
                style={{ background: imgData?.placeholder }}
              >
                <div className="mg-placeholder-text">
                  {isSecret ? '✨ Secret Image ✨' : `Image ${config.level}`}
                </div>
                <div className="mg-placeholder-sub">Photo will be added here</div>
              </div>
            )}
          </div>
          <div className="mg-complete-actions">
            <button className="mg-btn" onClick={retry}>Replay</button>
            {(currentLevel < LEVELS.length - 1 || (isLastNormal && secretUnlocked)) && (
              <button className="mg-btn mg-btn-primary" onClick={nextLevel}>
                {isLastNormal && secretUnlocked ? 'Secret Level →' : 'Next Level →'}
              </button>
            )}
            <button className="mg-btn" onClick={() => setScreen('menu')}>Level Select</button>
          </div>
        </div>
      </div>
    );
  }

  // ===== RENDER: GAME COMPLETE =====
  if (screen === 'gameComplete') {
    return (
      <div className="match-game">
        {bgLayer}
        <Link to="/" className="mg-home-link">HOME</Link>
        <div className="mg-complete">
          <div className="mg-complete-title">
            {secretUnlocked ? '🎉 All Levels Complete!' : '🎉 Congratulations!'}
          </div>
          <div className="mg-complete-stats">
            <span>{completedLevels.size} / {LEVELS.length} levels completed</span>
          </div>
          {!secretUnlocked && completedLevels.size >= 10 && (
            <div className="mg-secret-msg">✨ A secret level has appeared...</div>
          )}
          <div className="mg-complete-actions">
            <button className="mg-btn mg-btn-primary" onClick={() => setScreen('menu')}>Level Select</button>
            <Link to="/extras" className="mg-btn">Back to Extras</Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== RENDER: PLAYING =====
  const rows = Math.ceil((config.pairs * 2) / config.cols);

  return (
    <div className="match-game">
      {bgLayer}
      <Link to="/" className="mg-home-link">HOME</Link>
      <div className="mg-play-area">
        {/* HUD */}
        <div className="mg-hud">
          <button className="mg-hud-btn" onClick={() => setScreen('menu')}>&lt; Levels</button>
          <div className="mg-hud-center">
            <div className="mg-hud-level">
              {config.secret ? '✨ Secret Level' : `Level ${config.level}`}
            </div>
            {config.rule && <div className="mg-hud-rule">{config.rule}</div>}
          </div>
          <div className="mg-hud-stats">
            <span className="mg-stat">Moves: {moves}</span>
            {config.timeLimit > 0 && (
              <span className={`mg-stat mg-timer ${timeLeft <= 10 ? 'critical' : ''}`}>
                ⏱ {timeLeft}s
              </span>
            )}
          </div>
        </div>

        {/* GAME BOARD — photo underneath with card grid on top */}
        <div className="mg-board-wrapper">
          {/* Background photo that unblurs as matches are made */}
          <div className="mg-photo-layer" style={{
            background: LEVEL_IMAGES[currentLevel]?.src
              ? `url(${LEVEL_IMAGES[currentLevel].src}) center/cover`
              : LEVEL_IMAGES[currentLevel]?.placeholder,
            filter: `blur(${Math.round((1 - revealProgress) * 20)}px)`,
          }} />

          {/* Card grid */}
          <div
            className="mg-card-grid"
            style={{
              gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {cards.map((card, i) => {
              const isFlipped = flipped.includes(i);
              const isMatched = matched.has(card.pairId);
              return (
                <div
                  key={card.id}
                  className={`mg-card-slot ${isMatched ? 'slot-cleared' : ''}`}
                >
                  <button
                    className={`mg-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                    onClick={() => handleCardClick(i)}
                    disabled={isMatched}
                  >
                    <div className="mg-card-inner">
                      <div className="mg-card-front">
                        <span className="mg-card-back-icon">🪷</span>
                      </div>
                      <div className="mg-card-back">
                        <span className="mg-card-symbol">{card.symbol}</span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAIL OVERLAY */}
        {failed && (
          <div className="mg-fail-overlay">
            <div className="mg-fail-box">
              <div className="mg-fail-title">Time's Up!</div>
              <div className="mg-fail-sub">
                You matched {matched.size} / {config.pairs} pairs
              </div>
              <div className="mg-complete-actions">
                <button className="mg-btn mg-btn-primary" onClick={retry}>Try Again</button>
                <button className="mg-btn" onClick={() => setScreen('menu')}>Level Select</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
