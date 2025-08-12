import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import service from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true);
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            }).finally(() => setLoading(false));
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (loading) {
         return (
             <div className="w-full py-20 flex justify-center items-center bg-slate-50 min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
                    <h1 className="text-2xl mt-4 font-semibold text-slate-700">Loading Editor...</h1>
                </div>
            </div>
        )
    }

  return post ? (
    <div className='py-12 bg-slate-50 min-h-screen'>
        <Container>
            <div className="mb-10 border-l-4 border-teal-500 pl-6">
                <h1 className="text-4xl font-bold text-slate-900">Edit Mode</h1>
                <p className="mt-2 text-lg text-slate-600">You are currently editing your post: <span className='font-semibold'>{post.title}</span></p>
            </div>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost;