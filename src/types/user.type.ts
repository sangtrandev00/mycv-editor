export interface IUser {
    id: string;
    jobTitle: string;
    links: ILink,
    info: IInfo,
    techSkills: {
      id: string;
      name: string;
    }[],
    languages: string[],
    education:IEducation[],
    awards: {
      name: string;
      timeAchieve: string;
    }[],
    careerObject: string,
    certifications: string[],
    additionSkills: string[],
    softSkills: string[],
    projects: IProject[]
  }


  export interface IProject {
    name: string;
    dateStart: string;
    dateEnd: string;
    desc: string;
    website: string;
    repoLink: string;
    members: number;
    position: string;
    technologies: string;
  }

  export interface IEducation {
    id: string;
    schoolName: string;
    major: string;
    level: string;
    gpa: number;
    timeStart: string;
    timeEnd: string;
  }

  export interface IInfo {
    name: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
  }

  export interface ILink {
    website: string;
    github: string;
    linkedin: string;
    facebook: string;
  }