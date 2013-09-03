var bwMeet = (function(){

	'use strict';

	var nav,
		menuOptions,
		articles;

	var timeGrades = {
			day : {
				r : 120,
				g : 182,
				b : 227,
				cssClass : "day"
			},
			dusk : {
				r : 95,
				g : 81,
				b : 179,
				cssClass : "dusk"
			},
			night : {
				r : 9,
				g : 49,
				b : 117,
				cssClass : "night"
			},
			dawn : {
				r : 235,
				g : 197,
				b : 94,
				cssClass : "dawn"
			}
		}, 
		currentGrade = timeGrades.day;

	function getGrades(){
		return timeGrades;
	}

	function transitionGrade(from, to){

		var length = 3,
			frameRate = 60,
			delay = 1000 / frameRate;
		
		document.body.className += ' ' + to.cssClass;
		
		for(var x = 0; x < (length * frameRate); x += 1){

			(function(delay, x, from, to, max){

				setTimeout(function(){

					var whereAreWe = (x / max) * 100;
					
					var diffR,
						diffG,
						diffB;

					diffR = Math.floor(0 - ((from.r - to.r) / 100) * whereAreWe);
					diffG = Math.floor(0 - ((from.g - to.g) / 100) * whereAreWe);
					diffB = Math.floor(0 - ((from.b - to.b) / 100) * whereAreWe);

					document.getElementById('frame').setAttribute('style', "background-color : rgb(" + (from.r + diffR) + ", " + (from.g + diffG) + ", " + (from.b + diffB) + ")");

					if(to.cssClass == "night"){
						document.getElementById("darkness").style.opacity = 0 + (1 / 100) * whereAreWe;
						document.getElementById("stars").style.opacity = 0 + (1 / 100) * whereAreWe;
					} else if(from.cssClass){
						document.getElementById("darkness").style.opacity = 1 - (1 / 100) * whereAreWe;
						document.getElementById("stars").style.opacity = 1 - (1 / 100) * whereAreWe;
					}

				}, delay * x);
			
			})(delay, x, from, to, length * frameRate);
		}
	}

	function checkToday(time){

		var timeDate = new Date(),
			hour = timeDate.getHours(),
			check;

		if (hour < 5 || hour >= 21){
			//console.log("Nighttime");
			check = timeGrades.night;
		} else if(hour >= 5 && hour <= 9){
			//console.log("Dawn");
			check = timeGrades.dawn;
		} else if(hour > 9 && hour <= 18){
			//console.log("Day");
			check = timeGrades.day;
		} else if(hour > 18  && hour < 21){
			//console.log("Dusk");
			check = timeGrades.dusk;
		}

		if(check !== currentGrade){
			transitionGrade(currentGrade, check);
			currentGrade = check;
		}
	}
	
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	var weather = (function(condition) {
		var condition, weatherData;



		var rainFactory = function(options) {
			var i = options.amount,
				back = document.getElementsByClassName('clouds')[0],
				cloud = document.getElementsByClassName('cloud')[0];

			while (i--) {
				var dropLeft = getRandomInt(0, 1600),
					dropTop = getRandomInt(-1000, 1400),
					drop = document.createElement('span');

				drop.className = 'drop';
				drop.style.left = dropLeft + 'px';
				drop.style.top = dropTop + 'px';
				back.insertBefore(drop, cloud);
			}
		};

		var cloudFactory = function (options) {
			var clouds = document.querySelector('.clouds');

			for (var i = 0, len = options.amount; i < len; i++) {
				var c = document.querySelectorAll('.cloud');

				var cloud = c[c.length - 1].cloneNode(true);
				cloud.classList.remove('hide');
				clouds.appendChild(cloud);
				
				var y = getRandomInt(0, 3),
					x = getRandomInt(0, 7);
				
				for (var i = 0; i < y; i++) {
					$(cloud).find('ellipse').eq(x).remove();
				}
				
				if (options.animate && options.comeFromRight) {
					cloud.style.left = '77%';
				}
				
	    		if (i >= 3 || options.heavy) {
	    			clouds.className += ' heavy-cloud';
	    		}
	    		
	    		var speed = options.comeFromRight ? weatherData.wind.speed * 20000 : weatherData.wind.speed * 10000;
				
				if (options.animate) {
		    		$(cloud).animate({left:'-76%'}, speed, function() {
		    		    $(this).remove();
		    		});
	    		}
	    	}
	    	
	    	if (options.animate) {
		    	var timeout = (weatherData.wind.speed * 10000 / 2) + getRandomInt(1000, 10000);
		
		    	setTimeout(function() {
		    		cloudFactory({
			    		animate: true,
			    		comeFromRight: true
		    		});
		    	}, timeout);
	    	}
		};

		var get = function() {
			$.ajax({
			    type: 'POST',
			    dataType: 'jsonp',
			    url: 'http://api.openweathermap.org/data/2.5/weather?q=Bournemouth,uk&callback=?',
			    success: function(data) {
			        /* wind = data.wind.deg & data.wind.speed */
			        /* status id's found at http://openweathermap.org/wiki/API/Weather_Condition_Codes */
			        condition = data.weather[0].id;
			        weatherData = data;
			        
			        if (location.search.indexOf('rain') > -1)
			        	condition = 300;

			        if (location.search.indexOf('cloudy') > -1)
			        	condition = 803;

			        if (location.search.indexOf('lightning') > -1)
			        	condition = 200;

			        if (condition >= 801 && condition <= 804) {
			        	//cloudy
			        	cloudFactory({
			        		animate: true,
			        		amount: condition - 800
			        	});
			        	
			        } else if ((condition >= 300 && condition <= 321) || (condition >= 500 && condition <= 522)) {
			        	//drizzle/rain
			        	cloudFactory({
			        		animate: false,
			        		amount: 4
			        	});

			        	//this attempts to normalise the condition so if it's
			        	//in the 300 range then 300 - 299 = 1 * 100 = 100
			        	//in the 500 range then 500 - 499 = 1 * 100 = 100
			        	var modifier = condition < 400 ? 299 : 499; 

			        	rainFactory({
			        		amount: Math.abs((condition - modifier) * 100)
			        	});
			        	
			        } else if (condition >= 200 && condition <= 232) {
			        	//thunder
			        	var int = (condition - 199 + 10) * 1000;
			        	
			        	setInterval(function() {
			        		var lightning = document.createElement('div');
			        		lightning.className = 'lightning';
			        		document.getElementById('back').appendChild(lightning);
			        		$(lightning).fadeOut(200, function () {
			        			$(lightning).remove();
			        			//clearInterval(int);
			        		});
			        	}, int);
			        	
			        	cloudFactory({
			        		amount: 4,
			        		heavy: true
			        	});

			        	if ((condition >= 200 && condition <= 202) || (condition >= 230 && condition <= 232)) {
			        		var modifier = condition < 220 ? 199 : 229; 

				        	rainFactory({
				        		amount: Math.abs((condition - modifier) * 100)
				        	});
			        	}
			        	console.log(int);
			        } else {
			        	//clear
			        }
			    },
			    error : function(errorData) {
					console.log('could not get weather data');
			    }
			});
		};
		
		var set = function() {
			console.log(arguments);
		};
		
		return {
			get: get,
			set: set
		};
	})();

	weather.get();

	function menu(){
		nav = document.getElementsByTagName('nav')[0];
		menuOptions = nav.getElementsByTagName('li');
		articles = document.getElementById('information').getElementsByTagName('article');

		for(var z = 0; z < menuOptions.length; z += 1){

			(function(z){
				menuOptions[z].addEventListener('click', function(){
					// alert(z);
					for(var za = 0; za < menuOptions.length; za += 1){
						menuOptions[za].setAttribute('class', '');
						articles[za].setAttribute('class', '');
					}

					menuOptions[z].setAttribute('class', 'active');
					articles[z].setAttribute('class', 'active');

				}, false);
			})(z);
		}
	}

	function init(){
		checkToday();
		menu();
	}

	return {
		init: init,
		weather: weather
	};

})();

(function(){
	bwMeet.init();
})();