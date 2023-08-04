$(document).ready(function() {
  // Show the video player when the image is clicked
  $(".container img").click(function() {
      const videoUrl = $(this).data("video");
      $("#videoPlayer").attr("src", videoUrl);
      $("#videoPopup").fadeIn();
  });

  // Hide the video player when the close button is clicked
  $("#videoPopup").click(function(event) {
      if ($(event.target).closest("#videoPlayer").length === 0) {
          hideVideoPlayer();
      }
  });

  // Hide the video player when the escape key is pressed
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
