var new_get_inner = 0;
var new_set_left = 0;
function open_new_category()
{
	document.getElementById("info_hold").style.visibility = "hidden";
//empty_create_lbl(1);
	reset_current_list();
	temp_reset_current_list();
	parent_prefix = "parent_";

	new_get_inner = (document.documentElement.clientWidth || window.innerWidth);
	new_set_left = (new_get_inner > 400)?Math.round((new_get_inner-400)/2):0;

	document.getElementById("create_category").style.display="block";
	document.getElementById("create_category").style.left=new_set_left+"px";
	document.getElementById("R5_background").style.display="block";
	document.getElementById("R5_background").onclick=function(){toggle_browse(true);};

	if(!is_ie && !is_safari)
	 {
		document.getElementById("img_category").style.display = "none";
	 }

//	document.getElementById().style.display = "block";
}

var c_nc_chars = 0;
var new_category_obj,new_category_height;
function update_count_n_category()
{
	c_nc_chars = 1000 - document.getElementById("category_description").value.length;
	document.getElementById("category_n_remain_chars").innerHTML = c_nc_chars;
	if(c_nc_chars <= 25) {document.getElementById("category_n_remain_chars").style.color="#DD3333";} else {document.getElementById("category_n_remain_chars").style.color="#fff";}

	new_category_obj = document.getElementById("category_description");
	new_category_height = new_category_obj.scrollHeight; // Get the scroll height of the textarea
	if((new_category_height) > 30){new_category_obj.style.maxHeight = (new_category_height) + "px";new_category_obj.style.height = (new_category_height) + "px";}
}

var rr_and2=0;
function category_private_check()
{
if(document.getElementById("category_private").checked)
 {
	document.getElementById("c_password1").style.display = "block";
	document.getElementById("c_password2").style.display = "block";
	document.getElementById("c_password3").style.display = "block";
 } else {
	document.getElementById("c_password1").style.display = "none";
	document.getElementById("c_password2").style.display = "none";
	document.getElementById("c_password3").style.display = "none";
 }

		rr_and2 = (Math.random()/2500);
		document.getElementById("create_category").style.zoom = 1+rr_and;
		rr_and2 = (Math.random()/2500);
		document.getElementById("create_category").style.zoom = 1+rr_and;
}

var c_s_r_obj;
function category_img_up_return(ret_value)
{
	is_uploading_image = false;
	is_image_attached = false;
	document.getElementById("category_feedback_image"+image_ender).innerHTML = "";
	document.getElementById("category_loading_image"+image_ender).style.display = "none";
	image_ender = "";
	c_s_r_obj = document.getElementById("category_submit_result");

	if(ret_value == "success")
	 {
		is_finished_up = true;

		submit_category();
	 } else
	if(ret_value.indexOf("banned:") > -1)
	 {
		banned_arr = ret_value.split(":");
		banned_text = (banned_arr[1] == "permanent")?("You have been permanently banned from posting in \""+banned_arr[2]+"\"."):("You have been banned from posting in \""+banned_arr[2]+"\" until "+banned_arr[1]+".");
		c_s_r_obj.innerHTML = banned_text;
		c_s_r_obj.style.display = "block";
//		show_display_t(banned_text,0);
		expand_post();
	 } else
	if(ret_value.indexOf("private:") > -1)
	 {
		banned_arr = ret_value.split(":");
		c_s_r_obj.innerHTML = '"'+banned_arr[1]+'" is a private category.';
		c_s_r_obj.style.display = "block";
//		show_display_t(('"'+banned_arr[1]+'" is a private category.'),0);
		expand_post();
	 } else
	if(ret_value.indexOf("error:") > -1)
	 {
		banned_arr = ret_value.split(":");
		if(banned_arr[1] == "file size")
		 {
			temp_dis_message = "Maximum of 5mb for images.";
		 } else {
			temp_dis_message = "There was an error with the "+banned_arr[1]+".";
		 }

		c_s_r_obj.innerHTML = temp_dis_message;
		c_s_r_obj.style.display = "block";
//		show_display_t(temp_dis_message,0);
	 }
}



var category_name_obj,category_desc_obj,category_parent_obj,category_private_obj,category_pass1_obj,category_pass2_obj,category_18_obj,category_p_submit_obj;
var submit_c_error = false;
var category_name_check = /^([a-zA-Z0-9 ]+)$/;
var xml_http13;
function submit_category()
{
	document.getElementById("category_submit_result").style.display = "none"; // where the result from the server is written if there is an error.

	category_name_obj = document.getElementById("category_name");
	category_desc_obj = document.getElementById("category_description");
	category_parent_obj = document.getElementById("parent_new_post_category");
	category_private_obj = document.getElementById("category_private");
	category_pass1_obj = document.getElementById("category_password1");
	category_pass2_obj = document.getElementById("category_password2");
	category_pass3_obj = document.getElementById("category_password3");
	category_18_obj = document.getElementById("category_18");
	category_p_submit_obj = document.getElementById("parent_category_submit");
	if(category_name_obj.value == "")
	 {
		info_message(category_name_obj.id,1,8,"Name Required",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(!cat_isavailable)
	 {
		info_message(category_name_obj.id,1,8,"Name taken. Please choose a different name.",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(!category_name_check.test(category_name_obj.value))
	 {
		info_message(category_name_obj.id,1,8,"Name can only include letters, numbers and spaces (a-z, 0-9)",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(category_desc_obj.value == "")
	 {
		info_message(category_desc_obj.id,1,8,"Description Required",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(category_desc_obj.value.length > 1000)
	 {
		info_message(category_desc_obj.id,1,8,"Maximum of 1000 Characters",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(parent_category_selected == "")
	 {
		info_message(category_parent_obj.id,1,8,"Parent Category Required",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(category_private_obj.checked && category_pass1_obj.value == "")
	 {
		info_message(category_pass1_obj.id,1,8,"Password Required",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(category_private_obj.checked && category_pass1_obj.value.length < 4)
	 {
		info_message(category_pass1_obj.id,1,8,"Password Must Be At Least 4 Characters",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(category_private_obj.checked && category_pass2_obj.value == "")
	 {
		info_message(category_pass2_obj.id,1,8,"Password Confirmation Required",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else
	if(category_private_obj.checked && category_pass1_obj.value != category_pass2_obj.value)
	 {
		info_message(category_pass2_obj.id,1,8,"Passwords Do Not Match",10,"#fff","#000","#000",255,.7);
		submit_c_error = true;
	 } else {
		document.getElementById("info_hold").style.visibility = "hidden";
	 }

	if(document.getElementById("img_category").value != "")
	 {
		if(!is_finished_up)
		 {
			is_image_attached = true;
		 }
	 }

	//document.getElementById("test_results").innerHTML +=submit_c_error+":1<br />"; // for testing

	xml_http13=get_xml_http_obj();
	if(xml_http13==null)
	 {
		return;
	 }

	if(!submit_c_error && !is_image_attached) // submit category if no errors and image not attached
	 {
		category_p_submit_obj.disabled = true;
		category_p_submit_obj.value = "Working";
		is_finished_up = false;

		url='submit_category.php';
		xml_http13.onreadystatechange=r_state_changed13;
		xml_http13.open('POST',url,true);
		xml_http13.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xml_http13.send('category='+category_name_obj.value+'&description='+encodeURIComponent(category_desc_obj.value)+'&parent='+parent_category_selected+'&private='+category_private_obj.checked+'&pass1='+encodeURIComponent(category_pass1_obj.value)+'&pass2='+encodeURIComponent(category_pass2_obj.value)+'&pass3='+category_pass3_obj.checked+'&age='+category_18_obj.checked+'&c_follow='+document.getElementById('category_follow').checked);
	 } else
	if(!submit_c_error && is_image_attached && !is_uploading_image) // image attached
	 {
		category_p_submit_obj.disabled = true;
		category_p_submit_obj.value = "Working";
		is_uploading_image = true;
		document.getElementById("category_feedback_image").innerHTML = "Uploading Image";
		document.getElementById("category_loading_image").style.display = "block";
		document.getElementById("category_form_image").action="category_image.php?category="+category_name_obj.value;
		document.getElementById("category_form_image").submit();
	 }

	submit_c_error = false;
	is_image_attached = false;
}



var get_actual_cat;
function r_state_changed13()
{
if (xml_http13.readyState==4 || xml_http13.readyState=='complete')
 {
	R5_rec=xml_http13.responseText;
//document.getElementById("test_results").innerHTML +=R5_rec+"<br />"; // for testing
	if(R5_rec.indexOf("success") == 0)
	 {
		get_actual_cat = R5_rec.split(":"); // [1] is the actual formatted category that was saved (uppercased words, etc)

		category_name_checked.replace((get_actual_cat[1].toLowerCase()+":available"),(get_actual_cat[1].toLowerCase()+":taken"));
		u_cat_private[replace_spaces(get_actual_cat[1])] = (document.getElementById("category_private").checked)?true:false;

		hold_cat_ids[replace_spaces(get_actual_cat[1])] = get_actual_cat[2];

		parent_prefix = "";
		add_label2(get_actual_cat[1],"search",get_actual_cat[1]);
		//add_label(get_actual_cat[1],"search",get_actual_cat[1]);

document.getElementById("new_post_category").value = get_actual_cat[1];
create_labels(1);
/*
	current_list.push(new Array(get_actual_cat[1],"search",get_actual_cat[1]));
	search_used_list.push(new Array(get_actual_cat[1],"search",get_actual_cat[1]));
*/
	//create_lbl_list.splice(d-d4,1);

		cat_chosen(document.getElementById("cat_"+replace_spaces(get_actual_cat[1])),false);

		search_used = 0;

		parent_prefix = "parent_";

		show_display_t("Category created successfully.",10);

		document.getElementById("category_name").value = "";
		document.getElementById("category_new_field_result").style.display = "none";
		document.getElementById("category_description").value = "";
		document.getElementById("category_description").getAttribute("style");
		document.getElementById("category_description").removeAttribute("style");
		document.getElementById("category_private").checked = false;
		document.getElementById("category_password1").value = "";
		document.getElementById("category_password2").value = "";
		document.getElementById("category_password3").checked = false;
		document.getElementById("category_18").checked = false;
		document.getElementById("parent_new_post_category").blur();

		show_placeh(document.getElementById("category_name"));
		show_placeh(document.getElementById("category_description"));
		show_placeh(document.getElementById("parent_new_post_category"));
		show_placeh(document.getElementById("category_password1"));
		show_placeh(document.getElementById("category_password2"));

		update_count_n_category(); // letters left in category_description

		parent_x_category();

		toggle_browse(true);

		document.getElementById("new_post_category").blur();
		document.getElementById("new_post_category").focus();

	 } else
	if(R5_rec.indexOf("taken") == 0)
	 {
		cat_isavailable = false;
		cat_field_result_obj = document.getElementById("category_new_field_result");
		cat_field_result_obj.innerHTML = "This category name is taken.";
		cat_field_result_obj.style.color = "#d00";
		cat_field_result_obj.style.display = "block";

		category_name_checked.replace((document.getElementById("category_name").value.toLowerCase()+":available"),(document.getElementById("category_name").value.toLowerCase()+":taken"));
	 } else
	if(R5_rec.indexOf("level") == 0)
	 {
		cat_isavailable = false;
		cat_field_result_obj = document.getElementById("category_new_field_result");
		// cat_field_result_obj.innerHTML = "There is a limited amount of levels of subcategories allowed.  You must choose a parent category higher up the chain of subcategories.";
		document.getElementById("category_submit_result").innerHTML = "The parent category you chose is too specific. Only 8 levels of subcategories are permitted.  Please choose a less specific parent category.";
		//cat_field_result_obj.style.color = "#d00";
		//cat_field_result_obj.style.display = "block";
		document.getElementById("category_submit_result").style.display = "block";
	 } else {

	//document.getElementById("test_results").innerHTML +=R5_rec+"<br />"; // for testing
		document.getElementById("category_submit_result").innerHTML = "An error occurred while creating your category.";
		document.getElementById("category_submit_result").style.display = "block";
	 }
		document.getElementById("parent_category_submit").disabled = false;
		document.getElementById("parent_category_submit").value = "Create Category";

 }
}

function img_category_ch(newval)
{
img_location = (newval.indexOf("\\") >= 0)?newval.substr((newval.lastIndexOf("\\")+1)):((newval.indexOf("/") >= 0)?newval.substr((newval.lastIndexOf("/")+1)):((newval != "")?newval:"245x160 (width x height)"));

if(img_location.length > 30)
 {
	if(img_location.indexOf(" ") < 30)
	 {
		img_location = img_location.substr(0,30) + "<br />" + img_location.substr(26);
	 }
	document.getElementById("category_img_data").style.top="0";
 } else {
	document.getElementById("category_img_data").style.top="7px";
 }
document.getElementById("category_img_data").innerHTML = img_location;


if(img_location != "245x160 (width x height)")
 {
	document.getElementById("category_close_x_img").style.display = "block";
 } else {
	document.getElementById("category_close_x_img").style.display = "none";
 }
}

var category_name_checked = ","; // list of categories already checked
var hold_category_name = "";
var temp_cat_checked = "";
var cat_checked_place = 0;
var xml_http12;
var cat_field_result_obj;
var cat_isavailable = false;
function category_checker()
{
	cat_field_result_obj = document.getElementById("category_new_field_result");
	cat_field_result_obj.innerHTML="&nbsp;";
	category_name_obj = document.getElementById("category_name");
	hold_category_name = category_name_obj.value.toLowerCase();
	cat_checked_place = category_name_checked.indexOf(","+hold_category_name+":");
if(hold_category_name != "" && cat_checked_place == -1 && category_name_check.test(category_name_obj.value))
 {

	xml_http12=get_xml_http_obj();
	if(xml_http12==null)
	 {
		return;
	 }

	url='category_check.php';
	xml_http12.onreadystatechange=r_state_changed12;
	xml_http12.open('POST',url,true);
	xml_http12.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http12.send('category='+hold_category_name);
 } else
if(cat_checked_place > -1)
 {
	temp_cat_checked = category_name_checked.substr(cat_checked_place+2+hold_category_name.length);
	if(temp_cat_checked.indexOf("available") == 0) // if the value is available for this checked category
	 {
		cat_isavailable = true;
		cat_field_result_obj.innerHTML = "Looks good!";
		cat_field_result_obj.style.color = "#0b0";
		cat_field_result_obj.style.display = "block";
	 } else { // previously checked category is taken
		cat_isavailable = false;
		cat_field_result_obj.innerHTML = "This category name is taken.";
		cat_field_result_obj.style.color = "#d00";
		cat_field_result_obj.style.display = "block";
	 }
 } else
if(!category_name_check.test(category_name_obj.value) && hold_category_name != "")
 {
		document.getElementById("category_new_field_result").innerHTML = "Name can only include letters, numbers and spaces (a-z, 0-9)";
		document.getElementById("category_new_field_result").style.color = "#d00";
		cat_field_result_obj.style.display = "block";
 } else {
		cat_field_result_obj.style.display = "none";
 }

}

function r_state_changed12()
{
if (xml_http12.readyState==4 || xml_http12.readyState=='complete')
 {
	R5_rec=xml_http12.responseText;
	cat_field_result_obj = document.getElementById("category_new_field_result");
	// document.getElementById("test_results").innerHTML +=R5_rec+"<br />"; // for testing
	if(R5_rec == "available")
	 {
		cat_isavailable = true;
		cat_field_result_obj.innerHTML = "Looks good!";
		cat_field_result_obj.style.color = "#0b0";
		cat_field_result_obj.style.display = "block";
		category_name_checked += hold_category_name+":available,";
	 } else {
		cat_isavailable = false;
		cat_field_result_obj.innerHTML = "This category name is taken.";
		cat_field_result_obj.style.color = "#d00";
		cat_field_result_obj.style.display = "block";
		category_name_checked += hold_category_name+":taken,";
	 }

	hold_category_name = "";
 }


}


function toggle_parent_prefix(is_true)
{
	if(is_true)
	 {
		parent_prefix = "parent_";
	 } else {
		parent_prefix = "";
	 }
}

var parent_category_selected = ""; // the value that will be passed to the server
var hold_past_private = false;
var hold_past_disabled = false;
function parent_cat_chosen(obj)
{
	clear_labels2();

	hold_ltext = (re_order == false)?obj.getAttribute("data-ltext"):"";

	if(u_cat_private[replace_spaces(hold_ltext)])
	 {
		document.getElementById("info_hold").style.visibility = "hidden";
		hold_past_disabled = true;
		if(document.getElementById("category_private").checked)
		 {
			hold_past_private = true;
		 } else {
			document.getElementById("category_private").checked = true;
			hold_past_private = false;
			category_private_check();
		 }
		document.getElementById("category_private").disabled = true;
		info_message("parent_new_post_category",2,8,"This category is private. This means your<br />new category must also be private.",10,"#fff","#000","#000",255,.7)
	 } else {
	 }
	parent_category_selected = hold_ltext;

	document.getElementById("parent_cat_sel_hold").innerHTML = hold_ltext;
	document.getElementById("parent_cat_selected").style.display = "block";
	document.getElementById("parent_cat_selected").title = hold_ltext;

	document.getElementById("parent_cat_placeholder").style.display = "none";
	//document.getElementById("parent_new_post_category").blur();
	document.getElementById("parent_new_post_category").style.backgroundColor = "#fafafa";
	document.getElementById("parent_new_post_category").disabled = true;
	document.getElementById("parent_new_post_category").value = "";
}

function parent_x_category()
{
	if(hold_past_disabled)
	 {
		document.getElementById("category_private").disabled = false;
		if(hold_past_private)
		 {
			document.getElementById("category_private").checked = true;
		 } else {
			document.getElementById("category_private").checked = false;
			category_private_check();
		 }

		hold_past_disabled = false;
	 }
	remove_clear2();
	parent_category_selected = "";
	document.getElementById("parent_cat_sel_hold").innerHTML = "";
	document.getElementById("parent_cat_selected").style.display = "none";
	document.getElementById("parent_cat_selected").title = "";
	document.getElementById("parent_cat_placeholder").style.display = "block";
	document.getElementById("parent_new_post_category").style.backgroundColor = "#fff";
	document.getElementById("parent_new_post_category").disabled = "";
	document.getElementById("parent_new_post_category").focus();

}

function category_browse()
{
	browse_change('browse');
	document.getElementById("b_selected0").style.display = "none";
	document.getElementById("b_selected1").style.display = "none";
	document.getElementById("b_selected2").style.display = "none";
	document.getElementById("x_cat_browse").onclick = function(){ close_category_browse();};
	document.getElementById("cat_browse_title").innerHTML = "Select Parent Category";
	document.getElementById("cat_browse_title").parentNode.parentNode.className = "top_browse top_browse_create_cat";


	toggle_browse(false);
	document.getElementById("R5_background").onclick = function(){ close_category_browse();};
}

var ccb = 0;
function close_category_browse()
{
	document.getElementById("cat_browser").style.display = "none";
	document.getElementById("cat_browse_title").innerHTML = "Browse";
	document.getElementById("cat_browse_title").parentNode.parentNode.className = "top_browse";
	document.getElementById("x_cat_browse").onclick = function(){ toggle_browse(true);};
	document.getElementById("R5_background").onclick=function(){ toggle_browse(true);};

	for(ccb=0;ccb<3;ccb++)
	 {
		if(document.getElementById("b_sel_hold"+ccb).innerHTML != "")
		 {
			document.getElementById("b_selected"+ccb).style.display = "block";
		 }
	 }
	b_is_shown = false;

}