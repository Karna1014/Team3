$(document).ready(function(){

  $("#search").on("click", function() {
  
  
  
  var city = $("#location").val();
  var eventType = $("#interests").val();
  
  
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&keyword=" + eventType + "&apikey=5bcwmAqxVSJXdaklNuDJWfb2QRKnAXZD";
  
  console.log(queryURL);
  $.ajax({
      url: queryURL,
      method: "GET" 
  }) .then(function(eventData){
      console.log(eventData);
  
      // var newDiv = $("<div>").addClass("resources");
    //   var generateEvents =[];
  
    //   //  $(".resultInput").append(resultInput);
    //   if(eventData.embedded.events.length < generateEvents) {
    //       generateEvents = eventData.response.events.length;
    //   }
      //console.log(generateEvents)

      for(var i = 0; i < 10; i++) {
          var name= eventData._embedded.events[i].name;
          console.log(name);
          var newName = $("<h3>").text(name);
        //   var type = $("<p>").text(eventData._embedded.events[i].url);
        //   var date = $("<p>").txt(eventData._embedded.events[i].dates.start.localDate);
        //    var url  = $("<a href ="+ eventData._embedded.events[i].images[0].url + ">").attr("src", eventData._embedded.events[i].images[0].url).text("link");
            var hr = $("<hr>");
          $(".resultInput").append(newName,hr);
  
  
  
      }
  
  });
  });
  
      $("#delete").on("click", function() {
          $(".resultInput").empty();
  
      });
  
  });
 
    