AudioTool.WaveView = (function() {
	var that = {};
	var peaksInstance=null;
	var counter = 0;
	
	var init = function() {
	$("#segmentButton").on("click",makeSegment);
	$("#zoomInButton").on("click",toZoomIn);
	$("#zoomOutButton").on("click",toZoomOut);
	$("#pointButton").on("click",makePoint);
	return that;
	};

	var toZoomIn=function(event){
		peaksInstance.zoom.zoomIn.bind(peaksInstance);
		console.log("neiZommen");
	};
	var toZoomOut=function(event){
		peaksInstance.zoom.zoomOut.bind(peaksInstance);
		console.log("nausZoomen");
	};

	var makePoint=function(event){
		  var point = {
              timestamp: peaksInstance.time.getCurrentTime(),
              editable: true
            };
			 peaksInstance.points.add([point]);
			 $(that).trigger("pointMade",[point]);
	};

	var makeSegment=function(event,start,end){

            var segment = {
              startTime: peaksInstance.time.getCurrentTime(),
              endTime: peaksInstance.time.getCurrentTime() + 5,
              editable: true
            };	
          
            peaksInstance.segments.add([segment]);
            console.log("automatic");
          
            
          
	};

	 var show=function(peaks){
		peaksInstance=peaks;

	};

	var combinePoints=function(pointCounter,allPoints){
		counter=pointCounter;
		console.log(allPoints[counter-1].timestamp);
		console.log(allPoints[counter].timestamp);
		makeSegmentBySettingTwoPoints(allPoints);
		
	}; 

	var makeSegmentBySettingTwoPoints=function(allPoints){
		if(allPoints[counter-1].timestamp>=allPoints[counter].timestamp){
			var segment = {
              startTime: allPoints[counter].timestamp,
              endTime: allPoints[counter-1].timestamp, 
              editable: true
            };	
          peaksInstance.segments.add([segment]);
			peaksInstance.points.removeAll();
			$(that).trigger("removePoints",[counter]);	
		}
		else{
		   var segment = {
              startTime: allPoints[counter-1].timestamp,
              endTime: allPoints[counter].timestamp,
              editable: true
            };	
          peaksInstance.segments.add([segment]);
          peaksInstance.points.removeAll();
          $(that).trigger("removePoints",[counter]);
      }

	};

	that.init = init;
	that.show=show;
	that.combinePoints=combinePoints;

	return that;
}());