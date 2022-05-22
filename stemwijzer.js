var vote_container= document.getElementById("vote_container");
var desc_container= document.getElementById("desc_container");
var party_container= document.getElementById("party_container");
var buttons_container= document.getElementById("buttons_container");
var statement_container= document.getElementById("statement_container");
var agree_button= document.createElement("button");
var disagree_button= document.createElement("button");
var none_button= document.createElement("button");
var skip_button= document.createElement("button");
var partyDiv2;
var partyDiv3;
var name_party;
var statuss= false;
var result_button;
var result_button2;
var match_array= [];
var output;
var stat_points= [];
var total_points= [];
var points= [];
let match_data= [];
var ans;
const size_int= 12; 
var statement_count= 0; 
var statement_headers= ["1", "2", "3"];
var statement_header= document.createElement("h2");
var statement= document.createElement("h2");
var statements= subjects;
var addnumber= (100 / statements.length);
var import_statements= [];
var checkboxes= [];
var continue_button= document.createElement("button");
var partys= parties;
var sec_partys= [];
var size_partys= [];
var partyDiv; 
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
var final_result;

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
function show(element2){
    element2.style.display= "block";
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
agree_button.onclick= function(){choizes[statement_count] = "pro"; clicked(agree_button);};
disagree_button.onclick= function(){choizes[statement_count] = "contra"; clicked(disagree_button);};
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
        hide(previous_button);


        for (var q = 0; q < statements.length; q++) {
            var checkbox= document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("id", q);
            checkbox.onclick= function(){ 
                checkbox_clicked(this);
            };
            subjectsDiv.appendChild(checkbox);
            checkboxes.push(false);
            var statement_title= document.createElement("span");
            statement_title.setAttribute("class", 'float');
            statement_title.innerText= statements[q]["title"] + "\n";
            subjectsDiv.appendChild(statement_title); 
        }

        buttonStyling(continue_button, "blue");
        continue_button.innerText= "Ga verder";
        statement_container.appendChild(continue_button);
        continue_button.onclick= function(){selectParties();}; 
   }
}

function changeButtonColor(givenAnswer){
    if(givenAnswer == "pro"){
        document.getElementById("agree_button").classList.add("blue");
        document.getElementById("agree_button").classList.remove("w3-green");
    } else if(givenAnswer == "contra"){
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

function selectParties(){
    hide(subjectsDiv);
    hide(continue_button);
    // alle partijen
    statement_header.innerText= "Partijen selecteren";
    statement.innerText= "Alle partijen worden nu gebruikt.";
    partyDiv= document.createElement("div");
    partyDiv.setAttribute("class", 'partyDiv')
    statement_container.appendChild(partyDiv);


    //filter terug naar alle seculaire partijen
    var filter= document.createElement("input");
    filter.type = "checkbox";
    partyDiv.appendChild(filter);
    filter.onclick= function(){
        hide(partyDiv);
        filterNames();
    }; 

    var filter4= document.createElement("input");
    filter4.type = "checkbox";
    partyDiv.appendChild(filter4);
    filter4.onclick= function(){
        hide(partyDiv);
        filterBig();
    }; 


    var spanfilter= document.createElement("span");
    spanfilter.innerHTML= "Filter op seculaire partijen";
    partyDiv.appendChild(spanfilter);
    for (var c = 0; c < parties.length; c++) {
        var party= document.createElement("span");
        party.innerHTML= "<br>" + partys[c]["name"];
        partyDiv.appendChild(party);
    }
    result_button= document.createElement("button");
    buttonStyling(result_button,"yellow");
    result_button.innerHTML= "Naar mijn resultaat";
    partyDiv.appendChild(result_button);
    result_button.onclick= function(){    
        hide(partyDiv);
        sec= false;
        //output= false;
        //output hoort daar als param
        checkMatch(sec);
    };
}

function filterNames(){
    // seculaire partijen
    partyDiv2= document.createElement("div");
    partyDiv2.setAttribute("class", 'partyDiv2');
    partyDiv2.style.display= "block";
    statement_container.appendChild(partyDiv2);

    //filter terug naar alle partijen
    var filter2= document.createElement("input");
    filter2.type = "checkbox";
    partyDiv2.appendChild(filter2);
    var spanfilter2= document.createElement("span");
    spanfilter2.innerHTML= "Filter op alle partijen";
    partyDiv2.appendChild(spanfilter2);

    for (var h = 0; h < partys.length; h++) {
        party2= document.createElement("span");
        if(partys[h]["secular"] == true){
            party2.innerHTML= "<br>" + partys[h]["name"];
            partyDiv2.appendChild(party2)
        }else{
            // ... 
        }
    }
    filter2.onclick= function(){hide(partyDiv2); show(partyDiv); selectParties;}; 
    result_button2= document.createElement("button");
    buttonStyling(result_button2,"yellow");
    result_button2.innerHTML= "Naar mijn resultaat";
    partyDiv2.appendChild(result_button2);
    result_button2.onclick= function(){ 
        hide(partyDiv2);
        statuss= "sec";   
        //output= false;
        //output hoort daar als param
        checkMatch(statuss);
    };
}

function filterBig(){
    // size partijen
    partyDiv4= document.createElement("div");
    partyDiv4.setAttribute("class", 'partyDiv4');
    partyDiv4.style.display= "block";
    statement_container.appendChild(partyDiv4);

    //filter terug naar alle partijen
    var filter3= document.createElement("input");
    filter3.type = "checkbox";
    partyDiv4.appendChild(filter3);
    var spanfilter3= document.createElement("span");
    spanfilter3.innerHTML= "Filter op alle partijen";
    partyDiv4.appendChild(spanfilter3);

    for (var h = 0; h < partys.length; h++) {
        party2= document.createElement("span");
        if(partys[h]["size"] >= size_int){
            party2.innerHTML= "<br>" + partys[h]["name"];
            partyDiv4.appendChild(party2)
        }else{
            // ... 
        }
    }
    filter3.onclick= function(){hide(partyDiv4); show(partyDiv); selectParties;}; 
    var result_button3= document.createElement("button");
    buttonStyling(result_button3,"yellow");
    result_button3.innerHTML= "Naar mijn resultaat";
    partyDiv4.appendChild(result_button3);
    result_button3.onclick= function(){ 
        hide(partyDiv4);
        statuss= "big";   
        //output= false;
        //output hoort daar als param
        checkMatch(statuss);
    };
}

function checkMatch(statuss){    
    partyDiv3= document.createElement("div");
    partyDiv3.setAttribute("class", 'partyDiv3');
    partyDiv3.style.display= "block";
    
    statement_title= "Uitslag partijen";
    statement_header.innerHTML= "Dit zijn de uitslagen van de partijen hoeveel je op ze matched";
    // naam ervan ook pushen


    // seculair partijen
    if (statuss == "sec") {
        alert("waar");
        for (var aapje =0; aapje < parties.length; aapje++) {
            if (parties[aapje]["secular"] == true) {
                sec_partys.push(parties[aapje]);
            }else{
                //. . .
            }
        }
        console.log(sec_partys);
        for (var l = 0; l < statements.length; l++) {
            for (var x  = 0; x < sec_partys.length; x++) {
                if(statements[l]["parties"][x]["position"] == choizes[l]) {
                    if(checkboxes[l] == true){
                        sec_partys[x]["points"]+ 2; 

                    }else if(checkboxes[l] == false){
                        sec_partys[x]["points"]++;

                    }else{
                        alert("WERKT NIET! regel 335");
                    }
                    stat_points.push(sec_partys[x]);
                }else{
                    console.log("Geen match!");
                    stat_points.push(sec_partys[x]);
                }
            }
            total_points.push(stat_points);
            // stat_points zijn de punten die partijen per stelling(statements) hebben
        }   

        for(var uwu= 0; uwu < sec_partys.length; uwu++){
            for (var blabla = 0; blabla < sec_partys.length; blabla++) {
                name_party= total_points[blabla][uwu]["name"];
                ans= total_points[blabla][uwu]["points"] + total_points[blabla][uwu]["points"]; 
                points[uwu] = {"points": ans, "name": name_party};
            }
        }
        match_data.push(points);
        
        // sort functie doet het niet helemaal kijk ernaarrrrrr
         final_result= match_data.sort(function(a, b) {
            if(b.points - a.points == 0 || b.points - a.points >= 0 || b.points - a.points < 0){
                return b.points - a.points;
            }

        });

         for(var rip = 0; rip < sec_partys.length; rip++) {
            var pp= document.createElement("p");
            pp.innerHTML= final_result[0][rip]["points"] + " matchcijfer= " + final_result[0][rip]["name"];
            statement_container.appendChild(pp);
        }


        //  niet seculair
    }else if(statuss == false){
        for (var g = 0; g < statements.length; g++) {
            for (var x  = 0; x < partys.length; x++) {
                if(statements[g]["parties"][x]["position"] == choizes[g]) {
                    if(checkboxes[g] == true){
                        partys[x]["points"]+ 2; 

                    }else if(checkboxes[g] == false){
                        partys[x]["points"]++;

                    }else{
                        alert("WERKT NIET! regel 335");
                    }
                    stat_points.push(partys[x]);
                    // }else if(statements[g]["parties"][x]["position"] != choizes[g]){
                //     // match_array[g]= (100 / statements.length);
                //     console.log("OOF!");
                }else{
                    console.log("Geen match!");
                    stat_points.push(partys[x]);
                }
            }
            total_points.push(stat_points);
            // stat_points zijn de punten die partijen per stelling(statements) hebben
        }
        alert(JSON.stringify(stat_points));

        // array met punten: volgorde match van die user
        // partijen array: volgorde 
        for(var iwi= 0; iwi < partys.length; iwi++){
            for (var owo = 0; owo < partys.length; owo++) {
                name_party= total_points[owo][iwi]["name"];
                ans= total_points[owo][iwi]["points"] + total_points[owo][iwi]["points"]; 
                points[iwi] = {"points": ans, "name": name_party};
            }
        }
        match_data.push(points);
        
        // sort functie doet het niet helemaal kijk ernaarrrrrr
         final_result= match_data.sort(function(a, b) {
            if(b.points - a.points == 0 || b.points - a.points >= 0 || b.points - a.points < 0){
                return b.points - a.points;
            }

        });

         for(var rip = 0; rip < partys.length; rip++) {
            var pp= document.createElement("p");
            pp.innerHTML= final_result[0][rip]["points"] + " matchcijfer= " + final_result[0][rip]["name"];
            statement_container.appendChild(pp);
        }
    }else if(statuss == "big"){
        alert("big");
        for (var aapje2 =0; aapje2 < parties.length; aapje2++) {
            if (parties[aapje2]["size"] >= size_int) {
                size_partys.push(parties[aapje2]);
            }else{
                //. . .
            }
        }

        for (var acca = 0; acca < statements.length; acca++) {
            for (var xacc  = 0; xacc < size_partys.length; xacc++) {
                if(statements[acca]["parties"][xacc]["position"] == choizes[acca]) {
                    if(checkboxes[acca] == true){
                        size_partys[xacc]["points"]+ 2; 

                    }else if(checkboxes[acca] == false){
                        size_partys[xacc]["points"]++;

                    }else{
                        alert("WERKT NIET! regel 335");
                    }
                    stat_points.push(size_partys[xacc]);
                    // }else if(statements[acca]["parties"][xacc]["position"] != choizes[acca]){
                //     // match_array[acca]= (100 / statements.length);
                //     console.log("OOF!");
                }else{
                    console.log("Geen match!");
                    stat_points.push(size_partys[xacc]);
                }
            }
            total_points.push(stat_points);
            // stat_points zijn de punten die partijen per stelling(statements) hebben
        }
        alert(JSON.stringify(stat_points));

        // array met punten: volgorde match van die user
        // partijen array: volgorde 
        for(var iwi= 0; iwi < size_partys.length; iwi++){
            for (var owo = 0; owo < size_partys.length; owo++) {
                name_party= total_points[owo][iwi]["name"];
                ans= total_points[owo][iwi]["points"] + total_points[owo][iwi]["points"]; 
                points[iwi] = {"points": ans, "name": name_party};
            }
        }
        match_data.push(points);
        
        // sort functie doet het niet helemaal kijk ernaarrrrrr
         final_result= match_data.sort(function(a, b) {
            if(b.points - a.points == 0 || b.points - a.points >= 0 || b.points - a.points < 0){
                return b.points - a.points;
            }

        });

         for(var rip = 0; rip < size_partys.length; rip++) {
            var pp= document.createElement("p");
            pp.innerHTML= final_result[0][rip]["points"] + " matchcijfer= " + final_result[0][rip]["name"];
            statement_container.appendChild(pp);
        }
    }else{
        alert("IETS WERKT NIET 374");
    }   
}




function checkbox_clicked(elem){
    console.log(elem.id);
    if(checkboxes[elem.id] == false){
        checkboxes[elem.id] = true;
    }else if(checkboxes[elem.id] == true){
        checkboxes[elem.id] = false;
    }else{
        alert("WERKT NIET regel 341");
    }
    
    //checkboxes.push([`${elem.id}`, true]);
}

// gedaan je hebt de checkboxen, 
// controleren, welke zijn aangevinkt
// laat weten welke belangrijk is zodat je deze punten kan dubbelen
