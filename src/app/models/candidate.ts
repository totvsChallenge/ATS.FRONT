export interface Candidate {
    id?: number,
    name: string,
    file?: string,
    fileID?: string,
    blobFile: {
        id?: number,
        name: string | undefined
        created?: string | undefined,
        data: string | undefined,
    },
    candidateJobs?: Array<[]>,
}
