import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Privacy from './Privacy.jsx'
import Terms from './Terms.jsx'
import DeleteAccount from './DeleteAccount.jsx'
import GetApp from './GetApp.jsx'
import ScrollToTop from './ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/get-app" element={<GetApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
