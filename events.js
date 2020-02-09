$(document).ready(function(){
    $("#submit").on("click", function() {
    
    
    
    var city = $("#location").val();
    var eventType = $("#interests").val();
    
    
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&keyword=" + eventType + "&apikey=5bcwmAqxVSJXdaklNuDJWfb2QRKnAXZD";
    
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET" 
    }) .then(function(eventData){
        console.log(eventData);
    
        
        
        for(var i = 0; i < 10; i++) {
            var newDiv = $("<div>").data("id", i);
            $("#results").append(newDiv);
            var name = $("<h3>").text(eventData._embedded.events[i].name);
            var picLink = $("<a>").attr("href", eventData._embedded.events[i].url);
            var image = $("<img>").attr("src", eventData._embedded.events[i].images[0].url);
            newDiv.append(name, picLink);
            picLink.append(image);
            var date = $("<p>").text(eventData._embedded.events[i].dates.start.localDate);
            var hr = $("<hr>");
            newDiv.append(date, hr);
        }
    
    });
    });
    
        $("#delete").on("click", function() {
            $(".resultInput").empty();
    
        });
    
    });