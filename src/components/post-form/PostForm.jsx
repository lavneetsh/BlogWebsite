import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/config"; // Your Firebase service
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // This effect populates the form with existing data when in "edit" mode.
    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                content: post.content,
                status: post.status,
                slug: post.id,
            });
        }
    }, [post, reset]);

    // This is the complete submit function.
    const submit = async (data) => {
        // --- UPDATE LOGIC ---
        if (post) {
            let finalData = { ...data };
            if (data.image && data.image.length > 0) {
                if (post.featuredImage?.path) {
                    await service.deleteFile(post.featuredImage.path);
                }
                const newImageInfo = await service.uploadFile(data.image[0]);
                if (newImageInfo) {
                    finalData.featuredImage = newImageInfo;
                }
            } else {
                finalData.featuredImage = post.featuredImage;
            }
            delete finalData.image;
             await service.updatePost(post.id, finalData);
          navigate("/");
        } 
        // --- CREATE LOGIC ---
        else {
            if (data.image && data.image.length > 0) {
                const imageInfo = await service.uploadFile(data.image[0]);
                if (imageInfo) {
                    const postData = {
                        ...data,
                        userId: userData.$id,
                        userName: userData?.name || "Anonymous",
                        featuredImage: imageInfo,
                    };
                    const dbPost = await service.createPost(postData);
                    if (dbPost) {
                        navigate(`/post/${dbPost.id}`);
                    }
                }
            } else {
                alert("Please select a featured image for your new post.");
            }
        }
    };

    // This is the complete slug transformation function.
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    // This is the complete effect for auto-generating the slug.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && !post) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="md:col-span-8 space-y-6">
                    <Input
                        label="Title:"
                        placeholder="Enter the post title"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug:"
                        placeholder="A unique URL slug will be generated here"
                        {...register("slug", { required: true })}
                        readOnly={!!post}
                        className={post ? "bg-slate-100 cursor-not-allowed" : ""}
                    />
                    <RTE 
                        label="Content:" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")}
                    />
                </div>

                {/* Right Column */}
                <div className="md:col-span-4 space-y-6 ">
                    <div>
                        <Input className="cursor-pointer"
                            label="Featured Image:"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {post && (
                            <div className="w-full mt-4">
                                <img src={post.featuredImage?.url} alt={post.title} className="rounded-lg shadow-md " />
                            </div>
                        )}
                    </div>
                    <Select
                        options={["active", "inactive"]}
                        label="Status:"
                        {...register("status", { required: true })}
                    />
                    <Button 
                        type="submit" 
                        className={`w-full cursor-pointer ${post ? "bg-green-600 hover:bg-green-700" : ""}`}
                    >
                        {post ? "Update Post" : "Submit Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}