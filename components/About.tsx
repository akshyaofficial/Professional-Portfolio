import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Code, Lightning, Rocket, Heart, Database, GitBranch, Cube, Terminal, Cloud } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'JavaScript', level: 90 },
    { icon: Code, name: 'Python', level: 88 },
    { icon: Code, name: 'Java', level: 85 },
    { icon: Code, name: 'React/Redux', level: 90 },
    { icon: Terminal, name: 'Node.js/Express', level: 88 },
    { icon: Database, name: 'MongoDB', level: 87 },
    { icon: Database, name: 'Firebase', level: 85 },
    { icon: Cloud, name: 'AWS', level: 83 },
    { icon: Cube, name: 'Docker', level: 80 },
    { icon: GitBranch, name: 'Git/GitHub', level: 89 },
    { icon: Lightning, name: 'CI/CD Pipelines', level: 82 },
    { icon: Rocket, name: 'System Design', level: 85 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%"
        }
      });

      gsap.from(contentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%"
        }
      });

      gsap.from(skillsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 85%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse" />

              <div className="relative w-full h-full glass rounded-full p-2 hover:shadow-glow-primary transition-all duration-500 group">
                <div className="w-full h-full cursor-pointer rounded-full overflow-hidden bg-gradient-secondary">
                  <img src="/Images/profileLogo.jpg" alt="Akshya Kumar Panda - Full Stack Developer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-float" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
                About <span className="text-primary-glow">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full mb-6" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm an Engineering-focused Full Stack and Cloud Engineer with strong foundations in data structures, system design, and distributed systems. Experienced in building cloud-native systems, internal tooling, and scalable web platforms using MERN stack and Platform Engineering principles. I specialize in creating secure RESTful APIs, infrastructure automation, and leveraging AI-assisted development to ship reliable, production-grade systems.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My skill set spans both frontend and backend development with React, Node.js, Express, and MongoDB, along with cloud technologies like AWS and Docker. I'm passionate about solving real-world problems with efficient, scalable solutions while improving observability and deployment reliability in fast-paced environments.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-primary-glow font-medium">Fresher</span>
                {/* <span className="text-muted-foreground ml-1">Years Experience</span> */}
              </div>
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-secondary-glow font-medium">5+</span>
                <span className="text-muted-foreground ml-1">Projects Completed</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-accent-glow font-medium">Top 10%</span>
                <span className="text-muted-foreground ml-1">Academic Rank</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-light text-center text-foreground mb-12">
            My <span className="text-primary-glow">Skills</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="glass p-6 cursor-pointer rounded-xl hover:shadow-glow-primary transition-all duration-300 hover:scale-105 group">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-bounce">
                    <skill.icon size={24} className="text-primary-foreground" />
                  </div>

                  <h4 className="text-lg font-medium text-foreground">{skill.name}</h4>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                  </div>

                  <span className="text-primary-glow font-medium">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default About;