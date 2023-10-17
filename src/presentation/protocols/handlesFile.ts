export interface HandlesFile {
    upload: (fileName, file, bucket) => Promise<any>
    getFiles: (nameFile: string, bucket: string) => Promise<any>
    delete(fileName, bucket): Promise<void>
}
