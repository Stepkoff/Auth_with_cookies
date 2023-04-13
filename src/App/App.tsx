import "./App.sass";
import {RouterProvider} from 'react-router-dom';
import {Routes} from "./Routes";
import {useAuth} from "../Modules/AuthUser";
import LoadingSpinner from "../UI/LoadingSpinner";

const App = () => {
  const auth = useAuth()
  if(!auth.isLoaded) return <LoadingSpinner/>
  return (
    <>
      <RouterProvider router={Routes}/>
    </>
  );
}

export default App;