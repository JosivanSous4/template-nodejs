export const getMimeType = (name) => {
    const extension = name.match(
        /\.(jpg|jpeg|png|pdf|gif)$/i
    )

    if (extension) {
        return extension
    }
}
