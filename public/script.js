var selectedRow = null

async function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            const req = {  
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            }
            const res = await fetch('/employees', req)
            if (res.ok){
                resetForm();
            }
            else{
                console.log(res)
            }
        }
        else {
            const orgEmail =document.getElementById('orgEmail').value
            updateRecord(formData);
            const req = {  
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            }
            const res = await fetch(`/employees/${orgEmail}`, req)
            if (res.ok){
                resetForm();
            }
            else{
                console.log(res)
            }
        }

    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["email"] = document.getElementById("email").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById('orgEmail').value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

async function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        const email = row.cells[1].innerHTML 
        const req = {  
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }
        const res = await fetch(`/employees/${email}`, req)
        if (res.ok){
            resetForm();
        }
        else{
            console.log(res)
        }
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

async function loadEmployees(){
    const req = { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }
     }
     const res = await fetch('/employees', req)
     if (res.ok) {
        const data = await res.json()
        data.forEach(employee =>{
            insertNewRecord(employee)
        })
     }
     
}

loadEmployees()