import Index from '../components/pages/Index'
import LoginPage from '../components/pages/Login'
import RegisterPage from '../components/pages/Register'

const components = {
    index: {
        url: "/index",
        component: Index
    },
    login: {
        url: "/login",
        component: LoginPage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
};

export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
            
        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.index,
        ],
        redirectRoutes: "/index"
    }
};