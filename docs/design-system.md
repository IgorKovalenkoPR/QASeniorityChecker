# QA Seniority Checker — Design System

Version 2.0 · Authored 2026-09-04 · Repainted in the real TestFort palette 2026-09-06
Visual direction: the TestFort brand palette, read from the CSS variables served by testfort.com
on 2026-09-06 (see section 1).

---

## 1. Source evidence & provenance

**Read this before trusting any hex value below.**

### Where the brand colors come from

| Target | Method | Result |
| --- | --- | --- |
| `https://testfort.com/` | CSS custom properties served by the live site | **Retrieved 2026-09-06** |

The palette below is **not inferred**. These are the theme variables the site itself ships:

```css
--color-black:  #111111
--color-grey:   #464646
--color-light:  #E6EEF3
--color-red:    #FF3333
--color-white:  #FFFFFF
--color-yellow: #FF865C   /* named "yellow", actually the coral brand accent */

--wp--preset--color--orange:     #FF865C
--wp--preset--color--dark-gray:  #464646
--wp--preset--color--light-gray: #E6EEF3
--wp--preset--color--lite-dark:  #E4E4E4

--tf-card-hover-bg: #545454  /* dark card */ | #f6f9fb /* light card */
```

Button rules from the same stylesheet:

```css
.btn        { background: #111111; border: 2px solid #111111; border-radius: 200px; line-height: 44px; }
.btn span   { color: #FFFFFF; font-size: 18px; font-weight: 500; font-family: Poppins; }
.btn.orange { background: linear-gradient(90deg, #FF865C 0%, #FF8A59 100%); border: none; }
```

Two facts follow directly, and they shape the entire mapping:

1. **TestFort's primary CTA is black with a white label, pill-shaped.** The coral is the *accent*,
   not the primary.
2. **The brand face is Poppins**, not Inter (see §5 — this is recorded as a finding, not yet acted on).

### Provenance of every value in this document

| Category | Status |
| --- | --- |
| The six BRAND SWAP POINTS, plus `--ink-*`, `--surface-*` and dark-theme neutrals derived from them | **SOURCED** — CSS variables served by testfort.com, retrieved 2026-09-06 |
| `--brand-ring`, `--accent-ink`, `--accent-hover`, `--accent-on-fill`, `--brand-tint-strong`, `--accent-soft*`, `--brand-primary-hover` | **DERIVED** — computed from the sourced hexes and validated to AA (§9) |
| Seniority-tier and semantic (success / warning / danger / info) colors | **PRODUCT-OWNED** — not brand colors; unchanged, still AA-validated (§9) |
| Sizes, radii, spacing, shadows, motion | **PRODUCT-OWNED** — one exception: button radius now follows the brand's 200px pill |

Nothing in this document is marked INFERRED any more. The only judgement calls left are the
*mapping* decisions in §1.1 and the derived shades, and both are justified by computed contrast.

### 1.1 Mapping decision — why the primary is black and not coral

`#FF865C` on white measures **2.38:1**. That single number decides the mapping: the coral fails AA
as text (needs 4.5:1) and fails even the 3:1 non-text threshold, so it cannot be a link color, a
border, a focus ring, a progress fill, or a fill under white text. Against `#111111` it measures
**7.93:1**, so it works perfectly as a *fill under near-black text*.

Two candidate mappings were evaluated:

**Option A — `--brand-primary: #111111`, coral as accent. CHOSEN.**
Matches what the brand actually does (`.btn` is black; `.btn.orange` is the exception), keeps the
coral at its real, unmodified value where it is legally usable, and every primary surface lands
between 9:1 and 19:1. Its one weakness is that a near-black link is not distinguishable from body
copy by color — addressed below.

**Option B — `--brand-primary:` a darkened coral (≈`#B84520`), coral as accent.**
Rejected. It puts a color the brand never uses on every button, link, border and progress bar; at
5.37:1 it is also far weaker than black on white; and the app would read as terracotta rather than
as TestFort. The darkened coral is still computed and kept — but scoped to the two jobs that
genuinely need a coral that passes AA: `--accent-ink` (accent as text) and `--brand-ring`.

**How links and focus stay recognizable under Option A:**

- **Links** carry a permanent underline (`text-decoration-line: underline`, 1px, 2px offset) — the
  non-color affordance required by WCAG 1.4.1. On hover they shift to `--accent-ink #B84520`
  (5.37:1 on white) and the underline thickens to 2px, so the accent hue still marks interactivity.
- **Focus** does *not* use the primary. `--brand-ring` is the darkened coral `#B84520`: 5.37:1 on
  white, 5.08:1 on `--surface-1`, 4.74:1 on `--surface-2`, 4.57:1 on the brand tint, and 3.52:1
  even directly over the black CTA fill — so the ring reads as a distinct chromatic signal against
  every surface *and* against the black button, which a black ring would not.
- **Selection** is warm, **hover** is cool: hovering an answer tints it `--brand-primary-tint`
  `#E6EEF3`, selecting it tints it `--accent-soft #FFF0EA` and adds a 3px coral inset bar plus a
  near-black border. Two states, two hues, plus a non-color indicator.

**Action required from the client:** none for color. The remaining open item is the typeface (§5).

---

## 2. Visual tone

Calm, engineered, trustworthy — this is an assessment tool, not a game. The page reads as a clean
white document with a lot of air; color is spent deliberately and never decoratively. This is the
TestFort scheme: near-black carries structure and action, the brand's cool light `#E6EEF3` carries
surfaces and hover states, and the coral `#FF865C` is the single warm emphasis — a filled CTA, a
selected answer, a focus ring in its darkened form. The four seniority tiers are the only place
where a full spectrum appears, which is what makes the result screen land.

Buttons are pills (the brand's own `.btn` is `border-radius: 200px`); cards and inputs stay softly
rounded at 8–16px. Shadows are low, wide and neutral-black. Gradients are not used on interactive
surfaces — the brand's `.btn.orange` gradient runs `#FF865C → #FF8A59`, a 1.4% luminance step that
is invisible at button scale, so the flat coral is used instead.

---

## 3. Design tokens — light theme

```css
:root {
  /* ==================================================================
     BRAND SWAP POINTS — the six values that carry the TestFort identity.
     Everything below derives from these. Values are REAL, read from the
     CSS variables served by testfort.com on 2026-09-06.
     ================================================================== */
  --brand-primary:        #111111;  /* brand --color-black; .btn fill, links, borders */
  --brand-primary-hover:  #2E2E2E;  /* derived: one step along black→grey ramp        */
  --brand-primary-active: #464646;  /* brand --color-grey; pressed state              */
  --brand-primary-tint:   #E6EEF3;  /* brand --color-light; subtle fills              */
  --accent:               #FF865C;  /* brand --color-yellow / orange — coral accent   */
  --ink-inverse-bg:       #111111;  /* brand --color-black; footer / dark sections    */
  /* ================================================================== */

  /* --- Brand ramp (derived) --- */
  --brand-tint-strong:    #C6D6E0;  /* borders on tinted surfaces              */
  --brand-on-primary:     #FFFFFF;  /* text/icon on a primary fill — 18.88:1   */
  --brand-ring:           #B84520;  /* focus ring = accent darkened to clear 3:1
                                       on every light surface (and 3.52:1 even
                                       directly over the black CTA fill)       */

  /* --- Accent ramp (derived) ---
     The coral is a fill-only color in the light theme. */
  --accent-on-fill:       #111111;  /* text/icon ON a coral fill — 7.93:1      */
  --accent-hover:         #FF9E7C;  /* lighter coral for hover fills — 9.38:1  */
  --accent-ink:           #B84520;  /* accent as TEXT on light surfaces — 5.37:1
                                       (coral itself is 2.38:1 and is banned)  */
  --accent-soft:          #FFF0EA;  /* accent tinted background                */
  --accent-soft-border:   #FFD3C2;

  /* --- Ink scale (3 steps) — neutral, matching the brand black/grey --- */
  --ink-strong:           #111111;  /* brand black — headings, numbers         */
  --ink-body:             #464646;  /* brand grey — body copy, answer text     */
  --ink-muted:            #666666;  /* labels, meta, helper text, placeholders */
  --ink-on-dark:          #E6EEF3;  /* brand light — body text on dark         */
  --ink-muted-on-dark:    #ABB4B9;

  /* --- Surface scale (3 steps) --- */
  --surface-0:            #FFFFFF;  /* brand --color-white; cards, modals      */
  --surface-1:            #F6F9FB;  /* brand light-card bg; page background    */
  --surface-2:            #EDF1F7;  /* inset wells, disabled fills, track bg   */
  --surface-inverse:      var(--ink-inverse-bg);
  --surface-inverse-2:    #1F1F1F;  /* raised block inside a dark section      */

  /* --- Borders --- */
  --border:               #DCE3EC;  /* default hairline                        */
  --border-strong:        #C2CCD9;  /* inputs, interactive outlines            */
  --border-inverse:       #333333;

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
  --radius-md:   8px;   /* inputs                             */
  --radius-lg:   12px;  /* answer options, small cards        */
  --radius-xl:   16px;  /* question card, modal               */
  --radius-2xl:  24px;  /* hero / result panel                */
  --radius-pill: 999px; /* buttons (brand .btn = 200px), chips,
                           progress track, tier badge         */

  /* --- Shadows (neutral black, low and wide) --- */
  --shadow-xs: 0 1px 2px rgba(17, 17, 17, 0.06);
  --shadow-sm: 0 1px 3px rgba(17, 17, 17, 0.08), 0 1px 2px rgba(17, 17, 17, 0.04);
  --shadow-md: 0 4px 12px rgba(17, 17, 17, 0.08), 0 1px 3px rgba(17, 17, 17, 0.04);
  --shadow-lg: 0 12px 32px rgba(17, 17, 17, 0.12), 0 2px 8px rgba(17, 17, 17, 0.06);
  --shadow-xl: 0 24px 64px rgba(17, 17, 17, 0.18), 0 4px 12px rgba(17, 17, 17, 0.08);
  /* Decorative reinforcement only: the compliant focus signal is the
     --brand-primary border change (18.88:1) plus the --brand-ring outline. */
  --shadow-focus: 0 0 0 3px rgba(184, 69, 32, 0.30);

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
    /* --- Brand ramp inverts: the black pill becomes a white pill --- */
    --brand-primary:        #FFFFFF;  /* brand --color-white — inverse CTA fill  */
    --brand-primary-hover:  #E6EEF3;  /* brand --color-light                     */
    --brand-primary-active: #D2DEE5;  /* derived, one step darker                */
    --brand-primary-tint:   #262626;  /* neutral raised fill                     */
    --brand-tint-strong:    #454545;  /* ~brand --color-grey                     */
    --brand-on-primary:     #111111;  /* brand black on the white pill — 18.88:1 */
    --brand-ring:           #FF865C;  /* the true coral is legible on dark: 7.31:1
                                         on --surface-0, 6.35:1 on --surface-2   */

    /* --- Accent ramp: on dark the coral needs no darkening --- */
    --accent:               #FF865C;
    --accent-on-fill:       #111111;  /* a coral fill ALWAYS carries black ink   */
    --accent-hover:         #FF9E7C;
    --accent-ink:           #FF865C;  /* 7.31:1 on --surface-0                   */
    --accent-soft:          #33201A;
    --accent-soft-border:   #6B3A2A;

    /* --- Ink + surfaces go neutral: the brand's dark is black, not navy --- */
    --ink-strong:           #FFFFFF;
    --ink-body:             #E6EEF3;  /* brand --color-light                     */
    --ink-muted:            #ABB4B9;

    --surface-0:            #1A1A1A;
    --surface-1:            #111111;  /* brand --color-black                     */
    --surface-2:            #262626;
    --surface-inverse:      #F6F9FB;
    --surface-inverse-2:    #EDF1F7;

    --border:               #333333;
    --border-strong:        #545454;  /* brand --tf-card-hover-bg (dark card)    */

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
    --shadow-focus: 0 0 0 3px rgba(255, 134, 92, 0.35);
  }
}

[data-theme="dark"] {
  /* --- Brand ramp inverts: the black pill becomes a white pill --- */
  --brand-primary:        #FFFFFF;  /* brand --color-white — inverse CTA fill  */
  --brand-primary-hover:  #E6EEF3;  /* brand --color-light                     */
  --brand-primary-active: #D2DEE5;  /* derived, one step darker                */
  --brand-primary-tint:   #262626;  /* neutral raised fill                     */
  --brand-tint-strong:    #454545;  /* ~brand --color-grey                     */
  --brand-on-primary:     #111111;  /* brand black on the white pill — 18.88:1 */
  --brand-ring:           #FF865C;  /* the true coral is legible on dark: 7.31:1
                                       on --surface-0, 6.35:1 on --surface-2   */

  /* --- Accent ramp: on dark the coral needs no darkening --- */
  --accent:               #FF865C;
  --accent-on-fill:       #111111;  /* a coral fill ALWAYS carries black ink   */
  --accent-hover:         #FF9E7C;
  --accent-ink:           #FF865C;  /* 7.31:1 on --surface-0                   */
  --accent-soft:          #33201A;
  --accent-soft-border:   #6B3A2A;

  /* --- Ink + surfaces go neutral: the brand's dark is black, not navy --- */
  --ink-strong:           #FFFFFF;
  --ink-body:             #E6EEF3;  /* brand --color-light                     */
  --ink-muted:            #ABB4B9;

  --surface-0:            #1A1A1A;
  --surface-1:            #111111;  /* brand --color-black                     */
  --surface-2:            #262626;
  --surface-inverse:      #F6F9FB;
  --surface-inverse-2:    #EDF1F7;

  --border:               #333333;
  --border-strong:        #545454;  /* brand --tf-card-hover-bg (dark card)    */

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
  --shadow-focus: 0 0 0 3px rgba(255, 134, 92, 0.35);
}
```

Note on dark-mode fills: the black pill cannot survive on a dark page, so it **inverts** —
`--brand-primary` becomes `#FFFFFF` and `--brand-on-primary` becomes the brand black `#111111`
(18.88:1). The surfaces go neutral (`#111111` / `#1A1A1A` / `#262626`) rather than navy, because
the brand's own dark is `--color-black`, and `--border-strong` picks up the brand's dark-card hover
grey `#545454`. On dark the coral needs no darkening: `#FF865C` measures 7.31:1 on `--surface-0`,
so `--accent-ink` and `--brand-ring` are the true brand coral there. `--accent-on-fill` stays
`#111111` in both themes — a coral fill always carries black ink.

---

## 5. Typography

### OPEN FINDING — the brand face is Poppins, the app ships Inter

The stylesheet served by testfort.com sets `.btn span { font-family: Poppins; }` — Poppins is the
TestFort brand face. This application still uses Inter, and **that has deliberately not been
changed**; it is a decision for the product owner, not a side effect of a recolor.

Trade-off, for the record:

- **Switching to Poppins** is the brand-faithful choice. Cost: it is not a system font, so it means
  an external Google Fonts request (or self-hosting ~4 WOFF2 files, ≈60–90 KB for 400/500/600/700).
  Poppins is a geometric sans with a tall x-height and *tabular figures that are not on by default*
  — the timer and the score readouts change digits in place, so it would need
  `font-variant-numeric: tabular-nums` explicitly (it is already set on `.timer`, but the result
  numbers would need auditing). Its lowercase is wider than Inter's at the same size, so the 14px
  and 12px steps get noticeably chunkier and dense tables would need re-checking.
- **Staying on Inter** costs nothing at runtime (no third-party request, no font-loading shift, no
  extra CSP/privacy surface), keeps the tabular figures and the tuned small sizes, and reads as a
  neutral UI grotesque next to a black-and-coral brand.

**Recommendation:** self-host Poppins for headings only (`--font-display`) and keep Inter for UI
and body copy — the brand voice lands in the display type while the assessment UI keeps its
metrics. Do not add a `fonts.googleapis.com` link without an explicit decision from the owner.
Until that decision, `--font-sans` and `--font-display` both remain Inter.

Inter is the current type choice: a neutral, highly legible UI grotesque with excellent tabular
figures — which matters here, since the timer and the score readouts change digits in place. Load
weights 400/500/600/700 only.

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
  border-radius: var(--radius-pill);   /* brand .btn is border-radius: 200px */
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
   The real brand coral at full strength, under NEAR-BLACK text: #111111 on
   #FF865C is 7.93:1. White on it would be 2.38:1 — which is what the brand's
   own .btn.orange does, and it is not reproduced here (see §9). */
.btn--accent {
  background: var(--accent);
  color: var(--accent-on-fill);
  box-shadow: var(--shadow-sm);
}
.btn--accent:hover:not(:disabled) { background: var(--accent-hover); box-shadow: var(--shadow-md); }
.btn--accent:active:not(:disabled) { background: var(--accent); box-shadow: none; }

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

/* selected — warm (accent tint) against the cool hover tint, so "hovered" and
   "chosen" differ in hue as well as in weight. The >=3:1 boundary is carried by
   the near-black border (18.88:1), never by the coral. */
.answer.is-selected {
  background: var(--accent-soft);
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

Radius pairs with elevation: `--radius-pill` for buttons (the brand's `.btn` is 200px),
`--radius-md` for inputs, `--radius-lg` for answer options,
`--radius-xl` for cards and modals, `--radius-2xl` for the result hero, `--radius-pill` for chips,
badges and the progress track only.

---

## 9. Accessibility — computed contrast ratios

All ratios were computed with the WCAG 2.1 relative-luminance formula by script, not estimated.
AA thresholds: **4.5:1** normal text, **3:1** large text (>=18.66px bold / >=24px regular) and
non-text UI/graphical boundaries.

### Brand pairs (light theme)

| Pair | Ratio | AA normal | AA large / non-text |
| --- | --- | --- | --- |
| `--brand-on-primary #FFFFFF` on `--brand-primary #111111` (primary CTA) | **18.88:1** | Pass | Pass |
| `#FFFFFF` on `--brand-primary-hover #2E2E2E` | **13.58:1** | Pass | Pass |
| `#FFFFFF` on `--brand-primary-active #464646` | **9.44:1** | Pass | Pass |
| `--brand-primary` as link/text on `--surface-0 #FFFFFF` | **18.88:1** | Pass | Pass |
| `--brand-primary` as link/text on `--surface-1 #F6F9FB` | **17.86:1** | Pass | Pass |
| `--brand-primary` on `--brand-primary-tint #E6EEF3` (pager, secondary btn) | **16.09:1** | Pass | Pass |
| `--brand-primary` as border/graphic on `--surface-0` (selected option, input focus) | **18.88:1** | n/a | Pass |
| `--brand-primary` as progress fill on `--surface-2 #EDF1F7` | **16.66:1** | n/a | Pass |
| `--accent-on-fill #111111` on `--accent #FF865C` (accent CTA label) | **7.93:1** | Pass | Pass |
| `--accent-on-fill` on `--accent-hover #FF9E7C` | **9.38:1** | Pass | Pass |
| `--accent-ink #B84520` on `--surface-0` | **5.37:1** | Pass | Pass |
| `--accent-ink` on `--surface-1` | **5.08:1** | Pass | Pass |
| `--accent-ink` on `--accent-soft #FFF0EA` | **4.83:1** | Pass | Pass |

### Focus ring (light theme) — `--brand-ring #B84520`

| Against | Ratio | >=3:1 |
| --- | --- | --- |
| `--surface-0 #FFFFFF` | **5.37:1** | Pass |
| `--surface-1 #F6F9FB` | **5.08:1** | Pass |
| `--surface-2 #EDF1F7` | **4.74:1** | Pass |
| `--brand-primary-tint #E6EEF3` | **4.57:1** | Pass |
| directly over the `--brand-primary #111111` fill | **3.52:1** | Pass |

The 2px `outline-offset` means the ring's adjacent color is normally the surrounding surface; the
last row shows it still clears 3:1 even if the offset is ever removed. This is precisely why the
ring is the darkened coral and not the near-black primary — a `#111111` ring would measure
**1.00:1** against the black CTA.

### Ink and surfaces (light theme)

| Pair | Ratio | AA normal |
| --- | --- | --- |
| `--ink-strong #111111` on `--surface-0` / `--surface-1` | **18.88:1** / **17.86:1** | Pass |
| `--ink-body #464646` on `--surface-0` | **9.44:1** | Pass |
| `--ink-body` on `--surface-1` / `--surface-2` | **8.93:1** / **8.33:1** | Pass |
| `--ink-body` on `--brand-primary-tint #E6EEF3` (hovered option) | **8.04:1** | Pass |
| `--ink-body` on `--accent-soft #FFF0EA` (selected option) | **8.50:1** | Pass |
| `--ink-muted #666666` on `--surface-0` | **5.74:1** | Pass |
| `--ink-muted` on `--surface-1` / `--surface-2` | **5.43:1** / **5.07:1** | Pass |
| `--ink-on-dark #E6EEF3` on `--ink-inverse-bg #111111` | **16.09:1** | Pass |
| `--ink-muted-on-dark #ABB4B9` on `--ink-inverse-bg` | **8.96:1** | Pass |

### Semantic colors (light theme, unchanged — not brand colors)

| Pair | Ratio | AA normal |
| --- | --- | --- |
| `--success #12794C` on white / white on it | **5.43:1** | Pass |
| `--success` on `--success-soft #E4F4EC` | **4.77:1** | Pass |
| `--warning #B45309` on white / white on it | **5.02:1** | Pass |
| `--warning-ink #8A4B04` on `--warning-soft #FDF0DC` | **6.05:1** | Pass |
| `--danger #C0243C` on white / white on it | **5.90:1** | Pass |
| `--danger` on `--danger-soft #FCE8EC` | **5.03:1** | Pass |
| `--info #1069C2` on white / white on it | **5.49:1** | Pass |
| `--info-ink #0B4F93` on `--info-soft #E5F0FB` | **7.12:1** | Pass |

Note on the brand red: `--color-red #FF3333` measures **3.64:1** on white — it passes the 3:1
non-text threshold but fails AA as text, so `--danger` keeps the darker `#C0243C` and the brand red
is not used in the product UI.

### Seniority tiers (light theme, unchanged)

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
| Tier bar fills on `--surface-2` (trainee / junior / middle / senior) | **4.81 / 4.98 / 5.03 / 5.51:1** | n/a | Pass |

The amber tier was deliberately darkened from a conventional `#B07908` (**3.76:1** against white —
a fail) to `#8A5E00`.

### Dark theme

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `--brand-on-primary #111111` on `--brand-primary #FFFFFF` (inverted CTA) | **18.88:1** | Pass |
| `#111111` on `--brand-primary-hover #E6EEF3` / `--brand-primary-active #D2DEE5` | **16.09:1** / **13.78:1** | Pass |
| `--brand-primary` as link/text on `--surface-0 #1A1A1A` / `--surface-1 #111111` | **17.40:1** / **18.88:1** | Pass |
| `--brand-primary` on `--brand-primary-tint #262626` | **15.13:1** | Pass |
| `--brand-ring #FF865C` on `--surface-0` / `--surface-1` / `--surface-2 #262626` | **7.31 / 7.93 / 6.35:1** | Pass (>=3) |
| `--accent-on-fill #111111` on `--accent #FF865C` / `--accent-hover #FF9E7C` | **7.93:1** / **9.38:1** | Pass |
| `--accent-ink #FF865C` on `--surface-0` / `--accent-soft #33201A` | **7.31:1** / **6.47:1** | Pass |
| `--ink-strong #FFFFFF` on `--surface-0` / `--surface-1` | **17.40:1** / **18.88:1** | Pass |
| `--ink-body #E6EEF3` on `--surface-0` / `--surface-1` / `--surface-2` | **14.83 / 16.09 / 12.89:1** | Pass |
| `--ink-body` on `--accent-soft #33201A` (selected option) | **13.13:1** | Pass |
| `--ink-muted #ABB4B9` on `--surface-0` / `--surface-1` / `--surface-2` | **8.26 / 8.96 / 7.18:1** | Pass |
| `--success #3FBF80` on `--surface-0` / on `--success-soft` | **7.44:1** / **5.74:1** | Pass |
| `--warning #E5A93A` on `--surface-0` / on `--warning-soft` | **8.34:1** / **7.01:1** | Pass |
| `--danger #F2708B` on `--surface-0` / on `--danger-soft` | **6.19:1** / **5.88:1** | Pass |
| `--info #6FB2F5` on `--surface-0` / on `--info-soft` | **7.76:1** / **6.85:1** | Pass |
| `.level-chip` ink `--surface-1 #111111` on tier solids (trainee/junior/middle/senior) | **9.15 / 9.21 / 9.05 / 6.71:1** | Pass |
| Tier inks on tier softs (trainee/junior/middle/senior) | **7.23 / 6.54 / 7.01 / 5.88:1** | Pass |
| Tier bar fills on `--surface-2 #262626` | **7.34 / 7.38 / 7.26 / 5.38:1** | Pass (>=3) |

### Colors that were darkened, and why

| Token | Brand value | Shipped value | Reason |
| --- | --- | --- | --- |
| `--accent-ink` (light) | `#FF865C` | **`#B84520`** | The brand coral as TEXT on white is **2.38:1**. Darkened from HSL L 68% to 42% and desaturated 100% to 70%, hue held at 15.5 degrees so it stays the brand hue and does not drift into `--color-red`. Result: **5.37:1** on white, **5.08:1** on `--surface-1`, **4.83:1** on `--accent-soft` — all clear AA. |
| `--brand-ring` (light) | `#FF865C` | **`#B84520`** | Same computation, same value: the raw coral is **2.38:1** on white and fails even the 3:1 non-text threshold for a focus indicator. |
| `--danger` (all themes) | `#FF3333` (`--color-red`) | **`#C0243C`** | The brand red is **3.64:1** on white — fine as a graphic, a fail as text. Error text must be readable, so the darker crimson stays. |
| `--tier-middle` | n/a (product color) | `#8A5E00` | Pre-existing: darkened from `#B07908` (**3.76:1**). |

Nothing was darkened in the dark theme: on `#111111` / `#1A1A1A` the true `#FF865C` already measures
7.93:1 / 7.31:1, so the accent ships at its exact brand value there.

### Failures and constrained usage — read this

1. **`--accent #FF865C` is a FILL-ONLY color in the light theme.** On white it is **2.38:1**: it
   fails AA as text (4.5:1), fails as large text (3:1) and fails as a non-text graphic (3:1).
   Permitted: as a background under `--accent-on-fill #111111` (**7.93:1**), and as a decorative
   inset bar or tint where a compliant near-black border carries the state.
2. **Never put white text on the coral.** `#FFFFFF` on `#FF865C` is **2.38:1**. testfort.com's own
   `.btn.orange` does exactly this (its `.btn span` stays `#FFFFFF`); the app deliberately does not
   reproduce that, and uses `--accent-on-fill #111111` instead.
3. **The coral is not the progress fill.** `#FF865C` on `--surface-2 #EDF1F7` is **2.10:1** and
   fails the 3:1 requirement for a meaningful graphic, so `.progress__fill` stays on
   `--brand-primary` (**16.66:1**). Same reason `accent-color` on the radio inputs stays near-black.
4. **A near-black link needs its underline.** `--brand-primary` on white is 18.88:1 for legibility,
   but it is indistinguishable in hue from body copy, so `a` carries a permanent underline
   (WCAG 1.4.1 Use of Color) and shifts to `--accent-ink` on hover.
5. **Borders are not text.** `--border #DCE3EC` measures 1.29:1 and `--border-strong #C2CCD9`
   measures 1.62:1 against white. These are decorative hairlines only. Every control whose *state*
   is conveyed by its outline — the answer option, inputs — additionally carries a >=3:1 boundary in
   its active states (`--brand-primary` **18.88:1**, `--success` 5.43:1, `--danger` 5.90:1) plus a
   non-color indicator.
6. **Never color-only.** Correct/incorrect answers carry a check/cross glyph and a text badge;
   tiers carry their name; hovered and selected options differ in hue *and* carry an inset bar;
   the anti-cheat banner carries an icon plus explicit "2 of 3" wording.
7. **Focus is always visible.** `--brand-ring` at 2px with a 2px offset clears 3:1 against every
   surface in both themes (tables above). Do not remove `:focus-visible` outlines. `--shadow-focus`
   is a decorative coral glow only — the compliant signal is the ring plus the border change.
8. **Touch targets.** Buttons are >=44px tall (matching the brand's own 44px `.btn` line-height),
   answer options >=56px, the modal close button is 32px visually but should be padded to a 44px hit
   area on touch pointers.

---

## 10. Maintenance checklist

The brand colors are now real, read from testfort.com on 2026-09-06. If the style guide moves:

1. Replace the six values in the `BRAND SWAP POINTS` block (section 3) and their counterparts in
   both dark-theme blocks (section 4) — the two dark blocks are duplicates and must stay identical.
2. Re-run the contrast script over: on-primary/primary, primary-as-link on both light surfaces,
   `--accent-on-fill` on `--accent`, `--accent-ink` on white and on `--accent-soft`, and
   `--brand-ring` against all four light surfaces plus the primary fill.
3. **Any new accent must be re-tested as a fill, as text and as a graphic separately.** A color can
   pass one and fail the others — `#FF865C` passes only as a fill.
4. If an accent fails as text, darken it by lowering HSL lightness while holding hue, and desaturate
   only as far as needed to keep it distinct from `--danger`. Never lower the contrast requirement.
5. The typeface question (section 5) is still open: brand = Poppins, app = Inter.
6. Leave the four tier colors and the semantic colors alone unless they clash with the new primary —
   they are tuned for AA at both solid and soft weights, and the amber has little headroom.
