import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { where } from 'firebase/firestore'; 
import service from "../appwrite/config"; // Your Firebase service
import { Container, PostCard } from '../components';

function Home() {
    // Get the primary driver of this component's state from Redux.
    const authStatus = useSelector((state) => state.auth.status);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // This effect correctly fetches posts ONLY when the user is logged in,
    // and clears them when logged out. It re-runs whenever authStatus changes.
    useEffect(() => {
        if (authStatus) {
            setLoading(true);
            const activePostsQuery = [where("status", "==", "active")];
            service.getPosts(activePostsQuery).then((response) => {
                if (response) {
                    setPosts(response.documents);
                }
            }).finally(() => setLoading(false));
        } else {
            setPosts([]);
            setLoading(false);
        }
    }, [authStatus]);

    // --- RENDER LOGIC ---

    // Case 1: The user is logged out. Show the inviting hero section.
    if (authStatus === false) {
        const heroStyle = {
            // ** IMPORTANT: Replace this with the path to your own background image **
            backgroundImage: `url('/path-to-your-background-image.jpg')`
        };

        return (
            <div
                className="relative w-full h-[calc(100vh-80px)] bg-cover bg-center bg-fixed"
                style={heroStyle}
            >
                {/* Semi-transparent overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                    <Container>
                        <div className="mx-auto max-w-3xl">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                                Share Your Voice, Inspire the World
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-slate-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
                                Join a community of creators and explorers. Login to start reading and sharing your own stories with a global audience.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    to="/login"
                                    className="rounded-md bg-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 transition-all duration-300 transform hover:scale-105"
                                >
                                    Login to Read Posts
                                </Link>
                                <Link to="/signup" className="text-sm font-semibold leading-6 text-white group [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
                                    Get Started <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }

    // If we reach this point, the user is logged in.
    // Now we handle the sub-states for the logged-in view.

    // Case 2: Logged in, but posts are still loading.
    if (loading) {
        return (
             <div className="w-full py-20 flex justify-center items-center bg-slate-50 min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
                    <h1 className="text-2xl mt-4 font-semibold text-slate-700">Loading Posts...</h1>
                </div>
            </div>
        );
    }

    // Case 3: Logged in, loading is done, but no active posts were found.
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 bg-slate-50 min-h-screen">
                <Container>
                    <div className="text-center py-20 bg-white rounded-xl shadow-md border border-slate-200">
                        <h1 className="text-3xl font-bold text-slate-800">No Published Posts Yet!</h1>
                         <p className="mt-4 text-lg text-slate-500">
                            It looks a little empty here. Why not be the first to share a story?
                         </p>
                         <div className="mt-8">
                            <Link to="/add-post" className="rounded-md bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500">
                                Create a Post
                            </Link>
                         </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    // Default Case: Logged in, loading is false, and there are posts to show.
    return (
        <div className='w-full py-12 bg-slate-50 min-h-screen'>
            <Container>
                 <div className="mb-10 border-l-4 border-teal-500 pl-6">
                    <h1 className="text-4xl font-bold text-slate-900">From the Blog</h1>
                    <p className="mt-2 text-lg text-slate-600">Explore the latest articles from our community of writers.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.id} className='transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;