AudioTool.MainController = (function() {
	var that = {};
	var waveView = null;
	var mainModel=null;
	
	
	var init = function() {
	waveView= AudioTool.WaveView.init();
	mainModel=AudioTool.MainModel;
	mainModel.init(); 
	$(mainModel).on("waveInitialised",waveShown);
	$(waveView).on("pointMade",makeAPoint);
	$(mainModel).on("pointSaved",twoPointsCombine);
	$(waveView).on("removePoints",deletePoints);
	$(waveView).on("onWaveClicked",waveClicker);
	$(mainModel).on("trackClicked",onTrackClicked);
	//$(waveView).on("trackSelected",onTrackSelected);
	//$(mainModel).on("trackNotClicked",onTrackNotClicked);
	}; 
  
	var onTrackNotClicked=function(event,tracks){
		waveView.setStandardColor(tracks);
	}; 

	var onTrackClicked=function(event,track) {
		//console.log("aufNenTrackGeklickt");
		waveView.colorSelectedWave(track);
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