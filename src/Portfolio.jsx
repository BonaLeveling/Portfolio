import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-scroll'
import gsap from 'gsap' 
import { ScrollTrigger } from 'gsap/ScrollTrigger' 

gsap.registerPlugin(ScrollTrigger);
function Portfolio() {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState('fr');
    const mainRef = useRef(null); // Ref pour les animations

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    // --- BLOC ANIMATIONS GSAP ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Animation Hero (Entrée)
            gsap.from(".hero-title", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.from(".hero-btns", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.8
            });

            // 2. Animation Sections au Scroll (About & Projects)
            const sections = ["#about", "#projects", "#skills", "#contact"];
            sections.forEach(section => {
                gsap.from(`${section} > *`, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                });
            });

            // 3. Animation spécifique des Cartes (Projets & Skills)
            // Dans ton useEffect
            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: "#projects",
                    start: "top 85%", // On déclenche un peu plus tard
                    toggleActions: "play none none none", // Force l'exécution
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                clearProps: "all" // TRÈS IMPORTANT : nettoie les styles après l'animation
            });
        }, mainRef);

        return () => ctx.revert(); // Nettoyage
    }, [lang]);

    const translations = {
        fr: {
            nav: ['À propos', 'Projets', 'Skills', 'Contact'],
            hero: { title: "CODE <br /> <span class='text-blue-600'>& DESIGN</span> <br /> MASTER.", sub: "Portfolio de Bona<span class='font-bold text-blue-600'>LEVELING</span>. Développeur Fullstack transformant le code en art visuel.", btn1: "Mes Projets", btn2: "Télécharger CV" },
            about: { title: "À propos de <span class='text-blue-600 underline'>moi</span>", p1: "Je m'appelle BonaLEVELING, un développeur passionné par la fusion entre la logique du backend et l'élégance du frontend.", p2: "Mon objectif est de construire des applications web qui racontent une histoire visuelle. Je me spécialise dans les écosystèmes React & Node.js.", exp: "1+ ANS", expSub: "D'Expérience", stat1: "Projets finis", stat2: "Satisfaction" },
            skills: "/ Mes Outils", 
            contact: { title: "/ Travaillons ensemble", sub: "UN PROJET <br /> EN TÊTE ?", btn: "Envoyer le message", social: "Retrouvez-moi sur" },
            projects: "/ Projets",
            projectList: [
                { title: "Pulse", desc: "Landing page futuriste pour une banque.", tech: "React • Tailwind.css • Gsap" , link: "https://pulse-psi-puce.vercel.app/" , img: "pulse.png"},
                { title: "FilmInfos", desc: "Site web de recherche d'informations sur un film ou une serie a partir d'un titre .", tech: "HTML • CSS • javascript • API Rest " , link: "https://film-infos.vercel.app/", img: "filmInfos.png" },
                { title: "Le sensei", desc: "Site web de recherche d'anime avec un chatbot type otaku. ", tech: "React • Express • Gemini API", link: "https://le-sensei.vercel.app/", img: "le-sensei.png" },
                { title: "Kitchen", desc: "Landing page moderne et chaleureux pour un restaurant.", tech: "React •Tailwind.css • Gsap", link: "https://kitchen-nine-gamma.vercel.app/", img: "kitchen.png"}
            ],
        },
        en: {
            nav: ['About', 'Projects', 'Skills', 'Contact'],
            hero: { title: "CODE <br /> <span class='text-blue-600'>& DESIGN</span> <br /> MASTER.", sub: "Bona<span class='font-bold text-blue-600'>LEVELING</span> Portfolio. Fullstack developer turning code into visual art.", btn1: "My Projects", btn2: "Download CV" },
            about: { title: "About <span class='text-blue-600 underline'>me</span>", p1: "My name is BonaLEVELING, a developer passionate about merging backend logic and frontend elegance.", p2: "My goal is to build web applications that tell a visual story. I specialize in React & Node.js ecosystems.", exp: "1+ YEARS", expSub: "Of Experience", stat1: "Finished projects", stat2: "Satisfaction" },
            skills: "/ My Tools",
            projects: "/ Portfolio",
            contact: { title: "/ Let's work", sub: "A PROJECT <br /> IN MIND ?", btn: "Send message", social: "Find me on" },
            projects: "/ Projects",
            projectList: [
                { title: "Pulse", desc: "Futuristic landing page for a bank.", tech: "React • Tailwind.css • Gsap", link: "https://pulse-psi-puce.vercel.app/" , img: "pulse.png" },
                { title: "FilmInfos", desc: "Website for searching for information about a film or series based on a title.", tech: "HTML • CSS • javascript • API Rest " , link: "https://film-infos.vercel.app/", img: "filmInfos.png"},
                { title: "Le sensei", desc: "Anime search website with an otaku-style chatbot.", tech: "React • Express • Gemini API", link: "https://le-sensei.vercel.app/", img: "le-sensei.png"},
                { title: "Kitchen", desc: "Modern and welcoming landing page for a restaurant.", tech: "React •Tailwind.css • Gsap", link: "https://kitchen-nine-gamma.vercel.app/", img: "kitchen.png"}
            ],
        }
        
    };

    const t = translations[lang];

    const frontSkills = [
        { name: 'HTML', img: 'html-5.png', level: 'expert' },
        { name: 'CSS', img: 'css-3.png', level: 'expert' },
        { name: 'Javascript', img: 'js.png', level: 'intermediate' },
        { name: 'React', img: 'atom.png', level: 'intermediate' },
        { name: 'Tailwind.css', img: 'tailwind.png', level: 'intermediate' },
        { name: 'Gsap', img: 'gsap.ico', level: 'intermediate' },
    ];

    const backSkills = [
        { name: 'Node.js', img: 'node-js.png', level: 'intermediate' },
        { name: 'Express.js', img: 'icons8-express-js-50.png', level: 'intermediate' },
        { name: 'Python', img: 'python.png', level: 'intermediate' },
        { name: 'APIrest', img: 'rest.png', level: 'Expert' },
        { name: 'PostgreSQL', img: 'elephant.png', level: 'intermediate' },
    ];

    return (
        <div ref={mainRef} className={`${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-slate-50 text-slate-900'} min-h-screen font-["Inter"] transition-colors duration-500 overflow-x-hidden`}>
            
            {/* Navbar */}
            <nav className='fixed top-0 w-full z-[100] px-6 py-5 flex justify-between items-center backdrop-blur-md border-b border-white/5'>
                <div className='text-xl font-black tracking-tighter font-["Fira_code"]'>
                    B<span className='text-blue-500'>.</span>LVL
                </div>
                
                <div className='flex items-center gap-2 md:gap-4'>
                    <ul className='hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-["Fira_code"]'>
                        {t.nav.map((item, index) => (
                            <li key={index}><Link to={['about', 'projects', 'skills', 'contact'][index]} smooth={true} spy={true} className='cursor-pointer hover:text-blue-500 transition-all'>{item}</Link></li>
                        ))}
                    </ul>

                    {/* Liens Sociaux Navbar */}
                    <div className='hidden sm:flex items-center gap-3 border-l border-white/10 pl-4 ml-2'>
                        <a href="https://avatars.githubusercontent.com/u/214480823?v=4" target="_blank" className='opacity-50 hover:opacity-100 transition-opacity'>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/isaac-drobo-5ab551306/" target="_blank" className='opacity-50 hover:opacity-100 transition-opacity'>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>

                    <button 
                        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                        className={`px-3 py-1 rounded border text-[10px] font-bold font-["Fira_code"] ${darkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'} transition-all ml-2`}
                    >
                        {lang.toUpperCase()}
                    </button>

                    <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg border ${darkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'} transition-all`}>
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden p-2 text-2xl relative z-[110]'>
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Menu Mobile Overlay */}
            <div className={`fixed inset-0 z-[100] bg-blue-600 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                {t.nav.map((item, index) => (
                    <Link key={index} to={['about', 'projects', 'skills', 'contact'][index]} smooth={true} onClick={() => setIsMenuOpen(false)} className='text-4xl font-black text-white italic hover:scale-110 transition-transform cursor-pointer font-["Fira_code"]'>
                        {item}
                    </Link>
                ))}
            </div>

            <main className='px-6 md:px-20 lg:px-40'>
                {/* Hero Section */}
                <section className=' pt-5 min-h-screen flex flex-col justify-center relative'>
                    <h1 className='hero-title text-5xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter' dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
                    <div className='hero-btns mt-10 flex flex-wrap gap-4'>
                        <Link to="projects" smooth={true} className='px-8 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer'>
                            {t.hero.btn1}
                        </Link>
                        <a href="mon-cv.pdf" download className={`px-8 py-4 border ${darkMode ? 'border-white' : 'border-black'} font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all flex items-center gap-2`}>
                            {t.hero.btn2}
                        </a>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className='py-24 border-t border-white/5'>
                    <div className='grid lg:grid-cols-2 gap-16 items-center'>
                        <div className='relative'>
                            <img src="https://avatars.githubusercontent.com/u/214480823?v=4" alt="BonaLEVELING" className='rounded-2xl w-full max-w-md grayscale hover:grayscale-0 transition-all duration-700 border-4 border-blue-600/20 shadow-2xl shadow-blue-600/10' />
                            <div className='absolute -bottom-6 -right-6 bg-blue-600 p-8 hidden md:block rounded-2xl'>
                                <p className='text-4xl font-black text-white italic tracking-tighter'>{t.about.exp}</p>
                                <p className='text-xs text-white uppercase font-bold tracking-widest'>{t.about.expSub}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase italic' dangerouslySetInnerHTML={{ __html: t.about.title }}></h2>
                            <p className='text-lg leading-relaxed opacity-70 mb-6'>{t.about.p1}</p>
                            <p className='text-lg leading-relaxed opacity-70 mb-8'>{t.about.p2}</p>
                        </div>
                    </div>
                </section>
                {/* Projects Section */}
                <section id="projects" className='py-24 border-t border-white/5'>
                    <h2 className='text-2xl font-black mb-12 font-["Fira_code"] text-blue-600 italic uppercase tracking-widest'>
                        {t.projects}
                    </h2>
                    
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {t.projectList.map((project, index) => (
                            <div key={index} className={`project-card group relative overflow-hidden rounded-xl border ${darkMode ? 'border-white/5 bg-[#111]' : 'border-black/5 bg-white'} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-600/10`}>
                                
                                {/* Image Placeholder / Overlay */}
                                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-transparent relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center  group-hover:scale-110 transition-transform duration-700">
                                        <img src={project.img} alt={project.title} className="h-full"/>
                                    </div>
                                    {/* Filtre de couleur au hover */}
                                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">
                                        {project.tech}
                                    </p>
                                    <h3 className="text-2xl font-black mb-3 italic tracking-tighter">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm opacity-60 leading-relaxed mb-6">
                                        {project.desc}
                                    </p>
                                    
                                    <a href={project.link} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                                        {lang === 'fr' ? 'Voir le projet' : 'See the project'} 
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className='flex justify-center'>
                    <a href="https://github.com/BonaLEVELING" className=' px-8 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer'>{lang==='fr'? 'Plus sur Github': 'More on Github'}</a>
                </div>

                {/* Skills Section (Inchangée) */}
                <section id="skills" className='py-24 border-t border-white/5'>
                    <h2 className='text-2xl font-black mb-12 font-["Fira_code"] text-blue-600 italic uppercase tracking-widest'>{t.skills}</h2>
                    <div className='space-y-16'>
                        <div>
                            <h3 className='text-xl font-bold mb-8'>Frontend Development</h3>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
                                {frontSkills.map((s) => (
                                    <div key={s.name} className={`p-8 rounded-3xl border ${darkMode ? 'border-white/5 bg-[#111]' : 'border-black/5 bg-white'} flex flex-col items-center gap-4 hover:border-blue-600 transition-all group hover:-translate-y-2`}>
                                        <img src={s.img} alt={s.name} className='w-12 h-12 object-contain group-hover:scale-125 transition-transform' />
                                        <div className='text-center'>
                                            <p className='font-bold text-sm'>{s.name}</p>
                                            <p className='text-[10px] text-blue-500 font-bold uppercase mt-1'>{s.level}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                           
                            <h3 className='text-xl font-bold my-8 '>Backend Development</h3>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
                                {backSkills.map((s) => (
                                    <div key={s.name} className={`p-8 rounded-3xl border ${darkMode ? 'border-white/5 bg-[#111]' : 'border-black/5 bg-white'} flex flex-col items-center gap-4 hover:border-blue-600 transition-all group hover:-translate-y-2`}>
                                        <img src={s.img} alt={s.name} className='w-12 h-12 object-contain group-hover:scale-125 transition-transform' />
                                        <div className='text-center'>
                                            <p className='font-bold text-sm'>{s.name}</p>
                                            <p className='text-[10px] text-blue-500 font-bold uppercase mt-1'>{s.level}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section avec Liens GitHub/LinkedIn */}
                <section id="contact" className='py-24 border-t border-white/5'>
                    <h2 className='text-2xl font-black mb-12 font-["Fira_code"] text-blue-600 italic uppercase tracking-widest'>{t.contact.title}</h2>
                    <div className='grid lg:grid-cols-2 gap-20'>
                        <div className='flex flex-col justify-center'>
                            <h3 className='text-4xl md:text-6xl font-black italic tracking-tighter mb-8' dangerouslySetInnerHTML={{ __html: t.contact.sub }}></h3>
                            
                            <p className='text-xs uppercase font-bold tracking-widest mb-6 opacity-40'>{t.contact.social}</p>
                            <div className='flex flex-col gap-4'>
                                {/* GitHub Link Card */}
                                <a href="https://github.com/BonaLeveling" target="_blank" className={`p-6 rounded-2xl border ${darkMode ? 'border-white/5 bg-[#111]' : 'border-black/5 bg-white'} flex items-center gap-6 hover:border-blue-600 transition-all group`}>
                                    <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors'>
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </div>
                                    <div>
                                        <p className='text-[10px] uppercase font-bold opacity-50 tracking-tighter'>GitHub</p>
                                        <p className='font-bold font-["Fira_code"]'>@BonaLeveling</p>
                                    </div>
                                </a>

                                {/* LinkedIn Link Card */}
                                <a href="https://www.linkedin.com/in/isaac-drobo-5ab551306/" target="_blank" className={`p-6 rounded-2xl border ${darkMode ? 'border-white/5 bg-[#111]' : 'border-black/5 bg-white'} flex items-center gap-6 hover:border-blue-600 transition-all group`}>
                                    <div className='w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors'>
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </div>
                                    <div>
                                        <p className='text-[10px] uppercase font-bold opacity-50 tracking-tighter'>LinkedIn</p>
                                        <p className='font-bold font-["Fira_code"]'>Isaac Drobo</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <form className={`p-10 rounded-[2.5rem] ${darkMode ? 'bg-[#111] border border-white/5' : 'bg-white shadow-2xl'} flex flex-col gap-6`}>
                            <input type="text" placeholder="Username" className='bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-600 transition-all' />
                            <input type="email" placeholder="Email" className='bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-600 transition-all' />
                            <textarea placeholder="Message..." rows="4" className='bg-transparent border-b border-white/10 py-4 outline-none focus:border-blue-600 transition-all'></textarea>
                            <button className='w-full py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20'>
                                {t.contact.btn}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className='py-12 border-t border-white/5 text-center'>
                <p className='text-[10px] opacity-40 font-["Fira_code"] tracking-[0.5em] uppercase'>{lang==='en' ? '© 2025 BonaLEVELING • Build to Elevate' : '© 2025 BonaLEVELING • Construire pour élever'}</p>
            </footer>
        </div>
    )
}

export default Portfolio;