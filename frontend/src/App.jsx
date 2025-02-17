// Import react router dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Import sonner
import { Toaster } from "sonner";
//
import Home from "./pages/Home";
import UserLayout from "./components/Layout/UserLayout";

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
