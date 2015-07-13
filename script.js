var notif_open = false;
function open_notifications()
{
	if(!bool_get_notif)
	 {
		if(notif_loaded == 0)
		 {
	//document.getElementById("test_results").innerHTML = "asdf";
			get_notifications('true');
		 } else {
			get_notifications('false');
		 }
	 }
	document.getElementById('dashboard').style.display = 'block';
	document.getElementById('dash_notif_link').className = 'top_left_links dash_notif_open_link';
	document.getElementById('dash_num_notif').className = 'dash_num_notif dash_num_open';

	notif_open = true;
}

function close_notifications()
{
	if(notif_open)
	 {
		document.getElementById('dashboard').style.display = 'none';
		document.getElementById('dash_notif_link').className = 'top_left_links';
		document.getElementById('dash_num_notif').className = 'dash_num_notif';
		notif_open = false;
	 }
}

function return_firstChild(dom_elem)
{
	var elem_first=dom_elem.firstChild;
	while(elem_first.nodeType != 1)
	 {
		elem_first = elem_first.nextSibling;
	 }
	return elem_first;
}

var xml_http18;
var notif_loaded = 0;
var load_notifications = true;
var SET_LOAD = 10; // must match $SET_LOAD in display_notications.php
function check_loaded_notif()
{
	if(document.getElementById("dashb_notif"))
	 {
		var dash_hold = document.getElementById("dashb_notif").firstChild;
		while(dash_hold)
		 {
			if(dash_hold.nodeType === 1)
			 {
				notif_loaded++;
			 }
			dash_hold = dash_hold.nextSibling;
		 }
		if(notif_loaded < SET_LOAD && notif_loaded != 0) // means we have loaded some notifications, but there were less than the amount we attempted to return; there are no more notifications so turn off the ajax
		 {
			load_notifications = false;
		 }
	 } else {
		var t=setTimeout(function(){check_loaded_notif()},500);
	 }
}
check_loaded_notif();


var bool_get_notif = false; // have we called the get_notifications function yet
var get_notif_load = [];
var count_n_load = 0;
var count_n_rstate = 0;
function get_notifications(load)
{
	bool_get_notif = true;
	if(!load_notifications && load=='true') {return;} // the last time we loaded notifications there were less than SET_LOAD, we have loaded notifications at least once, and we are trying to load more
	get_notif_load[count_n_load] = load;
	count_n_load++;
	document.getElementById("dash_num_notif").innerHTML = ""; // take away the notification # if it has a value

	xml_http18 = get_xml_http_obj();
/*
	var url="notification_update.php";
	xml_http18.onreadystatechange=r_state_changed18;
	xml_http18.open('POST',url,true);
	xml_http18.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http18.send('load='+load+'&start='+notif_loaded);
	*/

}

function r_state_changed18()
{
	if(xml_http18.readyState==4 || xml_http18.readyState=='complete')
	 {
		var notif_return = xml_http18.responseText;

//document.getElementById("test_results").innerHTML = notif_return;

		if(notif_return != "" && notif_return.indexOf("error:") != 0)
		 {
			var all_notif = clean_array(notif_return.split("*")); // get rid of empty array at end with clean_array
			var an_len = all_notif.length;
			for(var an=0;an<an_len;an++)
			 {
				var in_an = all_notif[an].split(",");

				// "$avatar,$username,$content,$link,$date,$read_status,$type,$n_temp_time,$n_temp_time_title*";
				add_notifications(in_an[0],in_an[1],in_an[2],in_an[3],in_an[4],parseInt(in_an[5]),in_an[6],in_an[7],in_an[8],in_an[9]);

				notif_loaded++;
			 }

			if(!document.getElementById("dash_end_notif") && an_len < SET_LOAD) // we load 10 notifications each time, if less then 10 were returned, we have reached the end
			 {
				end_notifications("End of notifications.",false);
				load_notifications = false;
			 } else
			if(!document.getElementById("dash_end_notif"))
			 {
				end_notifications("Load More",true);
			 } else
			if(an_len < SET_LOAD)
			 {
				reset_end_notif();
			 }
		 } else
		if(notif_return == "" && get_notif_load[count_n_rstate] == "true") // if nothing was returned AND we wanted to return notifications, reset the end b/c there are no more notifications
		 {
			reset_end_notif();
		 }

		function reset_end_notif()
		 {
			if(document.getElementById("dash_end_notif"))
			 {
				document.getElementById("dash_end_notif").innerHTML = "End of notifications.";
				document.getElementById("dash_end_notif").className = "dash_end_notif";
				document.getElementById("dash_end_notif").onclick = null;
			 } else {
				end_notifications("You don't have any notifications!",false);
			 }
		 }

		document.getElementById("dashboard_bottom").className = "dashboard_bottom";

		count_n_rstate++;
	 }
}
			// "$avatar,$username,$content,$link,$date,$read_status,$type,$n_temp_time,$n_temp_time_title*";
function add_notifications(n_avatar,n_user,n_cont,n_link,n_date,n_numnot,n_type,n_time,n_time_title)
{
	var notif_outer,noti_cont_pr,noti_img_out,noti_img_in,noti_n_outer,noti_title,noti_n_user,noti_content;
	var dashboard_n = document.getElementById("dashb_notif");
	notif_outer = document.createElement("a");
		notif_outer.className = "dash_notification"+((n_numnot == 0)?" new_dash_notification":"");
		notif_outer.href = "";
		dashboard_n.appendChild(notif_outer);

	noti_cont_pr = document.createElement("span");
		noti_cont_pr.className = "dash_content_preview";
		notif_outer.appendChild(noti_cont_pr);

	noti_img_out = document.createElement("span");
		noti_img_out.className = "dash_img_outer";
		noti_cont_pr.appendChild(noti_img_out);

	noti_img_in = document.createElement("img");
		noti_img_in.className = "dash_img_inner";
		noti_img_in.src = n_avatar;
		noti_img_out.appendChild(noti_img_in);

	noti_n_outer = document.createElement("span");
		noti_n_outer.className = "dash_notif_outer";
		noti_cont_pr.appendChild(noti_n_outer);

	if(n_type != 2)
	 {
		noti_title = document.createElement("span");
			noti_title.className = "dash_notif_title";
			noti_n_outer.appendChild(noti_title);

		noti_n_user = document.createElement("span");
			noti_n_user.className = "dash_notif_user";
			noti_n_user.innerHTML = "@"+n_user+" "+((n_type == 1)?"tagged you in a post":"replied to your post");
			noti_title.appendChild(noti_n_user);
	 }

	noti_content = document.createElement("span");
		noti_content.className = "dash_notif_content"+((n_type!=2)?"":"2");
		if(n_type != 2)
		 {
			noti_content.innerHTML = n_cont;
		 } else {
			noti_content.innerHTML = "@"+n_user+" followed you.";
		 }
		noti_n_outer.appendChild(noti_content);

	noti_time = document.createElement("span");
		noti_time.className = "dash_notif_time";
		if(n_time_title != "")
		 {
			noti_time.title = n_time_title;
		 }
		noti_time.innerHTML = n_time;
		noti_n_outer.appendChild(noti_time);
}

function end_notifications(outer_n_text,is_active)
{
	outer_end_n = document.createElement("a");
		outer_end_n.className = "dash_end_notif"+((is_active)?" dash_end_notif_active":"");
		outer_end_n.id = "dash_end_notif";
		outer_end_n.innerHTML = outer_n_text;
		if(is_active)
		 {
			outer_end_n.onclick = function(){get_notifications("true");};
		 }
		document.getElementById("dashb_notif").parentNode.appendChild(outer_end_n); // add it after div holding notifications
}

document.getElementById('dash_notif_link').onclick = document.getElementById('dash_num_notif').onclick = function(e) {
	if(e == null) {e = window.event;} // IE7,IE8
	e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
	open_notifications();
	}

document.getElementById('dashboard').onclick = function(e) {
	if(e == null) {e = window.event;} // IE7,IE8
	e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
	}

if(document.addEventListener)
 {  
	document.addEventListener("click", function(){close_notifications();}, false);
 } else
if(document.attachEvent)
 {   // IE
	document.attachEvent("onclick", function(){close_notifications();}, false);
 }

function setCookie(c_name,value,expire_days)
{
var expire_date=new Date();
expire_date.setDate(expire_date.getDate() + expire_days);
var c_value=escape(value) + ((expire_days==null) ? "" : "; expires="+expire_date.toUTCString());
document.cookie=c_name + "=" + c_value;
}

var cos = .70711;  // Math.cos(2*(45/360)*Math.PI) - cosign of 45 degree angle
var neg_margin, doc_id, doc_width, doc_height, min_point_b, ih_width, ih_height;
var _x = 0;
var _y = 0;
var current_dir = 0;
var temp_dir = "";
var temp_dir2 = "";
var temp_dir3 = "";
var transform_d = 315;
var new_x = 0;
var new_y = 0;
var temp_ih_hw="";
var ac_id, ih_id, pe_id;
var def_color = "#fff";
var def_back = "#333";
var def_border = "#000";
var def_opacity = .2;
var t_close;
var pe_id_bordercolor = "";
var scroll_doc,scroll_left,scroll_top,scroll_body,rect_object;

function info_message(id,dir,pointer_hw,message,_time,_color,_backg,_border,_boxshadow,_opacity)  // the id requesting info box, top=0; right=1; bottom=2; left=3; , length of sides, message, when to close box
{
scroll_doc = document.documentElement;
scroll_body = document.body;
scroll_left = (scroll_doc && scroll_doc.scrollLeft || scroll_body && scroll_body.scrollLeft || 0);
scroll_top = (scroll_doc && scroll_doc.scrollTop  || scroll_body && scroll_body.scrollTop  || 0);

ac_id = document.getElementById("ac_info");
ih_id = document.getElementById("info_hold");
pe_id = document.getElementById("point_er");

ac_id.style.color = (_color != null)?_color:def_color;
ac_id.style.background = (_backg != null)?_backg:def_back;
ih_id.style.background = (_backg != null)?_backg:def_back;
//pe_id.style.background = (_backg != null)?_backg:def_back;
ih_id.style.borderColor = (_border != null)?_border:def_border;

def_opacity = (_opacity == null)?(.5):(_opacity);

if(_boxshadow != null)
 {
	ih_id.style.boxShadow = "0 0 10px 0 rgba("+_boxshadow+","+_boxshadow+","+_boxshadow+","+def_opacity+")";
	ih_id.style.MozBoxShadow = "0 0 10px 0 rgba("+_boxshadow+","+_boxshadow+","+_boxshadow+","+def_opacity+")";
	ih_id.style.WebkitBoxShadow = "0 0 10px 0 rgba("+_boxshadow+","+_boxshadow+","+_boxshadow+","+def_opacity+")";
 } else {
	ih_id.style.boxShadow = "";
	ih_id.style.MozBoxShadow = "";
	ih_id.style.WebkitBoxShadow = "";
 }

pe_id_bordercolor = (_border != null)?_backg:def_back;

neg_margin = -((pointer_hw)*2 - 1); // the margin needed from any side to line up borders
min_point_b = 2*pointer_hw;  // minimum height/width of info's side

	if(ih_id.style.removeProperty)  // only IE 8 or return false here
	 {
		ih_id.style.removeProperty("min-height");
		ih_id.style.removeProperty("min-width");
	 } else {
		ih_id.style.removeAttribute("min-height");
		ih_id.style.removeAttribute("min-width");
	 }
temp_ih_hw = ((dir%2) == 0)?"Width":"Height";
eval("ih_id.style.min"+temp_ih_hw+"='"+min_point_b+"px';");

if(message.indexOf("fontup:") > -1)
 {
	var temp_message = message.split(":");

	var tm_rev1 = temp_message[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	var tm_rev2 = temp_message[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	message = "<span style='display:block;color:#40B000;border-bottom:1px #eee solid;padding:0 3px 3px;text-align:center;'>" + tm_rev1 + "</span><span style='display:block;color:#CC0000;padding:3px 3px 0;text-align:center;'>" + tm_rev2 + "</span>";

	//message = message.replace("fontup:","<span style='display:block;color:#40B000;border-bottom:1px #eee solid;padding:0 3px 3px;text-align:center;'>").replace("fontdn:","<span style='display:block;color:#CC0000;padding:3px 3px 0;text-align:center;'>").replace(/:endfont/g,"</span>");
 }

ac_id.innerHTML = message;

doc_id = document.getElementById(id);
rect_object = doc_id.getBoundingClientRect();

	//document.getElementById("test_results").innerHTML += rectObject.left+"<br />"; // for testing
_x = rect_object.left+scroll_left;
_y = rect_object.top+scroll_top;
/*
    while(doc_id && !isNaN( doc_id.offsetLeft ) && !isNaN( doc_id.offsetTop )) {
        _x += doc_id.offsetLeft;// - doc_id.scrollLeft
        _y += doc_id.offsetTop; //  - doc_id.scrollTop

        doc_id = doc_id.offsetParent;  //offsetParent if using iframes?
    }
*/
	//document.getElementById("test_results").innerHTML +=  _x+"<br />"; // for testing

doc_id = document.getElementById(id);

doc_width = doc_id.offsetWidth;
doc_height = doc_id.offsetHeight;
ih_width = ih_id.offsetWidth;
ih_height = ih_id.offsetHeight;

	new_x = ((dir%2) == 0)?Math.round((_x + (doc_width/2)) - (ih_width/2)):(dir == 1)?Math.round(_x -(ih_width) - pointer_hw - 6):Math.round(_x + (doc_width) + pointer_hw + 6);
	new_y = ((dir%2) == 1)?Math.round((_y + (doc_height/2)) - (ih_height/2)):(dir == 0)?Math.round(_y + doc_height + pointer_hw + 6):Math.round(_y - (ih_height) - pointer_hw - 6);

	ih_id.style.left = new_x + "px";
	ih_id.style.top = new_y + "px";



	if(current_dir != dir)  // if facing a different way
	 {
		if(pe_id.style.removeProperty)
		 {
			pe_id.style.removeProperty("top");
			pe_id.style.removeProperty("right");
			pe_id.style.removeProperty("bottom");
			pe_id.style.removeProperty("left");
			pe_id.style.removeProperty("border-top");
			pe_id.style.removeProperty("border-right");
			pe_id.style.removeProperty("border-bottom");
			pe_id.style.removeProperty("border-left");
			pe_id.style.removeProperty("border");
			pe_id.style.removeProperty("border-color");
		 } else {
			pe_id.style.removeAttribute("top");
			pe_id.style.removeAttribute("right");
			pe_id.style.removeAttribute("bottom");
			pe_id.style.removeAttribute("left");
		 }


		current_dir = dir;
	 }

		temp_dir = (dir == 0)?"top":(dir == 1)?"right":(dir == 2)?"bottom":"left"; // matching dir to name for style
		temp_dir2 = ((dir%2) == 0)?"left":"top"; // matching dir to name for style for centering
		temp_dir3 = (dir == 0)?"Bottom":(dir == 1)?"Left":(dir == 2)?"Top":"Right"; // matching dir to name for pointer

		eval("pe_id.style."+(temp_dir)+"= '"+Math.round((neg_margin))+"px';");
		eval("pe_id.style."+(temp_dir2)+"= '"+(Math.round((((dir%2) == 0)?ih_width:ih_height)/2 - (min_point_b/2)))+"px';");


		pe_id.style.borderTop = pointer_hw+"px"+" transparent solid";
		pe_id.style.borderRight = pointer_hw+"px"+" transparent solid";
		pe_id.style.borderBottom = pointer_hw+"px"+" transparent solid";
		pe_id.style.borderLeft = pointer_hw+"px"+" transparent solid";
		eval("pe_id.style.border"+(temp_dir3)+"= '"+pointer_hw+"px "+pe_id_bordercolor+" solid';");



ih_id.style.visibility = "visible";

	if(_time <= 0 || _time == null)
	 {
		doc_id.onmouseout = function () {
			ih_id.style.visibility = "hidden";
		}
	 } else {
		clearTimeout(t_close);
		t_close = setTimeout("ih_id.style.visibility = 'hidden';", (_time*1000));
	 }

new_x = 0;
new_y = 0;
_x = 0;
_y = 0;
temp_dir = "";
temp_dir2 = "";
temp_ih_hw="";

}



var obj_x = 0;
var obj_y = 0;

function show_user_menu()
{
var obj = document.getElementById("_user_menua");

obj.className ="hover_b_h top_selected";

    while(obj && !isNaN( obj.offsetLeft ) && !isNaN( obj.offsetTop )) {
        obj_x += obj.offsetLeft;
        obj_y += obj.offsetTop;

        obj = obj.offsetParent;
    }
obj = document.getElementById("_user_menua");

document.getElementById("menu").style.left = (obj_x - 61) + "px";
document.getElementById("menu").style.top = (obj_y + obj.offsetHeight)+ "px";
document.getElementById("menu").style.display = "block";
obj_x = 0;
obj_y = 0;
}


function exit_user_menu(obj2)
{
obj2.className ="hover_b_h";
document.getElementById("menu").style.display = "none";
}


var obj_parent_place;
var obj_parent_place2;
function hide_placeh(obj_placeh) // these will only work if placeholder is after input text and if placeholder is in an element (div etc.)
{
obj_parent_place = obj_placeh.parentNode.childNodes[1];
//obj_parent_place.setAttribute("class", "placeholder placeholderhide no_user_select");
//alert(obj_parent_place.id);
obj_parent_place.className = "placeholder placeholderhide no_user_select"; // IE7..
obj_parent_place = null;
}

function show_placeh(obj_placesh)
{
obj_parent_place = obj_placesh.parentNode;
obj_parent_place2 = obj_parent_place.childNodes[0].value;
if(obj_parent_place2 == "" || obj_parent_place2 == null)
{
obj_parent_place = obj_placesh.parentNode.childNodes[1];
//obj_parent_place.setAttribute("class", "placeholder no_user_select");
obj_parent_place.className = "placeholder no_user_select"; // IE7..
}
obj_parent_place = null;
obj_parent_place2 = null;
}

function _show_display_message(_d_me)
{
document.getElementById("display_messaget").innerHTML = _d_me;
document.getElementById("display_messaget").display = "block";
}

var new_select_o,new_li,new_inner_li,new_label,new_input,sel_length,temp_val_cl,temp_val_obj;
var new_li2,new_inner_li2,optgroup_s,t_a_function,t_max_len,t_sel_val,max_multiple,mult_name;
var t,t2,t_n3;
var global_num_created = 0;
var cur_number_s = 0;
var temp_sel_height = 0;
var t_x = 0;
var t_y = 0;
var t_parentn,t_li_n,t_titlen;
var container_height = 0;
var cwindow_y = 0;
var is_multiple = false;
var optgroup_c = "";
function change_selects(number_s) //number_s is the number of selects needed to be changed
{

cur_number_s = number_s + global_num_created;
for(var i6=global_num_created;i6<cur_number_s;i6++)
 {
eval("var global_sel_on"+i6+" = false");
	t_sel_val = document.getElementById("select_val"+i6);
	t_sel_val.style.position = "absolute"; // browser would act differently if visibility changed to hidden or display none
	t_sel_val.style.width = "0px";
	t_sel_val.style.height = "0px";
	t_sel_val.style.visibility = "hidden";
	t_a_function = (t_sel_val.getAttribute("data-a_function") != undefined && t_sel_val.getAttribute("data-a_function") != null)?t_sel_val.getAttribute("data-a_function"):"";
	if(t_a_function != ""){document.getElementById("good_select_title"+i6).setAttribute("data-a_function",t_a_function);}
	t_max_len = (t_sel_val.getAttribute("data-max_len") != undefined && t_sel_val.getAttribute("data-max_len") != null)?parseInt(t_sel_val.getAttribute("data-max_len")):0;
	new_select_o = document.getElementById("good_select_options"+i6);
	sel_length = t_sel_val.options;
	document.getElementById("good_select"+i6).style.display="block";

	is_multiple = (t_sel_val.getAttribute("data-multiple") == null || t_sel_val.getAttribute("data-multiple") == undefined || t_sel_val.getAttribute("data-multiple") == "")?false:true;
	max_multiple = (t_sel_val.getAttribute("data-max") == null || t_sel_val.getAttribute("data-max") == undefined || t_sel_val.getAttribute("data-max") == "")?0:parseInt(t_sel_val.getAttribute("data-max"));
	optgroup_s = (t_sel_val.getAttribute("optgroup") == null || t_sel_val.getAttribute("optgroup") == undefined || t_sel_val.getAttribute("optgroup") == "")?"":parseInt(t_sel_val.getAttribute("optgroup"));
	document.getElementById("good_select_title"+i6).setAttribute("data-max",max_multiple);
	//.createTextNode();sel_length[0].innerHTML
	
	//alert(document.getElementById("good_select_title"+i6).innerHTML);
	for(var i5=0;i5<sel_length.length;i5++)
	 {
	 if((i5 != 0 && is_multiple == true) || is_multiple == false)
	  {
		new_li = document.createElement("li");
		if(is_multiple == true)
		 {
		    mult_name = "p_"+t_sel_val.getAttribute("name");
		    if(optgroup_s != "")
		     {
			if(optgroup_c != sel_length[i5].innerHTML.substr(0,1))
			 {
				optgroup_c = sel_length[i5].innerHTML.substr(0,1);
				new_li2 = document.createElement("li");
				new_inner_li2 = document.createTextNode(optgroup_c);
				new_li2.appendChild(new_inner_li2);
				new_li2.setAttribute("class","good_select_opt");
				new_select_o.appendChild(new_li2);	
			 }
		     }
			//new_label = document.createElement("label");
			//new_label.setAttribute("for",("input"+i6+"_"+i5));
			new_input = document.createElement("input");
			new_input.setAttribute("type","checkbox");
			new_input.setAttribute("name",(mult_name+"[]"));
			new_input.setAttribute("id",("input"+i6+"_"+i5));
			new_input.setAttribute("value",sel_length[i5].value);
			if(max_multiple != 0){new_input.setAttribute("onclick","update_select2("+i6+",'li"+i6+"_"+i5+"',"+max_multiple+")");}
			new_li.appendChild(new_input);
		 }

		new_inner_li = document.createTextNode(sel_length[i5].innerHTML.replace("&amp;","&"));
		new_li.appendChild(new_inner_li);
		new_li.setAttribute("data-option_val",sel_length[i5].value);
		new_li.setAttribute("id","li"+i6+"_"+i5);
		if(sel_length[i5].selected){new_li.setAttribute("class",document.getElementById("good_select_title"+i6).getAttribute("data-liselected"));
			document.getElementById("good_select_title"+i6).innerHTML = (sel_length[i5].innerHTML.replace("&amp;","&").length > t_max_len && t_max_len != 0)?sel_length[i5].innerHTML.replace("&amp;","&").substr(0,t_max_len)+"...":sel_length[i5].innerHTML;
			document.getElementById("good_select_title"+i6).setAttribute("data-c_val",("li"+i6+"_"+i5));}

		if(is_multiple == true)
		 {
			//new_label.appendChild(new_li);
			new_select_o.appendChild(new_li);

			document.getElementById("li"+i6+"_"+i5).onclick = function(e) {
			if(e == null) {e = window.event;} // IE7,IE8
			t2 = e.target || e.srcElement;
			e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
			//document.getElementById("select_val"+parseInt(t2.id.substr(2,3))).value = t2.getAttribute("data-option_val");

		    if(!(t2.id.indexOf("input") > -1))
		      {
			if(t2.firstChild.checked == true) { t2.firstChild.checked=false;} else { t2.firstChild.checked=true;}
			max_multiple = document.getElementById("good_select_title"+parseInt(t2.id.substr(2,3))).getAttribute("data-max");
			if(max_multiple != 0){update_select2(parseInt(t2.id.substr(2,3)),t2.id,max_multiple);} else {
			}
		      }
			document.getElementById("good_select_title"+parseInt(t2.id.substr(2,3))).parentNode.parentNode.parentNode.style.zIndex="100";
		     }
		 } else {
			new_select_o.appendChild(new_li);

			document.getElementById("li"+i6+"_"+i5).onclick = function(e) {
			if(e == null) {e = window.event;} // IE7,IE8
			t2 = e.target || e.srcElement;
			e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
			t2.parentNode.style.visibility = "hidden";
			document.getElementById("select_val"+parseInt(t2.id.substr(2,3))).value = t2.getAttribute("data-option_val");
			eval("global_sel_on"+parseInt(t2.id.substr(2,3))+"=false");
			update_select(parseInt(t2.id.substr(2,3)),null,t2.id);
			document.getElementById("good_select_title"+parseInt(t2.id.substr(2,3))).parentNode.parentNode.parentNode.style.zIndex="100";
			}
		 }
		temp_val_obj = new_select_o.lastChild;
		try{temp_val_obj.onselectstart=function(){return false;}}catch(err2){}
	  } else {
		document.getElementById("good_select_title"+i6).innerHTML = sel_length[0].innerHTML;
		document.getElementById("good_select_title"+i6).setAttribute("data-c_val","");
	  }
	 }

	try{document.getElementById("good_select_title"+i6).onselectstart=function(){return false;}}catch(err2){}

		document.getElementById("good_select_title"+i6).onclick = function(e) {
		if(e == null) {e = window.event;} // IE7,IE8..
		t = e.target || e.srcElement;
		t_n3 = t.id.substr(17);
		t_li_n = document.getElementById("good_select_options"+t_n3);
		t_parentn = t_li_n.offsetHeight;
		t_titlen = t;
		t_x = 0;
		t_y = 0;
		//container_height = document.getElementById("cointainer").offsetHeight;
		while(t_titlen && !isNaN(t_titlen.offsetLeft) && !isNaN(t_titlen.offsetTop)) {
			t_x += t_titlen.offsetLeft;
			t_y += t_titlen.offsetTop;
			t_titlen = t_titlen.offsetParent;
		}
		if(eval("global_sel_on"+t_n3) == false){document.getElementById("good_select_options"+t_n3).style.visibility="visible";document.getElementById("good_select_title"+t_n3).parentNode.parentNode.parentNode.style.zIndex="101";eval("global_sel_on"+t_n3+" = true");} else {
		document.getElementById("good_select_options"+t_n3).style.visibility="hidden";document.getElementById("good_select_title"+t_n3).parentNode.parentNode.parentNode.style.zIndex="100";eval("global_sel_on"+t_n3+" = false");}
		t_titlen = t;
		cwindow_y = (window.pageYOffset)?window.pageYOffset:document.documentElement.scrollTop;
		if((t_y + t_parentn + t.offsetHeight) > (height2 - document.getElementById("footer_all").offsetHeight)) {t_li_n.style.top= "-"+(t_parentn)+"px";} else 
		if((t_y + t_parentn + t.offsetHeight) > (height1+cwindow_y)) {t_li_n.style.top= "-"+(t_parentn)+"px";} else {
			t_li_n.style.top= t.offsetHeight+"px";}
//alert((t_y + t_parentn + t.offsetHeight)+"\n"+(height1+cwindow_y));

		e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
//		t_n3 = (isNaN(parseInt(t.id.charAt((t.id.length-2)))))?t.id.substr((t.id.length-1),1):t.id.substr((t.id.length-2),1);
		}
	if (document.addEventListener) {  
		eval('document.addEventListener("click", function(){document.getElementById("good_select_options'+i6+'").style.visibility="hidden";document.getElementById("good_select_title'+i6+'").parentNode.parentNode.parentNode.style.zIndex="100";global_sel_on'+i6+' = false;}, false);');
	} else if (document.attachEvent)  {   // IE
		eval('document.attachEvent("onclick", function(){document.getElementById("good_select_options'+i6+'").style.visibility="hidden";document.getElementById("good_select_title'+i6+'").parentNode.parentNode.parentNode.style.zIndex="100";global_sel_on'+i6+' = false;}, false);');
	}

t_a_function = "";
global_num_created++;
is_multiple = false;
max_multiple = 0;
optgroup_c = "";
 }
}


var current_li_sel,new_li_sel,temp_new,t_a_function2;


function update_select(select_number,option_selected,new_id)
{

current_li_sel = document.getElementById("good_select_title"+select_number);
document.getElementById(current_li_sel.getAttribute("data-c_val")).className = "";
t_max_len = document.getElementById("select_val"+select_number);
t_max_len = (t_max_len.getAttribute("data-max_len") != undefined && t_max_len.getAttribute("data-max_len") != null)?parseInt(t_max_len.getAttribute("data-max_len")):0;

if(new_id != "" && new_id != null && new_id != undefined)
 {
	new_li_sel = document.getElementById(new_id);
	current_li_sel.setAttribute("data-c_val",new_id);
 } else {
	new_li_sel = document.getElementById("li"+select_number+"_"+option_selected);
	current_li_sel.setAttribute("data-c_val","li"+select_number+"_"+option_selected);
 }

t_a_function2 = current_li_sel.getAttribute("data-a_function");
if(t_a_function2 != "" && t_a_function2 != null && t_a_function2.indexOf("(") > -1) { try {eval(t_a_function2);} catch(err) {} }
new_li_sel.className = current_li_sel.getAttribute("data-liselected");
current_li_sel.innerHTML = (new_li_sel.innerHTML.replace("&amp;","&").length > t_max_len && t_max_len != 0)?new_li_sel.innerHTML.replace("&amp;","&").substr(0,t_max_len)+"...":new_li_sel.innerHTML;
}


var current_li_sel2, current_cval_m, c_val_array,count_c_arr;
var new_left=0;
function update_select2(select_number,new_id,max_mult)
{
current_li_sel2 = document.getElementById("good_select_title"+select_number);
current_cval_m = current_li_sel2.getAttribute("data-c_val");
if(current_cval_m != "")
{
if(current_cval_m.indexOf(new_id) > -1)
 {
	if(current_cval_m.indexOf(","+new_id) > -1)
	 {
		current_cval_m = current_cval_m.replace((","+new_id),"");
		c_val_array = current_cval_m.split(",");
		count_c_arr = c_val_array.length;
		new_left = max_mult - (count_c_arr);
	 } else
	if(current_cval_m.indexOf(new_id+",") > -1)
	 {
		current_cval_m = current_cval_m.replace((new_id+","),"");
		c_val_array = current_cval_m.split(",");
		count_c_arr = c_val_array.length;
		new_left = max_mult - (count_c_arr);
	 } else {
		current_cval_m = "";
		new_left = max_mult;
	 }
 } else {
	current_cval_m += ","+new_id;
	c_val_array = current_cval_m.split(",");
	count_c_arr = c_val_array.length;
	if(count_c_arr > max_mult)
	 {
	 }
	new_left = max_mult - count_c_arr;
 }
} else {
current_cval_m = new_id;
new_left = max_mult - 1;
}

if(new_left < 0)
 {
	change_specific_f("select_val"+select_number,"Maximum of "+max_mult+"!");
 } else {
	change_specific_t("select_val"+select_number,"Thanks!");
 }

//alert(new_left+"\n"+max_mult+"\n"+count_c_arr);
current_li_sel2.setAttribute("data-c_val",current_cval_m);
current_li_sel2.innerHTML = "Select "+new_left;
t4 = document.getElementById(new_id);
new_left = 0;
}

var npf_id = false;
var new_post_obj, newpostHeight;
var empty_post = true;
var hold_content_height = 0;
var hold_post_content = "";
function toggle_new_post(clear_vals) {

	if(clear_vals)
	 {
		remove_img_upload('img_post','post_img_data','close_x_img','img_picture','');
		//document.getElementById("nf_category").style.display="block";
		while(document.getElementById("cat_selected0").style.display == "block")
		 {
			document.getElementById("cs_0").click();
		 }
		set_new_post_vars(); // resets vars that control padding/width of category input box

		document.getElementById("new_post_category").style.width = new_post_textw+"px";
		document.getElementById("new_post_category").style.paddingLeft = new_post_textp+"px";
		document.getElementById("category_select").style.left = (new_post_textp+2)+"px";
		document.getElementById("cat_placeholder").style.left = new_post_placel+"px";

		document.getElementById("new_post_title").value="";
		document.getElementById("new_post_content").value="";
		document.getElementById("new_post_category").value="";

		document.getElementById("new_post_content").getAttribute("style");
		document.getElementById("new_post_content").removeAttribute("style");

		document.getElementById("new_post_category").getAttribute("style");
		document.getElementById("new_post_category").removeAttribute("style");

		hold_post_content = "";
		hold_content_height = 0;
	 } else { // attempting to post
		hold_content_height = document.getElementById("new_post_content").offsetHeight - 12;
		document.getElementById("new_post_content").getAttribute("style");
		document.getElementById("new_post_content").removeAttribute("style");
		hold_post_content = document.getElementById("new_post_content").value;
		document.getElementById("new_post_content").value = "";
	 }

	document.getElementById("img_picture").getAttribute("style");
	document.getElementById("img_picture").removeAttribute("style");

	//document.getElementById("new_post_content").style.height="20px";
	if(user_username != "" && R5_user != user_username)
	 {
		document.getElementById("nf_content_ph").innerHTML="@"+user_username;
	 } else {
		document.getElementById("nf_content_ph").innerHTML="New Post";
	 }
	document.getElementById("new_post").className = "new_post no_user_select";


	show_placeh(document.getElementById("new_post_title"));
	show_placeh(document.getElementById("new_post_content"));
	show_placeh(document.getElementById("new_post_category"));
	update_count_np();
	empty_post = true;
}

var c_np_chars = 0;
function update_count_np()
{
	c_np_chars = 1000 - document.getElementById("new_post_content").value.length;
	document.getElementById("n_remain_chars").innerHTML = c_np_chars;
	if(c_np_chars <= 25) {document.getElementById("n_remain_chars").style.color="#DD3333";} else {document.getElementById("n_remain_chars").style.color="#000";}

	new_post_obj = document.getElementById("new_post_content");
	newpostHeight = new_post_obj.scrollHeight; // Get the scroll height of the textarea
	if((newpostHeight-10) > 30){new_post_obj.style.maxHeight = (newpostHeight-10) + "px";new_post_obj.style.height = (newpostHeight-10) + "px";}
}

var c_rp_chars = 0;
var reply_post_obj;
var reply_post_ht = 0;
function update_count_rp(text_num)
{
	reply_post_obj = document.getElementById("reply_content"+text_num);
	c_rp_chars = 1000 - reply_post_obj.value.length;
	document.getElementById("r_remain_chars"+text_num).innerHTML = c_rp_chars;
	if(c_rp_chars <= 25) {document.getElementById("r_remain_chars"+text_num).style.color="#DD3333";} else {document.getElementById("r_remain_chars"+text_num).style.color="#000";}

	reply_post_ht = reply_post_obj.scrollHeight; // Get the scroll height of the textarea

	if((reply_post_ht-10) > 30){reply_post_obj.style.maxHeight = (reply_post_ht) + "px";reply_post_obj.style.height = (reply_post_ht) + "px";}
}

var hold_past_text = [];
function prompt_tag_layer(to_tag_id)
{
	var tag_obj = document.getElementById(to_tag_id);

	if(typeof hold_past_text[to_tag_id] == "undefined")
	 {
		hold_past_text[to_tag_id] = tag_obj.value;
	 }

	if(tag_obj.value.indexOf("@") > -1)
	 {
		//alert(get_caret_pos(tag_obj));
	 }
}

function get_caret_pos(gc_obj)
{
	if(gc_obj.selectionStart)
	 {
		return gc_obj.selectionStart;
	 }
}

function expand_post()
{
	if(empty_post)
	{
	close_notifications();
	if(user_username != "" && R5_user != user_username)
	 {
		document.getElementById("nf_content_ph").className = "placeholder placeholderhide no_user_select";
		document.getElementById("new_post_content").value="@"+user_username+" ";
	 }

	if(hold_post_content != "")
	 {
		document.getElementById("new_post_content").value = hold_post_content;
		document.getElementById("nf_content_ph").className = "placeholder placeholderhide no_user_select";
		hold_post_content = "";
	 }

	document.getElementById("nf_content_ph").innerHTML="Content";

// <span class=\"align_mid_img question_mark\" id=\"question_mark1\" onmouseover=\"javascript:info_message(this.id,0,8,'Type \\'@username\\' to tag person',0);\"></span>";
	//document.getElementById("n_remain_chars").style.display="block";
	//document.getElementById("nf_category").style.display="block";
	//document.getElementById("nf_post").style.display="block";
	//document.getElementById("nf_title").style.display="block";
	//document.getElementById("close_x").style.display="block";
	//document.getElementById("img_picture").style.display="block";
	//document.getElementById("new_post_content").style.height="45px";
		if(hold_content_height > 0)
		 {
			document.getElementById("new_post_content").style.height=hold_content_height+"px";
			document.getElementById("new_post_content").style.maxHeight=hold_content_height+"px";
		 }
	document.getElementById("new_post").className = "new_post new_post_expand no_user_select";
	empty_post = false;
	}
}

function expand(obj)
{
if(obj.innerHTML == "Expand")
 {
	obj.parentNode.style.height = "auto";
	obj.parentNode.parentNode.style.height = "auto";
	obj.innerHTML = "Collapse";

	if(obj.parentNode.offsetHeight < 67)
	 {
		obj.parentNode.style.height = "64px";
		obj.parentNode.parentNode.style.height = "90px";
	 }

 } else {
	obj.parentNode.style.height = "64px";
	obj.parentNode.parentNode.style.height = "90px";
	obj.innerHTML = "Expand";
 }
}

function expand_2(obj)
{
if(obj.innerHTML == "Expand")
 {
	obj.parentNode.style.height = "auto";
	obj.parentNode.parentNode.style.height = "auto";
	obj.innerHTML = "Collapse";

	if(obj.parentNode.offsetHeight < 67)
	 {
		obj.parentNode.style.height = "64px";
		obj.parentNode.parentNode.style.height = "90px";
	 }

 } else {
	obj.parentNode.style.height = "64px";
	obj.parentNode.parentNode.style.height = "90px";
	obj.innerHTML = "Expand";
 }
reset_img_height = true;
freset_img_height();
}

var xml_http19;
var loaded_votes = []; // counts how many votes we have loaded for each post/reply
var hold_v_list = []; // holds returned values of users; used if user closes out of upvotes and clicks to see upvotes again of same post; cuts down on http requests
var remove_v_list = []; // holds user's information if they change vote from up to downvote; if they change back to upvote that info will be replaced back in
var hold_p_id = [];
var hold_countpid1 = 0;
var hold_countpid2 = 0;
var current_list_len = 0; // how many are currently shown in the list
var current_page_up = ""; // any posts user has upvoted that user views the upvotes of will be kept track of here so if user downvotes, we will remove from that list if checked again
function open_upvotes(up_v_id,u_is_post)
{
	if(current_list_len > 0)
	 {
		while(document.getElementById("multi-use-bottom").firstChild)
		 {
			document.getElementById("multi-use-bottom").removeChild(document.getElementById("multi-use-bottom").firstChild);
		 }

		current_list_len = 0;
	 }
	document.getElementById("multi-use").style.display = "block";
	var multi_use_width = document.getElementById("multi-use").offsetWidth;
	get_inner = (document.documentElement.clientWidth || window.innerWidth);
	var pg_current_scroll = window.pageYOffset || document.documentElement.scrollTop;

	set_left = (get_inner > multi_use_width)?Math.round((get_inner-multi_use_width)/2):0;
	var set_top = pg_current_scroll + 75;
	if(have_fetched0 == false){fetch_categories(0,"");}
	document.getElementById("multi-use").style.left=set_left+"px";
	document.getElementById("multi-use").style.top=set_top+"px";

	document.getElementById("R5_background").style.opacity = ".85";
	document.getElementById("R5_background").style.filter = "Alpha(opacity=85)";
	document.getElementById("R5_background").style.background = "#FFF";
	document.getElementById("R5_background").style.display = "block";
	document.getElementById("R5_background").onclick=function(){toggle_browse(true);};

	if(loaded_votes[up_v_id] == undefined || loaded_votes[up_v_id] == null)
	 {
		loaded_votes[up_v_id] = 0;
	 }

	var post_type_char = u_is_post?"p":"r";

	var cen_v_id = u_is_post?id_hold[post_type_char+up_v_id]:post_type_char+up_v_id;
//alert(post_type_char+"\n"+up_v_id+"\n"+id_hold[post_type_char+up_v_id]);

	if(parseInt(document.getElementById("cen_vote"+cen_v_id).getAttribute("data-p_v")) > 0)
	 {
		if(loaded_votes[up_v_id] == 0)
		 {
			fetch_upvotes(up_v_id,u_is_post);
			hold_v_list[up_v_id] = "";
		 } else {
			add_v_middleman(hold_v_list[up_v_id],up_v_id,"saved");
		 }
	 } else {
		reset_v_end("No one has upvoted this post.",false,false);
		document.getElementById("multi-use-outer").style.background = "transparent";
	 }
}

var current_v_load = 0;
var current_v_ispost = 0;
function fetch_upvotes(up_v_id,u_is_post)
{
	current_v_load = up_v_id;
	current_v_ispost = u_is_post;
	document.getElementById("multi-use-outer").getAttribute("style");
	document.getElementById("multi-use-outer").removeAttribute("style");
	hold_p_id[hold_countpid1] = up_v_id;
	hold_countpid1++;

	xml_http19 = get_xml_http_obj();
		// document.getElementById("test_results").innerHTML += 'id='+up_v_id+'&is_post='+u_is_post+'&start='+loaded_votes[up_v_id]+'<br />';
/*
	var url="load_votes.php";
	xml_http19.onreadystatechange=r_state_changed19;
	xml_http19.open('POST',url,true);
	xml_http19.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http19.send('id='+up_v_id+'&is_post='+u_is_post+'&start='+loaded_votes[up_v_id]);
	*/
}

function r_state_changed19()
{
	if(xml_http19.readyState==4 || xml_http19.readyState=='complete')
	 {
		var vote_return = xml_http19.responseText;

		add_v_middleman(vote_return,hold_p_id[hold_countpid2],"new");
		// document.getElementById("test_results").innerHTML += vote_return+'<br />';
		hold_countpid2++;
	 }
}

function add_v_middleman(vote_return,h_p_id,v_type)
{
		var vote_list = clean_array(vote_return.split("*"));
		var vote_li_len = vote_list.length;

		var post_type_char = id_hold["p"+h_p_id]?"p":"r";
		var cen_v_id = (id_hold["p"+h_p_id])?id_hold["p"+h_p_id]:"r"+h_p_id;
		var upv_data = parseInt(document.getElementById("cen_vote"+cen_v_id).getAttribute("data-p_v"));

		if(vote_li_len > 0 && vote_return != "blank")
		 {
			if(v_type == "new")
			 {
				hold_v_list[h_p_id] += vote_return;
			 }
			for(var i=0;i<vote_li_len;i++)
			 {
				var v_items = vote_list[i].split(",");
				if(v_type == "new" && v_items[0] == R5_user)
				 {
					current_page_up += post_type_char+h_p_id+";";
				 }
						//$username,$avatar,$name,$description,$followers*
				add_user_votes(v_items[0],v_items[1],v_items[2],v_items[3],v_items[4]);
				loaded_votes[h_p_id]++;
			 }

			if(loaded_votes[h_p_id] >= upv_data || vote_li_len < 10) // if we change the 10, we must change include/load_votes.php - find comment with "*****vloadn" and change number
			 {
				reset_v_end("",false,true);
			 } else {
				reset_v_end("Load More.",true,false);
			 }
		 } else
		if(loaded_votes[h_p_id] == 0)
		 {
			reset_v_end("No one has upvoted this post.",false,false);
		 } else
		if(loaded_votes[h_p_id] >= upv_data)
	 	 {
			reset_v_end("",false,true);
		 } else {
			reset_v_end("",false,true);
		 }

		document.getElementById("multi-use-outer").style.background = "transparent";
}

			//$username,$avatar,$name,$description,$followers*
function add_user_votes(v_username,v_avatar,v_name,v_descript,v_followers)
{
	var vote_outer,vote_entire,vote_img_hold,vote_img_in,vote_u_info,vote_title,vote_l_user,vote_followers,vote_descript;

	var multi_use_bottom = document.getElementById("multi-use-bottom");
	vote_outer = document.createElement("a");
		vote_outer.className = "v_list_outer";
		vote_outer.href = R5_link_url+v_username; // R5_link_url is at top of post.js and must be set to "http://www.repfive.com/" when taken live
		multi_use_bottom.appendChild(vote_outer);

	vote_entire = document.createElement("span");
		vote_entire.className = "v_list_entire";
		vote_outer.appendChild(vote_entire);

	vote_img_hold = document.createElement("span");
		vote_img_hold.className = "v_img_outer";
		vote_entire.appendChild(vote_img_hold);

	vote_img_in = document.createElement("img");
		vote_img_in.className = "v_img_inner";
		vote_img_in.src = v_avatar;
		vote_img_hold.appendChild(vote_img_in);

	vote_u_info = document.createElement("span");
		vote_u_info.className = "v_list_info";
		vote_entire.appendChild(vote_u_info);

	vote_title = document.createElement("span");
		vote_title.className = "v_list_title";
		vote_u_info.appendChild(vote_title);

	vote_l_title = document.createElement("span");
		vote_l_title.className = "v_list_name";
		vote_l_title.innerHTML = v_name;
		vote_title.appendChild(vote_l_title);

	vote_l_user = document.createElement("span");
		vote_l_user.className = "v_list_username";
		vote_l_user.innerHTML = "@"+v_username;
		vote_title.appendChild(vote_l_user);

	vote_followers = document.createElement("span");
		//vote_followers.className = "v_list_";
		vote_followers.innerHTML = v_followers + " follower"+((parseInt(v_followers) != 1)?"s":"");
		vote_title.appendChild(vote_followers);

	vote_descript = document.createElement("span");
		vote_descript.className = "v_list_description";
		vote_descript.innerHTML = v_descript;
		vote_u_info.appendChild(vote_descript);

	current_list_len++;
}

function reset_v_end(v_in_text,is_active,remove)
{
	var v_end_obj = document.getElementById("v_list_end");
	if(v_end_obj)
	 {
		if(!remove)
		 {
			v_end_obj.style.display = "block";
			v_end_obj.innerHTML = v_in_text;
			v_end_obj.className = "v_list_end"+((is_active)?" v_list_active":"");
			if(is_active)
			 {
				v_end_obj.onclick = function(){fetch_upvotes(current_v_load,current_v_ispost);};
			 } else {
				v_end_obj.onclick = null;
			 }
		 } else {
			v_end_obj.style.display = "none";
		 }
	 } else
	if(!remove)
	 {
		var outer_end_v = document.createElement("a");
			outer_end_v.className = "v_list_end"+((is_active)?" v_list_active":"");
			outer_end_v.id = "v_list_end";
			outer_end_v.innerHTML = v_in_text;
			if(is_active)
			 {
				outer_end_v.onclick = function(){fetch_upvotes(current_v_load,current_v_ispost);};
			 }
			document.getElementById("multi-use-contain").appendChild(outer_end_v); // this make it appear directly below the upvotes
	 }
}