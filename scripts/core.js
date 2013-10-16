<<<<<<< HEAD
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

	function initThermonuclearFusion () {
		var sun = document.getElementsByClassName('sun')[0].cloneNode(true);
		var back = document.getElementById('back');
		sun.classList.remove('hide');

		back.insertBefore(sun, document.getElementsByClassName('clouds')[0]);
	}

	function checkToday(time){

		var hour = new Date().getHours(),
			check;

		var findGrade = function(sunrise, sunset) {
			
			if (hour >= sunset + 2 || hour <= sunrise - 2) {
				//console.log("Nighttime");
				check = timeGrades.night;
			} else if (hour >= sunrise - 1 && hour <= sunrise + 1){
				//console.log("Dawn");
				check = timeGrades.dawn;
			} else if (hour >= sunset - 1 && hour <= sunset + 1){
				//console.log("Dusk");
				check = timeGrades.dusk;
			} else if (hour >= sunrise + 2 || hour <= sunset - 2){
				//console.log("Day");
				check = timeGrades.day;
				initThermonuclearFusion();
			} 

			if (check !== currentGrade){
				transitionGrade(currentGrade, check);
				currentGrade = check;
			}
		};

		$.ajax({
		    type: 'POST',
		    dataType: 'jsonp',
		    url: 'http://api.openweathermap.org/data/2.5/weather?q=Bournemouth,uk&callback=?',
		    success: function(data) {
		    	var condition = data.weather[0].id;
		    	if ((condition >= 300 && condition <= 321) || (condition >= 500 && condition <= 522)) {
		        	timeGrades = {
						day : {
							r : 170,
							g : 179,
							b : 191,
							cssClass : "day"
						}
					};
				}

		    	var sunrise = new Date(data.sys.sunrise * 1000).getHours();
		    	var sunset = new Date(data.sys.sunset * 1000).getHours();

				findGrade(sunrise, sunset);
			},
			error: function(data) {
		    	var sunrise = 7;
		    	var sunset = 19;

				findGrade(sunrise, sunset);
			}
		});
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

		//cloud is 882px

		var cloudFactory = function (options) {
			var clouds = document.getElementsByClassName('clouds')[0];

			var frameWidth = document.getElementById('frame').clientWidth;

			//console.log(882 / frameWidth * 100) // = 1 clouds percentage coverage

			var from = weatherData.wind.deg > 180 ? -frameWidth : frameWidth, 
				to = weatherData.wind.deg > 180 ? frameWidth : -frameWidth;

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
				
				if (options.animate /* && options.comeFromRight */ ) {
					cloud.style.left = from + 'px';
				}
				
	    		if (i >= 3 || options.heavy) {
	    			if (clouds.className.indexOf('heavy-cloud') === -1)
	    				clouds.className += ' heavy-cloud';
	    		}

	    		//speed returned in metres per second, lets say 0.5 px = 1 metre so
	    		var distance = $(cloud).offset().left;
	    		var time = Math.abs(distance / weatherData.wind.speed * 500);

				if (options.animate) {
		    		$(cloud).animate({left: to + 'px'}, time, 'linear', function() {
		    		    $(this).remove();
		    		});
	    		}
	    	}
	    	
	    	if (options.animate) {
		    	var distance = $('.cloud:first-of-type').offset().left,
	    			time = Math.abs((distance / weatherData.wind.speed * 500) / 2),
		    		timeout = time + getRandomInt(1000, 10000);

		    	setTimeout(function() {
		    		cloudFactory({
			    		animate: true,
			    		comeFromRight: true,
			    		amount: options.amount
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

			        if (location.search.indexOf('cloud') > -1)
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
			        	timeGrades = {
							day : {
								r : 170,
								g : 179,
								b : 191,
								cssClass : "day"
							}
						};

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
			        	var interval = (condition - 199 + 10) * 1000;
			        	
			        	setInterval(function() {
			        		var lightning = document.createElement('div');
			        		lightning.className = 'lightning';
			        		document.getElementById('back').appendChild(lightning);
			        		$(lightning).fadeOut(200, function () {
			        			$(lightning).remove();
			        		});
			        	}, interval);
			        	
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
			        } else {
			        	//clear
			        }
			    },
			    error : function(errorData) {
					console.log('could not get weather data');
			    }
			});
		};
				
		return {
			get: get
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
=======
var __bwMeet13 = (function(){

	'use strict';

	var WebGL = {
		scene : undefined,
		camera : undefined,
		lights : [],
		renderer : undefined,
		context : undefined
	},
	frame = document.getElementById('frame'),
	objects = [],
	spaceDown = false,
	audio = {
		context : undefined,
		source : undefined,
		analyser : undefined,
		sourceNode : undefined
	},
	cubeLimiter = 88;

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; 
		window.requestAnimationFrame = requestAnimationFrame;

	function handleAudio(data){

		var otherAuds = document.getElementsByTagName('audio');

		for(var aj = 0; aj < otherAuds.length; aj += 1){
			otherAuds[aj].parentElement.removeChild(otherAuds[aj]);
		}

		var buff = new Uint8Array(data.target.result);
		var blob = new Blob([buff], {type: 'audio/mpeg'});

		var aud = new Audio();
		aud.setAttribute('type', 'audio/mpeg');
		aud.src = URL.createObjectURL(blob);
		aud.load();
		document.body.appendChild(aud);

		aud.addEventListener('canplaythrough', function(){
			
			audio.context = new AudioContext() || new webkitAudioContext();
			audio.analyser = audio.context.createAnalyser();
			audio.sourceNode = audio.context.createMediaElementSource(aud);
			audio.sourceNode.connect(audio.analyser);
			audio.sourceNode.connect(audio.context.destination);

			console.log(aud);
			
			(function(){
				setTimeout(function(){
					aud.play();
				}, 1000);
			})();

			document.getElementById('tint').setAttribute('class', 'fadeOut');
		}, true);


		aud.addEventListener('ended', function(){
			aud.parentElement.removeChild(aud);
			document.getElementById('tint').setAttribute('class', 'fadeIn');
		})

	}

	function loadFile(e){
		var file = e.dataTransfer.files[0];

		var reader = new FileReader();

		reader.onload = handleAudio;

		reader.readAsArrayBuffer(file);
	}

	function drawScene(){

		var xx = 0;

		while(xx < objects.length){
		
			if(xx % 2 === 0){
				objects[xx].rotation.x += objects[xx].custom.spin.x;
				objects[xx].rotation.y += objects[xx].custom.spin.y;
				objects[xx].rotation.z += objects[xx].custom.spin.z;

			} else {
				objects[xx].rotation.x -= objects[xx].custom.spin.x;
				objects[xx].rotation.y -= objects[xx].custom.spin.y;
				objects[xx].rotation.z -= objects[xx].custom.spin.z;

				if(spaceDown){
					objects[xx].material.color.setHex(objects[xx].custom.color);
					objects[xx].scale.x = objects[xx].scale.y = objects[xx].scale.z = 2;
				} else {
					//objects[xx].material.color.setHex(0x000000);
				}

			}

			// objects[xx].scale.x = objects[xx].scale.y = objects[xx].scale.z = Math.random() * 2;

			xx += 1;

		}

		if(audio.analyser !== undefined && audio.analyser.frequencyBinCount !== undefined){

			var arr = new Uint8Array(audio.analyser.frequencyBinCount);
				audio.analyser.getByteFrequencyData(arr);
				
			var xw = 0;

			while(xw < arr.length){

				//var cube = objects[Math.floor((Math.floor((88 / arr.length) * 100) / 88) * 100)];

				Math.round((1024 / 1024) * 100) / 100 * 88

				var cube = objects[Math.floor((((xw / arr.length) * 100) / 100) * cubeLimiter)];

				// if(cube !== undefined){
					cube.scale.x = cube.scale.y = cube.scale.z = 1 + (arr[xw] / 100);
					
					if(cube.scale.x > 1){
						cube.material.color.setHex(cube.custom.color);
					}

					if(cube.material.color.r > 0){
						cube.material.color.r -= 0.1;
					}

					if(cube.material.color.g > 0){
						cube.material.color.g -= 0.1;
					}

					if(cube.material.color.b > 0){
						cube.material.color.b -= 0.1;
					}

					if(cube.scale.x > 1){
						cube.scale.x = cube.scale.y = cube.scale.z -= 0.1;
					}
				// }

				xw += 1;

			}

		}

		WebGL.renderer.render(WebGL.scene, WebGL.camera);

		requestAnimationFrame(drawScene);
	}
	
	function buildScene(){

		var Max = cubeLimiter;

		for(var x = 0; x < Max; x += 1){

			var nObj = shapes.cube(5 ,5, 5, 0xFF00FF);
				nObj.custom = {};
				nObj.position.set(x - Math.random() * Max, x - Math.random() * Max, x - Math.random() * Max);

				if(x % 3 === 0){
					nObj.custom.color = 0xFF0000;
				} else if(x % 3 === 1){
					nObj.custom.color = 0x0000FF;
				} else {
					nObj.custom.color = 0xFFFF00;
				}

			nObj.material.color.setHex(0x000000);
			nObj.material.needsUpdate = true;
			nObj.geometry.verticesNeedUpdate = true;
			nObj.custom.spin = {x : Math.random() / 100, y : Math.random() / 100, z : Math.random() / 100}

			objects.push(nObj);
				
			WebGL.scene.add(objects[x]);

		}

		drawScene();

	}

	function addEvents(){

		frame.addEventListener('dragover', function(e){
			e.stopPropagation();
			e.preventDefault();
			console.log("Drag");
		}, true);

		frame.addEventListener('drop', function(e){
			e.stopPropagation();
			e.preventDefault();
			console.log(e);
			loadFile(e);
		}, true);

		document.addEventListener('keydown', function(e){
			if(e.keyCode == 32){
				e.preventDefault();
				spaceDown = true;
			}
		}, false);

		document.addEventListener('keyup', function(e){
			if(e.keyCode == 32){
				e.preventDefault();
				spaceDown = false;
			}
		}, false);
	

	}

	function init(){

		window.AudioContext = window.AudioContext || window.webkitAudioContext;

		console.log(audio.context);
		
		WebGL.camera = new THREE.PerspectiveCamera(75, frame.offsetWidth / frame.offsetHeight, 1, 500);
		WebGL.camera.position.z = 100;
		WebGL.scene = new THREE.Scene();

		WebGL.lights.push(new THREE.DirectionalLight(0xffffff, 1));
		WebGL.lights[0].position.set(0, 20,50);
		WebGL.scene.add(WebGL.lights[0])

		WebGL.renderer = new THREE.WebGLRenderer({antialias :  true,  preserveDrawingBuffer: true});
		WebGL.renderer.setSize(frame.offsetWidth, frame.offsetHeight);
		WebGL.renderer.setClearColor(0xFFFFFF, 1);

		WebGL.renderer.domElement.setAttribute('id', 'WebGL');

		frame.appendChild(WebGL.renderer.domElement);

		addEvents();

		buildScene();

	}

	return {
		init : init,
		objects : objects
	};
})();

(function(){
	__bwMeet13.init();
})();

function sections(number){

	/*var range = 88,
		sections = 88,
		setSize = range / sections,
		answer = Math.ceil(number / setSize);*/
	
	return answer;	

}
>>>>>>> 13/master
