$(document).ready(function() {
  $(".container img").click(function() {
    const videoUrl = $(this).data("video");
    $("#videoPlayer").attr("src", videoUrl);
    $("#videoPopup").fadeIn();
  });

  $("#videoPopup").click(function(event) {
    if ($(event.target).is("#videoPopup")) {
      hideVideoPlayer();
    }
  });

  $(document).keydown(function(event) {
    if (event.key === "Escape") {
      hideVideoPlayer();
    }
  });
});

function hideVideoPlayer() {
  $("#videoPlayer").attr("src", "");
  $("#videoPopup").fadeOut();
}
