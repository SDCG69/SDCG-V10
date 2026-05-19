// ── RolePlay Components ────────────────────────────────────────────────────

function RPComboLabel({ combo }) {
  return (
    <span>
      {combo.split("").map((g, i) => (
        <span key={i} style={{ color: g === "F" ? "#c45d8a" : "#6888d4" }}>{g}</span>
      ))}
    </span>
  );
}

function RPIntensityBadge({ intensity }) {
  const c = RP_INTENSITY_COLOR[intensity] || "#888";
  return (
    <span style={{
      display: "inline-block", borderRadius: 100,
      padding: "2px 10px", fontSize: 11,
      fontFamily: "'Georgia',serif", letterSpacing: "0.05em",
      background: c + "22", color: c, border: `1px solid ${c}44`,
      whiteSpace: "nowrap",
    }}>{intensity}</span>
  );
}

// ── Scenario Detail ────────────────────────────────────────────────────────
function RPDetailScreen({ scenario, selectedProps, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const ac = "#8b1a3a";

  return (
    <div style={{ animation: "fadeUp .35s ease", maxWidth: "540px", width: "100%" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <button onClick={onBack} style={{
          background: "#141414", border: "1px solid #222", color: "#888",
          borderRadius: "8px", padding: "7px 13px", cursor: "pointer",
          fontFamily: "inherit", fontSize: "13px"
        }}>← Back</button>
        <span style={{ color: "#444", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
          Role Play Scenarios
        </span>
        <div style={{ width: "72px" }} />
      </div>

      {/* Hero card */}
      <div style={{
        background: "linear-gradient(135deg,#1c0814,#0d0d0d)",
        border: "1px solid #3a1a2833",
        borderRadius: "24px", padding: "24px", marginBottom: "14px",
        boxShadow: "0 20px 60px #8b000022, 0 4px 20px #000",
      }}>
        <h1 style={{ color: "#e8cdd8", fontSize: "1.5rem", margin: "0 0 6px", fontWeight: "normal", fontFamily: "Georgia,serif" }}>
          {scenario.title}
        </h1>
        <div style={{ fontSize: "13px", color: "#6a3a50", fontStyle: "italic", marginBottom: "14px" }}>
          {scenario.setting}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <RPIntensityBadge intensity={scenario.intensity} />
          {scenario.tags.map((t, i) => (
            <span key={i} style={{
              display: "inline-block", background: "#1e0e17",
              border: "1px solid #3a1a28", borderRadius: "4px",
              padding: "2px 8px", fontSize: "11px", color: "#6a4050"
            }}>{t}</span>
          ))}
        </div>

        {/* Summary */}
        <p style={{ color: "#c4a0b0", fontSize: "14px", lineHeight: "1.75", margin: "0 0 20px", fontFamily: "Georgia,serif" }}>
          {scenario.summary}
        </p>

        {/* Roles */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a3040", marginBottom: "8px" }}>Roles</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {scenario.roles.map((r, i) => (
              <span key={i} style={{
                display: "inline-block", background: "#1e0e17",
                border: "1px solid #3a1a28", borderRadius: "100px",
                padding: "5px 14px", fontSize: "13px", color: "#c49ab0", fontStyle: "italic",
                fontFamily: "Georgia,serif"
              }}>{r}</span>
            ))}
          </div>
        </div>

        {/* Accessories */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a3040", marginBottom: "8px" }}>Accessories</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {RP_PROPS.filter(p => scenario.props.includes(p.id)).map(p => (
              <span key={p.id} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "13px",
                color: selectedProps.includes(p.id) ? "#c46888" : "#7a5060"
              }}>{p.icon} {p.label}</span>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "#1e1016", margin: "20px 0" }} />

        {/* Action Steps */}
        <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a3040", marginBottom: "14px" }}>
          Suggested Actions &amp; Events
        </div>
        <div>
          {scenario.actions.map((action, i) => (
            <div key={i} style={{
              display: "flex", gap: "14px", alignItems: "flex-start",
              padding: "13px 0",
              borderBottom: i < scenario.actions.length - 1 ? "1px solid #1a0e13" : "none",
            }}>
              <div style={{
                flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
                background: "#1e0a14", border: "1px solid #3a1828",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", color: "#8b3050", fontFamily: "Georgia,serif",
                marginTop: "2px",
              }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: "14px", color: "#b890a0", lineHeight: "1.75", flex: 1, fontFamily: "Georgia,serif" }}>
                {action}
              </p>
            </div>
          ))}
        </div>

        {/* Safety note */}
        <div style={{
          marginTop: "24px", background: "#1a0a14", border: "1px solid #2e1220",
          borderRadius: "10px", padding: "12px 16px", fontSize: "12px",
          color: "#6a3a48", lineHeight: "1.65", fontFamily: "Georgia,serif",
        }}>
          <span style={{ color: "#8a4a58" }}>✦ Establish a safe word before starting any scene.</span>{" "}
          All activities should be consensual, negotiated in advance, and revisited freely. Aftercare is part of every experience.
        </div>
      </div>

      <button className="btn" onClick={onBack} style={{
        background: "#1a1a1a", color: "#888", border: "1px solid #222",
        fontSize: "15px", padding: "15px", width: "100%"
      }}>← Back to Scenarios</button>
    </div>
  );
}

// ── Scenario List ──────────────────────────────────────────────────────────
function RPListScreen({ onBack, onSelectScenario }) {
  const [playerCount, setPlayerCount] = useState(2);
  const [selectedCombo, setSelectedCombo] = useState("MF");
  const [selectedProps, setSelectedProps] = useState([]);
  const [intensityFilter, setIntensityFilter] = useState("All");

  const combos = RP_COMBOS[playerCount];

  // When player count changes, reset combo to first valid
  useEffect(() => {
    setSelectedCombo(RP_COMBOS[playerCount][0]);
  }, [playerCount]);

  const filtered = RP_SCENARIOS.filter(s => {
    if (s.players !== playerCount) return false;
    if (s.combo !== selectedCombo) return false;
    if (intensityFilter !== "All" && s.intensity !== intensityFilter) return false;
    if (selectedProps.length > 0 && !selectedProps.every(p => s.props.includes(p))) return false;
    return true;
  });

  const pillStyle = (active, activeColor) => ({
    cursor: "pointer",
    border: active ? `1px solid ${activeColor || "#8b1a3a"}` : "1px solid #252525",
    background: active ? (activeColor ? activeColor + "33" : "#2a0e1c") : "#141414",
    color: active ? "#f5dce8" : "#555",
    borderRadius: "100px", padding: "7px 16px", fontSize: "13px",
    fontFamily: "inherit", letterSpacing: "0.04em", transition: "all 0.18s",
    display: "inline-flex", alignItems: "center", gap: "6px",
  });

  return (
    <div style={{ animation: "fadeUp .35s ease", maxWidth: "540px", width: "100%" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button onClick={onBack} style={{
          background: "#141414", border: "1px solid #222", color: "#888",
          borderRadius: "8px", padding: "7px 13px", cursor: "pointer",
          fontFamily: "inherit", fontSize: "13px"
        }}>← Back</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>
            Private Fantasy
          </div>
          <h2 style={{ color: "#e8cdd8", fontSize: "1.3rem", margin: 0, fontFamily: "Georgia,serif", fontWeight: "normal" }}>
            Role Play <span style={{ color: "#c45d8a", fontStyle: "italic" }}>Scenarios</span>
          </h2>
        </div>
        <div style={{ width: "72px" }} />
      </div>

      {/* Player Count */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "16px", marginBottom: "10px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#444", marginBottom: "10px" }}>
          Number of Players
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {[2, 3, 4].map(n => (
            <button key={n} className="btn" onClick={() => setPlayerCount(n)} style={{
              width: "48px", height: "48px", borderRadius: "50%",
              border: playerCount === n ? "1.5px solid #c45d8a" : "1.5px solid #2a2a2a",
              background: playerCount === n ? "#6b1f3a" : "#1a1a1a",
              color: playerCount === n ? "#f5dce8" : "#555",
              fontSize: "18px", fontFamily: "Georgia,serif",
              boxShadow: playerCount === n ? "0 0 18px #6b1f3a88" : "none",
            }}>{n}</button>
          ))}
          {playerCount === 2 && (
            <span style={{ color: "#3a2030", fontSize: "12px", fontStyle: "italic" }}>— most scenarios available</span>
          )}
        </div>
      </div>

      {/* Gender Combo */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "16px", marginBottom: "10px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#444", marginBottom: "10px" }}>
          Gender Combination
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {combos.map(c => (
            <button key={c} className="pill" onClick={() => setSelectedCombo(c)}
              style={{
                background: selectedCombo === c ? "#6b1f3a" : "#141414",
                color: selectedCombo === c ? "#f5dce8" : "#555",
                border: `1.5px solid ${selectedCombo === c ? "#c45d8a" : "#222"}`,
                borderRadius: "20px", padding: "6px 14px", fontSize: "13px",
                fontFamily: "inherit", cursor: "pointer", transition: "all 0.18s",
              }}>
              <RPComboLabel combo={c} />
            </button>
          ))}
        </div>
      </div>

      {/* Props filter */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "16px", marginBottom: "10px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#444", marginBottom: "10px" }}>
          Accessories &amp; Props
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {RP_PROPS.map(p => {
            const on = selectedProps.includes(p.id);
            return (
              <button key={p.id} className="pill" onClick={() => setSelectedProps(prev => on ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                style={{
                  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px",
                  border: on ? "1px solid #8b1a3a" : "1px solid #222",
                  background: on ? "#2a0e1c" : "#141414",
                  color: on ? "#f5dce8" : "#555",
                  borderRadius: "8px", padding: "6px 11px", fontSize: "12px",
                  fontFamily: "inherit", transition: "all 0.18s",
                }}>
                <span>{p.icon}</span><span>{p.label}</span>
              </button>
            );
          })}
        </div>
        {selectedProps.length > 0 && (
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", color: "#5a3040" }}>Showing scenarios with all selected items</span>
            <button onClick={() => setSelectedProps([])} style={{
              fontSize: "12px", color: "#8b3050", background: "none", border: "none",
              cursor: "pointer", textDecoration: "underline", fontFamily: "inherit"
            }}>clear</button>
          </div>
        )}
      </div>

      {/* Intensity */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#444", marginBottom: "10px" }}>
          Intensity
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {["All", "Playful", "Sensual", "Moderate", "Intense"].map(lvl => (
            <button key={lvl} className="pill" onClick={() => setIntensityFilter(lvl)}
              style={{
                background: intensityFilter === lvl ? "#2a0e1c" : "#141414",
                color: intensityFilter === lvl ? "#f5dce8" : "#555",
                border: `1.5px solid ${intensityFilter === lvl ? "#8b1a3a" : "#222"}`,
                borderRadius: "20px", padding: "6px 14px", fontSize: "12px",
                fontFamily: "inherit", cursor: "pointer", transition: "all 0.18s",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}>
              {lvl !== "All" && (
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: RP_INTENSITY_COLOR[lvl], display: "inline-block", flexShrink: 0 }} />
              )}
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontSize: "12px", color: "#3a2030" }}>
          {filtered.length} scenario{filtered.length !== 1 ? "s" : ""}
        </span>
        <span style={{ fontSize: "10px", color: "#3a1a28", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <RPComboLabel combo={selectedCombo} /> · {playerCount} Players
        </span>
      </div>

      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "40px 20px",
          background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px",
        }}>
          <div style={{ fontSize: "30px", marginBottom: "12px" }}>✦</div>
          <div style={{ color: "#444", fontFamily: "Georgia,serif", fontStyle: "italic" }}>No scenarios match your filters.</div>
          <div style={{ marginTop: "6px", fontSize: "12px", color: "#333" }}>Try removing some prop or intensity filters.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(s => (
            <button key={s.id} className="btn" onClick={() => onSelectScenario(s)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "#4A0404", border: "1px solid #252525",
                borderRadius: "14px", cursor: "pointer",
                padding: "14px 16px", transition: "all 0.2s", fontFamily: "inherit",
              }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "5px" }}>
                    <span style={{ fontSize: "16px", color: "#e8cdd8", fontFamily: "Georgia,serif" }}>{s.title}</span>
                    <RPIntensityBadge intensity={s.intensity} />
                  </div>
                  <div style={{ fontSize: "12px", color: "#6a3a50", fontStyle: "italic", marginBottom: "6px" }}>{s.setting}</div>
                  <div style={{ fontSize: "13px", color: "#9a7080", lineHeight: "1.55" }}>{s.summary}</div>
                  <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {RP_PROPS.filter(p => s.props.includes(p.id)).map(p => (
                      <span key={p.id} style={{ fontSize: "11px", color: selectedProps.includes(p.id) ? "#c46888" : "#4a2838" }}>
                        {p.icon} {p.label}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "#4a2838" }}>
                    {s.actions.length} suggested actions — tap to read ›
                  </div>
                </div>
                <div style={{ flexShrink: 0, color: "#4a2838", fontSize: "20px", marginTop: "2px" }}>›</div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", padding: "24px 0 8px", color: "#2a1a20", fontSize: "11px", letterSpacing: "0.1em" }}>
        ✦ &nbsp; All scenarios are fictional fantasy content for consenting adults &nbsp; ✦
      </div>
    </div>
  );
}
