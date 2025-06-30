function ProjectButton({ href }: { href: string }) {
    return (
        <div className="flex justify-center">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 mb-2 rounded-lg 
                bg-cyan-600 text-white font-medium text-sm text-center
                hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 focus:outline-none transition-colors"
            >
                See code on GitHub
            </a>
        </div>
    );
}

export default ProjectButton;