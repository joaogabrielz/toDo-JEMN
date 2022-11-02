let ListatarefasLocal = []

async function addTarefa(){

    let tarefaInput = document.getElementById('tarefa').value

    if(!tarefaInput)
        alert("Porfavor preencha os campos")
    else{
        // if(Listatarefas.length > 7){
        //     alert("Porfavor delete uma tarefa para caber mais");
        // }
        if(tarefaInput.length > 17){
            alert(`
            "Porfavor apenas tarefas com menos de 17 caracteres, tarefa atual tem[${tarefaInput.length}]`)
        }
        else{
            const data = {
                descricao: tarefaInput,
                concluida: false
            }

           try {
            let res = await fetch("http://127.0.0.1:3000/tasks", {
                method: "POST",
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            // let tarefa = await res.json()
            // console.log(tarefa)
            showTarefa();
            cleanCampo();
           } 
           catch (error) {
            console.log("Ocorreu um erro ao adicionar: " + error)
           }
        }
        
    }   
}

async function showTarefa(){

    try {
        // Method GET
    const res = await fetch("http://127.0.0.1:3000/tasks")
    let tarefas = await res.json()

    let tarefasLista = document.getElementById('tarefasLista')
    tarefasLista.innerHTML = '';

    for (let i = 0; i < tarefas.length; i++) {
       
        //nao marca com linha 
        if(tarefas[i].concluida == false){
            tarefasLista.innerHTML += 
            `
            <div class="tarefa">
            <input type="checkbox" id="checkTarefa" onchange="toggleLine(event, ${i})">
            <p>${tarefas[i].descricao}</p>
            <div>
             <span class="edit" >
             <img id="editImg" onclick="editCampo(${i})">
             </span>
             <span class="delete">
             <img id="deleteImg" onclick="deleteCampo(${i})">
             </span>
             </div>
            </div>
            `        
        }
         //Marca com linha
        else{
            tarefasLista.innerHTML += 
            `
            <div class="tarefa">
            <input type="checkbox" id="checkTarefa" checked="checked" onchange="toggleLine(event, ${i})">
            <p class="lined">${tarefas[i].descricao}</p>
            <div>
             <span class="edit" >
             <img id="editImg" onclick="editCampo(${i})">
             </span>
             <span class="delete">
             <img id="deleteImg" onclick="deleteCampo(${i})">
             </span>
             </div>
            </div>
            `        
        } 
    }

    ListatarefasLocal = tarefas

    } 
    catch (error) {
        console.log("Ocorreu um erro ao listar: " + error)
    }
    
 }

function toggleLine(e, item){

    // let divPai = e.target.parentNode;
    // let tarefaChecked = divPai.querySelector('p');    
    // tarefaChecked.classList.toggle('lined')

    ListatarefasLocal.forEach(async (element,index) => {
        if(index == item){
            if(window.confirm("Tem certeza que deseja marcar como concluida? ")){
            let marcarComoConcluida = false;

            if(element.concluida == false){
                marcarComoConcluida = true;
            }
         
            const data = {
                descricao: element.descricao,
                concluida: marcarComoConcluida
            }
            try {           
                let res = await fetch(`http://127.0.0.1:3000/tasks?id=${element._id}`, {
                    method: "PUT",
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)                           
                })
               
            showTarefa();   
            }     
            catch (error) {
                console.log("Ocorreu um erro ao marcar como concluida: " + error)
            }  
            } 

            else{
            let divPai = e.target.parentNode;
            let checkTarefa = divPai.querySelector('#checkTarefa');  
             if(element.concluida == false){        
                checkTarefa.checked = false;
             }
             else{
                checkTarefa.checked = true;
             }
            }
           }
   });
}

function deleteCampo(item) {
// console.log(ListatarefasLocal)
//     console.log(item)

    ListatarefasLocal.forEach(async (element,index) => {
    if(index == item){
        if(window.confirm("Tem certeza que deseja excluir? ")){
            try {
            let res = await fetch(`http://127.0.0.1:3000/tasks?id=${element._id}`, {
                method: "DELETE"
            })
            // console.log(res)
             showTarefa();   
            } 
            catch (error) {
                console.log("Ocorreu um erro ao deletar: " + error)
            }                    
        } 
        }
    });

    
}

function editCampo(item){

    let tarefaInput = document.getElementById('tarefa').value

    if(tarefaInput) {
    ListatarefasLocal.forEach(async (element,index) => {
        if(index == item){
            // console.log(element)
            if(window.confirm("deseja Editar tarefa ["+ element.descricao + "]?")){
            const data = {
                descricao: tarefaInput,
                concluida: element.concluida
            }
            try {           
                let res = await fetch(`http://127.0.0.1:3000/tasks?id=${element._id}`, {
                    method: "PUT",
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    
                })

                showTarefa();   
                cleanCampo();
                } 
            catch (error) {
                console.log("Ocorreu um erro ao editar: " + error)
            }                    
            } 
             }
        });
       
    }
    else{
        alert("Para editar, insira alguma tarefa no campo de nova tarefa e clique em editar.")
    }
}

function cleanCampo(){
    document.getElementById('tarefa').value = ""
}