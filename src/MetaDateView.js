AudioTool.MetaDateView = (function() {
	var that = {};
	var metaDateTitles = ["a","b","c","d","e"];
	var metaDateValues = [1,2,3,4,5];


   	var init = function() {
		$("#createButton").on("click",changeValues);
		$("#deleteButton").on("click",deleteRow);
		$("#plusButton").on("click",createCells);
		$("#stopChangingButton").on("click",enableButton);

		//zu beginn werden die buttons unsichtbar gemacht, createButton darf nicht disabled sein
		document.getElementById("plusButton").style.display="none";
		document.getElementById("stopChangingButton").style.display="none";
		document.getElementById("createButton").disabled = false;

		//zu beginn wird eine tabelle mit den vorhandenen daten erstellt
		createMetaDateTable(metaDateTitles, metaDateValues);
		return that;
	};

	//wenn man mit dem bearbeiten fertig ist und "ändern beenden" klickt wird die funktion ausgeführt
	//--> Buttons verschwinden wieder und felder sind nicht mehr editierbar
	var enableButton = function(){
		document.getElementById("plusButton").style.display="none";
		document.getElementById("stopChangingButton").style.display="none";
		document.getElementById("createButton").disabled = false;

		var table = document.getElementById("table");
 		var x = table.rows[0].cells.length;
 		for(var i = 0; i < x*2; i++){
 			var cells = table.getElementsByTagName('td');
 			cells[i].setAttribute("contentEditable","false");
 		}

	};
	
	var addRow = function(event){
	   
	    console.log("EVENT: "+event);
	    var myName = document.getElementById("name");
	    var age = document.getElementById("age");
	    var table = document.getElementById("myTableData");
	 
	    var rowCount = table.rows.length;
	    var row = table.insertRow(rowCount);
	 
	    row.insertCell(0).innerHTML= '<input type="Button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
	    row.insertCell(1).innerHTML= myName.value;
	    row.insertCell(2).innerHTML= age.value;

	    //$(that).trigger("rowAdded");
	};


	var deleteRow = function(obj){  
	    var index = obj.parentNode.parentNode.rowIndex;
	    var table = document.getElementById("myTableData");
	    table.deleteRow(index);	    
	};
 
 	//Tabelle wird erzeugt, je nachdem wie groß die übergebenen Arrays sind
	var createMetaDateTable = function(metaDateTitles, metaDateValues){
      
	    var myTableDiv = document.getElementById("myDynamicTable");
	      
	    var table = document.createElement('TABLE');
	    table.setAttribute("id","table");
	    table.border='1';
	    
	    var tableBody = document.createElement('TBODY');
	    table.appendChild(tableBody);
	      
	 	//Erstellung der ersten Zeile für die Metadatentitel
	    var tr = document.createElement('TR');
	    tr.setAttribute("id","firstRow");
	    tableBody.appendChild(tr);
	       
	    //Erstellung und Befüllung der einzelnen Spalten
	     for (var j=0; j<metaDateTitles.length; j++){
	           var td = document.createElement('TD');
	           td.width='75';
	           td.appendChild(document.createTextNode(metaDateTitles[j]));	           
	           tr.appendChild(td);
	           
	     }
	     
	    //Erstellung der ersten Zeile für die Metadatenwerte
	    var tr = document.createElement('TR');
	    tableBody.appendChild(tr);
	    tr.setAttribute("id","secondRow");
	       
	    //Erstellung und Befüllung der einzelnen Spalten
	     for (var j=0; j<metaDateTitles.length; j++){
	           var td = document.createElement('TD');
	           td.width='75';
	           td.appendChild(document.createTextNode(metaDateValues[j]));
	           tr.appendChild(td);
	     } 
	       
	    myTableDiv.appendChild(table);
	    //$(that).trigger("tableCreated");	    
	};

	//Button wird erstellt und sichtbar gemacht, außerdme der andere disabled
	//geht dann in die funktion changeInputTypeInTable
	var changeValues = function(){
		/*var table = document.createElement('TABLE');
		var td = document.createElement('TD');
	    td.width='75';*/

	    var btn = document.createElement("Button");
	    var text = document.createTextNode("+");
	    btn.appendChild(text);

	    document.getElementById("plusButton").style.display="block";
	    document.getElementById("stopChangingButton").style.display="block";
	    document.getElementById("createButton").disabled = true;

	    //wird der button geklickt so kommt man in die untere funktion
	    changeInputTypeInTable();

	};
 
 

 	var load = function(event){
    
   		console.log("Page load finished");
 
	};

	//zellen werden editierbar gemacht
	var changeInputTypeInTable = function(){
 		var table = document.getElementById("table");
 		var x = table.rows[0].cells.length;
 		for(var i = 0; i < x*2; i++){
 			var cells = table.getElementsByTagName('td');
 			cells[i].setAttribute("contentEditable","true");
 		}
 		
 	};

 	//wenn man auf den plus buttpn klickt werden neue zellen erzeugt
	var createCells = function(){
		//var table = document.createElement('TABLE');
		var td = document.createElement('TD');
		td.setAttribute("contentEditable","true");
		var td2 = document.createElement('TD');
		td2.setAttribute("contentEditable","true");
	    td.width='75';
	    var tr = document.getElementById("firstRow");
	    var tr2 = document.getElementById("secondRow");

	    tr.appendChild(td);
	   	tr2.appendChild(td2); 

	};
	var showMetaForSelectedTrack=function(selectedTrack){
		console.log(selectedTrack);
	};

	that.showMetaForSelectedTrack=showMetaForSelectedTrack;
	that.createMetaDateTable = createMetaDateTable;
	that.createCells = createCells;
	that.init = init;
	return that;
}()); 