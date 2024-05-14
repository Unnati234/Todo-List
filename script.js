const newtask = document.querySelector('#newTask');
const btn = document.querySelector('#addTask');
const tasklist = document.querySelector('.taskList');
tasklist.innerHTML = localStorage.getItem('tasklist');

  // Adding event to the btn
btn.addEventListener('click',(ev) =>{
    const task = newtask.value;
    console.log(task);

    // Just to understand the things we have written this :

    // // Create an list item
    // const li = document.createElement('li');
    // // add task value in it
    // li.innerText = task;
    // // adding task in list
    // tasklist.appendchild(li);

    
    // Now the main work starts from here
    // Create an list item
    let li = document.createElement('li');
    // add task value in it
    if(!task) return;
    let str = `<input class="check" type="checkbox">
                  <span id="running">${task}</span>
                  <div class="btngrp">
                    <button class="up btn">⬆️</button>
                    <button class="down btn">⬇️</button>
                    <button class="delete btn">🚮</button>
                  </div>`

    li.innerHTML = str;
    li.classList.add('task');

    // now append it in ul(tasklist)
    tasklist.appendChild(li);
    newtask.value = '';       // automatic empty the input box
    localStorage.setItem('tasklist',tasklist.innerHTML);
})


// Kis button ko press karne se kya hoga 
tasklist.addEventListener('click', (ev) =>{
  console.log(ev);

  let delval = false, upval = false, downval = false, checkval = false;
  ev.target.classList.forEach(element =>{
    if(element == 'check'){
      checkval = true;
    }
    else if(element == 'up'){
      upval = true;
    }
    else if(element == 'down'){
      downval = true;
    }
    else if(element == 'delete'){
      delval = true;
    }
  })

  if(checkval){
    if(ev.target.checked){
      ev.target.nextElementSibling.classList.add('linecut');
    }
    else {
      ev.target.nextElementSibling.classList.remove('linecut');
    }
    localStorage.setItem('tasklist',tasklist.innerHTML);
  }

  else if(delval){
    ev.target.parentElement.parentElement.remove();
    
    localStorage.setItem('tasklist',tasklist.innerHTML);
  }

  else if(upval){
    let current = ev.target.parentElement.parentElement;
    let previous = ev.target.parentElement.parentElement.previousElementSibling;
    let ulist = current.parentElement;

    ulist.insertBefore(current,previous);

    localStorage.setItem('tasklist',tasklist.innerHTML);
  }

  else if(downval){
    let current = ev.target.parentElement.parentElement;
    let next = ev.target.parentElement.parentElement.nextElementSibling;
    let ulist = current.parentElement;

    ulist.insertBefore(next,current);

    localStorage.setItem('tasklist',tasklist.innerHTML);
  }
})