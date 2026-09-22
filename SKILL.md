---
name: design-system-securus
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Securus

## Mission
Deliver implementation-ready design-system guidance for Securus that can be applied consistently across marketing site interfaces.

## Brand
- Product/brand: Securus
- URL: https://securus.framer.website/
- Audience: buyers, teams, and decision-makers
- Product surface: marketing site

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Instrument Sans`, `font.family.stack=Instrument Sans, Instrument Sans Placeholder, sans-serif`, `font.size.base=18px`, `font.weight.base=600`, `font.lineHeight.base=30.6px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=16px`, `font.size.lg=18px`, `font.size.xl=20px`, `font.size.2xl=24px`, `font.size.3xl=32px`, `font.size.4xl=48px`
- Color palette: `color.text.primary=#000c2d`, `color.text.secondary=#ffffff`, `color.surface.base=#000000`, `color.text.inverse=#0000ee`, `color.surface.strong=#f1f1f1`
- Spacing scale: `space.1=4px`, `space.2=6px`, `space.3=8px`, `space.4=16px`, `space.5=24px`, `space.6=30px`, `space.7=32px`, `space.8=40px`
- Radius/shadow/motion tokens: `radius.xs=3px`, `radius.sm=4px`, `radius.md=8px`, `radius.lg=10px`, `radius.xl=12px` | `shadow.1=rgba(0, 0, 0, 0.15) 0px 4px 10px 0px` | `motion.duration.instant=200ms`, `motion.duration.fast=500ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
