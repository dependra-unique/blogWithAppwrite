import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller} from 'react-hook-form'



//this is a real time editor(RTE)
export default function RTE({name, control, label, defaultValue = ""}) {
    return (

        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller 
            name = {name || "content"}
            control = {control}
            render = {({field: {onChange}}) => (
                <Editor 
                apiKey='6saqufkejg482igum458tafs5pksflsi36oau6m2s5vhzb6o'
                initialValue={defaultValue}
                init={
                    {   
                        
                        initialValue:defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            
                        ],
                        toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft alignright aligncenter alignjustify | bullist numlist outdent indent | removeformat | help",

                        content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }"
                
                    }
                }
                onEditorChange={onChange   }

                />
            )}
            />
        </div>




















        // <Editor 
        // initialValue='default value'
        // init={
        //     {
        //         branding: false,
        //         height: 500,
        //         menubar: true,
        //         plugins: [
        //             'advlist autolink lists link image charmap print preview anchor',
        //             'searchreplace visualblocks code fullscreen',
        //             'insertdatetime media table paste code help wordcount'
        //         ],
        //         toolbar: 'undo redo | formatselect | bold italic backcolor | \
        //         alignleft aligncenter alignright alignjustify | \
        //         bullist numlist outdent indent | removeformat | help'
        //     }
        // }
        // />
    )
}


