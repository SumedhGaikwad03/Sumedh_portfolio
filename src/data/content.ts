// ---------------------------------------------------------------------------
// SITE CONTENT HUB
// Re-exports canonical modular data files for backward compatibility.
// ---------------------------------------------------------------------------

import { profileData, statusData, summaryData, currentData, type ProfileData, type StatusData, type SummaryData, type CurrentData } from "./profile";
import { projectsData, type Project } from "./projects";
import { experienceData, type ExperienceItem } from "./experience";
import { educationData, certificationsData, publicationData, type EducationData, type CertificationData, type PublicationData } from "./academics";
import { technologiesData, type TechCategory } from "./technologies";
import { mascotDiscoveryTips } from "./mascotTips";
import { PROJECT_EVIDENCE, type ProjectEvidence } from "./projectEvidence";

export type {
  ProfileData,
  StatusData,
  SummaryData,
  CurrentData,
  Project,
  ExperienceItem,
  EducationData,
  CertificationData,
  PublicationData,
  TechCategory,
  ProjectEvidence,
};

export const profile = profileData;
export const status = statusData;
export const summary = summaryData;
export const current = currentData;
export const projects = projectsData;
export const experience = experienceData;
export const education = educationData;
export const certifications = certificationsData;
export const publication = publicationData;
export const technologies = technologiesData;
export { mascotDiscoveryTips, PROJECT_EVIDENCE };
