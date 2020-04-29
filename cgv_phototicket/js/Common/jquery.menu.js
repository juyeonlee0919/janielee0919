(function() {

  jQuery.fn.PieMenu = function(options) {
	var angle,
		delay_time,
		ele_angle=[],
		x_pos=[],
		y_pos=[];
	
    var settings = jQuery.extend( {
      'starting_angel'   : '0',
      'angel_difference' : '90',
	  'radius':'200',
	  'menu_element' : this.children('.menu_option').children(),
	  'menu_button' : this.children('.menu_button'),
    }, options);

	jQuery('.menu_option a').css('display','none');
	
	
	angle = parseInt(settings.angel_difference)/(settings.menu_element.length-1);
	delay_time = 1/(settings.menu_element.length-1);

	function setPosition(val){
		jQuery(settings.menu_element).each(function(i,ele){
			jQuery(ele).css({
			'left' : (val==0)?0:y_pos[i],
			'top' : (val==0)?0:-x_pos[i],
			});
		});
	}
	
	jQuery(settings.menu_button).unbind('click', clickHandler);	//remove event if exist
	
	var clickHandler = function() {
		if(jQuery(this).parent().hasClass('active')){
			
            setPosition(0);
			jQuery(this).parent().removeClass('active');
			jQuery(this).parent().addClass('inactive');
			jQuery('.menu_option a').fadeOut();

		}else{
			
            setPosition(1);
			jQuery(this).parent().addClass('active');
			jQuery(this).parent().removeClass('inactive');
			jQuery('.menu_option a').fadeIn();

            chkClickTrace("/신규버전(ver.3.0,201501)/메인/퀵메뉴/전체(열기)");
		}	
		jQuery(this).toggleClass("btn-rotate");
	};

	jQuery(settings.menu_button).bind('click', clickHandler);

	jQuery('.shortcut_menu .fogbg').click(function() {
		jQuery(settings.menu_button).trigger('click')
	});

	return settings.menu_element.each(function(i,ele){
		ele_angle[i] = (parseInt(settings.starting_angel) + angle*(i))*Math.PI/180;
		 x_pos[i] = (settings.radius * Math.sin(ele_angle[i]));
         y_pos[i] = (settings.radius * Math.cos(ele_angle[i]));
		 /* rotate 해제
		 jQuery(ele).css({
			'-webkit-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			   '-moz-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			    '-ms-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			     '-o-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			    	'transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
		});
		 */
      })

  };
})();