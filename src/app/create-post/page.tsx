"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [post, setPost] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [repo, setRepo] = useState(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postContent, setPostContent] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [promptPost, setPromptPost] = useState("");
  const [hastags, setHastags] = useState("");
  const [uid, setUid] = useState("");

  const uploadPost = async () => {
    // Assuming hastags is a string with space-separated hashtags
    const hashtagsArray = hastags.split(" ");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${uid}`,
        {
          title: title,
          description: postContent,
          hashtags: hashtagsArray,
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const uploadPrompt = async () => {
    const hashtagsArray = hastags.split(" ");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/prompts/${uid}`,
        {
          title: title,
          description: description,
          prompt: promptPost,
          hashtags: hashtagsArray,
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const uploadRepo = async () => {
    const hashtagsArray = hastags.split(" ");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/repos/${uid}`,
        {
          title: title,
          description: description,
          repo: "repo",
          hashtags: hashtagsArray,
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("user details", res.data);
      setUid(res.data.data._id);
      // router.push(`/profile/${res.data.data._id}`);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-[#041220] py-32 px-10">
      <h1 className="text-4xl font-bold text-[#C38202]">Create Post</h1>
      <p className="text-slate-50 mt-3">
        Create & Share your creativity to the world, and let your imagination
        run.
      </p>
      {!post && !prompt && !repo && (
        <div className="flex mb-3 my-3 flex-col">
          <h3 className="text-xl font-semibold text-slate-50 ">
            I want to post
          </h3>
          <div className="flex items-center mt-3 gap-3">
            <button
              onClick={() => setPost(true)}
              className="px-3 py-2 rounded-full hover:bg-slate-500 bg-slate-600 text-white"
            >
              Post
            </button>
            <button
              onClick={() => setPrompt(true)}
              className="px-3 py-2 rounded-full hover:bg-slate-500 bg-slate-600 text-white"
            >
              Prompt
            </button>
            <button
              onClick={() => setRepo(true)}
              className="px-3 py-2 rounded-full hover:bg-slate-500 bg-slate-600 text-white"
            >
              Repo
            </button>
          </div>
        </div>
      )}

      {post && (
        <div className="flex flex-col py-6 gap-3">
          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="title" className="text-xl text-[#C38202]">
              Title
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={3}
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of post..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="post" className="text-xl text-[#C38202] my-3">
              Post
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={10}
                name="post"
                id="post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Title of post..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="hastags" className="text-xl text-[#C38202] my-3">
              Hastags
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={3}
                name="hastags"
                id="hastags"
                value={hastags}
                onChange={(e) => setHastags(e.target.value)}
                placeholder="Hastags are space seperated"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={uploadPost}
              className="bg-gray-800 text-slate-50 px-3 py-2 rounded-full"
            >
              Post
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setPost(false);
                setPrompt(false);
                setRepo(false);
              }}
              className="bg-gray-800 text-slate-50 px-3 py-2 rounded-full"
            >
              Go back to options
            </button>
          </div>
        </div>
      )}

      {prompt && (
        <div className="flex flex-col py-6 gap-3">
          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="title" className="text-xl text-[#C38202]">
              Title
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={3}
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of post..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label
              htmlFor="description"
              className="text-xl text-[#C38202] my-3"
            >
              Description
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={10}
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of prompt..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="prompt" className="text-xl text-[#C38202] my-3">
              Prompt
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={10}
                name="prompt"
                id="prompt"
                value={promptPost}
                onChange={(e) => setPromptPost(e.target.value)}
                placeholder="Write the prompt..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="hastags" className="text-xl text-[#C38202] my-3">
              Hastags
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={3}
                name="hastags"
                id="hastags"
                value={hastags}
                onChange={(e) => setHastags(e.target.value)}
                placeholder="Hastags are seperated by comma..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setPost(false);
                setPrompt(false);
                setRepo(false);
              }}
              className="bg-gray-800 text-slate-50 px-3 py-2 rounded-full"
            >
              Go back to options
            </button>
          </div>
        </div>
      )}

      {repo && (
        <div className="flex flex-col py-6 gap-3">
          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="title" className="text-xl text-[#C38202]">
              Title
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={3}
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of repo..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label
              htmlFor="description"
              className="text-xl text-[#C38202] my-3"
            >
              Description
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={10}
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description about your repo"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="repo" className="text-xl text-[#C38202] my-3">
              Repo Link
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <input
                type="text"
                name="repo"
                id="repo"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
                placeholder="Paste the link of repo.."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full flex flex-col border border-[#9DD2EF] rounded-lg px-3 py-4">
            <label htmlFor="hastags" className="text-xl text-[#C38202] my-3">
              Hastags
            </label>
            <div className="bg-[#2D4356] rounded-lg py-3 px-2">
              <textarea
                cols={70}
                rows={3}
                name="hastags"
                id="hastags"
                value={hastags}
                onChange={(e) => setHastags(e.target.value)}
                placeholder="Hastags are seperated by comma..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setPost(false);
                setPrompt(false);
                setRepo(false);
              }}
              className="bg-gray-800 text-slate-50 px-3 py-2 rounded-full"
            >
              Go back to options
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
