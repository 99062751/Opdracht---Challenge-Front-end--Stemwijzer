var vote_container= document.getElementById("vote_container");
var desc_container= document.getElementById("desc_container");
var party_container= document.getElementById("party_container");
var buttons_container= document.getElementById("buttons_container");
var start_link= document.createElement("a");
var agree_button= document.createElement("button");
var disagree_button= document.createElement("button");
var none_button= document.createElement("button");

// gedoe setup
// start_link.setAttribute('class', "w3-button w3-blue w3-xxlarge w3-round-xlarge w3-padding");
// start_link.setAttribute('href', "stemwijzer.html");
// start_link.innerText= "Start";
vote_container.appendChild(start_link);

function buttonStyling(element, color){
    element.setAttribute('class', `w3-button w3-${color} w3-xlarge w3-margin-right w3-round-xlarge w3-padding w3-text-color-white`);
    buttons_container.appendChild(element);
}

for (var i = 0; i < 3; i++) {
    if(i == 0){
        agree_button.innerText= "Eens";
        buttonStyling(agree_button ,"green");
    }else if(i == 1){
        disagree_button.innerText= "Oneens";
        buttonStyling(disagree_button ,"red");
    }else if(i == 2){
        none_button.innerText= "~ Geen van beide";
        buttonStyling(none_button ,"gray");
    }
}





