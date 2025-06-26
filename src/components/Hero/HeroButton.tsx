import { Link } from "react-router-dom";

const HeroButton: React.FC<{ to: string; text: string }> = ({ to, text }) => {
    return (
        <Link
            to={to}
            className="px-8 py-3 rounded-full shadow-lg  bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-900 ring-2 ring-cyan-400 
                text-lg font-bold text-cyan-50 hover:ring-cyan-200 hover:scale-105"
        >
            {text}
        </Link>
    );
};

export default HeroButton;
