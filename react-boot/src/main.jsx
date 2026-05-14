import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
/**
StrictMode : 개발환경에서 모든 요청을 2번 실행함. 
             운영환경에서는 상관 없음. 
 */
//  <StrictMode>
  <CookiesProvider>
    <App />
  </CookiesProvider>
//  </StrictMode>,
)
