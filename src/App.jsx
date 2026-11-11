import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DiaryWrite from "./pages/DiaryWrite";
import Archive from "./pages/Archive";
import DiaryDetail from "./pages/DiaryDetail";
import PreMatchCardDraw from "./pages/PreMatchCardDraw";
import Stats from "./pages/Stats";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/diary/write" element={<DiaryWrite />}/>
      <Route path="/archive" element={<Archive />}/>
      <Route path="/diary/:id" element={<DiaryDetail/>}/>
      <Route path="/diary/edit/:id" element={<DiaryWrite />} />
      <Route path="/cards/pre-match" element={<PreMatchCardDraw />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;
