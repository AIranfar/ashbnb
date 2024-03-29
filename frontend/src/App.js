import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots";
import SpotDetails from "./components/SpotDetails";
import CreateASpot from "./components/CreateASpot";
import ManageSpots from "./components/ManageSpot";
import EditSpot from "./components/EditSpot";
import ManageReviews from "./components/ManageReviews";
import ManageBookings from "./components/ManageBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route path='/spots/new'>
            <CreateASpot />
          </Route>
          <Route exact path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route path='/reviews/current'>
            <ManageReviews />
          </Route>
          <Route path='/bookings/current'>
            <ManageBookings />
          </Route>
          <Route path='/spots/:id/edit'>
            <EditSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
