const urlAdd = "http://localhost:3000/todolist"

import { PATCH, GET, DELETE, POST } from "./utils.js";

const containerCard = document.querySelector(".container-card")
const formEdit = document.querySelector(".formEdit")

let id;

// FORM POST
const formTask = document.forms.todolist 
const element = formTask.elements 

formTask.addEventListener("submit", (e) =>{
    e.preventDefault();

    const data = {
        id: id+1,
        task: element.taskName.value
    }

    //METODO POST
    POST(urlAdd, data)
    .then(() => location.reload())

})

window.onload = GET(urlAdd)
.then((resTask) => {
    id = resTask[resTask.length-1].id 
    resTask.map((res) => createCardTask(urlAdd, res.id, res))
});

// FORM PATCH
const formEditPatch = document.forms.formEditPatch;
const elementEdit = formEditPatch.elements;

formEditPatch.addEventListener("submit", (e) => {
    e.preventDefault()

    id = elementEdit.idTask.value

    const data = {
        task: elementEdit.nameTask.value
    }

    PATCH(urlAdd, id, data)
    .then(() => location.reload())
    .catch(e => console.log(e))
})

// CREAZIONE CARD //

const createCardTask = (urlAdd, id, resTask) => {

    const cardTask = document.createElement("div")
    const cointainerTask = document.createElement("div")
    const taskContent = document.createElement("span")
    const containerBtn = document.createElement("div")

    const btnOpenMenu = document.createElement("button")
    const btnEdit = document.createElement("button")
    const btnDel = document.createElement("button")
    const btnClosenMenu = document.createElement("button")

    const imgBtnOpenMenu = document.createElement("img")
    const imgBtnEdit = document.createElement("img")
    const imgBtnDel= document.createElement("img")
    const imgBtnCloseMenu = document.createElement("img")

    cardTask.className = "cardTask"
    cointainerTask.className = "cointainerTask"
    taskContent.textContent = resTask.task
    taskContent.className = "taskContent"
    containerBtn.className = "containerBtn"

    btnOpenMenu.className = "btnOpenMenu"
    btnEdit.className = "btnEdit"
    btnDel.className = "btnDel"
    btnClosenMenu.className = "btnClosenMenu"

    imgBtnOpenMenu.setAttribute("src", "./assets/menuoption.png")
    imgBtnOpenMenu.setAttribute("alt", "icona apertura menu")
    imgBtnOpenMenu.className = "imgBtnOpenMenu"

    imgBtnEdit.setAttribute("src", "./assets/editimg2.png")
    imgBtnEdit.setAttribute("alt", "icona modifica")
    imgBtnEdit.className = "imgBtnEdit"

    imgBtnDel.setAttribute("src", "./assets/delimg.png")
    imgBtnDel.setAttribute("alt", "icona modifica")
    imgBtnDel.className = "imgBtnDel"

    imgBtnCloseMenu.setAttribute("src", "./assets/closemenu.png")
    imgBtnCloseMenu.setAttribute("alt", "icona chiusura menu")
    imgBtnCloseMenu.className = "imgBtnCloseMenu"
    
    btnOpenMenu.append(imgBtnOpenMenu)
    btnEdit.append(imgBtnEdit)
    btnDel.append(imgBtnDel)
    btnClosenMenu.append(imgBtnCloseMenu)

    containerBtn.append(btnEdit, btnDel, btnOpenMenu, btnClosenMenu)
    cointainerTask.append(taskContent, containerBtn)
    cardTask.append(cointainerTask, formEdit)
    containerCard.append(cardTask)

    btnDel.addEventListener("click", (e) => {
        e.preventDefault()
        DELETE(urlAdd, id)
    })

    btnEdit.addEventListener("click", () => {
        
        const formEditPatch = document.forms.formEditPatch;
        const elements = formEditPatch.elements;
        
        elements.idTask.value = id;

        formEdit.style = "display:block"
        cardTask.append(formEdit)
        
    })

   
    btnOpenMenu.addEventListener("click", () => {

        btnOpenMenu.style = "display:none"
        btnEdit.style = "display:block"
        btnDel.style = "display:block"
        btnClosenMenu.style = "display:block"
        taskContent.style="width:200px"

    })

    btnClosenMenu.addEventListener("click", () => {
        
        btnOpenMenu.style = "display:block"
        btnEdit.style = "display:none"
        btnDel.style = "display:none"
        btnClosenMenu.style = "display:none"
        taskContent.style="width:260px"
        formEdit.style = "display:none"

    })

}