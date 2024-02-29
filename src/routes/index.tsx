import { getContacts } from "../contacts"
import { useLoaderData } from "react-router-dom"
import { Contact } from "./contact"

export async function loader () {
    const contacts = await getContacts(null)
    return { contacts }
}

export default function Index () {
    const { contacts } = useLoaderData()

    return (
        <>
            <h1 style={{color: "#818589"}}>My Contacts</h1>

            <p>Total contacts: <b>{contacts.length}</b></p>

            <p>Favorites: <b>{contacts.filter((contact: Contact) => contact.favorite === true).length}</b></p>
        </>
    )
}