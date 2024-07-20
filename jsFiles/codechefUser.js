// Provide a sort feature from latest to oldest or oldest to latest
const codechefUserButton = document.querySelector('#codechefUserButton');

codechefUserButton.addEventListener('click',function(event){
    event.preventDefault();    
    const userName = document.querySelector('#codechefUsername').value;
    axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${userName}`)
        .then(async function (response) {
            console.log(response);
            // console.log(response.data.contest_ratings);
            deletePreviousData();
            fillContestSpecificInfo(response.data.contests);
            fillPrimaryData(response);
            createContestTable(response.data.contest_ratings);
        })
        .catch(function (error) {
            location.href = "../htmlFiles/errorPage.html";
            console.log(error);
        })
})

function deletePreviousData(){
    // console.log("inside");
    document.querySelector('#contestSpecificInfo').style.display = "none";
    document.querySelector('#primaryData').style.display = "none";
    document.querySelector('#contestHistory').innerHTML = "";
}
function fillPrimaryData(response){
    const userName = document.querySelector('#userName');
    const userStar = document.querySelector('#userStar');
    const userCurrentRating = document.querySelector('#userCurrentRating');
    const userMaxRating = document.querySelector('#userMaxRating');
    const userCountryRank = document.querySelector('#userCountryRank');
    const userGlobalRank = document.querySelector('#userGlobalRank');
    // const userName = document.querySelector('userName');
    const data = response.data; 
    userName.innerHTML = data.user_details.name; 
    userStar.innerHTML = data.stars;
    userCurrentRating.innerHTML = data.rating;
    userMaxRating.innerHTML = data.highest_rating;
    userCountryRank.innerHTML = data.country_rank;
    userGlobalRank.innerHTML = data.global_rank;
    document.querySelector('#primaryData').style.display = "contents";
}

function fillContestSpecificInfo(contestsInfo){
    const  contestNameInfo = document.getElementsByClassName('contestNameInfo');
    const  contestCountryRankInfo = document.getElementsByClassName('contestCountryRankInfo');
    const  contestGlobalRankInfo = document.getElementsByClassName('contestGlobalRankInfo');
    const  contestRatingInfo = document.getElementsByClassName('contestRatingInfo');
    for(let i=0;i<3;i++){
        contestNameInfo[i].innerHTML = contestsInfo[i].name;
        contestCountryRankInfo[i].innerHTML = contestsInfo[i].country_rank;
        contestGlobalRankInfo[i].innerHTML = contestsInfo[i].global_rank;
        contestRatingInfo[i].innerHTML = contestsInfo[i].rating;
    }
    document.querySelector('#contestSpecificInfo').style.display = "contents";
}

function createContestTable(contests){
    const table = document.querySelector('#contestHistory'); 
    createTableHeader(table);
    const tbody = document.createElement('tbody');
    let index = 1,prevRating = 1500;
    for(let contest of contests){
        createrTableBody(tbody,contest,index,prevRating);
        prevRating = contest.rating;
        index++;
    }
    table.appendChild(tbody);
}

function createTableHeader(table){
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
    thead.appendChild(tr);
    thead.setAttribute('class','thead-dark');
    table.appendChild(thead);
}

function createrTableBody(tbody,contest,index,prevRating){
    const tr = document.createElement('tr'); 
    for(let i=0;i<=5;i++){
        const td = document.createElement('td');
        let content = "";
        if(i===0) content = document.createTextNode(index); 
        else if(i===1) {
            const a = document.createElement('a'); 
            const linkContent = document.createTextNode(contest.name);
            a.appendChild(linkContent);
            a.href = `https://www.codechef.com/${contest.code}?itm_campaign=contest_listing`;
            content = a;
        }
        else if(i===2) content = document.createTextNode(contest.rating);
        else if(i===3) content = document.createTextNode(prevRating);
        else if(i===4) content = document.createTextNode(contest.rank);
        else if(i===5) {
            let diff = contest.rating-prevRating;
            content = document.createTextNode(diff);
        }
        if(i===5){
            let diff = contest.rating-prevRating;
            td.appendChild(content);
            if(diff<0) td.style.color = "red";
            else td.style.color = "green";
        }
        else td.appendChild(content);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}