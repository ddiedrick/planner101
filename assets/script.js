
var eventsData=[];

// checks time and changes colors of time block based on past present and future
function setColors() {
    var now = dayjs();

    for (var i = 9; i < 18; i++) {
        if (i < now.hour()) {
            $("#hour-" + i + " textarea").addClass("past");
        } else if (i == now.hour()) {
            $("#hour-" + i + " textarea").addClass("present");
        } else {
            $("#hour-" + i + " textarea").addClass("future");
        }
    }
}

// will check if there's existing event in localStorage, and loads stored data. If time slot is empty it will default an empty string
function loadStoredData() {
    eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
    if (!eventsData) {
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "", 
            hour12: "", 
            hour13: "", 
            hour14: "", 
            hour15: "",
            hour16: "", 
            hour17: ""   
        };
    } 
    displayEvents(eventsData);
}

// diplays events
function displayEvents(e) {
    for (var i = 9; i < 18; i++) {
        $("#hour-" + i + " textarea").val(e["hour" + i]);
    }   
}

// retrieve data from html modify it, then store it as an object
function handleSaveClick(event) {
    var hourBlock = $(event.target).parent();
    var value = hourBlock.children("textarea").val();
    var hour = hourBlock.attr('id').split("-")[1];

    eventsData["hour" + hour] = value;

    localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
}


// event listener for save button
$('.saveBtn').on('click', handleSaveClick);

// display stored data and hour colors
$(function() {
    loadStoredData();
    setColors();
});