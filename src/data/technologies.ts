export interface TechCategory {
  label: string;
  items: string[];
  coreItems?: string[]; // Highlighted in Standard mode
}

export const technologiesData: TechCategory[] = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "SQL"],
    coreItems: ["TypeScript", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "WebSocket (Socket.io)", "Authentication (JWT)", "MVC Architecture"],
    coreItems: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "Socket.io"],
  },
  {
    label: "Databases & ORM",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "pgvector"],
    coreItems: ["PostgreSQL", "MongoDB", "Prisma ORM"],
  },
  {
    label: "AI / Machine Learning",
    items: ["PyTorch", "Double Deep Q-Networks (DDQN)", "Reinforcement Learning", "Machine Learning Fundamentals", "Model Integration", "Inference Pipelines"],
    coreItems: ["PyTorch", "Reinforcement Learning", "DDQN"],
  },
  {
    label: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design"],
    coreItems: ["React.js", "Tailwind CSS"],
  },
  {
    label: "Tools & Infrastructure",
    items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Render", "Eclipse SUMO", "TraCI"],
    coreItems: ["Git", "Docker", "Postman", "Vercel"],
  },
];
