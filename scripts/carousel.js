/**
 * Configuration variables
 */
var animationDuration = 3000;       // durarion of the keyframe animation
var onscreenKeyframeRight = 0.3;    // keyframe offset for the _end_ of animating-IN
var offscreenKeyframeLeft = 0.7;    // keyframe offset for the _start_ of animating-OUT

/**
 * Animates a stack of images
 * @param {Array<HTMLElement>} images the sequence of elements to be animated in
 */
function animate(images) {
    if (images.length < 2) {
        return; // noop when nothing to animate
    }

    var offscreenBeginTime = animationDuration * offscreenKeyframeLeft;
    var iterationTime = images.length * offscreenBeginTime;
    for (let i = 0; i < images.length; i++) {
        var image = images[i];
        var firstStart = offscreenBeginTime * i;
        // setup initial run
        addKeyframes(image, firstStart);

        // setup subsequent runs at the time initial run ends
        setTimeout(queueAnimation, firstStart, iterationTime, image);
    }
}

/**
 * Sets up repeated application of the keyframes
 * @param {number} iterationTime frequency of the iteration
 * @param {HTMLElement} image element to be animated at the given frequency
 */
function queueAnimation(iterationTime, image) {
    setInterval(addKeyframes, iterationTime, image, 0); // no delays on subsequent runs
}

/**
 * Adds a keyframe animation that brings element onscreen and moves it offscreen.
 * Element is animated horizontally and the animation does not repeat.
 * @param {HTMLElement} image the image to be animated
 * @param {number} delay delay in miliseconds
 */
function addKeyframes(image, delay) {
    image.animate([
        { // Offscreen
            visibility: "hidden",
            opacity: 0,
            transform: "translateX(100%)"
        },
        { // Onscreen - start
            opacity: 1,
            visibility: "visible",
            transform: "translateX(0px)",
            offset: onscreenKeyframeRight
        },
        { // Onscreen - end
            opacity: 1,
            visibility: "visible",
            transform: "translateX(0px)",
            offset: offscreenKeyframeLeft,
        },
        { // Offscreen
            visibility: "hidden",
            opacity: 0,
            transform: "translateX(-100%)",
            offset: 1,
        },
      ], {
          fill: "both",
          delay: delay,
          duration: animationDuration,
      });
}
