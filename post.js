var R5_link_url = "http://www.repfive.com/"; // for live: "http://www.repfive.com/"

var xml_http;
function get_xml_http_obj()
{
	var xmlhttp=null;
	try {
		xmlhttp=new XMLHttpRequest();
	 } catch (err) {
		try {
			xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');
		 } catch (err) {
			xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
		 }
	 }
	return xmlhttp;
}

var br_dist_current = 0;
var br_title_current = "browse";
var first_br_change = false;
function browse_change(id_change)
{
	if(!first_br_change)
	 {
		var temp_pop_setlist =  {
					1:{"category":"Humor","id":178462557},
					2:{"category":"Sports","id":21},
					3:{"category":"Bodybuilding","id":488993492},
					4:{"category":"Miami Hurricanes Football","id":1},
					5:{"category":"Food and Beverage","id":26}
					};
		for(var key in temp_pop_setlist)
		 {
			var temp_id_category = replace_spaces(temp_pop_setlist[key].category);

			hold_cat_ids[temp_id_category] = temp_pop_setlist[key].id;

			u_cat_private[temp_id_category] = false;
		 }

		first_br_change = true;
	 }
	var browse_title_arr = {"browse":"cat_browse_title","popular":"cat_browse_title2"};
	var browse_wrap_id = {"browse":"browse_wrap_main","popular":"browse_wrap_popular"};
	var browse_title_main = {"browse":" br_title_main","popular":""}; // only "browse" has any value for it; if adding more options, do the same for it as "popular"
	var br_distance_arr = {"browse":0,"popular":74};
	if(br_dist_current != br_distance_arr[id_change])
	 {
		move_browse_ch(br_distance_arr[id_change],(br_distance_arr[id_change]-br_dist_current));
		document.getElementById(browse_title_arr[id_change]).className = "browse_title"+browse_title_main[id_change]; // update the currently selected one
		document.getElementById(browse_title_arr[br_title_current]).className = "browse_title browse_title_not_sel"+browse_title_main[br_title_current]; // reset the previously selected one

		document.getElementById(browse_wrap_id[id_change]).style.display = "block"; // show the selected list
		document.getElementById(browse_wrap_id[br_title_current]).style.display = "none"; // hide the previous list
		br_title_current = id_change;
	 }
}

function move_browse_ch(max_to,distance_travel)
{
	var num_browse_moves = 6;
	var num_decrease_by = Math.round(distance_travel/num_browse_moves);

	// below makes it appear to slow down as it slides right or left
	var temp_br_dist = br_dist_current + num_decrease_by - Math.round((num_decrease_by-(3*(num_decrease_by/Math.abs(num_decrease_by))))/Math.ceil((Math.abs(max_to - br_dist_current)*.1)));
		//document.getElementById("test_results").innerHTML += br_dist_current +" + "+ num_decrease_by +" - "+ Math.round((num_decrease_by-(3*(num_decrease_by/Math.abs(num_decrease_by))))/Math.ceil((Math.abs(max_to - br_dist_current)*.1)))+"<br />";;
	var aaaaaa_repeat = false;

	if(distance_travel > 0 && temp_br_dist < max_to)
	 {
		document.getElementById("browse_title_selected").style.left = temp_br_dist+"px";
		br_dist_current = temp_br_dist;
		aaaaaa_repeat = true;
	 } else
	if(distance_travel < 0 && temp_br_dist > max_to)
	 {
		document.getElementById("browse_title_selected").style.left = temp_br_dist+"px";
		br_dist_current = temp_br_dist;
		aaaaaa_repeat = true;
	 } else {
		document.getElementById("browse_title_selected").style.left = max_to+"px";
		br_dist_current = max_to;
	 }

	if(aaaaaa_repeat)
	 {
		var temp_repeat_move = setTimeout(function(){move_browse_ch(max_to,distance_travel);},10);
	 }
}

function setCookie(c_name,value,expire_days)
{
R5_expire_date=new Date();
R5_expire_date.setDate(R5_expire_date.getDate() + expire_days);
R5_c_value=escape(value) + ((expire_days==null) ? "" : "; expires="+R5_expire_date.toUTCString());
document.cookie=c_name + "=" + R5_c_value;
}


var R5_c_value, R5_c_begin;
function getCookie(c_name)
{
R5_c_value = document.cookie;
R5_c_begin = R5_c_value.indexOf(" " + c_name + "=");
if (R5_c_begin == -1)
 {
	R5_c_begin = R5_c_value.indexOf(c_name + "=");
 }
if (R5_c_begin == -1)
 {
	R5_c_value = null;
 } else {
	R5_c_begin = R5_c_value.indexOf("=", R5_c_begin) + 1;
	R5_c_end = R5_c_value.indexOf(";", R5_c_begin);
	if (R5_c_end == -1)
	 {
		R5_c_end = R5_c_value.length;
	 }
	R5_c_value = unescape(R5_c_value.substring(R5_c_begin,R5_c_end));
 }

return R5_c_value;
}


var used_labels = 0; // the number of labels currently being used
var check_cat_val = "";
var changed_lbl = 0;
var num_results = 0;
var url;
var i=0;
var hold_cs_lim=[];
var in_h_cs_l1=0;
var in_h_cs_l2=0;
var hold_check_cat=[]; // fixes bug that caused incorrect value to be saved to override_pav when typing faster than the results came in
var hold_c_count1=0;
var hold_c_count2=0;


function category_select(limit)
{

	xml_http=get_xml_http_obj();
	if(xml_http==null)
	 {
		return;
	 }
	hold_cs_lim[in_h_cs_l1] = limit;
	in_h_cs_l1++;
//document.getElementById("test_results").innerHTML += check_cat_val+"<br />";

	hold_check_cat[hold_c_count1] = check_cat_val;
	hold_c_count1++;

	url='category_fill.php';
	/*
	xml_http.onreadystatechange=r_state_changed;
	xml_http.open('POST',url,true);
	xml_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http.send('text='+check_cat_val+'&limit='+limit+'&start='+search_used);
	*/
}

var cat_split,cat_split2,temp_cat_split,temp_cat_split2;
var temp_recent_cat = "";
var u_cat_private=[]; // for each loaded category will say if it is private or not
function r_state_changed()
{
if(xml_http.readyState==4 || xml_http.readyState=='complete')
 {
	R5_rec=xml_http.responseText;
	if(R5_rec != "" && R5_rec != null)
	 {
		cat_split = clean_array(R5_rec.split(","));
		//cat_split.splice((cat_split.length-1),1);
		num_results = cat_split.length;
		//cat_split2 = cat_split.slice(0);

		temp_recent_cat = ","+current_list.join(",")+","+create_lbl_list.join(",")+","; // makes sure there are no duplicates
//document.getElementById("test_results").innerHTML += temp_recent_cat+"<br />"; // for testing

		for(i = 0;i<cat_split.length;i++)
		 {
			temp_cat_split = cat_split[i].split(";");
			temp_cat_split2 = replace_spaces(temp_cat_split[0]);

			hold_cat_ids[temp_cat_split2] = temp_cat_split[2];

			if(temp_cat_split[1] == "1")
			 {
				u_cat_private[temp_cat_split2] = true;
			 } else {
				u_cat_private[temp_cat_split2] = false;
			 }

			if(temp_recent_cat.indexOf(","+temp_cat_split[0]+",") == -1)
			 {
				cat_split[i] = "<b>" + ucfirstlet(hold_check_cat[hold_c_count2]) + "</b>" + temp_cat_split[0].substr(hold_check_cat[hold_c_count2].length);
				add_label2(cat_split[i],"search",temp_cat_split[0]); // add results to create_lbl_list
			 }
		 }

		if(hold_cs_lim[in_h_cs_l2] == num_results) // ex: if user types in "m" and then types in "mi" and we asked to load 5, and 5 were loaded, we must search again if user types in "mia" b/c more categories may exist
		 {
			override_pav += hold_check_cat[hold_c_count2]+",";
//document.getElementById("test_results").innerHTML += "<b>"+hold_cs_lim[in_h_cs_l2]+"::"+num_results+"</b><br />"; // for testing
		 }
		create_labels(1); // add the new results to the list

		if(hold_cs_lim[in_h_cs_l2] == num_results && hold_check_cat[hold_c_count2] != check_cat_val) // we use part of the same if block as directly above b/c this must be done after create_labels(1) which must be done after we set override_pav; also means that check_cat_val changed while loading
		 {
			create_labels(0); // calls with parameter of 0, which is what is called when the user types
		 }
	 }
	in_h_cs_l2++;
	hold_c_count2++;
 }
}

var create_lbl_list = [];
var num_at = 0;
function add_label2(in_category,cat_type,actual_val) // every time a new query is made against server, all category results are added here
{
create_lbl_list[num_at] = new Array(in_category,cat_type,actual_val);
num_at += 1;
}

var search_used_list = []; // those that are in the current_list that are from being searched on the server
var current_list = []; // the list of categories that are being shown
var recent_used = 0; // the number of recently posted categories that are currently SHOWN
var search_used = 0; // the number of searched categories that are currently SHOWN
var d = 0;
var d4 = 0;
var d6 = 0;
var d7 = 0;
var replace_search = false;
var just_removed = 0;
var previous_val = "";
var previous_all_val = ",";
var override_pav=","; // when loading list, if 8 results are loaded on the screen, that means there could be more that exist that weren't loaded, without this, typing more letters fails to load more
var previous_total = 0;
var temp_prev_ar,temp_new_label;
var parent_prefix = ""; // when creating a new category, we use the same functions to generate the list from what the user types; the value of this will be "parent_" to refer to that element when user is creating a new category
function create_labels(caller) // *** errors occurring in returned results usually somehow relate to the variables search_used or recent_used somehow becoming negative OR search_used_list not effectively being updated
{
document.getElementById(parent_prefix+"category_select").style.display = (caller <= 2)?"block":"none";

check_cat_val = replace_dashes(document.getElementById(parent_prefix+"new_post_category").value);
//document.getElementById("test_results").innerHTML += parent_prefix+"new_post_category"+"<br />"; // for testing
//if(create_lbl_list.length > 0)
// {
	create_lbl_list.sort(function(a,b){ if(a[1] == b[1]){return 0;} else if(a[1] == "recent"){return -1;} else if(b[1] == "recent"){return 1;}});

	if(recent_count > 0) // prepare recent first (if there are any)
	 {
//empty_create_lbl(0);
		if(recent_used > 0) // check below to see even with more letters if the recent still matches
		 {
			d6=recent_used;
			d4=0;
			for(d = 0;d<d6;d++)
			 {
				if(current_list[d-d4][2].substr(0,check_cat_val.length).toLowerCase() == check_cat_val.toLowerCase() && set_string.indexOf(";"+current_list[d-d4][2]+";") == -1)
				 {
					//document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).innerHTML = "<b>" + current_list[d-d4][2].substr(0,check_cat_val.length) + "</b>" + current_list[d-d4][2].substr(check_cat_val.length);
				 } else {

					document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])));
					recent_used -= 1;
					just_removed += 1;
					create_lbl_list.splice(0,0,new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));
					current_list.splice(d-d4,1);
					d4+=1;
				 }
			 }
		 }

		if((recent_used) < 4 && (recent_used+just_removed) < recent_count)  // recheck all recent - if there are recently posted categories that aren't being used they should be checked
		 {
			d = 0;
			d4=0;
			d6=recent_used;
			
			while (recent_used < 4 && d < (recent_count - d6))
			 {
				if(create_lbl_list[d-d4][2].substr(0,check_cat_val.length).toLowerCase() == check_cat_val.toLowerCase() && set_string.indexOf(";"+create_lbl_list[d-d4][2]+";") == -1)
				 {
/*
					if(current_list.length > recent_used)
					 {
						for(var d2 = recent_used;d2<current_list.length;d2++)
						 {
							document.getElementById("cat_"+replace_spaces(current_list[d2][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d2][2])));
							create_lbl_list.push(new Array(search_used_list[d2-recent_used][0],search_used_list[d2-recent_used][1],search_used_list[d2-recent_used][2]));

			document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])));
			search_used -= 1;
			create_lbl_list.push(new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));
			current_list.splice(d-d4,1);
			search_used_list.splice(((d-d4)-search_used),1);
			d4+=1;
						 }
					 }
*/

					add_label(create_lbl_list[d-d4][0],create_lbl_list[d-d4][1],create_lbl_list[d-d4][2]);
				//	var temp_c_list_hold = current_list.splice(recent_used,(current_list.length-recent_used)); // remove all at the end; must replace the search values
				//	current_list.push(new Array(create_lbl_list[d-d4][0],create_lbl_list[d-d4][1],create_lbl_list[d-d4][2]));

		current_list.splice(recent_used,0,new Array(create_lbl_list[d-d4][0],create_lbl_list[d-d4][1],create_lbl_list[d-d4][2]));
					create_lbl_list.splice(d-d4,1);

					//create_lbl_list = create_lbl_list.concat(temp_c_list_hold);
				//	search_used_list.length = 0;
					recent_used += 1;
					d4+=1;
				//	search_used = 0;
					replace_search = true;
				 }
				d++;
			 }

		 }

		just_removed = 0;
	 }

	create_lbl_list = clean_array(create_lbl_list);

	if(check_cat_val != "") // check search used below
	 {
		if(search_used > 0) // check below to see even with more letters if the search still matches
		 {

//document.getElementById("test_results").innerHTML += recent_used+"::<br />";
			d6=search_used-t_reset_shown;
			d4=0;
			for(d = recent_used;d<(recent_used+d6);d++)
			 {
				if(current_list[d-d4][2].substr(0,check_cat_val.length).toLowerCase() == check_cat_val.toLowerCase() && set_string.indexOf(";"+current_list[d-d4][2]+";") == -1)
				 {
					document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).innerHTML = "<b>" + current_list[d-d4][2].substr(0,check_cat_val.length) + "</b>" + current_list[d-d4][2].substr(check_cat_val.length);

					if(u_cat_private[replace_spaces(current_list[d-d4][2])])
					 {
						R5_sp=document.createElement("span");
						R5_sp.className = "private_category";
						//R5_sp.title = "This category is private";
						R5_sp.id = "private_sym_"+replace_spaces(replace_spaces(current_list[d-d4][2]));
						R5_sp.onmouseover = function(){info_message(this.id,3,8,"This category is private",0,"#fff","#000","#000",255,.75);}
						document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).appendChild(R5_sp);
					 }

				 } else {
					document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])));
					search_used -= 1;
					create_lbl_list.push(new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));
					current_list.splice(d-d4,1)
					search_used_list.splice(((d-d4)-recent_used),1);
					d4 += 1;
				 }
			 }
		 }
		if((search_used+recent_used) < 8)//recheck all search (as user types more letters, deletes some, and retypes letters: since there is a max of 8 shown, if a newly typed letter takes out some of the currently shown, we may have already queried server)
		 {
			d = recent_count-recent_used;
			d4=0;
			d7 = create_lbl_list.length;
			d6=search_used;
			while ((search_used+recent_used) < 8 && d < d7)
			 {
				if(create_lbl_list[d-d4][2].substr(0,check_cat_val.length).toLowerCase() == check_cat_val.toLowerCase() && set_string.indexOf(";"+create_lbl_list[d-d4][2]+";") == -1)
				 {
					temp_new_label = "<b>" + create_lbl_list[d-d4][2].substr(0,check_cat_val.length) + "</b>" + create_lbl_list[d-d4][2].substr(check_cat_val.length);
					add_label(temp_new_label,create_lbl_list[d-d4][1],create_lbl_list[d-d4][2]);
					current_list.push(new Array(create_lbl_list[d-d4][0],create_lbl_list[d-d4][1],create_lbl_list[d-d4][2]));
					search_used_list.push(new Array(create_lbl_list[d-d4][0],create_lbl_list[d-d4][1],create_lbl_list[d-d4][2]));
					create_lbl_list.splice(d-d4,1);
					search_used += 1;
					d4+=1;
				 }
				d++;
			 }

	//	empty_create_lbl("1");
		 }

		//document.getElementById("test_results").innerHTML += previous_all_val.indexOf(check_cat_val); // for testing without using alert b/c of focus issues
				//  if((search_used+recent_used) < 8 && caller == 0 && !((check_cat_val.indexOf(previous_val) == 0 && previous_val != "" && previous_total < 8) || previous_all_val.indexOf(","+check_cat_val.substr(0,1)) > -1))
				//  ^ changes made because if a user types quickly it will skip searching the first letters typed. the above would make it impossible to search for certain categories under that situation:
				//  ^ EX: if user quickly types "mi", and subsequently deletes "i" so the value is "m", the above will not search for m because it thinks it already has
		if((search_used+recent_used) < 8 && caller == 0 && !(is_cat_loaded(previous_all_val,check_cat_val)))
		 {
			//temp_prev_ar = previous_all_val.split(",");

			previous_all_val += check_cat_val+",";

			// document.getElementById("test_results").innerHTML += previous_all_val+"<br />"; // for testing
			category_select((8 - (search_used+recent_used)));

		 }
/* else {

			if(check_cat_val != "" && !((search_used+recent_used) < 8 && a == 0 && !(is_cat_loaded(previous_all_val,check_cat_val))))
			 {
		//	if(R5_user=="john"){document.getElementById("test_results").innerHTML += "HERE::"+(previous_all_val)+"::1:"+(((search_used+recent_used) < 8)?"true":"false")+"::2:"+((a == 0)?"true":"false")+"::3:"+((!(is_cat_loaded(previous_all_val,check_cat_val)))?"true":"false")+"<br />";} // for testing
			 }
		 }
*/
		//document.getElementById("test_results").innerHTML += "<br />"; // for testing

		previous_val = check_cat_val;
		previous_total = (search_used+recent_used);

	 } else
	if(search_used > 0) // take out all search used and put them into create_lbl_list for later use
	 {
//document.getElementById("test_results").innerHTML += "greater than 1<br />"; // for testing
		d4=0;
		d7 = current_list.length;
		for(d = recent_used;d<d7;d++)
		 {
			document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])));
			search_used -= 1;
			create_lbl_list.push(new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));
			current_list.splice(d-d4,1);
			search_used_list.splice(((d-d4)-search_used),1);
			d4+=1;
		 }

	//	empty_create_lbl("2");

		previous_val = check_cat_val;
		previous_total = (search_used+recent_used);
	 }

document.getElementById(parent_prefix+"category_select").style.display = (current_list.length > 0 && caller <= 2)?"block":"none";
}

var i_ccl = 0;
var t_reset_shown = 0;
function category_create_labels() // for when searching parent categories (while creating a new category) and at the same time the user has already selected 1+ categories for a new post (yes, this will rarely be used)
{
	if((search_used+recent_used) < 8 && count_t_reset > 0)
	 {
		for(i_ccl=0;i_ccl<count_t_reset;i_ccl++)
		 {
			if(check_cat_val != "" && create_lbl_list2[i_ccl][2].substr(0,check_cat_val.length).toLowerCase() == check_cat_val.toLowerCase() && (search_used+recent_used) < 8)
			 {
				if(create_lbl_list2[i_ccl][1] == "true")
				 {
					document.getElementById("parent_category_select").style.display = "block";
					document.getElementById("cat_"+replace_spaces(create_lbl_list2[i_ccl][2])).innerHTML = "<b>" + create_lbl_list2[i_ccl][2].substr(0,check_cat_val.length) + "</b>" + create_lbl_list2[i_ccl][2].substr(check_cat_val.length);

				 } else {
					document.getElementById("parent_category_select").style.display = "block";
					create_lbl_list2[i_ccl][1] = "true";
					add_label(create_lbl_list2[i_ccl][0],"search",create_lbl_list2[i_ccl][2]);
					search_used++;
					t_reset_shown++;
				 }

			 } else {
				if(create_lbl_list2[i_ccl][1] == "true")
				 {
					create_lbl_list2[i_ccl][1] = "false";
					document.getElementById("cat_"+replace_spaces(create_lbl_list2[i_ccl][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(create_lbl_list2[i_ccl][2])));
					search_used--;
					t_reset_shown--;
				 }
			 }
		 }
	 }
}

var isc=0;
var c_s_s_length = 0;
var loaded_continue = 0;
function is_cat_loaded(all_previous_loaded,current_search_str)
{
//document.getElementById("test_results").innerHTML += "search::"+current_search_str+"<br />"; // for testing
	c_s_s_length = current_search_str.length;
	for(isc=c_s_s_length;isc>0;isc--)
	 {
		loaded_continue = all_previous_loaded.indexOf(","+current_search_str.substr(0,isc)+",");
		var l_con2=override_pav.indexOf(","+current_search_str.substr(0,isc)+",");
		if(loaded_continue != -1 && l_con2 == -1)
		 {
			return true;
		 }
	 }

	return false;
}

/*
// * for dumping contents of create_lbl_list or current_list for testing
var ixc;
function empty_create_lbl(input_num)
{
//document.getElementById("test_results").innerHTML += "<b>"+input_num+"</b><br />"; // for testing
for(ixc=0;ixc<create_lbl_list.length;ixc++)
{
try{
//document.getElementById("test_results").innerHTML += create_lbl_list[ixc][2]+"<br />"; // for testing
} catch(err){}
}
//document.getElementById("test_results").innerHTML += "<br />"; // for testing

}
function empty_current_list(input_num)
{
//document.getElementById("test_results").innerHTML += "<b>"+input_num+"</b><br />"; // for testing
for(ixc=0;ixc<current_list.length;ixc++)
{
try{
//document.getElementById("test_results").innerHTML += current_list[ixc][0]+"<br />"; // for testing
} catch(err){}
}
//document.getElementById("test_results").innerHTML += "<br />"; // for testing

}
// *
*/
function clean_array(original_array)
{
	var new_array = [];
	for(var i4 = 0; i4<original_array.length; i4++)
	 {
		if(original_array[i4])
		 {
			new_array.push(original_array[i4]);
		 }
	 }
	return new_array;
}

function pop_addc(pop_cat)
{
	var pop_id_arr = {"Sports":21,"Miami Hurricanes Football":1,"Humor":178462557};
	var temp_id_pop = replace_spaces(pop_cat);
	hold_cat_ids[temp_id_pop] = pop_id_arr[pop_cat];

	u_cat_private[temp_id_pop] = false;

	cat_chosen(document.getElementById("suggest-"+pop_id_arr[pop_cat]),false);
	document.getElementById("new_post_category").focus();
	//add_label2((pop_cat+";0;"+pop_id_arr[pop_cat]),"search",temp_id_pop); // add results to create_lbl_list

	//alert(pop_id_arr[pop_cat]);
}

var new_post_textw,new_post_textp,new_post_placel;
function set_new_post_vars()
{
	new_post_textw = 550;
	new_post_textp = 5;
	new_post_placel = 14;
}
set_new_post_vars();
// set_category is ordered by position, not by element id # (0 is farthest left,1 is in the middle, and 2 is farthest right)
var set_category = new Array(new Array(3),new Array(3),new Array(3)); // [0] for is visible?;[1] for value held;[2] for id #
set_category[0][0] = false;
set_category[1][0] = false;
set_category[2][0] = false;
set_category[0][2] = 0;
set_category[1][2] = 0;
set_category[2][2] = 0;
var hold_ltext = "";
var offset_cat = 0;
var is_disabled = false;
var set_string = ""; // string form of set_category[x][1] for index of searching when creating labels
function cat_chosen(obj,re_order) // when a user selects a category to post in this is called
{
		//document.getElementById("test_results").innerHTML += set_string+":cat_chosen<br />";

if(top_bar_browse) { window.location = R5_link_url+"category/"+obj.getAttribute("data-ltext").replace(/[ ]/g,"-");return;}; // if the browse window is open via the "Browse" link on the top bar

if(parent_prefix == "")
 {
	if(x_changed == true)
	 {
		set_string = "";
		document.getElementById("b_selected0").style.display = "none";
		document.getElementById("b_selected1").style.display = "none";
		document.getElementById("b_selected2").style.display = "none";

		document.getElementById("cat_selected0").style.display = "none";
		document.getElementById("cat_selected1").style.display = "none";
		document.getElementById("cat_selected2").style.display = "none";
		x_changed = false;
	 }
	for(var s=0;s<3;s++)
	 {
		if(s == 0 && (set_category[0][0] == true || re_order == false))
		 {
			document.getElementById("cat_placeholder").innerHTML = "Secondary category <span style='font-size:10px;'>(Up to 3 Total)</span>";
		 } else
		if(s == 0 && set_category[0][0] != true)
		 {
			document.getElementById("cat_placeholder").innerHTML = "Primary category <span style='font-size:10px;'>(Up to 3 Total)</span>";
		 }

		hold_ltext = (re_order == false)?obj.getAttribute("data-ltext"):"";
		if(set_category[s][0] == false && re_order == false && set_string.indexOf(";"+hold_ltext+";") == -1)
		 {
			set_category[s][0] = true;
			set_category[s][1] = hold_ltext;
			document.getElementById("cat_sel_hold"+s).innerHTML = hold_ltext;
			document.getElementById("cat_selected"+s).style.display = "block";
			document.getElementById("cat_selected"+s).title = hold_ltext;

			set_string += ";"+hold_ltext+";";
			document.getElementById("b_sel_hold"+s).innerHTML = hold_ltext;
			document.getElementById("b_selected"+s).style.display = "block";

			document.getElementById("cat_selected"+s).style.fontSize = "12px";
			offset_cat = document.getElementById("cat_selected"+s).offsetWidth;
			if(offset_cat >= 177) // width of text is >= max size so make font smaller
			 {
				document.getElementById("cat_selected"+s).style.fontSize = "11px";
				offset_cat = document.getElementById("cat_selected"+s).offsetWidth;
			 }
			if(offset_cat >= 177) // width of text is still >= max size so make font smaller again
			 {
				document.getElementById("cat_selected"+s).style.fontSize = "10px";
				offset_cat = document.getElementById("cat_selected"+s).offsetWidth;
			 }
			new_post_textp += offset_cat+5; // 5 px to account for margin
			new_post_textw -= offset_cat+5;
			new_post_placel += offset_cat+5;
			set_category[s][2] = offset_cat;

			document.getElementById("new_post_category").value = "";
			document.getElementById("cat_placeholder").className = "placeholder no_user_select";
			document.getElementById("new_post_category").style.width = new_post_textw+"px";
			document.getElementById("new_post_category").style.paddingLeft = new_post_textp+"px";
			document.getElementById("category_select").style.left = (new_post_textp+2)+"px";
			document.getElementById("cat_placeholder").style.left = new_post_placel+"px";

			if(b_is_shown == false)
			 {
				document.getElementById("new_post_category").focus();
			 }

			if(s == 2) // all 3 are now used
			 {
				document.getElementById("cat_placeholder").style.display = "none";
				document.getElementById("new_post_category").style.backgroundColor = "#f7f7f7";
				document.getElementById("new_post_category").disabled = "true";
clear_labels2();
				document.getElementById("new_post_category").blur();
				is_disabled = true;
			 }
			break;
		 } else
		if(set_category[s][0] == true)
		 {
			hold_ltext = set_category[s][1];
			set_string += ";"+hold_ltext+";";
			document.getElementById("b_sel_hold"+s).innerHTML = hold_ltext;
			document.getElementById("b_selected"+s).style.display = "block";

			document.getElementById("cat_sel_hold"+s).innerHTML = hold_ltext;
			document.getElementById("cat_selected"+s).style.display = "block";
			document.getElementById("cat_selected"+s).title = hold_ltext;

			if(re_order == true){change_place_pos(s);}
		 } else
		if(!set_category[s][0] && re_order)
		 {
			document.getElementById("b_sel_hold"+s).innerHTML = "";
		 }
	 }
 } else {
	parent_cat_chosen(obj);
	close_category_browse();
 }
}

var offset_cat2=0;
function change_place_pos(s)
{
			document.getElementById("cat_selected"+s).style.fontSize = "12px";
			offset_cat = set_category[s][2];
			offset_cat2 = document.getElementById("cat_selected"+s).offsetWidth;
			if(offset_cat2 >= 177) // width of text is >= max size so make font smaller
			 {
				document.getElementById("cat_selected"+s).style.fontSize = "11px";
				offset_cat2 = document.getElementById("cat_selected"+s).offsetWidth;
			 }
			if(offset_cat2 >= 177) // width of text is still >= max size so make font smaller again
			 {
				document.getElementById("cat_selected"+s).style.fontSize = "10px";
				offset_cat2 = document.getElementById("cat_selected"+s).offsetWidth;
			 }

			document.getElementById("new_post_category").value = "";
			document.getElementById("new_post_category").style.width = new_post_textw+"px";
			document.getElementById("new_post_category").style.paddingLeft = new_post_textp+"px";
			document.getElementById("category_select").style.left = (new_post_textp+2)+"px";
			document.getElementById("cat_placeholder").style.left = new_post_placel+"px";
			set_category[s][2] = offset_cat;

			if(b_is_shown == false && ((s!=2 && set_category[s+1][0] == false) || (s==2)))
			 {
				document.getElementById("new_post_category").focus();
			 }

			if(s == 2) // all 3 are now used
			 {
				document.getElementById("cat_placeholder").style.display = "none";
				document.getElementById("new_post_category").style.backgroundColor = "#f7f7f7";
				document.getElementById("new_post_category").disabled = "true";
				document.getElementById("new_post_category").blur();
				is_disabled = true;
			 }
offset_cat2 = 0;
}


var temp_c_id = 0;
var x_changed = false;
function x_category(num)
{
	if(is_disabled) // all 3 are now used
	 {
		remove_clear2();
		document.getElementById("cat_placeholder").style.display = "block";
				document.getElementById("new_post_category").style.backgroundColor = "#fff";
		document.getElementById("new_post_category").disabled = "";
		is_disabled = false;
	 }
	offset_cat = document.getElementById("cat_selected"+num).offsetWidth;
	new_post_textp -= offset_cat+5; // 5 px to account for margin
	new_post_textw += offset_cat+5;
	new_post_placel -= offset_cat+5;

	document.getElementById("new_post_category").style.width = new_post_textw+"px";
	document.getElementById("new_post_category").style.paddingLeft = new_post_textp+"px";
	document.getElementById("category_select").style.left = (new_post_textp+2)+"px";
	document.getElementById("cat_placeholder").style.left = new_post_placel+"px";

	document.getElementById("cat_sel_hold"+num).innerHTML = "";
	document.getElementById("cat_selected"+num).getAttribute('style');
	document.getElementById("cat_selected"+num).removeAttribute('style');

	document.getElementById("b_sel_hold"+num).innerHTML = "";
	document.getElementById("b_selected"+num).style.display = "none";

	x_changed = true;


	if(num < 2 && set_category[(num+1)][0] == true)
	 {
		set_category[num][0] = true;
		set_category[num][1] = set_category[num+1][1];
		if(num == 0 && set_category[2][0] == true)
		 {
			set_category[1][0] = true;
			set_category[1][1] = set_category[2][1];

			set_category[2][0]=false;
			set_category[2][1]="";
		 } else {
			set_category[num+1][0]=false;
			set_category[num+1][1]="";
		 }

	 } else {
		set_category[num][0] = false;
		set_category[num][1] = "";
	 }

	cat_chosen(null,true);
}

function ucfirstlet(toupper)
{
    return toupper.replace(/\b\S*/g, function(val) { return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase(); });
}

function replace_spaces(replace_s)
{
	return replace_s.replace(/ /g,"_");
}

function replace_dashes(replace_s)
{
	return replace_s.replace(/-/g," ");
}

function remove_spaces(replace_s)
{
	return replace_s.replace(/ /g,"");
}

//setCookie("R5_recent","2;Miami Hurricanes Recruiting,5;Miami Hurricanes Football,3;Miami Hurricanes Sports,1;Nebraska Cornhuskers Football",5);

var recent_cat,recent_split;
var temp_cat_info;
var recent_count=0;
var count_w_max=0;
var hold_cat_ids = [];
function init_recent_category()
{
recent_cat = getCookie("R5_recent");  // get list of recently posted categories
recent_split = (recent_cat != null && recent_cat != "")?recent_cat.split(","):new Array();
	recent_split.sort();
	recent_split.reverse(); // will put in descending order by most used
	var temp_test_rcat = recent_split.length>=1?recent_split[0].split(";"):-1; // should be 4 items; if only 3 it is the old version and must be deleted; new version has category id
	if(temp_test_rcat.length < 4 && temp_test_rcat>-1)
	 {
		document.cookie = "R5_recent=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		recent_cat = "";
		recent_split=new Array();
	 } else {
		recent_count = recent_split.length; // the # of recent categories
		count_w_max = ((recent_count < 4)?recent_count:4); // max of 4
	 }

	for(var trcs in recent_split)
	 {
		var temp_recent_split_arr = recent_split[trcs].split(";");
		hold_cat_ids[replace_spaces(temp_recent_split_arr[1])] = temp_recent_split_arr[3];
	 }
}
init_recent_category();

function category_focus()
{
if(recent_cat != null && recent_cat != "")
 {
	for(i = 0;i < recent_count;i++)
	 {
		temp_cat_info = recent_split[i].split(";"); //  splits each recent category in two: number of times used and category name

		if(temp_cat_info[1] == "1")
		 {
			u_cat_private[replace_spaces(temp_cat_info[1])] = true;
		 } else {
			u_cat_private[replace_spaces(temp_cat_info[1])] = false;
		 }

		add_label2(temp_cat_info[1],"recent",temp_cat_info[1]);
	 }
 }
}
category_focus();

var R5_ul,R5_li,R5_a,R5_sp,R5label;
var incr_recent = 0;
function add_label(in_category,cat_type,actual_val)
{
R5_ul=document.getElementById(parent_prefix+"category_select");
R5_li=document.createElement("li");
if(cat_type == "search") {R5_li.style.font="normal 14px Arial,Helvetica,sans-serif";};

R5_li.setAttribute("data-ltext",actual_val);
R5_li.innerHTML = in_category;
R5_li.id = "cat_"+replace_spaces(actual_val);
	if(parent_prefix == "") // if user attempting to create new post
	 {
		R5_li.onclick = function(){cat_chosen(this,false);};
	 } else { // if user is creating new category
		R5_li.onclick = function(){parent_cat_chosen(this);};
	 }
R5_ul.appendChild(R5_li);

if(u_cat_private[replace_spaces(actual_val)])
 {
	R5_sp=document.createElement("span");
	R5_sp.className = "private_category";
	R5_sp.id = "private_sym_"+replace_spaces(actual_val);
	R5_sp.onmouseover = function(){info_message(this.id,3,8,"This category is private",0,"#fff","#000","#000",255,.75);}
	R5_li.appendChild(R5_sp);
 }

if(cat_type == "recent")
{
R5_a=document.createElement("a");
R5_a.className = "filter_1";
R5_a.id = "hide_c"+incr_recent;
R5_a.href = "javascript:void(0)";
R5_a.setAttribute("data-ltext",actual_val);
R5_a.onclick = function(e){
if(e == null) {e = window.event;} // IE7,IE8
e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
this.parentNode.parentNode.removeChild(this.parentNode);

recent_used -= 1;

for(R5label in current_list)
 {
	if(current_list[R5label][0] == this.getAttribute("data-ltext"))
	 {
		current_list.splice(R5label,1);
	 }
 }

remove_recent_category(this.getAttribute("data-ltext"));};

R5_li.appendChild(R5_a);
incr_recent += 1;
}

used_labels += 1;
}

function clear_labels()
{
	document.getElementById(parent_prefix+"category_select").style.display = "none";
}

function clear_labels2()
{
	document.getElementById(parent_prefix+"category_select").setAttribute("style","display:none !important");
}

function remove_clear2()
{
	document.getElementById(parent_prefix+"category_select").setAttribute("style","display:none");
}

var remove_location = 0;
var number_uses = 0;
function remove_recent_category(recent_category) // deletes recently used category from cookie
{
if(recent_cat != null && recent_cat != "")
 {
	remove_location = recent_cat.indexOf(recent_category);
	for(i=0;i<recent_count;i++)
	 {
		temp_cat_info = recent_split[i].split(";"); //  splits each recent category in two: number of times used and category name
		if(temp_cat_info[1].toLowerCase() == recent_category.toLowerCase())
		 {
			recent_split.splice(i,1);
			recent_cat = recent_split.join(",");
			setCookie("R5_recent",recent_cat,180);
			break;
		 }
	 }
	recent_count -=1;
 }
}

var exist_location = 0;
var temp_cat_info2;
function add_recent_category(recent_category) // adds categories used in a post to cookie for future reference
{
if(recent_cat != null && recent_cat != "") // if we have saved any recently posted in categories before
 {
	exist_location = recent_cat.indexOf(recent_category);
	if(exist_location > -1) // if it has already been posted in, add to the amount of times it has been used and saved it
	 {
		for(var i2=0;i2<recent_count;i2++)
		 {
			temp_cat_info = recent_split[i2].split(";"); //  splits each recent category in two: number of times used and category name
			if(temp_cat_info[1].toLowerCase() == recent_category.toLowerCase())
			 {
				temp_cat_info[0] = parseInt(temp_cat_info[0])+1;
				temp_cat_info2 = temp_cat_info.join(";");
				recent_split.splice(i2,1,temp_cat_info2);
				recent_split.sort();
				recent_split.reverse();
				recent_cat = recent_split.join(",");
				setCookie("R5_recent",recent_cat,180);
				break;
			 }
		 }
	 } else { // category has not been posted in before
		recent_split.splice(recent_split.length,0,("1;"+recent_category+";"+((u_cat_private[replace_spaces(recent_category)])?"1":"0")+";"+hold_cat_ids[replace_spaces(recent_category)]));
		recent_split.sort();
		recent_split.reverse();
		recent_cat = recent_split.join(",");
		setCookie("R5_recent",recent_cat,180);

		create_lbl_list.splice(0,0,new Array(recent_category,"recent",recent_category));
		recent_count += 1;
	 }
 } else {
	recent_cat = "1;"+recent_category+";"+((u_cat_private[replace_spaces(recent_category)])?"1":"0")+";"+hold_cat_ids[replace_spaces(recent_category)];
	recent_split[0] = recent_cat;
	setCookie("R5_recent",recent_cat,180);

	create_lbl_list.splice(0,0,new Array(recent_category,"recent",recent_category));
	recent_count += 1;
 }
}

function reset_current_list() // puts contents of current list back into create_lbl_list
{
	if(recent_used > 0) // take out all search used and put them into create_lbl_list for later use
	 {
		d4=0;
		d7 = recent_used;
		for(d = 0;d<d7;d++)
		 {
			document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])));
			recent_used -= 1;
			create_lbl_list.splice(0,0,new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));

			//create_lbl_list.push(new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));
			current_list.splice(d-d4,1);
			//search_used_list.splice(((d-d4)-search_used),1);
			d4+=1;
		 }

		recent_used = 0;
	 }
	if(search_used > 0) // take out all search used and put them into create_lbl_list for later use
	 {
		d4=0;
		d7 = current_list.length;
		for(d = recent_used;d<d7;d++)
		 {
			document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])).parentNode.removeChild(document.getElementById("cat_"+replace_spaces(current_list[d-d4][2])));
			search_used -= 1;
			create_lbl_list.push(new Array(current_list[d-d4][0],current_list[d-d4][1],current_list[d-d4][2]));
			current_list.splice(d-d4,1);
			search_used_list.splice(((d-d4)-search_used),1);
			d4+=1;
		 }

		search_used = 0;
	 }
	previous_val = "";
	previous_total = 0;
}

var trcl = 0;
var count_t_reset = 0; // number of resets performed, will be used for splicing create_lbl_list when exiting the create new category screen
create_lbl_list2 = [];
function temp_reset_current_list() // temporarily gets rid of current list when user is creating new category (any selected categories for a post wouldn't show up when selecting parent category)
{
//document.getElementById("test_results").innerHTML += "here<br />";
	for(trcl = 0;trcl<3;trcl++)
	 {
		if(set_category[trcl][0] == true)
		 {
//document.getElementById("test_results").innerHTML += set_category[trcl][1]+"<br />";
			create_lbl_list2.push(new Array(set_category[trcl][1],"temp",set_category[trcl][1]));
//document.getElementById("test_results").innerHTML += create_lbl_list.length+"<br />";
			count_t_reset++;
		 }
	 }
}

function close_temp_reset()
{
//document.getElementById("test_results").innerHTML += count_t_reset+"close<br />";
	if(count_t_reset > 0)
	 {
		document.getElementById("parent_new_post_category").value = "";
		check_cat_val = "";
		category_create_labels();

		create_lbl_list2.splice(0,count_t_reset);
		count_t_reset = 0;
		
	 }
}

function open_browse()
{
	document.getElementById("b_selected0").style.display = "none";
	document.getElementById("b_selected1").style.display = "none";
	document.getElementById("b_selected2").style.display = "none";

	document.getElementById("R5_background").style.background="#000";
	document.getElementById("R5_background").style.opacity=".95";
	document.getElementById("R5_background").style.filter="Alpha(opacity=95)";
	top_bar_browse = true;
	toggle_browse(false);
}

var b_is_shown = false;
var have_fetched0 = false;
var set_left = 0;
var get_inner = 0;
var top_bar_browse = false; // was the browse link from the top bar clicked on?
function toggle_browse(other_focus)
{
if(b_is_shown == false && other_focus == false)
 {
	document.getElementById("info_hold").style.visibility = "hidden"; // hide info_hold so it doesn't look out of place
	get_inner = (document.documentElement.clientWidth || window.innerWidth);
	var pg_current_scroll = window.pageYOffset || document.documentElement.scrollTop;
	set_left = (get_inner > 1000)?Math.round((get_inner-1000)/2):0;
	var set_top = pg_current_scroll + 75;
	if(have_fetched0 == false){fetch_categories(0,"");}
	document.getElementById("cat_browser").style.display="block";
	document.getElementById("cat_browser").style.left=set_left+"px";
	document.getElementById("cat_browser").style.top=set_top+"px";
	document.getElementById("R5_background").style.display="block";
	b_is_shown = true;

	document.getElementById("R5_background").onclick=function(){toggle_browse(true);};
 } else {
	document.getElementById("info_hold").style.visibility = "hidden"; // hide info_hold so it doesn't look out of place
	if(document.getElementById("create_category"))
	 {
		document.getElementById("create_category").style.display="none";
	 }
	document.getElementById("cat_browser").style.display="none";
	document.getElementById("R5_background").style.display="none";
	document.getElementById("R5_background").style.background="#000";
	document.getElementById("R5_background").style.opacity=".95";
	document.getElementById("R5_background").style.filter="Alpha(opacity=95)";

	document.getElementById("multi-use").style.display="none";
	if(document.getElementById("change_image"))
	 {
		document.getElementById("change_image").style.display="none";
	 }
	b_is_shown = false;
	if(top_bar_browse)
	 {
		close_image();
		close_category_browse();
	 }
	top_bar_browse = false;  // reset to false; if this is true when the browse is open, it will take user to that category's page

	if(parent_prefix != "") // user was on the create new category screen - we must reset all values having to do with creating category suggestions for user when posting
	 {
		parent_prefix = "";
		close_temp_reset(); // must be called first, otherwise search_used could be less than one
		reset_current_list();
		close_category_browse();
//empty_create_lbl(2);
	 }
 }
}

var fetch_level = 0;
var fetch_name = "";
var fetch_list = "";
var recent_fetch_list = "";
var recent_list2 = new Array();
var last_level = 2;
var temp_m_obj;
function fetch_categories(number,parent_c)
{
		//document.getElementById("test_results").innerHTML += last_level+"<br />"; // for testing
if(fetch_blank_at >= 0 && fetch_blank_at >= number)
 {
			hidden_obj.splice(fetch_blank_at,(hidden_obj.length-fetch_blank_at));
			last_level -= 1;
			fetch_blank_at = -1;
 }
if(fetch_list.indexOf(","+number+";"+parent_c+",") == -1)
 {
	if(number > 0 && hidden_obj[number-1] == true)
	 {
		temp_m_obj = document.getElementById("browse_select"+(((number-1) >= 0)?(number-1):number));
		if(cat_browser_width > min_cat_browser)
		 {
			slide_move(document.getElementById("cat_browser"),(cat_browser_width-cat_amt),cat_inc,cat_browser_width,50);
		 }
			slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
			cat_browser_width -= cat_amt;
			hidden_obj[number-1] = false;
			hidden_obj.splice(number,(hidden_obj.length-number));
			last_level -= 1;
			//temp_m_obj.removeAttribute('style');
	 }

	fetch_level = number;
	fetch_name = parent_c;
	xml_http=get_xml_http_obj();
	if(xml_http==null)
	 {
		return;
	 }

	var temp_parent_c = (parent_c == "")?"0":hold_cat_ids[replace_spaces(parent_c)];
	url='category_fetch.php';/*
	xml_http.onreadystatechange=r_state_changed2;
	xml_http.open('POST',url,true);
	xml_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http.send('level='+fetch_level+'&parent='+temp_parent_c);*/
 } else
if(number == 1 || recent_list2[number] != parent_c || number > last_level)
 {
	if(number == 1 && hidden_obj[number-1] == true)
	 {
		temp_m_obj = document.getElementById("browse_select"+(((number-1) >= 0)?(number-1):number));
		if(cat_browser_width > min_cat_browser)
		 {
			slide_move(document.getElementById("cat_browser"),min_cat_browser,cat_inc,cat_browser_width,50);
		 }
			slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
			cat_browser_width = min_cat_browser;
			hidden_obj[number-1] = false;
			hidden_obj.splice(number,(hidden_obj.length-number));
			last_level = 2;
			//temp_m_obj.removeAttribute('style');
	 } else
	if(number > 1 && hidden_obj[number-1] == true)
	 {
		temp_m_obj = document.getElementById("browse_select"+(((number-1) >= 0)?(number-1):number));
		if(cat_browser_width > min_cat_browser)
		 {
			slide_move(document.getElementById("cat_browser"),(cat_browser_width-cat_amt),cat_inc,cat_browser_width,50);
		 }
			slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
			cat_browser_width -= cat_amt;
			hidden_obj[number-1] = false;
			hidden_obj.splice(number,(hidden_obj.length-number));
			last_level -= 1;
			//temp_m_obj.removeAttribute('style');
	 }
	fetch_previous(number,parent_c);
 } else
if(number > 0 && hidden_obj[number-1] == true)
 {
		temp_m_obj = document.getElementById("browse_select"+(((number-1) >= 0)?(number-1):number));
		if(cat_browser_width > min_cat_browser)
		 {
		slide_move(document.getElementById("cat_browser"),(cat_browser_width-cat_amt),cat_inc,cat_browser_width,50);
		 }
		slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
		cat_browser_width -= cat_amt;
		hidden_obj[number-1] = false;
		hidden_obj.splice(number,(hidden_obj.length-number));
		last_level -= 1;
		//temp_m_obj.removeAttribute('style');
 } else
if(number >= 4 && recent_list2[number] == parent_c && (!hidden_obj[number-3] || !hidden_obj[number-4]))
 {
//alert("here");
	if(!hidden_obj[number-3])
	 {
		temp_m_obj = document.getElementById("browse_select"+(number-3));
		slide_hide(temp_m_obj,(number-3));
		hidden_obj[number-3] = true;
	 } else {
		temp_m_obj = document.getElementById("browse_select"+(number-4));
		slide_hide(temp_m_obj,(number-4));
		hidden_obj[number-4] = true;
	 }
	//slide_move(temp_m_obj,(cat_browser_width-cat_amt),cat_inc,cat_browser_width,50);
 }
}

var temp_result_split;
var parent_obj;
var keep_results = new Array();
var rr_and;
function r_state_changed2()
{
if(xml_http.readyState==4 || xml_http.readyState=='complete')
 {
	R5_rec2=xml_http.responseText;
//document.getElementById("test_results").innerHTML += R5_rec2+"<br />";

	if(fetch_name == "")
	 {
		document.getElementById("cat_browser").style.background="#3a3a3a";
	 }
	if(R5_rec2 != "" && R5_rec2 != null)
	 {
		if(fetch_level == 1)
		 {
			recent_fetch_list = "";
			for(i = 1;i<MAX_SETS;i++)
			 {
				parent_obj = document.getElementById("browse_select"+i);
				parent_obj.style.display = "none";
				while(parent_obj.firstChild)
				 {
					parent_obj.removeChild(parent_obj.firstChild);
				 }
				recent_list2[i] = null;
			 }
			last_level = 2;
			//document.getElementById("browse_select0").removeAttribute('style');
		 } else {
			for(i = fetch_level;i<MAX_SETS;i++)
			 {
				parent_obj = document.getElementById("browse_select"+i);
				parent_obj.style.display = "none";
				while(parent_obj.firstChild)
				 {
					parent_obj.removeChild(parent_obj.firstChild);
				 }
				recent_list2[i] = null;
			 }
		 }
		if(fetch_level > last_level)
		 {
			slide_hide(document.getElementById("browse_select"+(fetch_level-3)),(fetch_level-3));
			hidden_obj[(fetch_level-3)] = true;
			//document.getElementById("browse_select"+(fetch_level-last_level)).style.display = "none";
			//document.getElementById("browse_select0").style.borderRightWidth = "5px";
			last_level = fetch_level;
		 }

		document.getElementById("browse_select"+fetch_level).getAttribute('style');
		document.getElementById("browse_select"+fetch_level).removeAttribute('style');

		//document.getElementById("browse_select"+(((fetch_level-1) > 0)?(fetch_level-1):fetch_level)).removeAttribute('style');
		cat_results = R5_rec2.split(",");
		cat_results.splice((cat_results.length-1),1);
		cat_results.sort(); // alphabetical order
		keep_results[fetch_name+fetch_level] = cat_results.slice(0);
		num_results2 = cat_results.length;

		temp_recent_cat = ","+current_list.join(",")+",";
		for(i = 0;i<num_results2;i++)
		 {
			temp_result_split = cat_results[i].split(";");
			temp_id_category = replace_spaces(temp_result_split[0]);

			hold_cat_ids[temp_id_category] = temp_result_split[3];

			if(temp_result_split[2] == "1")
			 {
				u_cat_private[temp_id_category] = true;
			 } else {
				u_cat_private[temp_id_category] = false;
			 }

			R5_ul = eval("document.getElementById('browse_select"+fetch_level+"')");

			R5_li=document.createElement("li");

			R5_li.setAttribute("data-ltext",temp_result_split[0]);
			R5_li.innerHTML = temp_result_split[0];
			R5_li.id = "browse_"+temp_id_category;
			R5_li.setAttribute("onclick","cat_chosen(this,false);");
			if(parseInt(temp_result_split[1]) > 0)
			 {
				R5_li.className = "browse_arrow";
				R5_li.setAttribute("onmouseover","fetch_categories("+(fetch_level+1)+",'"+temp_result_split[0]+"');");
			 } else {
				R5_li.setAttribute("onmouseover","fetch_blank("+(fetch_level+1)+");");
			 }
			R5_ul.appendChild(R5_li);

			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category]) // if it using 2+ lines (category name is too long for area), make font smaller and repeat
			 {
				R5_li.style.fontSize="13px";
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.style.fontSize="12px";
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.innerHTML = temp_result_split[0].substr(0,32) + "...";
				R5_li.title = temp_result_split[0];
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.innerHTML = temp_result_split[0].substr(0,27) + "...";
				R5_li.title = temp_result_split[0];
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.innerHTML = temp_result_split[0].substr(0,22) + "...";
				R5_li.title = temp_result_split[0];
			 }
			if(u_cat_private[temp_id_category] && R5_li.innerHTML.length >= 25)
			 {
				R5_li.style.fontSize="12px";
				R5_li.innerHTML = temp_result_split[0].substr(0,22) + "...";
				R5_li.title = temp_result_split[0];
			 }

			if(u_cat_private[temp_id_category])
			 {
				R5_sp=document.createElement("span");
				R5_sp.className = "private_category";
				R5_sp.id = "private_sym2_"+temp_id_category;
				if(parseInt(temp_result_split[1]) > 0)
				 {
					R5_sp.style.cssText = "margin-right:14px;";
				 }
				R5_sp.onmouseover = function(){info_message(this.id,2,8,"This category is private",0,"#fff","#000","#000",255,.5);}
				R5_li.appendChild(R5_sp);
			 }
		 }
		fetch_list += ","+fetch_level+";"+fetch_name+",";
		recent_fetch_list += ","+fetch_level+";"+fetch_name+",";
		recent_list2[fetch_level] = fetch_name;

		align_browse_s(fetch_level,fetch_name);
	 }


// *** hack to fix IE bug and chrome draw error with box shadow (still doesn't always work in IE) (using display none and then display block worked for one redraw, but IE stops redrawing box shadow from there)

		rr_and = (Math.random()/2500);
		document.getElementById("cat_browser").style.zoom = 1+rr_and;
		rr_and = (Math.random()/2500);
		document.getElementById("cat_browser").style.zoom = 1+rr_and;

// *** end hack
 }
if(have_fetched0 == false && fetch_level == 0){have_fetched0 = true;}

}

function align_browse_s(number,parent_c)
{
	if(number != 0)  // this if block will align the hover rows with the resulting browse_select
	 {

		var parent_c_top = document.getElementById("browse_"+replace_spaces(parent_c)).offsetTop;
		if(number != 1)
		 {
			parent_c_top += document.getElementById("browse_select"+(number-1)).offsetTop;
		 }
		var browse_height = document.getElementById("browse_select0").offsetHeight;
		var browse_height2 = document.getElementById("browse_select"+number).offsetHeight;

		if((parent_c_top + browse_height2) > browse_height)
		 {
			parent_c_top = browse_height - browse_height2;
		 }
		document.getElementById("browse_select"+number).style.top = parent_c_top+"px";
	 }
}

var fetch_blank_at = -1;
function fetch_blank(number)
{
	if(number > 0 && hidden_obj[number-1] == true)
	 {
		temp_m_obj = document.getElementById("browse_select"+(((number-1) >= 0)?(number-1):number));
		if(cat_browser_width > min_cat_browser)
		 {
			slide_move(document.getElementById("cat_browser"),(cat_browser_width-cat_amt),cat_inc,cat_browser_width,50);
		 }
			slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
			cat_browser_width -= cat_amt;
			hidden_obj[number-1] = false;

			fetch_blank_at = number;
			//hidden_obj.splice(number,(hidden_obj.length-number));
			//last_level -= 1;
			//temp_m_obj.removeAttribute('style');
	 }

/*
	if(browse_select_num == 1)
	 {
		recent_fetch_list = "";
		for(i = 1;i<MAX_SETS;i++)
		 {
			parent_obj = document.getElementById("browse_select"+i);
			parent_obj.style.display = "none";
			while(parent_obj.firstChild)
			 {
				parent_obj.removeChild(parent_obj.firstChild);
			 }
			recent_list2[i] = null;
		 }
		last_level = 2;
		//document.getElementById("browse_select0").removeAttribute('style');
	 } else {
		for(i = browse_select_num;i<MAX_SETS;i++)
		 {
			parent_obj = document.getElementById("browse_select"+i);
			parent_obj.style.display = "none";
			while(parent_obj.firstChild)
			 {
				parent_obj.removeChild(parent_obj.firstChild);
			 }
			recent_list2[i] = null;
		 }
	 }
*/
}

var keep_length = 0;
var hidden_obj = [];
var temp_id_category = "";
function fetch_previous(number,parent_c)
{
		if(number == 1)
		 {
			recent_fetch_list = "";
			for(i = 1;i<MAX_SETS;i++)
			 {
				parent_obj = document.getElementById("browse_select"+i);
				parent_obj.style.display = "none";
				while(parent_obj.firstChild)
				 {
					parent_obj.removeChild(parent_obj.firstChild);
				 }
				recent_list2[i] = null;
			 }
			last_level = 2;
			//document.getElementById("browse_select0").removeAttribute('style');
		 } else {
			for(i = number;i<MAX_SETS;i++)
			 {
				parent_obj = document.getElementById("browse_select"+i);
				parent_obj.style.display = "none";
				while(parent_obj.firstChild)
				 {
					parent_obj.removeChild(parent_obj.firstChild);
				 }
				recent_list2[i] = null;
			 }
		 }
		if(number > last_level)
		 {
			slide_hide(document.getElementById("browse_select"+(number-3)),(number-3));
			hidden_obj[(number-3)] = true;
			//document.getElementById("browse_select"+(number-last_level)).style.display = "none";
			//document.getElementById("browse_select0").style.borderRightWidth = "5px";
			last_level = number;
		 }

		document.getElementById("browse_select"+number).getAttribute('style');
		document.getElementById("browse_select"+number).removeAttribute('style');
		//document.getElementById("browse_select"+(((number-1) > 0)?(number-1):number)).removeAttribute('style');

		keep_length = keep_results[parent_c+number].length;

		for(i = 0;i<keep_length;i++)
		 {
			temp_result_split = keep_results[parent_c+number][i].split(";");
			temp_id_category = replace_spaces(temp_result_split[0]);
			R5_ul = eval("document.getElementById('browse_select"+number+"')");

			R5_li=document.createElement("li");

			R5_li.setAttribute("data-ltext",temp_result_split[0]);
			R5_li.innerHTML = temp_result_split[0];
			R5_li.id = "browse_"+temp_id_category;
			R5_li.setAttribute("onclick","cat_chosen(this,false);");
			if(parseInt(temp_result_split[1]) > 0)
			 {
				R5_li.className = "browse_arrow";
				R5_li.setAttribute("onmouseover","fetch_categories("+(number+1)+",'"+temp_result_split[0]+"');");
			 } else {
				R5_li.setAttribute("onmouseover","fetch_blank("+(number+1)+");");
			 }
			R5_ul.appendChild(R5_li);

			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category]) // if it is using 2+ lines (category name is too long for area), make font smaller and repeat
			 {
				R5_li.style.fontSize="13px";
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.style.fontSize="12px";
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.innerHTML = temp_result_split[0].substr(0,32) + "...";
				R5_li.title = temp_result_split[0];
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.innerHTML = temp_result_split[0].substr(0,27) + "...";
				R5_li.title = temp_result_split[0];
			 }
			if(R5_li.offsetHeight > 31 && !u_cat_private[temp_id_category])
			 {
				R5_li.innerHTML = temp_result_split[0].substr(0,22) + "...";
				R5_li.title = temp_result_split[0];
			 }
			if(u_cat_private[temp_id_category] && R5_li.innerHTML.length >= 25)
			 {
				R5_li.style.fontSize="12px";
				R5_li.innerHTML = temp_result_split[0].substr(0,22) + "...";
				R5_li.title = temp_result_split[0];
			 }

			if(u_cat_private[temp_id_category])
			 {
				R5_sp=document.createElement("span");
				R5_sp.className = "private_category";
				R5_sp.id = "private_sym2_"+temp_id_category;
				if(parseInt(temp_result_split[1]) > 0)
				 {
					R5_sp.style.cssText = "margin-right:14px;";
				 }
				R5_sp.onmouseover = function(){info_message(this.id,2,8,"This category is private",0,"#fff","#000","#000",255,.5);}
				R5_li.appendChild(R5_sp);
			 }
		 }

		recent_fetch_list += ","+number+";"+parent_c+",";
		recent_list2[number] = parent_c;

		align_browse_s(number,parent_c);
}

var time_sl = new Array();
var time_sl2 = new Array();
var cat_browser_width = 1000; // current width
var min_cat_browser = 1000; // minimum width
var shrink_to = 60; // how many pixels browse categories should shrink to (width)
var cat_amt = 61; // how many pixels category box should shrink/increase by (width)
var cat_inc = 12; // how many pixels category bos should increase by each increment (the higher the faster)
var MAX_SETS = 8; // the maximum number of columns in the browse utility
function slide_hide(obj,br_num)
{
	slide_move(obj,shrink_to,cat_inc,207,br_num);
	if(br_num > MAX_SETS)
	 {
		slide_move2(document.getElementById("cat_browser"),cat_amt,cat_inc,cat_browser_width,50);
		cat_browser_width += cat_amt;
	 }
}


var shade_obj;
var max_array_num = 0;
function slide_move(obj, min_width, subtract_w, current_w,array_num) // collapses categories in the browse utility
{
if((current_w-subtract_w) > min_width)
 {
	obj.style.width = (current_w-subtract_w)+"px";
	time_sl[array_num] = setTimeout(function(){slide_move(obj,min_width,subtract_w,(current_w-subtract_w),array_num);},15);
 } else {
if(array_num!= 50)  // 50 used for the category box
 {
	shade_obj = document.getElementById("browse_select"+(array_num+1));
	shade_obj.style.boxShadow="-10px 0 10px 2px rgba(0,0,0,.3)";
	shade_obj.style.WebkitBoxShadow="-10px 0 10px 2px rgba(0,0,0,.3)";
	shade_obj.style.MozBoxShadow="-10px 0 10px 2px rgba(0,0,0,.3)";

	shade_obj = document.getElementById("browse_select"+(array_num));
	shade_obj.style.boxShadow="-25px 0px 15px -6px rgba(0,0,0,.3) inset";
	shade_obj.style.WebkitBoxShadow="-25px 0px 15px -6px rgba(0,0,0,.3) inset";
	shade_obj.style.MozBoxShadow="-25px 0px 15px -6px rgba(0,0,0,.3) inset";

	//shade_obj.style.MozBoxShadow="-10px 0 10px 5px rgba(0,0,0,.3) inset";
	shade_obj.style.background="#2a2a2a";
	shade_obj.style.color="#ccc";
//rgba(0, 0, 0, 0.298039) -25px 0px 15px -6px inset

	b_s_back_changed[array_num] = true;

	max_array_num = (max_array_num < array_num)?array_num:max_array_num;

	for(i_an = 0;i_an<array_num;i_an++)
	 {
//alert(i_an);
		if(!b_s_back_changed[i_an]) // when a category is collapsed, this will check to make sure all previous category columns to the left have been collapsed
		 {
			//alert(i_an + ":"+b_s_back_changed[i_an]);
			//slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
			slide_move(document.getElementById("browse_select"+(i_an)),shrink_to,cat_inc,207,i_an);
			hidden_obj[i_an] = true;
		 }
	 }
 }
	obj.style.width = (min_width)+"px";
	clearTimeout(time_sl[array_num]);
 }
}


var b_s_back_changed = [];
var i_an = 0;
function slide_move2(obj, add_width, add_w, current_w,array_num) // un-collapses categories in the browse utility
{
//alert("here");
if(add_width > 0)
 {
	if(b_s_back_changed[array_num])
	 {
		shade_obj = document.getElementById("browse_select"+(array_num));
		shade_obj.style.color="#f0f0f0";
		shade_obj.style.background="#333";
		b_s_back_changed[array_num] = false;
	shade_obj.style.boxShadow="";
	shade_obj.style.WebkitBoxShadow="";
	shade_obj.style.MozBoxShadow="";
	 }
	obj.style.width = (current_w)+"px";
	time_sl2[array_num] = setTimeout(function(){slide_move2(obj,(add_width-add_w),add_w,(current_w+add_w),array_num);},15);
 } else {
if(array_num!= 50)  // 50 used for the category box
 {
	shade_obj = document.getElementById("browse_select"+(array_num+1));
	shade_obj.style.boxShadow="";
	shade_obj.style.WebkitBoxShadow="";
	shade_obj.style.MozBoxShadow="";
	shade_obj = document.getElementById("browse_select"+(array_num));

	if(array_num != 0) // if it is zero, all collapsed categories will automatically be shown
	 {
		for(i_an = array_num;i_an<=max_array_num;i_an++)
		 {
			if(b_s_back_changed[i_an]) // when a category has been collapsed and it is hovered over, it will expand, if categories to its right are also collapsed this will un-collapse them
			 {
				//alert(i_an + ":"+b_s_back_changed[i_an]);
				//slide_move2(temp_m_obj,(207 - shrink_to),20,shrink_to,(((number-1) >= 0)?(number-1):number));
				slide_move2(document.getElementById("browse_select"+(i_an)),(207 - shrink_to),20,shrink_to,i_an);
				hidden_obj[i_an] = false;
			 }
		 }
	 }
 }
	obj.style.width = (current_w + add_width)+"px";
	clearTimeout(time_sl2[array_num]);
 }
}

var temp_dis_message = "";
var image_ender = "";
function img_up_return(ret_value)
{
	is_uploading_image = false;
	is_image_attached = false;
	document.getElementById("feedback_image"+image_ender).innerHTML = "";
	document.getElementById("loading_image"+image_ender).style.display = "none";
	image_ender = "";
//document.getElementById("test_results").innerHTML += ret_value+"<br />";

	if(ret_value == "success")
	 {
		is_finished_up = true;

		if(!is_reply_post)
		 {
			submit_post();
		 } else {
			submit_reply(hold_current_reply[0],hold_current_reply[1],hold_current_reply[2],hold_current_reply[3],hold_current_reply[4]);
			is_reply_post = false;
			hold_current_reply.length = 0;
		 }
	 } else
	if(ret_value.indexOf("banned:") > -1)
	 {
		banned_arr = ret_value.split(":");
		banned_text = (banned_arr[1] == "permanent")?("You have been permanently banned from posting in \""+banned_arr[2]+"\"."):("You have been banned from posting in \""+banned_arr[2]+"\" until "+banned_arr[1]+".");
		show_display_t(banned_text,0);
		expand_post();
	 } else
	if(ret_value.indexOf("private:") > -1)
	 {
		banned_arr = ret_value.split(":");
		show_display_t(('"'+banned_arr[1]+'" is a private category.'),0);
		expand_post();
	 } else
	if(ret_value.indexOf("error:") > -1)
	 {
		banned_arr = ret_value.split(":");
		if(banned_arr[1] == "file size")
		 {
			temp_dis_message = "Maximum of 5MB for images.";
		 } else {
			temp_dis_message = "There was an error with the "+banned_arr[1]+".";
		 }
		show_display_t(temp_dis_message,0);
		expand_post();
	 }
}


var title_val,content_val,category_array,category_val;
var continue_post = true;
var is_image_attached = false;
var is_uploading_image = false;
var is_finished_up = false;
function submit_post()
{
document.getElementById("info_hold").style.visibility = "hidden"; // hide info hold so it doesn't look out of place if the post goes through
title_val = document.getElementById("new_post_title").value;
content_val = document.getElementById("new_post_content").value;
category_array = new Array(set_category[0][1],set_category[1][1],set_category[2][1]);
category_array = clean_array(category_array);
var category_array2 = [];
for(var R5_a in category_array){category_array2[R5_a]=hold_cat_ids[replace_spaces(category_array[R5_a])];}  // translates category names into their respective id's
category_array2 = clean_array(category_array2);
category_val = category_array2.join();

if(document.getElementById("img_post").value != "")
 {
	if(!is_finished_up)
	 {
		is_image_attached = true;
	 }
 }
//alert(hold_cat_ids[replace_spaces(set_category[0][1])]+"::"+set_category[0][1]);
if(remove_spaces(category_val) == "")
 {
	info_message("new_post_category",1,8,"Must choose at least one category.",10,"#fff","#000","#000",255,.75);
	continue_post = false;
 } else
if(remove_spaces(content_val) == "")
 {
	info_message("new_post_content",1,8,"Must enter content.",10,"#fff","#000","#000",255,.75);
	continue_post = false;
 } else
if(content_val.length > 1000)
 {
	info_message("new_post_content",1,8,"Maximum of 1000 characters.",10,"#fff","#000","#000",255,.75);
	continue_post = false;
 }
if(continue_post && !is_image_attached)
 {
	is_finished_up = false;
	toggle_new_post(false);

	xml_http=get_xml_http_obj();
	if(xml_http==null)
	 {
		return;
	 }

//document.getElementById("test_results").innerHTML += category_val+"<br />";

	url='submit_post.php';/*
	xml_http.onreadystatechange=r_state_changed3;
	xml_http.open('POST',url,true);
	xml_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http.send('title='+title_val+'&content='+encodeURIComponent(content_val)+'&category='+category_val);*/
 } else
if(continue_post && is_image_attached && !is_uploading_image)
 {
	is_uploading_image = true;
	document.getElementById("feedback_image").innerHTML = "Uploading Image...";
	document.getElementById("loading_image").style.display = "block";
	document.getElementById("form_image").action="post_image.php?category="+category_val+"&reply=false";
	document.getElementById("form_image").submit();
 }

is_image_attached = false;
continue_post = true;
}

var ic = 0;
var banned_arr;
var banned_text="";
var get_now,post_time;
function r_state_changed3()
{
if (xml_http.readyState==4 || xml_http.readyState=='complete')
 {
	R5_rec=xml_http.responseText;
	//document.getElementById("test_results").innerHTML += R5_rec+"<br />"; // for testing
	if(R5_rec.indexOf("success:") > -1)
	 {
		R5_arr = R5_rec.split(":");

		for(ic = 0;ic<3;ic++)
		{
		if(set_category[ic][1] != "" && set_category[ic][1] != null)
		 {
			add_recent_category(set_category[ic][1]);
		 }
		}

		get_now = new Date();
		post_time = get_now.getTime();

		add_post(false,R5_user,0,0,R5_image,title_val,content_val,category_array,"0 Seconds Ago",R5_arr[2],(Math.floor((Math.random()*10000)+1)),"",0,parseFloat(R5_arr[1]),post_time,post_time,"total","user","user","","","new",0,"",R5_arr[3],R5_accountid,R5_arr[4]);
		reset_set_category();
		toggle_new_post(true);
	 } else
	if(R5_rec.indexOf("banned:") > -1)
	 {
		banned_arr = R5_rec.split(":");
		banned_text = (banned_arr[1] == "permanent")?("You have been permanently banned from posting in \""+banned_arr[2]+"\"."):("You have been banned from posting in \""+banned_arr[2]+"\" until "+banned_arr[1]+".");
		show_display_t(banned_text,0);
		expand_post();
	 } else
	if(R5_rec.indexOf("private:") > -1)
	 {
		banned_arr = R5_rec.split(":");
		show_display_t(('"'+banned_arr[1]+'" is a private category.'),0);
		expand_post();
	 } else
	if(R5_rec.indexOf("multiple:") > -1)
	 {
		banned_arr = R5_rec.split(":");
		multiple_private = banned_arr[1].split(",");
		banned_text = (multiple_private.length == 2)?(multiple_private[0]+" and "+multiple_private[1]):(multiple_private[0]+", "+multiple_private[1]+" and "+multiple_private[2]);
		show_display_t(('You may only post in one private category ('+banned_text+' are private).'),0);
		expand_post();
	 } else
	if(R5_rec == "logged")
	 {
		show_display_t('You must have an account to post!',0);
		expand_post();
	 } else {
		show_display_t('Error connecting to the server.  Please try again.',0);
		expand_post();
	 }
	// document.getElementById("test_results").innerHTML += R5_rec+"<br />"; // for testing
 }
}

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var get_month,get_day,get_year,get_hour,get_ampm,get_minutes,get_fulldate,leading_zero;
function get_full_date(change_date)
{
	get_month = months[change_date.getMonth()];
	get_day = change_date.getDate();
	get_year = change_date.getFullYear();
	get_hour = change_date.getHours();
	get_ampm = (get_hour>12)?"pm":"am";
	get_hour = (get_hour>12)?(get_hour-12):get_hour;
	get_minutes = change_date.getMinutes();
	leading_zero=(get_minutes < 10)?"0":"";

	return (get_month+" "+get_day+", "+get_year+" at "+get_hour+":"+leading_zero+get_minutes+get_ampm);
}

function reset_set_category()
{
set_category[0][0] = false;
set_category[1][0] = false;
set_category[2][0] = false;
set_category[0][1] = "";
set_category[1][1] = "";
set_category[2][1] = "";
set_category[0][2] = 0;
set_category[1][2] = 0;
set_category[2][2] = 0;
}

var hr_count=0;
var hr_keep = [];
var loaded_replies = [];
var previous_siblings = []; // when a reply is opened, previousSibling post_holder div gets a border-bottom; this keeps track of which have been changed just in case list is resorted while reply still open
var opened_replies = [];  // used with the above to keep track of which corresponding div of replies is showing
var next_siblings = []; // used with above
function open_reply(pnumber,post_id_l,show_replies)
{
if(!show_replies)
 {
	document.getElementById("reply_holder"+pnumber).style.display = "block";
	document.getElementById("reply_content"+pnumber).focus();
 }
document.getElementById(post_id_l).className = "post_holder post_holder_expand";
document.getElementById("post_outer"+pnumber).style.zIndex = "2";
document.getElementById("post_outer"+pnumber).style.boxShadow = "rgba(0, 0, 0, 0.12) 1px 1px 15px 1px";
document.getElementById("post_outer"+pnumber).style.mozBoxShadow = "rgba(0, 0, 0, 0.12) 1px 1px 15px 1px";
document.getElementById("post_outer"+pnumber).style.webkitBoxShadow = "rgba(0, 0, 0, 0.12) 1px 1px 15px 1px";

add_prev_sibling_arr(post_id_l);
document.getElementById("a_hide_rp"+pnumber).style.display = "block";
hide_reply.push([post_id_l,("a_hide_rp"+pnumber)]);
hr_keep[post_id_l] = hr_count;

hr_count++;
if(show_replies)
 {
	document.getElementById("all_reply"+pnumber).style.display = "block";
	if(loaded_replies[post_id_l] != undefined)
	 {

	 } else {
		loaded_replies[post_id_l]=0;
		load_new_replies(post_id_l,"",15,pnumber);
	 }
 }
}

var temp_hr_arr = [];
var hr_val;
var ahide_obj;
function close_reply(pnumber,post_id_l,show_replies)
{
document.getElementById(post_id_l).className = "post_holder";
document.getElementById("info_hold").style.visibility = "hidden"; // if user attempted to reply with nothing in field and then goes to close_reply, info_message will remain for several seconds
document.getElementById("reply_holder"+pnumber).style.display = "none";
document.getElementById("a_hide_rp"+pnumber).style.display = "none";
document.getElementById("all_reply"+pnumber).style.display = "none";
document.getElementById("post_outer"+pnumber).getAttribute("style");
document.getElementById("post_outer"+pnumber).removeAttribute("style");
remove_prev_sibling_arr(post_id_l);

temp_hr_arr = hide_reply.slice(0);
hide_reply.length = 0;

ahide_obj = document.getElementById("a_hide_rp"+pnumber);
ahide_obj.style.left = "auto";
ahide_obj.style.right = "0px";
ahide_obj.style.position = "absolute";

for(hr_val in temp_hr_arr)
{
	if(temp_hr_arr[hr_val][0] != post_id_l)
	 {
		hide_reply.push([temp_hr_arr[hr_val][0],temp_hr_arr[hr_val][1]]);
	 }
}

hr_count--;
}

function return_previous_sibling(find_prev)
{
	var new_sibling=find_prev.previousSibling;

	if(new_sibling !== null)
	 {
		while(new_sibling !== null && new_sibling.nodeType!=1)
		 {
			new_sibling=new_sibling.previousSibling;
		 }
	 }

	return new_sibling;
}

function return_next_sibling(find_next)
{
	var new_sibling=find_next.nextSibling;

	if(new_sibling !== null)
	 {
		while(new_sibling !== null && new_sibling.nodeType!=1)
		 {
			new_sibling=new_sibling.nextSibling;
		 }
	 }

	return new_sibling;
}

function add_prev_sibling_arr(post_id_l2)
{
	var get_prev_sibling = return_previous_sibling(document.getElementById(post_id_l2));
	var get_next_sibling = return_next_sibling(document.getElementById(post_id_l2));
	if(get_prev_sibling != null)
	 {
		if(get_prev_sibling.className.indexOf("post_holder_expand") == -1)
		 {
			if(get_prev_sibling.className.indexOf("post_holder_top") == -1)
			 {
				get_prev_sibling.className = "post_holder post_holder_bottom";
			 } else {
				get_prev_sibling.className = "post_holder post_holder_both";
			 }
		 }
		previous_siblings.push(get_prev_sibling.id);
		opened_replies.push(post_id_l2);
	 } else {
		previous_siblings.push("");
		opened_replies.push(post_id_l2);
		document.getElementById(post_id_l2).className = "post_holder post_holder_expand post_holder_extend";
	 }
	if(get_next_sibling != null)
	 {
		if(get_next_sibling.className.indexOf("post_holder_expand") == -1)
		 {
			if(get_next_sibling.className.indexOf("post_holder_bottom") == -1)
			 {
				get_next_sibling.className = "post_holder post_holder_top";
			 } else {
				get_next_sibling.className = "post_holder post_holder_both";
			 }
		 }
		next_siblings.push(get_next_sibling.id);
	 } else {
		next_siblings.push("");
	 }
}

function remove_prev_sibling_arr(post_id_l2)
{
	var get_prev_sibling = return_previous_sibling(document.getElementById(post_id_l2));
	var get_next_sibling = return_next_sibling(document.getElementById(post_id_l2));
	var this_changed_class = false;

	if(get_prev_sibling != null)
	 {
		if(get_prev_sibling.className.indexOf("post_holder_expand") == -1)
		 {
			if(get_prev_sibling.className.indexOf("post_holder_both") == -1)
			 {
				get_prev_sibling.className = "post_holder";
			 } else {
				get_prev_sibling.className = "post_holder post_holder_top";
			 }
		 } else {
			document.getElementById(post_id_l2).className = "post_holder post_holder_top";
			this_changed_class = true;
		 }
	 }

	if(get_next_sibling != null)
	 {
		if(get_next_sibling.className.indexOf("post_holder_expand") == -1)
		 {
			if(get_next_sibling.className.indexOf("post_holder_both") == -1)
			 {
				get_next_sibling.className = "post_holder";
			 } else {
				get_next_sibling.className = "post_holder post_holder_bottom";
			 }
		 } else {
			if(!this_changed_class)
			 {
				document.getElementById(post_id_l2).className = "post_holder post_holder_bottom";
			 } else {
				document.getElementById(post_id_l2).className = "post_holder post_holder_both";
			 }
		 }
	 }

	var temp_pr_s_len = opened_replies.length;
	for(var pr_s = 0;pr_s<temp_pr_s_len;pr_s++)
	 {
		if(opened_replies[pr_s] == post_id_l2)
		 {
			previous_siblings.splice(pr_s,1);
			opened_replies.splice(pr_s,1);
			break;
		 }
	 }
}

var h_all_open_r=[];
function close_replies_to_sort() // doesn't actually minimize the replies, just removes changes to other posts for open_replies_sort() to add back once sort is complete
{
	h_all_open_r = opened_replies.slice();
	var temp_len_hall = h_all_open_r.length;
	for(var tl=0;tl<temp_len_hall;tl++)
	 {
		remove_prev_sibling_arr(h_all_open_r[tl]);
		if(document.getElementById(h_all_open_r[tl]).className.indexOf("post_holder_extend") > -1)
		 {
			document.getElementById(h_all_open_r[tl]).className = "post_holder post_holder_expand";
		 }
	 }
}
function open_replies_to_sort()
{
	var temp_len_hall = h_all_open_r.length;
	if(temp_len_hall>0)
	 {
		for(var tl=0;tl<temp_len_hall;tl++)
		 {
			add_prev_sibling_arr(h_all_open_r[tl]);
		 }
	 }
	h_all_open_r = [];
}

var cur_rp_hold_obj,rp_holder_div,rp_div_out,rp_char_div,rp_new_reply,rp_text_content,rp_sub_reply_btn,rp_all_rp;
var rp_img_label,rp_img_div,rp_img_x,rp_upload_form,rp_new_img_post,rp_feedback_img,rp_loading_img;
var rp_div_hold_width = 737;
var rp_out_width = 725; //these must be the same as the css used
var new_rp_width = 685;
var new_dlvl = 0;
var margin_diff = 41; // the amount of pixels each level of replies is moved to the right (margin)
var max_level = 7;
var new_margin_diff = 0;
var holder_level = 0;
var outer_level = 0;
function open_reply2(d_count,d_postid,d_replyid,d_level,d_bool)
{
	if(!document.getElementById("reply_holder"+d_replyid))
	 {
		new_dlvl = d_level+1;
		holder_level = (d_level<=max_level)?d_level:max_level;
		outer_level = (new_dlvl<=max_level)?new_dlvl:max_level;

		new_margin_diff = (new_dlvl<=7)?margin_diff:0;
		cur_rp_hold_obj=document.getElementById(d_postid+d_replyid);

//	document.getElementById("test_results").innerHTML += d_postid+d_replyid+"<br />"; // for testing

		rp_holder_div=document.createElement("div");
			rp_holder_div.className = "reply_holder";
			rp_holder_div.id = "reply_holder"+d_replyid;
			//rp_holder_div.style.cssText = "margin-left:"+(new_margin_diff*new_dlvl)+"px";
			cur_rp_hold_obj.appendChild(rp_holder_div);

		rp_div_out=document.createElement("div");
			rp_div_out.className = "reply_outer";
			rp_div_out.id = "reply_outer"+d_replyid;
			//rp_div_out.style.cssText = "margin-left:"+(new_margin_diff*new_dlvl)+"px";
			rp_holder_div.appendChild(rp_div_out);

		rp_char_div=document.createElement("div");
			rp_char_div.className = "reply_char_remain";
			rp_char_div.id = "r_remain_chars"+d_replyid;
			rp_char_div.innerHTML = "1000";
			rp_div_out.appendChild(rp_char_div);

		rp_new_reply=document.createElement("div");
			rp_new_reply.className = "new_reply";
			rp_new_reply.id = "new_reply"+d_replyid;
			rp_div_out.appendChild(rp_new_reply);

		rp_text_content=document.createElement("textarea");
			rp_text_content.id = "reply_content"+d_replyid;
			rp_text_content.setAttribute("data-id",d_replyid);
			rp_text_content.onkeydown=function(){update_count_rp(this.getAttribute("data-id"));};
			rp_text_content.onkeyup=function(){update_count_rp(this.getAttribute("data-id"));};
			rp_new_reply.appendChild(rp_text_content);

		rp_sub_reply_btn=document.createElement("input");
			rp_sub_reply_btn.type = "button";
			rp_sub_reply_btn.className = "light_gray_img";
			rp_sub_reply_btn.value = "Reply";
			rp_sub_reply_btn.setAttribute("data-id",d_replyid);
			rp_sub_reply_btn.setAttribute("data-postid",d_postid);
			rp_sub_reply_btn.setAttribute("data-level",new_dlvl);
			rp_sub_reply_btn.onclick=function(){submit_reply(this.getAttribute("data-id"),this.getAttribute("data-id"),this.getAttribute("data-postid"),parseInt(this.getAttribute("data-level")),this);};
			rp_new_reply.appendChild(rp_sub_reply_btn);

		rp_control_hold=document.createElement("div");
			rp_control_hold.className="reply_controls";
			rp_new_reply.appendChild(rp_control_hold);

		rp_img_label=document.createElement("label");
			rp_img_label.id="img_picture"+d_replyid;
			rp_img_label.className="img_picture";
			rp_img_label.style.cssText="display:block;";
			rp_img_label.setAttribute("for",("img_post"+d_replyid));
			rp_img_label.setAttribute("data-id",d_replyid);
			rp_img_label.onmouseover=function(){info_message(this.id,2,8,'Attach Image',0)};

			if(is_firefox)
			 {
				rp_img_label.onclick=function(){img_double_click(1,document.getElementById('img_post'+this.getAttribute("data-id")));}	//document.getElementById('img_post'+this.getAttribute("data-id")).click();
			 }
			rp_control_hold.appendChild(rp_img_label);

		rp_img_div=document.createElement("div");
			rp_img_div.className="post_img_data";
			rp_img_div.id="post_img_data"+d_replyid;
			rp_control_hold.appendChild(rp_img_div);

		rp_img_x=document.createElement("div");
			rp_img_x.className="close_x_img";
			rp_img_x.title="Remove";
			rp_img_x.id="close_x_img"+d_replyid;
			rp_img_x.setAttribute("data-id",d_replyid);
			rp_img_x.onclick=function() { remove_img_upload('img_post','post_img_data','close_x_img','img_picture',this.getAttribute("data-id"));};
			rp_control_hold.appendChild(rp_img_x);

		rp_feedback_img=document.createElement("div");
			rp_feedback_img.id="feedback_image"+d_replyid;
			rp_feedback_img.className="feedback_image";
			rp_control_hold.appendChild(rp_feedback_img);

		rp_loading_img=document.createElement("div");
			rp_loading_img.id="loading_image"+d_replyid;
			rp_loading_img.className="loading_image";
			rp_control_hold.appendChild(rp_loading_img);

		rp_upload_form=document.createElement("form");
			rp_upload_form.id="form_image"+d_replyid;
			rp_upload_form.method="post";
			rp_upload_form.enctype="multipart/form-data";
			rp_upload_form.action="post_image.php";
			rp_upload_form.target="image_iframe";
			rp_control_hold.appendChild(rp_upload_form);

		rp_new_img_post=document.createElement("input");
			rp_new_img_post.type="file";
			rp_new_img_post.name="file";
			rp_new_img_post.id="img_post"+d_replyid;
			rp_new_img_post.className="file_hide";
			rp_new_img_post.setAttribute("accept","image/"+"*");
			rp_new_img_post.setAttribute("data-id",d_replyid);

			if(!is_ie && !is_safari)
			 {
				rp_new_img_post.style.cssText="display:none;";
			 }
			if(is_firefox)
			 {
				rp_img_label.onclick=function(){return img_double_click(0,null);}
			 }

			rp_new_img_post.onchange=function(){img_uploader(this.value,'post_img_data','close_x_img','img_picture',this.getAttribute("data-id"));};
			rp_upload_form.appendChild(rp_new_img_post);


		rp_all_rp=document.createElement("div");
			rp_all_rp.className = "all_replies";
			rp_all_rp.id = "all_reply"+d_replyid;
			cur_rp_hold_obj.appendChild(rp_all_rp);

//(rp_div_hold_width-(margin_diff*parseInt(get_level)+parseInt(get_level)))
		document.getElementById("reply_holder"+d_replyid).style.width=(rp_div_hold_width-((margin_diff*holder_level)+holder_level))+"px";
		document.getElementById("reply_outer"+d_replyid).style.marginLeft=(new_margin_diff)+"px";
		document.getElementById("reply_outer"+d_replyid).style.width=(rp_out_width-(margin_diff*outer_level+outer_level))+"px";
		document.getElementById("new_reply"+d_replyid).style.width=(new_rp_width-(margin_diff*outer_level+outer_level))+"px";

		if(new_margin_diff != 0)
		 {
			document.getElementById("all_reply"+d_replyid).style.marginLeft=(new_margin_diff)+"px";
			document.getElementById("all_reply"+d_replyid).style.borderLeft="1px #ccc solid";
		document.getElementById("reply_outer"+d_replyid).style.borderLeft="1px #ccc solid";
		 }

	 }

	if(d_bool)
	 {
		document.getElementById("all_reply"+d_replyid).style.display="block";
		if(loaded_replies[(d_postid+d_replyid)] != undefined)
		 {

		 } else {
			loaded_replies[(d_postid+d_replyid)]=0;
			load_new_replies(d_postid,d_replyid,15,d_replyid);
		 }
	 } else {
		document.getElementById("reply_holder"+d_replyid).style.display="block";
		document.getElementById("reply_content"+d_replyid).focus();
	 }
}