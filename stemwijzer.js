var vote_container= document.getElementById("vote_container");
var desc_container= document.getElementById("desc_container");
var party_container= document.getElementById("party_container");
var buttons_container= document.getElementById("buttons_container");
var statement_container= document.getElementById("statement_container");
// var start_link= document.createElement("a");
var agree_button= document.createElement("button");
var disagree_button= document.createElement("button");
var none_button= document.createElement("button");
var choice= {"agreed": 0, "disagreed": 0, "none": 0};
var statement_count= 0; 
var statement_headers= ["1", "2", "3"];
var statement_header= document.createElement("h2");
var statement= document.createElement("h2");
var statements= subjects;
var inPAGE= true;

// gedoe setup
// start_link.setAttribute('class', "w3-button w3-blue w3-xxlarge w3-round-xlarge w3-padding");
// start_link.setAttribute('id', "start_link");
// start_link.setAttribute('href', "stemwijzer.html");
// start_link.innerText= "Start";
// vote_container.appendChild(start_link);
// start_link.onclick= function(){clicked(start_link)};

statement_header.setAttribute("class", 'w3-text-blue');
statement_header.innerText= statements[statement_count]["title"] + "\n";
statement_container.appendChild(statement_header);

statement.setAttribute("class", 'w3-left w3-text-black');
statement.innerText= statements[statement_count]["statement"];
statement_container.appendChild(statement);




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
agree_button.onclick= function(){clicked(agree_button)};
disagree_button.onclick= function(){clicked(disagree_button)};
none_button.onclick= function(){clicked(none_button)};

function clicked(clicked_element){
    if(statement_count != statements.length){
        if(clicked_element == agree_button){
            choice["agreed"]++; 
        }else if(clicked_element == disagree_button){
            choice["disagreed"]++;
        }else if(clicked_element == start_link){
            console.log(inPAGE);
            if(inPAGE == true){
                inPAGE = !inPAGE;
                document.getElementById("start_link").style.backgroundColor= "green !important";
            }else{
                inPAGE= true;
                start_link.style.display= "inline-block";
            }
        }else{
            choice["none"]++;
        }
        statement_count++;
        statement_header.innerText= statements[statement_count]["title"];
        statement.innerText= statements[statement_count]["statement"];
    }else{
        alert("ok!");
        statement_header.innerText= "Zijn er onderwerpen die u belangrijk vind?";
        statement.innerText= "Aangevinkte stellingen tellen extra mee bij het resultaat.";

        for (var q = 0; q < statements.length; q++) {
            var checkbox= document.createElement("select");
            checkbox.setAttribute("id", 'checkbox' + q);
            statement_container.appendChild(checkbox);
            var checksubject= + statements[q]["title"];
            statement_container.appendChild(checksubject);
        }

        var continue_button= document.createElement("button");
        buttonStyling(continue_button, "blue");
        continue_button.innerText= "Ga verder";
        statement_container.appendChild(continue_button);
    }
}



