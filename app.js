//STEP 1: Retrieve 'todos' from localStorage and assign to a var
//Add event listener to "DOMContentLoaded", so the following code will run only after the "DOM" is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    let list = JSON.parse(localStorage.getItem('todos')) || []; //Retrieve the 'todos' if they exist, otherwise, retrieve an 'empty array'

    //STEP 2: Access the "form", the "input", and the "ul" and assign each a var
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const ul = document.querySelector('ul');
//HTML:
// <section>
//         <form action="" id="add-todo">
//             <label for="task">Task</label>
//             <input type="text" name="task" id="task">
//             <button>Add Todo</button>
//         </form>        
//     </section>
    
//     <section id="list">
//             <ul></ul>
//     </section>

    //STEP 4: Declare a function to generate the "new todos"
    function generateTodos() {
        ul.innerHTML = ''; //Clear the existing list 

        //Use a loop over 'list' to create the "list of items for each todo"
        for (let i = 0; i < list.length; i++) {
            const task = list[i]; //We assign a var (task) to the element 'todo' (in that index)
            //Create a "new li" (new todo) and assign it to a var
            const newTodo = document.createElement('li');
            newTodo.innerText = task.todo; //We include the text of the 'key todo' of the object (todoList) corresponding to 'i', into the 'newTodo (the created 'li')

            // Apply 'crossed-todo' class based on the 'isChecked' property
            if (task.isChecked) {
            newTodo.classList.add('crossed-todo');
            }

            //Create a "checkbox" (for the 'newTodo')
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox'; //Because a 'checkbox' is a type of input, we need to specify 'the input type'

            //Create a 'button' we'll use to remove the "newTodo" (and all its elements: the checkbox and the button too)
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove'; //We include the text 'Remove' inside the 'button'

            //Prepend the 'button' to the "newTodo" (li); Append the 'checkbox' to the "newTodo" (li); and Append the 'newTodo' (along with the button and checkbox to the "ul")
            newTodo.prepend(removeButton);
            newTodo.appendChild(checkBox);
            ul.appendChild(newTodo);
        }
    }

    //STEP 5: Initial rendering (generating of whatever it is on the page). In order to do that ---> we call the "generateTodos() function" ---> to initially render the todos when the page loads.
    //Call the function 'generateTodos()'
    generateTodos();

    //STEP 6: Event listener for form submission:
    form.addEventListener('submit', function(event) {
        event.preventDefault(); //To prevent form submission (forwarding the input elsewhere)
        //STEP 3: Create an object which will be our 'counter var' where we'll add the "new todos" (<li>s)
        const todoList = {
            todo: input.value, //'input.value' is the "input var" corresponding to the 'input', the value will give us whatever the user writes.
            isChecked: false //We set it to 'false' by default, so when is c
            //isRemoved: true
        }
  
        //Render the updated 'todos' ("newTodo") of the "counter var" (the object "todoList") ---> by pushing them into the 'parsed array "list"'
        list.push(todoList);
        //Save the updated 'todos' in "localStorage"
        localStorage.setItem('todos', JSON.stringify(list));

        //Render the 'updated todos'
        generateTodos();

        //Clear the input field
        input.value = '';
    });

    //STEP 7: ADD Event listener to "Checkbox" and "removeButton" (both at the "ul") for a 'click event':
    ul.addEventListener('click', function(event) {
        //If 'checkBox' is 'clicked' --> add class "crossed-todo", to cross out the text of the li ---> I'll use the "Spread Operator"
        if (event.target.tagName === 'INPUT') {
            let todoIndex = [...event.target.parentElement.parentElement.children].indexOf(event.target.parentElement);
            list[todoIndex].isChecked = event.target.checked;
            //Option 1:
            //event.target.parentElement.classList.toggle('crossed-todo', event.target.checked);
            //Option 2:
            event.target.parentElement.classList.toggle('crossed-todo');
            localStorage.setItem('todos', JSON.stringify(list));
        }
        //If 'removeButton' is clicked --> the corresponding 'todo' will be removed (entirely along with the 'button' and the 'checkbox') ---> I'll use the "Spread Operator"
        if (event.target.tagName === 'BUTTON') {
            // Handle remove button click
            let todoIndex = [...event.target.parentElement.parentElement.children].indexOf(event.target.parentElement);
            list.splice(todoIndex, 1); // Remove the todo from the list array
            event.target.parentElement.remove();
            localStorage.setItem('todos', JSON.stringify(list));
        }
    });
});

