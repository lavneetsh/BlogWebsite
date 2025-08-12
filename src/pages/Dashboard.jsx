// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';
import { where } from 'firebase/firestore'; 
import { Container, Button } from '../components/index'; // Assuming index exports your components

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        // Fetch posts created only by the currently logged-in user
        if (userData) {
           const userPostsQuery = [where("userId", "==", userData.$id)];

            service.getPosts(userPostsQuery)
                .then((response) => {
                    if (response) {
                        setPosts(response.documents);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [userData]);

    // Inside src/components/Dashboard.jsx

const deletePost = (postId, featuredImage) => { // The second argument is the full image object
    const isConfirmed = window.confirm("Are you sure you want to permanently delete this post?");
    if (isConfirmed) {
        service.deletePost(postId).then((status) => {
            if (status) {
                // Pass only the image's `path` to the deleteFile service
                if (featuredImage?.path) {
                    service.deleteFile(featuredImage.path);
                }
                // Update state to remove the post from the UI instantly
                setPosts(posts.filter(post => post.id !== postId));
            }
        });
    }
};



    if (loading) {
        return (
            <div className="w-full py-20 flex justify-center items-center bg-slate-50 min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
                    <h1 className="text-2xl mt-4 font-semibold text-slate-700">Loading Your Dashboard...</h1>
                </div>
            </div>
        );
    }
    
    const stats = {
        total: posts.length,
        active: posts.filter(p => p.status === 'active').length,
        inactive: posts.filter(p => p.status === 'inactive').length
    };

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <Container>
                {/* Header */}
                <div className="mb-10 border-l-4 border-teal-500 pl-6">
                    <h1 className="text-4xl font-bold text-slate-900">Welcome back, {userData?.name}!</h1>
                    <p className="mt-2 text-lg text-slate-600">Here's a summary of your activity.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                        <h3 className="text-slate-500 font-medium">Total Posts</h3>
                        <p className="text-4xl font-bold text-slate-900 mt-2">{stats.total}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                        <h3 className="text-slate-500 font-medium">Active Posts</h3>
                        <p className="text-4xl font-bold text-green-600 mt-2">{stats.active}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                        <h3 className="text-slate-500 font-medium">Inactive Posts</h3>
                        <p className="text-4xl font-bold text-amber-600 mt-2">{stats.inactive}</p>
                    </div>
                </div>

                {/* Posts Table */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Your Posts</h2>
                        <Link to="/add-post">
                            <Button className="w-auto px-5">Create New Post</Button>
                        </Link>
                    </div>
                    
                    {posts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-500">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Title</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Created</th>
                                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map(post => (
                                        <tr key={post.id} className="bg-white border-b hover:bg-slate-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{post.title}</th>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'No Date'}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link to={`/post/${post.id}`} className="font-medium text-blue-600 hover:underline">View</Link>
                                                <Link to={`/edit-post/${post.id}`} className="font-medium text-green-600 hover:underline">Edit</Link>
                                                <button onClick={() => deletePost(post.id, post.featuredImage)} className="font-medium text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-500">You haven't created any posts yet.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Dashboard;