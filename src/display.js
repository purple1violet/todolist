import {toDoList, storage} from './index';


class toDo{
    constructor (title, description, priority, dueDate, project){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
    };

    display() {
        const toDoItem = document.createElement("div");
        toDoItem.classList.add("toDoItem");
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("name", "check");
        const toDoContent = document.createElement("div");
        toDoContent.classList.add("toDoContent");
        const header = document.createElement('h3');
        header.appendChild(document.createTextNode(this.title));
        const summary = document.createElement('p');
        summary.appendChild(document.createTextNode(this.description));
        const project = document.createElement('p');
        project.appendChild(document.createTextNode(`# ${this.project}`));
        const date = document.createElement('p');
        date.appendChild(document.createTextNode(this.dueDate));
        const level = document.createElement('p');
        level.appendChild(document.createTextNode(this.priority));
        level.classList.add("level", this.priority);
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btnContainer");
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('aria-label', 'delete')
        deleteBtn.classList.add("circleBtn","crossImg");
        const editBtn = document.createElement('button');
        editBtn.setAttribute('aria-label', 'edit');
        editBtn.classList.add("circleBtn","editImg");
        toDoContent.append(header,summary)
        btnContainer.append(deleteBtn, editBtn)
        toDoItem.append(checkbox,toDoContent,project,level,date, btnContainer);
        toDoContainer.append(toDoItem);
        //button function
        this.todo = toDoItem;
        this.checkbox = checkbox;
        this.header = header;
        deleteBtn.onclick = this.del;
        checkbox.onclick = this.done;}
        
        del = () => {
            const header = this.title;
            const summary = this.description;
            const i = toDoList.findIndex(x => x.title === header && x.description === summary);
            toDoList.splice(i, 1);
            this.todo.remove();
            storage.populateStorage();
        }

        done = () => {
            if (this.checkbox.checked){
                this.header.classList.add("done");
            }else{
                this.header.classList.remove("done");
            }
        }
}

    export default toDo;