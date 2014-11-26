<?php require_once 'event.php'; ?>
<?php require_once 'header.php'; ?>
        <header id="top">
            <img src="images/logo.png" alt="The B &amp; W Meet logo" class="logo circle" width="180" height="180">
            <p class="strapline">
                <em>A regular, local meetup</em>
                for creatives, developers &amp; tech enthusiasts
            </p>
            <div class="information">
                <p class="left"><a href="event.ics" download><i class="icon-clock"></i><?php echo $eventDay; ?><sup><?php echo $eventSuffix; ?></sup> <?php echo $eventMonth; echo ' '; echo $eventYear; ?></a></p>
                <p class="middle"><a href="<?php echo $eventLocationMapLink; ?>"><i class="icon-location"></i><?php echo $eventLocation; ?></a></p>
                <p class="right"><i class="icon-pound"></i>Free</p>
            </div>
            <a href="<?php echo $eventUrl; ?>" class="cta-primary">Get tickets</a>
            <!-- <a href="#" class="cta-secondary">Find out more</a> -->
        </header>
        <nav id="site-nav">
            <ul class="constrained">
                <li><a href="#top" class="exempt"><i class="icon-home"></i></a></li>
                <li><a class="active" href="index.html">About <span class="hide-mobile">B &amp; W Meet</span></a></li>
                <li><a href="about.html">Who<span class="hide-mobile"> are we</span>?</a></li>
                <li><a href="sponsors.html">Sponsor</a></li>
            </ul>
        </nav>
        <article class="constrained center index">
            <h1>About B &amp; W Meet</h1>
            <img src="/images/promo.jpg" alt="B &amp; W Meet in full swing." />
            <p>B &amp; W Meet is an informal pub meet for Bournemouth&ndash;based digital creatives.</p>
            <p>We hold them every 6 weeks or so and, thanks to our wonderful sponsor, each one has a few free drinks.</p>
            <p>It doesn’t matter where you’re from or how experienced you are as long as you’re passionate about the web.</p>
            <p>We’ll always be free and open to all. We look forward to meeting you &ndash; or seeing you again!</p>
        </article>
        <article class="constrained center about is-hidden">
            <h1>Who we are</h1>
            <p>We love building for the web and we love meeting people&mdash;that's why B &amp; W Meet is a thing.</p>
            <div class="bio media">
                <div class="image">
                    <img src="/images/sean.jpg" alt="Image of Sean">
                </div>
                <div class="body">
                    <h2>Sean Tracey</h2>
                    <p>Hello, I'm a Creative Technologist working for a (lovely) company called Redweb. Alongside that I make quite a lot of little personal projects (most never get finished, but some find a form elsewhere) and I occasionally write articles for Linux User and Developer Magazine. Did I mention that I play Bagpipes? I play Bagpipes.</p>
                    <p><a href="https://twitter.com/seanmtracey" class="twitter-link">seanmtracey</a></p>
                </div>
            </div>
            <div class="bio media">
                <div class="imageRight">
                    <img src="/images/tim.jpg" alt="Image of Tim">
                </div>
                <div class="body">
                    <h2>Tim Stone</h2>
                    <p>Hey, I'm a front end developer at Redweb which means I get to make and break sites. I write tutorials for Web Designer magazine which usually focus on JavaScript things. I like reading and listening.</p>
                    <p><a href="https://twitter.com/timofetimo" class="twitter-link">timofetimo</a></p>
                </div>
            </div>
            <section class="why">
                <h2>Why?</h2>
                <p>
                    Back in our student days we'd often meet at the pub and talk about the web but wished that others would join us. Soon after the death of Steve Jobs we decided that we should be proactive; and so we made B &amp; W Meet.
                </p>
            </section>
        </article>
        <article class="constrained center sponsors is-hidden">
            <h1>Our sponsors</h1>
            <p>We wouldn't be able to run a great event without our wonderful sponsor.</p>
            <div class="sponsor">
                <img src="images/campaign-monitor.png" class="circle">
                <p><a href="https://www.campaignmonitor.com/">Campaign Monitor</a> makes it easy to attract new subscribers, send them beautiful email newsletters and see stunning reports on the results. <em>They're also tremendously nice people.</em></p>
            </div>
        </article>
<?php require_once 'footer.php'; ?>
