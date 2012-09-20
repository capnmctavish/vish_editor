VISH.Editor.Quiz = (function(V,$,undefined){
	var maxNumMultipleChoiceOptions = 6; // maximum input options 
	var choicesLetters = ['a)','b)','c)','d)','e)','f)'];
	var fancyTabs = false;
	var init = function(){
		$(document).on('click','.add_quiz_option', _addMultipleChoiceOption);
		$(document).on('click','.remove_quiz_option', _removeMultipleChoiceOption);
		$(document).on('keydown','.multiplechoice_text', _onKeyDown);
	};	
	//for embeding a quiz into a template
	var onLoadTab = function (tab) {

		if(tab=="quiz_mchoice") {

			_onLoadTabMChoiceQuiz();
		} else if (tab=="quiz_open"){

			V.Debugging.log("quiz open load tab");

		}

	};

	var addMChoiceQuiz = function () {

	V.Debugging.log("add MChoice Quiz Button clicked");

	};

	//used for editing a quiz
	var drawQuiz = function(question, options){
		//first the question in the textarea
		$(".current").find(".value_multiplechoice_question").val(question);
		//now the options
		for (var i = 0;  i <= options.length - 1; i++) {
			var optionText = options[i];
			var myInput = $(".current").find(".ul_mch_options > li").last().find("input");
			var myImg = $(".current").find(".ul_mch_options > li").last().find("img");
			_addMultipleChoiceOption(null, myInput, myImg, optionText);
		};
		
	};

	var _onKeyDown = function(event){
		if(event.keyCode == 13) {
			 var target = event.target;
			if(($(target).val()!="")&& ($(target).val()!="write quiz options here")) {
				_addMultipleChoiceOption(event);
			}
		}	
	}

	//myInput, myImg and optionText are used to add the options when editing a mc question.
	var _addMultipleChoiceOption = function(event, myInput, myImg, optionText){


		var img, input;
		var optionsLength = $(".current").find(".ul_mch_options > li").length;
		if(optionsLength >= maxNumMultipleChoiceOptions){
			return;
		}
		if(event){
			V.Debugging.log("event.target.tagName addMultipleChoiceOption: "+ event.target.tagName);

			if(event.target.tagName === "INPUT"){
				//addMultipleChoiceOption trigger from keyboard input
				img = $(event.target).parent().find("img");
				input = event.target;
			} else if(event.target.tagName === "IMG"){
				//addMultipleChoiceOption trigger from img click
				V.Debugging.log("event.target : "+ event.target);
				img = event.target;
				input = $(event.target).parent().parent().find("input");
			}
		} else {
			img = myImg;
			input = myInput;
			$(input).val(optionText);
		}

		var a = $(img).parent();
		var li = $(input).parent();

		if(fancyTabs) {
			V.Debugging.log("enter into fancyTabs true first");	
		var targetChoice = $("#tab_quiz_mchoice_content").find(".ul_mch_options > li").index(li);
		}

		else { 
		
		var targetChoice = $(".current").find(".ul_mch_options > li").index(li);
		}
		V.Debugging.log("targetChoice" + targetChoice);
		var isLastChoice = (targetChoice === (optionsLength-1));

		if(!isLastChoice){
			return;
		}

		$(img).attr("src",VISH.ImagesPath + "delete.png");
		$(a).removeClass().addClass("remove_quiz_option");
		$(input).blur();

		var maxChoicesReached = (optionsLength == maxNumMultipleChoiceOptions-1);
		var newMultipleChoice = _renderDummyMultipleChoice(choicesLetters[optionsLength],!maxChoicesReached);
				V.Debugging.log("newMultipleChoice" + newMultipleChoice);
		if(fancyTabs) { 
		V.Debugging.log("fancyTabs true second one");
			$("#tab_quiz_mchoice_content").find(".ul_mch_options").append(newMultipleChoice);
			$("#tab_quiz_mchoice_content").find(".ul_mch_options > li").last().find("input").focus();
		}	
		else {
			$(".current").find(".ul_mch_options").append(newMultipleChoice);
			$(".current").find(".ul_mch_options > li").last().find("input").focus();
		}

	};

	var _renderDummyMultipleChoice = function(text, addImage){
				V.Debugging.log("enter into _renderDummyMultipleChoice");
		var li = $("<li class='li_mch_option'></li>");
		$(li).append("<span class='mcChoiceSpan'>" + text + "</span>");
		$(li).append("<input type='text' class='multiplechoice_text'></input>");
		if(addImage === true){
			$(li).append(_renderAddImg());
		}
		return li;
	}

	var _renderAddImg = function(){
		var a = $("<a class='add_quiz_option'></a>");
		var addImg = $("<img src='" + VISH.ImagesPath + "add_quiz_option.png'/>");
		$(a).append(addImg);
		return a;
	}

	var _removeMultipleChoiceOption = function(id) {
		//removeMultipleChoiconLoadTabMChoiceQuizeOption trigger always from img click
		var li = $(event.target).parent().parent();
		$(li).remove();

		//Rewrite index letters
		$(".current").find(".ul_mch_options > li").each(function(index, value) {
			var span = $(value).find("span");
			$(span).html(choicesLetters[index]);
		});

		//Ensure that last choice has plus option
		var lastLi = $(".current").find(".ul_mch_options > li").last();
		var lastA = $(lastLi).find("a");
		if(($(lastA).length==0)||($(lastA).hasClass("add_quiz_option")===false)){
			$(lastLi).append(_renderAddImg());
		}
	};
	//first kind of quiz shown
	var _onLoadTabMChoiceQuiz = function() {
		fancyTabs = true;
		$("#tab_quiz_mchoice").show();
		$("#tab_quiz_mchoice_content").find(".add_quiz_option_img").attr("src", VISH.ImagesPath+"add_quiz_option.png");
		
			};

	return {
		drawQuiz				: drawQuiz,
		init			 		: init, 
		onLoadTab				: onLoadTab, 
		addMChoiceQuiz			: addMChoiceQuiz 				

	};

}) (VISH, jQuery);