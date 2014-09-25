(function() {

	$.ajax("json/personal.json", {
		type: "GET",
		dataType: 'json',
		success: function(my, textStatus, jqXHR) {
			$("#myName span.text").text(my.name);
			$("#myPosition span.text").text(my.position);
			if (my.phone) {
				$("#myPhone span.text").text(my.phone);
			}
			
			if (my.email) {
				$("#myEmail a").attr("href", "mailto:" + my.email);
				$("#myEmail span.text").text(my.email);	
			}
			
			$("#myHome span.text").text(my.location);


			if (my.linkedin) {
				$("#myLinkedin a").attr("href", my.linkedin);
			}
		}
	});
	
	$.ajax("json/experiences.json", {
		type: "GET",
		dataType: 'json',
		success: function(experiences, textStatus, jqXHR) {
			var $timeline = $("#experience-timeline");
			var source = $("#experienceTemplate").text();
			var template = _.template(source);

			$("canvas.company-logo").livequery(
				// created
				function() {
					if (this.dataset.url) {
						var canvas = this;
						var logo = new Image(); 
						logo.src = this.dataset.url;
						logo.onload = function() {
							var context = canvas.getContext('2d');
							var scale = 32;
							var height = scale;
							var width = Math.round(( scale / logo.height ) * logo.width);

							canvas.width = width;
							canvas.height = height;
							context.drawImage(logo, 0, 0, width, height);

							var imageData = context.getImageData(0, 0, width, height);
	        		var data = imageData.data;

        			// sample found online for converting to grayscale
	        		for(var i = 0; i < data.length; i += 4) {
			          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
			          // red
			          data[i] = brightness;
			          // green
			          data[i + 1] = brightness;
			          // blue
			          data[i + 2] = brightness;
			        }

			        context.putImageData(imageData, 0, 0);
						};
					}
				}, 
				// destroyed
				function() {
					
				}
			);

			_.each(experiences, function(experience, name) {
				experience.name = name;
				
				$timeline.append(template(experience));
				
			});

		}
	});

	$.ajax("json/skills.json", {
		type: "GET",
		dataType: 'json',
		success: function(skills, textStatus, jqXHR) {
			var $skills = $("#skill-graph ul.skills");
			source = $("#skillTemplate").text();
			template = _.template(source);

			var i = 0;
			_.each(skills, function(skill, name) {
				skill.name = name;
				$skills.append(template(skill));
			});
		}
	});

}());