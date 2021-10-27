import useRoutes from "../use-router/UseRouter"
import './App.css'

const App = () => {
  const isAuth = true
  const routes = useRoutes(isAuth)

  return (
      <>
        <div className="App">
          {routes}
        </div>
      </>
  )
}

export default App
