// console.log();

// function log(val) {
//   console.log(val)
// }

var dist1=0;

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



  function start(ev) {
    if (ev.targetTouches.length == 2) {//check if two fingers touched screen
        dist1 = Math.hypot( //get rough estimate of distance between two fingers
         ev.touches[0].pageX - ev.touches[1].pageX,
         ev.touches[0].pageY - ev.touches[1].pageY);
    }

}
function move(ev) {
    if (ev.targetTouches.length == 2 && ev.changedTouches.length == 2) {
          // Check if the two target touches are the same ones that started
        let dist2 = Math.hypot(//get rough estimate of new distance between fingers
         ev.touches[0].pageX - ev.touches[1].pageX,
         ev.touches[0].pageY - ev.touches[1].pageY);
         //alert(dist);
         if(dist1>dist2) {//if fingers are closer now than when they first touched screen, they are pinching
           alert('zoom out');
         }
         if(dist1<dist2) {//if fingers are further apart than when they first touched the screen, they are making the zoomin gesture
            alert('zoom in');
         }
    }

}

  window.addEventListener("load", function () {
    // console.log("sdfsdfsdS", Spotlight);
    showGal();
    var els = document.getElementsByClassName("spl-pane");

    Array.from(els).forEach((el) => {
      console.log(el);

      el.addEventListener ('touchstart', start, false);

      el.addEventListener('touchmove', move, false  );
      el.addEventListener(
        "touchcancel",
        (ev) => {
          // Invoke the appropriate handler depending on the
          // number of touch points.
          ev.preventDefault();
        },
        false
      );
      el.addEventListener(
        "touchend",
        (ev) => {
          // Invoke the appropriate handler depending on the
          // number of touch points.
          ev.preventDefault();
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
