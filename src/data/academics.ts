export interface EducationData {
  degree: string;
  school: string;
  period: string;
  sgpa: string;
  cgpa: string;
  honors: string;
}

export interface CertificationData {
  name: string;
  issuer: string;
  info: string;
  period: string;
  url: string;
}

export interface PublicationData {
  title: string;
  authors: string;
  journal: string;
  info: string;
  url: string;
  issn: string;
}

export const educationData: EducationData = {
  degree: "B.E. Computer Engineering",
  honors: "Honors: Artificial Intelligence & Machine Learning",
  school: "Savitribai Phule Pune University (SPPU)",
  period: "2022 — 2026",
  sgpa: "SGPA: 9.47 (latest semester)",
  cgpa: "CGPA: 8.33 (overall, so far)",
};

export const certificationsData: CertificationData[] = [
  {
    name: "Full Stack Web Development",
    issuer: "upGrad",
    info: "~10-month program covering the MERN stack, Data Structures & Algorithms, and professional software development practices.",
    period: "2024 — 2025",
    url: "https://upgrad.certificate.givemycertificate.com/c/2d5285df-4327-4f58-be58-8c063383a459",
  },
];

export const publicationData: PublicationData = {
  title: "Adaptive Urban Traffic Signal Optimization Using Reinforcement Learning: A D-DQN Approach",
  authors: "Prof. P.R. Patil, Sumedh Gaikwad, Nimish Darne, Yash Joshi",
  journal: "International Journal of Innovative Research in Technology (IJIRT)",
  info: "Vol. 12, Issue 11, pp. 14500–14513 · April 2026",
  issn: "ISSN: 2349-6002",
  url: "https://ijirt.org/",
};
