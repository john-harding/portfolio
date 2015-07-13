
var temp_report_obj;
function show_report(report_link_obj)
{
	temp_report_obj = report_link_obj.parentNode.getElementsByTagName("ul")[0];
	temp_report_obj.style.display = "block";
	temp_report_obj.onmouseout = function(){this.getAttribute("style");this.removeAttribute("style");};
}


var xml_http9;
function send_report(t_post_id,rp_id,report_type)
{
	tp_post_num = t_post_id.substr(1);  // gets the post # -- what is sent to the server
	rp_reply_num = rp_id.substr(1); // gets reply # -- what is sent to the server

	xml_http9=get_xml_http_obj();
	if(xml_http9==null)
	 {
		return;
	 }

	url='report_post.php';
	xml_http9.onreadystatechange=r_state_changed9;
	xml_http9.open('POST',url,true);
	xml_http9.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http9.send('t_post_id='+tp_post_num+'&reply_id='+rp_reply_num+'&report_type='+report_type);
}

function r_state_changed9()
{
if (xml_http9.readyState==4 || xml_http9.readyState=='complete')
 {
	R5_rec=xml_http9.responseText;

	//document.getElementById("test_results").innerHTML +=R5_rec+"<br />"; // for testing

	if(R5_rec.indexOf("success") > -1)
	 {
		show_display_t("Report received.",5);
	 } else
	if(R5_rec.indexOf("duplicate") > -1)
	 {
		show_display_t("Your report has already been submitted.",5);
	 } else
	if(R5_rec.indexOf("error") > -1)
	 {
		show_display_t("Error occurred.",5);
	 }
 }
}