

const startBtnEl = document.getElementById('startBtn');
const Img1El = document.getElementById('landingImg1');
const Img2E2 = document.getElementById('landingImg2');
const Img3E3 = document.getElementById('landingImg3');

if(startBtnEl != null) {
	startBtnEl.addEventListener('click', function() {
		document.location.href = "eventapp.html";
	});
}
if(Img1El != null) {
	Img1El.addEventListener('click', function() {
		document.location.href = "eventapp.html";
	});
}
if(Img2E2 != null) {
	Img2E2.addEventListener('click', function() {
		document.location.href = "eventapp.html";
	});
}

if(Img3E3 != null) {
	Img3E3.addEventListener('click', function() {
		document.location.href = "eventapp.html";
	});
}
// pull history or create empty array
var searchInfo = JSON.parse(localStorage.getItem("searchInfo")) || []
if(searchInfo.length) {
	searchInfo.forEach(function(d) {
		$("#searchList").append('<li style="cursor: pointer; overflow: hidden; margin: 5px;" onclick="reSearch(\'' + d.cityName + '\',\'' + d.eventType + '\')"><p style="float:left">' + d.cityName + '</p><p style="float:right">' + d.eventType + '</p></li>');
	});
}	

$("#submit").on("click", function() {
    var cityName = uppercase($(".location").val());
    var typeOfEvent = uppercase($(".interests").val());
	
	
	if (cityName != "" && typeOfEvent != "") {
		populateResults(cityName, typeOfEvent);	
		
	}
});

function populateResults(cityName, typeOfEvent) {
    console.log(cityName, typeOfEvent);
    
    populateQueryHist(cityName, typeOfEvent);
}

function populateQueryHist(name, type) {
	var itemToAdd = {"cityName": name, "eventType": type};
		
		console.log(name, type);
		var valExist = false;
		searchInfo.forEach(function(d) {
			if(d.cityName === name && d.eventType === type) {
				console.log(valExist);
				valExist = true;
			}
		});

		if (valExist === false) {
			searchInfo.push(itemToAdd);
			$("#searchList").append('<li style="cursor: pointer;" onclick="reSearch(\'' + name + '\',\'' + type + '\')">' + name + ' ' + type + '</li>');
		}
	
  
	  localStorage.setItem("searchInfo", JSON.stringify(searchInfo));
	
  }
function uppercase(cityName) {
    var array1 = cityName.split(' ');
    var newarray1 = [];
        
    for(var x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
    return newarray1.join(' ');
}
// on click for utilizing history re-populates fields
function reSearch(cityName, eventType) {
	$(".location").val(cityName);
	$(".location").addClass("active");
	$("#label1").addClass("active");
	$("#icon1").addClass("active");

	$(".interests").val(eventType);
	$(".interests").addClass("active");
	$("#label2").addClass("active");
	$("#icon2").addClass("active");

	$("#submit").trigger("click");
}

