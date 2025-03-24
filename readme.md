# Project Roadmap

## Features
- [ ] Add `cub3d`.
- [ ] Add an interactive resume.
- [ ] Add an earthquake effect when the microwave is activated.
- [ ] Customize the achievement banner.
- [ ] Store the divergence meter value in local storage to persist the state across sessions.

## Bugs

## Refactor
- [ ] Refactor the entire codebase for better readability, maintainability, and performance.

## Optimization
- [ ] Remove event listeners when they are no longer needed to prevent memory leaks and improve performance (use `{ once: true }`).

## Maintainability
- [ ] Reorganize assets in the public folders for better structure, accessibility, and maintainability.
- [ ] Add comprehensive error handling.
- [ ] Change from Kaboom.js to Kaplay (a maintained fork of Kaboom.js, which is deprecated).

## Improvements
- [ ] Use an original font instead of an image for the divergence meter.
- [ ] Normalize the movement vector for consistent speed in all directions, including diagonals.
- [ ] Improve mobile compatibility.
- [ ] Ensure images are not draggable, as there is no use for this feature.
- [ ] Consider transforming bounding boxes into collision boxes for more precise collision detection.