//if (document.readyState == "complete" || document.readyState == "loaded") {
// Init Skrollr
//}

/*
document.onreadystatechange = function() {
    if (document.readyState === "complete") {


        var s = skrollr.init({
            render: function(data) {
                //Debugging - Log the current scroll position.
                console.log(data.curTop);
            }
        })
    }
}
*/

document.onreadystatechange = function() {
    // initialize skrollr if the window width is large enough
    if (document.readyState === "complete") {
        skrollr.init();
    }


    // disable skrollr if the window is resized below 768px wide
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera|android|ipad|playbook|silk Mini/i.test(navigator.userAgent)) {
        skrollr.init().destroy(); // skrollr.init() returns the singleton created above
    }
}