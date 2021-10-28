// console.log();

// function log(val) {
//   console.log(val)
// }

function showGal() {
    var gallery = [
      {
        title: "Image 1",
        onclick: Spotlight.download,
        description: "This is a description.",
        class: "trying",
        button: "games",
        src:
          "https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
      },
      {
        like: true,
        title: "Image 2",
        description: "This is a description.",
        src:
          "https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
      },
      {
        like: false,
        title: "Image 3",
        description: "This is a description.",
        src:
          "https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
      }
    ];

    Spotlight.show(gallery, {
      onshow: function () {
        Spotlight.addControl("game", () => {
          console.log("logging");
        });
      },
      onclose: () => {
        Spotlight.removeControl("logging");
      }
    });
  }

  window.addEventListener("load", function () {
    // console.log("sdfsdfsdS", Spotlight);
    showGal();
    var els = document.getElementsByClassName("spl-pane");

    Array.from(els).forEach((el) => {
      console.log(el);

      el.addEventListener(
        "touchstart",
        (ev) => {
          // Invoke the appropriate handler depending on the
          // number of touch points.
          ev.preventDefault();
          // let touchCount = document.getElementById("touchCount");
          // let positions = document.getElementById("positions");
          // alert("sdfsdfsdfsd");
          Spotlight.zoom(0.9);
          // touchCount.innerText = "No value";
        },
        false
      );
      el.addEventListener(
        "touchmove",
        (ev) => {
          // Invoke the appropriate handler depending on the
          // number of touch points.
          ev.preventDefault();
          if (ev.touches.length == 2) {
            // alert("Trying to Zoom");
            Spotlight.zoom(3);
          }
        },
        false
      );
      el.addEventListener(
        "touchcancel",
        (ev) => {
          // Invoke the appropriate handler depending on the
          // number of touch points.
          // ev.preventDefault();
          Spotlight.zoom(1);
        },
        false
      );
      el.addEventListener(
        "touchend",
        (ev) => {
          // Invoke the appropriate handler depending on the
          // number of touch points.
          // ev.preventDefault();
          alert("Taken off");
          Spotlight.zoom(1);
          // let touchCount = document.getElementById("touchCount");
          // let positions = document.getElementById("positions");
          // touchCount.innerText = ev.touches.length;
          // positions.innerText = "Touch has Ended";
        },
        false
      );
    });
  });
