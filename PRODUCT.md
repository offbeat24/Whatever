# Product definition

<!-- Keep observed implementation, user-decided direction, and unvalidated assumptions distinct. -->

## Product concept

- DECIDED BY USER: A restaurant-choice service for people who cannot decide what to eat. It randomly recommends a restaurant near the user's current location or a place they choose; they can save a candidate and open its Kakao Map listing to check the menu.
- The user can keep exploring and save options until one feels right; choosing immediately is not required.
- This is the product direction the user described, not a result of user research or market validation.

## Users and problem

- Target described by the user: people who have not decided what to eat or where to go.
- The intended problem is decision friction around choosing a restaurant. No demographic profile or validated research is documented.

## Value and success

- Intended value: turn “what should I eat?” into a shortlist of real nearby or selected-area restaurants, with a way to revisit options and check menus.
- No analytics, measurable success target, or customer outcome is documented.

## Current experience

- The home page offers a random menu roulette.
- The restaurant page searches food places around the map area, supports current-location movement and place search, and randomly selects a restaurant.
- Users can save restaurants, revisit bookmarks and history, and open a Kakao Map place listing.
- Bookmarks and history are currently stored in the browser; login and cross-device account sync are not implemented.

## Future direction

These are user goals for future exploration, not committed features or a dated roadmap:

- Add login.
- Reduce dependence on a single map service over time; no replacement or multi-provider design has been selected.
- Operate the web service and a mobile app with a consistent product and UI experience.
- Let a person add liked and disliked foods and use those preferences in random selection.
- Add group selection that considers participants' preferences and price range.
- Keep the menu-selection function available even if the current landing page is redesigned or no longer serves as the landing page.

## Name and brand

- CONFIRMED: package name is `whatever`; page metadata title is `아무거나`.
- Brand rationale is not documented. Do not change the name or logo without a product decision.

## Current scope

- Home page menu roulette.
- Restaurant search and random selection around the current or searched map area.
- Bookmarks, history, and links to restaurant listings on Kakao Map.

## Non-goals and open decisions

- No launch schedule, measurable success target, user research, or implementation plan for the future direction is established.
- The target platform strategy, account model, group-selection rules, and map-service approach remain undecided.

## Decisions and history

- 2026-09-29: documented existing behavior from source files; this was not user research.
- 2026-09-30: recorded the user's product concept and future goals; future items remain exploratory.
