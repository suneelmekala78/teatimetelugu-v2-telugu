"use client";

import styles from "./Comments.module.css";
import { useState } from "react";
import moment from "moment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  FaThumbsUp,
  FaThumbsDown,
  FaReply,
  FaTrash,
  FaRegCommentDots,
} from "react-icons/fa";

import { useUserStore } from "@/store/useUserStore";
import {
  addNewsComment,
  addNewsReplyComment,
  likeNewsComment,
  dislikeNewsComment,
  deleteNewsComment,
} from "@/lib/requests-client";
import AuthPopup from "@/components/common/popups/auth/AuthPopup";

/* ---------------- types ---------------- */

interface Props {
  newsId: string;
  initialComments: any[];
}

/* ---------------- component ---------------- */

export default function CommentsClient({ newsId, initialComments }: Props) {
  const { user } = useUserStore();
  const router = useRouter();

  /* SSR data becomes initial state */
  const [text, setText] = useState("");
  const [replyBox, setReplyBox] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isJoin, setIsJoin] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const comments = initialComments || [];

  /* ---------------- add comment ---------------- */

  const submitComment = async () => {
    if (!user) return setIsJoin(true);
    if (!text.trim()) return toast.error("కామెంట్ ఖాళీగా ఉండకూడదు");

    await addNewsComment(newsId, { comment: text, language: "te" });

    setText("");
    router.refresh(); // 🔥 re-fetch SSR comments
  };

  /* ---------------- reply ---------------- */

  const submitReply = async (parentId: string) => {
    if (!user) return setIsJoin(true);
    if (!replyText.trim()) return toast.error("రిప్లై ఖాళీగా ఉండకూడదు");

    await addNewsReplyComment(newsId, {
      parentCommentId: parentId,
      comment: replyText,
      language: "te",
    });

    setReplyBox(null);
    setReplyText("");
    router.refresh();
  };

  /* ---------------- like/dislike ---------------- */

  const like = async (id: string) => {
    if (!user) return setIsJoin(true);

    await likeNewsComment(id);
    router.refresh();
  };

  const dislike = async (id: string) => {
    if (!user) return setIsJoin(true);

    await dislikeNewsComment(id);
    router.refresh();
  };

  /* ---------------- delete ---------------- */

  const remove = async (id: string) => {
    const ok = confirm("Are you sure you want to delete?");
    if (!ok) return;

    await deleteNewsComment(id);
    router.refresh();
  };

  const openDeleteConfirm = (id: string) => {
    setCommentToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!commentToDelete) return;

    await deleteNewsComment(commentToDelete);
    setShowDeleteConfirm(false);
    setCommentToDelete(null);
    router.refresh();
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className={styles.wrapper}>
        <h3>కామెంట్స్ ({comments.length})</h3>

        {/* Add comment */}
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="కామెంట్ రాయండి..."
        />

        <button className={styles.primaryBtn} onClick={submitComment}>
          {user ? "పంపండి" : "లాగిన్"}
        </button>

        {comments.length === 0 && (
          <div className={styles.empty}>
            <FaRegCommentDots className={styles.emptyIcon} />
            <p className={styles.emptyText}>ఇప్పటికి కామెంట్స్ లేవు</p>
            <small className={styles.emptySub}>మొదటిగా కామెంట్ చేయండి!</small>
          </div>
        )}

        {/* List */}
        {comments.map((c) => (
          <div key={c._id} className={styles.comment}>
            {/* Avatar */}
            <div className={styles.avatar}>
              {c.postedBy?.profileUrl ? (
                <img src={c.postedBy.profileUrl} alt="user" />
              ) : (
                <span>{c.postedBy?.fullName?.charAt(0)?.toUpperCase()}</span>
              )}
            </div>

            {/* Body */}
            <div className={styles.body}>
              <div className={styles.header}>
                <span className={styles.name}>{c.postedBy?.fullName}</span>
                <span className={styles.time}>
                  {moment(c.createdAt).fromNow()}
                </span>
              </div>

              <p className={styles.text}>{c.comment}</p>

              {/* actions */}
              <div className={styles.actions}>
                <button
                  className={`${styles.actionBtn} ${
                    c.likes?.includes(user?._id) ? styles.liked : ""
                  }`}
                  onClick={() => like(c._id)}
                >
                  <FaThumbsUp /> {c.likes?.length || 0}
                </button>

                <button
                  className={`${styles.actionBtn} ${
                    c.dislikes?.includes(user?._id) ? styles.disliked : ""
                  }`}
                  onClick={() => dislike(c._id)}
                >
                  <FaThumbsDown /> {c.dislikes?.length || 0}
                </button>

                <button
                  className={styles.replyBtn}
                  onClick={() => setReplyBox(replyBox === c._id ? null : c._id)}
                >
                  <FaReply /> రిప్లై{" "}
                  {c.replies?.length > 0 && `(${c.replies.length})`}
                </button>

                {user?._id === c.postedBy?._id && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openDeleteConfirm(c._id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>

              {/* reply box */}
              {replyBox === c._id && (
                <div className={styles.replyBox}>
                  <textarea
                    className={styles.textarea}
                    placeholder="మీ స్పందన రాయండి..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    className={styles.primaryBtn}
                    onClick={() => submitReply(c._id)}
                  >
                    {user ? "పంపండి" : "లాగిన్"}
                  </button>
                </div>
              )}

              {/* replies */}
              {replyBox === c._id && c.replies?.length > 0 && (
                <div className={styles.replies}>
                  {c.replies.map((r: any) => (
                    <div key={r._id} className={styles.reply}>
                      <div className={styles.replyAvatar}>
                        {r.postedBy?.profileUrl ? (
                          <img src={r.postedBy.profileUrl} alt="user" />
                        ) : (
                          <span>
                            {r.postedBy?.fullName?.charAt(0)?.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className={styles.replyContent}>
                        <div className={styles.header}>
                          <span className={styles.name}>
                            {r.postedBy?.fullName}
                          </span>
                          <span className={styles.time}>
                            {moment(r.createdAt).fromNow()}
                          </span>
                        </div>

                        <p>{r.comment}</p>

                        {/* reply actions */}
                        <div className={styles.actions}>
                          <button
                            className={`${styles.actionBtn} ${
                              r.likes?.includes(user?._id) ? styles.liked : ""
                            }`}
                            onClick={() => like(r._id)}
                          >
                            <FaThumbsUp /> {r.likes?.length || 0}
                          </button>

                          <button
                            className={`${styles.actionBtn} ${
                              r.dislikes?.includes(user?._id)
                                ? styles.disliked
                                : ""
                            }`}
                            onClick={() => dislike(r._id)}
                          >
                            <FaThumbsDown /> {r.dislikes?.length || 0}
                          </button>

                          {user?._id === r.postedBy?._id && (
                            <button
                              className={styles.deleteBtn}
                              onClick={() => openDeleteConfirm(r._id)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.deleteModal}>
          <div className={styles.deleteModalContent}>
            <p className={styles.deleteModalText}>
              మీరు ఖచ్చితంగా కామెంట్ తొలగించాలనుకుంటున్నారా?
            </p>
            <div className={styles.deleteModalActions}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={styles.deleteCancelBtn}
              >
                లేదు
              </button>
              <button
                onClick={handleDelete}
                className={styles.deleteConfirmBtn}
              >
                అవును
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthPopup open={isJoin} onClose={() => setIsJoin(false)} />
    </>
  );
}
