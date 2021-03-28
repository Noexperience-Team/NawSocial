import { Avatar,Input} from '@material-ui/core'
import VideocamIcon from'@material-ui/icons/Videocam'
import PhotoLibraryIcon from'@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import React, { useState } from 'react'
import './MessageSender.css'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'
import db from '../firebase'

import axios from '../axios'
import FormData from 'form-data'
const MessageSender = () => {
    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState(null)
    const [{ user }, dispatch] = useStateValue()

    console.log(user)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (image){
            const imgForm=new FormData()
            imgForm.append('file',image,image.name)
            axios.post('/upload/image',imgForm,{
                headers:{
                    'accept':'application/json',
                    'Accept-Language':'en-US,en;q=0.8',
                    'Content-Type':`multipart/form-data;boundary=${imgForm._boundary}`,
                }
            }).then((res)=>{
                console.log(res.data)
                const postData={
                    text:input,
                    imgName:res.data.filename,
                    user:user.displayName,
                    avatar:user.photoURL,
                    timestamp:Date.now()
                }
                console.log(postData)
                savePost(postData)
            })
        }else{
            const postData={
                text:input,
                user:user.displayName,
                avatar:user.photoURL,
                timestamp:Date.now()
            }
            console.log(postData)
                savePost(postData)
        }
        setImageUrl('')
        setInput('')
        setImage(null)
    }
    const savePost=async(postData)=>{
        await axios.post('/upload/post',postData).then((resp)=>{
            console.log(resp)
        })
    }

    return (
        <div className='messageSender'>
            <div className="messageSender__top">
        
                <Avatar src='https://yt3.ggpht.com/yti/ANoDKi79ifgf0-36GEVN7kKc5p3mZjoDya83164bOuMrDw=s88-c-k-c0x00ffffff-no-rj-mo'/>
                <form>
                    <input type="text" className="messageSender__input" 
                        placeholder="فرغ قليبك" 
                        value={input} 
                        onChange={(e)=>setInput(e.target.value)}
                    />
 
                    <input 
                        type='file'
                        className='messageSender__fileSelector' onChange={handleChange} 
                    />
                        <button 
                        onClick={handleSubmit}
                        type='submit'>Hidden Submit</button>
                </form>
            </div>
            <div className="messageSender__bottom">
                <div className='messageSender__option'>
                    <VideocamIcon style={{color:'red'}} />
                    <h3>نحلو على المباشر</h3>
                </div>
                <div className='messageSender__option'>
                    <PhotoLibraryIcon style={{color:'green'}}/> 
                    <h3>تصاور و فيديوهات</h3>
                </div>
                <div className='messageSender__option'>
                    <InsertEmoticonIcon style={{ color:'orange'}}/>
                    <h3>شنية الجو؟</h3>
                </div>

            </div>
        </div>
    )
}

export default MessageSender
