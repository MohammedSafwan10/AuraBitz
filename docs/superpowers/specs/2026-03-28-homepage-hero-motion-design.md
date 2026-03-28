# Homepage Hero Motion Update Design

Date: 2026-03-28
Project: AuraBitz
Scope: Focused update to the homepage hero headline motion and right-side feature preview

## Goal
Upgrade the homepage hero so the headline feels more alive and premium, and the featured preview becomes a rotating showcase again without reintroducing the old clutter, instability, or overly busy motion.

## Why This Change
The current hero is cleaner than the old homepage, but the user wants two specific upgrades:
- the main headline should animate in a stronger, more premium way
- the right-side featured preview should rotate through multiple curated examples instead of staying static

This update should preserve the clearer structure of the redesigned homepage while adding back controlled motion and variation in the hero only.

## Design Direction
Use a premium editorial motion direction:
- headline uses word-by-word morphing instead of scramble or typewriter effects
- supporting body copy remains stable for readability
- right preview rotates through a small curated set of slides
- motion remains calm, legible, and high quality
- hierarchy stays anchored on the headline first and preview second

## Scope
This update is limited to the homepage hero area only:
- animated hero headline text
- rotating feature preview in the hero frame
- hero data/content additions needed to support those behaviors

Out of scope:
- broader homepage restructuring
- workflow, proof strip, CTA, footer, or navigation redesign
- reintroducing the old dense multi-slide hero wall

## Headline Animation
The first phrase of the main headline becomes animated.

Pattern:
- a curated phrase rotates in place
- the ending phrase stays fixed

Example structure:
- `Production UI, not decoration.`
- `Motion systems, not decoration.`
- `Interface presence, not decoration.`

Behavior requirements:
- use word-by-word morphing, not character scrambling
- transitions must remain readable throughout
- no full-line jitter or chaotic distortion
- timing should feel deliberate and premium, not fast or hyperactive
- mobile layout must remain stable with no noticeable jump in headline block height

Implementation intent:
- keep the hero headline structure recognizable
- animate only the leading phrase so the message remains grounded
- ensure the final phrase acts as the anchor for readability and brand tone

## Feature Preview Carousel
The right-side hero preview returns to a carousel, but in a more controlled form than the previous homepage implementation.

Structure:
- one stable hero frame
- three curated slides maximum
- one visible slide at a time

Slide themes:
1. material / surface
2. motion / interaction
3. typography / dynamics

Behavior requirements:
- auto-rotate on a calm timer
- provide manual controls through dots or arrows
- preserve a fixed outer frame so the hero does not visually jump during slide changes
- transitions should be soft and premium, not flashy or stacked
- the carousel should feel curated, not like a demo wall

## Interaction Rules
- auto-rotation should pause when the user manually interacts with the preview controls
- only one active slide should be visible at a time
- the headline animation and carousel transitions must not compete visually
- manual controls should be obvious enough to use without dominating the frame

## Performance and Stability Rules
- reuse the current hero layout instead of rebuilding the whole homepage structure
- keep animation count constrained to the animated headline and one active preview slide
- avoid reintroducing the old carousel density or multiple simultaneously active showcase layers
- preserve stable spacing and height in the hero on mobile and desktop

## Component-Level Plan Direction
Expected files to change in planning/implementation:
- `src/components/site/home/home-hero.tsx`
- `src/components/site/home/data.ts`
- optionally `src/components/site/home/animations.ts` only if a small motion helper is needed

The work should stay focused in the hero implementation and supporting hero data.

## Success Criteria
The update is successful if:
- the hero headline feels more alive and premium without becoming gimmicky
- the animated text remains readable at all times
- the feature preview rotates through a small curated set cleanly
- the hero keeps strong hierarchy and does not feel cluttered again
- mobile remains stable and visually controlled
- the result feels intentional and bespoke rather than like a generic animated landing page
