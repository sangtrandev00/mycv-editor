export interface IUser {
    id: string;
    jobTitle: string;
    links: {
        website: string;
        github: string;
        linkedin: string;
        facebook: string;
    },
    info: {
      name: string;
      dateOfBirth: string;
      phone: string;
      email: string;
      address: string;
      avatar: string;
    },
    techSkills: {
      id: string;
      name: string;
    }[],
    languages: string[],
    education: {
      id: string;
      schoolName: string;
      major: string;
      level: string;
      gpa: number;
      timeStart: string;
      timeEnd: string;
    }[],
    awards: {
      name: string;
      timeAchieve: string;
    }[],
    careerObject: string,
    certifications: string[],
    additionSkills: {
      id: string;
      name: string;
    }[],
    softSkills: {
      id: string;
      name: string;
    }[],
    projects: {
      name: string;
      dateStart: string;
      dateEnd: string;
      desc: string;
      repoLink: string;
      numbers: number;
      position: string;
      technologies: string;
    }[]
  }