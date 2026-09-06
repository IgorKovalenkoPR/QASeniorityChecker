# QA Seniority Checker — Design System

Version 1.0 · Authored 2026-09-04
Visual direction: derived from the TestFort brand family (QA / software-testing services).

---

## 1. Source evidence & limitations

**Read this before trusting any hex value below.**

### What was attempted

| Target | Method | Result |
| --- | --- | --- |
| `https://testfort.com/` | WebFetch | **Blocked** — `EGRESS_BLOCKED`, egress proxy denies the host |
| `https://testfort.com/` | `curl` via session proxy | **Blocked** — `CONNECT tunnel failed, response 403` |
| `https://clutch.co/profile/testfort-qa-lab` (directory profile, for logo colors) | WebFetch | **Blocked** — `EGRESS_BLOCKED` |
| `https://brandfetch.com/testfort.com` (brand-asset registry) | WebFetch | **Blocked** — `EGRESS_BLOCKED` |

This session's network egress policy blocks `testfort.com` and the third-party brand directories.
Per the proxy policy, blocked hosts were reported rather than routed around, so **no stylesheet, no
computed style, and no screenshot of testfort.com was obtained.**

### What WebSearch did surface

WebSearch (which does not traverse the egress proxy) returned result titles, URLs and snippets only —
no CSS, no color values, no font names. Four queries were run
(`TestFort ... brand colors design`, `TestFort ... logo color scheme`,
`testfort.com website design homepage look`, `TestFort ... visual identity typography`).

Verbatim, the useful part of what came back:

- Live URL set confirming the site's information architecture and section vocabulary:
  `testfort.com/`, `/qa`, `/company`, `/digital-qa`, `/automated-testing`, `/qa-outsourcing`,
  `/managed-testing`, `/website-testing`, `/ui-testing`, `/usability-testing`, `/ecommerce-software-testing`,
  `/blog/...`
- Positioning copy: *"Software Testing Company │ In Software Business Since 2001"*,
  *"TestFort tests the software you ship and the AI features inside it, offering dedicated QA teams,
  automation, and AI-assisted testing that takes regression from days to hours."*
- Trust signals the brand leads with: *"CMMI Level 3 and ISO 27001-certified"*, *"24+ years"*,
  Clutch review presence (25 reviews).
- Both color-targeted searches returned explicitly: *"the search results did not include specific
  details about their website brand colors or design elements"* and *"the search results did not
  return specific information about their logo design or color scheme details."*

### Provenance of every value in this document

| Category | Status |
| --- | --- |
| Site information architecture, tone, trust-signal vocabulary | **SOURCED** (WebSearch snippets above) |
| Every hex color, font family, size, radius, shadow, spacing value | **INFERRED** |

Nothing here was read off testfort.com. The palette is a defensible, professional B2B
QA-services system built to the coordinator's stated brand direction — confident corporate blue
primary, warm orange accent, white / near-white surfaces, dark navy for footer and dark sections,
generous whitespace, rounded-but-not-pill buttons — and every value is internally validated for
WCAG contrast (section 9, with computed ratios).

**Action required from the client:** replace the six values in the `BRAND SWAP POINTS` block in
section 3 with the real hexes from the TestFort style guide. Every other token in the system is
derived from or harmonized with those six, so a single edit rethemes the entire application. Do not
edit brand colors anywhere else in the file.

---

## 2. Visual tone

Calm, engineered, trustworthy — this is an assessment tool, not a game. The page reads as a clean
white document with a lot of air; color is spent deliberately and never decoratively. Blue carries
structure and action, orange carries a single point of emphasis per screen, and the four seniority
tiers are the only place where a full spectrum appears — which is what makes the result screen land.
Corners are softened (8–12px) but never pill-shaped except on small status chips. Shadows are low,
wide and cool-tinted; there are no gradients on interactive surfaces.

---

## 3. Design tokens — light theme

```css
:root {
  /* ==================================================================
     BRAND SWAP POINTS — the ONLY six values to replace with the real
     TestFort style-guide colors. Everything below derives from these.
     Current values are INFERRED, not read from testfort.com.
     ================================================================== */
  --brand-primary:        #12508F;  /* corporate blue — buttons, links, focus  */
  --brand-primary-hover:  #0E3F72;  /* ~12% darker                             */
  --brand-primary-active: #0B3159;  /* ~20% darker, pressed state              */
  --brand-primary-tint:   #E9F1FA;  /* 6% primary over white — subtle fills    */
  --accent:               #E4610F;  /* warm orange — one emphasis per screen   */
  --ink-inverse-bg:       #0B1728;  /* dark navy — footer / dark sections      */
  /* ================================================================== */

  /* --- Brand ramp (derived) --- */
  --brand-tint-strong:    #CFE0F5;  /* borders on tinted surfaces              */
  --brand-on-primary:     #FFFFFF;  /* text/icon color on a primary fill       */
  --brand-ring:           #1A6FE0;  /* focus ring — brighter than primary      */

  /* --- Accent ramp (derived) --- */
  --accent-hover:         #C24F09;  /* use for accent FILLS carrying text      */
  --accent-ink:           #A8430A;  /* accent as TEXT on light surfaces        */
  --accent-soft:          #FDEFE4;  /* accent tinted background                */
  --accent-soft-border:   #F6D2B4;

  /* --- Ink scale (3 steps) --- */
  --ink-strong:           #0F1B2A;  /* headings, numbers, emphasis             */
  --ink-body:             #2E3A4B;  /* body copy, answer text                  */
  --ink-muted:            #5A6B80;  /* labels, meta, helper text, placeholders */
  --ink-on-dark:          #E6EDF6;  /* body text inside dark sections          */
  --ink-muted-on-dark:    #9FB0C4;

  /* --- Surface scale (3 steps) --- */
  --surface-0:            #FFFFFF;  /* cards, modals, elevated content         */
  --surface-1:            #F7F9FC;  /* page background                         */
  --surface-2:            #EDF1F7;  /* inset wells, disabled fills, track bg   */
  --surface-inverse:      var(--ink-inverse-bg);
  --surface-inverse-2:    #132339;  /* raised block inside a dark section      */

  /* --- Borders --- */
  --border:               #DCE3EC;  /* default hairline                        */
  --border-strong:        #C2CCD9;  /* inputs, interactive outlines            */
  --border-inverse:       #2A3B52;

  /* --- Semantic --- */
  --success:              #12794C;
  --success-soft:         #E4F4EC;
  --success-border:       #B7E0C9;
  --warning:              #B45309;
  --warning-ink:          #8A4B04;  /* warning as text on light surfaces       */
  --warning-soft:         #FDF0DC;
  --warning-border:       #F2D5A6;
  --danger:               #C0243C;
  --danger-soft:          #FCE8EC;
  --danger-border:        #F3C2CC;
  --info:                 #1069C2;
  --info-ink:             #0B4F93;
  --info-soft:            #E5F0FB;
  --info-border:          #C2DBF5;

  /* --- Seniority tiers: solid (fills/badges) + soft (backgrounds) + ink (text on soft) --- */
  --tier-trainee:         #5B6B7F;  /* grey  */
  --tier-trainee-soft:    #EEF1F5;
  --tier-trainee-ink:     #47566A;
  --tier-trainee-border:  #CFD7E0;

  --tier-junior:          #14764A;  /* green */
  --tier-junior-soft:     #E3F5EC;
  --tier-junior-ink:      #0F5C3A;
  --tier-junior-border:   #B4E0C9;

  --tier-middle:          #8A5E00;  /* amber */
  --tier-middle-soft:     #FBF0D9;
  --tier-middle-ink:      #6E4A00;
  --tier-middle-border:   #EBD199;

  --tier-senior:          #B72544;  /* crimson */
  --tier-senior-soft:     #FBE6EB;
  --tier-senior-ink:      #8E1B34;
  --tier-senior-border:   #F0BCC8;

  /* --- Typography --- */
  --font-sans: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial,
               system-ui, -apple-system, sans-serif;
  --font-display: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial,
                  system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "SFMono-Regular", Menlo, Consolas,
               "Liberation Mono", monospace;

  --fs-display: 3rem;      /* 48px */
  --fs-h1:      2.25rem;   /* 36px */
  --fs-h2:      1.75rem;   /* 28px */
  --fs-h3:      1.375rem;  /* 22px */
  --fs-h4:      1.125rem;  /* 18px */
  --fs-body-lg: 1.0625rem; /* 17px */
  --fs-body:    1rem;      /* 16px */
  --fs-sm:      0.875rem;  /* 14px */
  --fs-xs:      0.75rem;   /* 12px */

  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;

  --lh-tight:   1.15;
  --lh-heading: 1.25;
  --lh-snug:    1.45;
  --lh-body:    1.6;

  --ls-display: -0.02em;
  --ls-heading: -0.01em;
  --ls-body:     0;
  --ls-caps:     0.06em;

  /* --- Spacing (4px base) --- */
  --sp-1:  0.25rem;  /*  4px */
  --sp-2:  0.5rem;   /*  8px */
  --sp-3:  0.75rem;  /* 12px */
  --sp-4:  1rem;     /* 16px */
  --sp-5:  1.5rem;   /* 24px */
  --sp-6:  2rem;     /* 32px */
  --sp-7:  2.5rem;   /* 40px */
  --sp-8:  3rem;     /* 48px */
  --sp-9:  4rem;     /* 64px */
  --sp-10: 6rem;     /* 96px */

  /* --- Radius --- */
  --radius-xs:   4px;
  --radius-sm:   6px;
  --radius-md:   8px;   /* buttons, inputs                    */
  --radius-lg:   12px;  /* answer options, small cards        */
  --radius-xl:   16px;  /* question card, modal               */
  --radius-2xl:  24px;  /* hero / result panel                */
  --radius-pill: 999px; /* chips, progress track, tier badge  */

  /* --- Shadows (cool-tinted, low and wide) --- */
  --shadow-xs: 0 1px 2px rgba(15, 27, 42, 0.06);
  --shadow-sm: 0 1px 3px rgba(15, 27, 42, 0.08), 0 1px 2px rgba(15, 27, 42, 0.04);
  --shadow-md: 0 4px 12px rgba(15, 27, 42, 0.08), 0 1px 3px rgba(15, 27, 42, 0.04);
  --shadow-lg: 0 12px 32px rgba(15, 27, 42, 0.12), 0 2px 8px rgba(15, 27, 42, 0.06);
  --shadow-xl: 0 24px 64px rgba(15, 27, 42, 0.18), 0 4px 12px rgba(15, 27, 42, 0.08);
  --shadow-focus: 0 0 0 3px rgba(26, 111, 224, 0.35);

  /* --- Layout --- */
  --container-max: 1200px;
  --content-max:   720px;  /* question / reading column */
  --header-h:      64px;

  /* --- Motion --- */
  --ease-out:  cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast:  120ms;
  --dur-base:  200ms;
  --dur-slow:  320ms;
}
```

---

## 4. Dark theme

Only the tokens that change are redefined. Both blocks carry identical values; the media query
serves the OS preference and the attribute selector serves an explicit in-app toggle.

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --brand-primary:        #2F72C4;
    --brand-primary-hover:  #3D82D6;
    --brand-primary-active: #2865B0;
    --brand-primary-tint:   #12293F;
    --brand-tint-strong:    #1D3E5D;
    --brand-ring:           #6FB2F5;

    --accent:               #FF8A3D;
    --accent-hover:         #FF9E5C;
    --accent-ink:           #FF8A3D;
    --accent-soft:          #351C0C;
    --accent-soft-border:   #6B3A16;

    --ink-strong:           #F2F6FB;
    --ink-body:             #D5DFEC;
    --ink-muted:            #9FB0C4;

    --surface-0:            #142235;
    --surface-1:            #0B1728;
    --surface-2:            #1B2C43;
    --surface-inverse:      #F7F9FC;
    --surface-inverse-2:    #EDF1F7;

    --border:               #2A3B52;
    --border-strong:        #3A4E68;

    --success:              #3FBF80;
    --success-soft:         #10352A;
    --success-border:       #1F5D45;
    --warning:              #E5A93A;
    --warning-ink:          #E5A93A;
    --warning-soft:         #33270B;
    --warning-border:       #6A5218;
    --danger:               #F2708B;
    --danger-soft:          #35141D;
    --danger-border:        #6E2A3B;
    --info:                 #6FB2F5;
    --info-ink:             #6FB2F5;
    --info-soft:            #10263D;
    --info-border:          #244A70;

    --tier-trainee:         #A8B6C7;
    --tier-trainee-soft:    #1B2838;
    --tier-trainee-ink:     #A8B6C7;
    --tier-trainee-border:  #3A4A5E;
    --tier-junior:          #4ECB8B;
    --tier-junior-soft:     #10352A;
    --tier-junior-ink:      #4ECB8B;
    --tier-junior-border:   #1F5D45;
    --tier-middle:          #E5A93A;
    --tier-middle-soft:     #33270B;
    --tier-middle-ink:      #E5A93A;
    --tier-middle-border:   #6A5218;
    --tier-senior:          #F2708B;
    --tier-senior-soft:     #35141D;
    --tier-senior-ink:      #F2708B;
    --tier-senior-border:   #6E2A3B;

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.35);
    --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-focus: 0 0 0 3px rgba(111, 178, 245, 0.4);
  }
}

[data-theme="dark"] {
  --brand-primary:        #2F72C4;
  --brand-primary-hover:  #3D82D6;
  --brand-primary-active: #2865B0;
  --brand-primary-tint:   #12293F;
  --brand-tint-strong:    #1D3E5D;
  --brand-ring:           #6FB2F5;

  --accent:               #FF8A3D;
  --accent-hover:         #FF9E5C;
  --accent-ink:           #FF8A3D;
  --accent-soft:          #351C0C;
  --accent-soft-border:   #6B3A16;

  --ink-strong:           #F2F6FB;
  --ink-body:             #D5DFEC;
  --ink-muted:            #9FB0C4;

  --surface-0:            #142235;
  --surface-1:            #0B1728;
  --surface-2:            #1B2C43;
  --surface-inverse:      #F7F9FC;
  --surface-inverse-2:    #EDF1F7;

  --border:               #2A3B52;
  --border-strong:        #3A4E68;

  --success:              #3FBF80;
  --success-soft:         #10352A;
  --success-border:       #1F5D45;
  --warning:              #E5A93A;
  --warning-ink:          #E5A93A;
  --warning-soft:         #33270B;
  --warning-border:       #6A5218;
  --danger:               #F2708B;
  --danger-soft:          #35141D;
  --danger-border:        #6E2A3B;
  --info:                 #6FB2F5;
  --info-ink:             #6FB2F5;
  --info-soft:            #10263D;
  --info-border:          #244A70;

  --tier-trainee:         #A8B6C7;
  --tier-trainee-soft:    #1B2838;
  --tier-trainee-ink:     #A8B6C7;
  --tier-trainee-border:  #3A4A5E;
  --tier-junior:          #4ECB8B;
  --tier-junior-soft:     #10352A;
  --tier-junior-ink:      #4ECB8B;
  --tier-junior-border:   #1F5D45;
  --tier-middle:          #E5A93A;
  --tier-middle-soft:     #33270B;
  --tier-middle-ink:      #E5A93A;
  --tier-middle-border:   #6A5218;
  --tier-senior:          #F2708B;
  --tier-senior-soft:     #35141D;
  --tier-senior-ink:      #F2708B;
  --tier-senior-border:   #6E2A3B;

  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.35);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-focus: 0 0 0 3px rgba(111, 178, 245, 0.4);
}
```

Note on dark-mode fills: `--brand-primary` lightens to `#2F72C4` specifically so white button text
still clears 4.5:1 (measured 4.86:1). Do not darken it back toward the light-theme blue.

---

## 5. Typography

Inter is the type choice: a neutral, highly legible UI grotesque with excellent tabular figures —
which matters here, since the timer and the score readouts change digits in place. Load weights
400/500/600/700 only.

```css
html { font-size: 100%; -webkit-text-size-adjust: 100%; }

body {
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--ink-body);
  background: var(--surface-1);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-feature-settings: "cv05" 1, "ss01" 1;
}

.t-display {
  font-family: var(--font-display);
  font-size: var(--fs-display);
  font-weight: var(--fw-bold);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-display);
  color: var(--ink-strong);
}
h1, .t-h1 {
  font-size: var(--fs-h1); font-weight: var(--fw-bold);
  line-height: var(--lh-heading); letter-spacing: var(--ls-heading);
  color: var(--ink-strong); margin: 0 0 var(--sp-4);
}
h2, .t-h2 {
  font-size: var(--fs-h2); font-weight: var(--fw-semibold);
  line-height: var(--lh-heading); letter-spacing: var(--ls-heading);
  color: var(--ink-strong); margin: 0 0 var(--sp-4);
}
h3, .t-h3 {
  font-size: var(--fs-h3); font-weight: var(--fw-semibold);
  line-height: 1.35; color: var(--ink-strong); margin: 0 0 var(--sp-3);
}
h4, .t-h4 {
  font-size: var(--fs-h4); font-weight: var(--fw-semibold);
  line-height: var(--lh-snug); color: var(--ink-strong); margin: 0 0 var(--sp-2);
}
p  { margin: 0 0 var(--sp-4); max-width: 68ch; }
.t-lead   { font-size: var(--fs-body-lg); line-height: var(--lh-body); color: var(--ink-body); }
.t-sm     { font-size: var(--fs-sm);  line-height: var(--lh-snug); }
.t-meta   { font-size: var(--fs-sm);  line-height: var(--lh-snug); color: var(--ink-muted); }
.t-caption{ font-size: var(--fs-xs);  line-height: 1.4; color: var(--ink-muted); }
.t-overline {
  font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  text-transform: uppercase; letter-spacing: var(--ls-caps); color: var(--ink-muted);
}
.t-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
code, .t-code { font-family: var(--font-mono); font-size: 0.9375em; }

/* Question text is the reading anchor of the app */
.question-title {
  font-size: var(--fs-h3);
  font-weight: var(--fw-semibold);
  line-height: 1.4;
  color: var(--ink-strong);
  letter-spacing: 0;
  text-wrap: pretty;
}

@media (max-width: 640px) {
  :root { --fs-display: 2.25rem; --fs-h1: 1.75rem; --fs-h2: 1.375rem; --fs-h3: 1.1875rem; }
}
```

**Scale rationale:** a ~1.25 modular ratio from 16px, flattened at the small end so 14px/12px stay
crisp. Headings tighten line-height and letter-spacing as they grow; body copy never goes below
1.6 line-height. Body measure is capped at 68ch, and the question column at `--content-max` (720px).

---

## 6. Layout & rhythm

Vertical rhythm is a 4px grid consumed in three registers:

- **Inside a component:** `--sp-2` / `--sp-3` (label→control, icon→text)
- **Between components:** `--sp-5` / `--sp-6` (card→card, field→field)
- **Between page sections:** `--sp-9` / `--sp-10` (`64px` mobile, `96px` desktop)

```css
.container { width: 100%; max-width: var(--container-max); margin-inline: auto; padding-inline: var(--sp-5); }
.content   { width: 100%; max-width: var(--content-max);   margin-inline: auto; }
.section   { padding-block: var(--sp-9); }
@media (min-width: 900px) { .section { padding-block: var(--sp-10); } }
.stack > * + * { margin-top: var(--sp-4); }
.stack-lg > * + * { margin-top: var(--sp-6); }

.section--dark {
  background: var(--surface-inverse);
  color: var(--ink-on-dark);
}
.section--dark h1, .section--dark h2, .section--dark h3 { color: #FFFFFF; }
.section--dark .t-meta { color: var(--ink-muted-on-dark); }
```

---

## 7. Components

### 7.1 Buttons

Shared base, three variants. Height 44px default (48px `--lg`, 36px `--sm`) — 44px is the minimum
comfortable touch target and the test is taken on phones as often as desktops.

```css
.btn {
  --btn-h: 44px;
  display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
  min-height: var(--btn-h);
  padding: 0 var(--sp-5);
  font-family: var(--font-sans);
  font-size: var(--fs-body);
  font-weight: var(--fw-semibold);
  line-height: 1;
  letter-spacing: 0;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.btn:focus-visible { outline: 2px solid var(--brand-ring); outline-offset: 2px; }
.btn:active:not(:disabled) { transform: translateY(1px); }
.btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.btn--lg { --btn-h: 48px; font-size: var(--fs-body-lg); padding-inline: var(--sp-6); }
.btn--sm { --btn-h: 36px; font-size: var(--fs-sm);      padding-inline: var(--sp-4); }
.btn--block { display: flex; width: 100%; }

/* Primary — solid brand fill, one per view */
.btn--primary {
  background: var(--brand-primary);
  color: var(--brand-on-primary);
  box-shadow: var(--shadow-xs);
}
.btn--primary:hover:not(:disabled) { background: var(--brand-primary-hover); box-shadow: var(--shadow-sm); }
.btn--primary:active:not(:disabled) { background: var(--brand-primary-active); box-shadow: none; }

/* Secondary — outlined, same footprint */
.btn--secondary {
  background: var(--surface-0);
  color: var(--brand-primary);
  border-color: var(--border-strong);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--brand-primary-tint);
  border-color: var(--brand-tint-strong);
  color: var(--brand-primary-hover);
}
.btn--secondary:active:not(:disabled) { background: var(--brand-tint-strong); }

/* Ghost — no chrome until interacted with */
.btn--ghost {
  background: transparent;
  color: var(--ink-muted);
  border-color: transparent;
  padding-inline: var(--sp-4);
}
.btn--ghost:hover:not(:disabled) { background: var(--surface-2); color: var(--ink-body); }
.btn--ghost:active:not(:disabled) { background: var(--border); }

/* Accent — reserved for the single highest-intent CTA ("Start the test").
   Uses --accent-hover as the resting fill so white text clears AA (see §9). */
.btn--accent {
  background: var(--accent-hover);
  color: #FFFFFF;
  box-shadow: var(--shadow-sm);
}
.btn--accent:hover:not(:disabled) { background: var(--accent); box-shadow: var(--shadow-md); }
.btn--accent:active:not(:disabled) { background: #9C3D08; box-shadow: none; }

/* Danger — destructive confirmation inside modals */
.btn--danger { background: var(--danger); color: #FFFFFF; }
.btn--danger:hover:not(:disabled) { background: #A61D32; }
```

### 7.2 Question card

The primary surface of the test. One card per question, centered in the 720px column.

```css
.question-card {
  background: var(--surface-0);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--sp-6);
  max-width: var(--content-max);
  margin-inline: auto;
}
@media (min-width: 768px) { .question-card { padding: var(--sp-7); } }
@media (max-width: 480px) { .question-card { padding: var(--sp-5); border-radius: var(--radius-lg); } }

.question-card__head {
  display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4);
  margin-bottom: var(--sp-5);
  padding-bottom: var(--sp-4);
  border-bottom: 1px solid var(--border);
}
.question-card__counter {
  font-size: var(--fs-sm); font-weight: var(--fw-semibold);
  color: var(--ink-muted); font-variant-numeric: tabular-nums;
}
.question-card__counter b { color: var(--ink-strong); }   /* "7" of "7 / 20" */

.question-card__body   { margin-bottom: var(--sp-6); }
.question-card__hint   { margin-top: var(--sp-3); font-size: var(--fs-sm); color: var(--ink-muted); }
.question-card__code {
  margin-top: var(--sp-4);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--sp-4);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  line-height: 1.6;
  overflow-x: auto;
}
.question-card__foot {
  display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4);
  margin-top: var(--sp-6);
  padding-top: var(--sp-5);
  border-top: 1px solid var(--border);
}
```

### 7.3 Answer option (radio / checkbox)

Whole row is the hit target. The native input is kept in the DOM (never `display:none`) so screen
readers and keyboard navigation work; it is visually replaced by `.answer__marker`.

```css
.answer {
  position: relative;
  display: flex; align-items: flex-start; gap: var(--sp-3);
  padding: var(--sp-4);
  min-height: 56px;
  background: var(--surface-0);
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.answer + .answer { margin-top: var(--sp-3); }

.answer__input {                      /* accessible, visually hidden */
  position: absolute; opacity: 0; width: 1px; height: 1px;
  margin: 0; pointer-events: none;
}
.answer__marker {
  flex: 0 0 auto; width: 20px; height: 20px; margin-top: 2px;
  border: 2px solid var(--border-strong);
  background: var(--surface-0);
  border-radius: var(--radius-pill);          /* radio */
  display: grid; place-items: center;
  transition: border-color var(--dur-fast) var(--ease-out),
              background-color var(--dur-fast) var(--ease-out);
}
.answer--multi .answer__marker { border-radius: var(--radius-xs); }  /* checkbox */
.answer__marker::after {
  content: ""; width: 8px; height: 8px; border-radius: inherit;
  background: transparent;
  transform: scale(0.4);
  transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
}
.answer__text  { font-size: var(--fs-body); line-height: var(--lh-snug); color: var(--ink-body); }
.answer__badge {                      /* "Correct answer" / "Your answer" tag in review mode */
  margin-left: auto; align-self: center;
  font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  text-transform: uppercase; letter-spacing: var(--ls-caps);
  white-space: nowrap;
}

/* hover — only when still answerable */
.answer:hover:not(.is-locked) {
  background: var(--brand-primary-tint);
  border-color: var(--brand-tint-strong);
}
.answer:hover:not(.is-locked) .answer__marker { border-color: var(--brand-primary); }

/* keyboard focus travels to the label via :focus-within */
.answer:focus-within { outline: 2px solid var(--brand-ring); outline-offset: 2px; }

/* selected */
.answer.is-selected {
  background: var(--brand-primary-tint);
  border-color: var(--brand-primary);
  box-shadow: inset 0 0 0 1px var(--brand-primary);
}
.answer.is-selected .answer__marker { border-color: var(--brand-primary); background: var(--brand-primary); }
.answer.is-selected .answer__marker::after { background: #FFFFFF; transform: scale(1); }
.answer.is-selected .answer__text { color: var(--ink-strong); font-weight: var(--fw-medium); }

/* correct (review mode) */
.answer.is-correct {
  background: var(--success-soft);
  border-color: var(--success);
  box-shadow: inset 0 0 0 1px var(--success);
}
.answer.is-correct .answer__marker { border-color: var(--success); background: var(--success); }
.answer.is-correct .answer__marker::after { background: #FFFFFF; transform: scale(1); }
.answer.is-correct .answer__badge { color: var(--success); }

/* incorrect (review mode) */
.answer.is-incorrect {
  background: var(--danger-soft);
  border-color: var(--danger);
  box-shadow: inset 0 0 0 1px var(--danger);
}
.answer.is-incorrect .answer__marker { border-color: var(--danger); background: var(--danger); }
.answer.is-incorrect .answer__marker::after { background: #FFFFFF; transform: scale(1); }
.answer.is-incorrect .answer__text  { color: var(--ink-strong); }
.answer.is-incorrect .answer__badge { color: var(--danger); }

/* locked: results are shown, no further input */
.answer.is-locked { cursor: default; }
.answer.is-locked:not(.is-correct):not(.is-incorrect) { opacity: 0.7; }
```

Correct/incorrect must never be signalled by color alone: `.answer__marker` carries a check glyph in
the correct state and a cross in the incorrect state, and `.answer__badge` states it in words.

### 7.4 Progress bar

```css
.progress {
  display: flex; flex-direction: column; gap: var(--sp-2);
  width: 100%;
}
.progress__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: var(--fs-sm); color: var(--ink-muted); font-variant-numeric: tabular-nums;
}
.progress__track {
  position: relative;
  height: 8px;
  width: 100%;
  background: var(--surface-2);
  border-radius: var(--radius-pill);
  overflow: hidden;
}
.progress__fill {
  height: 100%;
  width: 0%;                                  /* set inline: style="width:35%" */
  background: var(--brand-primary);
  border-radius: inherit;
  transition: width var(--dur-slow) var(--ease-out);
}
.progress--slim .progress__track { height: 4px; }

/* Sticky header variant: full-bleed, no radius, sits under the app bar */
.progress--sticky {
  position: sticky; top: var(--header-h); z-index: 20;
}
.progress--sticky .progress__track { height: 4px; border-radius: 0; }

@media (prefers-reduced-motion: reduce) {
  .progress__fill { transition: none; }
}
```

Mark it up as `role="progressbar"` with `aria-valuenow` / `aria-valuemin="0"` / `aria-valuemax="20"`
and `aria-label="Question 7 of 20"`.

### 7.5 Timer chip

Neutral while there is time, amber under 25% remaining, red under 10% — the last state pulses once
per second, suppressed under reduced motion.

```css
.timer {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  height: 32px;
  padding: 0 var(--sp-3);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--ink-body);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
  transition: background-color var(--dur-base) var(--ease-out),
              color var(--dur-base) var(--ease-out),
              border-color var(--dur-base) var(--ease-out);
}
.timer__icon { width: 14px; height: 14px; flex: 0 0 auto; opacity: 0.8; }

.timer.is-warning {
  background: var(--warning-soft);
  border-color: var(--warning-border);
  color: var(--warning-ink);
}
.timer.is-critical {
  background: var(--danger-soft);
  border-color: var(--danger-border);
  color: var(--danger);
  animation: timer-pulse 1s var(--ease-in-out) infinite;
}
@keyframes timer-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(192, 36, 60, 0.0); }
  50%      { box-shadow: 0 0 0 4px rgba(192, 36, 60, 0.18); }
}
@media (prefers-reduced-motion: reduce) {
  .timer.is-critical { animation: none; border-width: 2px; }
}
```

The digits are `aria-live="off"`; announce remaining time only at 5:00, 1:00 and 0:10 via a separate
polite live region, so screen-reader users are not spammed every second.

### 7.6 Level result badge

Large ceremonial badge on the result screen, plus an inline `--sm` variant for history lists.

```css
.level-badge {
  display: inline-flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--tier-border, var(--border));
  background: var(--tier-soft, var(--surface-2));
  color: var(--tier-ink, var(--ink-strong));
  font-size: var(--fs-h4);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-heading);
}
.level-badge__dot {
  width: 10px; height: 10px; flex: 0 0 auto;
  border-radius: var(--radius-pill);
  background: var(--tier-solid, var(--ink-muted));
  box-shadow: 0 0 0 3px var(--tier-soft, transparent);
}
.level-badge__label { line-height: 1; }
.level-badge__score {
  margin-left: var(--sp-2); padding-left: var(--sp-3);
  border-left: 1px solid var(--tier-border, var(--border));
  font-size: var(--fs-body); font-weight: var(--fw-semibold);
  font-variant-numeric: tabular-nums; opacity: 0.9;
}

.level-badge--trainee { --tier-solid: var(--tier-trainee); --tier-soft: var(--tier-trainee-soft); --tier-ink: var(--tier-trainee-ink); --tier-border: var(--tier-trainee-border); }
.level-badge--junior  { --tier-solid: var(--tier-junior);  --tier-soft: var(--tier-junior-soft);  --tier-ink: var(--tier-junior-ink);  --tier-border: var(--tier-junior-border); }
.level-badge--middle  { --tier-solid: var(--tier-middle);  --tier-soft: var(--tier-middle-soft);  --tier-ink: var(--tier-middle-ink);  --tier-border: var(--tier-middle-border); }
.level-badge--senior  { --tier-solid: var(--tier-senior);  --tier-soft: var(--tier-senior-soft);  --tier-ink: var(--tier-senior-ink);  --tier-border: var(--tier-senior-border); }

/* Hero variant on the result screen */
.level-badge--hero {
  flex-direction: column; gap: var(--sp-2);
  padding: var(--sp-6) var(--sp-8);
  border-radius: var(--radius-2xl);
  border-width: 2px;
  font-size: var(--fs-h1);
  box-shadow: var(--shadow-md);
}
.level-badge--hero .level-badge__score {
  margin: 0; padding: 0; border: 0; font-size: var(--fs-body-lg);
}

/* Compact inline variant */
.level-badge--sm {
  padding: var(--sp-1) var(--sp-3);
  font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  text-transform: uppercase; letter-spacing: var(--ls-caps);
  gap: var(--sp-2);
}
.level-badge--sm .level-badge__dot { width: 6px; height: 6px; box-shadow: none; }

/* Solid variant for dense tables — white text on the tier color */
.level-chip {
  display: inline-flex; align-items: center;
  padding: 2px var(--sp-3); border-radius: var(--radius-pill);
  font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  color: #FFFFFF; background: var(--tier-solid, var(--ink-muted));
}
[data-theme="dark"] .level-chip { color: var(--surface-1); }
```

Tier semantics: Trainee grey (neutral, no judgement), Junior green (growing), Middle amber
(established), Senior crimson (peak). Crimson is deliberately *not* the danger red — `#B72544` vs
`#C0243C` — and every badge carries its tier name in text, so the color is reinforcement only.

### 7.7 Modal / dialog

Built on `<dialog>`; the scrim is the element's own `::backdrop`.

```css
.modal {
  width: min(560px, calc(100vw - var(--sp-6)));
  max-height: min(80vh, 720px);
  padding: 0;
  background: var(--surface-0);
  color: var(--ink-body);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}
.modal::backdrop {
  background: rgba(11, 23, 40, 0.55);
  backdrop-filter: blur(2px);
}
.modal[open] { animation: modal-in var(--dur-base) var(--ease-out); }
@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(0.985); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .modal[open] { animation: none; } }

.modal__head {
  display: flex; align-items: flex-start; gap: var(--sp-4);
  padding: var(--sp-5) var(--sp-6);
  border-bottom: 1px solid var(--border);
}
.modal__title { font-size: var(--fs-h3); font-weight: var(--fw-semibold); color: var(--ink-strong); margin: 0; }
.modal__close {
  margin-left: auto; flex: 0 0 auto;
  width: 32px; height: 32px; display: grid; place-items: center;
  background: transparent; border: 0; border-radius: var(--radius-sm);
  color: var(--ink-muted); cursor: pointer;
}
.modal__close:hover { background: var(--surface-2); color: var(--ink-body); }
.modal__close:focus-visible { outline: 2px solid var(--brand-ring); outline-offset: 2px; }

.modal__body { padding: var(--sp-6); overflow-y: auto; }
.modal__foot {
  display: flex; justify-content: flex-end; gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-6);
  background: var(--surface-1);
  border-top: 1px solid var(--border);
}
@media (max-width: 520px) {
  .modal__foot { flex-direction: column-reverse; }
  .modal__foot .btn { width: 100%; }
}
```

Requirements: `aria-labelledby` pointing at `.modal__title`, focus moved to the dialog on open and
restored to the trigger on close, Escape closes (except the anti-cheat dialog, which is modal and
non-dismissible until acknowledged).

### 7.8 Anti-cheat warning banner

Shown when the tab loses focus or the window is blurred during the test. Amber for the first
warnings, red once the strike limit is reached.

```css
.cheat-banner {
  display: flex; align-items: flex-start; gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  background: var(--warning-soft);
  border: 1px solid var(--warning-border);
  border-left: 4px solid var(--warning);
  border-radius: var(--radius-md);
  color: var(--warning-ink);
  box-shadow: var(--shadow-sm);
}
.cheat-banner__icon { flex: 0 0 auto; width: 20px; height: 20px; margin-top: 1px; color: var(--warning); }
.cheat-banner__content { flex: 1 1 auto; min-width: 0; }
.cheat-banner__title {
  margin: 0 0 var(--sp-1);
  font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: var(--lh-snug);
  color: var(--warning-ink);
}
.cheat-banner__text { margin: 0; font-size: var(--fs-sm); line-height: var(--lh-snug); }
.cheat-banner__count {
  font-weight: var(--fw-semibold); font-variant-numeric: tabular-nums;
}
.cheat-banner__actions { display: flex; gap: var(--sp-2); margin-top: var(--sp-3); }

/* Final strike — test is about to be invalidated */
.cheat-banner--critical {
  background: var(--danger-soft);
  border-color: var(--danger-border);
  border-left-color: var(--danger);
  color: var(--danger);
}
.cheat-banner--critical .cheat-banner__icon,
.cheat-banner--critical .cheat-banner__title { color: var(--danger); }

/* Sticky placement directly under the sticky progress bar */
.cheat-banner--sticky {
  position: sticky; top: calc(var(--header-h) + 4px); z-index: 30;
  margin-bottom: var(--sp-5);
  animation: banner-in var(--dur-base) var(--ease-out);
}
@keyframes banner-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .cheat-banner--sticky { animation: none; } }
```

Markup: `role="alert"` on the banner so it is announced immediately. Copy pattern —
title *"You left the test page"*, text *"Switching tabs or windows during the test is recorded.
Warning `<span class="cheat-banner__count">2 of 3</span>` — a third will end your attempt."*
On the final strike, escalate to a non-dismissible `.modal` using `.cheat-banner--critical` styling
inside `.modal__body`.

### 7.9 Focus, selection and reduced motion (global)

```css
:focus-visible { outline: 2px solid var(--brand-ring); outline-offset: 2px; border-radius: var(--radius-xs); }
::selection { background: var(--brand-tint-strong); color: var(--ink-strong); }
.skip-link {
  position: absolute; left: var(--sp-4); top: -100px; z-index: 100;
  padding: var(--sp-3) var(--sp-4);
  background: var(--surface-0); color: var(--brand-primary);
  border: 1px solid var(--brand-primary); border-radius: var(--radius-md);
  font-weight: var(--fw-semibold);
}
.skip-link:focus { top: var(--sp-4); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. Elevation usage

| Level | Token | Used by |
| --- | --- | --- |
| 0 | none | page background, dark sections, inline text |
| 1 | `--shadow-xs` | primary button at rest, flat tiles |
| 2 | `--shadow-sm` | banners, timer, hovered secondary surfaces |
| 3 | `--shadow-md` | question card, hero level badge, hovered accent button |
| 4 | `--shadow-lg` | popovers, dropdown menus, toasts |
| 5 | `--shadow-xl` | modal dialog |

Radius pairs with elevation: `--radius-md` for controls, `--radius-lg` for answer options,
`--radius-xl` for cards and modals, `--radius-2xl` for the result hero, `--radius-pill` for chips,
badges and the progress track only.

---

## 9. Accessibility — computed contrast ratios

All ratios computed with the WCAG 2.1 relative-luminance formula against the stated background.
AA thresholds: **4.5:1** normal text, **3:1** large text (≥18.66px bold / ≥24px regular) and non-text
UI/graphical boundaries.

### Required pairs (light theme)

| Pair | Ratio | AA normal | AA large / non-text |
| --- | --- | --- | --- |
| `--brand-primary #12508F` on white | **8.17:1** | Pass | Pass |
| White on `--brand-primary #12508F` | **8.17:1** | Pass | Pass |
| `--brand-primary-hover #0E3F72` on white | **10.65:1** | Pass | Pass |
| White on `--brand-primary-hover #0E3F72` | **10.65:1** | Pass | Pass |
| `--brand-primary` on `--brand-primary-tint #E9F1FA` | **7.17:1** | Pass | Pass |
| `--ink-strong #0F1B2A` on white | **17.35:1** | Pass | Pass |
| `--ink-body #2E3A4B` on white | **11.52:1** | Pass | Pass |
| `--ink-body` on `--surface-2 #EDF1F7` | **10.16:1** | Pass | Pass |
| `--ink-muted #5A6B80` on white | **5.46:1** | Pass | Pass |
| `--ink-muted` on `--surface-1 #F7F9FC` | **5.17:1** | Pass | Pass |
| `--success #12794C` on white / white on it | **5.43:1** | Pass | Pass |
| `--success` on `--success-soft #E4F4EC` | **4.77:1** | Pass | Pass |
| `--warning #B45309` on white / white on it | **5.02:1** | Pass | Pass |
| `--warning-ink #8A4B04` on `--warning-soft #FDF0DC` | **6.05:1** | Pass | Pass |
| `--danger #C0243C` on white / white on it | **5.90:1** | Pass | Pass |
| `--danger` on `--danger-soft #FCE8EC` | **5.03:1** | Pass | Pass |
| `--info #1069C2` on white / white on it | **5.49:1** | Pass | Pass |
| `--info-ink #0B4F93` on `--info-soft #E5F0FB` | **7.12:1** | Pass | Pass |
| `--brand-ring #1A6FE0` on white (focus ring) | **4.78:1** | n/a | Pass |

### Seniority tiers (light theme)

| Pair | Ratio | AA normal | AA large / non-text |
| --- | --- | --- | --- |
| White on `--tier-trainee #5B6B7F` (`.level-chip`) | **5.45:1** | Pass | Pass |
| `--tier-trainee-ink #47566A` on `--tier-trainee-soft #EEF1F5` | **6.60:1** | Pass | Pass |
| White on `--tier-junior #14764A` | **5.65:1** | Pass | Pass |
| `--tier-junior-ink #0F5C3A` on `--tier-junior-soft #E3F5EC` | **7.10:1** | Pass | Pass |
| White on `--tier-middle #8A5E00` | **5.70:1** | Pass | Pass |
| `--tier-middle-ink #6E4A00` on `--tier-middle-soft #FBF0D9` | **7.03:1** | Pass | Pass |
| White on `--tier-senior #B72544` | **6.25:1** | Pass | Pass |
| `--tier-senior-ink #8E1B34` on `--tier-senior-soft #FBE6EB` | **7.48:1** | Pass | Pass |

All four tiers clear AA for normal text in both the solid and soft treatments. The amber tier was
deliberately darkened from a conventional `#B07908` (which measured **3.76:1** against white — a
fail) to `#8A5E00`.

### Dark theme

| Pair | Ratio | Verdict |
| --- | --- | --- |
| White on `--brand-primary #2F72C4` | **4.86:1** | Pass |
| `--ink-strong #F2F6FB` / `--ink-body #D5DFEC` on `--surface-0 #142235` | **13.60:1** / **11.75:1** | Pass |
| `--ink-muted #9FB0C4` on `--surface-0 #142235` | **7.24:1** | Pass |
| `--ink-muted #9FB0C4` on `--surface-1 #0B1728` | **8.12:1** | Pass |
| `--accent #FF8A3D` on `--surface-1 #0B1728` | **7.67:1** | Pass |
| `--tier-trainee #A8B6C7` on `--tier-trainee-soft #1B2838` | **7.23:1** | Pass |
| `--tier-junior #4ECB8B` on `--tier-junior-soft #10352A` | **6.54:1** | Pass |
| `--tier-middle #E5A93A` on `--tier-middle-soft #33270B` | **7.01:1** | Pass |
| `--tier-senior #F2708B` on `--tier-senior-soft #35141D` | **5.88:1** | Pass |
| `--success #3FBF80` on `--surface-1 #0B1728` | **7.69:1** | Pass |
| `--danger #F2708B` on `--surface-0 #142235` | **5.63:1** | Pass |
| `--info #6FB2F5` on `--surface-1 #0B1728` | **8.02:1** | Pass |

### Failures and constrained usage — read this

1. **`--accent #E4610F` with white text = 3.49:1 — FAILS AA for normal text.** It passes AA for
   large text (≥3:1) and for non-text/graphical use. Therefore `.btn--accent` uses
   `--accent-hover #C24F09` (**4.76:1**, passes) as its *resting* fill and moves to `#E4610F` only on
   hover, where a large semibold label is already above the large-text threshold. Never put 14px or
   16px regular white text on `#E4610F`.
2. **`--accent #E4610F` as text on white = 3.49:1 — FAILS AA.** Use `--accent-ink #A8430A`
   (**6.05:1** on white, **5.37:1** on `--accent-soft`) for any accent-colored text or link.
3. **Borders are not text.** `--border #DCE3EC` measures 1.29:1 and `--border-strong #C2CCD9`
   measures 1.62:1 against white. These are decorative hairlines only. Every control whose
   *state* is conveyed by its outline — the answer option, inputs — additionally carries a
   ≥3:1 boundary in its active states (`--brand-primary` 8.17:1, `--success` 5.43:1,
   `--danger` 5.90:1) plus a non-color indicator.
4. **Never color-only.** Correct/incorrect answers carry a check/cross glyph and a text badge;
   tiers carry their name; the timer's critical state thickens its border under reduced motion;
   the anti-cheat banner carries an icon plus explicit "2 of 3" wording.
5. **Focus is always visible.** `--brand-ring` at 2px with a 2px offset clears 3:1 against white
   (4.78:1) and against `--surface-1` (3.68:1). Do not remove `:focus-visible` outlines.
6. **Touch targets.** Buttons are ≥44px tall, answer options ≥56px, the modal close button is 32px
   visually but should be padded to a 44px hit area on touch pointers.

---

## 10. Reskin checklist

When the real TestFort style guide arrives:

1. Replace the six values in the `BRAND SWAP POINTS` block (§3) and the corresponding six in both
   dark-theme blocks (§4).
2. Re-run the contrast check for: primary-on-white, white-on-primary, white-on-accent-fill,
   accent-as-text-on-white, and focus ring on both surfaces.
3. If the real accent is lighter than `#C24F09`, derive a darker `--accent-hover` for the button
   fill rather than lowering the contrast requirement.
4. Swap `--font-sans` / `--font-display` if the brand mandates a licensed face; keep the fallback
   chain intact and re-check the 14px/12px steps for legibility in the new face.
5. Leave the four tier colors alone unless they clash with the new primary — they are tuned for
   AA at both solid and soft weights, and the amber in particular has little headroom.
