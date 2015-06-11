AudioTool.StartPeaks = (function() {
		var that = {};

		 init = function(){
			console.log("hihi");
			startTool();
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
              arraybuffer: 'test_data/tycho.dat'//,
              //json: 'test_data/sample.json'
            },
            keyboard: false
          };

          var peaksInstance = Peaks.init(options);

          window['peaksInstance'] = peaksInstance;

          document.querySelector('[data-action="zoom-in"]').addEventListener("click", peaksInstance.zoom.zoomIn.bind(peaksInstance));
          document.querySelector('[data-action="zoom-out"]').addEventListener("click", peaksInstance.zoom.zoomOut.bind(peaksInstance));

          document.querySelector('button[data-action="add-segment"]').addEventListener("click", function () {
            var segment = {
              startTime: peaksInstance.time.getCurrentTime(),
              endTime: peaksInstance.time.getCurrentTime() + 10,
              editable: true
            };

            peaksInstance.segments.add([segment]);
          });

          document.querySelector('button[data-action="add-point"]').addEventListener("click", function () {
            var point = {
              timestamp: peaksInstance.time.getCurrentTime(),
              editable: true
            };

            peaksInstance.points.add([point]);
          });

          document.querySelector('button[data-action="log-data"]').addEventListener("click", function (event) {
            console.log('Segments', peaksInstance.segments.getSegments());
            console.log('Points', peaksInstance.points.getPoints());
          });
        });
		};


		that.init=init;
	    return that;
})();