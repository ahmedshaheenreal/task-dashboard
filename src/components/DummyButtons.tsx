function DummyButtons() {
  return (
    <div className="mt-auto pt-4 flex gap-3">
      <button className="flex-1 bg-primary/50 text-on-primary-container  text-body-md   py-2 rounded-lg hover:brightness-110 transition-all">
        Buy BTC
      </button>
      <button className="flex-1 bg-red-500/50 border border-outline-variant text-on-surface  text-body-md py-2 rounded-lg hover:bg-surface-container transition-all">
        Sell
      </button>
    </div>
  );
}

export default DummyButtons;
