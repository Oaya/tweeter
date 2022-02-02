/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1643662177361,
};

const createTweetElement = (tweetData) => {
  const $tweet = `
  <article class="tweet-list">
          <header class="tweet-header">
            <div class="tweet-header_left">
              <img
                class="face-icon"
                src="${tweetData.user.avatars}"
                alt="face icon"
              />
              <p class="name"> ${tweetData.user.name}</p>
            </div>

            <p class="avatar-name">${tweetData.user.handle}</p>
          </header>
          <div class="tweet-text">
          ${tweetData.content.text}
          </div>
          <footer class="tweet-footer">
            <span class="tweet-time">${tweetData.created_at}</span>
            <div class="tweet-footer-right">
              <i class="icon fa-solid fa-flag"></i>
              <i class="icon fas fa-retweet"></i>
              <i class="icon fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
  `;

  return $tweet;
};

$(document).ready(() => {
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $("#tweet-container").prepend($tweet);
});
