// src/appwrite/config.js (Now powered by Firebase)
import { db, storage } from '../firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    getDoc, 
    getDocs,
    doc,
    query,
    where
} from 'firebase/firestore';
import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject 
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export class Service {
    // --- Firestore (Database) Methods ---
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            // Note: `slug` is now just a field, not the document ID
            return await addDoc(collection(db, "posts"), {
                title,
                slug, // You might still want this for user-friendly URLs
                content,
                featuredImage, // This will be an object { url, path }
                status,
                userId,
                createdAt: new Date(),
            });
        } catch (error) {
            console.log("Firebase :: createPost :: error", error);
        }
    }

    async updatePost(postId, data){
        try {
            const postRef = doc(db, "posts", postId);
            // We then pass this entire `data` object directly to Firestore's updateDoc.
            // Now it will update ANY fields that are present in the object.
            return await updateDoc(postRef, data);
        } catch (error) {
            console.log("Firebase service :: updatePost :: error", error);
        }
    }

    async deletePost(postId){
        try {
            await deleteDoc(doc(db, "posts", postId));
            return true;
        } catch (error) {
            console.log("Firebase :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(postId){
        try {
            const docSnap = await getDoc(doc(db, "posts", postId));
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.log("Firebase :: getPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = []){ // Pass Firebase queries here
        try {
            const q = query(collection(db, "posts"), ...queries);
            const querySnapshot = await getDocs(q);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            return { documents: posts }; // Match Appwrite's response structure
        } catch (error) {
            console.log("Firebase :: getPosts :: error", error);
            return { documents: [] };
        }
    }

    // --- File Storage Methods ---
    async uploadFile(file){
        try {
            const uniqueFileName = `images/${uuidv4()}-${file.name}`;
            const storageRef = ref(storage, uniqueFileName);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return { url, path: uniqueFileName }; // Return URL and Path
        } catch (error) {
            console.log("Firebase :: uploadFile :: error", error);
            return null;
        }
    }

    async deleteFile(filePath){
        try {
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            return true;
        } catch (error) {
            console.log("Firebase :: deleteFile :: error", error);
            return false;
        }
    }
    
    // This function is no longer needed with Firebase, but we keep it
    // so you don't have to change your components immediately. It does nothing.
    getFilePreview(fileObject){
       // With Firebase, we store the direct URL.
       // The `fileObject` itself is now the URL.
       return fileObject;
    }
}

const service = new Service();
export default service;