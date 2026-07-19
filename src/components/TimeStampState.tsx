import { formatDistanceToNowStrict } from "date-fns";

function TimeStampState({ lastUpdated }: { lastUpdated: string }) {
  const createdAt = new Date(lastUpdated || new Date());

  const timeAgo = formatDistanceToNowStrict(createdAt, {
    addSuffix: true,
  });
  return (
    <div className="p-4 border-t border-outline-variant bg-surface-container-lowest/50 rounded-b-xl flex items-center justify-center gap-2 text-on-surface-variant">
      <span className="material-symbols-outlined text-[14px]">
        Last Updated
      </span>
      <span className=" text-sm">{timeAgo}</span>
    </div>
  );
}

export default TimeStampState;
