function ModalObj() {}
function MainMenuObj() {}
function ListViewObj() {}
function TaskListObj() {}
function CalendarObj() {}
function CarouselObj() {
	this.container
	this.gallery;
	this.page;
	this.slides;
}
function FormObj() {
	this.rangeTickWidth = 2;
	this.progressDottedDotWidth = 10;
}
function MapObj() {
	this.map;
	this.view;
	this.defaultIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
	this.userIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
	this.initLat = 37.7750;
	this.initLng = 122.4183;
	this.markers = new Array();
	this.openInfowindow = null;
	this.userPosition = null;
}
function ReportObj() {
	//various variables used across graphs... tried to leave them ambiguous if they can be used across graph types.
	this.svg;
	this.legendBoxSize = 30;
	this.legendBoxSpacing = 10;
	this.graphType;
	this.width;
	this.height;
	this.jsonURL;
	this.json;
	this.data = [];
	this.bar = {
		height: 700,
		margin: {top: 20, right: 20, bottom: 200, left: 40},
		valueline: null
	};
	this.gauge = {
		value: null,
		max: null
	};
	this.line = {
		height: 700,
		margin: {top: 50, right: 20, bottom: 100, left: 60},
		valueline: null,
		periods : [10, 30],
		selectedPeriod : 0,
		maxVal: {date: null, total: 0},
		minVal: {date: null, total: 99999999999}
	};
	this.axis = {
		x: null,
		y: null,
		minorTicks: null,
		xAxisIndex: null,
		yAxisIndex: null,
		xAxis: null,
		yAxis: null,
	}
}

var modalObj = new ModalObj();
	mainMenuObj = new MainMenuObj(),
	listViewObj = new ListViewObj(),
	formObj = new FormObj(),
	mapObj = new MapObj(),
	reportObj = new ReportObj();
	taskListObj = new TaskListObj();
	carouselObj = new CarouselObj();
	calendarObj = new CalendarObj();

$(document).ready(function() {
	init();
});

$(document).on('onTemplateReady', function() {
	init();
});

function init(){
	modalObj.init();
	mainMenuObj.init();
	listViewObj.init();
	formObj.init();
	taskListObj.init();
	calendarObj.init();

}
/*####################################################################################################################
ModalObj Prototype
####################################################################################################################*/
ModalObj.prototype.init = function() {
	$(".open-modal").click(function(e) {
		e.preventDefault();
		$(".modal").fadeIn();
	});
	$(".close-modal").click(function(e) {
		e.preventDefault();
		$(".modal").fadeOut();
	});
}
/*####################################################################################################################
MainMenuObj Prototype
####################################################################################################################*/
MainMenuObj.prototype.init = function() {
	var t = this;
	t.setupMenuSlider();
}
MainMenuObj.prototype.setupMenuSlider = function() {
	$('.main-menu-button-left a.menu').click(function(e) {
		e.preventDefault();
		$(".app-wrapper").toggleClass("menu-open");
	});
}
/*####################################################################################################################
ListViewObj Prototype
####################################################################################################################*/
ListViewObj.prototype.init = function() {
	var t = this;
	t.setupCollapsableMenus();
	t.setupTabbedLists();
	t.setupMilestoneLists();
	t.setupSwipeLis();

	$(window).on('resize', function() {t.setupTabbedLists();});
	$(window).on('orientationchange', function() {t.setupTabbedLists();});
}
ListViewObj.prototype.setupCollapsableMenus = function() {
	$.each($('ul.list-view.collapsable > li'), function() {
		$('> .content', this).click(function(e) {
			e.preventDefault();
			var plusMinusIcon = $('.list-view-icons span', this).last();
			if ($(this).hasClass("expanded")) {
				$(this).removeClass("expanded").siblings('ul').first().slideUp();
				plusMinusIcon.removeClass('icon-minus').addClass('icon-plus');
			}
			else {
				$(this).addClass("expanded").siblings('ul').first().slideDown();
				plusMinusIcon.removeClass('icon-plus').addClass('icon-minus');
			}
		});
	});
}
ListViewObj.prototype.setupTabbedLists = function() {
	var t = this,
		container = $('ul.tabbed-list-view');
		panels = container.children("li"),
		tabs = $('.tabbed-list-view-nav a'),
		tabWidth = tabs.first().width(),
		arrow = $(".tabbed-list-view-nav-arrow"),
		ww = panels.first().width();

	arrow.css({
		left: tabWidth / 2
	});
	$.each(panels, function() {
		$(this).css({
			left: (panels.index(this) * ww) + "px"
		});
	});
	tabs.click(function(e) {
		e.preventDefault();
		$(tabs).removeClass("on");
		$(this).addClass("on");
		container.attr("class", "tabbed-list-view").addClass("slide-" + tabs.index(this));
		arrow.animate({
			left: (tabWidth / 2) + (tabWidth * tabs.index(this))
		}, { queue: false, duration: 200 });
	});
}
ListViewObj.prototype.setupMilestoneLists = function() {
	var t = this,
		lists = $(".list-view-milestones");
	$.each(lists, function() {
		var lis = $("li", this),
			appendHtml = "<div class='background-fill'></div>";
		lis.first().prepend(appendHtml)
		lis.last().prepend(appendHtml);
	});
}
ListViewObj.prototype.setupSwipeLis = function() {
	var t = this,
		liEls = $("ul.with-swipe li");
	if (liEls.length > 0) {
		$("ul.with-swipe li").touchwipe({
		    wipeRight: function(e) { 
		     	$(this.el).addClass("swiped");
		    },
		    wipeLeft: function(e) { 
		     	$(this.el).removeClass("swiped");
		    },
		    min_move_y: 20,
		    preventDefaultEvents: true
		});
	}
}
/*####################################################################################################################
TaskListObj Prototype
####################################################################################################################*/
TaskListObj.prototype.init = function() {
	var t = this;
	t.setupCheckboxes();
}
TaskListObj.prototype.setupCheckboxes = function() {
	var t = this,
		tasks = $(".list-view-tasks li");

	$.each(tasks, function() {
		var li = this,
			checkbox = $(".content > .task-complete-checkbox > input", this);
		$(".content", this)
			.prepend("<div class='strikethrough'>&nbsp;</div>")
			.prepend("<div class='overdue-color-block'>&nbsp;</div>")
		checkbox.click(function(){
			$(li).toggleClass("complete");
			$("p", li).slideToggle(200);
		});
	});
}
/*####################################################################################################################
CalendarObj Prototype
####################################################################################################################*/
CalendarObj.prototype.init = function() {
	var t = this,
		liEls = $("ul.week-planner li");

	liEls.click(function() {
		liEls.removeClass("on");
		$(this).addClass("on");
		$(".date-content").hide();
		$("#date-content-" + $(this).data("date")).show();
	});

	liEls.first().click();
}
/*####################################################################################################################
CarouselObj Prototype
####################################################################################################################*/
CarouselObj.prototype.init = function(args) {
	var t = this,
		i,
		el;

	for (i in args) {
		t[i] = args[i];
	}

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	t.gallery = new SwipeView(t.container, { numberOfPages: t.slides.length });

	//setup first slides
	for (i=0; i<3; i++) {
		t.page = i==0 ? t.slides.length-1 : i-1;
		el = document.createElement('img');
		el.className = 'loading';
		el.src = t.slides[t.page].img;
		el.width = t.slides[t.page].width;
		el.height = t.slides[t.page].height;
		el.onload = function () { this.className = ''; }
		t.gallery.masterPages[i].appendChild(el);

		el = document.createElement('span');
		el.innerHTML = t.slides[t.page].desc;
		t.gallery.masterPages[i].appendChild(el)
	}

	//setup interaction functions
	t.gallery.onFlip(function () {
		var el,
			upcoming,
			i;

		for (i=0; i<3; i++) {
			upcoming = t.gallery.masterPages[i].dataset.upcomingPageIndex;

			if (upcoming != t.gallery.masterPages[i].dataset.pageIndex) {
				el = t.gallery.masterPages[i].querySelector('img');
				el.className = 'loading';
				el.src = t.slides[upcoming].img;
				el.width = t.slides[upcoming].width;
				el.height = t.slides[upcoming].height;
				
				el = t.gallery.masterPages[i].querySelector('span');
				el.innerHTML = t.slides[upcoming].desc;
			}
		}
	});
	t.gallery.onMoveOut(function () {
		t.gallery.masterPages[t.gallery.currentMasterPage].className = t.gallery.masterPages[t.gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
	});
	t.gallery.onMoveIn(function () {
		var className = t.gallery.masterPages[t.gallery.currentMasterPage].className;
		/(^|\s)swipeview-active(\s|$)/.test(className) || (t.gallery.masterPages[t.gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
	});
}
/*####################################################################################################################
FormObj Prototype
####################################################################################################################*/
FormObj.prototype.init = function() {
	var t = this;
	t.checkDateInputs();
	t.setupToggles();
	t.renderRangeTicks();
	t.renderProgressBar();
	t.renderProgressDotted();
	$(window).on('resize', function() {
		t.renderProgressDotted();
		t.renderProgressBar();
		t.renderRangeTicks();
	});
	$(window).on('orientationchange', function() {
		t.renderProgressBar();
		t.renderProgressDotted();
		t.renderRangeTicks();
	});
}
FormObj.prototype.checkDateInputs = function() {
	var testInput = document.createElement("input"),
		inputType = "date";

	testInput.setAttribute("type", inputType)

	if (testInput.type != inputType) {
		$.each($(".form-control-date input"), function() {
			$(this).Zebra_DatePicker();
		})

	}
}
FormObj.prototype.setupToggles = function() {
	$.each($('.form-control-toggle'), function() {
		var checkbox = $("input", this).first();
		$(this).prepend('<span class="label on"></span><span class="label off"></span><span class="handle">&nbsp;</span>');
		$('.on', this).html($(this).data('on-label'));
		$('.off', this).html($(this).data('off-label'));
		if (checkbox.prop("checked") == true) {
			$(this).addClass("checked");
		}
		$(this).click(function(e) {
			e.preventDefault();
			$(this).toggleClass("checked");
			if (checkbox.prop("checked") == true) {
				checkbox.prop("checked", false);
			}
			else {
				checkbox.prop("checked", true);
			}
		});
	});
}
FormObj.prototype.renderRangeTicks = function() {
	var t = this;
	$.each($('.form-control-range'), function() {
		var padding = 1,
			newLeft = padding,
			ww = $(this).width() - (2 * padding), //this is a bit of fiddling...
			tickLabels = $(this).data("tick-labels").split(","),
			tickSpacing = Math.round((ww - tickLabels.length * t.rangeTickWidth) / (tickLabels.length - 1)),
			leftoverPixels = ww - (tickSpacing * (tickLabels.length - 1)  + t.rangeTickWidth * tickLabels.length),
			currentVal = $('.noUiSlider', this).val();
			output = "<ul>";

		$(this).html("<div class='noUiSlider'></div>");

		var uiSlider = $(".noUiSlider", this);
		uiSlider.noUiSlider({
			range: [$(this).data("min"), $(this).data("max")],
			start: 0,
			step: $(this).data("step"),
			handles: 1
		});
		if (!isNaN(currentVal)) {
			uiSlider.val(currentVal);
		}
		else {
			uiSlider.val(0);
		}
		for (var i = 0; i < tickLabels.length; i++) {
			var addedStyle = "",
				addedPixel = 0;
			if (leftoverPixels < 0) {
				addedPixel = -1;
				leftoverPixels++;
			}
			if (leftoverPixels > 0) {
				addedPixel = 1;
				leftoverPixels--;
			}
			addedStyle = " style='left:" + (newLeft) + "px;'";
			output += "<li" + addedStyle + "><span>" + tickLabels[i] + "</span></li>";
			newLeft += (tickSpacing + addedPixel + t.rangeTickWidth);
		}
		output += "</ul>";

		$(this).prepend(output);
		$.each($("ul span", this), function() {
			$(this).css({
				top: $(this).height(),
				left: -($(this).width() / 2) + 3
			})
		});
	});
}
FormObj.prototype.renderProgressBar = function() {
	var t = this,
		barFill = '<div class="progress-bar-fill">&nbsp;</div>';
	$.each($('.progress-bar'), function() {
		$(this).html(barFill);
		$('.progress-bar-fill', this).css({
			width: $(this).data("completed") + "%"
		});
	});
}
FormObj.prototype.renderProgressDotted = function() {
	var t = this;
	$.each($('.progress-dotted'), function() {
		var completedRatioParts = $(this).data("completed").split("/"),
			newLeft = 0,
			ww = $(this).width(),
			dotSpacing = Math.round((ww - completedRatioParts[1] * t.progressDottedDotWidth) / (completedRatioParts[1] - 1)),
			leftoverPixels = ww - (dotSpacing * (completedRatioParts[1] - 1)  + t.progressDottedDotWidth * completedRatioParts[1]),
			labelEl = $('.progress-dotted-label', this),
			labelLeft = t.progressDottedDotWidth * (completedRatioParts[0] - 0.5) + dotSpacing * (completedRatioParts[0] - 1) - parseInt(labelEl.width()) / 2,
			output = "<div class='progress-dotted-bg'>&nbsp;</div><ul>";
		for (var i = 0; i < completedRatioParts[1]; i++) {
			var addedClass = (i == completedRatioParts[0] - 1 ? " class='on'" : ""),
				addedStyle = "",
				addedPixel = 0;
			if (i != 0) {
				if (leftoverPixels < 0) {
					addedPixel = -1;
					leftoverPixels++;
				}
				if (leftoverPixels > 0) {
					addedPixel = 1;
					leftoverPixels--;
				}
				newLeft += (dotSpacing + addedPixel + t.progressDottedDotWidth);
				addedStyle = " style='left:" + (newLeft) + "px;'"
			}
			output += "<li" + addedClass + addedStyle + ">&nbsp;</li>";
		}
		output += "</ul>";
		if (labelLeft < 0) labelLeft = 0;
		if (labelLeft > ww - labelEl.width()) labelLeft = ww - labelEl.width();
		labelEl.css({
			left: labelLeft
		});
		$('ul', this).remove();
		$(this).prepend(output);
	});
}
/*####################################################################################################################
MapObj Prototype  
####################################################################################################################*/
MapObj.prototype.init = function(args) {
	var t = this;
	t.view = args.view;
	t.setupMap(args);
	t.setupMarkerLinks();

	$(window).on('resize', function() {
		t.updateWrapperDimensions();
		google.maps.event.trigger(t.map, 'resize');
		t.resetMarkerBounds();
	});
}
MapObj.prototype.setupMap = function(args) {
	var t = this;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			//success
			t.userPosition = position;
			t.initLat = position.coords.latitude;
			t.initLng = position.coords.longitude;
			t.setupMapView();
			args.markers.push({
				id: "theCaptain",
				icon: t.userIcon,
				lat: position.coords.latitude, 
				lng: position.coords.longitude
			});
			t.addMarkers(args.markers);
		}, function() {
			//Errors
			t.setupMapView();
			t.addMarkers(args.markers);
		});
	}
	else {
		t.setupMapView();
		t.addMarkers(args.markers);
	}
}
MapObj.prototype.setupMapView = function() {
	var t = this,
		mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(t.initLat, t.initLng),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false
		};

	$('#map-canvas-wrapper').html('<div id="map-canvas" class="map-canvas"></div>');
	t.updateWrapperDimensions();
	t.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
MapObj.prototype.updateWrapperDimensions = function() {
	t = this,
		appContentEl = $(".app-content"),
		mapCanvasWrapperEl = $('#map-canvas-wrapper'),
		wh = $(window).height(),
		contentBottomPosition = appContentEl.height();

	if (t.view == "fullView") {
		appContentEl.css({
			height: $(window).height()
		});
		mapCanvasWrapperEl.css({
			height: "100%"
		});
	}
	if (t.view == "listView") {
		$(appContentEl).css({
			height: wh - mapCanvasWrapperEl.height() - appContentEl.offset().top,
			"overflow-x" : "hidden",
			"overflow-y" : "scroll"
		})
		//add padding onto the body to fix issues with the map covering up list items
		if (contentBottomPosition > wh) {
			$("body").css({
				marginBottom: mapCanvasWrapperEl.height()
			});
		}
		if (contentBottomPosition < wh && (wh - contentBottomPosition) < mapCanvasWrapperEl.height()){
			$("body").css({
				marginBottom: mapCanvasWrapperEl.height() - (wh - contentBottomPosition)
			});
		}
	}
}
MapObj.prototype.addMarkers = function(markersArray) {
	var t = this;

	for (var i in markersArray) {
		var	markerLatlng = new google.maps.LatLng(markersArray[i].lat, markersArray[i].lng),
			marker = new google.maps.Marker({
				visible: (markersArray[i].visible ? markersArray[i].visible : false),
				position: markerLatlng,
				icon: (markersArray[i].icon ? markersArray[i].icon : t.defaultIcon),
				map: t.map
			}),
			distanceToUser = t.getDistanceToUser(markerLatlng);
		if (markersArray[i].contentString) {
			var infowindow = new google.maps.InfoWindow;
			t.bindInfoWindowToMarker(marker, markersArray[i].contentString, infowindow);
		}
		t.markers.push({"id": markersArray[i].id, "marker": marker, "distanceToUser" : distanceToUser});
	}

	google.maps.event.addListenerOnce(t.map, 'idle', function(){
		if (t.view == "listView") {
			$("a[data-map-id]").first().click();
		}
		else {
			t.showMarkers();
		}
	});
}
MapObj.prototype.showMarkers = function(id) {
	var t = this,
		mapBounds = new google.maps.LatLngBounds();
	for (var i in t.markers) {
		if (!isNaN(id)) {
			t.markers[i].marker.setVisible(false);
			if (t.markers[i].id == id) {
				t.markers[i].marker.setVisible(true);
				t.map.setCenter(t.markers[i].marker.position);
				t.map.setZoom(17);
				google.maps.event.trigger(t.markers[i].marker, 'click');
			}
		}
		else {
			t.markers[i].marker.setVisible(true);
			mapBounds.extend(t.markers[i].marker.position);
		}
	}
	if (isNaN(id)) {
		t.map.fitBounds(mapBounds);
	}
}
MapObj.prototype.resetMarkerBounds = function() {
	var t = this,
		mapBounds = new google.maps.LatLngBounds();
	for (var i in t.markers) {
		if (t.markers[i].marker.getVisible() == true) {
			mapBounds.extend(t.markers[i].marker.position);
		}
	}
	t.map.fitBounds(mapBounds);
}
MapObj.prototype.setupMarkerLinks = function() {
	var t = this
		listViewMarkerLinks = $("a[data-map-id]");

	listViewMarkerLinks.click(function(e) {
		e.preventDefault();
		$('.icon-map-dot').hide();
		$('.icon-map-dot', this).show();
		t.showMarkers($(this).data("map-id"));
	});
}
MapObj.prototype.bindInfoWindowToMarker = function(marker, contentString, infowindow) {
	var t = this;
	google.maps.event.addListener(marker, 'click', function() {
		if (t.openInfowindow != null) t.openInfowindow.close();
		t.openInfowindow = infowindow;
		infowindow.setContent(contentString);
		infowindow.open(t.map, marker);
	});
}
MapObj.prototype.getDistanceToUser = function(markerLatlng) {
	var t = this;
	if (!t.userPosition) {
		return "N/A";
	}
	else {
		return t.distHaversine(markerLatlng) + " miles away";
	}
}
MapObj.prototype.rad = function(x) {return x*Math.PI/180;}
MapObj.prototype.distHaversine = function(markerLatlng) {
	var t = this,
		p1 = {
			lat: t.userPosition.coords.latitude,
			lng: t.userPosition.coords.longitude
		},
		p2 = {
			lat: markerLatlng.lat(),
			lng: markerLatlng.lng()
		},
  		R = 3958.756, //radius in miles //6371, // earth's mean t.radius in km
  		dLat  = t.rad(p2.lat - p1.lat),
  		dLong = t.rad(p2.lng - p1.lng),

  		a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		  Math.cos(t.rad(p1.lat)) * Math.cos(t.rad(p2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2),
  		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
  		d = R * c;

  return d.toFixed(1);
}
/*####################################################################################################################
ReportObj Prototype
####################################################################################################################*/
ReportObj.prototype.init = function(args) {
	var t = this;
	for (var i in args) {
		if (args[i] instanceof Object) {
			for (j in args[i]) {
				t[i][j] = args[i][j]
			}
		}
		else {
			t[i] = args[i];
		}
	}
	t["render" + t.graphType.charAt(0).toUpperCase() + t.graphType.slice(1) + "Graph"]();
}
ReportObj.prototype.getGraphData = function() {
	var t = this;
	t.data = [];

	if (t.graphType == "bar") {
		t.json.forEach(function(d){
			t.data.push({variable: +d[t.axis.yAxisIndex], xAxisIndex: d[t.axis.xAxisIndex]});
		});
	}

	if (t.graphType == "line") {
		var today = new Date(),
			cutoffDate = new Date();
		
		cutoffDate.setDate(cutoffDate.getDate() - t.line.periods[t.line.selectedPeriod] - 2);
		t.json.forEach(function(d){
			var thisDate = new Date(d.date);
			// console.log(thisDate.getMonth() + ":" + thisDate.getDate() + ":" + d[t.axis.yAxisIndex] + " " + cutoffDate.getTime());
			if (thisDate.getTime() >= cutoffDate.getTime() && thisDate.getTime() <= today.getTime()) {
				console.log(thisDate.getTime());
				t.data.push({date: d[t.axis.xAxisIndex], total: +d[t.axis.yAxisIndex]});
				if (+d[t.axis.yAxisIndex] > t.line.maxVal.total) {
					t.line.maxVal = {date: d[t.axis.xAxisIndex], total: +d[t.axis.yAxisIndex]};
				}
				if (+d[t.axis.yAxisIndex] < t.line.minVal.total) {
					t.line.minVal = {date: d[t.axis.xAxisIndex], total: +d[t.axis.yAxisIndex]};
				}
			}
		});
	}
}
ReportObj.prototype.renderBarGraph = function() {
	var t = this;
	
	t.width = $("#graph").width() - t.bar.margin.left - t.bar.margin.right;
	t.height = t.bar.height - t.bar.margin.top - t.bar.margin.bottom;

	t.axis.x = d3.scale.ordinal()
				.rangeRoundBands([0, t.width], 0.1);
	t.axis.y = d3.scale.linear()
				.range([t.height, 0]);
	t.axis.xAxis = d3.svg.axis()
			.scale(t.axis.x)
			.orient("bottom");
	t.axis.yAxis = d3.svg.axis()
			.scale(t.axis.y)
			.orient("left");
	t.svg = d3.select("#graph").append("svg")
			.attr("width", t.width + t.bar.margin.left + t.bar.margin.right)
			.attr("height", t.height + t.bar.margin.top + t.bar.margin.bottom)
			.append("g")
			.attr("transform", "translate(" + t.bar.margin.left + "," + t.bar.margin.top + ")");

	t.bar.valueline = d3.svg.line()
		.x(function(d) { return x(d.xAxisIndex); })
		.y(function(d) { return y(d.variable); });

	d3.json("json/products.json", function(error, result){
		t.json = result;
		t.getGraphData();

		t.axis.x.domain(t.data.map(function(d) { return d.xAxisIndex; }));
		t.axis.y.domain([0, d3.max(t.data, function(d) { return d.variable; })]);

		t.svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + t.height + ")")
			.style("fill", "#ccc")
			.call(t.axis.xAxis)
			.selectAll("text")	
				.style("text-anchor", "end")
				.attr("x",-10)
				.attr("dy", "-0.25em")
				.attr("transform", function(d) {
					return "rotate(-90)" 
				});
		t.svg.append("g")
			.attr("class", "y axis")
			.call(t.axis.yAxis);
		t.svg.selectAll(".bar")
			.data(t.data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) {return t.axis.x(d.xAxisIndex); })
			.attr("width", t.axis.x.rangeBand())
			.attr("y", function(d) { return t.axis.y(d.variable); })
			.attr("height", function(d) { return t.height - t.axis.y(d.variable); });
		t.svg.selectAll(".bar-values")
			.data(t.data)
			.enter().append("text")
			.attr("class", "bar-values")
			.text(function(d) {
				return d.variable;
			})
			.style("text-anchor", "end")
			.attr("transform", function(d) {
				return "rotate(-90)" 
			})
			.attr("x", function(d, i) {
				return - t.axis.y(d.variable) - 10;
			})
			.attr("y", function(d, i) {
				return i * (t.width / t.data.length) + t.axis.x.rangeBand() / 2 + 17 - i * 1;
			});
		t.addBarGraphSelect();
	});
}
ReportObj.prototype.updateBarGraph = function(value) {
	var t = this;
	t.axis.yAxisIndex = value
	t.getGraphData();

	t.axis.x.domain(t.data.map(function(d) { return d.xAxisIndex; }));
	t.axis.y.domain([0, d3.max(t.data, function(d) { return d.variable; })]);

	var trans = d3.select("#graph").transition(),
		transition = t.svg.transition().duration(750),
		delay = function(d, i) { return i * 50; };
	
	t.svg.selectAll(".bar")
		.data(t.data)
		.transition().duration(750)
		.attr("y", function(d) { return t.axis.y(d.variable); })
		.attr("height", function(d) { return t.height - t.axis.y(d.variable); });
	t.svg.selectAll(".bar-values")
		.data(t.data)
		.text(function(d) {
			return d.variable;
		})
		.transition().duration(750)
		.attr("x", function(d, i) {
			return - t.axis.y(d.variable) - 10;
		});
	
	transition.select(".y.axis").call(t.axis.yAxis);
}
ReportObj.prototype.addBarGraphSelect = function() {
	var t = this,
		output = "<select type='select' onchange='reportObj.updateBarGraph(value);'>",
		count = 0;
	for (var i in t.json[0]) {
		if (i != t.bar.xAxisIndex) {
			var selected = (count == 1 ? " selected='true'" : "");
			output += "<option value='" + i + "' name='" + i + "'" + selected + ">" + i.replace("_", " ") + "</option>"
		}
		count++;
	}
	output += "</select>";
	$("#graph-data-select").html(output);
}
ReportObj.prototype.renderGaugeGraph = function() {
	var t = this,
		config = {
			size: t.width,
			label: "",
			max: t.gauge.max || 100,
			minorTicks: t.axis.minorTicks
		}
		
	config.redZones = [];
	config.redZones.push({ from: 0, to: config.max / 3});

	config.yellowZones = [];
	config.yellowZones.push({ from: config.max / 3, to: config.max / 3 * 2 });

	config.greenZones = [];
	config.greenZones.push({ from: config.max / 3 * 2, to: config.max });
	
	t.svg = new Gauge("graph", config);
	t.svg.render();
	t.svg.redraw(t.gauge.value);
}
ReportObj.prototype.renderDonutGraph = function() {
	var t = this;

	t.width = t.width || $("#graph").width();
	t.height = t.height || 350;

	var radius = Math.min(t.width, t.height) / 2;
	var legendLeft = radius / 2 + 50;
	
	d3.json(t.jsonURL, function(error, result){
		t.json = result;
		var totals = new Array();
		var total = 0;
		for (i in t.json) {
			totals.push(t.json[i]["value"]);
			total += t.json[i]["value"];
		}

		t.svg = d3.select("#graph").append("svg")
		.attr("width", t.width)
		.attr("height", t.height + (t.json.length * (t.legendBoxSize + t.legendBoxSpacing)))
		.append("g")
		.attr("transform", "translate(" + t.width / 2 + "," + (t.height / 2 - 40) + ")");


		var color = d3.scale.category20();

		var pie = d3.layout.pie().sort(null);

		var arc = d3.svg.arc()
			.innerRadius(radius - 100)
			.outerRadius(radius - 50);

		var path = t.svg.selectAll("path")
			.data(pie(totals))
		  .enter().append("path")
			.attr("fill", function(d, i) { return color(i); })
			.attr("d", arc);

		t.svg.selectAll(".legend-box")
					.data(t.json)
					.enter().append("rect")
					.attr("class", "legend-box")
					.attr("fill", function(d, i) { return color(i); })
					.attr("x", function(d) {return - legendLeft; })
					.attr("y", function(d, i) { return t.height / 2 + (t.legendBoxSize + t.legendBoxSpacing) * i; })
					.attr("width", t.legendBoxSize)
					.attr("height", t.legendBoxSize);

		t.svg.selectAll(".legend-text")
					.data(t.json)
					.enter().append("text")
					.attr("class", "legend-text")
					.attr("x", function(d) {return -legendLeft + (t.legendBoxSize + t.legendBoxSpacing); })
					.attr("y", function(d, i) { return t.height / 2 + (t.legendBoxSize + t.legendBoxSpacing) * i; })
					.attr("dy", t.legendBoxSize / 2 + 5)
					.text(function(d, i) {
						return d.index + " (" + d.value + ")";
					});

		t.svg.selectAll(".donut-center-text")
					.data([total])
					.enter().append("text")
					.attr("class", "donut-center-text")
					.attr("x", 0)
					.attr("y", 10)
					.attr("text-anchor", "middle")
					.text(function(d) {return d})
	});
}
ReportObj.prototype.renderLineGraph = function() {
	var t = this;

	t.width = t.width || $("#graph").width();
	t.height = t.height || 350;

	t.height += 150; //for the HIGH/LOW text

	t.svg = d3.select("#graph")
				.append("svg")
					.attr("width", t.width + t.line.margin.left + t.line.margin.right)
					.attr("height", t.height + t.line.margin.top + t.line.margin.bottom)
					.append("g")
						.attr("transform", "translate(" + t.line.margin.left + "," + t.line.margin.top + ")");
	
	d3.json(t.jsonURL, function(error, result){
		t.json = result;
		t.getGraphData();

		t.axis.x = d3.time.scale()
			.domain([new Date(t.data[0].date), new Date(t.data[t.data.length - 1].date)])
			.rangeRound([0, t.width - t.line.margin.left - t.line.margin.right]);

		t.axis.y = d3.scale.linear()
			.domain([0, d3.max(t.data, function(d) { return d.total; })])
			.range([t.height - t.line.margin.top - t.line.margin.bottom, 0]);

		t.line.valueline = d3.svg.line()
    					.x(function(d) { return t.axis.x(new Date(d.date)); })
    					.y(function(d) { return t.axis.y(d.total); });

		t.axis.xAxis = d3.svg.axis()
			.scale(t.axis.x)
			.orient('bottom')
			.ticks(d3.time.days, Math.round(t.data.length / 4))
			.tickFormat(d3.time.format('%b %d'))
			.tickSize(0)
			.tickPadding(8);

		t.axis.yAxis = d3.svg.axis()
			.scale(t.axis.y)
			.orient('left')
			.tickPadding(8);

    	t.svg.append("path")
    		.attr("class", "graph-line")
        	.attr("d", t.line.valueline(t.data));

		t.svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0, ' + (t.height - t.line.margin.top - t.line.margin.bottom) + ')')
			.call(t.axis.xAxis)
			.selectAll("text")
				.style("text-anchor", "end")
				.attr("x",-10)
				.attr("dy", "1em")
				.attr("transform", function(d) {
						return "rotate(-90)" 
					});

		t.svg.append('g')
		  .attr('class', 'y axis')
		  .call(t.axis.yAxis);

		t.svg.append("text")
					.attr("class", "max-text-title")
					.attr("x", function(d) {return 0; })
					.attr("y", function(d, i) { return t.height - 40; })
					.text(function(d, i) {
						return "HIGH";
					});
		t.svg.selectAll(".max-text")
					.data([t.line.maxVal])
					.enter().append("text")
					.attr("class", "max-text")
					.attr("x", function(d) {return 70; })
					.attr("y", function(d, i) { return t.height - 40; })
					.text(function(d, i) {
						var format = d3.time.format("%b %d");
						return d.total + " on " + format(new Date(d.date));
					});

		t.svg.append("text")
					.attr("class", "min-text-title")
					.attr("x", function(d) {return 0; })
					.attr("y", function(d, i) { return t.height - 20; })
					.text(function(d, i) {
						return "LOW";
					});
		t.svg.selectAll(".min-text")
					.data([t.line.minVal])
					.enter().append("text")
					.attr("class", "min-text")
					.attr("x", function(d) {return 70; })
					.attr("y", function(d, i) { return t.height - 20; })
					.text(function(d, i) {
						var format = d3.time.format("%b %d");
						return d.total + " on " + format(new Date(d.date));
					});
	});
	t.addLineGraphSelect();
}
ReportObj.prototype.updateLineGraph = function(value) {
	var t = this;

	t.line.selectedPeriod = value;
	t.getGraphData();

	t.axis.x.domain([new Date(t.data[0].date), new Date(t.data[t.data.length - 1].date)])
	t.axis.y.domain([0, d3.max(t.data, function(d) { return d.total; })]);

	t.axis.xAxis
		.scale(t.axis.x)
		.ticks(d3.time.days, Math.ceil(t.data.length / 4));


	var trans = d3.select("#graph").transition(),
		transition = t.svg.transition().duration(750),
		delay = function(d, i) { return i * 50; };
	
	t.svg.selectAll(".x.axis").call(t.axis.xAxis)
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("x",-10)
			.attr("dy", "1em")
			.attr("transform", function(d) {
					return "rotate(-90)" 
				});
	transition.select(".y.axis").call(t.axis.yAxis);

	t.svg.selectAll(".graph-line")
		.data(t.data)
		.transition().duration(750)
        .attr("d", t.line.valueline(t.data));
    t.svg.selectAll(".max-text")
					.data([t.line.maxVal])
					.text(function(d, i) {
						var format = d3.time.format("%b %d");
						return d.total + " on " + format(new Date(d.date));
					});
	t.svg.selectAll(".min-text")
					.data([t.line.minVal])
					.text(function(d, i) {
						var format = d3.time.format("%b %d");
						return d.total + " on " + format(new Date(d.date));
					});
}
ReportObj.prototype.addLineGraphSelect = function() {
	var t = this,
		output = "<select type='select' onchange='reportObj.updateLineGraph(value);'>",
		count = 0;
	for (var i in t.line.periods) {
		var selected = (count == 0 ? " selected='true'" : "");
		output += "<option value='" + i + "' name='" + i + "'" + selected + ">Past " + t.line.periods[i] + " days</option>"
		count++;
	}
	output += "</select>";
	$("#graph-data-select").html(output);
}