let coordinates = []

$(document).ready(function () {
    get_coordinates()
    getWeather()
})


async function getWeather() {
    await $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.location_lat}&lon=${coordinates.location_lng}&appid=6c97b653331c4ff7ff3a3531cd49c953`,
        type: "get",
        success: function (res) {

            let name = res.name
            let weather = res.weather[0].main

            console.log(name)
            console.log(weather)

            celsius = res.main.temp - 273.15
            console.log(celsius)

            $("#scene_container").append(
                `
                    <a-entity gps-entity-place="latitude: ${coordinates.location_lat}; longitude: ${coordinates.location_lng}">
                        <a-entity>
                            <a-text height="50" value="Weather: ${weather} at ${name}"></a-text>
                            <a-text height="50" value="Temperature: ${celsius}°C"></a-text>
                            <a-text height="50" value="Temperature: ${celsius}°C"></a-text>
                        </a-entity>
                    </a-entity>
                `
            )
        },
    })
}

function get_coordinates() {
    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has("success")) {
        let location = searchParams.get("success")

        coordinates.location_lat = location.split(";")[0]
        coordinates.location_lng = location.split(";")[1]

    } else {
        alert("Destination is not selected!!!")
        window.history.back()
    }
}




