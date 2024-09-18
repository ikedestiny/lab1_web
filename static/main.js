const submitButton  = document.getElementById("submitForm");
const rbuttons = document.querySelectorAll('.rButton')
const xRadios = document.querySelectorAll('input[name="x"]')
let xValue = -2;
const rValue = document.getElementById('currentR')
const yvalue = document.querySelector('input[id=y]')
let y = 0;
const url = "helios.cs.ifmo.ru:28012/fcgi-bin/server-1.0-jar-with-dependencies.jar";


setValues();



submitButton.addEventListener('click',($event)=>{
    const fullUrl = `${url}?r=${rValue.value}&y=${y}&x=${xValue}`;
    $event.preventDefault();
    const now = new Date();

    // Format the current time as a string
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    // const miliseconds = now.getMiliseconds().toString().padStart(5,'00000')
    
    // Construct the time string
    // const currentTime = `${hours}:${minutes}:${seconds}:${miliseconds}`;
    const currentTime = now.toISOString()
    
fetch(fullUrl)
    .then(response => response.json())
    .then(answer => {
        console.log(answer)
        console.log(`${answer.x+" "+answer.y+" "+answer.inArea+" "+answer.responseTime}`)
        let t = document.querySelector("#resultTable");
        var r = document.createElement("tr");
        if(!answer.inArea){
            r.style.backgroundColor = 'red';
        }else{
            r.style.backgroundColor = 'green';
        }
        r.innerHTML = `
                                             <tr>
                                                <td>${answer.x}</td>
                                                <td>${answer.y}</td>
                                                <td>${answer.inArea}</td>
                                                <td>${currentTime}</td>
                                                <td>${answer.responseTime}</td>
                                            </tr>
                                    `

        t.appendChild(r);

        console.log(answer.responseTime)

    })
    .catch(error => console.error(error));



})








function setValues(){
    rbuttons.forEach(
        button =>{
            button.addEventListener(
                'click', ($event)=>{
                        $event.preventDefault();
                        rValue.value = button.textContent;
                }
            );
        }
    );
    
    xRadios.forEach(
        radio =>{
    
            radio.addEventListener('click',()=>{
                xValue = radio.id
            })
        }
    )
    
    yvalue.addEventListener('change',()=>{
        y = yvalue.value
    })
}
