import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { getCurrentUser } from "./store/session";
import LoginForm from "./components/SessionForms/LoginForm/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm/SignupForm";
import Modal from "./components/Modal";
import SplashPage from "./components/SplashPage";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      {loaded && (
        <>
          <Switch>
            <Route exact path="/" component={SplashPage}></Route>
            <AuthRoute exact path="/login" component={LoginForm} />
            <AuthRoute exact path="/signup" component={SignupForm} />
          </Switch>
        </>
      )}
      <Modal />
    </>
  );
};

export default App;
