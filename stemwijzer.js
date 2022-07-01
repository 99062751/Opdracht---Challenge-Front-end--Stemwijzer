let vote_container= document.getElementById("vote_container");
let desc_container= document.getElementById("desc_container");
let party_container= document.getElementById("party_container");
let buttons_container= document.getElementById("buttons_container");
let statement_container= document.getElementById("statement_container");
let agree_button= document.createElement("button");
let disagree_button= document.createElement("button");
let none_button= document.createElement("button");
let skip_button= document.createElement("button");
let partyDiv2;
let partyDiv3;
let name_party;
let statuss= false;
let result_button;
let result_button2;
let match_array= [];
let output;
let stat_points= [];
let total_points= [];
let points= [];
let match_data= [];
let ans;
const size_int= 12; 
let statement_count= 0; 
let statement_headers= ["1", "2", "3"];
let statement_header= document.createElement("h2");
let statement= document.createElement("h2");
let statements= subjects;
let addnumber= (100 / statements.length);
let import_statements= [];
let checkboxes= [];
let continue_button= document.createElement("button");
let partys= parties;
let sec_partys= [];
let size_partys= [];
let partyDiv; 
let progressbar= document.getElementById("progressbar");
let progress_percentage= 0;
progressbar.style.width= progress_percentage + "%";
let subjectsDiv= document.getElementById("check_subject");
subjectsDiv.style.display= "none";
let previous_questionDiv= document.getElementById("previous_questionDiv");
let previous_button= document.createElement("a");
previous_button.setAttribute("class", 'w3-left w3-bar-item w3-padding');
previous_button.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" style="width: 12%;" class="w3-left" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256c0 141.4 114.6 256 256 256s256-114.6 256-256c0-141.4-114.6-256-256-256S0 114.6 0 256zM246.1 129.2C252.1 131.7 256 137.5 256 144v64h96c17.67 0 32 14.33 32 32v32c0 17.67-14.33 32-32 32h-96v64c0 6.469-3.891 12.31-9.875 14.78c-5.984 2.484-12.86 1.109-17.44-3.469l-112-112c-6.248-6.248-6.248-16.38 0-22.62l112-112C233.3 128.1 240.1 126.7 246.1 129.2z"/></svg><span class="w3-xlarge w3-bar-item"><span class="heading w3-text-blue">Stem</span>Wijzer1</span>';
previous_questionDiv.appendChild(previous_button);
previous_button.onclick= function(){clicked("GoPrevious");};
let question_counter= document.getElementById("question_counter");
let check_results= [];
let choizes= [];
let final_result;

//alle klassen geven aan vraag container 
question_counter.innerHTML= `${(statement_count + 1)}/30`;
statement_header.setAttribute("class", 'w3-text-blue');
statement_header.innerText= statements[statement_count]["title"] + "\n";
statement_container.appendChild(statement_header);

statement.setAttribute("class", 'w3-left w3-text-black');
statement.innerText= statements[statement_count]["statement"];
statement_container.appendChild(statement);

//loop om alle buttons te maken
for (let i = 0; i < 4; i++) {
    if(i == 0){
        agree_button.innerText= "Eens";
        agree_button.setAttribute("id", "agree_button");
        buttonStyling(agree_button ,"green");
        let selected_argee= true;
    }else if(i == 1){
        disagree_button.innerText= "Oneens";
        disagree_button.setAttribute("id", "disagree_button");
        buttonStyling(disagree_button ,"red");
        let selected_disargee= true;
    }else if(i == 2){
        none_button.innerText= "~ Geen van beide";
        none_button.setAttribute("id", "none_button");
        buttonStyling(none_button ,"gray");
        let selected_none= true;
    }else if(i == 3){
        skip_button.innerText= "Overslaan";
        buttonStyling(skip_button ,"white");
        let selected_none= true;
    }
}

//onclick functie voor de buttons
agree_button.onclick= ()=> {choizes[statement_count] = "pro"; clicked(agree_button);};
disagree_button.onclick= ()=>{choizes[statement_count] = "contra"; clicked(disagree_button);};
none_button.onclick= ()=>{choizes[statement_count] = "none"; clicked(none_button);};
skip_button.onclick= ()=>{clicked(skip_button);};

//selecteer functie als een button blauw is 
function selected(selected_element){
    selected_element.style.backgroundColor = "blue";
}
//functie alle buttons weghalen
function clearButtons(){
    agree_button.style.display= "none";
    disagree_button.style.display= "none";
    none_button.style.display= "none";
    skip_button.style.display= "none";
}
// functie alle buttons laten zien
function showButtons(){
    agree_button.style.display= "inline-block";
    disagree_button.style.display= "inline-block";
    none_button.style.display= "inline-block";
    skip_button.style.display= "inline-block";
}
//functie om element te laten hiden
function hide(element){
    element.style.display= "none";
}
//functie om een element te laten zien
function show(element2){
    element2.style.display= "block";
}
//functie om een button te stylen
function buttonStyling(element, color){
    element.setAttribute('class', `w3-button w3-${color} w3-xlarge w3-margin-right w3-round-xlarge w3-padding w3-text-color-white`);
    buttons_container.appendChild(element);
}

// als een button geclicked is
function clicked(clicked_element){
    // zorgt ervoor dat je vraag terug kan
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
        //laat index weer zien
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
        // als alle vragen klaar zijn laat volgende pagina zien
    }else{
        subjectsDiv.style.display= "block";
        clearButtons();
        statement_header.innerText= "Zijn er onderwerpen die u belangrijk vind?";
        statement.innerText= "Aangevinkte stellingen tellen extra mee bij het resultaat.";
        hide(previous_button);

        for (let q = 0; q < statements.length; q++) {
            let checkbox= document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("id", q);
            checkbox.onclick= function(){ 
                checkbox_clicked(this);
            };
            subjectsDiv.appendChild(checkbox);
            checkboxes.push(false);
            let statement_title= document.createElement("span");
            statement_title.setAttribute("class", 'float');
            statement_title.innerText= statements[q]["title"] + "\n";
            subjectsDiv.appendChild(statement_title); 
        }

        //submit voor nieuwe pagina
        buttonStyling(continue_button, "blue");
        continue_button.innerText= "Ga verder";
        statement_container.appendChild(continue_button);
        continue_button.onclick= function(){selectParties();}; 
   }
}
// functie om nieuwe kleur te adden en deleten
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
//fucntie om de button kleur te laten veranderen
function setButtonColors(){
    agree_button.classList.add("w3-green");
    agree_button.classList.remove("blue");

    disagree_button.classList.add("w3-red");
    disagree_button.classList.remove("blue");

    none_button.classList.add("w3-grey");
    none_button.classList.remove("blue");
}
// functie om partijen te laten selecteren 
function selectParties(){
    hide(subjectsDiv);
    hide(continue_button);
    // alle partijen
    statement_header.innerText= "Partijen selecteren";
    statement.innerText= "Alle partijen worden nu gebruikt." + "<br>";
    partyDiv= document.createElement("div");
    partyDiv.setAttribute("class", 'partyDiv')
    statement_container.appendChild(partyDiv);


    //filter terug naar alle seculaire partijen
    let filter= document.createElement("input");
    filter.type = "checkbox";
    partyDiv.appendChild(filter);
    filter.onclick= function(){
        hide(partyDiv);
        filterNames();
    }; 

    let filter4= document.createElement("input");
    filter4.type = "checkbox";
    partyDiv.appendChild(filter4);
    filter4.onclick= function(){
        hide(partyDiv);
        filterBig();
    }; 


    let spanfilter= document.createElement("span");
    spanfilter.innerHTML= "Filter op seculaire partijen";
    partyDiv.appendChild(spanfilter);
    for (let c = 0; c < parties.length; c++) {
        let party= document.createElement("span");
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
        //output hoort daar als param
        checkMatch(sec);
    };
}
// functie om geselecteerde partijen te filteren op secundaire partijen 
function filterNames(){
    // seculaire partijen
    partyDiv2= document.createElement("div");
    partyDiv2.setAttribute("class", 'partyDiv2');
    partyDiv2.style.display= "block";
    statement_container.appendChild(partyDiv2);
    statement.innerText= "Alle secundaire partijen worden nu gebruikt." + "<br>";


    //filter terug naar alle partijen
    let filter2= document.createElement("input");
    filter2.type = "checkbox";
    partyDiv2.appendChild(filter2);
    let spanfilter2= document.createElement("span");
    spanfilter2.innerHTML= "Filter op alle partijen";
    partyDiv2.appendChild(spanfilter2);

    for (let h = 0; h < partys.length; h++) {
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
//filter op partijen met de grootste naam / zetels
function filterBig(){
    // size partijen
    partyDiv4= document.createElement("div");
    partyDiv4.setAttribute("class", 'partyDiv4');
    partyDiv4.style.display= "block";
    statement_container.appendChild(partyDiv4);
    statement.innerText= "Alle grootste partijen worden nu gebruikt." + "<br>";

    //filter terug naar alle partijen
    let filter3= document.createElement("input");
    filter3.type = "checkbox";
    partyDiv4.appendChild(filter3);
    let spanfilter3= document.createElement("span");
    spanfilter3.innerHTML= "Filter op alle partijen";
    partyDiv4.appendChild(spanfilter3);

    for (let h = 0; h < partys.length; h++) {
        party2= document.createElement("span");
        if(partys[h]["size"] >= size_int){
            party2.innerHTML= "<br>" + partys[h]["name"];
            partyDiv4.appendChild(party2)
        }else{
            // ... 
        }
    }
    filter3.onclick= function(){hide(partyDiv4); show(partyDiv); selectParties;}; 
    let result_button3= document.createElement("button");
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
// kijkt voor het resultaat
function checkMatch(statuss){    
    partyDiv3= document.createElement("div");
    partyDiv3.setAttribute("class", 'partyDiv3');
    partyDiv3.style.display= "block";
    
    statement_title= "Uitslag partijen";
    statement_header.innerHTML= "Dit zijn de uitslagen van de partijen hoeveel je op ze matched" + "<br>";
    // naam ervan ook pushen


    // seculair partijen
    if (statuss == "sec") {

        for (let aapje =0; aapje < parties.length; aapje++) {
            if (parties[aapje]["secular"] == true) {
                sec_partys.push(parties[aapje]);
            }else{
                //. . .
            }
        }
        console.log(sec_partys);
        for (let l = 0; l < statements.length; l++) {
            for (let x  = 0; x < sec_partys.length; x++) {
                if(statements[l]["parties"][x]["position"] == choizes[l]) {
                    if(checkboxes[l] == true){
                        sec_partys[x]["points"]+ 2; 

                    }else if(checkboxes[l] == false){
                        sec_partys[x]["points"]++;

                    }else{

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

        for(let uwu= 0; uwu < sec_partys.length; uwu++){
            for (let blabla = 0; blabla < sec_partys.length; blabla++) {
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

         for(let rip = 0; rip < sec_partys.length; rip++) {
            let pp= document.createElement("p");
            pp.innerHTML= final_result[0][rip]["points"] + " matchcijfer= " + final_result[0][rip]["name"];
            statement_container.appendChild(pp);
        }


        //  niet seculair
    }else if(statuss == false){
        for (let g = 0; g < statements.length; g++) {
            for (let x  = 0; x < partys.length; x++) {
                if(statements[g]["parties"][x]["position"] == choizes[g]) {
                    if(checkboxes[g] == true){
                        partys[x]["points"]+ 2; 

                    }else if(checkboxes[g] == false){
                        partys[x]["points"]++;

                    }else{

                    }
                    stat_points.push(partys[x]);
                }else{
                    console.log("Geen match!");
                    stat_points.push(partys[x]);
                }
            }
            total_points.push(stat_points);
            // stat_points zijn de punten die partijen per stelling(statements) hebben
        }


        // array met punten: volgorde match van die user
        // partijen array: volgorde 
        for(let iwi= 0; iwi < partys.length; iwi++){
            for (let owo = 0; owo < partys.length; owo++) {
                name_party= total_points[owo][iwi]["name"];
                ans= total_points[owo][iwi]["points"] + total_points[owo][iwi]["points"]; 
                points[iwi] = {"points": ans, "name": name_party};
            }
        }
        match_data.push(points);
        
        // sort functie doet het niet helemaal kijk ernaarrrrrr
        final_result= match_data[0].sort(function(a, b) {
                return a.points < b.points;
        });
        console.log(match_data);
         for(let rip = 0; rip < partys.length; rip++) {
            let pp= document.createElement("p");
            pp.innerHTML= final_result[rip]["points"] + " matchcijfer= " + final_result[rip]["name"];
            statement_container.appendChild(pp);
        }
    }else if(statuss == "big"){

        for (let aapje2 =0; aapje2 < parties.length; aapje2++) {
            if (parties[aapje2]["size"] >= size_int) {
                size_partys.push(parties[aapje2]);
            }else{
                console.log("Werkt niet");
            }
        }

        for (let acca = 0; acca < statements.length; acca++) {
            for (let xacc  = 0; xacc < size_partys.length; xacc++) {
                if(statements[acca]["parties"][xacc]["position"] == choizes[acca]) {
                    if(checkboxes[acca] == true){
                        size_partys[xacc]["points"]+ 2; 

                    }else if(checkboxes[acca] == false){
                        size_partys[xacc]["points"]++;

                    }else{
                        console.log("Werkt niet");
                    }
                    stat_points.push(size_partys[xacc]);
                }else{
                    console.log("Geen match!");
                    stat_points.push(size_partys[xacc]);
                }
            }
            total_points.push(stat_points);
            // stat_points zijn de punten die partijen per stelling(statements) hebben
        }

        // array met punten: volgorde match van die user
        // partijen array: volgorde 
        for(let iwi= 0; iwi < size_partys.length; iwi++){
            for (let owo = 0; owo < size_partys.length; owo++) {
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

         for(let rip = 0; rip < size_partys.length; rip++) {
            let pp= document.createElement("p");
            pp.innerHTML= final_result[0][rip]["points"] + " matchcijfer= " + final_result[0][rip]["name"];
            statement_container.appendChild(pp);
        }
    }else{
        console.log("Werkt niet");
    }   
}
// kijkt wanneer er een checkbox is geklikt bij de belangrijkste onderwerpen
function checkbox_clicked(elem){
    console.log(elem.id);
    if(checkboxes[elem.id] == false){
        checkboxes[elem.id] = true;
    }else if(checkboxes[elem.id] == true){
        checkboxes[elem.id] = false;
    }else{

    }
}