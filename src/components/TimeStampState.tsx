function TimeStampState({ lastUpdated }: { lastUpdated: string }) {
  let timeAgo = lastUpdated || "Updated just now"; // Default message if lastUpdated is empty
  return (
    <div className="p-4 border-t border-outline-variant bg-surface-container-lowest/50 rounded-b-xl flex items-center justify-center gap-2 text-on-surface-variant">
      <span className="material-symbols-outlined text-[14px]">schedule</span>
      <span className=" text-sm">{timeAgo}</span>
    </div>
  );
}

export default TimeStampState;
