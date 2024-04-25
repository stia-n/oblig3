let ticketsHTML = document.getElementById("tickets");

// updates list of tickets on html
function updateArray() {
    let concat = "";
    concat += "<table>";
    concat += "<tr>" + "<td>Movie</td><td>Amount</td><td>FirstName</td><td>LastName</td><td>Phone</td><td>E-mail</td>" + "<tr>";

    // gets list of tickets from backend
    $.get("/getTickets", function (data) {
        for (let i = 0; i < data.length; i++) {
            concat += "<tr>";
            let values = Object.values(data[i]);
            let id = values[0];
            for (let j = 1; j < values.length; j++) {
                if (toggledRows.includes(id)){
                    concat += "<td><div style='display: none' class='text'>" + values[j] + "</div><input style='display: inline' class='form-control form-control-sm' value='" + values[j] + "'/>" + "</td>";
                } else {
                    concat += "<td><div style='display: block' class='text'>" + values[j] + "</div><input style='display: none' class='form-control form-control-sm' value='" + values[j] + "'/>" + "</td>";
                }
            }
            concat += "<td>" + "<button onclick='deleteTicket(" + id + ")' class='btn btn-sm btn-danger'>Delete</button>" + "</td>";
            concat += "<td>" + "<button onclick='toggleEdit(" + 'this,' + id + ")' class='btn btn-sm btn-primary'>Edit</button>" + "</td>";
            concat += "</tr>";
        }
        concat += "</table>";
        ticketsHTML.innerHTML = concat;
    });

}

// adds ticket to ticket array
function buyTicket() {
    if (validateInput()) {
        let ticketDetails = {
            movie: document.getElementById("movie").value,
            amount: Number(document.getElementById("amount").value),
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
        };

        // posts ticket to internal ticket array via spring
        $.post("/postTickets", ticketDetails, function () {
            updateArray();
            delEntries();
        });
    }
}

function deleteTickets(){
    $.ajax({
        url: 'http://localhost:8080/deleteTickets',
        type: 'DELETE',
        success: function() {
            console.log("Successfully deleted all tickets.")
            updateArray();
        }
    });
}

function deleteTicket(id){
    $.ajax({
        url: 'http://localhost:8080/deleteTicket?id=' + id,
        type: 'DELETE',
        success: function() {
            console.log("Successfully deleted ticket id: " + id)
            updateArray();
        }
    });
}

let toggledRows = [];

function toggleEdit(object, id){
    let row = object.parentNode.parentNode;
    let divs = row.querySelectorAll(".text");
    let buttons = row.querySelectorAll(".form-control");

    if (divs[1].style.display === "block"){
        divs.forEach(function(element){
            element.style.display = "none";
        });
        buttons.forEach(function(element){
            element.style.display = "block";
        });
        toggledRows.push(id)
    } else {
        divs.forEach(function(element){
            element.style.display = "block";
        });
        buttons.forEach(function(element){
            element.style.display = "none";
        });

        // java arraylist equilevant for JS for deleting numbers without knowing their index
        let index = toggledRows.indexOf(id);
        if (index !== -1) {
            toggledRows.splice(index, 1);
        }
    }

    updateTicket(row, id);
}

function updateTicket(object, id){
    let inputs = object.querySelectorAll(".form-control");

    let ticket = {
        id: id,
        movie: inputs[0].value,
        amount: inputs[1].value,
        firstName: inputs[2].value,
        lastName: inputs[3].value,
        phone: inputs[4].value,
        email: inputs[5].value,
    }

    $.post("/updateTicket", ticket, function () {
        updateArray();
    });
}

// deletes user text from input boxes
function delEntries() {
    document.getElementById("movie").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

// input validation, returns true if input is valid
function validateInput() {
    let counter = 0;

    let movie = document.getElementById("movie").value;
    let movieError = document.getElementById("movieError");
    if (movie === "") {
        movieError.innerHTML = "You must select a movie.";
        counter++;
    } else {
        movieError.innerHTML = "";
    }

    let amount = document.getElementById("amount").value;
    let amountError = document.getElementById("amountError");
    if (amount === "" || isNaN(amount)) {
        amountError.innerHTML = "You must enter a valid number.";
        counter++;
    } else {
        amountError.innerHTML = "";
    }

    let firstName = document.getElementById("firstName").value;
    let firstNameError = document.getElementById("firstNameError");
    if (firstName === "") {
        firstNameError.innerHTML = "You must enter a first name.";
        counter++;
    } else {
        firstNameError.innerHTML = "";
    }

    let lastName = document.getElementById("lastName").value;
    let lastNameError = document.getElementById("lastNameError");
    if (lastName === "") {
        lastNameError.innerHTML = "You must enter a last name.";
        counter++;
    } else {
        lastNameError.innerHTML = "";
    }

    let phone = document.getElementById("phone").value;
    let phoneError = document.getElementById("phoneError");
    const regexNumber = /^(0047|\+47|47)?\d{8}$/; // regex for norwegian phone validation
    if (phone === "" || !regexNumber.test(phone)) {
        phoneError.innerHTML = "You must enter a valid Norwegian phone number.";
        counter++;
    } else {
        phoneError.innerHTML = "";
    }

    let email = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
    const regex = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;  // regex for email validation
    if (email === "" || !regex.test(email)) {
        emailError.innerHTML = "You must enter a valid email.";
        counter++;
    } else {
        emailError.innerHTML = "";
    }

    return counter <= 0;
}

// fills boxes with test data for faster debugging and evaluating
function testData(event) {
    if (event) event.preventDefault(); // for preventing page reload

    document.getElementById("movie").value = "Oppenheimer";
    document.getElementById("amount").value = 1;
    document.getElementById("firstName").value = "Petter";
    document.getElementById("lastName").value = "Pettersen";
    document.getElementById("phone").value = 10101010;
    document.getElementById("email").value = "petter@gmail.com";
}

updateArray(); // for drawing the ticket list