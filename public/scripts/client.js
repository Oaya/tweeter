$(document).ready(() => {
  //extract the only text part from the input//
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //fetch tweets form /tweets page//
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then((tweets) => {
        $("#tweet-container").empty();
        renderTweets(tweets);
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };

  loadTweets();

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

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets containe
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  // //hide the alert message first render//
  const $alert = $(".alert");
  $alert.hide();

  //form slide down and up//
  const $navArrow = $(".nav_arrow");
  const $newTweet = $(".new-tweet");

  $navArrow.on("click", function () {
    $newTweet
      .toggle()
      .children("#new-tweet_form")
      .children("#tweet-text")[0]
      .focus();
  });

  //post form with ajax//
  const $form = $("#new-tweet_form");
  $form.on("submit", function (e) {
    e.preventDefault();
    const serializedData = $(this).serialize();

    const textarea = $(this).children("#tweet-text").val();

    if (textarea.length < 1) {
      $alert
        .slideDown()
        .children(".alert-message")
        .text(`Input feild can't be empty`);
    } else if (textarea.length > 140) {
      $alert
        .slideDown()
        .children(".alert-message")
        .text(`The tweet should be less than 140 words`);
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serializedData,
      })
        .then(() => {
          console.log(`created new tweet`);
          $("#tweet-text").val("");
          loadTweets();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
