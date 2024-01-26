//edit task content
//remove error not working
//edit project field
//storage

import './styles.css';
import toDo from './display';
import preTasks from './default';

const toDoContainer = document.querySelector("#toDoContainer");
let projectList = [{full:"Work",short:"work"},{full:"Friend",short:"friend"},{full:"Home",short:"home"}];
let prevBtn=null;
let toDoList = [...preTasks];
const editProjectContainer = document.querySelector('#editProjectContainer');

const addTasks = ( function (){
    const toDoForm = document.querySelector('#toDoForm');
    const inputs = document.querySelectorAll(".data");
    //get info from the form
    
    function addToArray(e) {
        //const newToDo = getTaskInput();
        toDoList.push(e);
        storage.populateStorage();
        toDoForm.reset();
        pageEffect.hiddenForm();
        document.getElementById("allTasks").click() //return to all tasks page
    }

    function err(arr){
        arr.forEach(d => {d.addEventListener("invalid",
        event => {d.classList.add("error");});
    })};

    function getTaskInput() {
        const title = document.querySelector('#toDotitle').value;
        const description = document.querySelector('#toDoDescription').value;
        const priority = document.querySelector('#priority').value;
        const dueDate = document.querySelector('#dueDate').value;
        const project = document.querySelector('#myProjects').value;
        const taskErrMsg = document.querySelector("#taskErrMsg");
        if (title === "" | priority === ""| dueDate === ""| project === ""){
            err(inputs);
            taskErrMsg.textContent = "Please fill out all the required fields."; 
        }else{
            const e = new toDo(title, description, priority, dueDate, project);
            addToArray(e);}
    } 
    return {getTaskInput, addToArray};
    })();

const pageEffect = ( function (){    
    const formTitle = document.querySelector('.formTitle');

    //add title bar to tasks container
    function toDoBar(){
        const toDoBar = document.createElement("div");
        toDoBar.classList.add("toDoBar");
        const check = document.createElement('p');
        check.appendChild(document.createTextNode("Check"));
        const tasks = document.createElement('p');
        tasks.appendChild(document.createTextNode("Tasks"));
        const project = document.createElement('p');
        project.appendChild(document.createTextNode("Project"));
        const priority = document.createElement('p');
        priority.appendChild(document.createTextNode("Priority"));
        const dueDate = document.createElement('p');
        dueDate.appendChild(document.createTextNode("Due Date"));
        const action = document.createElement('p');
        action.appendChild(document.createTextNode("Action"));
        toDoBar.append(check, tasks, project, priority, dueDate, action);
        toDoContainer.append(toDoBar);
    }
    //highlight the active page button    
    function highlightActiveBtn(){ 
        if(prevBtn) {
            prevBtn.style.backgroundColor = "#FFFFFF00";
            prevBtn.style.color = "#F5F5F5";        
        }
        let target = event.currentTarget;
        target.style.backgroundColor="#F5F5F5";
        target.style.color="#1D322F";
        //selected = true;                 
        prevBtn = target
    };

    function activeForm(e){
        formContainer.classList.add("active")
        if (e.target.id === "myProject") 
            {formTitle.textContent = "Add a Task";
            addProjectForm.classList.remove("hidden");
            toDoForm.classList.add("hidden");
            editProjectContainer.classList.add("hidden");
        }else if (e.target.id === "myTask"){
            formTitle.textContent = "Add a Project";
            toDoForm.classList.remove("hidden");
            addProjectForm.classList.add("hidden");
            editProjectContainer.classList.add("hidden");
        }else if (e.target.id === "editProject"){
            formTitle.textContent = "Edit Project List";
            editProjectContainer.classList.remove("hidden");
            addProjectForm.classList.add("hidden");
            toDoForm.classList.add("hidden");
            editProjectList();
        }
    }

    function hiddenForm(){
        const inputs = document.querySelectorAll(".data");
        const errMsg = document.querySelectorAll(".errMsg");
        errMsg.forEach(err => {err.textContent = ""});
        inputs.forEach(input => {input.classList.remove("error")});
        formContainer.classList.remove("active");
        addProjectForm.classList.add("hidden");
        toDoForm.classList.add("hidden")
        editProjectContainer.classList.add("hidden");
        toDoForm.reset();
        addProjectForm.reset();
    };

    function cancelBtn () {
        document.querySelectorAll('.cancel').forEach(btn => {btn.addEventListener('click', hiddenForm)})
    };
    return {toDoBar, highlightActiveBtn, cancelBtn, hiddenForm, activeForm};
})();
//filter the tasks 
const filterList = ( function (){
    const displayTitle = document.querySelector("#displayTitle");
    //filter function
    function displayByAll(){
        displayTitle.textContent = "// All Tasks";
        let taskList = toDoList;
        return taskList
    };
    function displayByToday(){
        displayTitle.textContent = "// Today";
        let today = new Date().toLocaleDateString('en-CA');
        let taskList = toDoList.filter(toDo => toDo.dueDate === today);
        return taskList
    };
    function displayByWeek(){  
        displayTitle.textContent = "// Next 7 Days";
        let taskList = toDoList.filter(function(toDo){
            let today = new Date();
            let dueDate = new Date(toDo.dueDate);
            let difference = Math.abs(Math.round((today.getTime()-dueDate.getTime())/1000/24/60/60));
            if(difference <= 7)
             return true})
        return taskList
    };
    function displayByProject (projectName,fullName) {
        toDoContainer.textContent = "";
        pageEffect.highlightActiveBtn();
        pageEffect.toDoBar();
        displayTitle.textContent = `# ${fullName}`;
        let taskList = toDoList.filter(toDo => toDo.project === projectName)
        taskList.forEach(toDo => { toDo.display();
    })};

    return {displayByAll, displayByToday, displayByWeek, displayByProject};
})();

//filter the content by clicking the button
const menuBtn  = ( function (){ 
    //inbox button
    const menu = document.querySelectorAll('.menu');
    const eventAction = () => {
        menu.forEach(page => {page.addEventListener('click', options)})
    };
    function options(e){
        toDoContainer.textContent = "";
        pageEffect.highlightActiveBtn();
        pageEffect.toDoBar();
        let option = e.target.id;
        let taskList = ""; 
        switch(option){
            case 'today':
            taskList = filterList.displayByToday();
            break;
            case 'week':
            taskList = filterList.displayByWeek();
            break;
            case 'allTasks':
            taskList = filterList.displayByAll();
            break;
        }
        if (taskList != ""){
            taskList.forEach(toDo => { toDo.display();
           })}else{
                const nothingText = document.createElement('div');
                nothingText.classList.add("nothingText")
                nothingText.textContent = "Nothing Here!"
                toDoContainer.append(nothingText);
        }
    }
    //project button
    function createProject (){
        let myProject = document.querySelector("#projectTitle").value;
        const projectErrMsg = document.querySelector("#projectErrMsg");

        if (myProject ===""){
            document.querySelector("#projectTitle").classList.add("error");
            projectErrMsg.textContent = "Please fill out all the required fields.";
        }
        const str = myProject.replaceAll(' ', '').toLowerCase();
        const found = projectList.some(el => el.short === str)

        if (!found && myProject != "") {
            let project = {};
            project["full"] = myProject;
            project["short"] = str;
            projectList.push(project);
            console.log(projectList);
            storage.populateStorage();
            displayProject(project["short"],project["full"]);
           pageEffect.hiddenForm()
           ;}
        else{
        projectErrMsg.textContent = "It is a repeated project name!";
        return false
        }
    }

    function displayProject(str,myProject) {
        const projectMenu = document.querySelector(".side-down")
        const select = document.querySelector("#myProjects");
        
            const project = document.createElement('li');
            project.appendChild(document.createTextNode(`# ${myProject}`))
            projectMenu.appendChild(project);
            const option = document.createElement('option');
            option.appendChild(document.createTextNode(`${myProject}`));
            option.setAttribute('value', `${str}`)
            select.appendChild(option);
            project.addEventListener("click", () => {filterList.displayByProject(str,myProject)})
    }
    return {eventAction,createProject, displayProject};
})();




//default
const preAction  = ( function (){ 
    
    function defaultProject(){
        projectList.forEach(project =>{ 
        let myProject = project["full"];
        let str = project["short"];
        menuBtn.displayProject(str,myProject)})}

    return {defaultProject};
        })();

//storage
const storage  = ( function (){
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

if (storageAvailable("localStorage")) {
    console.log("Yippee! We can use localStorage.")
  } else {
    console.log("Too bad.We cannot use localStorage")
  }

function populateStorage() {
    localStorage.setItem("tasks", JSON.stringify(toDoList));
    localStorage.setItem("projects", JSON.stringify(projectList));
    
    setStyles();
}

function setStyles() {
    let currentTask = localStorage.getItem("tasks");
    let currentProject = localStorage.getItem("projects");
    let nTask = [];

    currentTask = JSON.parse(currentTask);
    currentProject = JSON.parse(currentProject);
    currentTask.forEach( task => {
        const title = task.title;
        const description = task.description;
        const priority = task.priority;
        const dueDate = task.dueDate;
        const project = task.project;
        const newToDo = new toDo(title, description, priority, dueDate, project)
        nTask.push(newToDo)});

    toDoList = [...nTask];
    projectList = [...currentProject];

    console.log(currentProject);
    console.log(projectList);
  }

  return {populateStorage,setStyles};
})();

const startPage =  function (){
    if (!localStorage.getItem("tasks")) {
        storage.populateStorage();
      } else {
        storage.setStyles();
      }
      if (!localStorage.getItem("projects")) {
        storage.populateStorage();
      } else {
        storage.setStyles();
      }
    menuBtn.eventAction();
    preAction.defaultProject();
    pageEffect.cancelBtn();
    document.querySelector("#addNewProject").onclick = menuBtn.createProject;
    document.querySelector("#addNewTask").onclick = addTasks.getTaskInput;
    document.querySelector("#myTask").onclick = pageEffect.activeForm;
    document.querySelector("#myProject").onclick = pageEffect.activeForm;
    document.querySelector('#editProject').onclick = pageEffect.activeForm;
    document.getElementById("allTasks").click();
    }
    
    startPage();
    function editProjectList (){
        editProjectContainer.textContent= "";
        const projectBar = document.createElement("div");
        projectBar.classList.add("projectBar");
        const projectName = document.createElement('p');
        projectName.appendChild(document.createTextNode("Project Name"));
        const del = document.createElement('p');
        del.appendChild(document.createTextNode("Delete"));
        projectBar.append(projectName, del);
        editProjectContainer.appendChild(projectBar);

    projectList.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("projectItem");
        const pName = document.createElement('p');
        pName.appendChild(document.createTextNode(`${project.full}`));
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('aria-label', 'delete')
        deleteBtn.classList.add("circleBtn","crossImg");
        projectItem.append(pName, deleteBtn);
        editProjectContainer.appendChild(projectItem);
        deleteBtn.addEventListener("click", () => {
            const header = project.full;
            const i = projectList.findIndex(x => x.full === header);
            projectList.splice(i, 1);
            projectItem.remove();
            storage.populateStorage();})
})
}

export {toDoList, storage};
