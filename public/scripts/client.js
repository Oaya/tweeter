/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(() => {
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets containe
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  const createTweetElement = (tweetData) => {
    const timePast = timeago.format(tweetData.created_at);
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
            <span class="tweet-time">${timePast}</span>
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

  renderTweets(data);

  //form with ajax//
  const $form = $("#new-tweet_form");
  $form.on("submit", function (e) {
    e.preventDefault();
    const serializedData = $(this).serialize();
    console.log(serializedData);
  });
});
