import TodoPage from '../components/pages/TodoList/TodoList'
import LoginPage from '../components/pages/Login'
import ProfilePage from '../components/pages/Profile'
import RegisterPage from '../components/pages/Register'
import Tester from '../components/pages/TestPage'

const components = {
    todo: {
        url: "/todo",
        component: TodoPage
    },
    login: {
        url: "/login",
        component: LoginPage
    },
    profile: {
        url: "/profile",
        component: ProfilePage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
    tester: {
        url: "/test",
        component: Tester
    }
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
            components.todo,
            components.profile,
            components.tester
        ],
        redirectRoutes: "/todo"
    }
};