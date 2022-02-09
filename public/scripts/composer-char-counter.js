(function () {
  $(document).ready(() => {
    $("#tweet-text").on("input", output);

    $(window).on("scroll", scroll);
    $(".scroll-arrow").on("click", click);
  });

  const output = function () {
    const $counter = $(".counter");

    let textLength = $(this).val().length;
    let remainingLength = 140 - textLength;
    $counter.text(remainingLength);

    if (remainingLength < 0) {
      return $counter.addClass("btn_red");
    }
    $counter.removeClass("btn_red");
  };

  //when scroll it's appear//
  const scroll = function () {
    $(".scroll-arrow").show();
  };
  //press button and scrollup to the top//
  const click = function () {
    window.scrollTo(0, $(".new-tweet").offset().top - 200);
  };
})();
