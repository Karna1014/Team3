$(document).ready(function(){
    $("#submit").on("click", function() {
    


    
    var city = $(".location").val();
    var eventType = $(".interests").val();

    

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&keyword=" + eventType + "&apikey=5bcwmAqxVSJXdaklNuDJWfb2QRKnAXZD";
    
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET" 
    }) .then(function(eventData){
        console.log(eventData);
    

        $("#results").empty();
        // empties the results before appendinfg new information
        
        for(var i = 0; i < 20; i++) {
            var newDiv = $("<div>").data("id", i);
            newDiv.attr("class", "main-area").attr("id","mainArea");
            $("#results").append(newDiv);
            var name = $("<h5>").text(eventData._embedded.events[i].name);
            var picLink = $("<a>").attr("href", eventData._embedded.events[i].url);
            var image = $("<img>").attr("src", eventData._embedded.events[i].images[0].url);
            image.attr("class", "eventsImage");
            image.attr("id", "events-image");
            // newDiv.append(name, picLink);
            newDiv.append(picLink);
            picLink.append(image);
            var date = $("<p>").text(eventData._embedded.events[i].dates.start.localDate);
            var promoters = $("<p>").text(eventData._embedded.events[i].promoters[0].name);
            // newDiv.append(promoters);
            
            newDiv.append(name,promoters,date);

        }
    
    });
    });
    
        $("#delete").on("click", function() {
            $(".resultInput").empty();
    
        });

    
    });