<?php



$host="localhost"; // Host name 
$username="transkriptor"; // Mysql username 
$password="hoerburger"; // Mysql password 
$db_name="transkript"; // Database name 

 /*
$vermittler = $_POST['vermittler'];
$vorname = $_POST['vornameBig'];
$nachname = $_POST['nachnameBig'];
$anrede = $_POST['anredeBig'];
$bday = $_POST['bday'];
$bdayOrt = $_POST['bdayOrt'];
$svNummer = $_POST['svNummer'];
$plz = $_POST['plzBig'];
$ort = $_POST['ortBig'];
$street = $_POST['street'];
$wohnhaftSeit = $_POST['wohnhaftSeit'];
$tel = $_POST['telNummerBig'];
$email = $_POST['emailBig'];
$devisen = $_POST['devisen'];
$staatsBürg = $_POST['staatsBürg'];
$family = $_POST['family'];
$children = $_POST['children'];
$wohnArt = $_POST['wohnArt'];
$präsenzVon = $_POST['präsenzVon'];
$präsenzBis = $_POST['präsenzBis'];
$since = $_POST['since'];
$arbeitGeber = $_POST['arbeitGeber'];
$jobBig = $_POST['jobBig'];
$vorDauer = $_POST['vorDauer'];
$vorArbeit = $_POST['vorArbeit'];
$highSchool = $_POST['highSchool'];
$pkw = $_POST['pkw'];
$konto = $_POST['konto'];
$unTä=$_POST['unTä'];
$zusGeld=$_POST['zusGeld'];
$vorname2=$_POST['vor2'];
$nachname2=$_POST['nach2'];
$unTä2=$_POST['unTä2'];
$zusGeld2=$_POST['zusGeld2'];
$gesGeld = $_POST['gesGeld'];
$restGeld1 = $_POST['restGeld1'];
$restGeld2 = $_POST['restGeld2'];
$restGeld3 = $_POST['restGeld3'];
$sumVerb = $_POST['sumVerb'];
$imSec = $_POST['imSec'];
$car = $_POST['car'];
$fonds = $_POST['fonds'];
$lifeSec = $_POST['lifeSec'];
$sonstiges = $_POST['sonstiges'];
$sumVerm = $_POST['sumVerm'];
$finGeg = $_POST['finGeg'];
$finZweck = $_POST['finZweck'];
$use = $_POST['use'];
$bauArt = $_POST['bauArt'];
$zustand = $_POST['zustand'];
$law = $_POST['law'];
$grundBuch = $_POST['grundBuch'];
$einlage = $_POST['einlage'];
$grundNr = $_POST['grundNr'];
$grFläche = $_POST['grFläche'];
$wFläche = $_POST['wFläche'];
$land = $_POST['land'];
$plzGr = $_POST['plzGr'];
$ortGr = $_POST['ortGr'];
$kg = $_POST['kg'];
$buyPrice = $_POST['buyPrice'];
$grTax = $_POST['grTax'];
$einGeb = $_POST['einGeb'];
$verGeb = $_POST['verGeb'];
$kvg = $_POST['kvg'];
$sumNebCost = $_POST['sumNebCost'];
$bauCostSan = $_POST['bauCostSan'];
$bauÜ = $_POST['bauÜ'];
$gesSum = $_POST['gesSum'];
$umschV = $_POST['umschV'];
$finBed = $_POST['finBed'];
$credBet = $_POST['credBet'];
$lauf = $_POST['lauf'];
$rückZ = $_POST['rückZ'];
$refZ = $_POST['refZ'];
$refZi = $_POST['refZi'];
$marge = $_POST['marge'];
$fikZins = $_POST['fikZins'];
$bearb = $_POST['bearb'];
$eGeb = $_POST['eGeb'];
$schätz = $_POST['schätz'];
$sonstCost = $_POST['sonstCost'];
$sumNeben = $_POST['sumNeben'];
$credGesBet = $_POST['credGesBet'];
$auszahlung = $_POST['auszahlung'];
$til = $_POST['til'];
$sumGeh = $_POST['sumGeh'];
$first = $_POST['1st'];
$second = $_POST['2nd'];
$costBetr = $_POST['costBetr'];
$energy = $_POST['energy'];
$telInt = $_POST['telInt'];
$orf = $_POST['orf'];
$kfz = $_POST['kfz'];
$safe = $_POST['safe'];
$sparen = $_POST['sparen'];
$sumRechner = $_POST['sumRechner'];
$zwischSum = $_POST['zwischSum'];
$sicherRes = $_POST['sicherRes'];
$zuRate = $_POST['zuRate'];
$fiktiv = $_POST['fiktiv'];
$überdeck = $_POST['überdeck'];
$buyObject=$_POST['buyObject'];
$immobilien=$_POST['immobilien'];
$SecSum=$_POST['SecSum'];
$dienSec=$_POST['dienSec'];
$beanFinan=$_POST['beanFinan'];
$überdeck2=$_POST['überdeck2'];

*/
// Connect to server and select databse.
$con = mysql_connect($host, $username, $password) or die ("cannot connect");
$selected = mysql_select_db($db_name,$con) 
  or die("Could not select examples");
  mysql_query("SET NAMES 'utf8'");


myqsl_query("CREATE TABLE Metadaten (id varchar(255))")or die("FAIL");



/* mysql_query ("INSERT INTO Kredittool (Vermittler,Anrede,Vorname,Nachname,Geburtsdatum,Geburtsort,SVNummer,PLZ,Ort,Strasse,
 	Wohnhaftseit,Telefonnummer,Email,Devisenlaender,Staatsbuergerschaft,Familienstand,
 	UnterhaltspflichtigeKinder,Wohnart,Praesenzdienstvon,Praesenzdienstbis,Beschaeftigtseit,
 	Arbeitgeber,Beruf,Vorbeschaeftigungsdauer,VorherigerArbeitgeber,Schulbildung,AnzahlPKW,Gehaltskonto,
 	UnselbststaendigeTaetigkeit,sonstigeEinkuenfte,Vorname2,Nachname2,UnselbststaendigeTaetigkeit2,sonstigeEinkuenfte2,Gesamteinkommen,Restschuld,Restlaufzeit,Monatsrate,SumVerbindlichkeiten,
 	Immobiliensicherstellung,Fonds,Lebensversicherung,Auto2E,sonstigesVerm,Vermoegenswerte,Finanzierungsgegenstand,
 	Finanzierungszweck,NutzungImmobilie,BauartImmobilie,ZustandImmobilie,Berzirksgericht,Grundbuch,
 	Einlagezahl,Grundstuecksnummer,Grundstuecksflaeche,Wohnnutzflaeche,LandFV,PLZFV,OrtFV,AnmerkungenFV,Kaufpreis,
 	Grunderwerbssteuer,Eintragungsgebuehr,Vermittlungsgebuehr,KVErrichtungsgebuehr,NebenKostenSumme,
 	KaufpreisInklNebenkosten,BauSanierungKosten,BauUeberschreitungKosten,SummeKosten,UmschuldungVerb,
 	Finanzierungsbedarf,Kreditbetrag,Laufzeit,Rueckzahlungsmodell,RefZinssatz,RefZinssatzRundung,
 	Marge,FiktiverZins,Bearbeitungsgebuehr,EintragungsgebuehrPfandMinus,Schaetzgebuehr,sonstigeKostenPlus,
 	SummeFinanzierungNebenKosten,Gesamtkreditbetrag,Auszahlungsbetrag,KredittypTilgend,
 	SummeEinkommenMonat,Lebenshaltungskosten1,Lebenshaltungskosten2,Betriebskosten,Energiekosten,
 	TelefonInternet,ORF,KFZ,Versicherungen,Sparen,SummeAusgaben,Zwischensumme,Sicherheitsreserven,
 	ZumutbareRate,FiktiveRate,Ueberdeckung,KaufPfandObjekt,Immobilien,SummeSicherheiten,DienendeSicherheiten,
 	BeantragteFinanzierung,Ueberdeckung2) VALUES ('$vermittler','$anrede','$vorname','$nachname',
 	'$bday','$bdayOrt','$svNummer','$plz','$ort','$street','$wohnhaftSeit','$tel',
 	'$email','$devisen','$staatsBürg','$family','$children','$wohnArt','$präsenzVon',
 	'$präsenzBis','$since','$arbeitGeber','$jobBig','$vorDauer','$vorArbeit','$highSchool',
 	'$pkw','$konto','$unTä','$zusGeld','$vorname2','$nachname2','$unTä2','$zusGeld2','$gesGeld','$restGeld1','$restGeld2','$restGeld3',
 	'$sumVerb','$imSec','$fonds','$lifeSec','$car','$sonstiges','$sumVerm','$finGeg','$finZweck','$use','$bauArt',
 	'$zustand','$law','$grundBuch','$einlage','$grundNr','$grFläche','$wFläche','$land',
 	'$plzGr','$ortGr','$kg','$buyPrice','$grTax','$einGeb','$verGeb','$kvg','$sumNebCost','$priceIncl',
 	'$bauCostSan','$bauÜ','$gesSum','$umschV','$finBed','$credBet','$lauf','$rückZ',
 	'$refZ','$refZi','$marge','$fikZins','$bearb','$eGeb','$schätz','$sonstCost',
 	'$sumNeben','$credGesBet','$auszahlung','$til','$sumGeh','$first','$second','$costBetr',
 	'$energy','$telInt','$orf','$kfz','$safe','$sparen','$sumRechner','$zwischSum','$sicherRes',
 	'$zuRate','$fiktiv','$überdeck','$buyObject','$immobilien','$SecSum','$dienSec',
 	'$beanFinan','$überdeck2')")or die("FailAMan!");

//,'$buyPrice','$grTax','$einGeb','$verGeb','$kvg','$sumNebCost','$priceIncl'
	/*Kaufpreis,Grunderwerbssteuer,Eintragungsgebuehr,Vermittlungsgebuehr,KVErrichtungsgebuehr,
 	NebenKostenSumme,KaufpreisInklNebenkosten*/
 mysql_close($con);

 //header('location: Bedankung.html');
 ?>