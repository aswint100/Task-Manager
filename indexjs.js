// ! Select the data container
let dataContainer = document.getElementsByClassName('data_container')[0];

// ! fetch data from json and print on the page
let fetchTask = async () => {
    let data = await fetch('http://localhost:3000/tasks');
    let dataOutput = await data.json();

    dataOutput.forEach(value => {
        // creating elements
        let insideContainer = document.createElement('aside');
        let taskname = document.createElement('p');
        let description = document.createElement('p');
        let time = document.createElement('p');
        let buttonUpdate = document.createElement('button');
        let buttonDel = document.createElement('button');
        let button = document.createElement('div');

        // assigning values

        taskname.innerText =`Task: ${ value.task}`
        description.innerText = `Discription: ${value.description}`
        time.innerText =`Time: ${value.time}`
        buttonUpdate.innerText = 'Update'
        buttonDel.innerText = 'Delete'

        // add functions to the buttons

        buttonUpdate.addEventListener('click', () => {
            updateTask(value.id)
        });

        buttonDel.addEventListener('click', () => {
            deleteTask(value.id)
        });

        // appending
        
        button.append(buttonUpdate, buttonDel);
        insideContainer.append(taskname, description, time, button);
        dataContainer.appendChild(insideContainer);
    });
}
fetchTask();

// ! To do Add Task
// get the values
let taskname = document.getElementById('taskname');
let description = document.getElementById('description');
let time = document.querySelector('select');
let form = document.querySelector('form');
let addTask = document.getElementById("addtask")

// add event listener to the AddTask button

addTask.addEventListener('click', (e) => {
    e.preventDefault();
    if (!taskname.value.trim()) {
        alert('Please fill out Taskname!');
        return;
    }
    else if ( !description.value.trim()) {
        alert('Please fill out description!');
        return;
    }
    else if (!time.value) {
        alert('Please select time!');
        return;
    }
    create(taskname.value, description.value, time.value)
})

let create = async (task, description,time) => {
    await fetch('http://localhost:3000/tasks', {
        method: "POST",
        content: "application/json",
        body: JSON.stringify({
            task: task,
            description: description,
            time:time
        })
    })
}

// ! Update the data

let updateTask = async (id) => { 
    let data = await fetch(`http://localhost:3000/tasks/${id}`)
    let updateData = await data.json()
    taskname.value = updateData.task;
    description.value = updateData.description;
    time.value = updateData.time;
    
    let updateTaskButton = document.createElement('button');
    updateTaskButton.innerHTML = "Update Task"

    updateTaskButton.addEventListener('click', async () => {
        updatedData(updateData.id,taskname.value,description.value,time.value)

    })
    form.replaceChild(updateTaskButton,addTask)

}

let updatedData = async (id, task, description, time) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        content: "application/json",
        body: JSON.stringify({
            task: task,
            description: description,
            time: time
        })
})
}

// ! Delete Data
let deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
    })
}