var hide_id="";
function filter_input_focus(obj)
{
hide_id = obj.id.split("_");
document.getElementById("f_1_"+hide_id[2]).style.display = "none";
document.getElementById("f_2_"+hide_id[2]).style.display = "none";
document.getElementById("f_3_"+hide_id[2]).style.width = "227px";
document.getElementById("f_3_"+hide_id[2]).style.margin = "0px";
document.getElementById("f_4_"+hide_id[2]).innerHTML = document.getElementById("f_4_"+hide_id[2]).getAttribute("data-ltext");
document.getElementById("f_4_"+hide_id[2]).style.left = "6px";
}

function filter_input_blur(obj)
{
if(obj.value == "")
 {
	hide_id = obj.id.split("_");
	document.getElementById("f_1_"+hide_id[2]).style.display = "inline-block";
	document.getElementById("f_2_"+hide_id[2]).style.display = "inline-block";
		//document.getElementById("f_3_"+hide_id[2]).style.width = "90px";
		document.getElementById("f_3_"+hide_id[2]).getAttribute('style');
		document.getElementById("f_3_"+hide_id[2]).removeAttribute('style');
	document.getElementById("f_4_"+hide_id[2]).setAttribute("class", "placeholder no_user_select");
	document.getElementById("f_4_"+hide_id[2]).className = "placeholder no_user_select"; // IE7..
	document.getElementById("f_4_"+hide_id[2]).innerHTML = document.getElementById("f_4_"+hide_id[2]).getAttribute("data-ltext").substr(0,10)+"...";
	document.getElementById("f_4_"+hide_id[2]).style.left = "10px";
 }
}

var rep_acc_hiding = false; // are we currently trying to hide rep_accolades
var rep_acc_hidden = false;
var rep_previously_loaded = false; // to keep track of whether or not we have already loaded the data
var rep_acc_left = 0; // how far currently it has been moved from original position
var rep_acc_dec = -12; // how much it will increase/decrease by
var rep_acc_to = -245; // the value we are going to get to (negative of this)
var rep_acc_to5 = Math.abs(rep_acc_to/4); // this is used to make slider slow toward end
var rep_acc_default_ht = 0;
function move_rep_slider_left()
{
	if(!rep_acc_hidden)
	 {
		if(!rep_acc_hiding)
		 {
			if(!shown_acc_list)
			 {
				load_rep_accolades();
			 }

			rep_acc_hiding = true;

			if(!rep_previously_loaded)
			 {
				document.getElementById("rep_acc_loader").className = "rep_acc_loader";
			 }
			document.getElementById("rep_accolades_holder").className = "rep_accolades_holder rep_accolades_holder2";

			rep_acc_default_ht = document.getElementById("rep_accolades_default").offsetHeight;//rep_accolades_default

			if(rep_acc_default_ht > rep_acc_top)
			 {
				rep_acc_top = rep_acc_default_ht;
				document.getElementById("rep_accolades_mover2").style.height = rep_acc_top+"px";
			 }
		 }
//document.getElementById("test_results").innerHTML += Math.ceil(rep_acc_dec * Math.abs((Math.abs(rep_acc_to) - Math.abs(rep_acc_left)+rep_acc_to5)/rep_acc_to))+"::";

		// this below gives the effect of slowing down as it reaches the edge
		rep_acc_left+=Math.ceil(rep_acc_dec * Math.abs((Math.abs(rep_acc_to) - Math.abs(rep_acc_left)+rep_acc_to5)/rep_acc_to));

//document.getElementById("test_results").innerHTML += rep_acc_left+"<br />";
		if(rep_acc_left > rep_acc_to)
		 {
			document.getElementById("rep_accolades_in_holder").style.left = rep_acc_left+"px";
			var t_move_s = setTimeout(function(){move_rep_slider_left();},7);
	 	 } else {
			document.getElementById("rep_accolades_in_holder").style.left = rep_acc_to+"px";
			rep_acc_left = rep_acc_to;
			rep_acc_hidden = true;
			rep_acc_hiding = false;

			if(r_slide_down) // if has already finished loading from server, call it after div has slid all the way left
			 {
				rep_acc_expand();
			 } else {
				r_slide_down = true;
			 }
		 }
	 }
}

function move_rep_slider_right()
{
	if(rep_acc_hidden)
	 {
		if(!rep_acc_hiding)
		 {
			rep_acc_hiding = true;
			document.getElementById("rep_accolades_holder").className = "rep_accolades_holder";
		 }

		rep_acc_left-=Math.ceil(rep_acc_dec * Math.abs((Math.abs(rep_acc_left)+rep_acc_to5)/rep_acc_to));

		if(rep_acc_left < 0)
		 {
			document.getElementById("rep_accolades_in_holder").style.left = rep_acc_left+"px";
			var t_move_s = setTimeout(function(){move_rep_slider_right();},7);
	 	 } else {
			document.getElementById("rep_accolades_in_holder").style.left = "0px";
			rep_acc_left = 0;
			rep_acc_hidden = false;
			rep_acc_hiding = false;
		 }
	 }
}

var rep_acc_is_expanded = false;
var rep_acc_top = 48; // the default height of rep_acc_loader
var rep_acc_inc = 6; // how much it will increase/decrease by
var rep_acc_to2 = 100; // the value we are going to get to
var rep_acc_to25 = rep_acc_to2/4;
function rep_acc_expand()
{
	if(!rep_acc_is_expanded)
	 {
		if(rep_acc_top < rep_acc_to2)
		 {
			rep_acc_top+=Math.ceil(rep_acc_inc * Math.abs(rep_acc_to2 - rep_acc_top + rep_acc_to25)/rep_acc_to2);

			document.getElementById("rep_accolades_mover2").style.height = rep_acc_top+"px";
			var t_move_s2 = setTimeout(function(){rep_acc_expand();},10);
	 	 } else {
			document.getElementById("rep_accolades_mover2").style.height = rep_acc_to2+"px";
			rep_acc_top = rep_acc_to2;
			rep_acc_is_expanded = true;
		 }
	 }
}

function rep_acc_collapse()
{
	if(rep_acc_is_expanded)
	 {
		if(rep_acc_top > rep_acc_default_ht)
		 {
			rep_acc_top-=Math.ceil(rep_acc_inc * Math.abs(rep_acc_top + rep_acc_to25)/rep_acc_to2);

			document.getElementById("rep_accolades_mover2").style.height = rep_acc_top+"px";
			var t_move_s2 = setTimeout(function(){rep_acc_collapse();},10);
	 	 } else {
			document.getElementById("rep_accolades_mover2").style.height = rep_acc_default_ht+"px";
			rep_acc_top = rep_acc_default_ht;
			rep_acc_is_expanded = false;

			move_rep_slider_right();
		 }
	 }
}

var xml_http14;
// var rep_acc_loaded = 0;// how many have we loaded; currently disabled
function load_rep_accolades()
{
	xml_http14=get_xml_http_obj();
	if(xml_http14==null)
	 {
		return;
	 }

	//document.getElementById("test_results").innerHTML += "posts_shown:"+(posts_shown)+"::posts_to_load:"+(posts_to_load)+"<br />"; // for testing
	//document.getElementById("test_results").innerHTML += "cat:"+(id_category_show)+"<br />"; // for testing

//document.getElementById("test_results").innerHTML += loaded_p_shown[loaded_p_string]+"<br />"; // for testing

//		document.getElementById("test_results").innerHTML += 'loaded_p_string:'+loaded_p_string+'<br />'; // for testing
	url='load_accolades.php';
	xml_http14.onreadystatechange=r_state_changed14;
	xml_http14.open('POST',url,true);
	xml_http14.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http14.send('account_id='+((user_accountid==0)?R5_accountid:user_accountid));
}


var r_slide_down = false;
var new_list_array;
var new_list_array_hold;
var r_holding_list = false; // are there values in new_list_array_hold?  (aka the original list was too long so we didn't show it all)
var t_rep_total;
function r_state_changed14()
{
if(xml_http14.readyState==4 || xml_http14.readyState=='complete')
 {
	R5_rec=xml_http14.responseText;
	new_list_array = clean_array(R5_rec.split("*"));
//document.getElementById("test_results").innerHTML += R5_rec+"<br />"; // for testing
	if(R5_rec != "error" && R5_rec != "")
	 {
		document.getElementById("rep_acc_loader").style.background="none";
		var ws,w_s_l;
		var rep_splice_length = 5; // the amount of websites shown before stopping and displaying "+ Show More" link

		if(new_list_array.length > rep_splice_length)
		 {
			new_list_array_hold = new_list_array.splice(rep_splice_length,(new_list_array.length-rep_splice_length));
			r_holding_list = true;
		 }

		add_acc_list("Website","","","","",""); // show the title row
		for (ws in new_list_array)
		 {
			w_s_l = new_list_array[ws].split(",");

			var t_pos_rep,t_neg_rep,t_percent;

			if(w_s_l[0] == "repfive")
			 {
				t_pos_rep = parseInt(w_s_l[1]) - parseInt(w_s_l[3]);
				t_neg_rep = parseInt(w_s_l[2]) - parseInt(w_s_l[4]);

				t_rep_total = parseInt(w_s_l[1]) - parseInt(w_s_l[2]); // the total reputation for this user
				t_percent = Math.round(((t_pos_rep - t_neg_rep) / t_rep_total)*1000)/10;
				add_acc_list("RepFive","thumb_repfive.png",t_percent,t_pos_rep,t_neg_rep,"");
			 } else
			if(w_s_l[0] == "other")
			 {
				t_percent = Math.round(((parseInt(w_s_l[1]) - parseInt(w_s_l[2])) / t_rep_total)*1000)/10;
				add_acc_list("Other","",t_percent,parseInt(w_s_l[1]),parseInt(w_s_l[2]),"");
			 } else {
				t_percent = Math.round(((w_s_l[3] - w_s_l[4]) / t_rep_total)*1000)/10;
//document.getElementById("test_results").innerHTML += w_s_l[0]+":"+w_s_l[2]+":"+t_percent+":"+w_s_l[3]+":"+w_s_l[4]+"<br />"; // for testing
				add_acc_list(w_s_l[0],w_s_l[2],t_percent,w_s_l[3],w_s_l[4],w_s_l[1]);
			 }
		 }

		add_acc_list_bottom(r_holding_list);

		rep_acc_to2 = document.getElementById("rep_acc_loader").scrollHeight; // set the height div will expand to
		if(rep_acc_hidden) // if div has already moved all the way left, expand now; otherwise it will be done by another function
		 {
			rep_acc_expand();
		 } else {
			r_slide_down = true;
		 }

		shown_acc_list = true;
	 }
 }
}

var shown_acc_list = false;
var count_acc_loaded = 0;
var acc_is_title = false;
function add_acc_list(t_r_web,t_r_image,t_percent_add,t_pos_rep_add,t_neg_rep_add,t_username)
{
	acc_is_title = (t_r_web.toLowerCase() == "website");
	var acc_is_other = (t_r_web.toLowerCase() == "other");
	var rep_loader = document.getElementById("rep_acc_loader");
	var t_total,rep_table,rep_rowx,rep_col1,rep_col2,rep_col_inner2,rep_image,rep_col3,rep_col4;

	if(!acc_is_title)
	 {
		t_total = (t_pos_rep_add-t_neg_rep_add);
	 }

	if(count_acc_loaded == 0)
	 {
		rep_table = document.createElement("table");
			rep_table.className="acc_loader_table";
			rep_table.id="acc_loader_table";
			rep_loader.appendChild(rep_table);
	 } else {
		rep_table = document.getElementById("acc_loader_table");
	 }

	rep_rowx = document.createElement("tr");
		rep_rowx.className="acc_loader_tr"+((acc_is_title)?" acc_load_tr_title":((t_r_web.toLowerCase() == "repfive" || acc_is_other)?" acc_load_tr_repfive":""));
		if(!acc_is_title && t_r_web.toLowerCase() != "repfive" && !acc_is_other)
		 {
			rep_rowx.onclick = function(){ window.location=t_username;};
		 }
		rep_table.appendChild(rep_rowx);

	rep_col2 = document.createElement("td");
		rep_col2.className="acc_loader_td2";
		//rep_col2.style.background="url('"+t_r_image+"') no-repeat center";
		rep_rowx.appendChild(rep_col2);

	rep_col_inner2 = document.createElement("div");
		rep_col_inner2.className="acc_loader_td_inner2";
		//rep_col2.style.background="url('"+t_r_image+"') no-repeat center";
		rep_col2.appendChild(rep_col_inner2);

	if(!acc_is_title)
	 {
		rep_image = document.createElement("img");
			rep_image.src=t_r_image;
			rep_col_inner2.appendChild(rep_image);
	 }

	rep_col3 = document.createElement("td");
		rep_col3.className="acc_loader_td3";
		rep_col3.innerHTML = t_r_web;
		rep_rowx.appendChild(rep_col3);

		if(rep_col3.scrollWidth > rep_col3.offsetWidth)
		 {
			rep_col3.title = t_r_web;

			var rep_char_max = 25; // maximum number of characters we will start at
			var temp_chars_arr = t_r_web.split(".");
			temp_chars_arr[0] = (temp_chars_arr[0].length > rep_char_max)?temp_chars_arr[0].substring(0,(rep_char_max-1)):temp_chars_arr[0];
			var temp_char0_len = temp_chars_arr[0].length;
			for(var tt=temp_char0_len;tt > 5;tt--)
			 {
				rep_col3.innerHTML = temp_chars_arr[0] + "...";
				if(rep_col3.scrollWidth > rep_col3.offsetWidth)
				 {
					temp_chars_arr[0] = temp_chars_arr[0].substring(0,(tt-1));
				 } else {
					break;
				 }
			 }
		 }

	rep_col1 = document.createElement("td");
		rep_col1.className="acc_loader_td1"+((!acc_is_title)?((t_total > 0)?" acc_pos":((t_total < 0)?" acc_neg":" acc_neutral")):""); // green, red, or black/gray color
		rep_col1.id="acc_td1_"+count_acc_loaded;
		if(!acc_is_title)
		 {
			t_total = Math.abs(t_total);
			rep_col1.innerHTML = get_inner_vote(t_total);



			rep_col1.setAttribute("data-p_v",t_pos_rep_add);
			rep_col1.setAttribute("data-n_v",t_neg_rep_add);
			rep_col1.onmouseover = function(){info_message(this.id,1,8,("fontup:"+this.getAttribute("data-p_v")+":endfontfontdn:"+this.getAttribute("data-n_v")+":endfont"),0,"#fff","#000","#000",255);};
		 } else {
			rep_col1.innerHTML = "Rep";
			rep_col1.onmouseover = function(){info_message(this.id,2,8,("Reputation"),0,"#fff","#000","#000",255);};
		 }
		rep_rowx.appendChild(rep_col1);

	rep_col4 = document.createElement("td");
		rep_col4.className="acc_loader_td4";
		rep_col4.id="acc_loader_td4"+count_acc_loaded;
		rep_col4.innerHTML = ((!isNaN(t_percent_add))?t_percent_add:"0")+"%";
		if(acc_is_title)
		 {
			rep_col4.onmouseover = function(){info_message(this.id,2,8,("Percent of Total Reputation"),0,"#fff","#000","#000",255);};
		 }
		rep_rowx.appendChild(rep_col4);


/*
	rep_list1 = document.createElement("");
		rep_list1.className="acc_loader_li";
		rep_list1.innerHTML = (t_pos_rep_add-t_neg_rep_add)+" "+t_percent_add+"% "+t_r_web+" <span class='acc_pos'>"+t_pos_rep_add+"</span> <span class='acc_neg'>"+t_neg_rep_add+"</span>";

		rep_loader.appendChild(rep_list1);
*/
	count_acc_loaded++;
}

function add_acc_list_bottom(add_expander)
{
	var rep_loader = document.getElementById("rep_acc_loader");
	var link_back_div,link_back_a;

	if(add_expander) // should we add the link to show more websites user has earned reputation from
	 {
		var link_more_div,link_more_a;

		link_more_div = document.createElement("div");
			link_more_div.className = "link_more_div";
			link_more_div.id = "link_more_div";
			rep_loader.appendChild(link_more_div);

		link_more_a = document.createElement("a");
			link_more_a.className = "link_more_a link_more_border";
			link_more_a.innerHTML = "+ Show More";
			link_more_a.href = "javascript:void(0);";
			link_more_a.onclick = function() {add_acc_more();};
			link_more_div.appendChild(link_more_a);
	 }

	link_back_div = document.createElement("div");
		link_back_div.className = "link_more_div";
		rep_loader.appendChild(link_back_div);

	link_back_a = document.createElement("a");
		link_back_a.className = "link_more_a";
		link_back_a.innerHTML = "&laquo; Back";
		link_back_a.href = "javascript:void(0);";
		link_back_a.onclick = function() {rep_acc_collapse();};
		link_back_div.appendChild(link_back_a);
/*
	link_back_div = document.createElement("div");
		link_back_div.className = "link_back_div";
		rep_loader.appendChild(link_back_div);

	link_back_a = document.createElement("a");
		link_back_a.className = "link_back_a";
		link_back_a.href = "javascript:void(0);";
		link_back_a.onclick = function() {rep_acc_collapse();};
		link_back_div.appendChild(link_back_a);
*/
}

function add_acc_more()
{
	document.getElementById("link_more_div").style.display = "none";
	var ws,w_s_l;

	for (ws in new_list_array_hold)
	 {
		w_s_l = new_list_array_hold[ws].split(",");

		var t_pos_rep,t_neg_rep,t_percent;

		if(w_s_l[0] == "repfive")
		 {
			t_pos_rep = parseInt(w_s_l[1]) - parseInt(w_s_l[3]);
			t_neg_rep = parseInt(w_s_l[2]) - parseInt(w_s_l[4]);

			t_rep_total = parseInt(w_s_l[1]) - parseInt(w_s_l[2]); // the total reputation for this user
			t_percent = Math.round(((t_pos_rep - t_neg_rep) / t_rep_total)*1000)/10;
			add_acc_list("RepFive","thumb_repfive.png",t_percent,t_pos_rep,t_neg_rep,"");
		 } else
		if(w_s_l[0] == "other")
		 {
			t_percent = Math.round(((parseInt(w_s_l[1]) - parseInt(w_s_l[2])) / t_rep_total)*1000)/10;
			add_acc_list("Other","",t_percent,parseInt(w_s_l[1]),parseInt(w_s_l[2]),"");
		 } else {
			t_percent = Math.round(((w_s_l[3] - w_s_l[4]) / t_rep_total)*1000)/10;
//document.getElementById("test_results").innerHTML += w_s_l[0]+":"+w_s_l[2]+":"+t_percent+":"+w_s_l[3]+":"+w_s_l[4]+"<br />"; // for testing
			add_acc_list(w_s_l[0],w_s_l[2],t_percent,w_s_l[3],w_s_l[4],w_s_l[1]);
		 }
	 }

	rep_acc_to2 = document.getElementById("rep_acc_loader").scrollHeight; // set the height div will expand to

	rep_acc_is_expanded = false;
	rep_acc_expand();
}

var number_of_items = 2; // ****** important when users searches filters *****  - changed from 3 to 2 with deletion following websites
var num_items_hidden = 0;
var show_only_set = false; // if show only is currently selected
var get_filter;
var all_hidden = new Array(false,false,false);
var fhs_update = false;
function filter_hide_show(obj,update_f)
{
	fhs_update = false;
	hide_id = obj.id.split("_");
	get_filter = document.getElementById("f_4_"+hide_id[2]).getAttribute("data-ltext").split(" ");

	if(document.getElementById("f_5_"+hide_id[2]).style.display!="none")
	 {
		fhs_update = true;
		num_items_hidden += 1;
		all_hidden[parseInt(hide_id[2])-1] = true;
		document.getElementById("f_3_"+hide_id[2]).value = "";
		search_filter(document.getElementById("f_3_"+hide_id[2]),"f_6_"+hide_id[2]);
		filter_input_blur(document.getElementById("f_3_"+hide_id[2]));
		show_placeh(document.getElementById("f_3_"+hide_id[2]));

		document.getElementById("filter_reset").style.display="block";
		document.getElementById("f_0_"+hide_id[2]).style.backgroundColor="#ccc";
		document.getElementById("f_1_"+hide_id[2]).style.background="url('sprite.png') no-repeat -116px -103px";
		document.getElementById("f_2_"+hide_id[2]).style.backgroundColor="#ccc";
		document.getElementById("f_2_"+hide_id[2]).style.borderColor="#ccc";
		document.getElementById("f_5_"+hide_id[2]).style.display="none";
		document.getElementById("f_1_"+hide_id[2]).onmouseover=function(){eval('info_message(this.id,1,8,"Show "+this.getAttribute("data-ltext")+" In Feed",0)');}



		fsearch_list[parseInt(hide_id[2])-1] = fsearch_listback[parseInt(hide_id[2])-1];
		filter_remove[parseInt(hide_id[2])-1].length = 0;
		filter_attach[parseInt(hide_id[2])-1].length = 0;
		f_search_current[parseInt(hide_id[2])-1].length = 0;
		f_search_count[parseInt(hide_id[2])-1] = 0;
		fhide_counter[parseInt(hide_id[2])-1] = 0;
		fshow_counter[parseInt(hide_id[2])-1] = 0;

		document.getElementById("f_3_"+hide_id[2]).value = "";
		filter_input_blur(document.getElementById("f_3_"+hide_id[2]));

		while(document.getElementById("f_7_"+hide_id[2]).firstChild)
		 {
			document.getElementById("f_7_"+hide_id[2]).removeChild(document.getElementById("f_7_"+hide_id[2]).firstChild);
		 }
			document.getElementById("f_7_"+hide_id[2]).style.display="none";

		while(document.getElementById("f_6_"+hide_id[2]).firstChild)
		 {
			document.getElementById("f_6_"+hide_id[2]).removeChild(document.getElementById("f_6_"+hide_id[2]).firstChild);
		 }
	        document.getElementById("f_6_"+hide_id[2]).style.display="none";


	 } else {
		//document.getElementById("f_0_"+hide_id[2]).style.backgroundColor="#f6f6f6";

		//document.getElementById("f_1_"+hide_id[2]).style.background="url('x.png') no-repeat center";

		num_items_hidden -= 1;
		all_hidden[parseInt(hide_id[2])-1] = false;
		if(num_items_hidden == 0 && (filter_attach[0].length == 0 && filter_attach[1].length == 0 && filter_attach[2].length == 0) && (filter_remove[0].length == 0 && filter_remove[1].length == 0 && filter_remove[2].length == 0)) { document.getElementById("filter_reset").style.display="none";}
		document.getElementById("f_1_"+hide_id[2]).onmouseover=function(){eval('info_message(this.id,1,8,"Hide "+this.getAttribute("data-ltext")+" From Feed",0)');}
		//document.getElementById("f_1_"+hide_id[2]).onmouseover=function(){info_message("f_1_"+hide_id[2],1,8,"Hide "+get_filter[1]+" From Feed",0);}
		document.getElementById("f_0_"+hide_id[2]).getAttribute('style');
		document.getElementById("f_1_"+hide_id[2]).getAttribute('style');
		document.getElementById("f_2_"+hide_id[2]).getAttribute('style');
		document.getElementById("f_5_"+hide_id[2]).getAttribute('style');

		document.getElementById("f_0_"+hide_id[2]).removeAttribute('style');
		document.getElementById("f_1_"+hide_id[2]).removeAttribute('style');
		document.getElementById("f_2_"+hide_id[2]).removeAttribute('style');
		document.getElementById("f_5_"+hide_id[2]).removeAttribute('style');
	 }

	if(update_f){update_filter(fhs_update);}

}

var hide_id2;
var get_filter2;
function filter_show_only(obj2)
{
	hide_id2 = obj2.id.split("_");
	get_filter2 = document.getElementById("f_4_"+hide_id2[2]).getAttribute("data-ltext").split(" ");

	if(document.getElementById("f_5_"+hide_id2[2]).style.display=="none")
	 {
		num_items_hidden -= 1;
		all_hidden[parseInt(hide_id2[2])-1] = false;
		if(num_items_hidden == 0) { document.getElementById("filter_reset").style.display="none";}
		document.getElementById("f_1_"+hide_id2[2]).onmouseover=function(){info_message("f_1_"+hide_id2[2],1,8,"Hide "+get_filter2[1]+" From Feed",0);}
		document.getElementById("f_0_"+hide_id2[2]).getAttribute('style');
		document.getElementById("f_1_"+hide_id2[2]).getAttribute('style');
		document.getElementById("f_2_"+hide_id2[2]).getAttribute('style');
		document.getElementById("f_5_"+hide_id2[2]).getAttribute('style');

		document.getElementById("f_0_"+hide_id2[2]).removeAttribute('style');
		document.getElementById("f_1_"+hide_id2[2]).removeAttribute('style');
		document.getElementById("f_2_"+hide_id2[2]).removeAttribute('style');
		document.getElementById("f_5_"+hide_id2[2]).removeAttribute('style');
	 }
	for(var i = 1;i<=number_of_items;i++)
	 {
		if(i != parseInt(hide_id2[2]))
		 {
			if(document.getElementById("f_5_"+i).style.display!="none")
			 {
				filter_hide_show(document.getElementById("f_5_"+i),false);
			 }
		 }
	 }
	update_filter(true);
}

function filter_reset()
{

	fsearch_list[0] = fsearch_listback[0];
	fsearch_list[1] = fsearch_listback[1];
	fsearch_list[2] = fsearch_listback[2];

	filter_remove[0].length = 0;
	filter_remove[1].length = 0;
	filter_remove[2].length = 0;

	filter_attach[0].length = 0;
	filter_attach[1].length = 0;
	filter_attach[2].length = 0;

	f_search_current[0].length = 0;
	f_search_current[1].length = 0;
	f_search_current[2].length = 0;

	f_search_count[0] = 0;
	f_search_count[1] = 0;
	f_search_count[2] = 0;

	fhide_counter[0] = 0;
	fhide_counter[1] = 0;
	fhide_counter[2] = 0;

	fshow_counter[0] = 0;
	fshow_counter[1] = 0;
	fshow_counter[2] = 0;

	for(var i = 1;i<=number_of_items;i++)
	 {
		document.getElementById("f_3_"+i).value = "";
		filter_input_blur(document.getElementById("f_3_"+i));

		if(document.getElementById("f_5_"+i).style.display=="none")
		 {
			filter_hide_show(document.getElementById("f_5_"+i),false);
		 }

		while(document.getElementById("f_7_"+i).firstChild)
		 {
			document.getElementById("f_7_"+i).removeChild(document.getElementById("f_7_"+i).firstChild);
		 }
		document.getElementById("f_7_"+i).style.display="none";

		while(document.getElementById("f_6_"+i).firstChild)
		 {
			document.getElementById("f_6_"+i).removeChild(document.getElementById("f_6_"+i).firstChild);
		 }
		document.getElementById("f_6_"+i).style.display="none";
	 }
	document.getElementById("filter_reset").style.display = "none";

	temp_rf_ht = 250;  // default height of refine
	update_filter(false);

	is_loading_p = false; // fixes bug where a filter would be applied and ALL of the filter's posts would be loaded, then filter removed, and no more posts would load for feed
}

function change_image()
{
	document.getElementById("R5_background").style.opacity=".9";
	document.getElementById("R5_background").style.filter="Alpha(opacity=90)";
	document.getElementById("R5_background").style.display="block";
	document.getElementById("change_image").style.display="block";
	document.getElementById("R5_background").onclick=function(){toggle_browse(true);};
}


var img_value;
function check_image(img_obj_end)
{
	img_value = document.getElementById("img_file"+img_obj_end).value;
	if(img_value != "" && img_value != null)
	 {
		document.getElementById("ch_img_submit"+img_obj_end).value = "Working...";
		document.getElementById("ch_img_submit"+img_obj_end).disabled = true;
		return true;
	 } else {
		return false;
	 }
}

var img_location = "";
function img_value_ch(newval)
{
img_location = (newval.indexOf("\\") >= 0)?newval.substr((newval.lastIndexOf("\\")+1)):((newval.indexOf("/") >= 0)?newval.substr((newval.lastIndexOf("/")+1)):((newval != "")?newval:"Maximum of 1MB"));

if(img_location.length > 26)
 {
	if(img_location.indexOf(" ") < 26)
	 {
		img_location = img_location.substr(0,26) + "<br />" + img_location.substr(26);
	 }
	document.getElementById("i_u_i").style.padding="0 0 5px";
 } else {
	document.getElementById("i_u_i").style.padding="9px 0";
 }
document.getElementById("i_u_i").innerHTML = img_location;
}

var is_already_clicked = false;
function img_double_click(click_num,img_post_obj) // newest version of firefox fixes its label error, so it will double click for uploading images; this catches that
{
	if(is_firefox)
	 {

	if(click_num == 1){img_post_obj.click();};
	if(click_num == 0 && !is_already_clicked){is_already_clicked = true;return true;} else
	if(click_num == 0 && is_already_clicked){is_already_clicked = false;return false;}
//document.getElementById("test_results").innerHTML += is_already_clicked+"<br />"; // for testing


	 } else {
		return true;
	 }

}

function img_uploader(newval,fill_id,x_id,img_icon_id,img_end)
{

img_location = (newval.indexOf("\\") >= 0)?newval.substr((newval.lastIndexOf("\\")+1)):((newval.indexOf("/") >= 0)?newval.substr((newval.lastIndexOf("/")+1)):newval);

if(img_location != "")
 {
	document.getElementById(x_id+img_end).style.display = "block";
	if(img_icon_id != "")
	 {
		document.getElementById(img_icon_id+img_end).style.background="url('sprite.png') no-repeat -105px -46px";
	 }
 } else {
	document.getElementById(x_id+img_end).style.display = "none";
	if(img_icon_id != "")
	 {
		document.getElementById(img_icon_id+img_end).getAttribute("style");
		document.getElementById(img_icon_id+img_end).removeAttribute("style");
		document.getElementById(img_icon_id+img_end).style.display = "block";
	 }
 }

document.getElementById(fill_id+img_end).innerHTML = img_location;
}

function remove_img_upload(file_id,empty_id,x_id,img_icon_id,img_end)
{
	document.getElementById(file_id+img_end).value = "";
	document.getElementById(empty_id+img_end).innerHTML = "";
	document.getElementById(x_id+img_end).style.display = "none";
	if(img_icon_id != "")
	 {
		document.getElementById(img_icon_id+img_end).getAttribute("style");
		document.getElementById(img_icon_id+img_end).removeAttribute("style");
		document.getElementById(img_icon_id+img_end).style.display = "block";
	 }
}

var fsearch_obj,s_val,f_num,temp_matchc;
var f_search_current = new Array(new Array(),new Array(),new Array());
var f_search_count = new Array(0,0,0);
var count_match = 0;
var s_at = 0;
var s_to = 0;
var pre_fsearch_list = "";
var f_match_loc = 0;
var f_match_split;
var s_v_lower = "";
var temp_fsearch_c="";
var temp_fsearch_c2="";
function search_filter(s_obj,filter_type)
{
fsearch_obj = document.getElementById(filter_type);
s_val = s_obj.value.replace(/[^a-zA-Z0-9-_\/ ]/g,"");
s_v_lower = s_val.toLowerCase();
f_num = (filter_type == "f_6_1")?0:((filter_type == "f_6_2")?1:2);
if(s_val != "")
 {

	if(f_search_current[f_num].length > 0)
	 {
		s_at = 0;
		s_to = f_search_current[f_num].length;
		
		for(var s = 0;s<s_to;s++)
		 {
			temp_fsearch_c = ","+f_search_current[f_num][(s-s_at)].toLowerCase();
			temp_fsearch_c2 = " "+f_search_current[f_num][(s-s_at)].toLowerCase();
			if(!(temp_fsearch_c.indexOf(","+s_v_lower) > -1 || temp_fsearch_c2.indexOf(" "+s_v_lower) > -1))
			 {
				fsearch_obj.removeChild(document.getElementById("s_"+replace_spaces(f_search_current[f_num][(s-s_at)])));
				fsearch_list[f_num] = ","+f_search_current[f_num].slice((s-s_at),(s-s_at+1))+fsearch_list[f_num];
				f_search_current[f_num].splice((s-s_at),1);
				s_at += 1;
				f_search_count[f_num] -= 1;
			 }
		 }
	 }

	
	f_search_count[f_num] = f_search_current[f_num].length;
	fsearch_obj.style.display = "block";
	while((fsearch_list[f_num].toLowerCase().indexOf(","+s_v_lower) > -1 || fsearch_list[f_num].toLowerCase().indexOf(" "+s_v_lower) > -1) && f_search_count[f_num] < 5)
	 {
		f_match_loc = (fsearch_list[f_num].toLowerCase().indexOf(","+s_v_lower)+1);
		if(f_match_loc == 0)
		 {
			f_match_split = fsearch_list[f_num].toLowerCase().split(" "+s_v_lower);
			f_match_loc = f_match_split[0].lastIndexOf(",")+1;
		 }
		pre_fsearch_list = fsearch_list[f_num].substr(0,f_match_loc);
		fsearch_list[f_num] = fsearch_list[f_num].substr(f_match_loc);

		temp_matchc = fsearch_list[f_num].substr(0,(fsearch_list[f_num].indexOf(",")));
		append_search_list(fsearch_obj,temp_matchc,f_search_count[f_num]);
		f_search_current[f_num].push(temp_matchc);
		fsearch_list[f_num] = pre_fsearch_list+fsearch_list[f_num].substr(fsearch_list[f_num].toLowerCase().indexOf(","));
		f_search_count[f_num] += 1;
	 }

	if(f_search_current[f_num].length == 0 && !document.getElementById("sx_no_results"+f_num))
	 {
		append_search_list(fsearch_obj,("!"+f_num),-1);
	 } else
	if(f_search_current[f_num].length > 0 && document.getElementById("sx_no_results"+f_num))
	 {
		fsearch_obj.removeChild(document.getElementById("sx_no_results"+f_num));
	 }




 } else {
	while(fsearch_obj.firstChild)
	 {
		fsearch_obj.removeChild(fsearch_obj.firstChild);
		fsearch_list[f_num] = ","+f_search_current[f_num].slice(0,1)+fsearch_list[f_num];
		f_search_current[f_num].splice(0,1);
		f_search_count[f_num] -= 1;
	 }
	fsearch_obj.style.display = "none";
 }
}

var fsearch_div,fsearch_a,fsearch_li,fsearch_div_id;

function append_search_list(l_obj,cat_value) // adds results of refine search to the list
{
fsearch_div_id = "s_"+replace_spaces(cat_value);
// cat_value = cat_value.replace(/\w[^-/. ]*/g,function(match){return match.charAt(0).toUpperCase()+match.substr(1).toLowerCase();});

fsearch_div = document.createElement("div");
if(cat_value.indexOf("!") > -1){fsearch_div_id = "sx_no_results"+cat_value.charAt(1);cat_value = "No Results";fsearch_div.className = "sx_no_results";}
fsearch_div.id = fsearch_div_id;
l_obj.appendChild(fsearch_div);

if(!(fsearch_div_id.indexOf("sx_no_results") > -1))
 {
	fsearch_a = document.createElement("a");
	fsearch_a.className = "filter_1_inner";
	fsearch_a.href = "javascript:void(0)";
	fsearch_a.setAttribute("data-ltext",cat_value);
	fsearch_a.id = "x_"+fsearch_div_id;
	fsearch_a.onmouseover = function(){info_message(this.id,2,8,"Hide This From Feed",0,"#fff","#111","#111",255,.7);};
	fsearch_a.onclick = function(){filter_specific_hide(this,this.parentNode.parentNode.id);};
	fsearch_div.appendChild(fsearch_a);
 }



if(!(fsearch_div_id.indexOf("sx_no_results") > -1))
 {
	fsearch_li=document.createElement("a");
	fsearch_li.onclick = function(){filter_specific_show(this,this.parentNode.parentNode.id);};
 } else {
	fsearch_li=document.createElement("span");
 }
fsearch_li.setAttribute("data-ltext",cat_value);
fsearch_li.innerHTML = cat_value;
fsearch_li.className = "filter_search_a";
fsearch_li.setAttribute("data-ltext",cat_value);
fsearch_li.href = "javascript:void(0)";
fsearch_div.appendChild(fsearch_li);
}



var filter_ids,attach_div,hold_textob,s_create_a,hold_countob;
var filter_attach = new Array(new Array(),new Array(),new Array()); // will hold all filters saying SHOW X category,user,website
var filter_remove = new Array(new Array(),new Array(),new Array()); // will hold all filters saying HIDE X category,user,website
var fshow_counter = new Array(0,0,0);
var fhide_counter = new Array(0,0,0);
function filter_specific_show(show_obj,filter_id) // adds category,user to list of visible filters and tells server to get more
{
	hold_textob = show_obj.getAttribute("data-ltext");
	show_obj.parentNode.parentNode.removeChild(show_obj.parentNode);
	filter_ids = filter_id.split("_");
	attach_div = document.getElementById("f_7_"+filter_ids[2]);
	f_search_count[(parseInt(filter_ids[2])-1)] -= 1;
	filter_attach[(parseInt(filter_ids[2])-1)].push(hold_textob);

	hold_countob = f_search_current[(parseInt(filter_ids[2])-1)].length;
	for(var c_s=0;c_s<hold_countob;c_s++)
	 {
		if(f_search_current[(parseInt(filter_ids[2])-1)][c_s].toLowerCase() == hold_textob.toLowerCase())
		 {
			f_search_current[(parseInt(filter_ids[2])-1)].splice(c_s,1);
			break;
		 }
	 }

	fsearch_div_id = "r_"+replace_spaces(hold_textob);

	s_create_a = document.createElement("a");
	s_create_a.innerHTML = hold_textob;
	s_create_a.id = fsearch_div_id;
	s_create_a.setAttribute("data-position",fshow_counter[(parseInt(filter_ids[2])-1)]);
	s_create_a.href = "javascript:void(0);";
	s_create_a.onmouseover = function(){info_message(this.id,3,8,"Remove Filter",0,"#fff","#000","#000",255,.7);};
	s_create_a.onclick = function(){remove_filter(this,this.parentNode.id);};
	if(attach_div.firstChild)
	 {
                attach_div.insertBefore(s_create_a, attach_div.childNodes[0]);
	 } else {
		attach_div.appendChild(s_create_a);
	 }

	var s_create_exit = document.createElement("span");
		s_create_exit.className = "filter_x_hide";
		s_create_a.appendChild(s_create_exit);

	attach_div.style.display = "block";
	fshow_counter[(parseInt(filter_ids[2])-1)] += 1;
	document.getElementById("filter_reset").style.display="block";
	update_filter(true);
}

function filter_specific_hide(hide_obj,filter_id)
{
	hold_textob = hide_obj.getAttribute("data-ltext");
	hide_obj.parentNode.parentNode.removeChild(hide_obj.parentNode);
	filter_ids = filter_id.split("_");
	attach_div = document.getElementById("f_7_"+filter_ids[2]);
	f_search_count[(parseInt(filter_ids[2])-1)] -= 1;
	filter_remove[(parseInt(filter_ids[2])-1)].push(hold_textob);

	hold_countob = f_search_current[(parseInt(filter_ids[2])-1)].length;
	for(var c_s=0;c_s<hold_countob;c_s++)
	 {
		if(f_search_current[(parseInt(filter_ids[2])-1)][c_s].toLowerCase() == hold_textob.toLowerCase())
		 {
			f_search_current[(parseInt(filter_ids[2])-1)].splice(c_s,1);
			break;
		 }
	 }

	fsearch_div_id = "r_"+replace_spaces(hold_textob);

	s_create_a = document.createElement("a");
	s_create_a.innerHTML = hold_textob;
	s_create_a.id = fsearch_div_id;
	s_create_a.setAttribute("data-position",fhide_counter[(parseInt(filter_ids[2])-1)]);
	s_create_a.className = "hidden_attached";
	s_create_a.href = "javascript:void(0);";
	s_create_a.onmouseover = function(){info_message(this.id,3,8,"Remove Filter",0,"#fff","#000","#000",255,.7);};
	s_create_a.onclick = function(){remove_filter(this,this.parentNode.id);};
	attach_div.appendChild(s_create_a);

	var s_create_exit = document.createElement("span");
		s_create_exit.className = "filter_x_hide";
		s_create_a.appendChild(s_create_exit);

	attach_div.style.display = "block";
	fhide_counter[(parseInt(filter_ids[2])-1)] += 1;
	document.getElementById("filter_reset").style.display="block";

	update_filter(true);
}

var filter_class="";
var pos_filter = "";
function remove_filter(remove_obj,remove_id)
{
	filter_class = remove_obj.className;
	pos_filter = parseInt(remove_obj.getAttribute("data-position"));
	hold_textob = remove_obj.innerHTML;
	filter_ids = remove_id.split("_");

	if(filter_class == "hidden_attached")
	 {
		filter_remove[(parseInt(filter_ids[2])-1)].splice(pos_filter,1);
		fhide_counter[(parseInt(filter_ids[2])-1)] -= 1;

	 } else {

		filter_attach[(parseInt(filter_ids[2])-1)].splice(pos_filter,1);
		fshow_counter[(parseInt(filter_ids[2])-1)] -= 1;
	 }


	if(fhide_counter[(parseInt(filter_ids[2])-1)] == 0 && fshow_counter[(parseInt(filter_ids[2])-1)] == 0)
	 {
		document.getElementById("f_7_"+filter_ids[2]).style.display = "none";
	 }

	fsearch_list[(parseInt(filter_ids[2])-1)] += hold_textob+",";

	remove_obj.parentNode.removeChild(remove_obj);
	if(fhide_counter[0] == 0 && fhide_counter[1] == 0 && fhide_counter[2] == 0 && fshow_counter[0] == 0 && fshow_counter[1] == 0 && fshow_counter[2] == 0)
	 {
		document.getElementById("filter_reset").style.display="none";
	 }

	update_filter(false);

	is_loading_p = false; // fixes bug where a filter would be applied and ALL of the filter's posts would be loaded, then filter removed, and no more posts would load for feed
}

var f_cat_show,f_cat_hide,f_user_show,f_user_hide,f_site_show,f_site_hide,post_arr_split;
var p_arr_temp;
var low_keep_post = true; // if this is false for a post, post isn't necessarily hidden
var high_keep_post = true; // if this is false for a post, post will be hidden
var override_low = false; // if this is true for a post, it will override a low_keep of false
var post_cat_follow = false; // each of these will be true if the user follows each specific user/category (helps when hiding in one section (category or user) and doing nothing in the other)
var post_user_follow =  false;
var post_site_follow = false;
var is_shown_category = false; // is this category in the "show" filter
var is_shown_user = false;
var is_shown_site = false;
var all_search_in = true;
var p_a_r,p_a_r2,p_a_r3,p_a_r4;
var shown_cat,shown_us;
var hidden_cat,hidden_us;
var post_arraylen = 0;
var temp_post_arr_val = "";
function update_filter(load_new)
{

	//document.getElementById("test_results").innerHTML += "load_new:"+(load_new)+"<br />"; // for testing
f_cat_show = ","+filter_attach[0].join()+",";
f_user_show = ","+filter_attach[1].join()+",";
f_site_show = ","+filter_attach[2].join()+",";

if(f_cat_show == ",,"){f_cat_show="";}
if(f_user_show == ",,"){f_user_show="";}
if(f_site_show == ",,"){f_site_show="";}



f_cat_hide = (!all_hidden[0])?(","+filter_remove[0].join()+","):"all";
f_user_hide = (!all_hidden[1])?(","+filter_remove[1].join()+","):"all";
f_site_hide = (!all_hidden[2])?(","+filter_remove[2].join()+","):"all";

if(f_cat_hide == ",,"){f_cat_hide="";}
if(f_user_hide == ",,"){f_user_hide="";}
if(f_site_hide == ",,"){f_site_hide="";}


/*  This has been removed as it is only applicable if we treat the relationship between cats/users/sites as AND rather than OR
if(f_user_show.length == 0 && f_site_show.length == 0 && f_cat_show.length != 0 && f_cat_hide != "all")
 {
	f_cat_hide = "";
 }
if(f_cat_show.length == 0 && f_site_show.length == 0 && f_user_show.length != 0 && f_user_hide != "all")
 {
	f_user_hide = "";
 }
if(f_user_show.length == 0 && f_cat_show.length == 0 && f_site_show.length != 0 && f_cat_hide != "all")
 {
	f_site_hide = "";
 }
*/
post_arraylen = post_array.length;

for(var ic = 0;ic<post_arraylen;ic++)
 {
	all_search_in = true;
	if(!(post_array[ic][16] == "user" && post_array[ic][17] == "user" && post_array[ic][18] == "" && post_array[ic][19] == "")) // this if block checks to make sure loaded posts have the right to be checked. why?: ex: once a filter is applied, new posts are loaded just for that filter
	 {															    // once the filter is removed, those posts are still loaded and saved client side to help the database, but when a user scrolls down and the current unfiltered
																    // list requests more posts, we don't want the posts from the previous filter to be viewable out of order, so we hide those posts until
																    // the user scrolls down more and that post previously viewable in the filter is loaded in it's correct order. we then make that post visible and
																    // reorder the entire list so it comes in the correct order


		shown_cat = ",user,"+f_cat_show;
		post_arr_split = clean_array(shown_cat.split(","));
		temp_post_arr_val = ","+post_array[ic][16]+",";
		for(p_a_r in post_arr_split)
		 {
			if(!(temp_post_arr_val.indexOf(","+post_arr_split[p_a_r]+",") > -1)){all_search_in = false;break;}
		 }
		if(all_search_in)
		 {
			shown_us = ",user,"+f_user_show+f_site_show;
			post_arr_split = clean_array(shown_us.split(","));
			temp_post_arr_val = ","+post_array[ic][17]+",";
			for(p_a_r2 in post_arr_split)
			 {
				if(!(temp_post_arr_val.indexOf(","+post_arr_split[p_a_r2]+",") > -1)){all_search_in = false;break;}
			 }
		 }

//document.getElementById("test_results").innerHTML += all_search_in+":"+post_array[ic][14].indexOf(R5_order)+"<br />"; // for testing

/*
		if(all_search_in)
		 {
			post_arr_split = post_array[ic][18].split(",");
			hidden_cat = f_cat_hide;
			for(p_a_r3 in post_arr_split)
			 {
				if(!(hidden_cat.indexOf(","+post_arr_split[p_a_r3]+",") > -1) && hidden_cat != post_array[ic][18]){all_search_in = false;break;}
			 }
		 }
*/
//document.getElementById("test_results").innerHTML += all_search_in+"::"+post_array[ic][18]+"::"+hidden_cat+"<br />"; // for testing
		if(all_search_in)
		 {
			post_arr_split = post_array[ic][19].split(",");
			hidden_us = ","+f_user_hide+","+f_site_hide+",";
			for(p_a_r4 in post_arr_split)
			 {
				if(!(hidden_us.indexOf(","+post_arr_split[p_a_r4]+",") > -1) && hidden_us != post_array[ic][19]){all_search_in = false;break;}
			 }
		 }
	 }
/*
if(post_array[ic][0] == "jhtheking" || post_array[ic][0] == "jhard")
{
//document.getElementById("test_results").innerHTML += all_search_in+"<br />"; // for testing
}
*/

	if(!all_search_in && document.getElementById(post_array[ic][8]).style.display == "block")
	 {
		document.getElementById(post_array[ic][8]).style.display = "none";
		posts_shown--;
	 }

	if(post_array[ic][14].indexOf(R5_order) > -1 && all_search_in) // if it fits into the current sort (by total, recent, forum style) and the filter applied, we check to see if each post should be hidden or shown here:
	 {
		p_arr_temp = post_array[ic][6].split(","); // splits up the categories of a given post (length will be 1 to 3)

		low_keep_post = true;
		high_keep_post = true; // this has been removed; this originally was for when filters meant "and" (see below)  *** ADDED BACK WHEN HIDING (hiding uses AND and showing only is OR)
		override_low = false; // this means that all of the filters use "or" rather than "and" (ex: the category is X OR the user is Y; with this removed, it would be AND (server side uses AND))
		post_cat_follow = false;
		post_user_follow = (fsearch_listback[1].indexOf(","+post_array[ic][0]+",") != -1)?true:false;
		is_shown_category = false;
		is_shown_user = (f_user_show.indexOf(","+post_array[ic][0]+",") != -1)?true:false;

		for(var ih = 0;ih<p_arr_temp.length;ih++)
		 {
			if(f_cat_hide == "all" && fsearch_listback[0].indexOf(","+p_arr_temp[ih]+","))
			 {
				//high_keep_post = false;
				//break;
			 }

			if(f_cat_show.length > 0 && f_cat_show.indexOf(","+p_arr_temp[ih]+",") == -1) // if the category is not in the filter list
			 {
				low_keep_post = false;
			 } else
			if(f_cat_show.length > 0 || (((f_user_hide == "all" && f_site_show == "") || (f_user_show == "" && f_site_hide == "all")) && f_cat_hide != "all" && fsearch_listback[0].indexOf(","+p_arr_temp[ih]+",") > -1 && f_cat_hide.indexOf(","+p_arr_temp[ih]+",") == -1 && f_cat_show.length == 0)) // means the category is in the filter list
			 {
				override_low = true;
			 }
			if(fsearch_listback[0].indexOf(","+p_arr_temp[ih]+",") > -1) // used with user below
			 {
				post_cat_follow = true;
			 }
			if(f_cat_show.length > 0 && f_cat_show.indexOf(","+p_arr_temp[ih]+",") != -1) // if this category is specifically chosen to be shown
			 {
				is_shown_category = true;
			 }

			if(!(f_user_show.length == 0 && post_user_follow) && ((f_cat_hide.length > 0 && f_cat_hide.indexOf(","+p_arr_temp[ih]+",") > -1) || (f_cat_hide == "all" && fsearch_listback[0].indexOf(","+p_arr_temp[ih]+",") > -1)))
			 {
					high_keep_post = false;
					//low_keep_post = false; // taken out from if statement: !(f_user_show.length > 0 && is_shown_user) && 
					//break;
			 } else
			if(f_cat_hide.indexOf(","+p_arr_temp[ih]+",") > -1)
			 {
//document.getElementById("test_results").innerHTML += ((!(f_user_show.length > 0 && is_shown_user))?"true":"false")+" content::"+post_array[ic][5]+"<br />"; // for testing
			 }
		 }

		if(f_user_show.length > 0 && !is_shown_user) // if the user is not in the filter list
		 {
			low_keep_post = false;
		 } else
		if(f_user_show.length > 0 || (((f_cat_hide == "all" && f_site_show == "") || (f_cat_show == "" && f_site_hide == "all")) && f_user_hide != "all" && post_user_follow && f_user_hide.indexOf(","+post_array[ic][0]+",") == -1 && f_user_show.length == 0)) // means the user is in the filter list
		 {
			override_low = true;
		 }
		if((f_user_hide.length > 0 && f_user_hide.indexOf(","+post_array[ic][0]+",") > -1 && !(f_cat_show.length == 0 && post_cat_follow)) || (f_user_hide == "all" && post_user_follow && !(f_cat_show.length == 0 && post_cat_follow)) && !(f_cat_show.length > 0 && is_shown_category))
		 {
				high_keep_post = false;
				//low_keep_post = false;
		 }

		if(!high_keep_post || (!low_keep_post && !override_low))
		 {
			if(document.getElementById(post_array[ic][8]).style.display != "none")
			 {
				document.getElementById(post_array[ic][8]).style.display = "none";
				posts_shown--;
			 }
		 } else {
			if(document.getElementById(post_array[ic][8]).style.display == "none")
			 {
				document.getElementById(post_array[ic][8]).style.display = "block";
				posts_shown++;
			 }
		 }

/*
if(post_array[ic][8] == "p124")
{
	//document.getElementById("test_results").innerHTML += low_keep_post+":"+override_low+":"+post_array[ic][0]+"<br />"; // for testing
	//document.getElementById(post_array[ic][8]).style.display != "none"
}
*/
	 } else {
		if(document.getElementById(post_array[ic][8]).style.display != "none")
		 {
	//document.getElementById("test_results").innerHTML += document.getElementById(post_array[ic][8]).className+"<br />"; // for testing
			//document.getElementById(post_array[ic][8]).setAttribute("style","display:none");
			document.getElementById(post_array[ic][8]).style.display = "none";
			posts_shown--;
		 }
	 }
 }

	if(load_new && !user_category_scroll){load_new_posts();} else
	if(load_new && user_category_scroll){load_new_posts2();}
}

var xml_http5;
var posts_to_load = 0;
var transfer_cat_show = [];
var transfer_us_show = [];
var transfer_cat_hide = [];
var transfer_us_hide = [];
var load_count = 0;
var id_user_show,id_user_hide;
var id_category_show,id_category_hide;
var loaded_p_shown = [];
var loaded_p_string = ""; // current filter string (keeps track of how many posts we have loaded for each filter applied so we can resume with that filter if user goes back to it)
var temp_attach0 = "";
var temp_attach1 = "";

function load_new_posts()
{
temp_attach0 = (filter_attach[0].length > 0 && !all_hidden[0])?filter_attach[0].sort().join("_"):((!all_hidden[0])?"":"all"); // category
temp_attach1 = (filter_attach[1].length > 0 && !all_hidden[1])?filter_attach[1].sort().join("_"):((!all_hidden[1])?"":"all"); // user

loaded_p_string = R5_order + "cat_" + temp_attach0 + "user_" + temp_attach1;
if(!loaded_p_shown[loaded_p_string])
 {
	loaded_p_shown[loaded_p_string] = 0;
 }

posts_to_load = (15-(loaded_p_shown[loaded_p_string]%15)); // load up to 15 more posts

f_cat_show = filter_attach[0].join();
f_user_show = filter_attach[1].join();
f_site_show = filter_attach[2].join();

f_cat_hide = (!all_hidden[0])?filter_remove[0].join():"all";
f_user_hide = (!all_hidden[1])?filter_remove[1].join():"all";
f_site_hide = (!all_hidden[2])?filter_remove[2].join():"all";

id_user_show = get_user_ids(f_user_show);
id_user_hide = (f_user_hide != "all")?get_user_ids(f_user_hide):"all";

id_category_show = get_category_ids(f_cat_show);
id_category_hide = (f_cat_hide != "all")?get_category_ids(f_cat_hide):"all";

//document.getElementById("test_results").innerHTML += posts_to_load+"::"+(f_user_show)+":1<br />"; // for testing
//document.getElementById("test_results").innerHTML += (id_user_show)+":2<br />"; // for testing
//document.getElementById("test_results").innerHTML += (id_user_hide)+":3<br />"; // for testing

transfer_cat_show[load_count] = "user"+((f_cat_show.length>0)?",":"")+f_cat_show;
transfer_us_show[load_count] = "user"+((f_user_show.length>0 || f_site_show.length>0)?",":"")+f_user_show+((f_user_show.length>0 && f_site_show.length>0)?",":"")+f_site_show;

transfer_cat_hide[load_count] = f_cat_hide;
transfer_us_hide[load_count] = f_user_hide+((f_user_hide.length>0 && f_site_hide.length>0)?",":"")+f_site_hide;

load_count+=1;

	xml_http5=get_xml_http_obj();
	if(xml_http5==null)
	 {
		return;
	 }

	//document.getElementById("test_results").innerHTML += "posts_shown:"+(posts_shown)+"::posts_to_load:"+(posts_to_load)+"<br />"; // for testing
	//document.getElementById("test_results").innerHTML += "cat:"+(id_category_show)+"<br />"; // for testing

//document.getElementById("test_results").innerHTML += loaded_p_shown[loaded_p_string]+"<br />"; // for testing

//		document.getElementById("test_results").innerHTML += 'loaded_p_string:'+loaded_p_string+'<br />'; // for testing

	url='load_new.php';
	xml_http5.onreadystatechange=r_state_changed5;
	xml_http5.open('POST',url,true);
	xml_http5.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http5.send('type=user&show_cat='+id_category_show+'&hide_cat='+id_category_hide+'&show_user='+id_user_show+'&hide_user='+id_user_hide+'&show_site='+f_site_show+'&hide_site='+f_site_hide+'&start='+loaded_p_shown[loaded_p_string]+'&limit='+posts_to_load+'&sort='+R5_order);

//document.getElementById("test_results").innerHTML += 'type=user&show_cat='+id_category_show+'&hide_cat='+id_category_hide+'&show_user='+id_user_show+'&hide_user='+id_user_hide+'&show_site='+f_site_show+'&hide_site='+f_site_hide+'&start='+loaded_p_shown[loaded_p_string]+'&limit='+posts_to_load+'&sort='+R5_order+'<br />'; // for testing
}

var load_criteria = "";
var load_type = "";
function load_new_posts2()
{
temp_attach0 = (filter_attach[0].length > 0)?filter_attach[0].sort().join("_"):"";
temp_attach1 = (filter_attach[1].length > 0)?filter_attach[1].sort().join("_"):"";

loaded_p_string = R5_order + "cat_" + temp_attach0 + "user_" + temp_attach1;
if(!loaded_p_shown[loaded_p_string])
 {
	loaded_p_shown[loaded_p_string] = 0;
 }

posts_to_load = (15-(loaded_p_shown[loaded_p_string]%15)); // load 15 more posts
id_user_show = (filter_attach[1][0] != "")?get_user_ids(filter_attach[1][0]):"";
id_category_show = (filter_attach[0][0] != "")?get_category_ids(filter_attach[0][0]):"";
load_criteria = id_category_show + id_user_show;

load_type = (filter_attach[1][0] != "")?"user":"category";

transfer_cat_show[load_count] = "user"+((filter_attach[0][0].length>0)?",":"")+filter_attach[0][0];
transfer_us_show[load_count] = "user"+((filter_attach[1][0].length>0)?",":"")+filter_attach[1][0];

transfer_cat_hide[load_count] = "";
transfer_us_hide[load_count] = "";
load_count+=1;
	xml_http5=get_xml_http_obj();
	if(xml_http5==null)
	 {
		return;
	 }

	//document.getElementById("test_results").innerHTML += (load_criteria)+"<br />"; // for testing
	url='user_category_load.php';
	xml_http5.onreadystatechange=r_state_changed5;
	xml_http5.open('POST',url,true);
	xml_http5.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http5.send('type='+load_type+'&criteria='+load_criteria+'&start='+loaded_p_shown[loaded_p_string]+'&limit='+posts_to_load+'&sort='+R5_order);
}

var new_post_array,np,n_p_s;
var loaded_count = 0;
var capture_num = 0;
var re_order = false;
var mid_bottom_gobj;
var change_R5_order=false;
var poster_username,post_img_location;
function r_state_changed5()
{
if(xml_http5.readyState==4 || xml_http5.readyState=='complete')
 {
	R5_rec=xml_http5.responseText;
	new_post_array = clean_array(R5_rec.split("*"));

//document.getElementById("test_results").innerHTML += (new_post_array[0])+"<br />"; // for testing (new_post_array.length is the number of posts loaded)


   if(R5_rec != "error" && R5_rec.length != 0)  // realize that 0 means for the given filter applied, ALL of the posts have been loaded. this means is_loading_p will still be true even if not loading
    {
	for(np in new_post_array)
	 {
		n_p_s = new_post_array[np].split(",");
		if(!user_category_scroll)
		 {
			poster_username = n_p_s[1];
			post_img_location = n_p_s[4];
		 } else
		if(n_p_s[1] == "" && n_p_s[4] == "")  // on the user page
		 {
			poster_username = user_username;
			post_img_location = R5_image2;
		 } else { // on the category page

			poster_username = n_p_s[1];
			post_img_location = n_p_s[4];
		 }

		if(!document.getElementById(n_p_s[9]))
		 {
			add_post(n_p_s[0],poster_username,parseInt(n_p_s[2]),parseInt(n_p_s[3]),post_img_location,n_p_s[5],n_p_s[6],n_p_s[7].split(":"),n_p_s[8].replace("#",","),n_p_s[9],parseInt(n_p_s[10]),n_p_s[11],parseInt(n_p_s[12]),parseFloat(n_p_s[13]),parseInt(n_p_s[14]),parseInt(n_p_s[15]),n_p_s[16],transfer_cat_show[loaded_count],transfer_us_show[loaded_count],transfer_cat_hide[loaded_count],transfer_us_hide[loaded_count],"load",parseInt(n_p_s[17]),"",n_p_s[18],n_p_s[19]);
		 } else {
			//capture_num = parseInt(document.getElementById(n_p_s[9]).children[0].children[1].id.substr(8));
			capture_num = id_hold[n_p_s[9]];
			if(!(post_array[capture_num][16] == "user" && post_array[capture_num][17] == "user" && post_array[capture_num][18] == "" && post_array[capture_num][19] == ""))
			 {
				post_array[capture_num][16] = transfer_cat_show[loaded_count];
				post_array[capture_num][17] = transfer_us_show[loaded_count];
				post_array[capture_num][18] = transfer_cat_hide[loaded_count];
				post_array[capture_num][19] = transfer_us_hide[loaded_count];
			 }
				if(document.getElementById(n_p_s[9]).style.display == "none")
				 {
					document.getElementById(n_p_s[9]).style.display = "block";
					posts_shown++;
				 }
				loaded_p_shown[loaded_p_string]++;
				re_order = true;

			post_array[capture_num][14] += ","+R5_order;
		 }
	 }

	if(re_order)
	 {
		if(change_R5_order)
		 {
			mid_bottom_gobj = document.getElementById("middle_bottom");
			//mid_bottom_gobj.style.height = mid_bottom_gobj.offsetHeight+"px";
			change_R5_order = false;
		 } else {

		 }
		re_order = false;
		reorder_posts();
	 }
	is_loading_p = false;
    }
	loaded_count += 1;
 }


	//document.getElementById("test_results").innerHTML += (posts_shown)+"<br />"; // for testing
}

var user_name_arr,unum,get_id_loc,temp_users_id;
final_ids = "";
function get_user_ids(user_id_list)
{
	if(user_id_list != "")
	 {
		final_ids = "";
		user_name_arr = user_id_list.split(",");
		for(unum in user_name_arr)
		 {
			get_id_loc = users_ids.indexOf(","+user_name_arr[unum]+":") + user_name_arr[unum].length + 2;
			temp_users_id = users_ids.substr(get_id_loc);
			temp_users_id = temp_users_id.substr(0,temp_users_id.indexOf(","));
			final_ids += temp_users_id+",";
		 }

		final_ids = final_ids.substr(0,(final_ids.length-1));
		return final_ids;
	 } else {
		return "";
	 }
}

var c_final_ids,category_name_arr,c_num,c_get_id_loc,temp_category_id
function get_category_ids(category_id_list)
{
	if(category_id_list != "")
	 {
		c_final_ids = "";
		category_name_arr = category_id_list.split(",");
		for(c_num in category_name_arr)
		 {
			c_get_id_loc = categories_ids.indexOf(","+category_name_arr[c_num]+":") + category_name_arr[c_num].length + 2;
			temp_category_id = categories_ids.substr(c_get_id_loc);
			temp_category_id = temp_category_id.substr(0,temp_category_id.indexOf(","));
			c_final_ids += temp_category_id+",";
		 }
		c_final_ids = c_final_ids.substr(0,(c_final_ids.length-1));
		return c_final_ids;
	 } else {
		return "";
	 }
}

var mid_bottom_obj,temp_p_arr_len,p_arr_val,to_sort,get_a_num,get_b_num,ret_a,ret_b;
var p_sort_type = 0;
var i0 = 0;
var to_s_len = 0;
var nl;
function reorder_posts()
{
	close_replies_to_sort();
	p_count = 0;
	mid_bottom_obj = document.getElementById("middle_bottom");
	if(R5_order == "total"){p_sort_type = 11;} else
	if(R5_order == "new"){p_sort_type = 12;} else
	if(R5_order == "reply_date"){p_sort_type = 13;}

	//to_sort = Array.prototype.slice.call(mid_bottom_obj.children, 0);

	nl=mid_bottom_obj.children;
	to_sort = [];
	for(var ix = 0, n; n = nl[ix]; ++ix){ to_sort.push(n);}

	to_sort.sort(function(a, b)
	 {
		get_a_num = id_hold[a.id];
		get_b_num = id_hold[b.id];//parseInt(document.getElementById(b.id).firstChild.childNodes[1].id.substr(8));
		ret_a = post_array[get_a_num][p_sort_type];
		ret_b = post_array[get_b_num][p_sort_type];

		return ret_b - ret_a;
	 });

	//mid_bottom_obj.innerHTML = ""; // doesn't work in IE
	while(mid_bottom_obj.firstChild)
	 {
		mid_bottom_obj.removeChild(mid_bottom_obj.firstChild);
	 }


	to_s_len = to_sort.length;
	for(i0 = 0;i0<to_s_len;i0++)
	 {
		mid_bottom_obj.appendChild(to_sort[i0]);
		temp_post_array[i0] = to_sort[i0].id;
	 }

	open_replies_to_sort();
//	mid_bottom_obj.style.height = "auto";
}

var is_refine_out = false;
var temp_rf_ht = 218;  // this is the default
var interval_slide;
var is_rf_changing = false; // is the animation currently happening
var entire_refine_obj;
function slide_filter()
{
	entire_refine_obj = document.getElementById("entire_refine");
	entire_refine_obj_style = document.getElementById("entire_refine").style;
	if(!is_refine_out && !is_rf_changing)
	 {
		is_rf_changing = true;
		entire_refine_obj_style.display="block";
		document.getElementById("refine_image").className = "refine_image2";

		if(!is_safari)
		 {
			entire_refine_obj_style.height="0px";
			interval_slide = window.setInterval(go_slide_dn, 10);
		 } else {
			entire_refine_obj_style.height="auto";
			is_rf_changing = false;
		 }

		is_refine_out = true;
	 } else
	if(!is_rf_changing)
	 {
		entire_refine_obj.parentNode.style.boxShadow="";
		entire_refine_obj.parentNode.style.mozBoxShadow="";
		entire_refine_obj.parentNode.style.webkitBoxShadow="";
		is_rf_changing = true;
		temp_rf_ht = entire_refine_obj.offsetHeight;
		track_rf_ht = temp_rf_ht;
		document.getElementById("refine_image").className = "refine_image";

		if(!is_safari)
		 {
			interval_slide = window.setInterval(go_slide_up, 10);
		 } else {
			entire_refine_obj_style.height="0px";
			entire_refine_obj_style.display="none";
			is_rf_changing = false;
		 }

		is_refine_out = false;
	 }
}

var track_rf_ht = 0;
var ht_change_by = 20; // # of px to increase/decrease by each call
function go_slide_dn()
{
	if((track_rf_ht+ht_change_by) < temp_rf_ht)
	 {
		track_rf_ht += ht_change_by;
		entire_refine_obj_style.height=track_rf_ht+"px";
	 } else {
		track_rf_ht = temp_rf_ht;
		//document.getElementById("entire_refine").style.height=track_rf_ht+"px";
		clearInterval(interval_slide);
		entire_refine_obj_style.height="auto";
		entire_refine_obj.parentNode.style.boxShadow="0 2px 10px 0 rgba(0,0,0,.15)";
		entire_refine_obj.parentNode.style.mozBoxShadow="0 2px 10px 0 rgba(0,0,0,.15)";
		entire_refine_obj.parentNode.style.webkitBoxShadow="0 2px 10px 0 rgba(0,0,0,.15)";
		is_rf_changing = false;
	 }
}

function go_slide_up()
{
	if((track_rf_ht-ht_change_by) > 0)
	 {
		track_rf_ht -= ht_change_by;
		entire_refine_obj_style.height=track_rf_ht+"px";
	 } else {
		track_rf_ht = 0;
		entire_refine_obj_style.height=track_rf_ht+"px";
		entire_refine_obj_style.display="none";
		clearInterval(interval_slide);
		is_rf_changing = false;
	 }
}

function change_sort(sort_type,sort_obj)
{
	if(sort_type != R5_order)
	 {
		if(window.navigator.userAgent.indexOf("MSIE 8") == -1)
		 {
			var mid_style = document.createElement("style");
			mid_style.type = "text/css";
			mid_style.innerHTML = ".middle_bottom2 { height: "+document.getElementById("middle_bottom").offsetHeight+"px; }";
			document.getElementsByTagName("head")[0].appendChild(mid_style);
			document.getElementById("middle_bottom").className = "middle_bottom middle_bottom2";
		 } else {
			document.getElementById("middle_bottom").style.height = document.getElementById("middle_bottom").offsetHeight+"px";
		 }
		//document.getElementById("middle_bottom").style.height = document.getElementById("middle_bottom").offsetHeight+"px";

		var temp_open_len = opened_replies.length;
		var hold_opened_replies = opened_replies.slice(0);

		temp_open_len2 = temp_open_len;
		while(temp_open_len2 > 0)
		 {
			remove_prev_sibling_arr(opened_replies[0]);
			temp_open_len2--;
		 }

		change_R5_order = true;
		document.getElementById(R5_order+"_sort").className = "";
		R5_order = sort_type;
		sort_obj.className = "top_f_select";

		reorder_posts();
		update_filter(false);

		if(posts_shown < 15) {load_new_posts();}

		for(var t_o_l2=0;t_o_l2 < temp_open_len;t_o_l2++)
		 {
			add_prev_sibling_arr(hold_opened_replies[t_o_l2]);
		 }

		if(window.navigator.userAgent.indexOf("MSIE 8") == -1)
		 {
			var wait_class_mid = setTimeout(function(){
			document.getElementById("middle_bottom").className = "middle_bottom";},70); // for some reason there has to be a delay before we call this
		 } else {
			document.getElementById("middle_bottom").style.height = "auto";
		 }
	 }
}

function cat_swap(node1, node2)
{
	node1.parentNode.replaceChild(node1, node2);
	node1.parentNode.insertBefore(node2, node1);
}