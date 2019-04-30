Spotify Top Artist Visualizer

## Project Description

Jeff and I created a this application which allows users to see information about their most listened to artists on Spotify. The home page is a list of the user's top 10 artists, along with playable components for each artists song. The user can see relevant information about the artist if they click on the artists name. Below is an explanation for each component.

### App (stateful)

This component is the main controller which has the entire view of the application. It's state indicates whether the user is logged in, which artists to render as Artist Cards, and whether the user has submitted a search query.

### Artist Card/Artist Cards (stateful)

This component is the main component which contains a picture of the artist, the artist's name, and the top 5 songs on Spotify for that artist. The songs are all playable through the Spotify Client.

The App component passes in the SpotifyClient API and the Artist Id as props to this component. Artist Cards is simply a component to render several Artist Cards.

The state for this component keeps track of which song is currently playing.

### Artist Info

This component fetches and displays the artist's information from the Spotify API, and renders that information as a Modal.

### Search (stateful)

This component renders a form at the top of the page and keeps track of the current search query, along with actually submitting the query to the API and then passing the results back to the controller (App).

## User Info

This component renders the user's spotify information as a modal.

### NPM Packages

reactstrap, spotify-web-api-js
