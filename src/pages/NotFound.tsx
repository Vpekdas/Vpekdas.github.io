import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Tentacle from "../components/Tentacle";
import { Colors, EndPaths, InitialPaths } from "../constants";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <h1
                className=" w-full mb-10 drop-shadow-[0_2px_10px_rgba(0,225,255,0.5)] 
                        bg-gradient-to-r from-cyan-300 via-sky-500 to-indigo-900 bg-clip-text
                        text-5xl font-black text-transparent text-center
                        md:text-6xl lg:text-7xl"
            >
                There is nothing here, except these weird tentacles.
            </h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100vw"
                height="100vh"
                viewBox="0 0 1226.887 908"
                preserveAspectRatio="xMidYMax slice"
                onClick={() => navigate("/")}
            >
                <Tentacle id={"tent1"} initialPath={InitialPaths[0]} finalPath={EndPaths[0]} color={Colors[0]} />
                <Tentacle id={"tent2"} initialPath={InitialPaths[1]} finalPath={EndPaths[1]} color={Colors[0]} />
                <Tentacle id={"tent3"} initialPath={InitialPaths[2]} finalPath={EndPaths[2]} color={Colors[1]} />
                <Tentacle id={"tent4"} initialPath={InitialPaths[3]} finalPath={EndPaths[3]} color={Colors[1]} />
                <Tentacle id={"tent5"} initialPath={InitialPaths[4]} finalPath={EndPaths[4]} color={Colors[1]} />
            </svg>
            <Footer />
        </>
    );
}

export default NotFound;
