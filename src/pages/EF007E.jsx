import { Link } from "react-router-dom";

export default function TronFile() {
  const logs = [
    "BOOT SEQUENCE INITIALIZED",
    "ARCHIVE NODE FOUND",
    "USER AUTHENTICATION INCOMPLETE",
    "MISSING FILE FRAGMENTS DETECTED",
    "I-X TRACE SIGNATURE: UNSTABLE",
  ];

  const files = [
    { name: "chat_interface.exe", status: "locked" },
    { name: "ilya_fragment.log", status: "corrupted" },
    { name: "shane_report.txt", status: "restricted" },
    { name: "system_map.dat", status: "partial" },
  ];

  return (
    <div className="tron-page">
      <div className="tron-scanlines" />

      <div className="tron-shell">
        <header className="tron-topbar">
          <div className="tron-brand">TRON FILE</div>

          <nav className="tron-nav">
            <Link to="/">HOME</Link>
            <span>•</span>
            <Link to="/fics">FICS</Link>
            <span>•</span>
            <Link to="/originals">ORIGINALS</Link>
          </nav>

          <div className="tron-status">SYSTEM ONLINE</div>
        </header>

        <section className="tron-hero">
          <div className="tron-hero-left">
            <div className="tron-eyebrow">ARCHIVE ENTRY 001</div>
            <h1>TRON FILE</h1>
            <p className="tron-summary">
              A corrupted system narrative of grief, control, and fragmented
              memory told through unstable interfaces, hidden files, and traces
              left behind inside a collapsing digital world.
            </p>

            <div className="tron-tags">
              <span>INTERACTIVE</span>
              <span>SCI-FI</span>
              <span>ANGST</span>
              <span>CORRUPTION</span>
            </div>

            <div className="tron-actions">
              <button className="tron-primary">ACCESS TERMINAL</button>
              <button className="tron-secondary">OPEN DOSSIER</button>
            </div>
          </div>

          <div className="tron-hero-right">
            <div className="tron-core">
              <div className="tron-core-inner">
                <div className="tron-ring tron-ring-1" />
                <div className="tron-ring tron-ring-2" />
                <div className="tron-center">I/O</div>
              </div>
            </div>
          </div>
        </section>

        <section className="tron-grid">
          <div className="tron-panel">
            <div className="tron-panel-title">SYSTEM LOG</div>
            <div className="tron-log-list">
              {logs.map((log) => (
                <div key={log} className="tron-log-line">
                  <span className="tron-log-arrow">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tron-panel">
            <div className="tron-panel-title">FILE INDEX</div>
            <div className="tron-file-list">
              {files.map((file) => (
                <div key={file.name} className="tron-file-row">
                  <span className="tron-file-name">{file.name}</span>
                  <span className={`tron-file-status status-${file.status}`}>
                    {file.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="tron-panel tron-panel-wide">
            <div className="tron-panel-title">ARCHIVE NOTE</div>
            <p className="tron-note">
              This file serves as the entry point for the interactive Tron
              narrative. Future phases can replace these static panels with your
              login system, chat terminal, avatar UI, file unlocks, glitch
              events, and I-X takeover sequences.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}