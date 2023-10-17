export const SanitizeIdentification = (dado: string) => {
    if (!dado) {
        return null
    }

    return dado.replace(/[^\d]+/g, '')
}

export const RemoveAccents = (data: string) => {
    if (!data) {
        return ""
    }

    return data.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
