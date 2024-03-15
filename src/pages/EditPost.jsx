import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

     useEffect(() =>{
        //slug matlab url for redirect to edit post
        //ydi url par click kia hai to appwriteService se post le aao aur use set kar do
        if(slug){
            appwriteService.getPost(slug)
            .then((post) => {
                if(post){
                    setPost(post)
                }
            })
        } else {
            //ydi url par click nhi kia hai to  home page par navigate karo
            navigate("/")
        }
     }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost
