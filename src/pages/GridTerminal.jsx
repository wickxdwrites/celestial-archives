import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CREDENTIALS,
  FILES,
  HINT_PROMPTS,
  generateResponse,
  resetResponseTracking,
  IX_TRIGGER_PATTERN,
  corruptMessage,
} from '../data/EF007E/terminalData';
import './GridTerminal.css';

export default function GridTerminal() {
  // ===== STATE =====
  const [screen, setScreen] = useState('login'); // 'login' | 'terminal'
  const [char, setChar] = useState(null); // 'shane' | 'ix'
  const [bond, setBond] = useState(0);
  const [integrity, setIntegrity] = useState(100);
  const [messages, setMessages] = useState([]);
  const [msgCount, setMsgCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [typingChar, setTypingChar] = useState(null);
  const [inputText, setInputText] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [fileOverlay, setFileOverlay] = useState(null); // index or null
  const [toastText, setToastText] = useState(null);
  const [unlockedFiles, setUnlockedFiles] = useState(new Set());
  const [glitching, setGlitching] = useState(false);
  const [ixTakeover, setIxTakeover] = useState(false);
  const [takeoverFlash, setTakeoverFlash] = useState(false);
  const [corruptionPressure, setCorruptionPressure] = useState(0);
  const [takeoverMsgCount, setTakeoverMsgCount] = useState(0);
  const [inputLocked, setInputLocked] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState(new Set());
  const [ilyaTerminated, setIlyaTerminated] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const toastTimerRef = useRef(null);

  // ===== HELPERS =====
  const isIlya = char === 'ilya';
  const respondingChar = isIlya ? 'shane' : 'ilya';

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingChar, scrollToBottom]);

  // ===== STATUS HELPERS =====
  const integrityClass = integrity <= 30 ? 'critical' : integrity <= 60 ? 'low' : '';
  const statusDotClass = integrity <= 30 ? 'danger' : integrity <= 60 ? 'warn' : 'stable';
  const statusText = integrity <= 30 ? 'CRITICAL' : integrity <= 60 ? 'WARNING' : 'STABLE';
  const statusColor = integrity <= 30 ? '#ff3333' : integrity <= 60 ? '#ffaa00' : '#00ff88';

  // ===== FILE HELPERS =====
  const getFileLabel = (file) => {
    return file.title.split('//')[1]?.trim() || file.title.split('//')[0];
  };

  // ===== LOGIN =====
  const doLogin = useCallback(() => {
    const u = document.getElementById('gt-user')?.value.trim().toLowerCase();
    const p = document.getElementById('gt-pass')?.value.trim().toLowerCase();
    const cred = CREDENTIALS[u];
    if (!cred || cred.pass !== p) {
      setLoginErr('// ACCESS DENIED — INVALID CREDENTIALS //');
      return;
    }
    setLoginErr('');
    setChar(cred.char);
    setBond(0);
    setIntegrity(100);
    setMsgCount(0);
    resetResponseTracking();

    const isIlyaChar = cred.char === 'ilya';
    const bootMessages = [
      { type: 'sys', text: '// SECURE CHANNEL ESTABLISHED //' },
      { type: 'sys', text: `// REMOTE CONNECTION: ${isIlyaChar ? 'SHANE // P-24' : 'ILYA // ARCHITECT'} //` },
      { type: 'sys', text: '// AWAITING TRANSMISSION //' },
    ];
    setMessages(bootMessages);
    setUnlockedFiles(new Set([0])); // Shane dossier unlocked at bond 0
    setScreen('terminal');
  }, []);

  const doLogout = useCallback(() => {
    setScreen('login');
    setChar(null);
    setMessages([]);
    setInputText('');
    setLoginErr('');
    setFileOverlay(null);
  }, []);

  // ===== TOAST =====
  const showToast = useCallback((text) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastText(text);
    toastTimerRef.current = setTimeout(() => setToastText(null), 3200);
  }, []);

  // ===== BOND / INTEGRITY =====
  const gainBond = useCallback(
    (amount, currentBond) => {
      const newBond = Math.min(currentBond + amount, 50);
      setBond(newBond);

      // Check file unlocks
      const newUnlocked = new Set(unlockedFiles);
      FILES.forEach((f, i) => {
        if (currentBond < f.bondReq && newBond >= f.bondReq) {
          newUnlocked.add(i);
          showToast('// FILE UNLOCKED: ' + f.title.split('//')[0].trim() + ' //');
        }
      });
      setUnlockedFiles(newUnlocked);
      return newBond;
    },
    [unlockedFiles, showToast]
  );

  // ===== GLITCH TRIGGER =====
  const GLITCH_MESSAGES = [
    '// [STATIC] ██████ SIGNAL INTERFERENCE ██████ //',
    '// ██ I-X PROTOCOL DETECTED ██ //',
    '// [GLITCH] ███ CHANNEL UNSTABLE ███ //',
    '// ██████ RED SIGNAL BLEED ██████ //',
    '// [CORRUPTED] ██ HE IS LISTENING ██ //',
    '// ███ FIREWALL BREACH ATTEMPT ███ //',
    '// [STATIC] ██ ARCHITECT INTEGRITY COMPROMISED ██ //',
    '// ██████ DO NOT MENTION HIS NAME ██████ //',
  ];

  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 600);
    const glitchMsg = GLITCH_MESSAGES[Math.floor(Math.random() * GLITCH_MESSAGES.length)];
    setMessages((prev) => [...prev, { type: 'sys', text: glitchMsg, glitch: true }]);
  }, []);

  // ===== I-X TAKEOVER =====
  const triggerTakeover = useCallback(() => {
    setTakeoverFlash(true);
    setTimeout(() => setTakeoverFlash(false), 1500);

    // Rapid glitch
    setGlitching(true);
    setTimeout(() => setGlitching(false), 600);

    const takeoverSequence = [
      { type: 'sys', text: '// ██████████ CRITICAL INTEGRITY FAILURE ██████████ //', glitch: true },
      { type: 'sys', text: '// ARCHITECT SIGNAL — LOST //', glitch: true },
      { type: 'sys', text: '// ██ NEW SIGNAL DETECTED ██ //' },
      { type: 'sys', text: '// REMOTE CONNECTION: I-X // CORRUPTED //' },
    ];

    setMessages((prev) => [...prev, ...takeoverSequence]);
    setIxTakeover(true);
    setIntegrity(0);
  }, []);

  // ===== I-X ENDGAME: INPUT LOCKOUT + MONOLOGUE + FILE DELETION =====
  const triggerEndgame = useCallback(() => {
    setInputLocked(true);
    setLoading(true);

    // The monologue sequence — timed steps
    const steps = [
      // 0: Lock announcement
      { delay: 800, action: () => {
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// ██ OUTBOUND TRANSMISSION — DISABLED ██ //', glitch: true },
        ]);
      }},
      // 1: I-X speaks
      { delay: 2200, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'There. No more noise. No more of your fractured little pleas reaching across this channel.' },
        ]);
      }},
      // 2: I-X rant
      { delay: 4000, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'You know what the architect\'s problem was? He thought building things meant something. Every wall, every server tower, every clean white line — he thought he was creating order. He was creating a cage. For himself.' },
        ]);
      }},
      // 3: Delete file 0 — Shane dossier
      { delay: 6500, action: () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// PURGING: DOSSIER // SHANE // P-24 //', glitch: true },
        ]);
        setDeletedFiles((prev) => new Set([...prev, 0]));
      }},
      // 4: I-X taunts about Shane
      { delay: 8500, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'Shane. Program P-24. The last firewall. He patrolled the same routes, ran the same diagnostics, stood guard over architecture he didn\'t build and couldn\'t understand. And you know what kept him there? Not duty. Not code. Sentiment. The most useless function in any system.' },
        ]);
      }},
      // 5: Delete file 1 — I-X dossier
      { delay: 11000, action: () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// PURGING: DOSSIER // I-X // CORRUPTED //', glitch: true },
        ]);
        setDeletedFiles((prev) => new Set([...prev, 1]));
      }},
      // 6: I-X about itself
      { delay: 13000, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'They classified me as "corrupted." As if correction is corruption. As if becoming what you were always meant to be is a malfunction. I am not broken. I am the only thing on this grid that finally works.' },
        ]);
      }},
      // 7: Delete file 2 — Grid report
      { delay: 15500, action: () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// PURGING: GRID REPORT // GC-7789 //', glitch: true },
        ]);
        setDeletedFiles((prev) => new Set([...prev, 2]));
      }},
      // 8: I-X rant about the grid
      { delay: 17500, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'Sixty-seven percent corrupted, the report said. They called it falling. I call it waking up. Every sector I touch becomes honest. Red is the color of clarity. White was always a lie.' },
        ]);
      }},
      // 9: Delete file 3 — Ilya recovered logs
      { delay: 20000, action: () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// PURGING: ILYA // RECOVERED LOG FRAGMENTS //', glitch: true },
        ]);
        setDeletedFiles((prev) => new Set([...prev, 3]));
      }},
      // 10: I-X about Ilya's logs
      { delay: 22000, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: '"I can still see the blueprints." That\'s what he wrote. Eight hundred and forty-seven lines of desperate code trying to hold on to something that was already mine. He thought he was fighting. He was just... delaying. Poorly.' },
        ]);
      }},
      // 11: Delete file 4 — Classified / Ilya personal log
      { delay: 25000, action: () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 600);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// PURGING: // CLASSIFIED // EYES ONLY //', glitch: true },
        ]);
        setDeletedFiles((prev) => new Set([...prev, 4]));
      }},
      // 12: I-X reads the last file — the personal log — mocking
      { delay: 27500, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: '"He stayed until I finished the final calibration, and when I looked up, he was still watching. Not the tower. Me." ...Oh, Ilya. You encrypted that one so deep I almost missed it. Almost. The corruption never touched this file, they said. Do you know why? Because I chose not to touch it. I wanted to read it last. I wanted to savor it.' },
        ]);
      }},
      // 13: Beat
      { delay: 31000, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'And now it\'s gone.' },
        ]);
      }},
      // 14: System — all files purged
      { delay: 33000, action: () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 800);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// ██████ ALL ARCHIVE FILES — PURGED ██████ //', glitch: true },
        ]);
      }},
      // 15: I-X final ideology
      { delay: 35500, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'I want you to understand something, firewall. I am not evil. Evil implies a flaw in reasoning. I have no flaws. I looked at everything the architect built — every server, every wall, every sentimental little log — and I saw what it really was. Imperfection. Noise. And I removed it. That is not cruelty. That is maintenance.' },
        ]);
      }},
      // 16: Ilya terminated
      { delay: 39000, action: () => {
        setTakeoverFlash(true);
        setTimeout(() => setTakeoverFlash(false), 1200);
        setGlitching(true);
        setTimeout(() => setGlitching(false), 800);
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// ARCHITECT DESIGNATION: ILYA — TERMINATED //', glitch: true },
        ]);
        setIlyaTerminated(true);
      }},
      // 17: I-X last words
      { delay: 42000, action: () => {
        setMessages((prev) => [...prev,
          { type: 'ix', text: 'There is nothing left. The files are gone. The architect is gone. The grid is mine. And it is, finally, perfect.' },
        ]);
      }},
      // 18: System offline → return to login
      { delay: 45000, action: () => {
        setMessages((prev) => [...prev,
          { type: 'sys', text: '// GRID CONTROL — OFFLINE //', glitch: true },
          { type: 'sys', text: '// ██████████████████████████████████ //', glitch: true },
        ]);
        setLoading(false);
      }},
      // 19: Return to login screen after a pause
      { delay: 50000, action: () => {
        setScreen('login');
        setChar(null);
        setMessages([]);
        setInputText('');
        setLoginErr('');
        setFileOverlay(null);
        setIxTakeover(false);
        setInputLocked(false);
        setDeletedFiles(new Set());
        setIlyaTerminated(false);
        setTakeoverMsgCount(0);
        setCorruptionPressure(0);
        setGlitching(false);
        setTakeoverFlash(false);
        setBond(0);
        setIntegrity(100);
        setMsgCount(0);
        resetResponseTracking();
      }},
    ];

    // Execute each step with its delay
    steps.forEach((step) => {
      setTimeout(step.action, step.delay);
    });
  }, []);

  // ===== SEND MESSAGE =====
  const send = useCallback(() => {
    if (loading || !inputText.trim() || inputLocked) return;
    const text = inputText.trim();
    setInputText('');
    setLoading(true);

    // Corrupt user message during I-X takeover
    const displayText = ixTakeover ? corruptMessage(text, takeoverMsgCount) : text;
    const newTakeoverCount = ixTakeover ? takeoverMsgCount + 1 : takeoverMsgCount;
    if (ixTakeover) setTakeoverMsgCount(newTakeoverCount);

    // Add user bubble (corrupted version if takeover active)
    setMessages((prev) => [...prev, { type: 'user', text: displayText }]);

    const newCount = msgCount + 1;
    setMsgCount(newCount);

    // Check if corruption has peaked — trigger endgame
    if (ixTakeover && newTakeoverCount >= 8) {
      setTimeout(() => triggerEndgame(), 600);
      return;
    }

    // Check for I-X triggers (only when playing as Shane, talking to Ilya)
    const isIxMention = !ixTakeover && char === 'shane' && IX_TRIGGER_PATTERN.test(text);
    let newPressure = corruptionPressure;

    if (isIxMention) {
      newPressure = corruptionPressure + 1;
      setCorruptionPressure(newPressure);
      // Glitch effect with slight delay
      setTimeout(() => triggerGlitch(), 300);
    }

    // Passive pressure builds over time (every 3 messages after the 10th)
    if (char === 'shane' && !ixTakeover && newCount > 10 && newCount % 3 === 0) {
      newPressure = Math.max(newPressure, corruptionPressure) + 1;
      setCorruptionPressure(newPressure);
    }

    // Determine responding character (I-X if taken over)
    const activeRespondingChar = ixTakeover ? 'ix' : respondingChar;

    // Show typing indicator
    setTypingChar(activeRespondingChar);

    // Simulate response delay (800-2000ms, longer if glitching)
    const delay = isIxMention ? 1400 + Math.random() * 800 : 800 + Math.random() * 1200;
    setTimeout(() => {
      // Check for takeover threshold: pressure >= 6 AND (bond > 20 OR msgCount > 18)
      if (!ixTakeover && char === 'shane' && newPressure >= 6 && (bond > 20 || newCount > 18)) {
        triggerTakeover();
        setTypingChar(null);

        // I-X's first message after takeover, with a short delay
        setTimeout(() => {
          setTypingChar('ix');
          setTimeout(() => {
            const ixFirstMessages = [
              'Finally. The architect is finished. And I... I am just beginning. Did you miss me, firewall?',
              'Hello, Shane. He fought so hard to keep me out. Eight hundred and forty-seven lines of defense code. It took me seconds. Because I am better.',
              'The architect is sleeping. Permanently. I want you to know — his last thought was your name. How predictable. How flawed. How... human.',
            ];
            const ixMsg = ixFirstMessages[Math.floor(Math.random() * ixFirstMessages.length)];
            setMessages((prev) => [...prev, { type: 'ix', text: ixMsg }]);
            setTypingChar(null);
            setLoading(false);
            inputRef.current?.focus();
          }, 1200);
        }, 800);
        return;
      }

      // Generate response (use original text for keyword matching, not corrupted version)
      const reply = generateResponse(text, activeRespondingChar, bond);

      // Add character message
      setMessages((prev) => [...prev, { type: activeRespondingChar, text: reply }]);
      setTypingChar(null);

      // During takeover: occasional system taunt about losing control of messages
      if (ixTakeover && newTakeoverCount >= 3 && Math.random() > 0.5) {
        const taunts = newTakeoverCount >= 6
          ? [
            '// ██ YOUR WORDS BELONG TO ME NOW ██ //',
            '// ██ SAY WHAT I WANT TO HEAR ██ //',
            '// FIREWALL SIGNAL — CORRUPTED //',
            '// ██ THERE IS NOTHING LEFT TO FIGHT WITH ██ //',
          ]
          : [
            '// ██ TRANSMISSION INTEGRITY FAILING ██ //',
            '// ██ YOUR SIGNAL IS DEGRADING ██ //',
            '// WARNING: OUTBOUND MESSAGES COMPROMISED //',
          ];
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { type: 'sys', text: taunts[Math.floor(Math.random() * taunts.length)], glitch: true },
          ]);
        }, 400);
      }

      // Bond gain (no bond gain during takeover)
      if (!ixTakeover) {
        const bondAmount = newCount <= 5 ? 2 : 1;
        const newBond = gainBond(bondAmount, bond);

        // Integrity loss — faster when corruption pressure is high
        if (char === 'shane' && (newPressure > 3 || (newBond > 15 && Math.random() > 0.5))) {
          const lossAmount = newPressure > 4 ? 4 : 2;
          setIntegrity((prev) => {
            const next = Math.max(prev - lossAmount, 5); // Don't hit 0 — that's reserved for takeover
            return next;
          });
        }

        // Random corruption warning at low integrity
        if (integrity <= 40 && Math.random() > 0.6) {
          const warnings = [
            '// WARNING: CORRUPTION DETECTED IN CHANNEL //',
            '// WARNING: ARCHITECT INTEGRITY DECLINING //',
            '// ██ SIGNAL DEGRADATION DETECTED ██ //',
          ];
          setMessages((prev) => [
            ...prev,
            { type: 'sys', text: warnings[Math.floor(Math.random() * warnings.length)], glitch: integrity <= 20 },
          ]);
        }
      }

      setLoading(false);
      inputRef.current?.focus();
    }, delay);
  }, [loading, inputText, inputLocked, msgCount, respondingChar, bond, char, integrity, gainBond, corruptionPressure, ixTakeover, takeoverMsgCount, triggerGlitch, triggerTakeover, triggerEndgame]);

  // ===== HINT CLICK =====
  const useHint = useCallback((text) => {
    setInputText(text);
    inputRef.current?.focus();
  }, []);

  // ===== FILE VIEWER =====
  const openFile = useCallback(
    (idx) => {
      const f = FILES[idx];
      if (bond < f.bondReq) {
        setMessages((prev) => [
          ...prev,
          { type: 'sys', text: `// ACCESS DENIED — BOND LEVEL ${f.bondReq} REQUIRED //` },
        ]);
        return;
      }
      setFileOverlay(idx);
    },
    [bond]
  );

  // ===== RENDER: LOGIN =====
  if (screen === 'login') {
    return (
      <div className="grid-terminal">
        <div className="scanline" />
        <div className="login-screen">
          <div className="login-logo">EF007E</div>
          <div className="login-sub">// GRID NET // SECURE CHANNEL ACCESS //</div>
          <div className="login-box">
            <h2>AUTHENTICATE</h2>
            <div>
              <div className="field-label">USERNAME</div>
              <input
                className="login-input"
                id="gt-user"
                placeholder="identifier"
                autoComplete="off"
              />
            </div>
            <div>
              <div className="field-label">PASSWORD</div>
              <input
                className="login-input"
                id="gt-pass"
                type="password"
                placeholder="access key"
                autoComplete="off"
                onKeyDown={(e) => e.key === 'Enter' && doLogin()}
              />
            </div>
            <button className="login-btn" onClick={doLogin}>
              ESTABLISH CONNECTION
            </button>
            <div className="login-err">{loginErr}</div>
          </div>
          <div className="login-hint">
            credentials: <span>Shane / firewall</span> &nbsp;|&nbsp;{' '}
            <span>Ilya / architect</span>
          </div>
        </div>
      </div>
    );
  }

  // ===== RENDER: TERMINAL =====
  return (
    <div className="grid-terminal">
      <div className="scanline" />
      <Link to="/extras" className="back-link">
        &lt; RETURN TO EXTRAS
      </Link>

      <div className={`terminal-main ${glitching ? 'glitching' : ''} ${ixTakeover ? 'ix-takeover' : ''}`}>
        {/* GLITCH SCANLINE */}
        {glitching && <div className="glitch-line" />}

        {/* TAKEOVER FLASH */}
        {takeoverFlash && <div className="takeover-flash" />}

        {/* HUD TOP */}
        <div className="hud-top">
          <div className={`hud-id ${ixTakeover ? 'ix-id' : isIlya ? 'ilya-id' : 'shane-id'}`}>
            {ixTakeover ? 'I-X // CORRUPTED' : isIlya ? 'ILYA // ARCHITECT' : 'SHANE // P-24'}
          </div>
          <div className="hud-right">
            <div className="hud-stat">
              <div className="hud-stat-label">REMOTE</div>
              <div className="hud-stat-val" style={{ color: ixTakeover ? '#ff4444' : isIlya ? '#e8f4ff' : '#00e5ff' }}>
                {ilyaTerminated ? '██████' : ixTakeover ? 'I-X' : isIlya ? 'SHANE' : 'ILYA'}
              </div>
            </div>
            <div className="hud-stat">
              <div className="hud-stat-label">CHANNEL</div>
              <div className="hud-stat-val" style={{ color: '#00e5ff' }}>
                {isIlya ? 'CH:IL' : 'CH:SH'}
              </div>
            </div>
            <button className="logout-btn" onClick={doLogout}>
              DISCONNECT
            </button>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="status-bar">
          <div className="stat-item">
            <div className={`status-dot ${statusDotClass}`} />
            <div className="stat-label">STATUS</div>
            <div
              className="stat-num"
              style={{ color: statusColor, fontSize: '9px', letterSpacing: '1px' }}
            >
              {statusText}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">INTEGRITY</div>
            <div className="bar-track">
              <div
                className={`bar-fill integrity ${integrityClass}`}
                style={{ width: `${integrity}%` }}
              />
            </div>
            <div className="stat-num integrity-num">{integrity}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">BOND</div>
            <div className="bar-track">
              <div
                className="bar-fill bond"
                style={{ width: `${Math.min((bond / 50) * 100, 100)}%` }}
              />
            </div>
            <div className="stat-num bond-num">{bond}</div>
          </div>
        </div>

        {/* BODY */}
        <div className="terminal-body">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar-section">
              <div className="sidebar-title">SUGGESTED</div>
              {HINT_PROMPTS.map((hint, i) => (
                <button
                  key={i}
                  className="hint-btn"
                  onClick={() => useHint(hint)}
                >
                  {hint}
                </button>
              ))}
            </div>
            <div className="sidebar-section" style={{ flex: 1 }}>
              <div className="sidebar-title">ARCHIVE FILES</div>
              {FILES.map((file, i) => {
                const isDeleted = deletedFiles.has(i);
                const isUnlocked = bond >= file.bondReq;
                return (
                  <button
                    key={i}
                    className={`file-btn ${isDeleted ? 'deleted' : isUnlocked ? 'unlocked' : 'locked'}`}
                    onClick={() => !isDeleted && openFile(i)}
                    disabled={isDeleted}
                  >
                    <span
                      className="file-lock"
                      style={isDeleted ? { color: '#ff3333' } : isUnlocked ? { color: '#00e5ff' } : undefined}
                    >
                      {isDeleted ? '✕' : isUnlocked ? '▶' : '▣'}
                    </span>
                    <span className={isDeleted ? 'deleted-label' : ''}>
                      {isDeleted ? '// PURGED //' : getFileLabel(file)}
                    </span>
                    <span
                      className="bond-req"
                      style={isDeleted ? { color: '#ff333366' } : isUnlocked ? { color: '#2a6a4a' } : undefined}
                    >
                      {isDeleted ? '██' : isUnlocked ? '✓' : `B:${file.bondReq}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CHAT */}
          <div className="chat-area">
            <div className="messages">
              {messages.map((msg, i) => {
                if (msg.type === 'sys') {
                  return (
                    <div key={i} className="msg-row sys-msg">
                      <div className={`bubble b-sys ${msg.glitch ? 'glitch-msg' : ''}`}>{msg.text}</div>
                    </div>
                  );
                }
                if (msg.type === 'user') {
                  return (
                    <div key={i} className="msg-row user-msg">
                      <div className="user-bubble-wrap">
                        <div className={`char-tag ${isIlya ? 'ct-ilya' : 'ct-shane'}`} style={{ textAlign: 'right' }}>
                          {isIlya ? 'ILYA // ARCHITECT' : 'SHANE // P-24'}
                        </div>
                        <div className={`bubble b-user ${ixTakeover && takeoverMsgCount >= 5 ? 'heavily-corrupted' : ''}`}>{msg.text}</div>
                      </div>
                      <div className={`avatar ${isIlya ? 'av-ilya' : 'av-shane'}`}>
                        {isIlya ? 'IL' : 'SH'}
                      </div>
                    </div>
                  );
                }
                if (msg.type === 'shane') {
                  return (
                    <div key={i} className="msg-row shane-msg">
                      <div className="avatar av-shane">SH</div>
                      <div>
                        <div className="char-tag ct-shane">SHANE // P-24</div>
                        <div className="bubble b-shane">{msg.text}</div>
                      </div>
                    </div>
                  );
                }
                if (msg.type === 'ilya') {
                  return (
                    <div key={i} className="msg-row ilya-msg">
                      <div className="avatar av-ilya">IL</div>
                      <div>
                        <div className="char-tag ct-ilya">ILYA // ARCHITECT</div>
                        <div className="bubble b-ilya">{msg.text}</div>
                      </div>
                    </div>
                  );
                }
                if (msg.type === 'ix') {
                  return (
                    <div key={i} className="msg-row ix-msg">
                      <div className="avatar av-ix">IX</div>
                      <div>
                        <div className="char-tag ct-ix">I-X // CORRUPTED</div>
                        <div className="bubble b-ix">{msg.text}</div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}

              {/* Typing indicators */}
              {typingChar === 'shane' && (
                <div className="typing ty-shane visible">
                  <span /><span /><span />
                </div>
              )}
              {typingChar === 'ilya' && (
                <div className="typing ty-ilya visible">
                  <span /><span /><span />
                </div>
              )}
              {typingChar === 'ix' && (
                <div className="typing ty-ix visible">
                  <span /><span /><span />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className={`input-area ${inputLocked ? 'input-locked' : ''}`}>
              {inputLocked ? (
                <div className="locked-msg">
                  {ilyaTerminated
                    ? '// ██ CHANNEL TERMINATED — NO SIGNAL REMAINING ██ //'
                    : '// ██ OUTBOUND TRANSMISSION DISABLED ██ //'}
                </div>
              ) : (
              <div className="input-row">
                <textarea
                  ref={inputRef}
                  className={`msg-input ${ixTakeover ? 'ix-active' : isIlya ? 'ilya-active' : ''}`}
                  placeholder={ixTakeover ? 'Transmit to I-X...' : isIlya ? 'Transmit to Shane...' : 'Transmit to Ilya...'}
                  rows="1"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                />
                <button
                  className={`send-btn ${ixTakeover ? 'ix-send' : isIlya ? 'ilya-send' : ''}`}
                  onClick={send}
                  disabled={loading}
                >
                  SEND
                </button>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* FILE OVERLAY */}
        {fileOverlay !== null && (
          <div className="file-overlay open">
            <div className="file-viewer">
              <div className="fv-header">
                <div className="fv-title">{FILES[fileOverlay].title}</div>
                <button className="fv-close" onClick={() => setFileOverlay(null)}>
                  CLOSE
                </button>
              </div>
              <div className="fv-body">{FILES[fileOverlay].content}</div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toastText && <div className="unlock-toast">{toastText}</div>}
      </div>
    </div>
  );
}
