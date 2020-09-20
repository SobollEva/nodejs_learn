type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
export type Group = {
    group_id: string;
    name: string;
    permission: Permission[];
}
