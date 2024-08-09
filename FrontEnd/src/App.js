import "./App.css";
import Chat from "./Components/ChatComponent/Chat";
import Sidebar from "./Components/SideBar/Sidebar";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
