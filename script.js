(function() {
    let tasks = {
        current: [{
            taskId: doId(),
            taskContent: "Task 1",
            taskState: "current"  
        }, {
            taskId: doId(),
            taskContent: "Task 2",
            taskState: "current" 
        }],
        done: [{
            taskId: doId(),
            taskContent: "Task 3",
            taskState: "done"
        }], 
        get allTasks() {
            return tasks.current.length + tasks.done.length;
        }, 
        get doneTasks() {
            return tasks.done.length;
        }
    };
       let tasksList = document.getElementById("app__list"),
            allTasks = document.getElementById("js-all-tasks"),
            doneTasks = document.getElementById("js-done-tasks"),
            addNewTaskField = document.getElementById("app__task-new");

    function INIT() {
        for (const item of tasks.current) {
            createElementx(item);
        };
        
        for(const item of tasks.done) {
            createElementx(item)
        }
        allTasks.innerHTML = tasks.allTasks; 
        doneTasks.innerHTML = tasks.doneTasks; 
    };
    function createElementx(itemename) {
        let taskOne = document.createElement('li'),
            removeCross = document.createElement('div'), 
            text = document.createElement('span'); 
        
        removeCross.classList.add('app__list-remove'); 
        removeCross.addEventListener('click', function() {
            debugger
            removeTask(this)
        }); 
        text.classList.add('app__list-text'); 
        text.addEventListener('click', function(){
            debugger
            doneTask(this)
        });
        switch(itemename.taskState) {
            case 'done': 
                   
                   taskOne.classList.add('app__list-item', 'app__list-item--done');
                    break; 
                default:
                     
                    taskOne.classList.add('app__list-item');
            };
            taskOne.id = itemename.taskId; 
            text.innerHTML = itemename.taskContent;
            taskOne.appendChild(text);
            taskOne.appendChild(removeCross);
            tasksList.appendChild(taskOne);
    };

    function doneTask(el) {
        let elem = el.parentNode,
                elemId = elem.id, 
                elemState = elem.classList.contains('app__list-item--done');
            const [itemsRemove, itemsAdd] = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done]; 
            elem.classList.toggle('app__list-item--done');
            for(const[index, item] of itemsRemove.entries()) {
                if(item.taskId !== elemId) continue; 
                itemsAdd.push(item); 
                itemsRemove.splice(index, 1);
        };
        
        doneTasks.innerHTML = tasks.doneTasks;
    };

    function removeTask(el) {
        let removeEl = el.parentNode, 
            removeElid = removeEl.taskId, 
            removeElState = removeEl.classList.contains('app__list-item--done');
            removeEl.remove();

            const items = removeElState ? tasks.done : tasks.current;
            for (const [index, item] of items.entries()) {
                if(item !== removeElid) continue;
                items.splice(index, 1)
            }
            allTasks.innerHTML = tasks.allTasks; 
            doneTasks.innerHTML = tasks.doneTasks;
    };

    function addTask(str) {
        let newElem = {
            taskId: doId(),
            taskContent: str,
            taskState: "current"
        }; 

        tasks.current.push(newElem);
        createElementx(newElem); 
        allTasks.innerHTML = tasks.allTasks;
    };

    addNewTaskField.addEventListener('keyup', function(e) {
        if (e.keyCode === 13 ) {
            addTask(this.value); 
            this.value = " ";
        }
    })
    function doId() {
        return Math.random().toString(36).substr(2, 16);
    }; 

    INIT();

}) ();
