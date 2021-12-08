// Store the meta element
var viewport_meta = document.getElementById('viewport-meta');

// Define our viewport meta values
var viewports = {
  default: viewport_meta.getAttribute('content'),
  screenshot: 'width=1200'
};

var viewport_set = function(screenshot) {
  if ( screenshot ) {
    viewport_meta.setAttribute( 'content', viewports.screenshot );
    // document.body.setAttribute('width', "100%");
  }
  else {
    viewport_meta.setAttribute( 'content', viewports.default );
    // ocument.body.setAttribute('width', '');
  }
}
var link = document.createElement('link');
link.href = "css/mobile.css";
link.rel = "stylesheet";
link.type = "text/css";
link.id = "mobile"

function getRandomInt(lower, upper) {
  var s = Math.floor(Math.random() * lower);
  var e = Math.floor(Math.random() * upper);
  return Math.max(s, e)
}


var svgElements = document.body.querySelectorAll('img');

function take_screenshot() {
    $('#mobile')[0].remove();
    viewport_set(true);
    

    svgElements.forEach(function(item) {
      item.setAttribute("width", item.width);
    });
    html2canvas($('#page1')[0], {
      allowTaint: true, 
      useCORS: true,
    }).then(function(canvas) {
        // $('#screenshot1')[0].appendChild(canvas);
        $("#screenshot1Img").attr("src", canvas.toDataURL("img/png"));
    });
    html2canvas($('#page2')[0], {
      allowTaint: true, 
      useCORS: true,
    }).then(function(canvas) {
        // $('#screenshot1')[0].appendChild(canvas);
        $("#screenshot2Img").attr("src", canvas.toDataURL("img/png"));
    });
    svgElements.forEach(function(item) {
      item.setAttribute("width", '');
    });

    document.head.appendChild(link);
    viewport_set(false);
  };

$(document).ready(function(){

  $(".free").each(function(){
      $(this).css("left", getRandomInt(20,80) + "%").css("top", getRandomInt(20,80) + "%");
      // Test if the div element is empty
      $(this).draggable({
        containment: 'parent',
        stop: function(e, ui) {
          var percL = ui.position.left / ui.helper.parent().width() * 100;
          var percT = ui.position.top / ui.helper.parent().height() * 100;
          ui.helper.css('left', percL + '%');
          ui.helper.css('top', percT + '%');
        }
      });
  });

  $(".slide").each(function(){
      $(this).css("left", getRandomInt(20,80) + "%")
      // Test if the div element is empty
      $(this).draggable({
        axis: 'x',
        containment: 'parent',
        stop: function(e, ui) {
          var percL = ui.position.left / ui.helper.parent().width() * 100;
          var percT = ui.position.top / ui.helper.parent().height() * 100;
          ui.helper.css('left', percL + '%');
          ui.helper.css('top', percT + '%');
        }
      });
  });



  $('.cb').each(function() {
    this.addEventListener('click', function(e) {this.classList.toggle('on')});
  });


  var href = window.location.href
  var idIndex = href.indexOf('?data=');

  if (idIndex > -1) {
  	var id = href.slice(idIndex+6);
  	// console.log(id);
  	setID(id);
  }

});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
	saveData();
    take_screenshot();
    modal.style.display = "block";
}

    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";

}

    // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      
    }
}