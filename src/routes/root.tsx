import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { Contact } from "./contact";
import { useEffect, useState } from "react";

export async function loader() {
    const contacts = await getContacts(null)
    return { contacts }
}

export async function action() {
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
    const { contacts }= useLoaderData()
    const navigation = useNavigation()
    const [searchKeyword, setSearchKeyword] = useState("")
    const [showSearchSpinner, setShowSearchSpinner] = useState(false)

    const filterContacts = (searchTerm: string) => {
        return contacts.filter((contact: Contact) => 
            contact.first?.toLowerCase().includes(searchTerm.toLowerCase()) ||   
            contact.last?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    useEffect(() => {
        
    }, [searchKeyword])

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search" onSubmit={(e) => {
                        e.preventDefault()
                        console.log(searchKeyword)
                    }}>
                        <input
                            id="q"
                            className={showSearchSpinner ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            value={searchKeyword}
                            onChange={(e) => {
                                setSearchKeyword(e.target.value)
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!showSearchSpinner}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                    {/* <button>Filter</button> */}
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {(searchKeyword && filterContacts(searchKeyword).length !== 0) && <p style={{fontSize: "0.8rem", color: "grey"}}>TOP NAME MATCHES</p>}
                            {filterContacts(searchKeyword).map((contact: Contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                            {filterContacts(searchKeyword).length === 0 ? <div><i>No contact found</i></div> : ""}
                        </ul>
                    ) : (
                        <p>
                            <i>No Contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </div>
        </>
    )
}