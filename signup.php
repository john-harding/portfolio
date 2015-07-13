<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <title>
	RepFive
  </title>

 <meta property="og:image" content="http://www.repfive.com/images/logo.png">
 <meta name="description" content="Sign up for RepFive! Quickly connect with people and discussions that are important to you.  Follow categories and users!">
 <meta http-equiv="content-type" content="text/html;charset=UTF-8">
<!--[if lte IE 7]>
  <meta http-equiv="REFRESH" content="0;url=unsupported.php">
<![endif]-->
 <link rel="stylesheet" href="style.css" type="text/css">
 <link rel="stylesheet" href="account.css" type="text/css">
 <link rel="stylesheet" href="style_menu.css" type="text/css">
<!--[if IE 7]>
<style type="text/css">
 .password_strength {
  top:2px;
  }

</style>
<![endif]-->
<!--[if IE 8]><link rel="stylesheet" href="ie8.css" type="text/css"><![endif]-->
<!--[if IE 9]>
<style type="text/css">
 .password_strength {
  top:1px;
  }

</style>
<![endif]-->
 <link rel="shortcut icon" href="favicon.ico">

 <script type="text/javascript">var form_submitted = false;
  /* ***new*** */ fb_bool = false;
</script>
 </head>
 <body>
<div class="R5_background" id="R5_background"></div>
<div class="port-menu">
<div class="ex-side-top">This is a portfolio preview.  JavaScript will not work as intended.</div>
<div class="ex-side-bot-outer">
<div class="ex-side-ribbon"></div>
<div class="ex-side-middle">Menu</div>
<div class="ex-side-bottom">
<div class="ex-page-info">
<div class="ex-page-title">RepFive Sign Up Page</div>
<div class="ex-page-descr">The sign up page for RepFive.</div>
</div>
<ul>
	<li><a href="/developer.php" class="direction-btn">Previous</a><a href="/micro.php" class="direction-btn">Next</a></li>
	<li><a href="/">Portfolio Home</a></li>
	<li><a href="http://www.repfive.com/signup.php" target="_blank">RepFive.com<span class="link_external"></span></a></li>
</ul>
</div></div></div>
  <div class="cat_browser" id="cat_browser">
	<div class="top_browse">
		<div class="browse_title_hold">
		<a class="browse_title br_title_main" id="cat_browse_title" href="javascript:void(0);" onclick="browse_change('browse');">Browse</a>
		<a class="browse_title browse_title_not_sel" id="cat_browse_title2" href="javascript:void(0);" onclick="browse_change('popular');">Popular</a>
		</div>
		<div class="browse_title_selected" id="browse_title_selected"></div>
  <div class="category_hold" style="top:7px;left:159px;">
    <div class="cat_selected browse_selected" id="b_selected0"><span id="b_sel_hold0"></span><a class="cat_selectx browse_selectx" position="0" id="b_0" href="javascript:void(0)" onclick="x_category(parseInt(this.getAttribute('position')));"></a></div>
    <div class="cat_selected browse_selected" id="b_selected1"><span id="b_sel_hold1"></span><a class="cat_selectx browse_selectx" position="1" id="b_1" href="javascript:void(0)" onclick="x_category(parseInt(this.getAttribute('position')));"></a></div>
    <div class="cat_selected browse_selected" id="b_selected2"><span id="b_sel_hold2"></span><a class="cat_selectx browse_selectx" position="2" id="b_2" href="javascript:void(0)" onclick="x_category(parseInt(this.getAttribute('position')));"></a></div>
  </div>

<a href="javascript:void(0);" onclick="toggle_browse(true);" class="x_img2" id="x_cat_browse"></a>
	</div>
	<div class="browse_wrap no_user_select" id="browse_wrap_main">
		<ul class="browse_select" id="browse_select0">
		</ul>
		<ul class="browse_select" id="browse_select1" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select2" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select3" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select4" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select5" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select6" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select7" style="display:none;">
		</ul>
		<ul class="browse_select" id="browse_select8" style="display:none;">
		</ul>
	</div>
	<div class="browse_wrap no_user_select" id="browse_wrap_popular" style="display:none;">
		<ul class="browse_select" id="browse_select_popular">
<li data-ltext="Humor" id="popular_Humor" onclick="cat_chosen(this,false);"><a href="javascript:void(0);" onclick="return false;">Humor</a></li>
<li data-ltext="Sports" id="popular_Sports" onclick="cat_chosen(this,false);"><a href="http://www.repfive.com/category/sports" onclick="return false;">Sports</a></li>
<li data-ltext="Bodybuilding" id="popular_Bodybuilding" onclick="cat_chosen(this,false);"><a href="http://www.repfive.com/category/bodybuilding" onclick="return false;">Bodybuilding</a></li>
<li data-ltext="Miami Hurricanes Football" id="popular_Miami_Hurricanes_Football" onclick="cat_chosen(this,false);"><a href="http://www.repfive.com/category/miami-hurricanes-football" onclick="return false;">Miami Hurricanes Football</a></li>
<li data-ltext="Food and Beverage" id="popular_Food_and_Beverage" onclick="cat_chosen(this,false);"><a href="http://www.repfive.com/category/food-and-beverage" onclick="return false;">Food and Beverage</a></li>
		</ul>
	</div>
  </div>


  <div class="create_category" id="create_category">
	<div class="top_browse" style="background-color:#333;">
		<span class="browse_title" style="cursor:default;">Create Category</span>
		<a href="javascript:void(0);" onclick="toggle_browse(true);" class="x_img2"></a>
	</div>
	<div class="create_category_form">
		<div class="category_new_field_result" id="category_submit_result" style="color:#d00;">
		</div>
		<div class="category_new_field">
			<div><label for="category_name"><input type="text" class="category_left_border" id="category_name" maxlength="40" value="" onkeydown="hide_placeh(this);" onblur="show_placeh(this);category_checker();" /><span class="placeholder" style="top:7px;left:11px;">Category Name</span></label></div>
		</div>
		<div class="category_new_field_result" id="category_new_field_result">
			Looks Good!
		</div>
		<div class="category_new_field category_div_textarea">
			<div><label for="category_description"><textarea class="category_left_border" id="category_description" value="" onkeydown="hide_placeh(this);update_count_n_category();" onkeyup="update_count_n_category();" onblur="show_placeh(this);"></textarea><span class="placeholder" style="top:7px;left:11px;">Category Description</span></label></div>
		</div>
		<div class="category_new_field" style="padding-top:0;">
			<span class="category_chars" id="category_n_remain_chars">1000</span>
		</div>
		<div class="category_new_field">
			<div><label for="parent_new_post_category"><input type="text" class="category_left_border" id="parent_new_post_category" style="width:296px;" maxlength="40" value="" onfocus="create_labels(2);" onkeydown="hide_placeh(this);" onkeyup="create_labels(0);category_create_labels();" onblur="clear_labels();show_placeh(this);" /><span class="placeholder" id="parent_cat_placeholder" style="top:0px;left:11px;">Parent Category <span class="question_mark" id="parent_cat_q" onmouseover="info_message(this.id,0,8,'New categories must be a subcategory<br />of another category.<br><br> &nbsp;<b>Tips:</b><br>-Use the most specifc parent category<br> &nbsp;&nbsp;possible<br>-Your category should be a more narrow<br> &nbsp;&nbsp;subject of the parent you choose',0,'#fff','#000','#000',255,.7);"></span></span></label>
			<a class="light_gray_img search_bar_img" id="parent_browse_button" href="javascript:void(0);" onclick="category_browse();">Browse</a></div>
<div class="cat_selected" id="parent_cat_selected" title="" style=""><span id="parent_cat_sel_hold"></span><a class="cat_selectx" id="parent_cs" href="javascript:void(0)" onclick="parent_x_category();"></a></div>
			<ul class="category_select no_user_select" id="parent_category_select" style="display:none;"></ul>

		</div>
		<div class="category_new_field">
			<div><label for="img_category" id="category_img_file_btn" class="green_img submit_category" onclick="if(is_firefox){img_double_click(1,document.getElementById('img_category'));}">Attach Image</label>

			<div class="post_img_data" id="category_img_data">245x160 (width x height)</div>
			<div class="close_wh2" title="Remove" id="category_close_x_img" onclick="remove_img_upload('img_category','category_img_data','category_close_x_img','','');"></div></div>
			<iframe name="image_category_iframe" src="" style="display:none;"></iframe>
			<form id="category_form_image" method="post" enctype="multipart/form-data" action="category_image.php" target="image_category_iframe">
			<input type="file" id="img_category" onclick="return img_double_click(0,null);" class="file_hide" onchange="img_category_ch(this.value);" name="file" accept="image/*">
			</form>

		</div>
		<div class="category_new_field">
			<div><label for="category_private"><input type="checkbox" id="category_private" style="width:13px;margin-right:8px;" onchange="category_private_check();" />Make it Private</label></div>
		</div>
		<div class="category_new_field" id="c_password1" style="display:none;background-color:#000;padding-top:16px;">
			<div><label for="category_password1"><input type="password" class="category_left_border" id="category_password1" maxlength="20" value="" onkeydown="hide_placeh(this);" onblur="show_placeh(this);" /><span class="placeholder" style="top:0px;left:11px;">Password 4-20 characters <span class="question_mark" id="private_pass_q" onmouseover="info_message(this.id,0,8,'Private categories will be accessed by others with this password. Currently,<br />this is the only way users may follow a private category.',0,'#fff','#000','#000',255,.7);"></span></span></label></div>
		</div>
		<div class="category_new_field" id="c_password2" style="display:none;background-color:#000;">
			<div><label for="category_password2"><input type="password" class="category_left_border" id="category_password2" maxlength="20" value="" onkeydown="hide_placeh(this);" onblur="show_placeh(this);" /><span class="placeholder" style="top:7px;left:11px;">Confirm Password</span></label></div>
		</div>
		<div class="category_new_field" id="c_password3" style="display:none;background-color:#000;padding-bottom:16px;">
			<div><label for="category_password3"><input type="checkbox" id="category_password3" style="width:13px;margin-right:8px;"/>Enter Password Every Time <span class="question_mark2" id="private_pass3" onmouseover="info_message(this.id,0,8,'Force users to enter password every time they want to view posts in<br />this category. Posts from this category will not appear in your feed.',0,'#fff','#000','#000',255,.7);"></span></label></div>
		</div>
		<div class="category_new_field">
			<div><label for="category_18"><input type="checkbox" id="category_18" style="width:13px;margin-right:8px;" title="Must be 18+ to use this feature." disabled/>Adult Content (18+)</label></div>
		</div>

		<div class="category_new_field">
			<div><label for="category_follow"><input type="checkbox" id="category_follow" style="width:13px;margin-right:8px;" checked/>Follow automatically</label></div>
		</div>

		<div class="category_new_field">
			<div><a class="green_img submit_category" id="parent_category_submit" href="javascript:void(0);" onclick="submit_category();">Create Category</a></div>

			<div class="feedback_image" id="category_feedback_image"></div>
			<div class="loading_image" id="category_loading_image"></div>

		</div>

	</div>
  </div>

  <div class="multi-use" id="multi-use"><div class="multi-use-title"><div class="multi-use-title-inner" id="multi-use-title-inner">People who upvoted this post:</div></div><div class="multi-use-outer" id="multi-use-outer"><div class="multi-use-contain" id="multi-use-contain"><div class="multi-use-bottom" id="multi-use-bottom"></div></div></div></div><div class="container signup_container" id="container">
<div style="position:absolute;top:50px;left:0px;width:290px;background-color:#eee;font-size:14px;z-index:2;" id="test_results"></div>
<div class="wide_style"></div>
<div class="top_hold" id="top_hold">
<div class="top">
 <div class="top_bar">
  <span class="logo">
	<a href="javascript:void(0);" class="logo_i"></a>
  </span>
<div class="top_select">
   <a class="top_left_links" href="javascript:void(0);" onclick="open_browse();">Browse</a>
   </div>
<div class="right_links"><a class="no_log_link log_selected" href="javascript:void(0);">Sign Up</a><a class="no_log_link no_log_link2" href="javascript:void(0);">Log In</a></div>   <div class="search">
    <form action="" onsubmit="return false;" method="GET">
     <div class="search_hold"><label for="search_bar"><input type="text" tabindex="1" autocomplete="off" name="q" class="simple_bar search_bar" id="search_bar" onkeydown="hide_placeh(this);" onblur="show_placeh(this);" value=""><span class="placeholder" id="search_pH">Search</span></label></div><input type="submit" class="green_img search_img_btn" value="Go">
         </form>
   </div>
 </div>
</div>
</div>
<div class="top_hold_filler"></div>
<div class="info_hold" id="info_hold"><div class="ac_info" id="ac_info"></div><div class="point_er" id="point_er"></div></div>
<div class="entire" id="entire">
<div class="main_div5">

<noscript><div class="display_messaget display_message_signup" id="display_messaget" style="display:block;">You must have javascript enabled for this page to work.</div></noscript>

<div class="su_left_signup">
 <div class="su_title">
  Sign Up!
  <span>
   RepFive is free and will always be!
  </span>
 </div>

 <div class="facebook-block">
	<a class="facebook-btn" href="javacript:void(0);" onclick="fb_login();"><span class="fb-img"></span><span class="fb-txt">Sign up with Facebook!</span></a>
 </div>

 <div class="su_signup_info">
  <div class="signup_info_right">
	<div class="signup_icon si_1"></div>
	<div class="sign_inner_right">
		<div class="signup_info_title">Post with a Purpose</div>
		Post in categories.  Follow users and categories you enjoy.
	</div>
  </div>
 </div>
 <div class="su_signup_info">
  <div class="signup_info_right">
	<div class="signup_icon si_2"></div>
	<div class="sign_inner_right">
		<div class="signup_info_title">Your Internet Reputation</div>
		We keep track of your internet reputation (on sites that have signed up with us).
	</div>
  </div>
 </div>

</div>
<div class="su_right_signup">
 <div class="signup_user">
  <form id="form_check" action="" onsubmit="return false;" method="post">

	<div class="input_field">
		<div class="input_title">
			Name
		</div>
		<div class="input_inputs">
			<div class="text_long"><input type="text" id="full_name" name="full_name" class="simple_bar account_bar" maxlength="40" onkeydown="hide_error_exp('input_name');" onblur="require_filled(false,this,'input_name','Name is required.');" value=""></div>
			<span class="response_text" id="input_name"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Username
		</div>
		<div class="input_inputs">
			<div class="text_long"><label for="username"><input type="text" id="username" name="username" class="simple_bar account_bar" maxlength="15" onchange="hide_placeh(this);" onkeydown="hide_placeh(this);hide_error_exp('input_username');" onblur="require_filled(false,this,'input_username','Enter a Username.','',null,1,15);show_placeh(this);" value=""><span class="placeholder">1 to 15 Characters</span></label></div>
			<span class="response_text" id="input_username"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Email
		</div>
		<div class="input_inputs">
			<div class="text_long"><input type="text" id="email" name="email" class="simple_bar account_bar" onkeydown="hide_error_exp('input_email');" onblur="require_filled(false,this,'input_email','Email is required.');" value=""></div>
			<span class="response_text" id="input_email"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Password
		</div>
		<div class="input_inputs">
			<div class="text_long"><label for="password"><input type="password" autocomplete="off" id="password" name="password" class="simple_bar account_bar" maxlength="20" onchange="hide_placeh(this);" onkeydown="hide_placeh(this);hide_error_exp('input_password');" onkeyup="gen_password_strength(this.value);" onblur="require_filled(false,this,'input_password','Password is required.','',null,6,20);show_placeh(this);" value=""><span class="placeholder">6 to 20 Characters</span><span class="password_strength" id="password_strength" onmouseover="javascript:info_message(this.id,0,8,'Password Strength',0,'#fff','#000','#000');"></span></label></div>
			<span class="response_text" id="input_password"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Confirm Password
		</div>
		<div class="input_inputs">
			<div class="text_long"><input type="password" autocomplete="off" id="password2" name="password2" class="simple_bar account_bar" maxlength="20" onkeydown="hide_error_exp('input_password2');" onblur="require_filled(false,this,'input_password2','Password Confirmation is required.','Passwords do not match.','password',6,20);" value=""></div>
			<span class="response_text" id="input_password2"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Birthday
		</div>
		<div class="input_inputs">
			<div class="text_3short"><label for="month"><input type="text" id="month" name="month" class="simple_bar account_bar small_account_bar3" maxlength="2" onchange="hide_placeh(this);" onkeydown="hide_placeh(this);hide_error_exp('input_birthday');" onblur="require_filled(false,this,'input_birthday','Month is required.');show_placeh(this);" value=""><span class="placeholder">MM</span></label></div>
			<div class="text_3short"><label for="day"><input type="text" id="day" name="day" class="simple_bar account_bar small_account_bar3" maxlength="2" onchange="hide_placeh(this);" onkeydown="hide_placeh(this);hide_error_exp('input_birthday');" onblur="require_filled(false,this,'input_birthday','Day is required.');show_placeh(this);" value=""><span class="placeholder">DD</span></label></div>
			<div class="text_3short" style="margin:0;"><label for="year"><input type="text" id="year" name="year" class="simple_bar account_bar small_account_bar3" maxlength="4" onchange="hide_placeh(this);" onkeydown="hide_placeh(this);hide_error_exp('input_birthday');" onblur="require_filled(false,this,'input_birthday','Year is required.');show_placeh(this);" value=""><span class="placeholder">YYYY</span></label></div>
			<span class="response_text" id="input_birthday"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Gender
		</div>
		<div class="input_inputs">
			<div class="text_3short" style="width:60px;"><label for="male" style="cursor:pointer;">Male<input class="radio_type" id="male" name="gender" type="radio" onchange="hide_error_exp('input_gender');" value="m" ></label></div>
			<div class="text_3short" style="width:240px;"><label for="female" style="cursor:pointer;">Female<input class="radio_type" id="female" name="gender" type="radio" onchange="hide_error_exp('input_gender');" value="f" ></label></div>
			<span class="response_text" id="input_gender"></span>
		</div>
	</div>
	<div class="input_field">
		<div class="input_title">
			Validation
		</div>
		<div class="input_inputs">
			<img id="veric" src="captcha.jpg" alt="Captcha Image"> <a class="page_link" href="javascript:void(0)" onclick="refreshc();">Refresh</a>
			<div class="text_long"><label for="validation"><input class="simple_bar account_bar" maxlength="5" id="validation" name="validation" type="text" autocomplete="off" onkeydown="hide_placeh(this);hide_error_exp('input_validation');" onblur="require_filled(false,this,'input_validation','Validation is required.','',null,5,5);show_placeh(this)" value=""><span class="placeholder">Enter 5 Largest Characters Above</span></label></div>

			<span class="response_text" id="input_validation"></span>
		</div>
	</div>
	<div class="input_field" style="margin-bottom:15px;border:1px #ddd solid;border-width:1px 0;padding:7px 0;">
		<div class="input_inputs">
			<div class="text_long"><span class="_terms_span">By Clicking the "Create Account" button below, you agree to our <a target="_blank" href="javascript:void(0);">terms.</a></span></div>
		</div>
	</div>
	<div class="input_field" style="margin:0px;">
		<div class="input_inputs">
			<input type="hidden" id="offset" name="offset" value="0" />
			<div class="text_long"><input type="submit" id="form_submit" class="light_gray_img R5_signup_btn" style="padding:5px 10px;height:auto;" value="Create Account"></div>
		</div>
	</div>
  </form>
 </div>
</div>
</div>

</div>
<div class="signup_footer">
<div class="full_footer">
<div class="signup_back">
<a class="footer_link" href="javascript:void(0);">Developers</a>
<a class="footer_link" href="javascript:void(0);">Terms</a>
<a class="footer_link" href="javascript:void(0);">Privacy</a>
<span class="footer_link">&copy; 2014</span>
</div></div></div>
</div>
 <script type="text/javascript" src="signup_script.js"></script>
 <script type="text/javascript" src="load_posts.js"></script>
 <script type="text/javascript" src="create_category.js"></script>
 <script type="text/javascript" src="script.js"></script>
 <script type="text/javascript" src="post.js"></script>
 <script type="text/javascript" src="script2.js"></script>
 <script type="text/javascript" src="report.js"></script>
 <script type="text/javascript" src="follow.js"></script>
<script type="text/javascript">
if(form_submitted) {check_fields(false);}

var n_date = new Date();
document.getElementById("offset").value = -(n_date.getTimezoneOffset()/60);
</script>

 </body>
</html>