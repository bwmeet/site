<?php

date_default_timezone_set('Europe/London');

$eventName = 'B & W Meet 23';
$eventUrl = 'https://bwmeet23.eventbrite.co.uk/'; //http://bwmeet17.eventbrite.co.uk/
$eventLocation = 'The Slug and Lettuce'; //The Slug and Lettuce
$eventLocationMapLink = 'https://www.google.co.uk/maps/place/The+Slug+And+Lettuce/@50.7206979,-1.8794283,15z/data=!4m2!3m1!1s0x0:0x1b4f21a18ece51e7?sa=X&ved=0CHgQ_BIwDWoVChMIoarBx7P7xgIVQzwUCh2q9Q58';
// $eventLocationMapLink = 'https://www.google.co.uk/maps/place/Inferno/@50.7232011,-1.867011,17z/data=!4m7!1m4!3m3!1s0x4873a1deeb57a4d3:0xc031e826357a7bb3!2sInferno!3b1!3m1!1s0x4873a1deeb57a4d3:0xc031e826357a7bb3';
$eventDate = '16/08/2016'; //20/01/2015
$eventDay = '16'; //20
$eventSuffix = 'th'; //th
$eventMonth = 'August'; // January
$eventYear = '2016'; //2015


// below here shouldn't need editing
$eventIsInPast = false;

// work out if event date is in past
$date = strptime($eventDate, '%d/%m/%Y');
$timestamp = mktime(0, 0, 0, $date['tm_mon']+1, $date['tm_mday'], $date['tm_year']+1900);

if (time() > $timestamp) {
    $eventIsInPast = true;
}

?>