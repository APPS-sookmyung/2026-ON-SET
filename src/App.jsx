import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DiaryWrite from "./pages/DiaryWrite";
import Archive from "./pages/Archive";
import DiaryDetail from "./pages/DiaryDetail";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/diary/write" element={<DiaryWrite />}/>
      <Route path="/archive" element={<Archive />}/>
      <Route path="/diary/:id" element={<DiaryDetail/>}/>
    </Routes>
  );
}

export default App;
