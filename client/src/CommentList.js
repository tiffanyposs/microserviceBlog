import React from 'react';

export default ({ comments }) => {
  if (!comments) return null;

  const renderComments = Object.values(comments).map(comment => {
    return (
      <li key={comment.id}>
        {comment.content}
      </li>
    )
  });

  return (
    <ul>
      {renderComments}
    </ul>
  );
}
