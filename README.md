# Planet Search

A basic planet search app that shows list of planets in our solar system that can be filtered and searched through and preferences are persisted in URL state

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)

## Installation

Step-by-step instructions on how to install and set up the project locally. For example:

1. Clone the repository:
```bash
   git@github.com:DayakarH/planet-search-twopointone-assignment.git
```
2. Navigate to the project directory:
 ```bash
  cd planet-search-twopointone-assignment
  ```
3. Install dependencies:
```bash
  npm i
  ```
4. Create a `.env` file in the root directory and copy the contents of `.env.example` file into the `.env` file

## Usage

- To ensure port 3000 is available, run
  ```bash
  npx kill-port 3000
  ```
- To mock the server, run
  ```bash
  npx json-server src/lib/data.json
  ```
 - In another terminal, navigate to this same directory and run below command to the start the local development server

   ```bash
   npm run dev
   ```

- After the local development is up and running, open [this](http://localhost:5173/) link to view the instance in your browser.
- As soon as the app starts, all 8 planets show up in a grid layout. If any filters are selected or a search term is entered and submitted, filtered results will show up.

## Tech Stack

- ReactJS - UI Library
- Redux-Toolkit - For global synchronous state management
- TypeScript - For readability, maintainability, scalability and overall a better DX
- shadcn - Component Library
- Tailwind CSS - For utility styling
