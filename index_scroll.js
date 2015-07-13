var user_category_scroll = false;
var is_user_scroll = false;
var is_cat_scroll = false;
window.onscroll = function(){

	filter_obj = document.getElementById("left_bottom");
	display_t_obj = document.getElementById("display_messaget");
	if(filter_offset == 0)
	 {
		filter_offset = get_top_offset(filter_obj) - 50; // - 50 because the top bar is now fixed, which has a height of 50px
	 }
	if(messaget_offset == 0 && display_t_obj.style.display == "block")
	 {
		messaget_offset = get_top_offset(display_t_obj) - 50;  // 50px is height of top_bar
	 }

	current_scroll = window.pageYOffset || document.documentElement.scrollTop;

	body = document.body;
	html = document.documentElement;

	full_height = Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);
	screen_height = Math.min(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);

	height_below = (full_height - (current_scroll+screen_height));
	if(height_below < 400 && !is_loading_p)
	 {
	//document.getElementById("test_results").innerHTML += "here<br />"; // for testing
		update_filter(true);
		is_loading_p = true;
	 }

	if(current_scroll > filter_offset)
	 {
		filter_obj.style.position = "fixed";
		filter_obj.style.top = "50px";
	 } else {
		filter_obj.getAttribute("style");
		filter_obj.removeAttribute("style");
	 }
//alert((get_top_offset(filter_obj) - 50));

	if(current_scroll < filter_offset && messaget_offset != 0 && display_t_obj.style.display != "block")
	 {
		filter_offset = get_top_offset(filter_obj) - 50;
	 }

	if((current_scroll + 10) > messaget_offset && display_t_obj.style.display == "block") // +10 because we give it a 10 px distance from the top
	 {
		display_t_obj.style.position = "fixed";
		display_t_obj.style.top = "55px";   // add 50px for height of top_bar
		display_t_obj.style.marginTop = "5px";
		document.getElementById("display_messaget_filler").style.display = "block";
	 } else {
		//filter_obj.style.getAttribute("style");
		display_t_obj.style.position = "relative";
		display_t_obj.style.top = "";
		display_t_obj.style.marginTop = "0px";
		document.getElementById("display_messaget_filler").style.display = "none";
		//display_t_obj.removeAttribute("style");
	 }

	hide_reply_len = hide_reply.length;
	if(hide_reply_len > 0)
	 {
		for(var hr=0;hr<hide_reply_len;hr++)
		 {
			open_rp_obj = document.getElementById(hide_reply[hr][0]);
			open_rp_obj2 = document.getElementById(hide_reply[hr][1]);
			rp_top_off = get_top_offset(open_rp_obj)-50;  // 50px is height of top_bar
			rp_ht = open_rp_obj.offsetHeight;
			rp_wt = get_left_offset(open_rp_obj)+open_rp_obj.offsetWidth - 20;

			if(current_scroll > rp_top_off && current_scroll < (rp_top_off+rp_ht))
			 {
				open_rp_obj2.style.left = rp_wt+"px";
				open_rp_obj2.style.top = "50px";  // 50px is height of top_bar
				open_rp_obj2.style.right = "auto";
				open_rp_obj2.style.position = "fixed";
			 } else {
				open_rp_obj2.style.left = "auto";
				open_rp_obj2.style.top = "0px";
				open_rp_obj2.style.right = "0px";
				open_rp_obj2.style.position = "absolute";
				//open_rp_obj2.removeAttribute("style");
			 }
		 }
	 }
}