import { useState, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import UploadCoverImage from "./UploadCoverImage";
import { MdKeyboardBackspace } from "react-icons/md";
import ReactQuill from "react-quill";
import { modules } from "../../../../helpers/textEditor";
import { topics } from "../../../../helpers/topics";
import { createBlog } from "../../../../services/blogs/createBlog";
import { loadBlogContent } from "../../../../services/blogs/loadBlogContent";
import { updateBlog } from "../../../../services/blogs/updateBlog";
import { useProfile } from "../../../../context/ProfileContext";
import Spinner from "../../../animation/Spinner";
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog() {
  const navigate = useNavigate()
  let location = useLocation();
  const { session } = useProfile();
  let currentPath = location.pathname.split("/");
  let slug = currentPath[3];
  const isCreate = currentPath.includes("createblog")
  const [file, setFile] = useState(null)
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreate) {
      createBlog(session, blog, file, navigate, setLoading)
    } else {
      updateBlog(session, blog, file, navigate, setLoading)
    }
  };

  const showBlog = useCallback(async () => {
    try {
      setLoading(true);
      const blogData = await loadBlogContent(slug);
      setBlog(blogData);
    } catch (error) {
      console.error("Failed to load blog content:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!isCreate) {
      showBlog()
    }
  }, [showBlog, isCreate]);

  const resetForm = () => {
    setBlog({
      title: "",
      introduction: "",
      content: "",
      topic: "",
      coverphoto: null
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(" ")) {
      return;
    }
    setBlog((prev) => {
      const updatedBlog = { ...prev, [name]: value };
      if (name === "title") {
        updatedBlog.slug = value.toLowerCase().split(" ").join("-");
      }
      return updatedBlog;
    });
  };

  const handleEditorChange = (value) => {
    setBlog((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 min-h-screen lg:pl-10">
      <Link to="/dashboard/posts" className="ml-12 sm:ml-12 lg:ml-0">
        <button className="h-10 cursor-pointer overflow-hidden inline-flex items-center justify-center border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-blue-500 dark:text-teal-500 shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 sm:w-auto">
          <span className="text-lg"> <MdKeyboardBackspace /></span>
          <span className="ml-2">Blogs</span>
        </button>
      </Link>
      <div className="mt-4 mx-auto">
        <form
          onSubmit={handleSubmit}
        >
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700">
            <div className="space-y-6 px-4 py-5 sm:p-6 ">
              <div>
                <UploadCoverImage
                  isCreate={isCreate}
                  blog={blog}
                  setFile={setFile}
                  loading={loading}
                />
                <label
                  htmlFor="title"
                  className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    defaultValue={blog.title}
                    id="title"
                    name="title"
                    onChange={handleChange}
                    className="w-full border p-2 dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 mt-1 h-8 block shadow-sm sm:text-sm "
                    required
                  />
                </div>
                {blog.title &&
                  <>
                    <label
                      htmlFor="slug"
                      className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                    >
                      Slug
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={blog.slug}
                        id="slug"
                        name="slug"
                        onChange={handleChange}
                        className="w-full border p-2 dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 mt-1 h-8 block shadow-sm sm:text-sm "
                        required
                      />
                    </div>
                  </>
                }
                <div className="mt-8">
                  <label
                    htmlFor="introduction"
                    className="mt-8 block text-sm font-medium text-blue-500 dark:text-teal-500"
                  >
                    Introduction
                  </label>
                  <textarea
                    type="text"
                    defaultValue={blog.introduction}
                    name="introduction"
                    id="introduction"
                    onChange={handleChange}
                    required
                    rows="2"
                    className="w-full border dark:text-white bg-gray-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 p-2.5 mt-1 block sm:text-sm" />
                </div>
                <div className="mt-8">
                  <label htmlFor="topic" className="mt-1 block text-sm font-medium text-blue-500 dark:text-teal-500">Topic</label>
                  <select required id="topic" name="topic" value={blog.topic ?? ""} onChange={handleChange} className="bg-gray-50 mt-1 border border-zinc-300 text-sm block w-[300px] px-2 py-2 dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder-teal-500 dark:text-white">
                    <option value="" disabled>Choose a topic</option>
                    {topics.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-8 ">
                  <label
                    htmlFor="content"
                    className="mt-5 lock text-sm font-medium text-blue-500 dark:text-teal-500"
                  >
                    Content
                  </label>
                  <div>
                    <ReactQuill
                      id="content"
                      className="bg-gray-100 dark:bg-zinc-800 mt-[10px] border-none dark:text-white"
                      value={blog.content}
                      onChange={handleEditorChange}
                      modules={modules}
                     
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900/10 px-4 pt-8 pb-6 text-right sm:px-6">
              {isCreate && <button
                onClick={resetForm}
                type="button"
                className="inline-flex justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                Cancel
              </button>}
              {isCreate && <button
                type="submit"
                className="inline-flex gap-2 items-center justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                {loading ? <><Spinner /> Processing...</> : "Create"}
              </button>}
              {!isCreate && <button
                type="submit"
                className="inline-flex gap-2 items-center justify-center border border-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-300 dark:border-zinc-700 py-2 px-4 mr-4 text-sm font-medium text-blue-500 dark:text-teal-500"
              >
                {loading ? <><Spinner /> Processing...</> : "Update"}
              </button>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
