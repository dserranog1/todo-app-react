import TodoComponent from "./components/TodoComponent";

function App() {
  return (
    <div className="w-full flex flex-col justify-center items-center my-auto h-full min-h-screen bg-gray-200 text-2xl py-6 text-gray-600">
      <div className="flex flex-col items-center gap-4">
        <h1>Todo App</h1>
        <h2 className="text-lg">Click any todo to edit it (when unchecked)</h2>
      </div>
      <TodoComponent />
    </div>
  );
}

export default App;
