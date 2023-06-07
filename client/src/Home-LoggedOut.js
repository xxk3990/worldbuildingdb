import { useNavigate } from "react-router-dom";
export default function HomeLoggedOut() {
    const navigate = useNavigate();
    const login = () => {
        navigate('/login', {replace: true})
    }
    const createAccount = () => {
        navigate('/CreateAccount', {replace: true})
    }
    return (
        <div className="HomeLoggedOut">
            <h2>Welcome to Worldbuilding DB, a place for you to securely store information regarding any worlds you may be working on!</h2>
            <ul className="links">
                <li className="links-li"><button onClick={login}>Login</button></li>
                <li className="links-li"><button onClick={createAccount}>Create Account</button></li>
            </ul>
        </div>
    )
}