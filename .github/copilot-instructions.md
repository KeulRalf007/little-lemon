# AI Coding Agent Instructions for Little Lemon Capstone Project

Welcome to the Little Lemon Capstone Project! This document provides essential guidelines for AI coding agents to be productive in this codebase. It covers the architecture, workflows, conventions, and integration points specific to this project.

## Project Overview
- **Purpose**: This is a React Native project built as part of a Coursera capstone. It includes features like onboarding, user profiles, and a splash screen.
- **Frameworks**: The project uses Expo for development and deployment.
- **Languages**: TypeScript is the primary language, with some JavaScript files.

## Architecture
- **App Structure**:
  - `app/`: Contains the main application screens and layouts.
  - `components/`: Reusable UI components.
  - `constants/`: Centralized configuration like themes.
  - `hooks/`: Custom React hooks.
  - `utils/`: Utility functions for common operations.
- **Data Flow**:
  - The project follows a component-driven architecture with props and hooks for state management.
  - Themes and styles are managed centrally in `constants/theme.ts`.

## Developer Workflows
- **Start the Project**:
  ```bash
  npx expo start --web --port 19006
  ```
- **Reset the Project**:
  Run the script in `scripts/reset-project.js` to clear caches and reset the environment.
- **Testing**:
  Currently, no dedicated test framework is set up. Add tests in `utils/testMaster.ts` or similar files.

## Conventions
- **File Naming**:
  - Use `.tsx` for React components.
  - Co-locate styles and logic in the same file when possible.
- **Styling**:
  - Use the `theme` object from `constants/theme.ts` for consistent styling.
- **Hooks**:
  - Place custom hooks in `hooks/` and name them with the `use-` prefix.

## Integration Points
- **External Libraries**:
  - Expo: Used for app scaffolding and deployment.
  - React Navigation: For screen navigation.
- **Cross-Component Communication**:
  - Use props for parent-child communication.
  - Use hooks for shared state or side effects.

## Examples
- **Reusable Component**:
  See `components/themed-view.tsx` for an example of a styled, reusable component.
- **Custom Hook**:
  See `hooks/use-theme-color.ts` for a custom hook managing theme colors.

## Notes
- Ensure TypeScript types are defined for all components and functions.
- Follow the existing folder structure and naming conventions.

Feel free to update this document as the project evolves.