var ck_theme = 	{ // the theme, which will have much more added in the future
	data : {
		placeholder : true,
		placeholderValue : "Leave a comment...",
		maxLength : 1000,
		reply_visible : false //  should the div holding comments from others be visible
		},
	style : {
		comment_background : "transparent",
		comment_border : "1px #DDD solid",
		comment_background : ""
		
		}
	};


var ck_plugin = (function(theme_obj) { // the plugin

	var max_length = theme_obj.data.maxLength || -1; // if theme_obj.data.maxLength exists, use that value, otherwise use -1

	var ck_obj = document.getElementById("ck-comments");	// the "ck-comments" element will be used to add all the other elements

	(function main()
	{
	if(ck_obj)	// if the element wit id "ck-comments" exists, add the following to it
	 {
		var ck_edit = document.createElement("div");
			ck_edit.id = "ck-edit";
			ck_edit.className = "ck-edit";
			ck_edit.setAttribute("contenteditable","true");
			ck_obj.appendChild(ck_edit);

		if(theme_obj.data.placeholder)
		 {
			var ck_placeholder = document.createElement("span");
				ck_placeholder.id = "ck-placeholder";
				ck_placeholder.className = "ck-placeholder";
				ck_placeholder.innerHTML = theme_obj.data.placeholderValue;
				ck_obj.appendChild(ck_placeholder);
			ck_edit.onkeydown = function() {ck_placeholder.style.display = "none";};
		 }

		var ck_controls = document.createElement("div");
			ck_controls.className = "ck-controls";
			ck_obj.appendChild(ck_controls);

		var ck_max_char = document.createElement("a");
			ck_max_char.id = "ck-max-char";
			ck_max_char.className = "ck-max-char";
			ck_max_char.innerHTML = max_length > 1 ? max_length : ""; // if max length is greater than 1, put that value in this link
			ck_controls.appendChild(ck_max_char);

		var ck_post_btn = document.createElement("a");
			ck_post_btn.id = "ck-post-btn";
			ck_post_btn.className = "ck-post-btn";
			ck_post_btn.innerHTML = "Post";
			ck_controls.appendChild(ck_post_btn);

		var ck_clear_fix = document.createElement("div");
			ck_clear_fix.className = "ck-clear-fix";
			ck_controls.appendChild(ck_clear_fix);

		var ck_replies = document.createElement("div");
			ck_replies.className = "ck-reply-outer";
			ck_replies.id = "ck-reply-outer";
			if(theme_obj.data.reply_visible === false)
			 {
				ck_replies.style.display = "none";
			 }
			ck_replies.innerHTML = "This is in development.  More features will be available in the coming weeks.";
			ck_obj.appendChild(ck_replies);

		//  ** much more will be added here
	 }
	})();



	// The return statement below gives the user access to functions to modify this object

	return {
	commentFocus : function(inputFunction) {
	// set what happens when the comment box is focused

			document.getElementById("ck-edit").onfocus = inputFunction;
			},
	commentBlur : function(inputFunction) {
	// set what happens when the comment box is blurred

			document.getElementById("ck-edit").onblur = inputFunction;
			},
	setStyle : function(id,attribute,value) {
	// set the style of any element (meant for comment king elements)

			var styleObj = document.getElementById(id);
			if(styleObj)
			 {
				styleObj.style[attribute] = value;
			 }
			}

	// ** More features will be added here
	};

	})(ck_theme); // call the anonymous function, and receive the theme as an argument



var custom_modify_ck = { // this will be used to change what happens on different events taken on the comment box
		ck_focus : function() {
		document.getElementById("ck-edit").parentNode.parentNode.style.backgroundColor = "#D5D"; // turn the background in the example purple
		document.getElementById("example-title").style.color = "#fff";	// change the title white
		document.getElementById("example-title").style.borderColor = "#fff"; // change the border color of the title to white
		document.getElementById("ck-post-btn").style.color = "#fff"; // the text color of the "Post" button to white
		document.getElementById("ck-post-btn").style.borderColor = "#faf"; // the border color of the "Post" button to light purple
		document.getElementById("ck-max-char").style.color = "#FCF";
		document.getElementById("ck-reply-outer").style.display = "block";
		ck_plugin.setStyle("ck-edit","borderColor","#FAF");
		}// ,
/*		ck_blur : function() {
		document.getElementById("ck-edit").parentNode.parentNode.style.backgroundColor = "#FFF";
		document.getElementById("ck-post-btn").getAttribute("style");
		document.getElementById("ck-post-btn").removeAttribute("style");
		document.getElementById("example-title").getAttribute("style");
		document.getElementById("example-title").removeAttribute("style");
		}

*/
	};

ck_plugin.commentFocus(custom_modify_ck.ck_focus);


//ck_plugin.commentBlur(custom_modify_ck.ck_blur);  // taken out for now





$(document).ready(function(){ // jQuery will be added for display effects on our own website

  //  $("#comment-top").animate({'background-position':'0 -12250px'},'slow');
	$({temporary_x: 0, temporary_y: 0}).animate({temporary_x: 0, temporary_y: 3000}, {
		duration: 120000,
		step: function() {
		var position = Math.round(this.temporary_x) + "px " + Math.round(this.temporary_y) + "px";
		$("#comment-top").css("background-position",  position);
		},
		easing:'linear'
	});
});