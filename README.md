# Tic Tac Toe Game

This is a web-based Tic Tac Toe game application with multiple gameplay modes and player profile features.

# live preview
[Tic Tac Toe Game](https://mohamedtharwat000.github.io/xo-game/)

## Table of Contents

- [Overview](#overview)
- [Game Modes](#game-modes)
  - [Single Player Easy](#single-player-easy)
  - [Single Player Hard](#single-player-hard)
  - [Two Players](#two-players)
- [Profile Page](#profile-page)
  - [Edit Profile](#edit-profile)
  - [Reset Profile](#reset-profile)
  - [Profile Statistics](#profile-statistics)
  - [Recent Games History](#recent-games-history)
- [About Page](#about-page)  
- [Technologies](#technologies)
- [Setup](#setup)
- [Credits](#credits)

## Overview

This is a Tic Tac Toe game that can be played online via a web browser. The application provides different game modes against computer AI or local 2 player mode.

The game features a profile page that stores player name, profile image, statistics and recent game history. Players can edit their name and image on the profile page.

There is also an about page that provides overview and credits for the application. 

The frontend is built with HTML, CSS and JavaScript. Game data is stored locally using the Web Storage API.

## Game Modes

The game supports the following modes:

### Single Player Easy

Play against an easy AI opponent that makes random moves.

- On the home page, click "Single Player Easy" to start this mode  
- Choose X or O to be your letter
- Take turns clicking the empty cells to place your letter 
- The AI will randomly choose empty cells for its moves
- First to get 3 letters in a row wins

### Single Player Hard  

Play against a difficult AI opponent that uses advanced strategy.

- On the home page, click "Single Player Hard" to start this mode
- Choose X or O to be your letter
- The AI will think strategically before making moves  
- Try to beat the smart AI opponent by getting 3 in a row

### Two Players  

Play local multiplayer against another person.

- On the home page, click "Two Players" to start this mode
- Player 1 chooses X or O, then Player 2 gets the other letter
- Take turns clicking empty cells to place your letters
- First person to get 3 letters in a row wins

## Profile Page

Registered players have access to their profile page which displays:  

### Edit Profile

- Change player name
- Upload a custom profile picture

### Reset Profile

- Option to reset all profile data including:
  - Player name
  - Profile image
  - Statistics
  - Game history
  
### Profile Statistics  

- Number of total games played
- Number of wins
- Number of losses   
- Number of draws
- Win percentage

### Recent Games History

- List of most recent games showing:
  - Game result (win, lose or draw)
  - Date & time for each game
  
Profile data is persisted locally using the Web Storage API. 

## About Page

The about page provides information on:

- Game overview and rules
- Profiles and statistics features  
- Developers credits

## Technologies

- HTML - Structure and content
- CSS - Styling  
- JavaScript - Game logic and interactivity
- Web Storage API - Persisting profile data

## Setup  

To run this Tic Tac Toe game app:

- Clone the repository
- Open `index.html` in a browser
- No web server required
- Access different pages by clicking nav links
- Game features will utilize local browser storage

  ## Contributing

Contributions are welcome! Here are some ways you can contribute to this project:

- Report bugs and issues
- Fix bugs and issues
- Add new validation functionality
- Improve styling and overall UX
- Refactor code to improve quality
- Write documentation and improve existing docs

To contribute:
1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push your branch and submit a pull request

I will review pull requests and provide feedback.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

This application was created by:

- [Ahmed Zena](https://github.com/AhmedZena)
- [Mohamed Tharwat](https://github.com/mohamedtharwat000)
- [Muhammad Shoaib](https://github.com/melsayedshoaib)
