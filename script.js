function changeMood() {
    let body = document.body;
    let moodButton = document.getElementById("mood-change");
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }
}

// App Logic

let todoArray = JSON.parse(localStorage.getItem('pendingStore')) || [];
let processArray = JSON.parse(localStorage.getItem('processStore')) || [];
let completeArray = JSON.parse(localStorage.getItem('completeStore')) || [];

let userInput = document.getElementById("user-input");
let submitButton = document.getElementById("submit-btn");

let processContainer = document.getElementById("process");
let pendingContainer = document.getElementById("pending");
let completeContainer = document.getElementById("complete");

let removePendingButton = document.getElementsByClassName("remove-pending");
let removeProcessButton = document.getElementsByClassName("remove-process");
let removeCompleteButton = document.getElementsByClassName("remove-complete");

let sendToPendingButton = document.getElementsByClassName("send-to-pending");
let sendToProcessButton = document.getElementsByClassName("send-to-process");
let sendToProcessButton2 = document.getElementsByClassName("send-to-process2");
let sendToCompleteButton = document.getElementsByClassName("send-to-complete");



document.getElementById('user-input').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        addToDo();
        
    }
});

function addToDo() {
    let errorBox = document.querySelector(".error-box");
    let newTodo = userInput.value.trim();

    if (newTodo === "") {
        errorBox.innerHTML = '<h3>Please Input Your Todo.</h3>';
        errorBox.classList.add("show");
        setTimeout(() => {
            errorBox.classList.remove("show");
        }, 2000);
    } else if (todoArray.includes(newTodo)) {
        errorBox.innerHTML = '<h3>Todo already exists!</h3>';
        errorBox.classList.add("show");
        userInput.value = '';
        setTimeout(() => {
            errorBox.classList.remove("show");
        }, 2000);
    } else {
        todoArray.push(newTodo);
        userInput.value = "";
        errorBox.innerHTML = '<h3>Successfully Added</h3>';
        errorBox.classList.add("success");
        renderToDo();
        setTimeout(() => {
            errorBox.classList.remove("success");
        }, 2000);
        localStorage.setItem('pendingStore', JSON.stringify(todoArray));
    }
}

function renderToDo() {
    // Pending Items
    pendingContainer.innerHTML = "";
    todoArray.forEach((todo, index) => {
        let liElement = document.createElement("li");
        liElement.innerHTML = `${todo} <span><img data-set="${index}" class="edit-pending" src="edit.png" alt=""><img data-set="${index}" class="remove-pending" src="delete.png" alt=""><img data-set="${index}" class="send-to-process" src="next.png" alt=""></span>`;
        pendingContainer.appendChild(liElement);
    });

    // Process Items
    processContainer.innerHTML = "";
    processArray.forEach((todo, index) => {
        let liElement = document.createElement("li");
        liElement.innerHTML = `${todo} <span><img data-set="${index}" class="send-to-pending" src="previous.png" alt=""><img data-set="${index}" class="remove-process" src="delete.png" alt=""><img data-set="${index}" class="send-to-complete" src="next.png" alt=""></span>`;
        processContainer.appendChild(liElement);
    });

    // Complete Items
    completeContainer.innerHTML = "";
    completeArray.forEach((todo, index) => {
        let liElement = document.createElement("li");
        liElement.innerHTML = `${todo} <span><img data-set="${index}" class="send-to-process2" src="previous.png" alt=""><img data-set="${index}" class="remove-complete" src="delete.png" alt=""></span>`;
        completeContainer.appendChild(liElement);
    });


    // Edit Button Events
    document.querySelectorAll('.edit-pending').forEach(editButton => {
        editButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let promptBox = document.querySelector(".prompt");
            let updateInput = document.getElementById("update-todo");

            // Show the prompt box
            promptBox.classList.add("show");

            // Pre-fill input with the current to-do item
            updateInput.value = todoArray[index];

            // Handle the update action
            updateInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    if (updateInput.value.trim() !== "") {
                        todoArray[index] = updateInput.value.trim();
                        renderToDo();
                        localStorage.setItem('pendingStore', JSON.stringify(todoArray));

                        // Hide the prompt box
                        promptBox.classList.remove("show");

                        // Show success message in error box
                        let errorBox = document.querySelector(".error-box");
                        errorBox.innerHTML = '<h3>To-do item updated successfully!</h3>';
                        errorBox.classList.add("success");
                        setTimeout(() => {
                            errorBox.classList.remove("success");
                        }, 2000);
                    }
                }
            });
        });
    });
    // Remove Buttons Events
    Array.from(removePendingButton).forEach(removeButton => {
        removeButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            todoArray.splice(index, 1);
            renderToDo();
            localStorage.setItem('pendingStore', JSON.stringify(todoArray));
        });
    });

    Array.from(removeProcessButton).forEach(removeButton => {
        removeButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            processArray.splice(index, 1);
            renderToDo();
            localStorage.setItem('processStore', JSON.stringify(processArray));
        });
    });

    Array.from(removeCompleteButton).forEach(removeButton => {
        removeButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            completeArray.splice(index, 1);
            renderToDo();
            localStorage.setItem('completeStore', JSON.stringify(completeArray));
        });
    });

    // Send Buttons Events
    Array.from(sendToProcessButton).forEach(sendButton => {
        sendButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let sendItem = todoArray.splice(index, 1)[0]; // Access the first element of the returned array
            processArray.push(sendItem);
            renderToDo();

            localStorage.setItem('pendingStore', JSON.stringify(todoArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        });
    });

    Array.from(sendToProcessButton2).forEach(sendButton => {
        sendButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let sendItem = completeArray.splice(index, 1)[0];
            processArray.push(sendItem);
            renderToDo();

            localStorage.setItem('completeStore', JSON.stringify(completeArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        });
    });

    Array.from(sendToPendingButton).forEach(sendButton => {
        sendButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let sendItem = processArray.splice(index, 1)[0];
            todoArray.push(sendItem);
            renderToDo();

            localStorage.setItem('pendingStore', JSON.stringify(todoArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        });
    });

    Array.from(sendToCompleteButton).forEach(sendButton => {
        sendButton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let sendItem = processArray.splice(index, 1)[0];
            completeArray.push(sendItem);
            renderToDo();

            localStorage.setItem('completeStore', JSON.stringify(completeArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        });
    });
}

renderToDo();