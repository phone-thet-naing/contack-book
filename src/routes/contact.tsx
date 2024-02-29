import { Form, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export interface Props {
    params: {
        contactId: string
    },
    contact: Contact,
    request: Request
}

export interface Contact {
    id?: number
    first: string 
    last: string 
    avatar: string 
    twitter: string 
    notes: string 
    favorite: boolean
}

export async function loader ({ params }: Props) {
    const contact = await getContact(params.contactId)
    return { contact }
}

export async function action ({ params }: Props) {
    const contact = await getContact(params.contactId)
    const lastFavStatus = contact.favorite
    const updatedContact = {...contact, favorite: lastFavStatus ? !lastFavStatus : true }
    const response = await updateContact(params.contactId, updatedContact)
    console.log("⭐ ", response)
    return null;
}

function Favorite({ contact }: { contact: Contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}

export default function Contact() {
    const { contact } = useLoaderData()

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || "/public/lol-svgrepo-com.svg"}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (!confirm("Please confirm you want to delete this record.")
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" onClick={() => console.log(contact)}>Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}


