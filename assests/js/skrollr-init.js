//if (document.readyState == "complete" || document.readyState == "loaded") {
// Init Skrollr

//}

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