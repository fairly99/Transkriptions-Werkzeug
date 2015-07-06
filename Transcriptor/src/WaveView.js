AudioTool.WaveView = (function() {
	var that = {};
	var peaksInstance=null;
	var allTracks=null;
	var counter = 0; 
	var segmentCounter=0;
	var realColor=null;
	var activeColor='rgba(232,232,232,1)'; 
	var segmentActive=false;
	var $waveData;


	var init = function() { 
	$("#segmentButton").on("click",makeSegment);
	$("#zoomInButton").on("click",toZoomIn);
	$("#zoomOutButton").on("click",toZoomOut);
	$("#pointButton").on("click",makePoint);
	$("#deleteSegment").on("click",chooseAndDeleteSegment);
	$("#first-waveform-visualiser-container").on("dblclick",onWaveFormClicked);
	$("#selectData").on("change",onDataSelected);
	//$("kineticjs-content").on("click",onWaveFormClicked);
	return that;
	};  

	var onDataSelected=function(event){
		$waveData=$("#selectData").val();
		var audio = document.getElementById('audioPanel');
		var source=document.getElementById('audioSource');
		if($waveData=="two"){
		source.src="test_data/sample.mp3";
		}
		else{
		source.src="test_data/tycho.mp3";	
		}
		audio.load();
		//audio.play();
		
		$(that).trigger("dataChanged",[$waveData]);
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
	if(allTracks[i].active==true){
	peaksInstance.segments.removeByTime(allTracks[i].startTime);
	}
	//console.log("toschenachlurn",)
	}
	}; 

	var toZoomIn=function(event){
		//peaksInstance.zoom.zoomIn.bind(peaksInstance);
		//peaksInstance.zoom.setZoom(2);
		console.log("neizoomen");
		console.log(peaksInstance.zoom.getZoom());
		$(that).trigger("restart",peaksInstance);
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

      allTracks=peaksInstance.segments.getSegments();
		for(var a=0;a<allTracks.length;a++){
			if(point.timestamp>=allTracks[a].startTime&&
				point.timestamp<=allTracks[a].endTime){
				return;
			}
		}
			 peaksInstance.points.add([point]);
			 $(that).trigger("pointMade",[point]);
	};

	var makeSegment=function(event){
			allTracks=peaksInstance.segments.getSegments();
			
			for(var i=0;i<allTracks.length;i++){
				if(peaksInstance.time.getCurrentTime()>=allTracks[i].startTime&&
					peaksInstance.time.getCurrentTime()<=allTracks[i].endTime){
					return;
				}
			}
			
            var segment = {	
              startTime: peaksInstance.time.getCurrentTime(),
              endTime: peaksInstance.time.getCurrentTime() + 5,
              editable: true,
              labelText: "Track "+ segmentCounter +"\n" +"Startzeit: " + peaksInstance.time.getCurrentTime()
            };	
          	
          	for(var i = 0;i<allTracks.length;i++){
				if(segment.endTime<allTracks[i].endTime&&
					segment.endTime<allTracks[i].endTime){
					return;
				}
			}
			  
            peaksInstance.segments.add([segment]);
            segmentCounter++; 
        	allTracks=peaksInstance.segments.getSegments();
			for(var i=0;i<allTracks.length;i++){
			allTracks[i].active=false;
			//allTracks[i].title="";
			allTracks[i].metaDate=[10,11,12,13,14];
			}
			$(that).trigger("segmentMadeNowPlay",[segment.startTime,segment.endTime]);
		           
	};

	 var show=function(peaks){
		peaksInstance=peaks;

	};

	var combinePoints=function(pointCounter,allPoints){
		counter=pointCounter;
		makeSegmentBySettingTwoPoints(allPoints);
	};  

	var makeSegmentBySettingTwoPoints=function(allPoints){
		if(allPoints[counter-1].timestamp>=allPoints[counter].timestamp){
			var segment = {
				active:false,
              startTime: allPoints[counter].timestamp,
              endTime: allPoints[counter-1].timestamp, 
              editable: true,
              labelText: "Track "+ segmentCounter
            };	
          peaksInstance.segments.add([segment]);
          $(that).trigger("segmentMadeNowPlay",[segment.startTime,segment.endTime]);
          segmentCounter++;
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
          $(that).trigger("segmentMadeNowPlay",[segment.startTime,segment.endTime]);
          segmentCounter++;
          peaksInstance.points.removeAll();
          $(that).trigger("removePoints",[counter]);
      }

	}; 
 
	var colorSelectedWave = function (track,tracks) {
		allTracks=tracks;
		if(track.active==true){
			track.zoom.waveformShape.attrs.fill=track.color;
			//track.zoom.label.attrs.text="jajajja";
			track.active=false;
		}else{
		for(var i = 0;i< allTracks.length;i++){
			allTracks[i].zoom.waveformShape.attrs.fill=allTracks[i].color;
			allTracks[i].active=false;
		}
		track.active=true;
		track.zoom.waveformShape.attrs.fill=activeColor;		
	}
	
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