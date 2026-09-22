# Vibe Learn Design System Guidelines

This document specifies the official design tokens, typography, component standards, and layout principles for **Vibelearn**, directly derived from the design specifications in `docs/design/design-system.png` and reference screens.

---

## 1. Color Palette

### Primary (Emerald Accent)
- **Primary 500 (`#10B981`)**: Main brand color, primary CTA buttons, active tab underlines, progress bar fills.
- **Primary 400 (`#34D399`)**: Hover states, interactive highlights.
- **Primary 300 (`#6EE7B7`)**: Subtle accents, secondary illustrations.
- **Primary 200 (`#A7F3D0`)**: Borders for active or selected items.
- **Primary 100 (`#D1FAE5`)**: Badge backgrounds, tag backgrounds, active lesson highlight tints.

### Neutrals (Slate Hierarchy)
- **Neutral 900 (`#0F172A`)**: Primary headings, bold text, dark card icons.
- **Neutral 700 (`#334155`)**: Subheadings, secondary buttons, sidebar navigation labels.
- **Neutral 500 (`#64748B`)**: Body text, meta descriptions, secondary icons, timestamps.
- **Neutral 300 (`#CBD5E1`)**: Dividers, disabled button states, inactive radio circles.
- **Neutral 200 (`#E2E8F0`)**: Card borders, input borders, accordion dividers.
- **Neutral 100 (`#F1F5F9`)**: Subtle card backgrounds, badge backgrounds, progress bar tracks.
- **Neutral 50 (`#FAFAFC`)**: Page background, container fills.
- **White (`#FFFFFF`)**: Pure card backgrounds, modal surfaces, primary button text.

---

## 2. Typography

### Font Families
- **Display Font:** `Playfair Display`, serif — used for Display 1 (Page titles) and Display 2 (Section titles) to convey elegance, quality, and focus.
- **Body & Interface Font:** `Inter`, sans-serif — used for Card titles, subheadings, interface elements, body text, buttons, and captions for optimal legibility.

### Type Scale
| Style | Font | Size / Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display 1** | Playfair Display | `48px / 56px` | Bold (700) | Hero & Page titles |
| **Display 2** | Playfair Display | `36px / 44px` | Bold (700) | Section titles |
| **Heading 1** | Inter | `28px / 36px` | SemiBold (600) | Main card titles, course headers |
| **Heading 2** | Inter | `22px / 30px` | SemiBold (600) | Sub-sections, accordion titles |
| **Heading 3** | Inter | `18px / 26px` | Medium (500) | Module names, card headers |
| **Body Large** | Inter | `16px / 24px` | Regular (400) | Lead paragraphs, hero descriptions |
| **Body** | Inter | `14px / 20px` | Regular (400) | Standard copy, lesson descriptions |
| **Small** | Inter | `12px / 16px` | Regular (400) | Meta info, lesson durations, badges |

---

## 3. Spacing & Elevation

### Spacing Scale (4px base unit)
`4px` (0.25rem), `8px` (0.5rem), `12px` (0.75rem), `16px` (1rem), `24px` (1.5rem), `32px` (2rem), `40px` (2.5rem), `48px` (3rem), `64px` (4rem).

### Corner Radius
- **xs (`4px`)**: Badges, status dots, tiny tags.
- **sm (`8px`)**: Module badges, inner thumbnail icons.
- **md (`12px`)**: Standard buttons, input fields, accordion rows.
- **lg (`16px`)**: Course cards, callout cards, player containers.
- **xl (`24px`)**: Hero containers, featured sections.
- **Full (`9999px`)**: Pill tags, avatar circles, status icons.

### Shadows
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 12px -2px rgba(0, 0, 0, 0.08)`
- **lg**: `0 12px 24px -4px rgba(0, 0, 0, 0.10)`
- **xl**: `0 20px 40px -8px rgba(0, 0, 0, 0.12)`

---

## 4. Components Specification

### Buttons
- **Height:** 44px (default)
- **Padding:** `0 16px` (lg), `0 12px` (md)
- **Radius:** 12px (`rounded-xl`)
- **Font:** Inter Medium, 14–16px
- **Variants:**
  - `Primary`: Background `#10B981`, Text `#FFFFFF`, hover `#059669`.
  - `Secondary`: Border `1px solid #10B981`, Text `#10B981`, Background `#FFFFFF`.
  - `Tertiary`: Border `1px solid #E2E8F0`, Text `#334155`, Background `#FFFFFF`.
  - `Text`: Transparent background, Text `#10B981`, inline SVG icon.

### Badges / Tags
- Height: 24px–28px, pill radius (`rounded-full`), padding `2px 10px`.
- Video: `#D1FAE5` background, `#10B981` text with small play icon.
- Lesson: `#D1FAE5` background, `#10B981` text.
- Popular: `#D1FAE5` background, `#10B981` text with flame icon.

### Form Inputs
- Height: 44px, border `1px solid #E2E8F0`, radius `12px`, padding `0 16px`.
- Focus state: Border `#10B981`, subtle ring `rgba(16, 185, 129, 0.2)`.

### Status Indicators
- **In Progress:** Hollow circle or play glyph with `#10B981`.
- **Completed:** Solid green circle with white checkmark.
- **Now Playing:** Active highlighted background with green play icon.
- **Locked:** Subtle lock icon with `#64748B`.

### Progress Bar
- Height: 8px, radius: full (`rounded-full`).
- Track: `#E2E8F0` or `#F1F5F9`.
- Fill: `#10B981`.

---

## 5. Layout & Navigation Principles
1. **Header Navigation:** Vibe Learn logo on left, centered nav tabs ("Courses", "My Learning") with active green underline, right-aligned notifications bell and Clerk user profile/button.
2. **Curriculum Accordion:** Left numeric circle indicator, module title, module duration, chevron toggle. Lessons nested within show completion checkmark, title, duration, and resume point.
3. **Responsive Adaptation:**
   - On Desktop (>= 1024px): 3-column course grid, side-by-side video and curriculum sidebar.
   - On Mobile (< 1024px): 1-column stacked cards, collapsible lesson curriculum drawer with a toggle button, sticky bottom actions.
