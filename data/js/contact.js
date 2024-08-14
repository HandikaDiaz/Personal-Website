function getData(){
    let name = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmail").value;
    let number = document.getElementById("inputNumber").value;
    let select = document.getElementById("inputSelect").value;
    let massage = document.getElementById("inputMassage").value;

    const pattern = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;
    const group = [name, email, number, select, massage];

    if(name == "") {
        alert("Name must be filled in");
        return;
    } else if(email == "") {
        alert("Email must be filled in");
        return;
    } else if(number == ""  || !pattern.test(number)) {
        alert("Number must be filled in and follow the correct format");
        return;
    } else if (select == "") {
        alert("Select must be filled in");
        return;
    } else if (massage == "") {
        alert("Massage must be filled in");
        return;
    }

    let myEmail = "handikaalexandriadiaz@gmail.com"
    let mySubject = "Developer"
    let sendMassage = document.createElement("a");
    sendMassage.href = `mailto:${myEmail}?subject=${mySubject}&body= "My name : ${name}, My email : ${email}, My number : ${number}, My select : ${select}, My massage : ${massage}"`;
    sendMassage.click();
    
    document.getElementById("form").reset();
}