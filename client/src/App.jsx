import { Route, Routes } from "react-router-dom";
import CardList from "./components/cardList";
import Header from "./components/header";
import CreatePost from "./components/create-post";
import Single from "./components/single";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<CreatePost />} path="/create-post" />
        <Route
          element={
            <div className="container mx-auto mt-20">
              <CardList />
            </div>
          }
          index
        />
        <Route path="/single/:id" element={<Single />} />
      </Routes>
    </>
  );
}

export default App;
