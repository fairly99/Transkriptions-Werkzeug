AudioTool.MainModel = (function() {
	var that = {};
	var setPoints;
  var actualPoint;
  var pointCounter=-1;
  var tracks;
	var init = function() {
	startTool();
	 
  return that;
	}; 

	var startTool=function(){
		requirejs.config({
          paths: {
            peaks: 'src/main',
            EventEmitter: 'libs/eventemitter2',
            Kinetic: 'libs/kinetic-v5.1.0',
            'waveform-data': 'libs/waveform-data.min'
          }
        });

        require(['peaks'], function(Peaks){
          var options = { 
            container: document.getElementById('first-waveform-visualiser-container'),
            mediaElement: document.querySelector('audio'),
            dataUri: {
              arraybuffer: 'test_data/tycho.dat'
              //json: 'test_data/sample.json'
            },
            zoomLevels: [512, 1024, 2048, 4096],
            keyboard: false,
            randomizeSegmentColor: true,
             
            
          };

          var peaksInstance = Peaks.init(options);
          console.log(peaksInstance);
          window['peaksInstance'] = peaksInstance;
          $(that).trigger("waveInitialised",[peaksInstance]);
          
          //console.log(peaksInstance.options.zoomLevels[1]); 
        //  document.querySelector('[data-action="zoom-in"]').addEventListener("click", peaksInstance.zoom.zoomIn());//.bind(peaksInstance));
        //  document.querySelector('[data-action="zoom-out"]').addEventListener("click", peaksInstance.zoom.zoomOut());

        

          document.querySelector('button[data-action="log-data"]').addEventListener("click", function (event) {
            console.log('Segments', peaksInstance.segments.getSegments());
            console.log('Points', setPoints);
            //var myArray=peaksInstance.points.getPoints();
          });
        });
		}; 
	
  var setPoint=function(point){
    pointCounter++;
    setPoints= peaksInstance.points.getPoints();
    actualPoint=point;
    $(that).trigger("pointSaved",[pointCounter,setPoints])
    };
   
  var setCounterAndRemove=function(){
    setPoints.length=0;
    pointCounter=-1; 
  };  
  var compareIfSegment=function(time){
      tracks=peaksInstance.segments.getSegments();
      timeToCheck=peaksInstance.time.getCurrentTime();
      for(var i=0;i<tracks.length;i++){
        if(timeToCheck>=tracks[i].startTime&&timeToCheck<=tracks[i].endTime){
          //console.log("dazwischen");
          $(that).trigger("trackClicked",[tracks[i],tracks]);
        }
        else{
          $(that).trigger("trackNotClicked",[tracks,tracks[i]]);
          //console.log("frei");
        }
      }
  };
	
	that.init = init;
  that.setPoint=setPoint;	
  that.setCounterAndRemove=setCounterAndRemove;
  that.compareIfSegment=compareIfSegment;
	return that;
}());