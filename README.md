# Tweeter Project

Tweeter is a simple Twitter clone web application that allows users to post short messages, known as tweets. It provides a user-friendly interface for composing and sharing tweets with other users. This application is built using HTML, CSS, JavaScript, jQuery, Express, and Node.js.

# Screenshots

![Homepage - fullscreen view](/public/images/full-size.png)

![Homepage - mobile view](/public/images/half-size.png)


## Features

- User-friendly interface with a responsive design.
- Real-time tweet updates without the need to refresh the page.
- Character limit enforcement for tweets.
- Error handling for empty or excessively long tweets.
- Timestamp display using the timeago.js library.
- Interactive buttons for flagging, retweeting, and liking tweets.
- In-memory database for storing tweets.

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above


## Additional Information

### Box Sizing

The application uses the `border-box` box-sizing model to simplify CSS layout. For more information, refer to the following resources:
- [Paul Irish - Box Sizing Border Box FTW](http://www.paulirish.com/2012/box-sizing-border-box-ftw/)
- [CSS-Tricks - International Box Sizing Awareness Day](https://css-tricks.com/international-box-sizing-awareness-day/)

### Styling

The application includes CSS styles for various components, such as the profile header, tweets, and new tweet form. The styles are defined in the CSS files present in the `public` directory. Please refer to the respective CSS files for detailed styling rules and comments.

### Client-Side JavaScript

The `client.js` file in the `public/scripts` directory handles the dynamic behavior and interaction on the client-side. It includes functions for creating tweet elements, rendering tweets, loading tweets from the server, and handling form submissions. The JavaScript code is well-commented to provide a clear understanding of each function's purpose and functionality.

### Tweet Data

The application uses an in-memory database to store the tweets. The initial set of tweets is loaded from the `data-files/initial-tweets.json` file. The `lib/data-helpers.js` module provides an interface for interacting with the tweet data. If required, the database implementation can be easily switched without affecting other parts of the code.