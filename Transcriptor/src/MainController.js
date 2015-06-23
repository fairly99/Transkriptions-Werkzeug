AudioTool.MainController = (function() {
	var that = {};
	var waveView = null;
	var mainModel=null;
	
	
	var init = function() {
	waveView= AudioTool.WaveView.init();
	mainModel=AudioTool.MainModel;
	mainModel.init(); 
	console.log(mainModel);
	$(mainModel).on("waveInitialised",waveShown);
	$(waveView).on("pointMade",makeAPoint);
	$(mainModel).on("pointSaved",actual);
	$(waveView).on("removePoints",deletePoints);
	};

	var deletePoints=function(event){
		mainModel.setCounterAndRemove();
	};

	var actual=function(event,pointCounter,allPoints){
			console.log("pointCounter",pointCounter);
			console.log("allPointsArray",allPoints);
			if(pointCounter%2!=0&&pointCounter>0){
				waveView.combinePoints(pointCounter,allPoints);	
			}
			else{
				console.log("düdü");
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