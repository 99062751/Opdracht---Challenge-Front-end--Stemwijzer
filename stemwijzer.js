var vote_container= document.getElementById("vote_container");
var desc_container= document.getElementById("desc_container");
var party_container= document.getElementById("party_container");
var buttons_container= document.getElementById("buttons_container");
var statement_container= document.getElementById("statement_container");
var agree_button= document.createElement("button");
var disagree_button= document.createElement("button");
var none_button= document.createElement("button");
var skip_button= document.createElement("button");
var statement_count= 0; 
var statement_headers= ["1", "2", "3"];
var statement_header= document.createElement("h2");
var statement= document.createElement("h2");
var statements= subjects;
var progressbar= document.getElementById("progressbar");
var progress_percentage= 0;
progressbar.style.width= progress_percentage + "%";
var subjectsDiv= document.getElementById("check_subject");
subjectsDiv.style.display= "none";
var previous_questionDiv= document.getElementById("previous_questionDiv");
var previous_button= document.createElement("a");
previous_button.setAttribute("class", 'w3-left w3-bar-item w3-padding');
previous_button.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" style="width: 12%;" class="w3-left" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256c0 141.4 114.6 256 256 256s256-114.6 256-256c0-141.4-114.6-256-256-256S0 114.6 0 256zM246.1 129.2C252.1 131.7 256 137.5 256 144v64h96c17.67 0 32 14.33 32 32v32c0 17.67-14.33 32-32 32h-96v64c0 6.469-3.891 12.31-9.875 14.78c-5.984 2.484-12.86 1.109-17.44-3.469l-112-112c-6.248-6.248-6.248-16.38 0-22.62l112-112C233.3 128.1 240.1 126.7 246.1 129.2z"/></svg><span class="w3-xlarge w3-bar-item"><span class="heading w3-text-blue">Stem</span>Wijzer1</span>';
previous_questionDiv.appendChild(previous_button);
previous_button.onclick= function(){clicked("GoPrevious");};
var question_counter= document.getElementById("question_counter");
var check_results= [];

var choizes= [];


function selected(selected_element){
    selected_element.style.backgroundColor = "blue";
}

question_counter.innerHTML= `${(statement_count + 1)}/30`;
statement_header.setAttribute("class", 'w3-text-blue');
statement_header.innerText= statements[statement_count]["title"] + "\n";
statement_container.appendChild(statement_header);

statement.setAttribute("class", 'w3-left w3-text-black');
statement.innerText= statements[statement_count]["statement"];
statement_container.appendChild(statement);

function clearButtons(){
    agree_button.style.display= "none";
    disagree_button.style.display= "none";
    none_button.style.display= "none";
    skip_button.style.display= "none";
}
function showButtons(){
    agree_button.style.display= "inline-block";
    disagree_button.style.display= "inline-block";
    none_button.style.display= "inline-block";
    skip_button.style.display= "inline-block";
}
function hide(element){
    element.style.display= "none";
}
function buttonStyling(element, color){
    element.setAttribute('class', `w3-button w3-${color} w3-xlarge w3-margin-right w3-round-xlarge w3-padding w3-text-color-white`);
    buttons_container.appendChild(element);
}

for (var i = 0; i < 4; i++) {
    if(i == 0){
        agree_button.innerText= "Eens";
        agree_button.setAttribute("id", "agree_button");
        buttonStyling(agree_button ,"green");
        var selected_argee= true;
    }else if(i == 1){
        disagree_button.innerText= "Oneens";
        disagree_button.setAttribute("id", "disagree_button");
        buttonStyling(disagree_button ,"red");
        var selected_disargee= true;
    }else if(i == 2){
        none_button.innerText= "~ Geen van beide";
        none_button.setAttribute("id", "none_button");
        buttonStyling(none_button ,"gray");
        var selected_none= true;
    }else if(i == 3){
        skip_button.innerText= "Overslaan";
        buttonStyling(skip_button ,"white");
        var selected_none= true;
    }
}
agree_button.onclick= function(){choizes[statement_count] = "agreed"; clicked(agree_button);};
disagree_button.onclick= function(){choizes[statement_count] = "disagreed"; clicked(disagree_button);};
none_button.onclick= function(){choizes[statement_count] = "none"; clicked(none_button);};
skip_button.onclick= function(){clicked(skip_button);};


function clicked(clicked_element){
    if(statement_count != (statements.length - 1) && clicked_element != "GoPrevious"){
        statement_count++;
        setButtonColors();
        if(choizes[statement_count] != null){
            changeButtonColor(choizes[statement_count]);
        }
        statement_header.innerText= statements[statement_count]["title"];
        statement.innerText= statements[statement_count]["statement"];
        progress_percentage= (progress_percentage + 3.48);
        progressbar.style.width= progress_percentage + "%";
        question_counter.innerHTML= `${(statement_count + 1)}/30`;
    }else if(clicked_element == "GoPrevious"){
        hide(subjectsDiv);
        if(statement_count <= 0){
            previous_button.setAttribute("href", 'index.html');
        }else{
            statement_count--;
            setButtonColors();
            changeButtonColor(choizes[statement_count]);
            question_counter.innerHTML= `${(statement_count + 1)}/30`;
            progress_percentage= (progress_percentage - 3.48);
            progressbar.style.width= progress_percentage + "%";
            statement_header.innerText= statements[statement_count]["title"];
            statement.innerText= statements[statement_count]["statement"];
        }
    }else{
        subjectsDiv.style.display= "block";
        clearButtons();
        statement_header.innerText= "Zijn er onderwerpen die u belangrijk vind?";
        statement.innerText= "Aangevinkte stellingen tellen extra mee bij het resultaat.";

        for (var q = 0; q < statements.length; q++) {
            var checkbox= document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("id", 'checkbox' + q);
            subjectsDiv.appendChild(checkbox);

            var statement_title= document.createElement("span");
            statement_title.setAttribute("class", 'float');
            statement_title.innerText= statements[q]["title"] + "\n";
            subjectsDiv.appendChild(statement_title);
        }

        var continue_button= document.createElement("button");
        buttonStyling(continue_button, "blue");
        continue_button.innerText= "Ga verder";
        statement_container.appendChild(continue_button);
        continue_button.onclick= function(){showResult();}; 
    }

    
}

function changeButtonColor(givenAnswer){
    if(givenAnswer == "agreed"){
        document.getElementById("agree_button").classList.add("blue");
        document.getElementById("agree_button").classList.remove("w3-green");
    } else if(givenAnswer == "disagreed"){
        document.getElementById("disagree_button").classList.add("blue");
        document.getElementById("disagree_button").classList.remove("w3-red");
    }else if(givenAnswer == "none"){
        document.getElementById("none_button").classList.add("blue");
        document.getElementById("none_button").classList.remove("w3-grey");
    }
}

function setButtonColors(){
    agree_button.classList.add("w3-green");
    agree_button.classList.remove("blue");

    disagree_button.classList.add("w3-red");
    disagree_button.classList.remove("blue");

    none_button.classList.add("w3-grey");
    none_button.classList.remove("blue");
}

function showResult(){
    for (var t = 0; t < statements.length; t++) {
        check_results.push(document.getElementById(`checkbox${t}`).checked);
        alert(check_results);

        // loop bouwen choizes kijken of gegeven antwoord 
        //overeenkomt met party opinion binnen if statement 
        //ook kijken of het antwoord van die vraag of die aangevinkt was
        // als dat geval is + 1 en anders +2

        // if(check_results == true){

        // }
    }
}
