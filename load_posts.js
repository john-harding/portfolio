var i_cat=0;
var mid_obj;
var u_d_c = 0;
var id_hold = [];
function add_post(is_bottom,username,up,down,img_loc,title,content,categories,time,id,num,website,past_rep,total_score,p_date,reply_date,sort_order,sh_cat,sh_us,hd_cat,hd_us,from,num_replies,time_title,attached_image_loc,user_accountid,user_tags)
{
	var new_p_hold,new_p_out,new_a_hiderp,new_voteud,new_up,new_cn,new_dn,new_d_post,new_d_img,new_d_words,new_d_title,new_a_title,new_title,new_d_content,new_content;
	var new_contenta,new_content_arr,new_content_arr2,c_a,c_loc1,c_loc2,temp_content,temp_content2,new_br,new_p_ex,new_d_bot,new_p_label,new_p_time,new_p_link;
	var new_l_links,new_l_n_link,new_l_r_link,new_report_link,new_holder_div,new_div_out,new_char_div,new_new_reply,new_text_content,new_sub_reply_btn,new_all_rp;
	var attached_img_div,attached_img_a,attached_img_img,attached_img_filler,thumb_attached_img,new_report_ul,new_report_ul2,new_report_li_title,new_report_li_title_a;
	var new_report_li,new_report_li_a,new_a_category,cat_i_length,new_ul_category,new_li_category,new_a_category2,new_control_hold,new_img_label,new_img_div,new_img_x;
	var new_feedback_img,new_loading_img,new_upload_form,new_new_img_post,temp_a_href;

	mid_obj = document.getElementById("middle_bottom");
	u_d_c = up-down;

	new_p_hold=document.createElement("div");
		new_p_hold.id = id;
		new_p_hold.className = "post_holder";

		if(is_bottom){mid_obj.appendChild(new_p_hold);} else
		{mid_obj.insertBefore(new_p_hold,mid_obj.childNodes[0]);}

	new_p_out=document.createElement("div");
		new_p_out.id = "post_outer"+post_counter;
		new_p_out.className = "post_outer";
		new_p_hold.appendChild(new_p_out);

	if(attached_image_loc != "")
	 {
		attached_img_div=document.createElement("div");
			attached_img_div.className = "attached_image_div";
			attached_img_div.id = "a_i_d"+post_counter;
			new_p_out.appendChild(attached_img_div);

		attached_img_a=document.createElement("a");
			attached_img_a.id = "a_i_a"+post_counter;
			attached_img_a.href = "javascript:void(0);";
			attached_img_a.setAttribute("data-image",attached_image_loc);
			attached_img_a.setAttribute("data-num",post_counter);
			attached_img_a.onclick = function(){open_image(true,this.getAttribute("data-image"),parseInt(this.getAttribute("data-num")));};
			attached_img_div.appendChild(attached_img_a);

		thumb_attached_img = attached_image_loc.substr(0,(attached_image_loc.lastIndexOf(".")))+"_65"+attached_image_loc.substr(attached_image_loc.lastIndexOf("."));

		attached_img_img=document.createElement("img");
			attached_img_img.id = "a_i_i"+post_counter;
			attached_img_img.src = thumb_attached_img;
			attached_img_a.appendChild(attached_img_img);
	 }


	new_a_hiderp=document.createElement("a");
		new_a_hiderp.className="a_hide_rp";
		new_a_hiderp.id="a_hide_rp"+post_counter;
		new_a_hiderp.href = "javascript:void(0);";
		new_a_hiderp.title = "Minimize";
		new_a_hiderp.setAttribute("data-num",post_counter);
		new_a_hiderp.setAttribute("data-id",id);
		new_a_hiderp.onclick = function(){close_reply(this.getAttribute("data-num"),this.getAttribute("data-id"),true);};
		new_p_out.appendChild(new_a_hiderp);

	new_voteud=document.createElement("div");
		new_voteud.className = "vote_ud";
		new_p_out.appendChild(new_voteud);

	new_up=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
		new_up.className = (past_rep>0)?"up_vote2":"up_vote";
		new_up.id = "up"+post_counter;

		if(user_accountid != R5_accountid)
		 {
			new_up.href = "javascript:void(0);";
			new_up.setAttribute("data-postid",num);
			new_up.setAttribute("data-user_accountid",user_accountid);
			new_up.setAttribute("data-num",post_counter);
			new_up.onclick=function(){upvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-postid"),this.getAttribute("data-num"));} // *****
		 } else {
			new_up.style.cssText = "background:transparent;";
		 }
		new_voteud.appendChild(new_up);

	new_cn=document.createElement("a");
		new_cn.className = "center_vote"+((u_d_c < 0)?" center_vote_red":"");
		new_cn.id = "cen_vote"+post_counter;
		new_cn.href = "javascript:void(0);";
		new_cn.setAttribute("data-post_id",id.substr(1));
		new_cn.onclick = function(){open_upvotes(parseFloat(this.getAttribute("data-post_id")),1);};
		// new_cn.innerHTML = get_inner_vote(u_d_c); // added span directly below this (new_cn_span)
		// if(u_d_c < 0) {new_cn.style.cssText="color:#dd0000;";}
		new_cn.setAttribute("data-p_v",up);
		new_cn.setAttribute("data-n_v",down);
		new_cn.onmouseover = function(){info_message(this.id,1,8,("fontup:"+this.getAttribute("data-p_v")+":endfontfontdn:"+this.getAttribute("data-n_v")+":endfont"),0,"#fff","#000","#000",255);};
		new_voteud.appendChild(new_cn);

	new_cn_span=document.createElement("span");
		new_cn_span.innerHTML = get_inner_vote(u_d_c);
		new_cn.appendChild(new_cn_span);

	new_dn=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
		new_dn.className = (past_rep<0)?"down_vote2":"down_vote";
		new_dn.id = "down"+post_counter;

		if(user_accountid != R5_accountid)
		 {
			new_dn.href = "javascript:void(0);";
			new_dn.setAttribute("data-postid",num);
			new_dn.setAttribute("data-user_accountid",user_accountid);
			new_dn.setAttribute("data-num",post_counter);
			new_dn.onclick=function(){downvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-postid"),this.getAttribute("data-num"));} // *****
		 } else {
			new_dn.style.cssText = "background:transparent;";
		 }
		new_voteud.appendChild(new_dn);

	new_d_post=document.createElement("div");
		new_d_post.className = "display_post";
		new_p_out.appendChild(new_d_post);

	new_d_img=document.createElement("a");
		new_d_img.className = "display_img";
		new_d_img.href = username;
		new_d_img.style.cssText = "background:url('"+img_loc+"') no-repeat center;";
		new_d_post.appendChild(new_d_img);

	new_d_words=document.createElement("div");
		new_d_words.className = "display_words";
		new_d_post.appendChild(new_d_words);

	new_d_title=document.createElement("div");
		new_d_title.className = "dis_title_row";
		new_d_words.appendChild(new_d_title);

	new_a_title=document.createElement("a");
		new_a_title.className = "post_title_a";
		new_a_title.href = username;
		new_a_title.innerHTML = username;
		new_d_title.appendChild(new_a_title);

	if(title != "")
	 {
	if(title.substr(0,3) != " - ")
	 {
		new_title=document.createTextNode(" - ");
			new_d_title.appendChild(new_title);
	 }
	new_title=document.createElement("b");
		new_title.innerHTML = title;
		new_d_title.appendChild(new_title);
	 }

	if(from != "load")
	 {
		new_d_content=document.createElement("div");
			new_d_content.className = "dis_post_content";
			new_d_words.appendChild(new_d_content);

		if(attached_image_loc != "")
		 {
			attached_img_filler=document.createElement("div");
				attached_img_filler.className = "attached_image_filler";
				attached_img_filler.id = "a_i_f"+post_counter;
				new_d_content.appendChild(attached_img_filler);
		 }

		new_content_arr = content.split("\n");
		for(c_a = 0;c_a < new_content_arr.length;c_a++)
		 {
			temp_content = link_make(new_content_arr[c_a]);
			while(temp_content.indexOf("LINKURL:")> -1 && temp_content.indexOf(":ENDLINK") > -1)
			 {
				c_loc1 = temp_content.indexOf("LINKURL:");
				c_loc2 = temp_content.indexOf(":ENDLINK")+10;
				temp_content2 = temp_content.substring(c_loc1,c_loc2);
				new_content_arr2 = temp_content.split(temp_content2);

				new_content=document.createTextNode(new_content_arr2[0]);
					new_d_content.appendChild(new_content);

				temp_a_href = temp_content2.substring(8,(temp_content2.length-10));
				temp_a_href = (temp_a_href.indexOf("http") > -1)?temp_a_href:("http://"+temp_a_href);

				new_contenta=document.createElement("a");
					new_contenta.className = "page_link";
					new_contenta.setAttribute("rel","nofollow");
					new_contenta.setAttribute("target","_blank");
					new_contenta.href = temp_a_href;
					new_contenta.innerHTML =  temp_content2.substring(8,(temp_content2.length-10));
					new_d_content.appendChild(new_contenta);

				temp_content = new_content_arr2[1];

				new_content_arr2.length = 0;
/*
				new_content=document.createTextNode(new_content_arr2[1]);
					new_d_content.appendChild(new_content);
*/

	// a class="post_external" rel="nofollow" target="_blank"  href="$&">$&</a>
			 }

			new_content=document.createTextNode(temp_content);
				new_d_content.appendChild(new_content);

			if(!((c_a+1) >= new_content_arr.length))
			 {
				new_br = document.createElement('br');
					new_d_content.appendChild(new_br);
			 }

/*
			new_content_arr2 = temp_content.split("\n");
			new_content=document.createTextNode();
				new_d_content.appendChild(new_content);
*/
		 }


		if(user_tags != undefined && user_tags != null && user_tags != "")
		 {
			var temp_user_tags = user_tags.split(",");
			for(var tut=0;tut<temp_user_tags.length;tut++)
			 {
				var inHTML_c = new_d_content.innerHTML;
				var lowerc_content = inHTML_c.toLowerCase();
				var temp_tag_loc = lowerc_content.indexOf("@"+temp_user_tags[tut].toLowerCase());

				new_d_content.innerHTML = inHTML_c.substring(0,temp_tag_loc)+'<a class="page_link" rel="nofollow" href="'+R5_link_url+temp_user_tags[tut]+'">@'+temp_user_tags[tut]+'</a>'+inHTML_c.substr(temp_tag_loc+temp_user_tags[tut].length+1);
				//content = content.replace("","");
			 }
		 }

	 } else {
		new_d_content=document.createElement("div");
			new_d_content.className = "dis_post_content";
			new_d_words.appendChild(new_d_content);

		if(attached_image_loc != "")
		 {
			attached_img_filler=document.createElement("div");
				attached_img_filler.className = "attached_image_filler";
				attached_img_filler.id = "a_i_f"+post_counter;
				new_d_content.appendChild(attached_img_filler);
		 }

		new_d_content.innerHTML += content;
	 }

	new_p_ex=document.createElement("a");
		new_p_ex.className = "post_expand";
		new_p_ex.id = "post_expand"+post_counter;
		new_p_ex.onclick = function(){expand(this);}
		new_p_ex.href = "javascript:void(0);";
		new_p_ex.innerHTML = "Expand";
		new_d_content.appendChild(new_p_ex);

	new_d_bot=document.createElement("div");
		new_d_bot.className = "display_bottom";
		new_d_words.appendChild(new_d_bot);

	new_p_label=document.createElement("ul");
		new_p_label.className = "post_label";
		new_p_label.id = "lbl_cat_"+post_counter;
		new_d_bot.appendChild(new_p_label);

	cat_i_length = categories.length;
	new_a_category=document.createElement("a");
		new_a_category.className = "page_link";
		new_a_category.href = "category/"+categories[0].replace(/ /g,"-");
		new_a_category.innerHTML = categories[0];
		if(cat_i_length > 1)
		 {
			new_a_category.style.cssText = "text-decoration:underline;";
		 }
		new_p_label.appendChild(new_a_category);

	if(cat_i_length > 1)
	 {
		new_ul_category=document.createElement("ul");
			new_p_label.appendChild(new_ul_category);
		
		for(i_cat = 0;i_cat < cat_i_length;i_cat++)
		 {
			new_li_category=document.createElement("li");
				new_ul_category.appendChild(new_li_category);

			new_a_category2=document.createElement("a");
				new_a_category2.className = "page_link";
				new_a_category2.href = "category/"+categories[i_cat].replace(/ /g,"-");
				new_a_category2.innerHTML = categories[i_cat];
				new_li_category.appendChild(new_a_category2);
		 }
	 }


	new_p_time=document.createElement("span");
		new_p_time.className = "post_time";
		new_p_time.innerHTML = time;
		if(time.indexOf(":") == -1)
		 {
			new_p_time.title = get_full_date(new Date(parseInt(p_date)));
		 }
		new_d_bot.appendChild(new_p_time);

	if(website != null && website != "")
	 {
	new_p_link=document.createElement("a");
		new_p_link.className = "post_link";
		new_p_link.setAttribute("rel","nofollow");
		new_p_link.setAttribute("target","_blank");
		new_p_link.href =  website;
		new_p_link.title =  "View Original Post on "+website;
		new_p_link.innerHTML = "posted on "+website;
		new_d_bot.appendChild(new_p_link);
	 }

	new_l_links=document.createElement("div");
		new_l_links.className = "reply_links";
		new_l_links.id = "reply_links"+post_counter;
		new_d_bot.appendChild(new_l_links);


	new_l_n_link=document.createElement("a");
		new_l_n_link.className = "reply_link reply_l_margin";
		new_l_n_link.href = "javascript:void(0);";
		new_l_n_link.innerHTML =  ((num_replies==0)?'1':num_replies)+((num_replies>1)?" Replies":" Reply"); // num replies will say 1 reply even if there are none; if user replies to post with no replies, it will become visible with "1 Reply"

		if(num_replies == 0)
		 {
			new_l_n_link.style.cssText = "display:none;";
		 }
		new_l_n_link.setAttribute("data-counter",post_counter);
		new_l_n_link.setAttribute("data-postid",id);
		new_l_n_link.onclick = function(){open_reply(this.getAttribute("data-counter"),this.getAttribute("data-postid"),true);};
		new_l_n_link.title = "Show Replies";
		new_l_links.appendChild(new_l_n_link);

	new_l_r_link=document.createElement("a");
		new_l_r_link.className = "reply_link reply_l_margin";
		new_l_r_link.href = "javascript:void(0);";
		new_l_r_link.innerHTML = "Reply";
		new_l_r_link.setAttribute("data-counter",post_counter);
		new_l_r_link.setAttribute("data-postid",id);
		new_l_r_link.onclick = function(){open_reply(this.getAttribute("data-counter"),this.getAttribute("data-postid"),false);};
		new_l_links.appendChild(new_l_r_link);

// 

	new_report_ul=document.createElement("ul");
		new_report_ul.className = "report_menu";
		new_l_links.appendChild(new_report_ul);

	new_report_link=document.createElement("a");
		new_report_link.className = "reply_link";
		new_report_link.href = "javascript:void(0);";
		new_report_link.innerHTML = "Report";
		new_report_link.onclick = function(){show_report(this);};
		new_report_ul.appendChild(new_report_link);

	new_report_ul2=document.createElement("ul");
		new_report_ul.appendChild(new_report_ul2);

	new_report_li_title=document.createElement("li");
		new_report_li_title.className = "report_menu_title";
		new_report_ul2.appendChild(new_report_li_title);

	new_report_li_title_a=document.createElement("a");
		new_report_li_title_a.innerHTML = "Report";
		new_report_li_title.appendChild(new_report_li_title_a);

	new_report_li=document.createElement("li");
		new_report_ul2.appendChild(new_report_li);

	new_report_li_a=document.createElement("a");
		new_report_li_a.className = "reply_link";
		new_report_li_a.href = "javascript:void(0);";
		new_report_li_a.innerHTML = "Spam";
		new_report_li_a.setAttribute("data-postid",id);
		new_report_li_a.onclick = function(){send_report(this.getAttribute("data-postid"),"","spam");};
		new_report_li.appendChild(new_report_li_a);

	new_report_li=document.createElement("li");
		new_report_ul2.appendChild(new_report_li);

	new_report_li_a=document.createElement("a");
		new_report_li_a.className = "reply_link";
		new_report_li_a.href = "javascript:void(0);";
		new_report_li_a.innerHTML = "Obscene";
		new_report_li_a.setAttribute("data-postid",id);
		new_report_li_a.onclick = function(){send_report(this.getAttribute("data-postid"),"","obscenity");};
		new_report_li.appendChild(new_report_li_a);

	new_report_li=document.createElement("li");
		new_report_ul2.appendChild(new_report_li);

	new_report_li_a=document.createElement("a");
		new_report_li_a.className = "reply_link";
		new_report_li_a.href = "javascript:void(0);";
		new_report_li_a.innerHTML = "Off Topic";
		new_report_li_a.setAttribute("data-postid",id);
		new_report_li_a.onclick = function(){send_report(this.getAttribute("data-postid"),"","offtopic");};
		new_report_li.appendChild(new_report_li_a);


// ***

		new_holder_div=document.createElement("div");
			new_holder_div.className = "reply_holder";
			new_holder_div.id = "reply_holder"+post_counter;
			new_p_hold.appendChild(new_holder_div);

		new_div_out=document.createElement("div");
			new_div_out.className = "reply_outer";
			//new_div_out.id = "reply_outer"+post_counter;
			new_holder_div.appendChild(new_div_out);

		new_char_div=document.createElement("div");
			new_char_div.className = "reply_char_remain";
			new_char_div.id = "r_remain_chars"+post_counter;
			new_char_div.innerHTML = "1000";
			new_div_out.appendChild(new_char_div);

		new_new_reply=document.createElement("div");
			new_new_reply.className = "new_reply";
			//new_new_reply.id = "new_reply"+post_counter;
			new_div_out.appendChild(new_new_reply);

		new_text_content=document.createElement("textarea");
			new_text_content.id = "reply_content"+post_counter;
			new_text_content.setAttribute("data-num",post_counter);
			new_text_content.onkeydown=function(){update_count_rp(this.getAttribute("data-num"));};
			new_text_content.onkeyup=function(){update_count_rp(this.getAttribute("data-num"));};
			new_new_reply.appendChild(new_text_content);

		new_sub_reply_btn=document.createElement("input");
			new_sub_reply_btn.type = "button";
			new_sub_reply_btn.className = "light_gray_img";
			new_sub_reply_btn.value = "Reply";
			new_sub_reply_btn.setAttribute("data-num",post_counter);
			new_sub_reply_btn.setAttribute("data-postid",id);
			new_sub_reply_btn.onclick=function(){submit_reply(this.getAttribute("data-num"),"",this.getAttribute("data-postid"),0,this);};
			new_new_reply.appendChild(new_sub_reply_btn);
// *****


		new_control_hold=document.createElement("div");
			new_control_hold.className="reply_controls";
			new_new_reply.appendChild(new_control_hold);

		new_img_label=document.createElement("label");
			new_img_label.id="img_picture"+post_counter;
			new_img_label.className="img_picture";
			new_img_label.style.cssText="display:block;";
			new_img_label.setAttribute("for",("img_post"+post_counter));
			new_img_label.setAttribute("data-pnumber",post_counter);
			new_img_label.onmouseover=function(){info_message(this.id,2,8,'Attach Image',0)};

			if(is_firefox)
			 {
				new_img_label.onclick=function(){img_double_click(1,document.getElementById('img_post'+this.getAttribute("data-pnumber")));}
			 }
			new_control_hold.appendChild(new_img_label);

		new_img_div=document.createElement("div");
			new_img_div.className="post_img_data";
			new_img_div.id="post_img_data"+post_counter;
			new_control_hold.appendChild(new_img_div);

		new_img_x=document.createElement("div");
			new_img_x.className="close_x_img";
			new_img_x.title="Remove";
			new_img_x.id="close_x_img"+post_counter;
			new_img_x.setAttribute("data-pnumber",post_counter);
			new_img_x.onclick=function() { remove_img_upload('img_post','post_img_data','close_x_img','img_picture',this.getAttribute("data-pnumber"));};
			new_control_hold.appendChild(new_img_x);

		new_feedback_img=document.createElement("div");
			new_feedback_img.id="feedback_image"+post_counter;
			new_feedback_img.className="feedback_image";
			new_control_hold.appendChild(new_feedback_img);

		new_loading_img=document.createElement("div");
			new_loading_img.id="loading_image"+post_counter;
			new_loading_img.className="loading_image";
			new_control_hold.appendChild(new_loading_img);

		new_upload_form=document.createElement("form");
			new_upload_form.id="form_image"+post_counter;
			new_upload_form.method="post";
			new_upload_form.enctype="multipart/form-data";
			new_upload_form.action="post_image.php";
			new_upload_form.target="image_iframe";
			new_control_hold.appendChild(new_upload_form);

		new_new_img_post=document.createElement("input");
			new_new_img_post.type="file";
			new_new_img_post.name="file";
			new_new_img_post.id="img_post"+post_counter;
			new_new_img_post.className="file_hide";
			new_new_img_post.setAttribute("accept","image/*");
			new_new_img_post.setAttribute("data-pnumber",post_counter);

			if(!is_ie && !is_safari)
			 {
				new_new_img_post.style.cssText="display:none;";
			 }
			if(is_firefox)
			 {
				new_img_label.onclick=function(){return img_double_click(0,null);}
			 }

			new_new_img_post.onchange=function(){img_uploader(this.value,'post_img_data','close_x_img','img_picture',this.getAttribute("data-pnumber"));};
			new_upload_form.appendChild(new_new_img_post);


// *****



		new_all_rp=document.createElement("div");
			new_all_rp.className = "all_replies all_rp_border";
			new_all_rp.id = "all_reply"+post_counter;
			new_p_hold.appendChild(new_all_rp);



// ***



	post_array.push(new Array(username,up,down,img_loc,title,content,categories.join(),time,id,num,past_rep,total_score,p_date,reply_date,sort_order,website,sh_cat,sh_us,hd_cat,hd_us,attached_image_loc,user_accountid));

	check_expand(post_counter,(post_counter+1),"post");

	//document.getElementById("test_results").innerHTML += post_array[post_counter]+"<br />"; // for testing
	id_hold[id] = post_counter;

	post_counter++;
	posts_shown++;
	loaded_p_shown[loaded_p_string]++;
}

var reply_sort_ch = false; // has user specifically changed the sort for replies, otherwise it will take R5_order;
var reply_sort = "total";

var u_d_c2 = 0;
var reply_counter=0;
var compute_level=0;
var rp_words_width = 592; // these must be the same as the css value
var reply_array=[];
var reply_arr_id=[];
function add_reply(is_bottom,username,up,down,img_loc,content,time,t_post_id,parentid,id,get_level,past_rep,total_score,p_date,reply_date,sort_order,to_append_obj,num_replies,from,attached_image_loc,user_accountid,user_tags)
{
	var rp_div_holder,rp_div,rp_voteud,rp_up,rp_cn,rp_dn,rp_d_img,rp_words,rp_title,rp_a_title,rp_content2,rp_content_arr,rp_con_arc,c_a2,temp_contentrp;
	var c_loc_rp1,c_loc_rp2,temp_contentrp2,rp_content_arr2,rp_in_content,rp_contenta,rp_new_br,rp_p_ex,rp_n_bot,rp_p_time,rp_l_links,rp_l_n_link;
	var rp_l_r_link,rp_report_link,rp_attached_img_div,rp_attached_img_a,rp_thumb_attached_img,rp_attached_img_img,rp_attached_img_filler;
	var rp_report_ul,rp_report_link,rp_report_ul2,rp_report_li_title,rp_report_li_title_a,rp_report_li,rp_report_li_a,temp_a_hrefrp,rp_cn_span;
	u_d_c2 = up-down;

	compute_level = (get_level<=max_level)?get_level:max_level;

	//document.getElementById("test_results").innerHTML += get_level+"<br />"; // for testing

	rp_div_holder=document.createElement("div");
		rp_div_holder.id = t_post_id+id;
		rp_div_holder.className = "reply_div_holder";
		rp_div_holder.style.cssText = "width:"+(rp_div_hold_width-(margin_diff*parseInt(compute_level)+parseInt(compute_level)))+"px;";

		if(is_bottom){to_append_obj.appendChild(rp_div_holder);} else
		if(to_append_obj.childNodes[0]){to_append_obj.insertBefore(rp_div_holder,to_append_obj.childNodes[0]);} else
		{to_append_obj.appendChild(rp_div_holder);}

	rp_div=document.createElement("div");
		rp_div.id = "rd_"+reply_counter;
		rp_div.className = "reply_div";
		rp_div_holder.appendChild(rp_div);

	if(attached_image_loc != "")
	 {
		rp_attached_img_div=document.createElement("div");
			rp_attached_img_div.className = "attached_image_div";
			rp_attached_img_div.id = "r_i_d"+reply_counter;
			rp_div.appendChild(rp_attached_img_div);

		rp_attached_img_a=document.createElement("a");
			rp_attached_img_a.id = "r_i_a"+reply_counter;
			rp_attached_img_a.href = "javascript:void(0);";
			rp_attached_img_a.setAttribute("data-image",attached_image_loc);
			rp_attached_img_a.setAttribute("data-id",id);
			rp_attached_img_a.onclick = function(){open_image(false,this.getAttribute("data-image"),this.getAttribute("data-id"));};
			rp_attached_img_div.appendChild(rp_attached_img_a);

		rp_thumb_attached_img = attached_image_loc.substr(0,(attached_image_loc.lastIndexOf(".")))+"_65"+attached_image_loc.substr(attached_image_loc.lastIndexOf("."));

		rp_attached_img_img=document.createElement("img");
			rp_attached_img_img.id = "r_i_i"+reply_counter;
			rp_attached_img_img.src = rp_thumb_attached_img;
			rp_attached_img_a.appendChild(rp_attached_img_img);
	 }

	rp_voteud=document.createElement("div");
		rp_voteud.className = "vote_ud";
		rp_div.appendChild(rp_voteud);

	rp_up=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
		rp_up.className = (past_rep>0)?"rep_up_vote2":"rep_up_vote";
		rp_up.id = "up"+id;

		if(user_accountid != R5_accountid)
		 {
			rp_up.href = "javascript:void(0);";
			rp_up.setAttribute("data-rpid",id);
			rp_up.setAttribute("data-tpostid",t_post_id);
			rp_up.setAttribute("data-user_accountid",user_accountid);
			rp_up.onclick=function(){rp_upvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-tpostid"),this.getAttribute("data-rpid"));} // *****
		 } else {
			rp_up.style.cssText = "background:transparent;";
		 }
		rp_voteud.appendChild(rp_up);
/*
	rp_cn=document.createElement("span");
		rp_cn.className = "center_vote";
		rp_cn.id = "cen_vote"+id;
		rp_cn.innerHTML = get_inner_vote(u_d_c2);
		if(u_d_c2 < 0) {rp_cn.style.cssText="color:#dd0000;";}
		rp_cn.setAttribute("data-p_v",up);
		rp_cn.setAttribute("data-n_v",down);
		rp_cn.onmouseover = function(){info_message(this.id,1,8,("fontup:"+this.getAttribute("data-p_v")+":endfontfontdn:"+this.getAttribute("data-n_v")+":endfont"),0,"#fff","#000","#000");};
		rp_voteud.appendChild(rp_cn);

*/

	rp_cn=document.createElement("span");
		rp_cn.className = "center_vote"+((u_d_c2 < 0)?" center_vote_red":"");
		rp_cn.id = "cen_vote"+id;
		rp_cn.href = "javascript:void(0);";
		rp_cn.setAttribute("data-post_id",id.substr(1));
		rp_cn.onclick = function(){open_upvotes(parseFloat(this.getAttribute("data-post_id")),0);};
		// new_cn.innerHTML = get_inner_vote(u_d_c); // added span directly below this (new_cn_span)
		// if(u_d_c < 0) {new_cn.style.cssText="color:#dd0000;";}
		rp_cn.setAttribute("data-p_v",up);
		rp_cn.setAttribute("data-n_v",down);
		rp_cn.onmouseover = function(){info_message(this.id,1,8,("fontup:"+this.getAttribute("data-p_v")+":endfontfontdn:"+this.getAttribute("data-n_v")+":endfont"),0,"#fff","#000","#000",255);};
		rp_voteud.appendChild(rp_cn);

	rp_cn_span=document.createElement("span");
		rp_cn_span.innerHTML = get_inner_vote(u_d_c2);
		rp_cn.appendChild(rp_cn_span);

	rp_dn=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
		rp_dn.className = (past_rep<0)?"rep_down_vote2":"rep_down_vote";
		rp_dn.id = "down"+id;

		if(user_accountid != R5_accountid)
		 {
			rp_dn.href = "javascript:void(0);";
			rp_dn.setAttribute("data-rpid",id);
			rp_dn.setAttribute("data-tpostid",t_post_id);
			rp_dn.setAttribute("data-user_accountid",user_accountid);
			rp_dn.onclick=function(){rp_downvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-tpostid"),this.getAttribute("data-rpid"));} // *****
		 } else {
			rp_dn.style.cssText = "background:transparent;";
		 }
		rp_voteud.appendChild(rp_dn);


	rp_d_img=document.createElement("a");
		rp_d_img.className = "display_img";
		rp_d_img.href = username;
		rp_d_img.style.cssText = "background:url('"+img_loc+"') no-repeat center;";
		rp_div.appendChild(rp_d_img);

	rp_words=document.createElement("div");
		rp_words.className = "reply_words";
		rp_words.style.cssText = "width:"+(rp_words_width-(margin_diff*parseInt(compute_level)+parseInt(compute_level)))+"px;";
		rp_div.appendChild(rp_words);

	rp_title=document.createElement("div");
		rp_title.className = "reply_title_row";
		rp_words.appendChild(rp_title);

	rp_a_title=document.createElement("a");
		rp_a_title.className = "post_title_a";
		rp_a_title.href = username;
		rp_a_title.innerHTML = username;
		rp_title.appendChild(rp_a_title);
/*
	rp_content2=document.createElement("div");
		rp_content2.className = "reply_content";
		rp_words.appendChild(rp_content2);
*/


	if(from != "load")
	 {
		rp_content2=document.createElement("div");
			rp_content2.className = "reply_content";
			rp_words.appendChild(rp_content2);

		if(attached_image_loc != "")
		 {
			rp_attached_img_filler=document.createElement("div");
				rp_attached_img_filler.id = "r_i_f"+reply_counter;
				rp_attached_img_filler.className = "attached_image_filler";
				rp_content2.appendChild(rp_attached_img_filler);
		 }

		rp_content_arr = content.split("\n");
		rp_con_arc = rp_content_arr.length;
		for(c_a2 = 0;c_a2 < rp_con_arc;c_a2++)
		 {
			temp_contentrp = link_make(rp_content_arr[c_a2]);
			while(temp_contentrp.indexOf("LINKURL:")> -1 && temp_contentrp.indexOf(":ENDLINK") > -1)
			 {
				c_loc_rp1 = temp_contentrp.indexOf("LINKURL:");
				c_loc_rp2 = temp_contentrp.indexOf(":ENDLINK")+10;
				temp_contentrp2 = temp_contentrp.substring(c_loc_rp1,c_loc_rp2);
				rp_content_arr2 = temp_contentrp.split(temp_contentrp2);

				rp_in_content=document.createTextNode(rp_content_arr2[0]);
					rp_content2.appendChild(rp_in_content);

				temp_a_hrefrp = temp_contentrp2.substring(8,(temp_contentrp2.length-10));
				temp_a_hrefrp = (temp_a_hrefrp.indexOf("http") > -1)?temp_a_hrefrp:("http://"+temp_a_hrefrp);

				rp_contenta=document.createElement("a");
					rp_contenta.className = "page_link";
					rp_contenta.setAttribute("rel","nofollow");
					rp_contenta.setAttribute("target","_blank");
					rp_contenta.href = temp_a_hrefrp;
					rp_contenta.innerHTML =  temp_contentrp2.substring(8,(temp_contentrp2.length-10));
					rp_content2.appendChild(rp_contenta);

				temp_contentrp = rp_content_arr2[1];

				rp_content_arr2.length = 0;
/*
				rp_in_content=document.createTextNode(rp_content_arr2[1]);
					rp_content2.appendChild(rp_in_content);
*/


	// a class="post_external" rel="nofollow" target="_blank"  href="$&">$&</a>

			 }

			rp_in_content=document.createTextNode(temp_contentrp);
				rp_content2.appendChild(rp_in_content);

			if(!((c_a2+1) >= rp_content_arr.length))
			 {
				rp_new_br = document.createElement('br');
					rp_content2.appendChild(rp_new_br);
			 }

/*
			rp_content_arr2 = temp_contentrp.split("\n");
			rp_in_content=document.createTextNode();
				rp_content2.appendChild(rp_in_content);
*/
		 }

		if(user_tags != undefined && user_tags != null && user_tags != "")
		 {
			var temp_user_tags = user_tags.split(",");
			for(var tut=0;tut<temp_user_tags.length;tut++)
			 {
				var inHTML_c = rp_content2.innerHTML;
				var lowerc_content = inHTML_c.toLowerCase();
				var temp_tag_loc = lowerc_content.indexOf("@"+temp_user_tags[tut].toLowerCase());

				rp_content2.innerHTML = inHTML_c.substring(0,temp_tag_loc)+'<a class="page_link" rel="nofollow" href="'+R5_link_url+temp_user_tags[tut]+'">@'+temp_user_tags[tut]+'</a>'+inHTML_c.substr(temp_tag_loc+temp_user_tags[tut].length+1);
				//content = content.replace("","");
			 }
		 }
	 } else {

		rp_content2=document.createElement("div");
			rp_content2.className = "reply_content";
			//rp_content2.innerHTML = content;
			rp_words.appendChild(rp_content2);

		if(attached_image_loc != "")
		 {
			rp_attached_img_filler=document.createElement("div");
				rp_attached_img_filler.id = "r_i_f"+reply_counter;
				rp_attached_img_filler.className = "attached_image_filler";
				rp_content2.appendChild(rp_attached_img_filler);

		 }

		rp_content2.innerHTML += content;

/*
		rp_in_content=document.createTextNode(content);
			rp_content2.appendChild(rp_in_content);


		rp_in_content=document.createElement("div");
			rp_in_content.className = "dis_post_content";
			rp_in_content.innerHTML = content;
			rp_content2.appendChild(rp_in_content);
*/
	 }

	rp_p_ex=document.createElement("a");
		rp_p_ex.className = "post_expand";
		rp_p_ex.id = "rp_expand"+reply_counter;
		rp_p_ex.onclick = function(){expand(this);}
		rp_p_ex.href = "javascript:void(0);";
		rp_p_ex.innerHTML = "Expand";
		rp_content2.appendChild(rp_p_ex);

	rp_n_bot=document.createElement("div");
		rp_n_bot.className = "reply_bottom";
		rp_words.appendChild(rp_n_bot);

	rp_p_time=document.createElement("span");
		rp_p_time.className = "reply_time";
		rp_p_time.innerHTML = time;
		if(time.indexOf(":") == -1)
		 {
			rp_p_time.title = get_full_date(new Date(parseInt(p_date)));
		 }
		rp_n_bot.appendChild(rp_p_time);

	rp_l_links=document.createElement("div");
		rp_l_links.className = "reply_links";
		rp_n_bot.appendChild(rp_l_links);

	if(num_replies > 0)
	 {
		rp_l_n_link=document.createElement("a");
			rp_l_n_link.className = "reply_link reply_l_margin";
			rp_l_n_link.href = "javascript:void(0);";
			rp_l_n_link.innerHTML =  num_replies+((num_replies>1)?" Replies":" Reply");
			rp_l_n_link.setAttribute("data-level",get_level);
			rp_l_n_link.setAttribute("data-counter",reply_counter);
			rp_l_n_link.setAttribute("data-postid",t_post_id);
			rp_l_n_link.setAttribute("data-replyid",id);
			rp_l_n_link.onclick = function(){open_reply2(this.getAttribute("data-counter"),this.getAttribute("data-postid"),this.getAttribute("data-replyid"),parseInt(this.getAttribute("data-level")),true);};
			rp_l_n_link.title = "Show Replies";
			rp_l_links.appendChild(rp_l_n_link);
	 }

	rp_l_r_link=document.createElement("a");
		rp_l_r_link.className = "reply_link reply_l_margin";
		rp_l_r_link.href = "javascript:void(0);";
		rp_l_r_link.innerHTML = "Reply";
		rp_l_r_link.setAttribute("data-level",get_level);
		rp_l_r_link.setAttribute("data-counter",reply_counter);
		rp_l_r_link.setAttribute("data-postid",t_post_id);
		rp_l_r_link.setAttribute("data-replyid",id);
		rp_l_r_link.onclick = function(){open_reply2(this.getAttribute("data-counter"),this.getAttribute("data-postid"),this.getAttribute("data-replyid"),parseInt(this.getAttribute("data-level")),false);};
		rp_l_links.appendChild(rp_l_r_link);

// ***
// 
// 

	rp_report_ul=document.createElement("ul");
		rp_report_ul.className = "report_menu";
		rp_l_links.appendChild(rp_report_ul);

	rp_report_link=document.createElement("a");
		rp_report_link.className = "reply_link";
		rp_report_link.href = "javascript:void(0);";
		rp_report_link.innerHTML = "Report";
		rp_report_link.onclick = function(){show_report(this);};
		rp_report_ul.appendChild(rp_report_link);

	rp_report_ul2=document.createElement("ul");
		rp_report_ul.appendChild(rp_report_ul2);

	rp_report_li_title=document.createElement("li");
		rp_report_li_title.className = "report_menu_title";
		rp_report_ul2.appendChild(rp_report_li_title);

	rp_report_li_title_a=document.createElement("a");
		rp_report_li_title_a.innerHTML = "Report";
		rp_report_li_title.appendChild(rp_report_li_title_a);

	rp_report_li=document.createElement("li");
		rp_report_ul2.appendChild(rp_report_li);

	rp_report_li_a=document.createElement("a");
		rp_report_li_a.className = "reply_link";
		rp_report_li_a.href = "javascript:void(0);";
		rp_report_li_a.innerHTML = "Spam";
		rp_report_li_a.setAttribute("data-postid",t_post_id);
		rp_report_li_a.setAttribute("data-replyid",id);
		rp_report_li_a.onclick = function(){send_report(this.getAttribute("data-postid"),this.getAttribute("data-replyid"),"spam");};
		rp_report_li.appendChild(rp_report_li_a);


	rp_report_li=document.createElement("li");
		rp_report_ul2.appendChild(rp_report_li);

	rp_report_li_a=document.createElement("a");
		rp_report_li_a.className = "reply_link";
		rp_report_li_a.href = "javascript:void(0);";
		rp_report_li_a.innerHTML = "Obscene";
		rp_report_li_a.setAttribute("data-postid",t_post_id);
		rp_report_li_a.setAttribute("data-replyid",id);
		rp_report_li_a.onclick = function(){send_report(this.getAttribute("data-postid"),this.getAttribute("data-replyid"),"obscenity");};
		rp_report_li.appendChild(rp_report_li_a);

	rp_report_li=document.createElement("li");
		rp_report_ul2.appendChild(rp_report_li);

	rp_report_li_a=document.createElement("a");
		rp_report_li_a.className = "reply_link";
		rp_report_li_a.href = "javascript:void(0);";
		rp_report_li_a.innerHTML = "Off Topic";
		rp_report_li_a.setAttribute("data-postid",t_post_id);
		rp_report_li_a.setAttribute("data-replyid",id);
		rp_report_li_a.onclick = function(){send_report(this.getAttribute("data-postid"),this.getAttribute("data-replyid"),"offtopic");};
		rp_report_li.appendChild(rp_report_li_a);




// ***


	reply_array[id]=[username,parseInt(up),parseInt(down),img_loc,content,time,t_post_id,parentid,id,get_level,past_rep,total_score,p_date,reply_date,sort_order,attached_image_loc,user_accountid];

	reply_arr_id[reply_counter] = id;

	check_expand(reply_counter,(reply_counter+1),"rp");
	reply_counter++;
}

var mid_obj,mid_child,t_ex_obj;
var chk_thumb_img = "";
function check_expand(start_e,num_e,rp_po) // checks to see if post content goes beyond normal height, and if not, any attached image will be expanded
{

for(var id=start_e;id<num_e;id++)
{
	t_ex_obj = document.getElementById(rp_po+"_expand"+id);
	if(!(t_ex_obj.parentNode.scrollHeight > t_ex_obj.parentNode.offsetHeight))
	 {
		t_ex_obj.style.display="none";

		if(rp_po == "post") // it is a post
		 {
//document.getElementById("test_results").innerHTML += id+":"+(post_array[id].length)+"<br />";
			if(post_array[id][20] != "")
			 {
				document.getElementById("a_i_f"+id).style.width = "80px";
				if(!(t_ex_obj.parentNode.scrollHeight > t_ex_obj.parentNode.offsetHeight)) // if after adjustment for larger image post has not expanded beyond normal height
				 {
					chk_thumb_img = post_array[id][20].substr(0,(post_array[id][20].lastIndexOf(".")))+"_90"+post_array[id][20].substr(post_array[id][20].lastIndexOf("."));
					document.getElementById("a_i_d"+id).style.top = "0px";
					document.getElementById("a_i_a"+id).style.width = "90px";
					document.getElementById("a_i_a"+id).style.height = "90px";
					document.getElementById("a_i_i"+id).src = chk_thumb_img;
				 } else {
					document.getElementById("a_i_f"+id).style.width = "55px";
				 }
			 }
		 } else
		if(rp_po == "rp") // it is a reply
		 {
			if(reply_array[reply_arr_id[id]][15] != "")
			 {
				document.getElementById("r_i_f"+id).style.width = "80px";
				if(!(t_ex_obj.parentNode.scrollHeight > t_ex_obj.parentNode.offsetHeight)) // if after adjustment for larger image post has not expanded beyond normal height
				 {
					chk_thumb_img = reply_array[reply_arr_id[id]][15].substr(0,(reply_array[reply_arr_id[id]][15].lastIndexOf(".")))+"_90"+reply_array[reply_arr_id[id]][15].substr(reply_array[reply_arr_id[id]][15].lastIndexOf("."));
					document.getElementById("r_i_d"+id).style.top = "0px";
					document.getElementById("r_i_a"+id).style.width = "90px";
					document.getElementById("r_i_a"+id).style.height = "90px";
					document.getElementById("r_i_i"+id).src = chk_thumb_img;
				 } else {
					document.getElementById("r_i_f"+id).style.width = "55px";
				 }
			 }
		 }
	 } else {

		if(rp_po == "post") // it is a post
		 {
			if(post_array[id][20] != "")
			 {
				t_ex_obj.className = "post_expand post_expand_img";
			 }
		 } else
		if(rp_po == "rp") // it is a reply
		 {
			if(reply_array[reply_arr_id[id]][15] != "")
			 {
				t_ex_obj.className = "post_expand post_expand_img";
				t_ex_obj.style.right = "-2px";
			 }
		 }
	 }
}
}

function hide_img_ups(start_e,num_e)
{
	if(!is_ie && !is_safari)
	 {
		for(var id=start_e;id<num_e;id++)
		 {
			document.getElementById("img_post"+id).style.display = "none";
		 }
	 }
}

var body,html,full_height,screen_height,height_below,filter_obj,current_scroll,display_t_obj;
var filter_offset = 0;
var messaget_offset = 0;
var _x5 = 0;
var _y5 = 0;
var is_loading_p = false;
var hide_reply = [];
var hide_reply_len = 0;
var open_rp_obj,open_rp_obj2;
var rp_top_off = 0;
var rp_ht = 0;
var rp_wt = 0;

function get_top_offset(get_obj)
{
	var top_offset = 0;

	scroll_doc = document.documentElement;
	scroll_body = document.body;
	scroll_top = ((scroll_doc && scroll_doc.scrollTop) || (scroll_body && scroll_body.scrollTop) || 0);
	rect_object = get_obj.getBoundingClientRect();

	top_offset = rect_object.top+scroll_top;

	return top_offset;
}

var left_offset;
function get_left_offset(get_obj)
{
	left_offset = 0;
/*
	while(get_obj && !isNaN(get_obj.offsetLeft))
	 {
		left_offset +=  get_obj.offsetLeft;
		get_obj = get_obj.offsetParent;
	 }
*/
	scroll_doc = document.documentElement;
	scroll_body = document.body;
	scroll_left = ((scroll_doc && scroll_doc.scrollLeft) || (scroll_body && scroll_body.scrollLeft) || 0);
	rect_object = get_obj.getBoundingClientRect();

	left_offset = rect_object.left+scroll_left;

	return left_offset;
}


var rand_end = "";
var return_link="";
var link_match=/(?:https?:\/\/)?(?:[\w-]+\.)?(?:\.?[\w]{2,})(\.(MUSEUM|TRAVEL|AERO|ARPA|ASIA|EDU|GOV|MIL|MOBI|COOP|INFO|NAME|BIZ|CAT|COM|INT|JOBS|NET|ORG|PRO|TEL|A[CDEFGILMNOQRSTUWXZ]|B[ABDEFGHIJLMNORSTVWYZ]|C[ACDFGHIKLMNORUVXYZ]|D[EJKMOZ]|E[CEGHRSTU]|F[IJKMOR]|G[ABDEFGHILMNPQRSTUWY]|H[KMNRTU]|I[DELMNOQRST]|J[EMOP]|K[EGHIMNPRWYZ]|L[ABCIKRSTUVY]|M[ACDEFGHKLMNOPQRSTUVWXYZ]|N[ACEFGILOPRUZ]|OM|P[AEFGHKLMNRSTWY]|QA|R[EOSUW]|S[ABCDEGHIJKLMNORTUVYZ]|T[CDFGHJKLMNOPRTVWZ]|U[AGKMSYZ]|V[ACEGINU]|W[FS]|Y[ETU]|Z[AMW]|xxx)){1,2}((\/[\w-]*)*)((\.[\w]+))?(#[\w]*)?([\?][\w=&%-.]*[a-zA-Z0-9]+)?/i; // must match regex in function replace_links() in submit_post.php and submit_reply.php
var temp_str="";
var result_str="";
var index_str = 0;
var index_len = 0;
var return_str = "";
var previous_end = 0;
function link_make(str)
{
	return_str = "";
	temp_str = str;
	rand_end = Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10));
	while(link_match.test(temp_str))
	 {
		result_str = temp_str.match(link_match);
		//result_str = (result_str.indexOf("http") > -1)?result_str:("http://"+result_str);
		if(typeof result_str !== "string"){result_str = result_str[0];}
		index_str = temp_str.indexOf(result_str);
		index_len = result_str.length;

		return_str += temp_str.substring(0,index_str)+"LINKURL:"+result_str+":ENDLINK"+rand_end;
		return_link = return_str+temp_str.substr(index_str+index_len);
		temp_str = temp_str.substr((index_str+index_len));
		rand_end = Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10));

		previous_end = (index_str+index_len+8+10);
	 }
	return_str += temp_str;
		previous_end = 0;
	return return_str;
}

var pos_str = ",";
var neg_str = ",";
var v_continue = true;
var send_ud = 0;
function upvote(user_accountid,id,center_num,v_return)
{
  if(R5_user != "")
   {
	send_ud = 1;
	if(pos_str.indexOf(","+id+",") > -1 || user_accountid == R5_accountid || post_array[parseInt(center_num)][10] == 1)
	 {
		v_continue = false;

	 } else
	if(neg_str.indexOf(","+id+",") > -1 || post_array[parseInt(center_num)][10] == -1)
	 {
		neg_str = neg_str.substr(0,(neg_str.indexOf(","+id+",")+1))+neg_str.substr(neg_str.indexOf(","+id+",")+2+id.toString().length);
		send_ud = 2;
	 }

	if(v_continue)
	 {
		pos_str += id+",";
		send_vote(user_accountid,id,center_num,send_ud);
	 }
	v_continue = true;
	if(v_return)
	 {
		return true;
	 }
   } else {
	show_display_t("You must log in to add reputation!",0);
	if(v_return)
	 {
		return false;
	 }
   }
}

function downvote(user_accountid,id,center_num,v_return)
{
  if(R5_user != "")
   {
	send_ud = -1;
	if(neg_str.indexOf(","+id+",") > -1 || user_accountid == R5_accountid || post_array[parseInt(center_num)][10] == -1)
	 {
		v_continue = false;
	 } else
	if(pos_str.indexOf(","+id+",") > -1 || post_array[parseInt(center_num)][10] == 1)
	 {
		pos_str = pos_str.substr(0,(pos_str.indexOf(","+id+",")+1))+pos_str.substr(pos_str.indexOf(","+id+",")+2+id.toString().length);
		send_ud = -2;
	 }

	if(v_continue)
	 {
		neg_str += id+",";
		send_vote(user_accountid,id,center_num,send_ud);
	 }
	v_continue = true;
	if(v_return)
	 {
		return true;
	 }
   } else {
	show_display_t("You must log in to do that!",0);
	if(v_return)
	 {
		return false;
	 }
   }
}


var centerv_obj;
var center_new = 0;
var centerv_att="";
var centerv_get=0;
var center_v_com=0;
var center_v_com2=0;
var xml_http4;
function send_vote(user_accountid,id,center_num,udrep)
{

	centerv_obj = document.getElementById("cen_vote"+center_num);
	var c_v_span = return_firstChild(centerv_obj);

	if(Math.abs(udrep) == 1)
	 {
		center_v_com = parseInt(centerv_obj.getAttribute("data-p_v")) - parseInt(centerv_obj.getAttribute("data-n_v"))+udrep;
		center_new = center_v_com;

		centerv_att=(udrep > 0)?"data-p_v":"data-n_v";
		centerv_get = parseInt(centerv_obj.getAttribute(centerv_att))+Math.abs(udrep);
		centerv_obj.setAttribute(centerv_att,centerv_get);
		post_array[parseInt(center_num)][((udrep>0)?(1):(2))]+=1;

	 } else {	// user is changing original vote
		center_v_com = parseInt(centerv_obj.getAttribute("data-p_v"));
		centerv_get = center_v_com+((udrep>0)?(1):(-1));
		post_array[parseInt(center_num)][1]+=((udrep>0)?(1):(-1));
		centerv_obj.setAttribute("data-p_v",centerv_get);

		center_v_com2 = parseInt(centerv_obj.getAttribute("data-n_v"));
		centerv_get = center_v_com2+((udrep>0)?(-1):(1));
		post_array[parseInt(center_num)][2]+=((udrep>0)?(-1):(1));
		centerv_obj.setAttribute("data-n_v",centerv_get);

		center_new = center_v_com - center_v_com2 + udrep;

		if(udrep < 0 && current_page_up.indexOf("p"+id) > -1) // this is for changes in the list of users that have upvoted a post; functions in script.js
		 {
			var v_cut_user1 = hold_v_list[id].indexOf(R5_user+",");
			if(v_cut_user1 != 0)
			 {
				v_cut_user1 = hold_v_list[id].indexOf("*"+R5_user+",");
			 }

			if(v_cut_user1 != -1)
			 {
				var v_cut_str = hold_v_list[id].substr(v_cut_user1);
				var v_cut_user2 = v_cut_str.substring(0,(v_cut_str.indexOf("*")+1));

				hold_v_list[id] = hold_v_list[id].replace(v_cut_user2,"");
				remove_v_list[id] = v_cut_user2;
			 }
		 } else
		if(udrep > 0 && current_page_up.indexOf("p"+id) > -1 && remove_v_list[id]) // this is for changes in the list of users that have upvoted a post; functions in script.js
		 {
			hold_v_list[id] = remove_v_list[id] + hold_v_list[id];
			remove_v_list[id] = null;
		 }
	 }

	//centerv_obj.innerHTML = get_inner_vote(center_new);
	c_v_span.innerHTML = get_inner_vote(center_new);


	//centerv_obj.style.color = (center_new>=0)?"#40b000":"#dd0000";
	centerv_obj.className = (center_new>=0)?"center_vote":"center_vote center_vote_red";

	document.getElementById("up"+center_num).className = (udrep>0)?"up_vote2":"up_vote";
	document.getElementById("down"+center_num).className = (udrep>0)?"down_vote":"down_vote2";
	post_array[parseInt(center_num)][10] = (udrep>0)?1:-1;

	xml_http4=get_xml_http_obj();
	if(xml_http4==null)
	 {
		return;
	 }
	url='user_vote.php';
	xml_http4.onreadystatechange=r_state_changed4;
	xml_http4.open('POST',url,true);
	xml_http4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http4.send('user_accountid='+user_accountid+'&id='+id+'&rep='+udrep)
}

function r_state_changed4()
{
if (xml_http4.readyState==4 || xml_http4.readyState=='complete')
 {
	R5_rec=xml_http4.responseText;
	//document.getElementById("test_results").innerHTML += "HERE:<br />"+R5_rec+"<br />"; // for testing
 }
}

var rp_content = "";
var rp_level = 0;
var hold_rp_id = "";
var hold_tpo_id = "";
var hold_pnumber = 0;
var hold_sub_obj;
var hold_rp_con_obj;
var is_reply_post = false;
var hold_current_reply=[];
function submit_reply(pnumber,rp_id,t_post_id,get_level,submit_obj)
{

document.getElementById("info_hold").style.visibility = "hidden"; // hide info hold so it doesn't look out of place if the reply goes through

if(document.getElementById("img_post"+pnumber).value != "")
 {
	if(!is_finished_up)
	 {
		is_image_attached = true;
	 } else {
		is_finished_up = false;
	 }
 }

tp_post_num = t_post_id.substr(1);  // gets the post # -- what is sent to the server
rp_reply_num = (get_level == 0)?"0":rp_id.substr(1);  // gets the reply # -- what is sent to the server
hold_sub_obj = submit_obj;
hold_rp_con_obj = document.getElementById("reply_content"+pnumber)
rp_content = hold_rp_con_obj.value;
rp_level = get_level;
hold_rp_id = rp_id;
hold_tpo_id = t_post_id;
hold_pnumber = (get_level == 0)?pnumber:rp_id;
if(remove_spaces(rp_content) == "")
 {
	info_message(("reply_content"+pnumber),2,8,"Must enter content.",10,"#fff","#000","#000");
	continue_post = false;
 } else
if(rp_content.length > 1000)
 {
	info_message(("reply_content"+pnumber),2,8,"Maximum of 1000 characters.",10,"#fff","#000","#000");
	continue_post = false;
 }
if(continue_post && !is_image_attached)
 {

hold_sub_obj.disabled=true;
hold_sub_obj.value="Working...";
	xml_http=get_xml_http_obj();
	if(xml_http==null)
	 {
		return;
	 }

	url='submit_reply.php';
	xml_http.onreadystatechange=r_state_changed6;
	xml_http.open('POST',url,true);
	xml_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http.send('content='+encodeURIComponent(rp_content)+'&level='+rp_level+'&reply_id='+rp_reply_num+'&post_id='+tp_post_num);
 } else
if(continue_post && is_image_attached && !is_uploading_image)
 {
	hold_current_reply[0] = pnumber;
	hold_current_reply[1] = rp_id;
	hold_current_reply[2] = t_post_id;
	hold_current_reply[3] = get_level;
	hold_current_reply[4] = submit_obj;
	image_ender = pnumber;
	is_uploading_image = true;
	is_reply_post = true;
	//document.getElementById("feedback_image"+pnumber).innerHTML = "Uploading Image...";
	document.getElementById("loading_image"+pnumber).style.display = "block";

	//document.getElementById("test_results").innerHTML += parseInt(id_hold[reply_array[rp_id][6]])+":"+reply_array[rp_id][6]+"<br />"; // for testing

	if(isNaN(parseInt(pnumber)))
	 {
		document.getElementById("form_image"+pnumber).action="post_image.php?category="+post_array[parseInt(id_hold[reply_array[rp_id][6]])][6]+"&reply=true";
	 } else {
		document.getElementById("form_image"+pnumber).action="post_image.php?category="+post_array[parseInt(pnumber)][6]+"&reply=true";
	 }
	document.getElementById("form_image"+pnumber).submit();
 }

continue_post = true;
 }

var R5_arr;
var all_rp_obj,rep_sorter;
function r_state_changed6()
{
if(xml_http.readyState==4 || xml_http.readyState=='complete')
 {
	R5_rec=xml_http.responseText;
	//document.getElementById("test_results").innerHTML += R5_rec+"<br />"; // for testing

	if(R5_rec.indexOf("success") > -1)
	 {
		R5_arr = R5_rec.split(":");

		get_now = new Date();
		post_time = get_now.getTime();

		rep_sorter = (!reply_sort_ch)?R5_order:reply_sort;

		all_rp_obj = document.getElementById("all_reply"+hold_pnumber);
		all_rp_obj.style.display="block";

		post_array[id_hold[hold_tpo_id]][13] = post_time;

		//loaded_replies[hold_tpo_id]=(loaded_replies[post_id_l] != undefined)?(loaded_replies[post_id_l]+1):1;  // this would add one to loaded_replies for the top post, however, since loaded_replies is used as the start # server side, it would interfere with which posts would be displayed

/*
		document.getElementById("reply_links"+id_hold[hold_tpo_id]).firstChild.getAttribute("style");
		document.getElementById("reply_links"+id_hold[hold_tpo_id]).firstChild.removeAttribute("style");
*/
		add_reply(false,R5_user,0,0,R5_image,rp_content,"0 Seconds Ago",hold_tpo_id,hold_rp_id,R5_arr[2],rp_level,0,parseFloat(R5_arr[1]),post_time,post_time,rep_sorter,all_rp_obj,0,"new",R5_arr[3],R5_accountid,R5_arr[4]);
		document.getElementById("reply_holder"+hold_pnumber).style.display = "none";
		hold_rp_con_obj.value = "";
		hold_sub_obj.disabled=false;
		hold_sub_obj.value="Reply";
		update_count_rp(hold_pnumber);
	 } else
	if(R5_rec.indexOf("banned") > -1)
	 {
		banned_arr = R5_rec.split(":");
		banned_text = (banned_arr[1] == "permanent")?("You have been permanently banned from posting in one of the post's categories."):("You have been banned from posting in one of the post's categories until "+banned_arr[1]+".");
		show_display_t(banned_text,0);
		document.getElementById("reply_holder"+hold_pnumber).style.display = "none";
		hold_sub_obj.value="Reply";
	 } else
	if(R5_rec == "logged")
	 {
		show_display_t("You must have an account to reply to posts!",0);
		hold_sub_obj.value="Reply";
	 } else {
		show_display_t("Error connecting to the server.  Please try again.",0);
		hold_sub_obj.disabled=false;
		hold_sub_obj.value="Reply";
	 }

 }

}


var rp_load=0;
var rp_start=0;
var loading_pnum = [];
var loading_count = [];
var loading_load = [];
var loading_id_post = [];
var loading_id_reply = [];
var count_rp_load = 0;
var max_load_rp = 10;
var xml_http7;
var tp_post_num = "";
var rp_reply_num = "";
function load_new_replies(tp_post_id,rp_post_id,load_limit,pnumber)
{
	loading_id_post[count_rp_load] = tp_post_id;
	loading_id_reply[count_rp_load] = rp_post_id;

	rp_load = (load_limit > max_load_rp || load_limit < 1)?max_load_rp:load_limit;
	rp_start = loaded_replies[tp_post_id+rp_post_id];
	rep_sorter = (!reply_sort_ch)?R5_order:reply_sort;
	loading_pnum[count_rp_load] = pnumber;
	loading_count[count_rp_load] = reply_counter;
	loading_load[count_rp_load] = rp_load;
	tp_post_num = tp_post_id.substr(1);  // gets the post # -- what is sent to the server
	rp_post_num = rp_post_id.substr(1);  // gets the post # -- what is sent to the server

	xml_http7=get_xml_http_obj();
	if(xml_http7==null)
	 {
		return;
	 }

	url='load_new_replies.php';
	xml_http7.onreadystatechange=r_state_changed7;
	xml_http7.open('POST',url,true);
	xml_http7.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http7.send('post_id='+tp_post_num+'&reply_id='+rp_post_num+'&start='+rp_start+'&limit='+rp_load+'&sort='+rep_sorter);

}

var new_reply_array,r_p_s,all_to_append;
var temp_reply_count=0;
function r_state_changed7()
{

if(xml_http7.readyState==4 || xml_http7.readyState=='complete')
 {
	R5_rec=xml_http7.responseText;
	new_reply_array = clean_array(R5_rec.split("*"));

	if(R5_rec != "error" && R5_rec != "")
	 {
		all_to_append = document.getElementById("all_reply"+loading_pnum[count_rp_load]);

		var rp;
		for (rp in new_reply_array)
		 {
			r_p_s = new_reply_array[rp].split(",");

			if(reply_array[r_p_s[9]] == undefined) // if post has not already been loaded
			 {
	//document.getElementById("test_results").innerHTML += r_p_s[10]+":reply<br />"; // for testing
				add_reply(r_p_s[0],r_p_s[1],r_p_s[2],r_p_s[3],r_p_s[4],r_p_s[5],r_p_s[6].replace("#",","),r_p_s[7],r_p_s[8],r_p_s[9],r_p_s[10],r_p_s[11],r_p_s[12],r_p_s[13],r_p_s[14],r_p_s[15],all_to_append,r_p_s[16],"load",r_p_s[17],r_p_s[18])
			 }
		 }

		temp_reply_count = reply_counter - loading_count[count_rp_load]; // number of replies that were loaded


		loaded_replies[(loading_id_post[count_rp_load]+loading_id_reply[count_rp_load])]+=temp_reply_count;

		if(document.getElementById("btn_"+loading_id_post[count_rp_load]+loading_id_reply[count_rp_load]))
		 {
			all_to_append.removeChild(document.getElementById("btn_"+loading_id_post[count_rp_load]+loading_id_reply[count_rp_load]));
		 }

		if(!(loading_load[count_rp_load] > temp_reply_count)) // if we haven't reached the end of replies for this
		 {
		load_more_btn(all_to_append,loading_id_post[count_rp_load],loading_id_reply[count_rp_load],loading_pnum[count_rp_load]);
		 }

	 } else
	if(R5_rec == "")
	 {
		if(document.getElementById("btn_"+loading_id_post[count_rp_load]+loading_id_reply[count_rp_load]))
		 {
			document.getElementById("all_reply"+loading_pnum[count_rp_load]).removeChild(document.getElementById("btn_"+loading_id_post[count_rp_load]+loading_id_reply[count_rp_load]));
		 }
	 }

	count_rp_load++;
 }
}

var load_replies_div,load_replies_btn;
function load_more_btn(load_obj,tpostid,rpostid,rnumber)
{
	load_replies_div=document.createElement("div");
		load_replies_div.id="btn_"+tpostid+rpostid;
		load_replies_div.className = "load_replies";
		load_obj.appendChild(load_replies_div);

	load_replies_btn=document.createElement("a");
		load_replies_btn.className = "page_link";
		load_replies_btn.href = "javascript:void(0);";
		load_replies_btn.innerHTML = "Load More Replies";
		load_replies_btn.setAttribute("data-tpostid",tpostid);
		load_replies_btn.setAttribute("data-rpostid",rpostid);
		load_replies_btn.setAttribute("data-rnumber",rnumber);
		load_replies_btn.onclick = function(){load_more_click(this,this.getAttribute("data-tpostid"),this.getAttribute("data-rpostid"),this.getAttribute("data-rnumber"));};
		load_replies_div.appendChild(load_replies_btn);
}

function load_more_click(load_btn_obj,tpostid,rpostid,rnumber)
{
	load_btn_obj.disabled = true;
	load_btn_obj.innerHTML = "Working...";
	load_new_replies(tpostid,rpostid,10,rnumber);
}



var rp_pos_str = ",";
var rp_neg_str = ",";
var rp_v_continue = true;
var rp_send_ud = 0;

//  username, top post id, reply post id
function rp_upvote(user_accountid,t_p_id,r_p_id,v_return)
{
  if(R5_user != "")
   {
	rp_send_ud = 1;
	if(rp_pos_str.indexOf(","+r_p_id+",") > -1 || user_accountid == R5_accountid || reply_array[r_p_id][10] == 1)
	 {
		rp_v_continue = false;

	 } else
	if(rp_neg_str.indexOf(","+r_p_id+",") > -1 || reply_array[r_p_id][10] == -1)
	 {
		rp_neg_str = rp_neg_str.substr(0,(rp_neg_str.indexOf(","+r_p_id+",")+1))+rp_neg_str.substr(rp_neg_str.indexOf(","+r_p_id+",")+2+r_p_id.length);
		rp_send_ud = 2;
	 }

	if(rp_v_continue)
	 {
		rp_pos_str += r_p_id+",";
		rp_send_vote(user_accountid,t_p_id,r_p_id,rp_send_ud);
	 }
	rp_v_continue = true;
	if(v_return)
	 {
		return true;
	 }
   } else {
	show_display_t("You must log in to add reputation!",0);
	if(v_return)
	 {
		return false;
	 }
   }
}

function rp_downvote(user_accountid,t_p_id,r_p_id,v_return)
{
  if(R5_user != "")
   {
	rp_send_ud = -1;
	if(rp_neg_str.indexOf(","+r_p_id+",") > -1 || user_accountid == R5_accountid || reply_array[r_p_id][10] == -1)
	 {
		rp_v_continue = false;
	 } else
	if(rp_pos_str.indexOf(","+r_p_id+",") > -1 || reply_array[r_p_id][10] == 1)
	 {
		rp_pos_str = rp_pos_str.substr(0,(rp_pos_str.indexOf(","+r_p_id+",")+1))+rp_pos_str.substr(rp_pos_str.indexOf(","+r_p_id+",")+2+r_p_id.length);
		rp_send_ud = -2;
	 }

	if(rp_v_continue)
	 {
		rp_neg_str += r_p_id+",";
		rp_send_vote(user_accountid,t_p_id,r_p_id,rp_send_ud);
	 }
	rp_v_continue = true;
	if(v_return)
	 {
		return true;
	 }
   } else {
	show_display_t("You must log in to do that!",0);
	if(v_return)
	 {
		return false;
	 }
   }
}


var rp_centerv_obj;
var rp_center_new = 0;
var rp_centerv_att="";
var rp_centerv_get=0;
var rp_center_v_com=0;
var rp_center_v_com2=0;
var xml_http8;
function rp_send_vote(user_accountid,t_p_id,r_p_id,udrep)
{

	rp_centerv_obj = document.getElementById("cen_vote"+r_p_id);
	var c_v_span = return_firstChild(rp_centerv_obj);
	tp_post_num = t_p_id.substr(1);  // gets the post # -- what is sent to the server
	rp_reply_num = r_p_id.substr(1); // gets reply # -- what is sent to the server

	if(Math.abs(udrep) == 1)
	 {
		rp_center_v_com = parseInt(rp_centerv_obj.getAttribute("data-p_v")) - parseInt(rp_centerv_obj.getAttribute("data-n_v"))+udrep;
		rp_center_new = rp_center_v_com;

		rp_centerv_att=(udrep > 0)?"data-p_v":"data-n_v";
		rp_centerv_get = parseInt(rp_centerv_obj.getAttribute(rp_centerv_att))+Math.abs(udrep);
		rp_centerv_obj.setAttribute(rp_centerv_att,rp_centerv_get);
		reply_array[r_p_id][((udrep>0)?(1):(2))]+=1;

	 } else {
		rp_center_v_com = parseInt(rp_centerv_obj.getAttribute("data-p_v"));
		rp_centerv_get = rp_center_v_com+((udrep>0)?(1):(-1));
		reply_array[r_p_id][1]+=((udrep>0)?(1):(-1));
		rp_centerv_obj.setAttribute("data-p_v",rp_centerv_get);

		rp_center_v_com2 = parseInt(rp_centerv_obj.getAttribute("data-n_v"));
		rp_centerv_get = rp_center_v_com2+((udrep>0)?(-1):(1));
		reply_array[r_p_id][2]+=((udrep>0)?(-1):(1));
		rp_centerv_obj.setAttribute("data-n_v",rp_centerv_get);

		rp_center_new = rp_center_v_com - rp_center_v_com2 + udrep;

		if(udrep < 0 && current_page_up.indexOf("r"+r_p_id) > -1) // this is for changes in the list of users that have upvoted a post; functions in script.js
		 {
			var v_cut_user1 = hold_v_list[r_p_id].indexOf(R5_user+",");
			if(v_cut_user1 != 0)
			 {
				v_cut_user1 = hold_v_list[r_p_id].indexOf("*"+R5_user+",");
			 }

			if(v_cut_user1 != -1)
			 {
				var v_cut_str = hold_v_list[r_p_id].substr(v_cut_user1);
				var v_cut_user2 = v_cut_str.substring(0,(v_cut_str.indexOf("*")+1));

				hold_v_list[r_p_id] = hold_v_list[r_p_id].replace(v_cut_user2,"");
				remove_v_list[r_p_id] = v_cut_user2;
			 }
		 } else
		if(udrep > 0 && current_page_up.indexOf("r"+r_p_id) > -1 && remove_v_list[r_p_id]) // this is for changes in the list of users that have upvoted a post; functions in script.js
		 {
			hold_v_list[r_p_id] = remove_v_list[r_p_id] + hold_v_list[r_p_id];
			remove_v_list[r_p_id] = null;
		 }
	 }

	// rp_centerv_obj.innerHTML = get_inner_vote(rp_center_new);
	c_v_span.innerHTML = get_inner_vote(rp_center_new);

	// rp_centerv_obj.style.color = (rp_center_new>=0)?"#40b000":"#dd0000";
	rp_centerv_obj.className = (rp_center_new>=0)?"center_vote":"center_vote center_vote_red";

	document.getElementById("up"+r_p_id).className = (udrep>0)?"rep_up_vote2":"rep_up_vote";
	document.getElementById("down"+r_p_id).className = (udrep>0)?"rep_down_vote":"rep_down_vote2";
	reply_array[r_p_id][10] = (udrep>0)?1:-1;

	xml_http8=get_xml_http_obj();
	if(xml_http8==null)
	 {
		return;
	 }

	url='rp_user_vote.php';
	xml_http8.onreadystatechange=r_state_changed8;
	xml_http8.open('POST',url,true);
	xml_http8.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xml_http8.send('user_accountid='+user_accountid+'&post_id='+tp_post_num+'&reply_id='+rp_reply_num+'&rep='+udrep)
}

function r_state_changed8()
{
if (xml_http8.readyState==4 || xml_http8.readyState=='complete')
 {
	R5_rec=xml_http8.responseText;
	//document.getElementById("test_results").innerHTML += R5_rec+"<br />"; // for testing
 }
}

var hard_reset_c = 0;
var time_freset;
function freset_img_height()// in chrome an image will often need to be reloaded; this accounts for that
{

	//document.getElementById("test_results").innerHTML += "freset_img_height()<br />"; // for testing
if(reset_img_height)
 {
	document.getElementById("image_holder").getAttribute("style");
	document.getElementById("image_holder").removeAttribute("style");
	document.getElementById("image_img").getAttribute("style");
	document.getElementById("image_img").removeAttribute("style");

	open_height = document.getElementById("image_img").offsetHeight;
	document.getElementById("image_holder").style.height=((open_height>=300)?open_height:300)+"px";
	document.getElementById("image_img").style.maxHeight="100%";
	document.getElementById("image_img").style.maxWidth="100%";
	document.getElementById("image_img").style.position="absolute";

	window_height = (document.documentElement.clientHeight || window.innerHeight);
	window_width = (document.documentElement.clientWidth || window.innerWidth);
	if((document.getElementById("open_image").offsetHeight+document.getElementById("open_image").offsetTop) > window_height)
	 {
		new_img_ht = window_height - (document.getElementById("post_information").offsetHeight + document.getElementById("open_image").offsetTop);

		if(new_img_ht > 100)
		 {
			document.getElementById("image_holder").style.height=(new_img_ht)+"px";
		 } else {
			document.getElementById("image_holder").style.height="100px";
			new_img_bool = true;
		 }
	 }

	if(window_width < document.getElementById("open_image").offsetWidth || new_img_bool)
	 {
		scroll_doc = document.documentElement;
		scroll_body = document.body;
		scroll_top = (scroll_doc && scroll_doc.scrollTop  || scroll_body && scroll_body.scrollTop  || 0);

		document.getElementById("open_image").style.position = "absolute";
		document.getElementById("open_image").style.marginLeft = "0px";
		document.getElementById("open_image").style.top = 75+scroll_top+"px";
	 }

	new_img_bool = false;

	if(open_height == 0 && hard_reset_c < 10)
	 {
	//document.getElementById("test_results").innerHTML += "open_height == 0<br />"; // for testing
		time_freset = setTimeout(freset_img_height(),50);
		hard_reset_c++;
	 } else {
	//document.getElementById("test_results").innerHTML += "open_height != 0<br />"; // for testing
		hard_reset_c = 0;

		reset_img_height = false;
	 }
 }
}

var open_width = 0;
var open_height = 0;
var new_img_ht = 0;
var new_img_bool = false;
var reset_img_height = false;
function open_image(is_post,image_loc,post_info)// is_post is false if reply, post_info is either post # on page or reply id
{
	document.getElementById("R5_background").style.opacity=".9";
	document.getElementById("R5_background").style.filter="Alpha(opacity=90)";
	document.getElementById("R5_background").style.display="block";
	document.getElementById("open_image").style.display="block";
	document.getElementById("R5_background").onclick=function(){close_image();};

	document.getElementById("image_img").src = image_loc;

	open_width = document.getElementById("open_image").offsetWidth/2;
	open_height = document.getElementById("image_img").offsetHeight;
	document.getElementById("open_image").style.marginLeft="-"+open_width+"px";

	//document.getElementById("image_holder").style.width=(open_width*2)+"px";

	if(open_height == 0){reset_img_height = true;}
	document.getElementById("image_holder").style.height=((open_height>=300)?open_height:300)+"px";
	document.getElementById("image_img").style.maxHeight="100%";
	document.getElementById("image_img").style.maxWidth="100%";
	document.getElementById("image_img").style.position="absolute";

	if(is_post)
	 {
	//document.getElementById("test_results").innerHTML += post_array[post_info][21]+"<br />"; // for testing
//post_array[post_info][];
//new Array("jsh",0,0,"users/ar0spqvyzf5h2ijqe08j0k/Lamborghini_Aventador.jpg","","m","Seinfeld","1 Hour Ago","iyr4uucabrzditv6elq2f",90,0,47.04776,1373001988000,1373001988000,"total","","user","user","","","users/ar0spqvyzf5h2ijqe08j0k/m2ifdlniii.jpg");
		image_p_info(true,post_array[post_info][0],post_array[post_info][1],post_array[post_info][2],post_array[post_info][3],post_array[post_info][4],post_array[post_info][5],post_array[post_info][6],post_array[post_info][7],post_array[post_info][8],post_array[post_info][9],post_array[post_info][10],post_array[post_info][11],post_array[post_info][12],post_info,post_array[post_info][21]);
	 } else {

// 	reply_array[id]=[username,up,down,img_loc,content,time,t_post_id,parentid,id,get_level,past_rep,total_score,p_date,reply_date,sort_order];

//image_p_info          (username,up,down,img_loc,title,content,categories,time,id,num,        past_rep,total_score,p_date,pnumber)

		image_p_info(false,reply_array[post_info][0],reply_array[post_info][1],reply_array[post_info][2],reply_array[post_info][3],"",reply_array[post_info][4],"",reply_array[post_info][5],reply_array[post_info][6],reply_array[post_info][8],reply_array[post_info][10],reply_array[post_info][11],reply_array[post_info][12],post_info,reply_array[post_info][16]);
	 }

	window_height = (document.documentElement.clientHeight || window.innerHeight);
	window_width = (document.documentElement.clientWidth || window.innerWidth);
	if((document.getElementById("open_image").offsetHeight+document.getElementById("open_image").offsetTop) > window_height)
	 {
		new_img_ht = window_height - (121 + document.getElementById("open_image").offsetTop);

		if(new_img_ht > 100)
		 {
			document.getElementById("image_holder").style.height=(new_img_ht)+"px";
		 } else {
			document.getElementById("image_holder").style.height="100px";
			new_img_bool = true;
		 }
	 }



	if(window_width < document.getElementById("open_image").offsetWidth || new_img_bool)
	 {
		scroll_doc = document.documentElement;
		scroll_body = document.body;
		scroll_top = (scroll_doc && scroll_doc.scrollTop  || scroll_body && scroll_body.scrollTop  || 0);

		document.getElementById("open_image").style.position = "absolute";
		document.getElementById("open_image").style.marginLeft = "0px";
		document.getElementById("open_image").style.top = 75+scroll_top+"px";
	 }



	new_img_bool = false;
}


function close_image()
{
		while(document.getElementById("post_information").firstChild)
		 {
			document.getElementById("post_information").removeChild(document.getElementById("post_information").firstChild);
		 }


	document.getElementById("image_img").src="";
	document.getElementById("R5_background").style.display="none";
	document.getElementById("R5_background").style.opacity=".95";
	document.getElementById("R5_background").style.filter="Alpha(opacity=95)";
	document.getElementById("open_image").style.display="none";
	document.getElementById("open_image").style.position = "fixed";
	document.getElementById("open_image").style.top = "75px";
	document.getElementById("open_image").style.marginLeft = "-400px";
	document.getElementById("image_holder").getAttribute("style");
	document.getElementById("image_holder").removeAttribute("style");
	document.getElementById("image_img").getAttribute("style");
	document.getElementById("image_img").removeAttribute("style");
	b_is_shown = false;
}


var cat_split_new;
function image_p_info(is_post,username,up,down,img_loc,title,content,categories,time,id,num,past_rep,total_score,p_date,pnumber,user_accountid)
{
		// for both is_post=true && false, id is the top post id;  in is_post==true, num = post array #; in is_post==false, num = reply id

	new_p_out = document.getElementById("post_information");
	u_d_c = up-down;

	new_voteud=document.createElement("div");
		new_voteud.className = "vote_ud";
		new_p_out.appendChild(new_voteud);


	if(is_post)
	 {
		new_up=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
			new_up.className = (past_rep>0)?"up_vote2":"up_vote";
			new_up.id = "up2"+pnumber;

			if(user_accountid != R5_accountid)
			 {
				new_up.href = "javascript:void(0);";
				new_up.setAttribute("data-user_accountid",user_accountid);
				new_up.setAttribute("data-postid",num);
				new_up.setAttribute("data-num",pnumber);
				new_up.onclick=function(){
					if(upvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-postid"),this.getAttribute("data-num"),true))
					 {
						this.className="up_vote2";
						document.getElementById("down2"+this.getAttribute("data-num")).className = "down_vote";
						document.getElementById("cen_vote2"+this.getAttribute("data-num")).setAttribute("data-p_v",post_array[parseInt(this.getAttribute("data-num"))][1]);
						document.getElementById("cen_vote2"+this.getAttribute("data-num")).setAttribute("data-n_v",post_array[parseInt(this.getAttribute("data-num"))][2]);
						document.getElementById("cen_vote2"+this.getAttribute("data-num")).innerHTML = get_inner_vote((post_array[parseInt(this.getAttribute("data-num"))][1] - post_array[parseInt(this.getAttribute("data-num"))][2]));
						if((post_array[parseInt(this.getAttribute("data-num"))][1] - post_array[parseInt(this.getAttribute("data-num"))][2]) < 0)
						 {
							document.getElementById("cen_vote2"+this.getAttribute("data-num")).style.color="#dd0000";
						 } else {
							document.getElementById("cen_vote2"+this.getAttribute("data-num")).style.color="#40b000";
						 }
					 }
					}
			 } else {
				new_up.style.cssText = "background:transparent;";
			 }
			new_voteud.appendChild(new_up);
	 } else { // ** it is a reply ** \\
		new_up=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
			new_up.className = (past_rep>0)?"rep_up_vote2":"rep_up_vote";
			new_up.id = "up2"+num; // reply will use the reply_id here

			if(user_accountid != R5_accountid)
			 {
				new_up.href = "javascript:void(0);";
				new_up.setAttribute("data-user_accountid",user_accountid);
				new_up.setAttribute("data-tpostid",id);
				new_up.setAttribute("data-replyid",num);
				new_up.onclick=function(){
					if(rp_upvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-tpostid"),this.getAttribute("data-replyid"),true))
					 {
						this.className="rep_up_vote2";
						document.getElementById("down2"+this.getAttribute("data-replyid")).className = "rep_down_vote";
						document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).setAttribute("data-p_v",reply_array[this.getAttribute("data-replyid")][1]);
						document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).setAttribute("data-n_v",reply_array[this.getAttribute("data-replyid")][2]);
						document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).innerHTML = get_inner_vote((reply_array[this.getAttribute("data-replyid")][1] - reply_array[this.getAttribute("data-replyid")][2]));
						if((reply_array[this.getAttribute("data-replyid")][1] - reply_array[this.getAttribute("data-replyid")][2]) < 0)
						 {
							document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).style.color="#dd0000";
						 } else {
							document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).style.color="#40b000";
						 }
					 }
					}
			 } else {
				new_up.style.cssText = "background:transparent;";
			 }
			new_voteud.appendChild(new_up);
	 }

	new_cn=document.createElement("span");
		new_cn.className = "center_vote";

		if(is_post)
		 {
			new_cn.id = "cen_vote2"+pnumber;
		 } else {
			new_cn.id = "cen_vote2"+num; // reply uses its reply id here
		 }
		new_cn.innerHTML = get_inner_vote(u_d_c);
		if(u_d_c < 0) {new_cn.style.cssText="color:#dd0000;";}
		new_cn.setAttribute("data-p_v",up);
		new_cn.setAttribute("data-n_v",down);
		new_cn.onmouseover = function(){info_message(this.id,1,8,("fontup:"+this.getAttribute("data-p_v")+":endfontfontdn:"+this.getAttribute("data-n_v")+":endfont"),0,"#fff","#333","#333");};
		new_voteud.appendChild(new_cn);


	if(is_post)
	 {
		new_dn=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
			new_dn.className = (past_rep<0)?"down_vote2":"down_vote";
			new_dn.id = "down2"+pnumber;

			if(user_accountid != R5_accountid)
			 {
				new_dn.href = "javascript:void(0);";
				new_dn.setAttribute("data-postid",num);
				new_dn.setAttribute("data-user_accountid",user_accountid);
				new_dn.setAttribute("data-num",pnumber);
				new_dn.onclick=function(){
					if(downvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-postid"),this.getAttribute("data-num"),true))
					 {
						this.className="down_vote2";
						document.getElementById("up2"+this.getAttribute("data-num")).className = "up_vote";
						document.getElementById("cen_vote2"+this.getAttribute("data-num")).setAttribute("data-p_v",post_array[parseInt(this.getAttribute("data-num"))][1]);
						document.getElementById("cen_vote2"+this.getAttribute("data-num")).setAttribute("data-n_v",post_array[parseInt(this.getAttribute("data-num"))][2]);
						document.getElementById("cen_vote2"+this.getAttribute("data-num")).innerHTML = get_inner_vote((post_array[parseInt(this.getAttribute("data-num"))][1] - post_array[parseInt(this.getAttribute("data-num"))][2]));
						if((post_array[parseInt(this.getAttribute("data-num"))][1] - post_array[parseInt(this.getAttribute("data-num"))][2]) < 0)
						 {
							document.getElementById("cen_vote2"+this.getAttribute("data-num")).style.color="#dd0000";
						 } else {
							document.getElementById("cen_vote2"+this.getAttribute("data-num")).style.color="#40b000";
						 }
					 }
					}
			 } else {
				new_dn.style.cssText = "background:transparent;";
			 }
			new_voteud.appendChild(new_dn);
	 } else { // ** it is a reply ** \\
		new_dn=(user_accountid != R5_accountid)?document.createElement("a"):document.createElement("div");
			new_dn.className = (past_rep<0)?"rep_down_vote2":"rep_down_vote";
			new_dn.id = "down2"+num; // reply will use the reply id here

			if(user_accountid != R5_accountid)
			 {
				new_dn.href = "javascript:void(0);";
				new_dn.setAttribute("data-user_accountid",user_accountid);
				new_dn.setAttribute("data-tpostid",id);
				new_dn.setAttribute("data-replyid",num);
				new_dn.onclick=function(){
					if(rp_downvote(this.getAttribute("data-user_accountid"),this.getAttribute("data-tpostid"),this.getAttribute("data-replyid"),true))
					 {
						this.className="rep_down_vote2";
						document.getElementById("up2"+this.getAttribute("data-replyid")).className = "rep_up_vote";
						document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).setAttribute("data-p_v",reply_array[this.getAttribute("data-replyid")][1]);
						document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).setAttribute("data-n_v",reply_array[this.getAttribute("data-replyid")][2]);
						document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).innerHTML = get_inner_vote((reply_array[this.getAttribute("data-replyid")][1] - reply_array[this.getAttribute("data-replyid")][2]));
						if((reply_array[this.getAttribute("data-replyid")][1] - reply_array[this.getAttribute("data-replyid")][2]) < 0)
						 {
							document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).style.color="#dd0000";
						 } else {
							document.getElementById("cen_vote2"+this.getAttribute("data-replyid")).style.color="#40b000";
						 }
					 }
					}
			 } else {
				new_dn.style.cssText = "background:transparent;";
			 }
			new_voteud.appendChild(new_dn);
	 }

	new_d_post=document.createElement("div");
		new_d_post.className = "display_post2";
		new_p_out.appendChild(new_d_post);

	new_d_img=document.createElement("a");
		new_d_img.className = "display_img";
		new_d_img.href = username;
		new_d_img.style.cssText = "background:url('"+img_loc+"') no-repeat center;";
		new_d_post.appendChild(new_d_img);

	new_d_words=document.createElement("div");
		new_d_words.className = "display_words2";
		new_d_post.appendChild(new_d_words);

	new_d_title=document.createElement("div");
		new_d_title.className = "dis_title_row";
		new_d_words.appendChild(new_d_title);

	new_a_title=document.createElement("a");
		new_a_title.className = "post_title_a2";
		new_a_title.href = username;
		new_a_title.innerHTML = username;
		new_d_title.appendChild(new_a_title);

	if(title != "")
	 {
	if(title.substr(0,3) != " - ")
	 {
		new_title=document.createTextNode(" - ");
			new_d_title.appendChild(new_title);
	 }
	new_title=document.createElement("b");
		new_title.innerHTML = title;
		new_d_title.appendChild(new_title);
	 }

	new_d_content=document.createElement("div");
		new_d_content.className = "dis_post_content";
		new_d_content.innerHTML = content;
		new_d_words.appendChild(new_d_content);

	new_p_ex=document.createElement("a");
		new_p_ex.className = "post_expand";
		new_p_ex.id = "post_expand2"+pnumber;
		new_p_ex.onclick = function(){expand_2(this);}
		new_p_ex.href = "javascript:void(0);";
		new_p_ex.innerHTML = "Expand";
		new_d_content.appendChild(new_p_ex);

	new_d_bot=document.createElement("div");
		new_d_bot.className = "display_bottom2";
		new_d_words.appendChild(new_d_bot);


	cat_split_new = categories.split(",");
/*
	new_p_label=document.createElement("span");
		new_p_label.className = "post_label";
		new_p_label.id = "lbl_cat_"+pnumber;
		new_p_label.innerHTML = cat_split_new[0];
		if(cat_split_new.length > 1)
		 {
			new_p_label.setAttribute("data-cato",cat_split_new[1]);
			new_p_label.setAttribute("data-catt",((cat_split_new[2] != null)?cat_split_new[2]:""));
			new_p_label.style.cssText = "text-decoration:underline;";
			new_p_label.onmouseover = function(){info_message(this.id,0,8,(this.getAttribute("data-cato")+((this.getAttribute("data-catt") != "" && this.getAttribute("data-catt") != null)?"":("<br />"+this.getAttribute("data-catt")))),0,"#fff","#333","#333");}
		 }
		new_d_bot.appendChild(new_p_label);
*/


	new_p_label=document.createElement("ul");
		new_p_label.className = "post_label";
		new_p_label.id = "lbl_cat_"+pnumber;
		new_d_bot.appendChild(new_p_label);


	cat_i_length = cat_split_new.length;
	new_a_category=document.createElement("a");
		new_a_category.className = "page_link";
		new_a_category.href = "category/"+cat_split_new[0].replace(/ /g,"-");
		new_a_category.innerHTML = cat_split_new[0];
		if(cat_i_length > 1)
		 {
			new_a_category.style.cssText = "text-decoration:underline;";
		 }
		new_p_label.appendChild(new_a_category);

	if(cat_i_length > 1)
	 {
		new_ul_category=document.createElement("ul");
			new_p_label.appendChild(new_ul_category);
		
		for(i_cat = 0;i_cat < cat_i_length;i_cat++)
		 {
			new_li_category=document.createElement("li");
				new_ul_category.appendChild(new_li_category);

			new_a_category2=document.createElement("a");
				new_a_category2.className = "page_link";
				new_a_category2.href = "category/"+cat_split_new[i_cat].replace(/ /g,"-");
				new_a_category2.innerHTML = cat_split_new[i_cat];
				new_li_category.appendChild(new_a_category2);
		 }
	 }

	new_p_time=document.createElement("span");
		new_p_time.className = "post_time";
		new_p_time.innerHTML = time;
		if(time.indexOf(":") == -1)
		 {
			new_p_time.title = get_full_date(new Date(parseInt(p_date)));
		 }
		new_d_bot.appendChild(new_p_time);

	check_expand_obj(document.getElementById("post_expand2"+pnumber));
}

function get_inner_vote(com_num)
{
var abs_com_num = Math.abs(com_num);
return (abs_com_num < 10000)?(com_num):((abs_com_num >= 10000 && abs_com_num < 100000)?((Math.floor(com_num/100)/10)+"k"):((abs_com_num >= 100000 && abs_com_num < 1000000)?((Math.floor(com_num/1000)+"k")):((abs_com_num >= 1000000 && abs_com_num < 10000000)?((Math.floor(com_num/100000)/10)+"M"):(Math.floor(com_num/1000000)+"M"))));
}


function check_expand_obj(expand_object)
{
	if(!(expand_object.parentNode.scrollHeight > expand_object.parentNode.offsetHeight))
	 {
		expand_object.style.display="none";
	 }
}

var d_t_close;
function show_display_t(d_content,d_timeout)
{
	document.getElementById("display_messaget").innerHTML = d_content + '<a href="javascript:void(0);" onclick="this.parentNode.style.display=\'none\';" class="x_img"></a>';
	document.getElementById("display_messaget").style.display = 'block';

	if(d_timeout > 0 && d_timeout != null)
	 {
		clearTimeout(d_t_close);
		d_t_close = setTimeout("document.getElementById('display_messaget').style.display = 'none';", (d_timeout*1000));
	 }
}