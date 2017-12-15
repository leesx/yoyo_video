import React, {PropTypes} from "react";
import {
    Framework7App,
    Statusbar,
} from "framework7-react";
import {routes} from "../routes";
import MainViews from './MainViews';
import VideoList from "./pages/VideoList";


let currentRoute;
let framework7;
export const getCurrentRoute = () => currentRoute;
export const getFramework7 = () => framework7;

export const App = () => (
    //Change themeType to "material" to use the Material theme
    <Framework7App
        onFramework7Init={f7 => framework7 = f7}
        onRouteChange={route => currentRoute = route}
        themeType="ios"
        routes={routes}
    >
        <Statusbar />
        <MainViews />
    </Framework7App>
);
