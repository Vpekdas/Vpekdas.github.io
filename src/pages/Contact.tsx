import Socials from "../components/Card/About/Socials";
import DecodeEffect from "../components/DecodeText";
import NavBar from "../components/NavBar/NavBar";
import Section from "../components/Section";
import { profile } from "../constants";

const socials = profile.socials;

function Contact() {
    return (
        <>
            <NavBar />
            <Section header={"How to reach me ?"} text="" />
            <DecodeEffect
                text={"All my socials are below : "}
                className="glow mb-8 font-mono text-lg text-cyan-300 drop-shadow-lg bg-gradient-to-r from-cyan-800 via-cyan-700 to-blue-900 rounded px-3 py-1 "
            />
            <Socials socialProps={socials.props} header={false} />
        </>
    );
}

export default Contact;
