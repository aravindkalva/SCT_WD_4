let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const taskInput=document.getElementById("taskInput");
const taskDate=document.getElementById("taskDate");
const taskCategory=document.getElementById("taskCategory");
const taskList=document.getElementById("taskList");
const addTask=document.getElementById("addTask");


let editId=null;



addTask.addEventListener("click",()=>{


let text=taskInput.value.trim();


if(text===""){

alert("Please enter a task");

return;

}



if(editId){

tasks=tasks.map(task=>{

if(task.id===editId){

task.name=text;
task.date=taskDate.value;
task.category=taskCategory.value;

}

return task;

});


editId=null;

addTask.textContent="Add";


}

else{


tasks.push({

id:Date.now(),

name:text,

date:taskDate.value,

category:taskCategory.value,

completed:false

});


}



saveTasks();

displayTasks();


taskInput.value="";

taskDate.value="";


});





function displayTasks(filter="all"){


taskList.innerHTML="";


let filtered=tasks.filter(task=>{


if(filter==="completed")

return task.completed;


if(filter==="pending")

return !task.completed;


return true;


});



filtered.forEach(task=>{


let li=document.createElement("li");


li.className=
task.completed ? "task completed":"task";



li.innerHTML=`

<div class="task-info">

<span class="task-name">
${task.name}
</span>

<span>
${task.category}
</span>

<span class="task-date">
${task.date || "No date"}
</span>

</div>


<div class="actions">

<button class="complete"
onclick="completeTask(${task.id})">
✓
</button>


<button class="edit"
onclick="editTask(${task.id})">
Edit
</button>


<button class="delete"
onclick="deleteTask(${task.id})">
X
</button>

</div>

`;



taskList.appendChild(li);


});


}





function completeTask(id){

tasks=tasks.map(task=>{

if(task.id===id)

task.completed=!task.completed;


return task;

});


saveTasks();

displayTasks();

}





function deleteTask(id){

tasks=tasks.filter(task=>task.id!==id);


saveTasks();

displayTasks();

}





function editTask(id){


let task=tasks.find(task=>task.id===id);


taskInput.value=task.name;

taskDate.value=task.date;

taskCategory.value=task.category;


editId=id;


addTask.textContent="Update";


}





function filterTasks(type){

displayTasks(type);

}




function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}



displayTasks();