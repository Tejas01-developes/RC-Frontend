import {Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Form from './pages/Form';
import Addtask from './pages/Addtask';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Attaindencepage from './pages/Attaindencepage';



const App = () => {
  return (
    <div>
      <Routes>




<Route path='/register' element={<Register/>}/>


<Route element={<Login/>} path='/'/>

<Route path='/home' element={<Home/>}/>


<Route element={<Form/>} path='/form'/>


<Route element={<Addtask/>} path='/Add-task'/>


<Route path='/form' element={<Form/>}/>

<Route path='/pay' element={<Payment/>}/>


<Route path='/attaindence' element={<Attaindencepage/>}/>

      </Routes>
    </div>
  )
}

export default App
