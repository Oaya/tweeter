(function () {
  $(document).ready(() => {
    $(".new-tweet__form").on("submit", onSubmit);
    $(".nav__arrow").on("click", onClick);
    loadTweets();
  });

  //fetch tweets form /tweets page//
  const loadTweets = () => {
    //hide the alert,scrollbutton, and input field first render//
    $(".alert").hide();
    $(".scroll-arrow").hide();

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
  <article class="tweet">
          <header class="tweet__header">
            <div class="tweet__header-left">
              <img
                src="${tweetData.user.avatars}"
                alt="face icon"
              />
              <p class="tweet__name"> ${tweetData.user.name}</p>
            </div>

            <p class="tweet__handle-name">${tweetData.user.handle}</p>
          </header>
          <div class="tweet__text">
          ${safeHTML}
          </div>
          <footer class="tweet__footer">
            <span class="tweet__time">${timePast}</span>
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
      return { message: `The tweet should be less than 140 words` };
    } else {
      return { message: false };
    }
  };

  //post new tweet //
  const onSubmit = function (e) {
    e.preventDefault();
    $(".alert").slideUp();
    const serializedData = $(this).serialize();
    const textarea = $(this).children("#tweet-text").val();

    const error = checktweetLength(textarea);
    console.log(error.message);
    if (error.message) {
      return $(".alert")
        .slideDown()
        .children(".alert__message")
        .text(error.message);
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
      .children(".new-tweet__form")
      .children("#tweet-text")[0]
      .focus();
  };
})();
