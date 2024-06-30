import authService from "../services/auth.service";

export default function Header() {
    function logout() {
        authService.logout();
    }

    return (
        <header>
            <nav>
                <a onClick={logout}>
                    <button type="button">Logout</button>
                </a>
            </nav>
        </header>
    );
}