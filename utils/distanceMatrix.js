const axios = require('axios');


const calculateDistance = axios.create({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
});

const distanceMatrix = async(origin, destination) => {

    let urlObject = {
        apiKey: 'AIzaSyBi6G3TVSD87DXVWjm7PGG1cIz4MV7lfWA',
        language: "en-EN",
        mode: "driving",
        units: "imperial",
        region: "uk",
        origins: origin,
        destination: destination
    }

    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?region=" + urlObject.region + "&units=" + urlObject.units + "&origins=" + urlObject.origins + "&destinations=" + urlObject.destination + "&mode=" + urlObject.mode + "&language=" + urlObject.language + "&key=" + urlObject.apiKey + "";
    console.log(url);
    const res = await calculateDistance.get(url);

    if (res.data.status = 'OK') {
        return res.data.rows[0].elements[0];
    }

    return false;
}

module.exports = {
    distanceMatrix
}