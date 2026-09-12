"use strict";


// DOM references

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");


// Task storage

const tasks = [];


// Add a new task

form.addEventListener("submit", function (event) {

    // Prevent the form from refreshing the page.
    event.preventDefault();

    // Read the user's input.
    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // Reject empty or whitespace-only task names.
    if (taskName === "") {
        alert("Please enter a task before adding it.");
        taskInput.focus();
        return;
    }

    // Create the task object.
    const newTask = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    // Store the new task.
    tasks.push(newTask);

    // Update the displayed list.
    displayTasks();

    // Reset the form.
    taskInput.value = "";
    priorityInput.value = "medium";

    // Return the cursor to the task input.
    taskInput.focus();
});


// Display tasks

function displayTasks() {

    // Clear the current list before rebuilding it.
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        // Main task element
        const taskElement = document.createElement("article");
        taskElement.classList.add("task-item");

        if (task.completed) {
            taskElement.classList.add("completed");
        }


        // Task information
        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const taskName = document.createElement("span");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;

        const priorityBadge = document.createElement("span");

        priorityBadge.classList.add(
            "priority-badge",
            "priority-" + task.priority
        );

        priorityBadge.textContent = task.priority;

        taskInfo.appendChild(taskName);
        taskInfo.appendChild(priorityBadge);


        // Task action buttons
        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.classList.add("complete-button");

        if (task.completed) {
            completeButton.textContent = "Undo";
        } else {
            completeButton.textContent = "Complete";
        }

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";


        // Complete or undo a task
        completeButton.addEventListener("click", function () {

            tasks[index].completed = !tasks[index].completed;

            displayTasks();
        });


        // Delete a task
        deleteButton.addEventListener("click", function () {

            tasks.splice(index, 1);

            displayTasks();
        });


        // Assemble the task element
        taskActions.appendChild(completeButton);
        taskActions.appendChild(deleteButton);

        taskElement.appendChild(taskInfo);
        taskElement.appendChild(taskActions);

        taskList.appendChild(taskElement);
    });
}