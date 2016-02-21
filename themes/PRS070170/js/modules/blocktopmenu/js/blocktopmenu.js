/*

* 2007-2015 PrestaShop

*

* NOTICE OF LICENSE

*

* This source file is subject to the Academic Free License (AFL 3.0)

* that is bundled with this package in the file LICENSE.txt.

* It is also available through the world-wide-web at this URL:

* http://opensource.org/licenses/afl-3.0.php

* If you did not receive a copy of the license and are unable to

* obtain it through the world-wide-web, please send an email

* to license@prestashop.com so we can send you a copy immediately.

*

* DISCLAIMER

*

* Do not edit or add to this file if you wish to upgrade PrestaShop to newer

* versions in the future. If you wish to customize PrestaShop for your

* needs please refer to http://www.prestashop.com for more information.

*

*  @author PrestaShop SA <contact@prestashop.com>

*  @copyright  2007-2015 PrestaShop SA

*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)

*  International Registered Trademark & Property of PrestaShop SA

*/



var responsiveflagMenu = false;

var categoryMenu = $('ul.sf-menu');

var mCategoryGrover = $('.sf-contener .cat-title');



$(document).ready(function(){

	

	var max_elem = 11;



	var items = $('ul.tm_sf-menu > li');



	var surplus = items.slice(max_elem, items.length);



	surplus.wrapAll('<li class="level0 level-top hiden_menu"><ul class="level0">');



	$('.hiden_menu').prepend('<a href="#" class="level-top">More</a>');



	$('.hiden_menu').mouseover(function(){



	$(this).children('ul').addClass('shown-sub');



	})



	$('.hiden_menu').mouseout(function(){



	$(this).children('ul').removeClass('shown-sub');



	});	

	

	

	categoryMenu = $('ul.sf-menu');

	mCategoryGrover = $('.sf-contener .cat-title');

	responsiveMenu();

	$(window).resize(responsiveMenu);

});







// check resolution

function responsiveMenu()

{

   if ($(window).width() <= 991 && responsiveflagMenu == false)

	{

		menuChange('enable');

		responsiveflagMenu = true;

	}

	else if ($(window).width() >= 992)

	{

		menuChange('disable');

		responsiveflagMenu = false;

	}

}



// init Super Fish Menu for 767px+ resolution

function desktopInit()

{

	mCategoryGrover.off();

	mCategoryGrover.removeClass('active');

	$('.sf-menu > li > ul').removeClass('menu-mobile').parent().find('.menu-mobile-grover').remove();

	$('.sf-menu').removeAttr('style');

	categoryMenu.superfish('init');

	//add class for width define

	$('.sf-menu > li > ul').addClass('submenu-container clearfix');

	 // loop through each sublist under each top list item

    $('.sf-menu > li > ul').each(function(){

        i = 0;

        //add classes for clearing

        $(this).each(function(){

            if ($(this).attr('class') != "category-thumbnail"){

                i++;

                if(i % 2 == 1)

                    $(this).addClass('first-in-line-xs');

                else if (i % 5 == 1)

                    $(this).addClass('first-in-line-lg');

            }

        });

    });

}



function mobileInit()

{



	categoryMenu.superfish('destroy');

	$('.sf-menu').removeAttr('style');



	mCategoryGrover.on('click', function(e){

		$(this).toggleClass('active').parent().find('ul.menu-content').stop().slideToggle('medium');

		return false;

	});



	$('.sf-menu > li > ul').addClass('menu-mobile clearfix').parent().prepend('<span class="menu-mobile-grover"></span>');



	$(".sf-menu .menu-mobile-grover").on('click', function(e){

		var catSubUl = $(this).next().next('.menu-mobile');

		if (catSubUl.is(':hidden'))

		{

			catSubUl.slideDown();

			$(this).addClass('active');

		}

		else

		{

			catSubUl.slideUp();

			$(this).removeClass('active');

		}

		return false;

	});





	$('#block_top_menu > ul:first > li > a').on('click', function(e){

		var parentOffset = $(this).prev().offset();

	   	var relX = parentOffset.left - e.pageX;

		if ($(this).parent('li').find('ul').length && relX >= 0 && relX <= 20)

		{

			e.preventDefault();

			var mobCatSubUl = $(this).next('.menu-mobile');

			var mobMenuGrover = $(this).prev();

			if (mobCatSubUl.is(':hidden'))

			{

				mobCatSubUl.slideDown();

				mobMenuGrover.addClass('active');

			}

			else

			{

				mobCatSubUl.slideUp();

				mobMenuGrover.removeClass('active');

			}

		}

	});



}



// change the menu display at different resolutions

function menuChange(status)

{

	status == 'enable' ? mobileInit(): desktopInit();

}

