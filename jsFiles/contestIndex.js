// todo : add the time feature in front of the contest


const bodyClass = document.querySelector('body'); 

console.log(bodyClass.id);

if(bodyClass.id==="contestPageBody"){
    mainFunction();
    function mainFunction(){
        axios.get(`https://codeforces.com/api/contest.list`)
            .then(function (response) {
                console.log(response.data.result);
                const contests = response.data.result;
                const table = document.querySelector('#contestTable');
                createTableHead(table);
                const tbody = document.createElement('tbody');
                let index = 1;
                for(let contest of contests){
                    // console.log(contest.id+" : "+contest.name); 
                    createTableBody(contest,tbody,index); 
                    index++;
                    // todo: =========
                    // TODO: Just add the feauture that when user cilck on more then further contest are appended
                    // todo : ========
                    if(index>200) break;
                }
                table.appendChild(tbody);
            })
            .catch(function (error) {
                location.href = "../htmlFiles/errorPage.html";
                console.log(error);
            })
    }
    function createTableHead(table){
        const thead = document.createElement('thead'); 
        for(let i=0;i<4;i++){
            const th = document.createElement('th');
            let content = document.createTextNode('Serial Number'); 
            if(i===1) content = document.createTextNode('Contest Name'); 
            else if(i===2) content = document.createTextNode('Status'); 
            else if(i===3) content = document.createTextNode('Duration'); 
            th.appendChild(content);
            thead.appendChild(th);
        }
        table.appendChild(thead);
    }
    
    function createTableBody(contest,tbody,index){
        const tr = document.createElement('tr');
        for(let i=0;i<4;i++){
            const td = document.createElement('td'); 
            let content = document.createTextNode(index); 
            if(i===1) content = document.createTextNode(contest.name); 
            else if(i===2) {
                if(contest.phase=="BEFORE") content = document.createTextNode('Upcoming');
                else  content = document.createTextNode('Finished');
            }
            else if(i===3) {
                // console.log("type of = " +typeof(dateValue));
                let duration = contest.durationSeconds; 
                let hr = Math.floor(duration/3600); 
                let min = (duration-hr*3600)/60;
                if(min<=9){
                    min = "0"+min;
                }
                if(hr>=24){
                    const days = Math.floor(duration/(24*60*60)); 
                    hr = (days*24*3600-duration)/3600;
                    if(hr==0 && min==0) content = document.createTextNode(`${days} days`);
                    else content = document.createTextNode(`${days} days ${hr} hours ${min} minutes`);
                }
                else{
                    content = document.createTextNode(`${hr} hours  ${min} minutes`); 
                }
                
            }
            td.appendChild(content);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

// document.querySelector('#contestPage').addEventListener('click',function(){
//     axios.get(`https://codeforces.com/api/contest.list`)
//         .then(function (response) {
//             console.log(response.data.result);
//             const contests = response.data.result;
//             const table = document.querySelector('#contestTable');
//             createTableHead(table);
//             const tbody = document.createElement('tbody');
//             let index = 1;
//             for(let contest of contests){
//                 // console.log(contest.id+" : "+contest.name); 
//                 createTableBody(contest,tbody,index); 
//                 index++;
//                 if(index>=100) break;
//             }
//             table.appendChild(tbody);
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// })


// function createTableHead(table){
//     const thead = document.createElement('thead'); 
//     for(let i=0;i<4;i++){
//         const th = document.createElement('th');
//         let content = document.createTextNode('Serial Number'); 
//         if(i===1) content = document.createTextNode('Contest Name'); 
//         else if(i===2) content = document.createTextNode('Status'); 
//         else if(i===3) content = document.createTextNode('Duration'); 
//         th.appendChild(content);
//         thead.appendChild(th);
//     }
//     table.appendChild(thead);
// }

// function createTableBody(contest,tbody,index){
//     const tr = document.createElement('tr');
//     for(let i=0;i<4;i++){
//         const td = document.createElement('td'); 
//         let content = document.createTextNode(index); 
//         if(i===1) content = document.createTextNode(contest.name); 
//         else if(i===2) {
//             if(contest.phase=="BEFORE") content = document.createTextNode('Upcoming');
//             else  content = document.createTextNode('Finished');
//         }
//         else if(i===3) {
//             // console.log("type of = " +typeof(dateValue));
//             let duration = contest.durationSeconds; 
//             let hr = Math.floor(duration/3600); 
//             let min = (duration-hr*3600)/60;
//             if(min<=9){
//                 min = "0"+min;
//             }
//             if(hr>=24){
//                 const days = Math.floor(duration/(24*60*60)); 
//                 hr = (days*24*3600-duration)/3600;
//                 if(hr==0 && min==0) content = document.createTextNode(`${days} days`);
//                 else content = document.createTextNode(`${days} days ${hr} hours ${min} minutes`);
//             }
//             else{
//                 content = document.createTextNode(`${hr} hours  ${min} minutes`); 
//             }
            
//         }
//         td.appendChild(content);
//         tr.appendChild(td);
//     }
//     tbody.appendChild(tr);
// }

// function toDateTime(secs) {
//     var t = new Date(1970, 0, 1); // Epoch
//     t.setSeconds(secs);
//     return t;
// }