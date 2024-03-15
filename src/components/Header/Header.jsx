import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    //store mein se state check karna hoga ki user login hai ya logout
    const authStatus = useSelector((state) => state.auth.status)

    //navigate, navigation bar ke lia use karte hai,,, isme array ki form mein value store hoti hai
    const navigate = useNavigate()

    //each button ke kia object mein ,,, button ka name ,url/, active: true => ye sabhi button ki property hai
    //!authStatus => islia kia hai ydi user phle se logged in hai to use login and signup ka page dikhane ki jarurat hi nhi hai
    const navItems = [
        {
            name: "Home",
            slug: "/" ,     //iska matlab redirect the button to the "home"
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]

   
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to="/">
                            <Logo width='70px'/>
                        </Link>
                    </div>

                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name}>
                                <button
                                onClick={() => navigate(item.slug)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >{item.name}</button>
                            </li>
                        ) : null
                        )}

                        {/* ydi user logged in hai to use logout ka btn deekha do ===> user logged in hai ya nhi iska pata user ke status se chalega ,,, ydi status true hoga to user logged in hai*/}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
