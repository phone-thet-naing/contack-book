import { redirect } from "react-router-dom"
import { deleteContact } from "../contacts"
import { Props } from "./contact"

export async function action ({ params }: Props) {
    try {
        const response = await deleteContact(params.contactId)
        if (response) {
            alert('Contact Deleted Successfully!')
            return redirect("/")
        }
    } catch (error: any) {
        console.log("Error occurred in delete contact with: ", error.message)
        throw new Error(error)
    }
}