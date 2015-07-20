AudioTool.MainController = (function() {
	var that = {};
	var waveView = null;
	var mainModel=null;
	var metaDateView=null;
	var dragView=null;
	 
	var init = function() {
 
	dragView=AudioTool.StartPeaks.init();
	waveView= AudioTool.WaveView.init();
	mainModel=AudioTool.MainModel;
	mainModel.init();
	metaDateView=AudioTool.MetaDateView.init();
	$(dragView).on("dragged",dragFinished);
	$(mainModel).on("waveInitialised",waveShown);
	$(waveView).on("pointMade",makeAPoint);
	$(mainModel).on("pointSaved",twoPointsCombine);
	$(waveView).on("removePoints",deletePoints);
	$(waveView).on("onWaveClicked",waveClicker);
	$(mainModel).on("trackClicked",onTrackClicked);
	//$(waveView).on("trackSelected",onTrackSelected);
	$(mainModel).on("trackNotClicked",onTrackNotClicked);
	$(waveView).on("dataChanged",onDataChanged);
	$(waveView).on("restart",restart);
	$(waveView).on("segmentMadeNowPlay",playSegmentInLoop);


/*
	    $('#circle').circleProgress({
        value: 1.0,
        size: 80,
        fill: {
            gradient: ["red", "orange"]
        }

    });
	$('#circle').circleProgress('redraw'); // use current configuration and redraw
*/
	//$(mainModel).on("segmentPlayed",onSegmentPlayed);
	};    
     
 	var dragFinished=function(event,data){
 		mainModel.startTool(data);
 	};
	var playSegmentInLoop=function(event,startTime,endTime){
		mainModel.playSegment(startTime,endTime);
	};
    var restart=function(event,instance){ 
    	mainModel.restart(instance);
    };
    var onDataChanged=function(event,dataValue){
    	mainModel.startTool(dataValue);
    };
	var onTrackNotClicked=function(event,tracks,track){
		waveView.setStandardColor(tracks,track);
	}; 

	var onTrackClicked=function(event,track,allTracks) {
		//console.log("aufNenTrackGeklickt");
		//console.log(track);
		waveView.colorSelectedWave(track,allTracks);
		metaDateView.showMetaForSelectedTrack(track);
	};
	
	var waveClicker=function (event,time) {
		mainModel.compareIfSegment(time);	
	};

	var deletePoints=function(event){
		mainModel.setCounterAndRemove();
	};

	var twoPointsCombine=function(event,pointCounter,allPoints){
			if(pointCounter%2!=0&&pointCounter>0){
				waveView.combinePoints(pointCounter,allPoints);	
			} 
			
	}; 

	var waveShown=function(event,peaks){
		waveView.show(peaks);
	};
	var makeAPoint=function(event,point){
		mainModel.setPoint(point);
	};

	
	
	that.init = init;
	

	return that;
}());