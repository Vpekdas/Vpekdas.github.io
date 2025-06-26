import DecodeEffect from "../components/DecodeText";
import NavBar from "../components/NavBar/NavBar";
import Section from "../components/Section";

function Contact() {
    return (
        <>
            <NavBar />
            <Section header={"How to reach me ?"} text="" />
            <DecodeEffect
                text={"Joking of course, here is all my contacts, see you soon !"}
                className="mb-8 font-mono text-lg text-cyan-300 drop-shadow-lg bg-gradient-to-r from-cyan-800 via-cyan-700 to-blue-900 rounded px-3 py-1 shadow-sufokia-glow"
            />
        </>
    );
}

export default Contact;
