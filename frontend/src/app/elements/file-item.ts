export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'txt' | 'exe';
    component?: any;
    children?: FileItem[]; 
}
