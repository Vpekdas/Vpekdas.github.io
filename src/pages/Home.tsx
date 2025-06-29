import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import AboutCard from "../components/Card/About/AboutCard";
import { FEATURED_PROJECTS, profile } from "../constants";
import ProjectCard from "../components/Card/Project/ProjectCard";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center space-y-12 px-2 py-8">
                <Hero name="Volkan Pekdas" job="Junior Unity Game Developer " path="/assets/Avatar.webp" />
                <AboutCard
                    name={profile.name}
                    job={profile.job}
                    path={profile.avatarPath}
                    bio={profile.bio}
                    location={profile.location}
                    favoriteTech={profile.favoriteTech}
                    funFact={profile.funFact}
                    socials={{
                        props: profile.socials.props,
                        header: profile.socials.header,
                    }}
                    header={true}
                />
                <div className="flex flex-col items-center w-full">
                    <h1
                        className="mb-8 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r
                        from-cyan-400 via-blue-400 to-blue-900 text-transparent bg-clip-text drop-shadow-lg md:text-5xl
                        lg:text-6xl text-center w-full"
                    >
                        Featured Projects
                    </h1>
                    <div className="flex flex-row justify-center gap-8 flex-wrap w-full">
                        {FEATURED_PROJECTS.map((project, index) => (
                            <ProjectCard
                                key={index}
                                image={project.image}
                                title={project.title}
                                technologies={project.technologies}
                                description={project.description}
                                tags={project.tags}
                                href={project.href}
                                style={{
                                    animationDelay: `${index * 0.5}s`,
                                    animationFillMode: "both",
                                }}
                            />
                        ))}
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
}

export default Home;
