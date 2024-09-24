const submitButton  = document.getElementById("submitForm");
const rbuttons = document.querySelectorAll('.rButton')
let xCheckedBoxes;
const rValue = document.getElementById('currentR')
const yvalue = document.querySelector('input[id=y]')
let y = 1;
const url = "/fcgi-bin/server-1.0-jar-with-dependencies.jar";
const checked = document.querySelectorAll('input[type="checkbox"]:checked')
xCheckedBoxes = Array.from(checked).map(x => x.id)
const xList = document.querySelector('div[class="xValues card"]');

setValues();


submitButton.addEventListener('click',($event)=>{
    $event.preventDefault();
        console.log(xCheckedBoxes)
        xCheckedBoxes.forEach(checkedX => {
            if(validateParams(checkedX,y,rValue.value)){
                sendRequest(checkedX,y,rValue.value)
            }else{
                validateParams(checkedX,y,rValue.value);
            }
        })
})



function getCurrentTime(){
    const now = new Date();

    // Format the current time as a string
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    // const miliseconds = now.getMiliseconds().toString().padStart(5,'00000')
    
    // Construct the time string
    const currentTime = `${hours}:${minutes}:${seconds}`;
    // const currentTime = now.toISOString()

    return currentTime;
}

function setValues(){

    xList.addEventListener('change',($event)=>{
        if ($event.target.type === 'checkbox') {
            const checked = document.querySelectorAll('input[type="checkbox"]:checked')
            xCheckedBoxes = Array.from(checked).map(x => x.id)
          }
    })


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
    yvalue.addEventListener('change',()=>{
        y = yvalue.value
    })
}

function validateParams(x,y,r){
    let valid = true;
    if(x>2 || x<-2){
        valid = false;
        document.querySelector('.xValues').style.backgroundColor='red';
    }else if(y<-3 || y>3){
        valid = false;
        document.querySelector('.yValues').style.backgroundColor='red';
    }else if(r<1 || r>3){
        valid = false;
        document.querySelector('.rValues').style.backgroundColor='red';
    }else{
        document.querySelector('.xValues').style.backgroundColor='#6670b3';
        document.querySelector('.yValues').style.backgroundColor='#6670b3';
        document.querySelector('.rValues').style.backgroundColor='#6670b3';
    }

    return valid;
}

function sendRequest(x,yi,r){
    const fullUrl = `${url}?r=${r}&y=${yi}&x=${x}`;
    let requestSent = getCurrentTime();
    let current = Date.now();
    
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
                                                <td>${answer.r}</td>
                                                <td>${answer.inArea}</td>
                                                <td>${requestSent}</td>
                                                <td>${Date.now()-current}</td>
                                            </tr>
                                    `

        t.appendChild(r);

        console.log(answer.responseTime)

    })
    .catch(error => console.log(error));
}