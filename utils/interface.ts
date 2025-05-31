// Define types for project data
export interface Project {
  title: string;
  link: string;
  imgUrl: string;
  description?: string;
}

export interface ProjectCardProps extends Project {
  number: string;
}

export interface PageWrapperProps {
  children: React.ReactNode;
}
