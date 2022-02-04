(function () {
  $(document).ready(() => {
    $("#tweet-text").on("input", output);
  });

  const output = function () {
    const $counter = $(".counter");
    const maxmumLength = 140;
    let textLength = $(this).val().length;
    let remainingLength = maxmumLength - textLength;

    if (remainingLength < 10) {
      return $counter.addClass("btn_red");
    }
    $counter.removeClass("btn_red");
    $counter.text(maxmumLength - textLength);
  };

  //button for scroll//
  const $scrollButton = $(".scroll-arrow");
  //first hide the button

  //when scroll it's appear//
  $(window).on("scroll", function () {
    $scrollButton.show();
  });
  //press button and scrollup to the top//
  $scrollButton.on("click", function () {
    $(window).scrollTop();
  });
})();
