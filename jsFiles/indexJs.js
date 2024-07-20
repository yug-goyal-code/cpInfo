// https://github.com/Abhijeet-AR/Competitive_Programming_Score_API


// ! Figure out how to resolve the cors error in the leetcode api
const findUserButton = document.querySelector('#findUserButton');

function searchUser(){
    const searchValue = document.querySelector('#inputValue').value;
    axios.get(`https://codeforces.com/api/user.info?handles=${searchValue}`)
        .then(async function (response) {
            // handle success

            await clearPreviousDataAndHide();
            console.log(response);

            const header = response.data.result[0];
            console.log("header="+header);

            await primaryData(response);
            await getRatingChange(searchValue);
            // });
        })
        .catch(function (error) {
            location.href = "../htmlFiles/errorPage.html";
            console.log(error);
        })

}
function clearPreviousDataAndHide(){
    // Deleting table data and set iys display to none 
    document.querySelector('#tableDiv').innerHTML = "";


    // set hiddentElement data 
    document.querySelector('#contributionField').innerHTML = ""; 
    document.querySelector('#friendsField').innerHTML = "";
    document.querySelector('#organisationField').innerHTML = "";
    document.querySelector('#usernameField').innerHTML = ""; 
    document.querySelector('#currentRatingField').innerHTML = ""; 
    document.querySelector('#maxRatingField').innerHTML = ""; 
    document.querySelector('#rankField').innerHTML = ""; 
    document.querySelector('.hiddenElementContent').style.display = "none";
}


function primaryData(response) {
    const header = response.data.result[0];
    const usernameField = document.querySelector('#usernameField');
    const currentRatingField = document.querySelector('#currentRatingField');
    const maxRatingField = document.querySelector('#maxRatingField');
    const rankField = document.querySelector('#rankField'); 
    const userImageField = document.querySelector('#userImageField');
    const hiddenElementContent = document.querySelector('.hiddenElementContent');
    const contributionField = document.querySelector('#contributionField'); 
    const friendsField = document.querySelector('#friendsField'); 
    const organisationField = document.querySelector('#organisationField'); 
    contributionField.innerHTML = header.contribution; 
    friendsField.innerHTML = header.friendOfCount; 
    organisationField.innerHTML = header.organization;
    hiddenElementContent.style.display = "contents";
    usernameField.innerHTML = header.firstName+" "+header.lastName;
    currentRatingField.innerHTML = header.rating; 
    maxRatingField.innerHTML = header.maxRating; 
    rankField.innerHTML = header.rank;
    userImageField.src = header.titlePhoto;
}
findUserButton.addEventListener('click', function(event){
    event.preventDefault();
    searchUser();
})

function getRatingChange(searchValue){
    console.log("user search = "+searchValue);
    axios.get(`https://codeforces.com/api/user.rating?handle=${searchValue}`)
        .then(async function (response) {
            console.log(response.data);
            const mainData = response.data.result; 
            const length = mainData.length; 
            const table = document.createElement('table');
            table.setAttribute('id','contestHistory'); 
            table.className = "table table-bordered";
            createTableHead(table);
            for(let i=(length-1);i>=0;i--){
                const tbody = document.createElement('tbody'); 
                createTable(i,mainData,length,tbody);
                table.appendChild(tbody);
            }
            document.querySelector('#tableDiv').appendChild(table);
            document.querySelector('#tableDiv').style.display = "contents";
            
        })
        .catch(function (error) {
            location.href = "../htmlFiles/errorPage.html";
            console.log(error);
        })
}

function createTableHead(table){
    const thead = document.createElement('thead'); 
    const tr = document.createElement('tr'); 
    for(let i=0;i<=5;i++){
        const th = document.createElement('th');
        let content = ""; 
        if(i===0) content = document.createTextNode('Serial number'); 
        else if(i===1) content = document.createTextNode('Contest name');
        else if(i===2) content = document.createTextNode('New rating');
        else if(i===3) content = document.createTextNode('Old rating');
        else if(i===4) content = document.createTextNode('Rank');
        else if(i===5) content = document.createTextNode('Rating change');
        th.appendChild(content);
        tr.appendChild(th);
    }
    // return thead;
    thead.appendChild(tr);
    table.appendChild(thead);
}

function createTable(i,mainData,length,tbody) {
    const tr = document.createElement('tr');
    const td = document.createElement('td'); 
    let content = document.createTextNode(length-i);
    td.appendChild(content);
    tr.appendChild(td);
    for(let j=1;j<=5;j++){
        const td1 = document.createElement('td'); 
        let content1 = "";
        if(j===1) {
            const a = document.createElement('a'); 
            const innerText = document.createTextNode(mainData[i].contestName);
            a.appendChild(innerText); 
            a.href = `https://codeforces.com/contest/${mainData[i].contestId}`;
            content1 = a;
        }
        else if(j===2) content1 = document.createTextNode(mainData[i].newRating);
        else if(j===3) content1 = document.createTextNode(mainData[i].oldRating);
        else if(j===4) content1 = document.createTextNode(mainData[i].rank);
        else if(j===5){
            let diff = mainData[i].newRating-mainData[i].oldRating;
            content1 = document.createTextNode(diff);
        }
        if(j==5){
            let diff = mainData[i].newRating-mainData[i].oldRating;
            if(diff<0) td1.style.color = "red";
            else if(diff>0) td1.style.color = "green";
            else td1.style.color = "grey";
            td1.appendChild(content1);
        }
        else{
            td1.appendChild(content1);
        }
        tr.appendChild(td1);
    }
    tbody.appendChild(tr);
}