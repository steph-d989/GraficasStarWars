const url1 = 'https://swapi.dev/api/films/';
const url2 = 'https://swapi.dev/api/people/'
const pelicula = [];
const ano = [];
const ctx = document.getElementById('myChart');
const ctx1 = document.getElementById('myChart1');
const personaje = [];
const numeroPeliculas = [];

const llamarAPIPrimero = async () => {
    try {
        const response = await fetch(url1)
        if (response.ok) {
            const data = await response.json()
            return data.results
        } else {
            throw `No se encontró la URL`
        }
    } catch (error) {
        console.log(error);
    }
}

const llamarAPISegundo = async() => {
    try {
        const response = await fetch(url2)
        if (response.ok) {
            const data = await response.json()
            return data.results
        }else{
            throw `No se encontro la URL`
        }
    } catch (error){
        console.log(error)
    }
}

const callAsyncLogic = async()=>{
    const results = await llamarAPISegundo();
    console.log(results)
    results.forEach((element)=>{
        personaje.push(element.name)
        numeroPeliculas.push(element.films.length)
    })
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: personaje,
            datasets: [{
                label: 'Películas',
                data: numeroPeliculas,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
callAsyncLogic();

/* async function callAsyncLogic() {
    const results = await llamarAPI();
    console.log(results);

}

callAsyncLogic(); */



llamarAPIPrimero()
    .then(resp => {
        console.log(resp);
        resp.forEach((elemento) => {
            pelicula.push(elemento.title);
            ano.push(parseInt(elemento.release_date));
        })

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: pelicula,
                datasets: [{
                    label: 'año',
                    data: ano,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });


    })

    .catch(error => {
        console.log(error)
    })




