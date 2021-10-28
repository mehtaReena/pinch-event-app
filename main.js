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

  let initial_touches;
  function touchMove(e) {
      if (e.touches.length === 2) {
          let mp_init = midpoint(initial_touches);
          let mp_curr = midpoint(e.touches);
          gesture = {
              scale: e.scale !== undefined ? e.scale : distance(e.touches) / distance(initial_touches),
              rotation: e.rotation !== undefined ? e.rotation : angle(e.touches) - angle(initial_touches),
              translation: {
                  x: mp_curr.x - mp_init.x,
                  y: mp_curr.y - mp_init.y
              },
              origin: mp_init
          };
          doGesture(gesture);
          e.preventDefault();
      }
  }




  window.addEventListener("load", function () {
    // console.log("sdfsdfsdS", Spotlight);
    showGal();
    var els = document.getElementsByClassName("spl-pane");

    Array.from(els).forEach((el) => {
      console.log(el);

      el.addEventListener('touchstart', function watchTouches(e) {
		if (e.touches.length === 2) {
			initial_touches = e.touches;
			gesture = {
				scale: 1,
				rotation: 0,
				translation: { x: 0, y: 0 },
				origin: midpoint(initial_touches)
			};
			/*
				All the other events using `watchTouches` are passive,
				we don't need to call preventDefault().
			 */
			if (e.type === 'touchstart') {
				e.preventDefault();
			}
			startGesture(gesture);
			el.addEventListener('touchmove', touchMove, { passive: false });
			el.addEventListener('touchend', watchTouches);
			el.addEventListener('touchcancel', watchTouches);
		} else if (gesture) {
			endGesture(gesture);
			gesture = null;
			el.removeEventListener('touchmove', touchMove);
			el.removeEventListener('touchend', watchTouches);
			el.removeEventListener('touchcancel', watchTouches);
		}
	}, { passive: false });

	if (
		typeof GestureEvent !== 'undefined' &&
		typeof TouchEvent === 'undefined'
	) {
		el.addEventListener('gesturestart', function handleGestureStart(e) {
			startGesture({
				translation: { x: 0, y: 0 },
				scale: e.scale,
				rotation: e.rotation,
				origin: { x: e.clientX, y: e.clientY }
			});
			e.preventDefault();
		}, { passive: false });
		el.addEventListener('gesturechange', function handleGestureChange(e) {
			doGesture({
				translation: { x: 0, y: 0 },
				scale: e.scale,
				rotation: e.rotation,
				origin: { x: e.clientX, y: e.clientY }
			});
			e.preventDefault();
		}, { passive: false });
		el.addEventListener('gestureend', function handleGestureEnd(e) {
			endGesture({
				translation: { x: 0, y: 0 },
				scale: e.scale,
				rotation: e.rotation,
				origin: { x: e.clientX, y: e.clientY }
			});
		});
	}



    });
  });
