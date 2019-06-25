// Helps identify whether or not the initialization has ran
var isInitialized = false;

// Keeps track of the initialization interval, which needs to be cleared
var initialization = undefined;

(function(){
    window.addEventListener("load", function() {
        initialize(document);
        initialization = setInterval(function() {
            if (!isInitialized) {
                initialize(document)
            } else {
                clearInterval(initialization)
            }
        }, 3000)
    })
})();


/**
 * Initializes the JS runtime for the site
 * @param {Document} document
 */
function initialize(document) {
    isInitialized = true; // this function should only be called once — flip the init flag
}
