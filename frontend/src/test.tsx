import React, { useState } from "react";

type UpdateBlogProps = {
  blogId: number;
  token: string;
};

const UpdateBlog: React.FC<UpdateBlogProps> = ({ blogId, token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: blogId,
          title,
          content,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Blog updated successfully! Post ID: ${data.id}`);
      } else {
        setMessage(data.message || "Failed to update blog.");
      }
    } catch (error: any) {
      setMessage("An error occurred: " + error.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Blog Post</h2>

      <div>
        <label>
          Title:{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Content:{" "}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            cols={50}
          />
        </label>
      </div>

      <button type="submit">Update Blog</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateBlog;
