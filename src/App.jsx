import TasksContextProvider from "./context/TaskContext";
import Main from "./pages/Main";
import "./styles/App.css";

function App() {
  return (
    <TasksContextProvider>
      <div className="App">
        <Main />
      </div>
    </TasksContextProvider>
  );
}

export default App;
