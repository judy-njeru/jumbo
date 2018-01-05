var basket = [];
var prodTemp;
var roastAlertDiv = document.getElementById("roastAlert");
var basketTotal = 0;
var buttonText = document.getElementById("buttonProdPage");
var basketStr = "";
basketStr = localStorage.getItem('basket');
var basketNav = document.getElementById("basketNav");
var basketQty = 0;

// TAKKI + -
var qty = 1;

var plusOne = function() {
	if (qty < 9) {
		qty += 1;
		var qtyDiv = document.getElementById("magnNumber");
		qtyDiv.innerHTML = qty;
	}//end if
}//end function

var minusOne = function() {
	if (qty > 1){
		qty -= 1;
	}
	var qtyDiv = document.getElementById("magnNumber");
	qtyDiv.innerHTML = qty;
}

// ROAST TEXTI HOVER
var displayRoast = function(id) {
	document.getElementById(id).style.display="inline-block";
	document.getElementById("roast0").style.display="none";
}
// svo roast hverfi þegar er ekki klikkað og ekki hover, sýnir þá "please select"
var displayRoastHide = function(id) {
	document.getElementById(id).style.display="none";
	document.getElementById("roast0").style.display="inline-block";
}

// ROAST HRINGIR OG TEXTI CLICKED
var selectProd = function(id, buttonS) { //ÞEGAR ROAST ER VALIÐ
	
	var prodSelected = document.getElementById(id);

	// sýnir eingöngu roastið sem var valið
	document.getElementById("roast0").style.display="none";
	document.getElementById("roast1").style.display="none";
	document.getElementById("roast2").style.display="none";
	document.getElementById("roast3").style.display="none";
	prodSelected.style.display="inline-block";
	roastAlertDiv.innerHTML = "";

	//sýnir eingöngu hring utan um það sem var valið
	document.getElementById("circleSelected1").style.border="1px solid white";
	document.getElementById("circleSelected2").style.border="1px solid white";
	document.getElementById("circleSelected3").style.border="1px solid white";
	buttonS.style.border="1px solid rgb(155,155,155)";

	//sýnir hover á því sem er ekki valið en sýnir svo aðeins það sem er valið þegar ekkert hover
	displayRoast = function(id, button) { 
		document.getElementById("roast1").style.display="none";
		document.getElementById("roast2").style.display="none";
		document.getElementById("roast3").style.display="none";
		document.getElementById(id).style.display="inline-block";
		button.style.border="1px solid rgb(155,155,155)";
	}

	displayRoastHide = function(id, button) {
		document.getElementById(id).style.display="none";
		prodSelected.style.display="inline-block";
		button.style.border="1px solid white";
		buttonS.style.border="1px solid rgb(155,155,155)";
	}
	
	// SVO JS VITI Á HVAÐA VARA ER Á HVAÐA SÍÐU
	prodNum = pageNum * 3;

	if (id=="roast1") {
		prodTemp = products[prodNum - 3];
	}
	else if (id=="roast2") {
		prodTemp = products[prodNum - 2];
	}
	else if (id=="roast3") {
		prodTemp = products[prodNum - 1];
	}
	
}

//KLÓNAR OBJECT SVO MAGNIÐ SÉ RÉTT Í KÖRFU
var clone = function(obj) { 
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}


// ADD NOW TAKKINN
//FALL FYRIR KAFFI... HÆGT AÐ VELJA ROAST
var addNowRoast = function() { 

	// SVO ÞAÐ SÉ EKKI HÆGT AÐ SETJA Í KÖRFU EF EKKERT ROAST ER VALIÐ
	if (typeof prodTemp == 'undefined') {
		console.log("no roast");
		
		roastAlertDiv.innerHTML = "<p>You must select a Roast!</p>";
	}//end if
	else { //EF ROAST ER VALIÐ

		var selectedProduct = clone(prodTemp); //afritar prodTemp sem selectedProduct

		//ÞETTA ATHUGAR SAMA VARAN ER ÞEGAR TIL Í KÖRFUNNI
		var filtered = basket.filter(function(item) {
			if (item.id == selectedProduct.id) {
				return true;
			}//end if
		});//end function

		// ef varan er þegar til í körfunni breytist magnið
		if ( filtered.length > 0 ) {
			basket.forEach(function(item) {
				if (item.id == selectedProduct.id) {
					item.quantity += qty;
				}//end if
			});//end function
		} //end if

		// ef varan er ekki til í körfunni pushar hún inn í körfuna
		else {
			selectedProduct.quantity = qty;
			basket.push(selectedProduct);
		}//end else

	}//end else

	basketStr = JSON.stringify(basket);
	localStorage.setItem('basket', basketStr);

	buttonText.innerHTML = "ADDED!"; // BREYTIR ADD NOW Í ADDED!

	qty = 1; //SVO MAGN VERÐI AFTUR 1 EFTIR ADD NOW
	var qtyDiv = document.getElementById("magnNumber");
	qtyDiv.innerHTML = qty;
	
	basketNavChange();
	baseketTotalFunc();
}


// FALL FYRIR ANNAÐ EN KAFFI... EKKERT ROAST ( annars alveg eins )
var addNowNoRoast = function() { // SVO ÞAÐ SÉ EKKI HÆGT AÐ SETJA Í KÖRFU EF EKKERT ROAST ER VALIÐ

	prodTemp = products[pageNum];

	var selectedProduct = clone(prodTemp); //afritar prodTemp sem selectedProduct

		//ÞETTA ATHUGAR SAMA VARAN ER ÞEGAR TIL Í KÖRFUNNI
		var filtered = basket.filter(function(item) {
			if (item.id == selectedProduct.id) {
				return true;
			}
		});

		// ef varan er þegar til í körfunni breytist magnið
		if ( filtered.length > 0 ) {
			basket.forEach(function(item) {
				if (item.id == selectedProduct.id) {
					item.quantity += qty;
				}
			});
		} 

		// ef varan er ekki til í körfunni pushar hún inn í körfuna
		else {
			selectedProduct.quantity = qty;
			basket.push(selectedProduct);
		}

	// for (var i = 0; i < products.length; i++) {
	// 	products[i].quantity = qty;
	// }
	// basket.push(prodTemp);
	
	basketStr = JSON.stringify(basket);
	localStorage.setItem('basket', basketStr);

	buttonText.innerHTML="ADDED!"; // BREYTIR ADD NOW Í ADDED!

	qty = 1; //SVO MAGN VERÐI AFTUR 1 EFTIR ADD NOW
	var qtyDiv = document.getElementById("magnNumber");
	qtyDiv.innerHTML = qty;

	basketNavChange();
	baseketTotalFunc();
}

var addedToAddNow = function() { //BREYTIR ADDED! AFTUR Í ADD NOW
	buttonText.innerHTML="ADD NOW";
}


if (basketStr) {
	basket = JSON.parse(basketStr);	
} 

else {
	basket = [];
}

//FALL SEM BREYTIR MAGNI Í BASKET Í NAV
var basketNavChange = function() {
	basketQty = 0;
	for (var i = 0; i < basket.length; i++) {
		basketQty += basket[i].quantity;
	}
	basketNav.innerHTML = "BASKET (" + basketQty + ")";
}

basketNavChange();

var removeFromBasket = function(i) {
	console.log(i);
	basket.splice(i, 1); //tekur valda vöru úr basket
	var basketTemp = JSON.parse(basketStr); //parse gerir basketStr að array
	basketTemp.splice(i,1); //tekur valda vöru úr basketTemp
	basketStr = JSON.stringify(basketTemp); //gerir basketTemp að streng og vistar sem basketStr
	localStorage.setItem('basket', basketStr); //uppfærir localStorage
	displayBasketContent(); //svo varan hverfi strax úr körfunni
	basketNavChange(); //svo talan í BASKET í nav breytst
	basketHeadQty(); //svo það sjáist efst í körfuglugganum hvað eru margar vörur í körfunni
	baseketTotalFunc(); //uppfærir Total $$
}



var clearBasket = function() {
	localStorage.setItem('basket', ""); //tekur allar vörur úr körfunni
	basket = [];
	basketTemp = []
	basketStr = "";
	console.log("test");
	displayBasketContent(); //svo varan hverfi strax úr körfunni
	basketNavChange(); //svo talan í BASKET í nav breytst
	basketHeadQty(); //svo það sjáist efst í körfuglugganum hvað eru margar vörur í körfunni
	baseketTotalFunc(); //uppfærir Total $$
}



// REIKNAR ÚT HEILDARVERÐ
var baseketTotalFunc = function() {
	basketTotal = 0;
	for (var i = 0; i < basket.length; i++) {
			basketTotal += basket[i].prodPrice * basket[i].quantity;
		}
	}

// FALL SEM SÝNIR HVAÐA VÖRUR ERU Í KÖRFUNNI OG BIRTIR TOTAL $$
var displayBasketContent = function() {
	var basketContent = document.getElementById("basketContent");
	var displayBasket;
	

	if (basketContent) {
		
		baseketTotalFunc();

		displayBasket = "<ul>";
		for (var i = 0; i < basket.length; i++) {
			

			displayBasket += "<li class='clearfix'>" + 
			"<a href=" + basket[i].prodLink + "><img class='basketImg' src=" + basket[i].prodImg + "></a>" + "<br>" +
			"<div class='basketText'> <p class='basketName'>" + basket[i].prodName + "</p><br>" +
			"Roast: <p class='basketInfo'>" + basket[i].prodRoast + "</p><br>" +
			"Qty: <p class='basketInfo'>" + basket[i].quantity + "</p><br>" +
			"Price: <p class='basketInfo'>$" + basket[i].prodPrice * basket[i].quantity + "</p><br>" + 
			"<button class='basketBtn' onclick=\"removeFromBasket(" + i + ")\">Remove</button></div></li>";

		}
		displayBasket += "</ul><br>" +
		"<p class='totalText'>Total: $" + basketTotal + "</p><br>" + 
		"<button id='buttonFloat' class='basketBtn totalText' onclick='clearBasket()'>Clear basket</button>";


		basketContent.innerHTML = displayBasket;

	}

}

// SÝNIR EFST Í KÖRFU HVAÐ ERU MARGAR VÖRUR
var basketHeadQty = function() {
	var basketHead = document.getElementById("basketHead");	

	if (basketHead) {

		if (basketQty == 0) {
			basketHead.innerHTML = "Your basket is empty";
			basketHead.style.margin = "0 0 99px 0";
			console.log("empty");
		}

		else if (basketQty == 1) {
			basketHead.innerHTML = "You have 1 item in your basket";
		}

		else if (basketQty > 1) {
			
			console.log("NOT empty");
			basketHead.innerHTML = "You have " + basketQty + " items in your basket";
		}

	}

}

// TIL ÞESS AÐ BIRTA ÞAÐ SEM ER Í KÖRFUNNI
window.onload = function () {
	basketHeadQty();
	displayBasketContent();
}

