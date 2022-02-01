$(document).ready(() => {
  const $tweetText = $("#tweet-text");
  const $counter = $(".counter");

  $tweetText.on("input", function () {
    const maxmumLength = 140;
    let textLength = $(this).val().length;
    let remainingLength = maxmumLength - textLength;

    // let counter = $(this).siblings(".new-tweet_bottom").children(".counter");
    if (remainingLength < 0) {
      $counter.addClass("btn_red");
    }
    $counter.text(maxmumLength - textLength);
  });
});
