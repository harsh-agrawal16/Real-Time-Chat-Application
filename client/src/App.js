import { BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import React from 'react'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'


const App = () => (
    <Router>
        <Route path = '/' exact component = {Join}></Route>
        <Route path = '/chat' component = {Chat}></Route>
    </Router>
)

export default App;