export default function ReplyTweet({
  text,
  username,
}: {
  text: string;
  username: string;
}) {
  return (
    <div className="p-5 bg-white border-b">
      <h5 className="mb-2 text-sm font-bold">{username}</h5>
      <span className="text-sm tracking-normal">{text}</span>
    </div>
  );
}
