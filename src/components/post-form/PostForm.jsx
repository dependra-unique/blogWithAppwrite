import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// jab bhi edit button par click kareye to default value do => jo bhi default value aayegi mein use POstForm() function mein pass kar duga as a "post",,,, jo bhi es form ko use karega vo mujhe post ki default value dega edit button par click karke
function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    // console.log("post");

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    console.log(userData);

    const submit = async (data) => {
        //2 cases 
        //case1: => ydi post hai to update kar do post mein
        //case2 => ydi post nhi hai to post create kar do
        if(post){
            //dyi data mein image exist karti hai to appwriteService se us image ko upload kar do
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null


            //ydi image upload ho gyi hai to old post se image ko, database mein se delete kar do 
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id : undefined,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    
                })
                
                
                console.log(dbPost.$id);
                //ydi post create ho gyi to user ko redirect kar do 
                if(dbPost){
                    navigate(`post/${dbPost.$id}`)
                }
            }
        }
        
    }

    //slugTransform => means ydi two or more words ke beech mein space hai to us space ko desh(-) se replace kar do 
    const slugTransform = useCallback((value) => {
        if(value && typeof value == 'string')
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')

        return '';
    },[]) 

    //ab use karna hai slugTransform method ko optimize karke
    React.useEffect(() => {
       const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
       })

       return () => subscription.unsubscribe();
       
    }, [slugTransform, watch, setValue])




    return (
         <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input 
                label="Title: "
                placeholder="Title"
                className="mb-4"
                {...register("title", {
                    required: true
                })}
                />
                <Input 
                label="Slug: "
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {
                    required: true
                })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true
                    })
                }}
                />
                <RTE 
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className='w-1/3 px-2'>
                <Input 
                label="Featured Image: "
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg image/gif"    
                {...register("image", {
                    required: !post
                })}            
                />

                {post && (
                    <div className='w-full mb-4'>
                        <img 
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-lg'
                        />
                    </div>
                )}
                <Select 
                options={["active", "inactive"]}
                label="status"
                className="mb-4"
                {...register("status", {
                    required:true
                })}
                />

                <Button 
                type="submit"
                bgColor={post ? "bg-green-500" : undefined}
                className="w-full">
                    {post ? "update" : "submit"}
                </Button>
            </div>
         </form>
    )
}

export default PostForm
