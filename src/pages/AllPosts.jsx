import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import service from "../appwrite/config";
import { Link } from 'react-router-dom';
import { where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        let query = [where("status", "==", "active")]; // 3. Start with a default query for public posts

        // 4. If a user is logged in, change the query to fetch their posts
        if (userData) {
            query = [where("userId", "==", userData.$id)];
        }

        service.getPosts(query).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false));

    // 5. Add `userData` to the dependency array to re-fetch when the user logs in/out
    }, [userData])

    if (loading) {
        return (
             <div className="w-full py-20 flex justify-center items-center bg-slate-50 min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
                    <h1 className="text-2xl mt-4 font-semibold text-slate-700">Loading All Posts...</h1>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 bg-slate-50 min-h-screen">
                <Container>
                    <div className="text-center py-20 bg-white rounded-xl shadow-md border border-slate-200">
                        <h1 className="text-3xl font-bold text-slate-800">No Posts Found</h1>
                         <p className="mt-4 text-lg text-slate-500">It looks like no one has posted anything yet. Why not be the first?</p>
                         <div className="mt-8">
                            <Link
                                to="/add-post"
                                className="inline-block rounded-md bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 transition-all duration-300 transform hover:scale-105"
                            >
                                Create a New Post
                            </Link>
                         </div>
                    </div>
                </Container>
            </div>
        );
    }

  return (
    <div className='w-full py-12 bg-slate-50 min-h-screen'>
        <Container>
            <div className="mb-10 border-l-4 border-teal-500 pl-6">
                <h1 className="text-4xl font-bold text-slate-900">All Posts</h1>
                <p className="mt-2 text-lg text-slate-600">Browse all articles from our community.</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {posts.map((post) => (
                    <div key={post.id} className='transform hover:-translate-y-2 transition-transform duration-300 ease-in-out'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts;