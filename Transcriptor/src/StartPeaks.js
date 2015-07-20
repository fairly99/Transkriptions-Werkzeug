AudioTool.StartPeaks = (function() {
		var that = {};
		var myDropArea;
		var files=null; 
		var $audio=null;
		var $source=null; 
		 var init = function(){
		 	$myDrop=$(".dragDrop");
			myDropArea=document.querySelector(".dragDrop");
			myDropArea.addEventListener('dragstart',handleDragStart,false);
			myDropArea.addEventListener('dragenter',handleDragEnter,false);
			myDropArea.addEventListener('dragover',handleDragOver,false);
			myDropArea.addEventListener('dragleave',handleDragLeave,false);
			myDropArea.addEventListener('drop',handleDrop,false);
			myDropArea.addEventListener('dragend',handleDragEnd,false);
			return that;
		};
		function handleDragStart(e) {
  			//this.style.opacity = '0.4';  // this / e.target is the source node.
  			 
		}
		function handleDragOver(e) {
				 e.stopPropagation();
			    e.preventDefault();
			    e.dataTransfer.dropEffect = 'copy'; 
			    this.classList.add('over');// Explicitly show this is a copy.
		}

		function handleDragEnter(e) {
		  // this / e.target is the current hover target.
		  this.classList.add('over');
		}
 
		function handleDragLeave(e) {
		  this.classList.remove('over');  // this / e.target is previous target element.
		}

		function handleDrop(e) {
		    e.stopPropagation();
    		e.preventDefault();

     files = e.dataTransfer.files; // FileList object.


    // files is a FileList of File objects. List some properties.
   // for (var i = 0, f; f = files[i]; i++) {
  			//console.log(files[i]);
		//}
		 myDropArea.classList.remove('over');
		 //URL='index.html?'+files;
		 $myDrop.css("display","none");
		 
		 //AudioTool.MainController.init();
		 $(that).trigger("dragged",[files]);
		 //window.open (URL,'_self',false);
	}


		function handleDragEnd(e) {
		  // this/e.target is the source node.
	/*	      var files = evt.dataTransfer.files; 
    var videoFile = files[0];
    var obj_url = window.URL.createObjectURL(videoFile);
    video.src = obj_url;
    video.play();*/

		
		}


		


		that.init=init;
	    return that;
})();