<?php require_once 'event.php'; ?>
<!doctype html>
<html>
    <head>
        <title>B &amp; W Meet</title>
        <link href="//fonts.googleapis.com/css?family=Fira+Sans:400,700,400italic,300" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="/css/bwmeet-embedded.css" media="screen">
        <link rel="stylesheet" href="/css/normalize.min.css" media="screen">
        <link rel="stylesheet" href="/css/master.css" media="screen">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta charset="utf-8">
    </head>
    <body>
		<header id="top">
			<img src="images/logo.svg" alt="The B &amp; W Meet logo" class="logo circle" width="180" height="180">
			<p class="strapline">
				<em>A meetup in Bournemouth</em>
				for creatives, developers &amp; web peeps
			</p>
			<div class="information">
				<p class="left">
                    <?php if ($eventIsInPast) : ?>
                        <i class="icon-clock"></i>
                        TBC
                    <?php else: ?>
                    <a href="event.ics" download>
                        <i class="icon-clock"></i>
                        <?php echo $eventDay; ?><sup><?php echo $eventSuffix; ?></sup>
                        <?php echo $eventMonth; echo ' '; echo $eventYear; ?>
                    </a>
                    <?php endif; ?>
                </p>
				<p class="middle"><a href="<?php echo $eventLocationMapLink; ?>"><i class="icon-location"></i><?php echo $eventLocation; ?></a></p>
				<p class="right"><i class="icon-pound"></i>Free</p>
			</div>
        <?php if (strlen($eventUrl) > 0 && !$eventIsInPast) { ?>
            <a href="<?php echo $eventUrl; ?>" class="cta-primary">Get tickets</a>
        <?php } else { ?>
            <a class="cta-primary">Tickets coming soon</a>
        <?php } ?>
            <!-- <a href="#" class="cta-secondary">Find out more</a> -->
		</header>
		<nav id="site-nav">
			<ul class="constrained">
				<li><a href="#top" class="exempt"><i class="icon-home"></i></a></li>
				<li><a href="about" class="<?php echo $_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '/about' ? 'active' : ''; ?>">About <span class="hide-mobile">B &amp; W Meet</span></a></li>
				<li><a href="who" class="<?php echo $_SERVER['REQUEST_URI'] == '/who' ? 'active' : ''; ?>">Who<span class="hide-mobile"> are we</span>?</a></li>
				<li><a href="code-of-conduct" class="<?php echo $_SERVER['REQUEST_URI'] == '/code-of-conduct' ? 'active' : ''; ?>"><span class="hide-mobile">Code of </span>Conduct</a></li>
			</ul>
		</nav>