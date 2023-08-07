const userData = document.getElementById("user_data");
const setDate = ()=>{
    const Dob = document.getElementById('dob');
    const currDate = new Date();
    let maxDob = new Date(currDate.getFullYear() - 55,currDate.getMonth(),currDate.getDate());
    let minDob = new Date(currDate.getFullYear() - 18,currDate.getMonth(),currDate.getDate());
    maxDob = maxDob.toISOString().substring(0,10);
    minDob = minDob.toISOString().substring(0,10);
    Dob.setAttribute('min',maxDob);
    Dob.setAttribute('max',minDob);
}
setDate();
const getData = () => {
    let data = sessionStorage.getItem("savedUserData");
    if(data){
        data = JSON.parse(data);
    }else{
        data = [];
    }
    return data;
}
let dataArray = getData();
const displayData = () => {
    const entries = getData();
    const tableData = entries.map((entry) => {
        const nameCell = '<td>'+ entry.name + '</td>';
        const emailCell = '<td>'+ entry.email + '</td>';
        const passCell = '<td>' + entry.password + '</td>';
        const acceptTermCell = '<td>' + entry.acceptTerms + '</td>';
        const dobCell = '<td>' + entry.dob + '</td>';

        const row = '<tr>' + nameCell + emailCell + passCell + acceptTermCell + dobCell + '</tr>';
        
        return row;
    }).join("\n");
   const table = '<table><tr> <th> Name </th> <th>Email</th> <th>Password</th> <th>Accepted Terms</th> <th>Date of Birth</th> </tr>' +tableData + '</table>';

   let details = document.getElementById("showTable");
   details.innerHTML = table;
}
const saveUserdata = (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerm').checked;

        checkValidity(dob);

        const entry = {
            name,
            email,
            password,
            dob,
            acceptTerms
        }

        dataArray.push(entry);
        sessionStorage.setItem("savedUserData", JSON.stringify(dataArray));
         displayData();
}
const checkValidity = (element) => {
    const dobDate = new Date(element);
    const currDate = new Date();
    
    const age = currDate.getFullYear() - dobDate.getFullYear();
    

    if(age<18 || age>55){
        element.setCustomValidity("Please enter a valid Date of Birth between age 18 to 55.");
        element.reportValidity();
    }
}

userData.addEventListener('submit' , saveUserdata);
displayData();
