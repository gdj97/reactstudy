import './App.css';
// ex02_map_App.jsx 
import Header from './components/ex02_map_Header.jsx';
import Day from './components/ex02_map_Day.jsx';
import DayList from './components/ex02_map_DayList.jsx';
function App() {
  return (
    <div className="App">
      <Header />
      <DayList />
      <Day />
    </div>
  )
}
export default App;
