import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? String(post.userId) === String(userData.$id) : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        // Add a confirmation dialog for better UX
        const isConfirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.");
        if (isConfirmed) {
            appwriteService.deletePost(post.id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };
    
    if (loading) {
         return (
             <div className="w-full py-20 flex justify-center items-center bg-slate-50 min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
                </div>
            </div>
        )
    }

    return post ? (
        <div className="py-12 bg-slate-50 min-h-screen">
            <Container>
                {/* Featured Image */}
                <div className="w-full flex justify-center mb-8">
                    <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className="rounded-xl shadow-2xl object-cover w-full max-h-[500px] mx-auto"
                    />
                </div>

                {/* Post Title */}
                <div className="w-full mb-6 text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">{post.title}</h1>
                </div>

                {/* Author Control Panel */}
                {isAuthor && (
                    <div className="border-y border-slate-300 py-4 mb-6 flex items-center gap-x-6">
                        <p className="text-sm font-medium text-slate-600">POST:</p>
                        <Link to={`/edit-post/${post.id}`}>
                            <Button className="bg-green-600 hover:bg-green-700 w-auto px-6">
                                Edit
                            </Button>
                        </Link>
                        <Button
                            onClick={deletePost}
                            className="bg-red-600 hover:bg-red-700 w-auto px-6"
                        >
                            Delete
                        </Button>
                    </div>
                )}
                
                {/* Parsed HTML Content */}
                <div className="prose prose-slate max-w-none lg:prose-xl">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}