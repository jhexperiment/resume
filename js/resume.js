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