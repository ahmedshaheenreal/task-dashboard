import "./App.css";
import CoinDetails from "./components/CoinDetails";
import DataTable from "./components/DataTable";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <>
      <div className="flex flex-row font-roboto text-white   mx-auto">
        <aside className="bg-neutral text-on-surface-container  w-64  h-screen"></aside>
        <div className="flex flex-col w-full h-screen">
          <header className="bg-surface   docked full-width top-0 border-b border-outline-variant flex justify-between items-center h-16 px-grid-gutter z-10 shrink-0">
            <h1 className="text-2xl font-bold text-primary mx-4 ">
              Market Overview
            </h1>

            <SearchInput />
          </header>
          <main className="bg-background text-on-background  pl-8  flex flex-row gap-4 h-full overflow-y-auto">
            <DataTable />
            <aside className="bg-surface-container text-on-surface-container w-80 h-full lg:w-140">
              <CoinDetails />
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
