$(document).ready(() => {
  $("#new-tweet_form").on("submit", onSubmit);
  $(".nav_arrow").on("click", onClick);
  loadTweets();
});

//fetch tweets form /tweets page//
const loadTweets = () => {
  //hide the alert message first render//
  $(".alert").hide();

  $.get("/tweets")
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
};

//extract the only text part from the input//
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//create HTML skeleton//
const createTweetElement = (tweetData) => {
  const timePast = timeago.format(tweetData.created_at);
  const safeHTML = escape(tweetData.content.text);

  const $tweet = `
  <article class="tweet-list">
          <header class="tweet-header">
            <div class="tweet-header_left">
              <img
               
                src="${tweetData.user.avatars}"
                alt="face icon"
              />
              <p class="name"> ${tweetData.user.name}</p>
            </div>

            <p class="handle-name">${tweetData.user.handle}</p>
          </header>
          <div class="tweet-text">
          ${safeHTML}
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

// loops through tweets in the database and show //
const renderTweets = function (tweets) {
  $("#tweet-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweet-container").prepend($tweet);
  }
};

const checktweetLength = (textarea) => {
  if (textarea.length < 1) {
    return { message: `Input feild can't be empty` };
  } else if (textarea.length > 140) {
    return { message: `The tweet should be less than 140 words` }.text(``);
  } else {
    return { message: false };
  }
};

//post new tweet //
const onSubmit = function (e) {
  e.preventDefault();

  const serializedData = $(this).serialize();
  const textarea = $(this).children("#tweet-text").val();

  const error = checktweetLength(textarea);

  if (error.message) {
    $(".alert").slideDown().children(".alert-message").text(error.message);
  } else {
    $.post("/tweets", serializedData)
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").val("140");
        loadTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//nav button show and hide the input area//
const onClick = function () {
  $(".new-tweet")
    .toggle()
    .children("#new-tweet_form")
    .children("#tweet-text")[0]
    .focus();
};
