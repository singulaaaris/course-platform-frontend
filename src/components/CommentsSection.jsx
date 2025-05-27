import React, { useState } from "react";
import "../style/CoursePage.css";

const CommentsSection = ({ comments, onSubmit }) => {
    const [newComment, setNewComment] = useState("");

    const handlePost = () => {
        if (newComment.trim()) {
            onSubmit(newComment.trim());
            setNewComment("");
        }
    };

    return (
        <div className="comments-section">
            {comments.map((comment) => (
                <div className="comment-box" key={comment.id}>
                    <div className="comment-header-row">
                        <img
                            src={comment.user.avatarUrl || "/default-avatar.png"}
                            alt={comment.user.name}
                            className="comment-avatar"
                        />
                        <div className="comment-header-info">
                            <div className="comment-author">{comment.user.name}</div>
                            <div className="comment-date">
                                {new Date(comment.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="comment-content">{comment.content}</div>

                </div>
            ))}

            <div className="comment-form">
                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handlePost}>Post Comment</button>
            </div>
        </div>
    );
};

export default CommentsSection;
