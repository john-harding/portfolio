function follow_btn_over()
{
	var new_is_followed = (this.getAttribute("data-followed") == "true")?true:false;
	if(new_is_followed)
	 {
		this.innerHTML = "Unfollow";
	 }
}

function follow_btn_out()
{
	var new_is_followed = (this.getAttribute("data-followed") == "true")?true:false;
	if(new_is_followed)
	 {
		this.innerHTML = "Followed";
	 }
}

function get_last_child(temp_fol_obj)
{
var temp_obj_l = temp_fol_obj.lastChild;
while(temp_obj_l.nodeType != 1)
 {
	temp_obj_l = temp_obj_l.previousSibling;
 }
return temp_obj_l;
}

function submit_c_follow(follow_type,follow_obj,follow_update)
{
	form_pass_submit = true;
	change_follow(follow_type,follow_obj,follow_update);
}


var form_pass_submit = false;
var xml_http10;
var follow_info="";
var hold_follow_type=[];
var hold_follow_obj=[];
var is_follow_up=[];
var track_follow_ch1=0;// these make sure that follow attempts lign up with each other as functions go from change_follow to r_state_changed
var track_follow_ch2=0;
function change_follow(follow_type,follow_obj,follow_update)
{
	var private_pass_submit = "";
	var is_enter_pass_1 = (typeof enter_pass_followed != 'undefined' && enter_pass_followed);

	is_follow_up[track_follow_ch1] = follow_update;
	var new_is_followed = (follow_obj.getAttribute("data-followed") == "true")?true:false;
	//follow_info = (follow_type == "user")?user_accountid:(category_name+","+categories_ids.substring((category_name.length+2),(categories_ids.length-1)));

	follow_info = follow_obj.getAttribute("data-follow-info");
	hold_follow_type[track_follow_ch1]=(follow_type == "user")?"users":"categories";

if(R5_user != "" && (!is_private || (new_is_followed && is_private) || (document.getElementById("private_pass") && document.getElementById("private_pass").value != "")))
 {
	if(!(is_enter_pass_1 && new_is_followed && form_pass_submit))
	 {
		if(follow_update)
		 {
			var temp_followers_obj = document.getElementById("info_followers");
			var temp_info_followers = parseInt(temp_followers_obj.firstChild.innerHTML.replace(/,/g,""));
		 }
		if(new_is_followed && follow_obj != null)
		 {
			follow_obj.className = "follow_btn";
			follow_obj.innerHTML = "Follow";
			hold_follow_obj[track_follow_ch1] = follow_obj;
			if(follow_update)
			 {
				temp_info_followers = (temp_info_followers-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				temp_followers_obj.firstChild.innerHTML = temp_info_followers;
				var temp_f_last = get_last_child(temp_followers_obj);
				temp_f_last.innerHTML = " Follower" + ((temp_info_followers != "1")?"s":"");
			 }
		 } else
		if(follow_obj != null)
		 {
			follow_obj.className = "unfollow_btn";
			follow_obj.innerHTML = "Unfollow";
			hold_follow_obj[track_follow_ch1] = follow_obj;
			if(follow_update)
			 {
				temp_info_followers = (temp_info_followers+1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				temp_followers_obj.firstChild.innerHTML = temp_info_followers;
				var temp_f_last = get_last_child(temp_followers_obj);
				temp_f_last.innerHTML = " Follower" + ((temp_info_followers != "1")?"s":"");
			 }
		 } else {
			hold_follow_obj[track_follow_ch1] = null;
		 }
	 } else {
		hold_follow_obj[track_follow_ch1] = follow_obj;
	 }

	if(document.getElementById("private_pass") && document.getElementById("private_pass").value != "")
	 {
		private_pass_submit = "&password="+encodeURIComponent(document.getElementById("private_pass").value);
	 }
//document.getElementById("test_results").innerHTML += "here<br />"; // for testing

	xml_http10 = get_xml_http_obj();
	if(xml_http10 == null)
	 {
		return;
	 }

	if(!(is_enter_pass_1 && new_is_followed && form_pass_submit))
	 {
		url='change_follow.php';
		xml_http10.onreadystatechange=r_state_changed10;
		xml_http10.open('POST',url,true);
		xml_http10.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xml_http10.send('follow_type='+follow_type+'&follow='+follow_info+'&current='+new_is_followed+private_pass_submit);

		follow_obj.setAttribute("data-followed",((new_is_followed)?"false":"true"));
	 } else {
		url='check_private_pass.php';
		xml_http10.onreadystatechange=r_state_changed10;
		xml_http10.open('POST',url,true);
		xml_http10.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xml_http10.send('follow='+follow_info+'&current='+new_is_followed+private_pass_submit);
	 }
	//is_followed=(is_followed)?false:true;

	track_follow_ch1++;
 } else
if(R5_user == "")
 {
	show_display_t("You must log in to do that!",0);
 }

	form_pass_submit = false;
}

function r_state_changed10()
{
if(xml_http10.readyState==4 || xml_http10.readyState=='complete')
 {
	R5_rec=xml_http10.responseText;

	var new_is_followed = (hold_follow_obj[track_follow_ch2].getAttribute("data-followed") == "true")?true:false;
	var is_enter_pass_1 = (typeof enter_pass_followed != 'undefined' && enter_pass_followed);

	//document.getElementById("test_results").innerHTML += R5_rec+"<br />"; // for testing
	if(R5_rec.indexOf("maximum") > -1 || R5_rec.indexOf("error:password") > -1 || R5_rec == "logged")
	 {
		if(is_follow_up[track_follow_ch2])
		 {
			var temp_followers_obj = document.getElementById("info_followers");
			var temp_info_followers = parseInt(temp_followers_obj.firstChild.innerHTML.replace(/,/g,""));
		 }

		if(!(is_enter_pass_1 && new_is_followed))
		 {
			if(new_is_followed && hold_follow_obj[track_follow_ch2] != null)
			 {
				hold_follow_obj[track_follow_ch2].className = "follow_btn";
				hold_follow_obj[track_follow_ch2].innerHTML = "Follow";

				if(is_follow_up[track_follow_ch2])
				 {
					temp_info_followers = (temp_info_followers-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					temp_followers_obj.firstChild.innerHTML = temp_info_followers;
					var temp_f_last = get_last_child(temp_followers_obj);
					temp_f_last.innerHTML = " Follower" + ((temp_info_followers != "1")?"s":"");
				 }
			 } else
			if(hold_follow_obj[track_follow_ch2] != null)
			 {
				hold_follow_obj[track_follow_ch2].className = "unfollow_btn";
				hold_follow_obj[track_follow_ch2].innerHTML = "Followed";

				if(is_follow_up[track_follow_ch2])
				 {
					temp_info_followers = (temp_info_followers+1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					temp_followers_obj.firstChild.innerHTML = temp_info_followers;
					var temp_f_last = get_last_child(temp_followers_obj);
					temp_f_last.innerHTML = " Follower" + ((temp_info_followers != "1")?"s":"");
				 }
			 }
			hold_follow_obj[track_follow_ch2].setAttribute("data-followed",((new_is_followed)?"false":"true"));
		 }
		//is_followed=(is_followed)?false:true;


		if(R5_rec.indexOf("maximum") > -1)
		 {
			show_display_t("You have reached the maximum number of follows for "+hold_follow_type[track_follow_ch2]+".",0);
		 } else
		if(R5_rec.indexOf("error:password") > -1)
		 {
			show_display_t("Incorrect password.",0);
		 } else
		if(R5_rec == "logged")
		 {
			show_display_t("You must have an account to do that!",0);
		 }
	 } else
	if(is_private == true && new_is_followed)
	 {
		location.reload();
	 }
	track_follow_ch2++;
 }
}

function form_change_follow(form_follow_type)
{
	change_follow(form_follow_type,null,false);
	return false;
}