import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-b from-cyan-900 to-blue-950 border-b-4 border-yellow-600 backdrop-blur-md bg-opacity-70 rounded-xl shadow-lg text-cyan-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img src="src/assets/Scubatocat.png" className="h-8" alt="Scubatocat Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-cyan-100">
                        Portfolio
                    </span>
                </Link>
                <div className="hidden md:block">
                    <ul className="flex space-x-8 font-semibold">
                        <li>
                            <Link
                                to="/about"
                                className={`transition-colors px-3 py-2 rounded-lg ${
                                    isActive("/about")
                                        ? "bg-yellow-600 text-blue-950 shadow"
                                        : "hover:bg-cyan-800 hover:text-yellow-200"
                                }`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/projects"
                                className={`transition-colors px-3 py-2 rounded-lg ${
                                    isActive("/projects")
                                        ? "bg-yellow-600 text-blue-950 shadow"
                                        : "hover:bg-cyan-800 hover:text-yellow-200"
                                }`}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`transition-colors px-3 py-2 rounded-lg ${
                                    isActive("/contact")
                                        ? "bg-yellow-600 text-blue-950 shadow"
                                        : "hover:bg-cyan-800 hover:text-yellow-200"
                                }`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
