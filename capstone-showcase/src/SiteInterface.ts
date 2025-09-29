export interface ProjectObj {
  EntryID: number;
  Email: string;
  Name: string;
  ProjectTitle: string;
  ProjectDescription: string;
  Sponsor: string;
  NumberOfMembers: number;
  MemberNames: string;
  CourseNumber: string;
  Demo: string;  
  Power: string; 
  NDA: string;   
  VideoLink: string;
  VideoLinkRaw: string;
  DateStamp: string;
  ShouldDisplay: string; 
  position: string;
  winning_pic: string | null;
}

export interface WinnerSelection {
  position: string;
  projectId: number;
  projectName: string;
  pictures: string[];
}

export interface ShowcaseEntry {
  course: string;
  EntryID: number;
  video: string;
  shouldDisplay: "YES" | "NO"; 
  position: number;
  members: string;
  Sponsor: string;
  description: string;
  ProjectTitle: string;
  winning_pic: string | null;
  department?: string;
  NDA: "Yes" | "No"; 
  year: number;
  semester: "Spring" | "Summer" | "Fall" | "Winter"; 
};