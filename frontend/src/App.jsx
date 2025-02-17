import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            fontFamily: "Inter, serif",
            fontSize: "16px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route>{/* Admin layout */}</Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
