$(document).ready(function(){

    function createMap(mapQuestURL) {
        var newImg = $("<img>").attr("id", "map-image");
        newImg.attr("src", mapQuestURL);
        $(".addInfo").append(newImg);
    }

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
    
        pageInfo = [];
        $("#results").empty();
        // empties the results before appendinfg new information
        
        for(var i = 0; i < 20; i++) {
            var newDiv = $("<div>").data("id", i);
            newDiv.attr("class", "main-area").attr("id","mainArea");
            $("#results").append(newDiv);
            var extraInfo = {
                name: eventData._embedded.events[i].name,
                lat: eventData._embedded.events[i]._embedded.venues[0].location.latitude,
                lon: eventData._embedded.events[i]._embedded.venues[0].location.longitude,
                description: eventData._embedded.events[i].info,
                venue: eventData._embedded.events[i]._embedded.venues[0].name
            }
            pageInfo.push(extraInfo);
            var name = $("<h5>").text(eventData._embedded.events[i].name);
            var picLink = $("<a>").attr("href", eventData._embedded.events[i].url);
            var image = $("<img>").attr("src", eventData._embedded.events[i].images[0].url);
            image.attr("class", "eventsImage");
            image.attr("id", "events-image");
            // newDiv.append(name, picLink);
            newDiv.append(picLink);
            picLink.append(image);
            var date = $("<p>").text(eventData._embedded.events[i].dates.start.localDate);
            var venue = $("<p>").text(eventData._embedded.events[i]._embedded.venues[0].name);
            // newDiv.append(promoters);
            // Create additional info button with unique identity
            var moreInfoBtn = $("<button>").data("id", i).addClass("moreInfoBtn").text("Additional Info").attr("type", "info");
            newDiv.append(name,venue,date,moreInfoBtn);

        }
    
    });
    });
    
    $("#results").on("click", "button", function(event) {
        console.log(event.target)
        if($(this).attr("type") === "info") {
            event.preventDefault();
            console.log("info click");
            
            var newInfoDiv = $("<div>").addClass("addInfo");
            var listIndex = $(this).data("id");
            console.log(listIndex);
            // MAPQUEST
            var locationCoordinates = {
                lat: pageInfo[listIndex].lat,
                lon: pageInfo[listIndex].lon
            }
            var bannerText = pageInfo[listIndex].venue;
            var mapQuestURL = "https://www.mapquestapi.com/staticmap/v5/map?locations=" + locationCoordinates.lat + "," + locationCoordinates.lon + "&banner=" + bannerText + "&size=@2x&key=A492QA2ceege88RFFGEJJWQjU8t7Hcxm";
            $(".addInfoDiv").append(newInfoDiv);
            var infoName = $("<h4>").text(pageInfo[listIndex].name);
            var infoDescription = $("<p>").text(pageInfo[listIndex].description);
            var clearBtn =$("<button>").addClass("clearBtn").attr("type", "clear").text("X");
            var br = $("<br>");
            newInfoDiv.append(infoName, infoDescription);
            createMap(mapQuestURL);
            newInfoDiv.append(br, clearBtn);
        }
    })

    $(".addInfoDiv").on("click", "button", function(event) {
        console.log(event.target)
        if($(this).attr("type") === "clear") {
            event.preventDefault();
            console.log("clear click");
            $(".addInfoDiv").empty();
            
        }
    })
    $("#delete").on("click", function() {
            $(".resultInput").empty();
    
    });
    
    
    });

    