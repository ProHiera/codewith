'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CommunityPost - 학습 노트 공유 게시글
 * 
 * 사용자가 학습한 내용을 커뮤니티에 공유하고
 * AI 요약, 태그, 좋아요/댓글 기능 포함
 */

export interface Post {
  id: string;
  author: {
    id: string;
    nickname: string;
    avatar?: string;
    level?: number;
  };
  title: string;
  content: string;
  tags: string[];
  aiSummary?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  createdAt: Date;
  category?: 'note' | 'question' | 'discussion' | 'showcase';
}

export interface CommunityPostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  className?: string;
}

export default function CommunityPost({
  post,
  onLike,
  onComment,
  onShare,
  className = '',
}: CommunityPostProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikes(isLiked ? localLikes - 1 : localLikes + 1);
    onLike?.(post.id);
  };

  const categoryConfig = {
    note: { emoji: '📝', label: '학습 노트', color: 'bg-blue-100 text-blue-700' },
    question: { emoji: '❓', label: '질문', color: 'bg-purple-100 text-purple-700' },
    discussion: { emoji: '💬', label: '토론', color: 'bg-green-100 text-green-700' },
    showcase: { emoji: '🎨', label: '프로젝트 공유', color: 'bg-orange-100 text-orange-700' },
  };

  const category = categoryConfig[post.category || 'note'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.author.avatar || post.author.nickname[0].toUpperCase()}
            </div>
            
            {/* Author Info */}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-800">{post.author.nickname}</h4>
                {post.author.level && (
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                    Lv.{post.author.level}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {post.createdAt.toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.color}`}>
            {category.emoji} {category.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-full cursor-pointer transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* AI Summary (if available) */}
      {post.aiSummary && (
        <div className="px-6 py-4 bg-cyan-50 border-b-2 border-cyan-100">
          <div className="flex items-start gap-2">
            <span className="text-lg">🤖</span>
            <div className="flex-1">
              <h5 className="text-xs font-semibold text-cyan-700 mb-1">AI 요약</h5>
              <p className="text-sm text-gray-700 leading-relaxed">{post.aiSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 py-4">
        <div className={`text-gray-700 leading-relaxed ${!showFullContent && 'line-clamp-3'}`}>
          {post.content}
        </div>
        {post.content.length > 200 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold mt-2"
          >
            {showFullContent ? '접기' : '더 보기'}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t-2 border-gray-100 flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isLiked
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
          <span className="text-sm">{localLikes}</span>
        </button>

        <button
          onClick={() => onComment?.(post.id)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-semibold transition-all"
        >
          <span className="text-xl">💬</span>
          <span className="text-sm">{post.comments}</span>
        </button>

        <button
          onClick={() => onShare?.(post.id)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-semibold transition-all"
        >
          <span className="text-xl">🔗</span>
          <span className="text-sm">공유</span>
        </button>
      </div>
    </motion.div>
  );
}

/**
 * DiscussionThread - 질문/토론 스레드
 */
export interface Comment {
  id: string;
  author: {
    nickname: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
}

export interface DiscussionThreadProps {
  postId: string;
  comments: Comment[];
  onAddComment?: (content: string) => void;
  className?: string;
}

export function DiscussionThread({
  comments,
  onAddComment,
  className = '',
}: DiscussionThreadProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment?.(newComment);
    setNewComment('');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 ${className}`}>
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>💬</span> 댓글 {comments.length}개
      </h3>

      {/* Comments List */}
      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                {comment.author.avatar || comment.author.nickname[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800 text-sm">
                    {comment.author.nickname}
                  </span>
                  <span className="text-xs text-gray-500">
                    {comment.createdAt.toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {comment.content}
                </p>
                <button className="text-xs text-gray-500 hover:text-red-600 transition-colors">
                  🤍 {comment.likes}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
          </div>
        )}
      </div>

      {/* Add Comment */}
      <div className="border-t-2 border-gray-100 pt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              newComment.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * NoteShare - 학습 노트 공유 카드
 */
export interface NoteShareProps {
  note: {
    title: string;
    content: string;
    tags: string[];
    masteredCount?: number;
  };
  onShare?: () => void;
  className?: string;
}

export function NoteShare({ note, onShare, className = '' }: NoteShareProps) {
  return (
    <div className={`bg-linear-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span>📝</span> 노트 공유
        </h3>
        {note.masteredCount && note.masteredCount > 0 && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            ✅ {note.masteredCount}개 암기 완료
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 border-2 border-yellow-200">
        <h4 className="font-bold text-gray-800 mb-2">{note.title}</h4>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {note.content}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <button
        onClick={onShare}
        className="w-full px-6 py-3 bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-xl font-semibold transition-all shadow-lg"
      >
        🚀 커뮤니티에 공유하기
      </button>
    </div>
  );
}
