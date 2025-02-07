import SubmitModal from './components/submit/submit'
import './App.css'
import ShowModal from './components/show/show';
import Languagues from './components/Languages/lenguagues';


function App() {



  return (
    <>
      <div className='translate-container'>
        <Languagues target="submit">
          <SubmitModal />
        </Languagues>
      </div>
      <div className='translate-container'>
        <Languagues target="show">
       <ShowModal />
        </Languagues>
      </div>

    </>
  )
}

export default App
