# Dare Trail — How to Add & Tag Dares

Each dare in `js/components/DareTrail.js` lives inside `DT_TASKS` under one of four categories:

| Category  | Squares | Tone                        |
|-----------|---------|-----------------------------|
| `mild`    | 1–12    | Flirty & fun                |
| `spicy`   | 13–24   | Heating up                  |
| `hot`     | 25–36   | Things are getting serious  |
| `extreme` | 37–45   | Adults only, full consent   |

---

## Dare object format

```js
{ emoji:"💋", who:"any", target:"mf", text:"Kiss {target} for 5 seconds." }
```

### `emoji` — string
Any emoji shown on the dare card.

---

### `who` — who can receive this dare

| Value  | Meaning                        |
|--------|--------------------------------|
| `"any"`| Any player regardless of gender |
| `"m"`  | Male players only              |
| `"f"`  | Female players only            |

---

### `target` — targeting rule

| Value         | Meaning                                                              |
|---------------|----------------------------------------------------------------------|
| `"none"`      | No target — dare involves no other player                            |
| `"any"`       | One random other player (any gender)                                 |
| `"mf"`        | Opposite-gender preference: male → targets female; female → any      |
| `"f"`         | One random female player (falls back to any if no females)          |
| `"m"`         | One random male player (falls back to any if no males)              |
| `"allF"`      | ALL female players (use `{targets}` placeholder)                    |
| `"allM"`      | ALL male players (use `{targets}` placeholder)                      |
| `"allOthers"` | ALL other players (use `{targets}` placeholder)                     |

---

### `text` — dare description

Use these placeholders:

| Placeholder   | Replaced with                                        |
|---------------|------------------------------------------------------|
| `{target}`    | A single resolved player name (bold + highlighted)   |
| `{targets}`   | Multiple player names e.g. "Alice and Bob" (for allF/allM/allOthers) |

---

## Examples

```js
// Any player, no target
{ emoji:"🕺", who:"any", target:"none", text:"Moonwalk across the room." }

// Any player, targets one other person
{ emoji:"💆", who:"any", target:"any", text:"Give {target} a 30-second shoulder massage." }

// Any player, targets opposite gender
{ emoji:"💋", who:"any", target:"mf", text:"Kiss {target} for 10 seconds." }

// Male only, targets a female
{ emoji:"📱", who:"m", target:"f", text:"Send a photo of your erect penis to {target}." }

// Female only, no target
{ emoji:"🫦", who:"f", target:"none", text:"Finger yourself for 5 seconds." }

// Any player, targets ALL female players (use {targets})
{ emoji:"💦", who:"any", target:"allF", text:"Squeeze the breasts of {targets}." }

// Any player, targets ALL other players
{ emoji:"🎉", who:"any", target:"allOthers", text:"Give {targets} each a kiss on the cheek." }
```

---

## Notes

- If a dare requires a target that doesn't exist (e.g. `target:"f"` but no female players), it is automatically excluded from the draw for that player.
- Each player has their own seen-dare history. The same dare won't repeat for the same player, but another player may still get it.
- The board zones (Mild/Spicy/Hot/Extreme) are fixed by square number — the dare category always matches the zone the player lands in.
