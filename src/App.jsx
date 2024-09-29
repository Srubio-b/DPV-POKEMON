import { Routes, Route, BrowserRouter } from "react-router-dom"
import Index from "./views/Index"
import Detail from "./views/Detail"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pokemon/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
