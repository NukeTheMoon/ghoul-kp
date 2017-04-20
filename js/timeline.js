var testEvents = [
  {
    "date": "2015-06-01T00:00:00.000Z",
    "name": "Lorem ipsum",
    "faIcon": "heart"
  },
  {
    "date": "2015-06-15T00:00:00.000Z",
    "name": "Lorem ipsumer",
    "faIcon": "flask"
  },
  {
    "date": "2015-06-22T00:00:00.000Z",
    "name": "Loremer ipsumer",
    "faIcon": "gavel"
  },
  {
    "date": "2015-06-30T00:00:00.000Z",
    "name": "loremest of ipsumests",
    "faIcon": "graduation-cap"
  }
],
  testDate = new Date("2015-06-10T00:00:00.000Z");

var app = angular.module('Timeline', []);

app.controller('TimelineController', function($scope) {

  $scope.events = getEvents();
  $scope.barProgress = linearMapPercentageOfDate();

  var startDateOfTimeline = new Date("2015-06-01T00:00:00.000Z"),
    endDateOfTimeline = new Date("2015-06-30T00:00:00.000Z"),
    currentDate = getCurrentDate(),
    //has to be kept up to date with height/width of .event-circle-background
    circleBackgroundSidePx = 37;

  $scope.getBarProgress = function() {
    return linearMapPercentageOfDate() + '%';
  };

  $scope.getEventLeftOffset = function(event) {
    return linearMapPercentageOfDate(new Date(event.date)) + '%';
  };

  $scope.getEventTranslateX = function(event) {
    var percentage = linearMapPercentageOfDate(new Date(event.date));
    var offset = (percentage < 50) ?
    linearMap(percentage, 0, 50, 0, circleBackgroundSidePx/2) :
    -linearMap(percentage, 50, 100, 0, circleBackgroundSidePx);
    return '-ms-transform: translateX(' + offset + 'px); -webkit-transform: translateX(' + offset + 'px); transform: translateX(' + offset + 'px);';
  };

  $scope.getDateString = function(event) {
    var eventDate = new Date(event.date);
    return [eventDate.getDate(), eventDate.getMonth() + 1, eventDate.getFullYear()].join('.');
  };

  $scope.determineIfDisabled = function(event) {
    return (new Date(event.date) > currentDate);
  };

  function getEvents() {
    // normally, a AJAX/AJAJ call to get event objects would go here
    // we pass a local variable for ease of testing
    return testEvents;
  }

  function getCurrentDate() {
    // normally this would be new Date()
    // we pass a local variable for ease of testing
    return testDate;
  }

  function linearMapPercentageOfDate(date = currentDate, startDate = startDateOfTimeline, endDate = endDateOfTimeline) {
    if (date == null || startDate == null || endDate == null) return;
    var dateTicks = date.getTime(),
      startDateTicks = startDate.getTime(),
      endDateTicks = endDate.getTime();

    return linearMap(dateTicks, startDateTicks, endDateTicks, 0, 100);
  }

  function linearMap(value, valueRangeFrom, valueRangeTo, targetRangeFrom, targetRangeTo) {
    if (value == null || valueRangeFrom == null || valueRangeTo == null || targetRangeFrom == null || targetRangeTo == null) return;
    return (value - valueRangeFrom) / (valueRangeTo - valueRangeFrom) * (targetRangeTo - targetRangeFrom) + targetRangeFrom;
  }

});
