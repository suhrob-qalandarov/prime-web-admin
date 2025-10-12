import axios from'./api'

const AttachmentService = {

    // Upload multiple files
    async uploadFiles(files) {
        /*try {
            const formData = new FormData()
            files.forEach((file) => {
                formData.append("files", file)
            })

            const response = await fetch("/api/attachments/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) throw new Error("Failed to upload files")
            return await response.json()
        } catch (error) {
            console.error("Error uploading files:", error)
            throw error
        }*/
    },

    // Delete attachment
    async deleteAttachment(id) {
        /*try {
            const response = await fetch(`/api/attachments/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) throw new Error("Failed to delete attachment")
            return await response.json()
        } catch (error) {
            console.error("Error deleting attachment:", error)
            throw error
        }*/
    },
}

export default AttachmentService