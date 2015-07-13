var _strengths = new Array("Poor","Average","Strong","Very Strong","Incredible!");
var _length, _variety, _special_ch, _upper_ch, _strength_total, _strength_total2;  // length, variety, back and forth between types, special characters
var obj_p_s;
var _v_c0 = /[^0-9]+[^a-zA-Z]/;
var _v_c0_1 = /[^a-zA-Z]+[^0-9]+/;
var _v_c1 = /[^0-9]+[^a-zA-Z]+[^0-9]/;
var _v_c2 = /[^a-zA-Z]+[^0-9]+[^a-zA-Z]/;
var _v_c3 = /[^0-9]+[^a-zA-Z]+[^0-9]+[^a-zA-Z]+[a-zA-Z0-9^a-zA-Z\d]/;
var _v_c4 = /[^a-zA-Z]+[^0-9]+[^a-zA-Z]+[^0-9]+[a-zA-Z0-9^a-zA-Z\d]/;
var _v_c5 = /[^a-zA-Z]+[^0-9]+[^a-zA-Z]/;
var _special_check = /[^a-zA-Z\d]/;
var _upper_check = /[A-Z]/;
var _regular_check = /[a-z\d]/;
var p_r = 255;
var p_g = 0;
var p_b = 0;
var soft_val = 70;
var _correct_strong_green = 115;
function gen_password_strength(e_p)
{
obj_p_s = document.getElementById("password_strength");

if(e_p.length >= 0)
{
_length = 1.80/(1+Math.pow(1.5,(-(e_p.length-7))));
_variety = (_v_c4.test(e_p) || _v_c3.test(e_p))?1.7:(_v_c2.test(e_p) || _v_c1.test(e_p))?1.2:(_v_c0_1.test(e_p) || _v_c0.test(e_p))?.7:0;
_variety = (_regular_check.test(e_p))?(_variety/2):_variety;
_special_ch = (_special_check.test(e_p))?1.8:0;
_upper_ch = (_upper_check.test(e_p))?.8:0;
_strength_total = Math.ceil(_length + _variety + _special_ch + _upper_ch) - 1;
_strength_total = (_strength_total > 4)?4:(_strength_total < 0)?0:_strength_total;
_strength_total2 = _length + _variety+ _special_ch + _upper_ch - 1;
_strength_total2 = (_strength_total2 > 4)?4:(_strength_total2 < 0)?0:_strength_total2;
obj_p_s.innerHTML = _strengths[_strength_total];
p_r= (_strength_total2 <= 1)?255:(_strength_total2 <= 2 && _strength_total2 > 1)?Math.floor(((1-(_strength_total2-1))*(255-(soft_val+_correct_strong_green)))+soft_val):soft_val;
p_g= (_strength_total2 <= 1)?Math.ceil((_strength_total2*(255-soft_val))+soft_val):(_strength_total2 > 3 && _strength_total2 < 4)?Math.ceil(((255-soft_val)/2)+soft_val):Math.ceil(((255-soft_val)/2)+soft_val); // Math.floor(((1-((_strength_total2-3))/2)*(255 - soft_val)) + soft_val)
p_b= (_strength_total2 <= 2)?soft_val:(_strength_total2 <= 3 && _strength_total2 > 2)?Math.ceil(((_strength_total2-2)*(255-soft_val))+soft_val):255;
if(p_b == soft_val && p_g >= 215 && p_r >= 230) { obj_p_s.style.color = "#444";} else { obj_p_s.style.color = "#fff";}

obj_p_s.style.backgroundColor="rgb( "+p_r+", "+p_g+", "+p_b+")";
} else {
obj_p_s.style.backgroundColor="#aaa";
obj_p_s.innerHTML = "";
}
}




function refreshc()
{
		document.getElementById("veric").src = "captcha.php?"+Math.round(Math.random()*1000);
}





var email_check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,6}$/;
var month_check = /^([1-9]|[1][0-2])$/;
var day_check = /^([1-9]|[12][0-9]|3[01])$/;
var year_check = /^(19[0-9]{2}|200[0-9]|201[0-2])$/;
var username_check = /^[a-zA-Z0-9_]{1,15}$/;
var name_check = /^[a-zA-Z0-9 +-_&#'()=%$!]+$/;
var s_return = false; // if an error is found, will be true; if should_return is true and this is true, false is returned
var pass_match_fail = false;
	//return true or false?, object calling this, the id that will contain error message, the value for error message, value of error message for not matching, id of input it is supposed to match, lower length limit, upper length limit
function require_filled(should_return,obj,response_id,response_val,response_val2,match_id,low,high)
{
	document.getElementById(response_id).style.color="#FF0000";
if(obj.value == "")
 {
	document.getElementById(response_id).style.display="inline-block";
	document.getElementById(response_id).innerHTML=response_val;
	s_return = true;
 } else
if(low != null && high != null && (obj.value.length < low || obj.value.length > high))
 {
	document.getElementById(response_id).style.display="inline-block";
	if(low != high)
	 {
		document.getElementById(response_id).innerHTML="Must be "+low+" to "+high+" characters long.";
	 } else {
		document.getElementById(response_id).innerHTML="Must be "+low+" characters long.";
	 }
	s_return = true;
 } else
if(match_id != null && match_id != "" && (document.getElementById(match_id).value != obj.value)) // item is supposed to match another item (password)
 {
	document.getElementById(response_id).style.display="inline-block";
	document.getElementById(response_id).innerHTML=response_val2;
	s_return = true;
	if(response_id == "input_password2") {pass_match_fail = true;}
 } else
if(response_id.indexOf("name") > -1 && !name_check.test(obj.value)) // perform check to make sure name is valid
 {
	document.getElementById(response_id).style.display="inline-block";
	document.getElementById(response_id).innerHTML="Name doesn't look valid.";
	s_return = true;
 } else
if(response_id.indexOf("email") > -1 && !email_check.test(obj.value)) // perform check to make sure email address is valid
 {
	document.getElementById(response_id).style.display="inline-block";
	document.getElementById(response_id).innerHTML="Email not valid.";
	s_return = true;
 } else
if(response_id.indexOf("email") > -1 && obj.value != "" && (should_return == false || form_submitted == true)) // perform check to make sure email address hasn't been used and isn't in process of submitting the form
 {
	if(typeof is_settings == "undefined" || (typeof user_email != "undefined" && obj.value.toLowerCase() != user_email.toLowerCase()))
	 {
		check_username(obj.value,response_id);
	 }
	if(should_return == true)
	 {
		form_submitted = false;
		return false;
	 }

 } else
if(response_id.indexOf("birthday") > -1 && !eval(obj.id+"_check.test('"+obj.value+"')")) // perform check to make sure part of birthday just entered is valid
 {
	document.getElementById(response_id).style.display="inline-block";
	document.getElementById(response_id).innerHTML=response_val.substring(0,response_val.indexOf(" "))+" not valid.";
	s_return = true;

 } else
if(response_id.indexOf("username") > -1 && !username_check.test(obj.value)) // perform check to see if username is valid
 {
	document.getElementById(response_id).style.display="inline-block";
	document.getElementById(response_id).innerHTML="Username must be alphanumeric (a-z and 0-9).";
	s_return = true;
 } else
if(response_id.indexOf("username") > -1 && obj.value != "" && (should_return == false || form_submitted == true)) // perform check to see if username is available & not in process of submitting the form
 {
	if(typeof is_settings == "undefined" || (typeof user_username != "undefined" && obj.value.toLowerCase() != user_username.toLowerCase()))
	 {
		check_username(obj.value,response_id);
	 }
	if(should_return == true)
	 {
		return false;
	 }
 } else
if(response_id == "input_password" && pass_match_fail && (document.getElementById("password2").value == obj.value)) // recheck passwords if already determined to not match
 {

	document.getElementById(response_id).style.display="none";
	document.getElementById(response_id).innerHTML="";
	document.getElementById("input_password2").style.display="none";
	document.getElementById("input_password2").innerHTML="";
	pass_match_fail = false;

 } else {  // all tests exhausted
	if(response_id == "input_password2") {pass_match_fail = false;}
	document.getElementById(response_id).style.display="none";
	document.getElementById(response_id).innerHTML="";
 }

	if(should_return == true)
	 {
		if(s_return == true)
		 {
			return false;
		 } else {
			return true;	
		 }
	 }
	s_return = false;

}

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


var R5_add;
var url = "";
var checked_usernames = "";
var response_user_id = "";
var this_username = "";
var temp_user = "";
var temp_type = "";
function check_username(username,response_id)
{
   response_user_id = response_id;
   this_username = username;
if(checked_usernames.indexOf(";"+username+":") == -1 && username != "" && username != null && username_check.test(username)) // username must not have been already checked have a value 3 - 15 characters and alphanumeric
 {
	xml_http=get_xml_http_obj();
	if(xml_http==null)
	 {
		return;
	 }

	url='username_check.php';
	xml_http.onreadystatechange=r_state_changed15;
	xml_http.open('POST',url,true);
	xml_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http.send('username='+username);
 } else
if(checked_usernames.indexOf(";"+username+":") == -1 && email_check.test(username)) // email was not already checked and fits the correct format
 {
	response_user_id = response_id;
	this_username = username;
	xml_http=get_xml_http_obj();
	if (xml_http==null)
	 {
		return;
	 }

	url='email_check.php';
	xml_http.onreadystatechange=r_state_changed15;
	xml_http.open('POST',url,true);
	xml_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http.send('email='+username);
 } else
if(checked_usernames.indexOf(username) > -1 && ((username.length>=3 && username.length<=15 && username_check.test(username)) || email_check.test(username)))
 {
	temp_user = checked_usernames.substr(checked_usernames.indexOf(";"+username+":")+2+username.length);
	temp_user = temp_user.substr(0,temp_user.indexOf(";"));
	if(temp_user == "available")
	 {
		temp_type = (response_user_id.indexOf("email") > -1)?"":"Username available!";
		document.getElementById(response_user_id).style.color="#40B000";
		document.getElementById(response_user_id).style.display="inline-block";
		document.getElementById(response_user_id).innerHTML=temp_type;
		temp_type = "";
	 } else {
		temp_type = (response_user_id.indexOf("email") > -1)?"Email already in use.":"Username not available.";
		document.getElementById(response_user_id).style.display="inline-block";
		document.getElementById(response_user_id).innerHTML=temp_type;
		temp_type = "";
	 }

 }
}


var R5_rec;
function r_state_changed15()
{
if (xml_http.readyState==4 || xml_http.readyState=='complete')
 { 
  R5_rec=xml_http.responseText;
  if(R5_rec.indexOf("taken") >= 0) // if response from server contains taken
   {
	temp_type = (response_user_id.indexOf("email") > -1)?"Email already in use.":"Username not available.";
	checked_usernames += ";"+this_username+":taken;";
	document.getElementById(response_user_id).style.display="inline-block";
	document.getElementById(response_user_id).innerHTML=temp_type;
	temp_type = "";
   } else
  if(R5_rec.indexOf("available") >= 0) // if response from server contains available
   {
	temp_type = (response_user_id.indexOf("email") > -1)?"":"Username available!";
	checked_usernames += ";"+this_username+":available;";
	document.getElementById(response_user_id).style.color="#40B000";
	document.getElementById(response_user_id).style.display=(response_user_id.indexOf("email") > -1)?"none":"inline-block";
	document.getElementById(response_user_id).innerHTML=temp_type;
	temp_type = "";
   } else
  if(R5_rec == "Database Error.") // if response from server contains available
   {
	document.getElementById(response_user_id).style.display="inline-block";
	document.getElementById(response_user_id).innerHTML="Database Error.";
   } else {
	document.getElementById(response_user_id).style.display="inline-block";
	document.getElementById(response_user_id).innerHTML=R5_rec;
   }
 }
}

var return_check_fields = true;
var gender_checked = false;
var dummy_bool = false;
var gender_count = 0;
var check_tempobj,check_tempblur,check_tempeval,form_obj;
function check_fields(should_return)
{
return_check_fields = true;
form_obj=document.getElementById("form_check");
for (var i=0;i<form_obj.length;i++)
  {
	if(form_obj.elements[i].name != "gender" && form_obj.elements[i].name != "description" && form_obj.elements[i].name != "file" && form_obj.elements[i].type != "submit" && form_obj.elements[i].type != "hidden" && form_obj.elements[i].type.indexOf("select") == -1)
	 {
		check_tempobj = form_obj.elements[i];
		check_tempblur = check_tempobj.onblur.toString();
		check_tempeval = check_tempblur.substring((check_tempblur.indexOf("require_filled")+26),(check_tempblur.indexOf(");")));
		
		if(return_check_fields == true)
		 {
			return_check_fields = eval("require_filled(true,document.getElementById('"+check_tempobj.id+"'),"+check_tempeval+")");
		 } else {
			dummy_bool = eval("require_filled(true,document.getElementById('"+check_tempobj.id+"'),"+check_tempeval+")");
		 }
	 } else
	if(form_obj.elements[i].name == "gender")
	 {
		if(form_obj.elements[i].checked || gender_checked == true)
		 {
			gender_checked = true;
			document.getElementById("input_gender").style.display="none";
			document.getElementById("input_gender").innerHTML="";
		 } else
		if(gender_count < 1)
		 {
			gender_count = 1;
		 } else {
			return_check_fields = false;
			gender_checked = false;
			gender_count = 0;
			document.getElementById("input_gender").style.display="inline-block";
			document.getElementById("input_gender").innerHTML="You Must Select a Gender.";
		 }
	 } else
	if(form_obj.elements[i].name == "description")
	 {
		if(document.getElementById("description").value.length > 250)
		 {
			return_check_fields = false;
			document.getElementById("input_description").style.display="inline-block";
			document.getElementById("input_description").innerHTML="Maximum of 250 characters.";
		 }
	 }
  }
if(should_return){if(return_check_fields){document.getElementById("form_submit").value = "Working...";} return return_check_fields;}
}

function hide_error_exp(hide_err_id)
{
	document.getElementById(hide_err_id).innerHTML = "";
	document.getElementById(hide_err_id).style.display = "none";
}