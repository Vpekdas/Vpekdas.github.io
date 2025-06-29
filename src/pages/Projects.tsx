import ProjectCard from "../components/Card/Project/ProjectCard";
import NavBar from "../components/NavBar/NavBar";
import Section from "../components/Section";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "../constants";

function Projects() {
    return (
        <>
            <NavBar />
            <Section header="My Projects" text="Here you can explore some of the projects I'm most proud of. 🤿" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
                {OTHER_PROJECTS.map((project, index) => (
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
        </>
    );
}

export default Projects;
