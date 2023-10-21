import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import CodeEditor from "./Pages/CodeEditor/CodeEditor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<CodeEditor />} />
      </Routes>
    </div>
  );
}

export default App;

