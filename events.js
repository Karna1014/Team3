$(document).ready(function(){
    M.Datepicker.init($('.datepicker1'), {
        format: "yyyy-mm-dd"
    });
    M.Datepicker.init($('.datepicker2'), {
        format: "yyyy-mm-dd"
    });
    $('select').formSelect();
    
    // trying to make list so its not hard coded--------------------
    // var interestsList = [
    //     {
    //         name : "Comedy",
    //         value: "Comedy",
    //         img: ""
    //     },
    //     {
    //         name : "Dance",
    //         value: "Dance",
    //         img: ""
    //     },
    //     {
    //         name : "Music",
    //         value: "Music",
    //         img: ""
    //     },
    //     {
    //         name : "- Alternative",
    //         value: "Alternative",
    //         img: ""
    //     },
    //     {
    //         name : "- Clasical",
    //         value: "Clasical",
    //         img: ""
    //     },
    //     {
    //         name : "- Country",
    //         value: "Country",
    //         img: ""
    //     },
    //     {
    //         name : "- Electronic",
    //         value: "Electronic",
    //         img: ""
    //     },
    //     {
    //         name : "- Jazz",
    //         value: "Jazz",
    //         img: ""
    //     },
    //     {
    //         name : "- Rap",
    //         value: "Rap",
    //         img: ""
    //     },
    //     {
    //         name : "- Rock",
    //         value: "Rock",
    //         img: ""
    //     },
    //     {
    //         name : "Sports",
    //         value: "Sports",
    //         img: ""
    //     },
    //     {
    //         name : "- Baseball",
    //         value: "Baseball",
    //         img: ""
    //     },
    //     {
    //         name : "- Basketball",
    //         value: "Basketball",
    //         img: ""
    //     },
    //     {
    //         name : "- Football",
    //         value: "Football",
    //         img: ""
    //     },
    //     {
    //         name : "- Hockey",
    //         value: "Hockey",
    //         img: ""
    //     },
    //     {
    //         name : "- Tennis",
    //         value: "Tennis",
    //         img: ""
    //     },
    //     {
    //         name : "- Volleyball",
    //         value: "Volleyball",
    //         img: ""
    //     },
    //     {
    //         name : "- Wrestling",
    //         value: "Wrestling",
    //         img: ""
    //     },
    // ];
    // for(var i = 0; i < interestsList.length; i++) {
    //    var newOption = $("<option>").attr("value", interestsList[i].valiue).attr("data-icon", interestsList[i].img).text(interestsList[i].name);
    //    console.log(newOption);
    //    $(".interests").append(newOption);
    // }
    //  --------------------------------------------

    // function to render map in div with class addInfo
    function createMap(mapQuestURL) {
        var newImg = $("<img>").attr("id", "map-image");
        newImg.attr("src", mapQuestURL);
        $(".addInfo").append(newImg);
    }

    // on click event to render the results of the search
    $("#submit").on("click", function() {
    


    
    var city = $(".location").val();
    var eventType = $(".interests").val();
    var startDate = $(".startDate").val();
    var endDate = $(".endDate").val();
    if(startDate !== "") {
        startDate = $(".startDate").val() + "T00:00:00Z";
    }
    if(endDate !== "") {
        endDate = $(".endDate").val() + "T23:59:00Z";
    }
    console.log(startDate);
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&keyword=" + eventType + "&startDateTime=" + startDate + "&endDateTime=" + endDate +"&apikey=5bcwmAqxVSJXdaklNuDJWfb2QRKnAXZD";

    // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&keyword=" + eventType + "&apikey=5bcwmAqxVSJXdaklNuDJWfb2QRKnAXZD";
    
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET" 
    }) .then(function(eventData){
        console.log(eventData);
    
        pageInfo = [];
        $("#results").empty();
        // empties the results before appendinfg new information
        if(!eventData._embedded) {
            $("#results").text("No Results Found.  Please check for spelling errors and abbreviations.");
        //gives error message upon "no results or improper input"
        }

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
            // pageInfo.push(extraInfo); //lodash integration below
            pageInfo = _.concat(pageInfo, extraInfo);
            var name = $("<h5>").text(eventData._embedded.events[i].name);
            name.attr("class", "name");
            var picLink = $("<a>").attr("href", eventData._embedded.events[i].url);
            var image = $("<img>").attr("src", eventData._embedded.events[i].images[0].url);
            image.attr("class", "eventsImage");
            image.attr("id", "events-image");
            // newDiv.append(name, picLink);
            newDiv.append(picLink);
            picLink.append(image);
            var date = $("<p>").text(eventData._embedded.events[i].dates.start.localDate);
            date.attr("class", "data")
            var venue = $("<p>").text(eventData._embedded.events[i]._embedded.venues[0].name);
            venue.attr("class", "venue");
            // newDiv.append(promoters);
            // Create additional info button with unique identity
            var moreInfoBtn = $("<button>").data("id", i).addClass("moreInfoBtn").text("Additional Info").attr("type", "info");
            newDiv.append(name,venue,date,moreInfoBtn);

        }
    
    });
    });

    // on click event to render the additional info Popup
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
            var clearBtn =$("<button>").addClass("clearBtn").attr("type", "clear").text("X").attr("style", "float: right; margin: 1%; background-color: red; color: white");
            var infoDescription = $("<p>").text(pageInfo[listIndex].description);
            var br = $("<br>");
            newInfoDiv.append(clearBtn, br, infoName, infoDescription);
            createMap(mapQuestURL);
        }
    })

    // on click event to remove the popup window
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
