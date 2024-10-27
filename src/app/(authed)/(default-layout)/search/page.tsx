import SearchSection from "../_components/search-section";
import ResultList from "./_components/result-list";

async function SearchResultPage() {
  return (
    <div className="container mx-auto max-w-5xl mt-10 px-4 mb-10 pt-32">
      <SearchSection />
      <ResultList />
    </div>
  );
}

export default SearchResultPage;
