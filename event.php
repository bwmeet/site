<?php

date_default_timezone_set('Europe/London');

$eventName = 'B & W Meet 20';
$eventUrl = 'https://bwmeet20.eventbrite.co.uk/'; //http://bwmeet17.eventbrite.co.uk/
$eventLocation = 'The Slug and Lettuce';
$eventLocationMapLink = 'https://www.google.co.uk/maps/place/The+Slug+And+Lettuce/@50.7206979,-1.8794283,15z/data=!4m2!3m1!1s0x0:0x1b4f21a18ece51e7?sa=X&ved=0CHgQ_BIwDWoVChMIoarBx7P7xgIVQzwUCh2q9Q58';
$eventDate = '16/02/2016'; //20/01/2015
$eventDay = '16'; //20
$eventSuffix = 'th'; //th
$eventMonth = 'February'; // January
$eventYear = '2016'; //2015
$eventIsInPast = false;


// work out if event date is in past
$date = strptime($eventDate, '%d/%m/%Y');
$timestamp = mktime(0, 0, 0, $date['tm_mon']+1, $date['tm_mday'], $date['tm_year']+1900);

if (time() > $timestamp) {
    $eventIsInPast = true;
}

?>