function getDistanceTime(postTime) {
    let currentTime = new Date();
    let distanceTime = currentTime - new Date(postTime);

    let miliSecond = 1000;
    let secondInHour = 3600;
    let hourInDay = 24;

    let distanceTimeInSecond = Math.floor(distanceTime / miliSecond);
    let distanceTimeInMinute = Math.floor(distanceTime / (miliSecond * 60));
    let distanceTimeInHour = Math.floor(distanceTime / (miliSecond * secondInHour));
    let distanceTimeInDay = Math.floor(distanceTime / (miliSecond * secondInHour * hourInDay));

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

document.querySelectorAll('.post-time').forEach(element => {
    let postTime = element.getAttribute('data-post-time');
    element.textContent = getDistanceTime(postTime);
});
