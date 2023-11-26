import Post from "./Post";

type PostProps = {
  id: string;
  title: string;
  post: string;
  vote_counter: number;
  num_votes: number;
  num_comments: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

export default function PostList({ posts }: { posts: PostProps[] }) {
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          post={post.post}
          vote_counter={post.vote_counter}
          num_votes={post.num_votes}
          num_comment={post.num_comments}
          up_vote_selected={false}
          down_vote_selected={false}
        />
      ))}
    </div>
  );
}
