$(function() {


    // either painting or erasing
    var paint = false;
    // either painting or erasing
    var erase_paint = "paint";

    //get the canvas and context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");

    //get the cavas container 
    var container = $("#container");


    //mouse position
    var mouse = {
        x: 0,
        y: 0
    };

    //onload load saved work from localStorage
    if (localStorage.getItem("imgCanvas") != null) {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };

    //adding the drawing parameter(lineWidth,lineJoin, lineCap) default values
    ctx.lineWidth = 3; // default width of the line 
    ctx.lineJoin = "round" // join two lines with rounded
    ctx.lineCap = "round"; // edges of the lines are rounded 
    console.log("hello");


    //click inside the container 
    container.mousedown(function(e) {
        paint = true;
        ctx.pathbegin();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });

    //move the mouse while holding the key 
    container.mousemove(function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            //get color input
            if (erase_paint == "paint") {
                ctx.strokeStyle = $("#paintColor").val();
            } else {
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });

    // when not clicking the mouse 
    container.mouseup(function() {
        paint = false;
    });

    //mouse pointer leaving the container
    container.mouseleave(function() {
        paint = false;
    });

    //click on the earase button 
    $("#erase").click(function() {
        if (erase_paint == "paint") {
            erase_paint = "erase";
        } else {
            erase_paint = "paint";
        }
        $(this).toggleClass("erasemode");
    });

    //click on the reset button 
    $("#reset").click(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the context of the canvas 
        erase_paint = "paint";
        $("#erase").removeClass("erasemode");
    });

    //click the save work 
    $("#save").click(function() {
        if (typeof(localStorage) != null) {
            localStorage.setItem("imgCanvas",
                canvas.toDataURL());
        } else {
            window.alert("Your browser does not support local storage!");
        }
    });

    //change line width using slider 
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(e, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

    //change the color of the circle withclor input 
    $("#paintColor").change(function() {
        $("#circle").css("background-color", $(this).val());
    });
});