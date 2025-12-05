import { FileItem } from "./file-item";

export interface App {
    id: string
    name: string
    icon: string;
    type: 'exe' | 'txt' | 'folder';
    component?: any;
    items?: FileItem[];
}
