AudioTool.MainModel = (function() {
	var that = {};
	var setPoints;
  var actualPoint;
  var pointCounter=-1;
  var tracks; 
  var myAudio;
  var files;
  var audio;
  var source;
  var init = function() {
  //getValue();  
  audio = document.getElementById('audioPanel');
  source=document.getElementById('audioSource');
	//startTool("");
  myAudio=document.getElementById('audioPanel');
  return that;
	}; 

  var getValue=function(){
      var parameters = location.search.substring(1).split("&");
      console.log(parameters);
      var temp = parameters[0].split("=");
      files= unescape(temp[1]);
      console.log(files);
  };
  var restart=function(instance){
    /*requirejs.config({
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
            segments:instance.segments.getSegments()
          };
        //source
           instance = Peaks.init(options);
          window['peaksInstance'] = instance;
          $(that).trigger("waveInitialised",[instance]);
        });*/
  }; 
	var startTool=function(dataValue){
            $("#loadingProgress").css("visibility","visible");
        var jqxhr = $.get( "sendToDataBase.php", function(data) {
			  alert(data);
			   })
			  .done(function() {          
          $("#loadingProgress").css("visibility","hidden");
          generateWaveform(dataValue);
          $("#audioTool").css("visibility","visible");
			  }) 
			  .fail(function() {
			    alert( "error" );
			  })
		/*	  .always(function() {
			    alert( "finished" );
			  });*/
			 
			// Perform other work here ...
			 
			// Set another completion function for the request above
			/*jqxhr.always(function() {
			  alert( "second finished" );
			});*/
        

   

		};  

	var generateWaveform=function(dataValue){
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
          
          var audioFile=dataValue[0];
          var obj_url=window.URL.createObjectURL(audioFile);
          source.src=obj_url;
          audio.load();
          //audio.play();

     /*$.ajax({
        url : 'sendToDataBase.php', // give complete url here
        type : 'post',
        success : function(data){
            alert(data);
        }
    });*/
          var peaksInstance = Peaks.init(options);
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
     // myAudio.removeEventListener("timeupdate",myFunction());
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

  var playSegment=function(start,end){
    var segmentEnd=end;
    myAudio.currentTime=start;
    //myAudio.play();
   /* myAudio.addEventListener('timeupdate', function (){
    if (segmentEnd && myAudio.currentTime >= segmentEnd) {
        myAudio.pause();
        //myAudio.currentTime=start;
        //myAudio.play();
    }   
      }, false);
    //$(that).trigger("segmentPlayed",[start,end]);
    // myAudio.oncanplaythrough=setTimeout(setTime(start,end),500);
    //function setTime(){myAudio.currentTime = 10;myAudio.play(); }*/
  };
  
	
	that.init = init;
  that.playSegment=playSegment;
  that.setPoint=setPoint;	
  that.setCounterAndRemove=setCounterAndRemove;
  that.compareIfSegment=compareIfSegment;
  that.startTool=startTool;
  that.restart=restart;
	return that;
}());