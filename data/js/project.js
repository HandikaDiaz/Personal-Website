let blog = [];

function addProject(event) {
    event.preventDefault();

    let project = document.getElementById("inputProject").value;
    let description = document.getElementById("inputDescription").value;
    let image = document.getElementById("inputImage").files;

    //Date
    let startDate = new Date(document.getElementById("inputStartDate").value);
    let endDate = new Date(document.getElementById("inputEndDate").value);
    let miliSecond = 1000;
    let secondInHour = 3600;
    let hourInDay = 24;
    let dayInHour = 30;
    let monthInYear = 12;

    let durationDate = Math.abs(endDate - startDate);
    let durationYear = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour * monthInYear));
    let durationMonth = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour)) % monthInYear;
    let durationDay = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay)) % dayInHour;
    let duration = ''

    if (durationYear > 1 && durationMonth > 1) {
        duration = `${durationYear} Years ${durationMonth} Months`
    } else if (durationYear > 1 && durationMonth == 1) {
        duration = `${durationYear} Years ${durationMonth} Month`
    } else if (durationYear > 1) {
        duration = `${durationYear} Years`
    } else if (durationYear === 1 && durationMonth > 1) {
        duration = `${durationYear} Year ${durationMonth} Months`
    } else if (durationYear === 1 && durationMonth === 1) {
        duration = `${durationYear} Year ${durationMonth} Month`
    } else if (durationYear === 1) {
        duration = `${durationYear} Year`
    } else if (durationMonth > 1 && durationDay > 1) {
        duration = `${durationMonth} Months ${durationDay} Days`
    } else if (durationMonth > 1 && durationDay === 1) {
        duration = `${durationMonth} Months ${durationDay} Day`
    } else if (durationMonth > 1) {
        duration = `${durationMonth} Months`
    } else if (durationMonth === 1 && durationDay > 1) {
        duration = `${durationMonth} Month ${durationDay} Days`
    } else if (durationMonth === 1 && durationDay === 1) {
        duration = `${durationMonth} Month ${durationDay} Day`
    } else if (durationMonth === 1) {
        duration = `${durationMonth} Month`
    } else if (durationDay > 1) {
        duration = `${durationDay} Days`
    } else {
        duration = `${durationDay} Day`
    }

    //Checked box
    const checkSwift = '<img src="image/swift.png">';
    const checkRuby = '<img src="image/ruby.png">';
    const checkPhyton = '<img src="image/phython.png">';
    const checkJavascript = '<img src="image/js.png">';

    let swift = document.getElementById("swift").checked ? checkSwift : "";
    let ruby = document.getElementById("ruby").checked ? checkRuby : "";
    let phyton = document.getElementById("phyton").checked ? checkPhyton : "";
    let javascript = document.getElementById("javascript").checked ? checkJavascript : "";

    if (project == "") {
        alert("Name of your project must be filled in");
        return;
    } else if (startDate == "") {
        alert("Start date your project must be filled in");
        return;
    } else if (endDate == "") {
        alert("End date your project must be filled in");
        return;
    } else if (description == "") {
        alert("Description your project must be filled in");
        return;
    } else if (image == "") {
        alert("Image your project must be filled in");
        return;
    }

    image = URL.createObjectURL(image[0]);
    console.log(image);

    const group = {
        project,
        startDate,
        endDate,
        description,
        swift, ruby, phyton, javascript,
        image,
        date: new Date(),
        durationMonth,
        durationDay,
        duration
    };

    blog.push(group);
    localStorage.setItem('blog', JSON.stringify(blog));
    console.log(blog);

    renderProject();

    document.getElementById("form").reset();
};

function renderProject() {
    document.getElementById("new-page").innerHTML = "";

    for (let i = 0; i < blog.length; i++) {
        document.getElementById("new-page").innerHTML += `
        <div class="card">
        <a href="project.html?id=${i}" target="_blank">
            <img src="${blog[i].image}" alt="">
        </a>
        <h1>${blog[i].project}</h1>
        <p class="text-secondary">Durasi : ${blog[i].duration}</p>
        <p>${blog[i].description}</p>
        <div class="image-card">
            <img src="image/ps.png" alt="">
            <img src="image/android.png" alt="">
            <img src="image/java.png" alt="">
        </div>
        <p class="text-end text-secondary">${getDistanceTime(blog[i].date)}</p>
        <div class="button-card">
            <a href="#" class="edit-card">Edit</a>
            <a href="#" class="delete-card">Delete</a>
        </div>
    </div>`;
    }
};

function getFullDate(time) {
    let nameOfMonth = [
        "Januari",
        "Februari",
        "maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    let date = time.getDate();
    let month = nameOfMonth(time.getMonth());
    let year = time.getFullYear();

    let hour = time.getHours();
    let minute = time.getMinutes();

    return `${date} ${month} ${year} - ${hour}:${minute} WIB`;
};

function getDistanceTime(time) {
    let postTime = time;
    let currentTime = new Date();

    let distanceTime = currentTime - postTime;

    let miliSecond = 1000;
    let secondInHour = 3600;
    let hourInDay = 24;

    let distanceTimeInSecond = Math.floor(distanceTime / miliSecond);
    let distanceTimeInMinute = Math.floor(distanceTime / (miliSecond * 60));
    let distanceTimeInHour = Math.floor(distanceTime / (miliSecond * secondInHour));
    let distanceTimeInDay = Math.floor(distanceTime / (miliSecond * secondInHour * hourInDay))

    if (distanceTimeInDay > 1) {
        return `${distanceTimeInDay} Days ago`
    } else if (distanceTimeInDay === 1) {
        return `${distanceTimeInDay} Day ago`
    } else if (distanceTimeInHour > 1) {
        return `${distanceTimeInHour} Hours ago`
    } else if (distanceTimeInHour === 1) {
        return `${distanceTimeInHour} Hour ago`
    } else if (distanceTimeInMinute > 1) {
        return `${distanceTimeInMinute} Minutes ago`
    } else if (distanceTimeInMinute === 1) {
        return `${distanceTimeInMinute} Minute ago`
    } else if (distanceTimeInSecond > 1) {
        return `${distanceTimeInSecond} Seconds ago`
    } else {
        return `${distanceTimeInSecond} Second ago`
    }
}

setInterval(() => {
    renderProject();
}, 5000);