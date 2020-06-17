import Account from "../pages/Account";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import TRoute from "../types/TRoute";
import CreatePublication from "../pages/CreatePublication";
import Messages from "../pages/Messages";
import Details from "../pages/Details";

const route_config: TRoute = {
    account: Account,
    login: Login,
    register: Register,
    search: Search,
    createPublication: CreatePublication,
    messages: Messages,
    details: Details
}

export default route_config;