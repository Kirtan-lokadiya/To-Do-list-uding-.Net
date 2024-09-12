# ToDoApp

This is a simple ToDo application built with a .NET backend and a static frontend.

## Backend Setup

1. Build the backend API:

    ```bash
    dotnet build
    dotnet run
    ```

    By default, the API will be available at `http://localhost:5014`.

2. Verify the API is running:

    Open your browser or an API client (e.g., Postman) and navigate to:

    ```
    http://localhost:5014/api/todo
    ```

    You should see a response indicating that the API is operational.

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../ToDoApp
    ```

2. Open the `index.html` file in your browser:

    ```html
    <!-- Open this file in your browser -->
    file:///path/to/ToDoApp/index.html
    ```

    Replace `file:///path/to/ToDoApp/index.html` with the actual path to the `index.html` file on your local system.

3. Ensure that the frontend is configured correctly:

    Verify that the API URL in `app.js` points to your running backend API:

    ```javascript
    const apiUrl = "http://localhost:5014/api/todo"; 
    ```

## Running the Project

1. Start the backend API:

    Make sure the backend API is running by following the Backend Setup instructions.

2. Open the frontend:

    Open the `index.html` file in your web browser as described in the Frontend Setup section.

## Interact with the Application

- **Add a Task**: Enter a task into the input field and click "Add Task."
- **Complete a Task**: Click "Complete" to mark a task as completed. The task will be displayed with a line-through style.
- **Undo Completion**: Click "Undo" to revert a task back to incomplete.
- **Delete a Task**: Click "Delete" to remove a task from the list.
