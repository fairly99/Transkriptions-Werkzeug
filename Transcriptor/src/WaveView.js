AudioTool.WaveView = (function() {
	var that = {};
	var peaksInstance=null;
	var allTracks=null;
	var counter = 0; 
	var segmentCounter=0;
	var realColor=null;
	var activeColor='rgba(0,0,0,1)';
	var segmentActive=false;


	var init = function() {
	$("#segmentButton").on("click",makeSegment);
	$("#zoomInButton").on("click",toZoomIn);
	$("#zoomOutButton").on("click",toZoomOut);
	$("#pointButton").on("click",makePoint);
	$("#deleteSegment").on("click",chooseAndDeleteSegment);
	$("#first-waveform-visualiser-container").on("dblclick",onWaveFormClicked);
	//$("kineticjs-content").on("click",onWaveFormClicked);
	return that;
	}; 

	var onWaveFormClicked=function (event){
		/*if(peaksInstance.time.getCurrentTime()){
		
		}*/
		//console.log(event.target); 
		$(that).trigger("onWaveClicked",[peaksInstance.time.getCurrentTime()]);

	};

	var chooseAndDeleteSegment=function(event) {
	allTracks=peaksInstance.segments.getSegments();
	for(var i=0;i<allTracks.length;i++){
	if(allTracks[i].overview.waveformShape.attrs.fill==activeColor){
	peaksInstance.segments.removeByTime(allTracks[i].startTime);
	console.log(allTracks[i]);
	}
	//console.log("toschenachlurn",)
	}
	};

	var toZoomIn=function(event){
		//peaksInstance.zoom.zoomIn.bind(peaksInstance);
		//peaksInstance.zoom.setZoom(2);
		console.log("neizoomen");
		console.log(peaksInstance.zoom.getZoom());
	};
	var toZoomOut=function(event){
		//peaksInstance.zoom.zoomOut.bind(peaksInstance);
		console.log("nausZoomen");
		console.log(peaksInstance.zoom.getZoom());
	}; 

	var makePoint=function(event){
		  var point = {
              timestamp: peaksInstance.time.getCurrentTime(),
              editable: true
            };
			 peaksInstance.points.add([point]);
			 $(that).trigger("pointMade",[point]);
	};

	var makeSegment=function(event,color,start,end){
			segmentCounter++;
            var segment = {	
              startTime: peaksInstance.time.getCurrentTime(),
              endTime: peaksInstance.time.getCurrentTime() + 5,
              editable: true,
              labelText: "Track "+ segmentCounter +"\n" +"Startzeit: " + peaksInstance.time.getCurrentTime()
            };	
          

            peaksInstance.segments.add([segment]); 
        	allTracks=peaksInstance.segments.getSegments();
			for(var i=0;i<allTracks.length;i++){
			allTracks[i].active=false;
			}       
           
	};

	 var show=function(peaks){
		peaksInstance=peaks;

	};

	var combinePoints=function(pointCounter,allPoints){
		counter=pointCounter;
		makeSegmentBySettingTwoPoints(allPoints);
		
	};  

	var makeSegmentBySettingTwoPoints=function(allPoints){
		segmentCounter++;
		if(allPoints[counter-1].timestamp>=allPoints[counter].timestamp){
			var segment = {
				active:false,
              startTime: allPoints[counter].timestamp,
              endTime: allPoints[counter-1].timestamp, 
              editable: true,
              labelText: "Track "+ segmentCounter
            };	
          peaksInstance.segments.add([segment]);
			peaksInstance.points.removeAll();
			$(that).trigger("removePoints",[counter]);	
		}
		else{
		   var segment = {
		   	active: false,
              startTime: allPoints[counter-1].timestamp,
              endTime: allPoints[counter].timestamp,
              editable: true,
              labelText: "Track "+ segmentCounter
            };	
          peaksInstance.segments.add([segment]);
          peaksInstance.points.removeAll();
          $(that).trigger("removePoints",[counter]);
      }

	}; 
 
	var colorSelectedWave = function (track,tracks) {
		allTracks=tracks;
		if(track.active==true){
			track.zoom.waveformShape.attrs.fill=track.color;
			track.active=false;
		}else{
		for(var i = 0;i< allTracks.length;i++){
			allTracks[i].zoom.waveformShape.attrs.fill=allTracks[i].color;
			allTracks[i].active=false;
		}
		track.active=true;
		track.zoom.waveformShape.attrs.fill=activeColor;		
	}
	console.log(track);
	};

	var setStandardColor=function(tracks,track){
	 
		
	};

	that.init = init;
	that.setStandardColor=setStandardColor;
	that.colorSelectedWave=colorSelectedWave;
	that.show=show;
	that.combinePoints=combinePoints;

	return that;
}());