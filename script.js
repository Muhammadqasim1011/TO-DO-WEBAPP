// Variables

let pendingArray = JSON.parse(localStorage.getItem('pendingStore')) || [];
let processArray = JSON.parse(localStorage.getItem('processStore')) || [];;
let completeArray = JSON.parse(localStorage.getItem('completeStore')) || [];;

let userInput = document.getElementById('user-input');
let addTaskButton = document.getElementById('add-task');
let messageBox = document.getElementById('message-boxx');
let message = document.getElementById('message');

//container
let pendingContainer = document.getElementById('pending-box');
let processContainer = document.getElementById('process-box');
let completeContainer = document.getElementById('complete-box');

//removeButtons
let removePendingBtn = document.getElementsByClassName('remove-pending');
let removeProcessBtn = document.getElementsByClassName('remove-process');
let removeCompleteBtn = document.getElementsByClassName('remove-complete');

//Send Buttons
let sendToProcessBtn = document.getElementsByClassName('send-to-process');
let sendToProcessBtn2 = document.getElementsByClassName('send-to-process2');
let sendToPendingBtn = document.getElementsByClassName('send-to-pending');
let sendToompleteBtn = document.getElementsByClassName('send-to-complete');

function addTask() {
    let newTodo = userInput.value.trim();

    if (userInput.value === "") {
        message.textContent = 'Enter Somthings to add.';
        messageBox.style.display = 'block';
        messageBox.style.backgroundColor = 'red';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 2000);
    } else if (pendingArray.includes(newTodo)) {
        messageBox.style.display = 'block';
        message.textContent = 'Todo Already Exists!';
        messageBox.style.backgroundColor = 'red'
        userInput.value = '';
        setTimeout(() => {
            messageBox.style.display = 'none';
            messageBox.style.backgroundColor = '#ffd000'
        }, 1400);
    } else {
        let userValue = userInput.value;
        pendingArray.push(userValue);
        userInput.value = '';
        messageBox.style.display = 'block';
        message.textContent = 'Successfuly Added.';
        messageBox.style.backgroundColor = 'green'
        setTimeout(() => {
            messageBox.style.display = 'none';
            messageBox.style.backgroundColor = '#ffd000'
        }, 1400);

        render();
        localStorage.setItem('pendingStore', JSON.stringify(pendingArray));
    }
}

addTaskButton.addEventListener('click', addTask)
userInput.addEventListener('change', addTask)

function render() {
    // Clear the container before rendering
    pendingContainer.innerHTML = '';
    processContainer.innerHTML = '';
    completeContainer.innerHTML = '';

    // Rendering All Pending Templates
    // Pending ToDo
    pendingArray.forEach((todo, index) => {
        let item = document.createElement('li');
        item.innerHTML = `${todo} <span><img data-set="${index}" class="edit-pending" src="./Asset/edit.png" alt=""><img data-set="${index}" class="remove-pending" src="./Asset/delete.png" alt=""><img data-set="${index}" class="send-to-process" src="./Asset/next.png" alt=""></span>`;
        pendingContainer.appendChild(item);
    });

    // Process ToDo
    processArray.forEach((todo, index) => {
        let item = document.createElement('li');
        item.innerHTML = `${todo} <span><img data-set="${index}" class="send-to-pending" src="./Asset/previous.png" alt=""><img data-set="${index}" class="remove-process" src="./Asset/delete.png" alt=""><img data-set="${index}" class="send-to-complete" src="./Asset/next.png" alt=""></span>`;
        processContainer.appendChild(item);
    });

    // Complete Todo
    completeArray.forEach((todo, index) => {
        let item = document.createElement('li');
        item.innerHTML = `${todo} <span><img data-set="${index}" class="send-to-process2" src="./Asset/previous.png" alt=""><img data-set="${index}" class="remove-complete" src="./Asset/checked.png" alt="">`;
        completeContainer.appendChild(item);
    });

    //Removing ToDo
    //Pending
    Array.from(removePendingBtn).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            pendingArray.splice(index, 1)
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Removed.';
            messageBox.style.backgroundColor = 'red'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);
            localStorage.setItem('pendingStore', JSON.stringify(pendingArray));
        })
    });

    //Process
    Array.from(removeProcessBtn).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            processArray.splice(index, 1)
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Removed.';
            messageBox.style.backgroundColor = 'red'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);
            localStorage.setItem('processStore', JSON.stringify(processArray));
        })
    });

    //complete
    Array.from(removeCompleteBtn).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            completeArray.splice(index, 1)
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Completed Task.';
            messageBox.style.backgroundColor = 'green'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);
            localStorage.setItem('completeStore', JSON.stringify(completeArray));
        })
    });

    //Sending ToDo
    // Pending to Process
    Array.from(sendToProcessBtn).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let moveTodo = pendingArray.splice(index, 1);
            processArray.push(moveTodo[0])
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Move To Process.';
            messageBox.style.backgroundColor = 'black'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);

            localStorage.setItem('pendingStore', JSON.stringify(pendingArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        })
    });

    // complete to Process
    Array.from(sendToProcessBtn2).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let moveTodo = completeArray.splice(index, 1);
            processArray.push(moveTodo[0])
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Move To Process.';
            messageBox.style.backgroundColor = 'black'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);
            localStorage.setItem('pendingStore', JSON.stringify(completeArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        })
    });

    // Process to Pending
    Array.from(sendToPendingBtn).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let moveTodo = processArray.splice(index, 1);
            pendingArray.push(moveTodo[0])
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Move To Pending.';
            messageBox.style.backgroundColor = 'black'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);

            localStorage.setItem('pendingStore', JSON.stringify(pendingArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        })
    });

    // Process to complete
    Array.from(sendToompleteBtn).forEach(button => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-set');
            let moveTodo = processArray.splice(index, 1);
            completeArray.push(moveTodo[0])
            render();
            messageBox.style.display = 'block';
            message.textContent = 'Successfuly Completed.';
            messageBox.style.backgroundColor = 'black'
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.style.backgroundColor = '#ffd000'
            }, 1400);
            localStorage.setItem('completeStore', JSON.stringify(completeArray));
            localStorage.setItem('processStore', JSON.stringify(processArray));
        })
    });

    document.querySelectorAll('.edit-pending').forEach(editButton => {
        editButton.addEventListener('click', (e) => {
            let index = parseInt(e.target.getAttribute('data-set')); // Ensure index is a number
            let promptBox = document.querySelector(".prompt");
            let updateInput = document.getElementById("update-todo");
            let updateBTN = document.getElementById("update-btn");

            promptBox.classList.add("show");

            updateInput.value = pendingArray[index];

            // Flag to ensure event listeners are only added once
            let eventListenerAdded = false;

            function updateTodoItem() {
                let updateTodo = updateInput.value.trim();
                if (updateTodo !== "") {
                    
                    const todoExists = pendingArray.some((todo, i) => i !== index && todo.toLowerCase() === updateTodo.toLowerCase());

                    if (todoExists) {
                        promptBox.classList.remove("show");
                        messageBox.style.display = 'block';
                        message.textContent = 'Todo Already Exists!';
                        messageBox.style.backgroundColor = 'red';
                        updateInput.value = '';
                        setTimeout(() => {
                            messageBox.style.display = 'none';
                            messageBox.style.backgroundColor = '#ffd000';
                        }, 1400);
                    } else {
                        // Update the to-do item
                        pendingArray[index] = updateTodo;
                        render();
                        localStorage.setItem('pendingStore', JSON.stringify(pendingArray));

                        promptBox.classList.remove("show");

                        messageBox.style.display = 'block';
                        message.textContent = 'To-do item updated successfully!';
                        messageBox.style.backgroundColor = 'green';
                        setTimeout(() => {
                            messageBox.style.display = 'none';
                            messageBox.style.backgroundColor = '#ffd000';
                        }, 1400);
                    }
                }
            }

            // Only add event listeners if they haven't been added already
            if (!eventListenerAdded) {
                updateInput.addEventListener('keypress', function (event) {
                    if (event.key === 'Enter') {
                        updateTodoItem();
                    }
                });

                updateBTN.addEventListener('click', function () {
                    updateTodoItem();
                });

                eventListenerAdded = true;  // Mark that the event listeners have been added
            }
        });
    });

}


render();
