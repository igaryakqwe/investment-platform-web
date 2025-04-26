import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";

const SearchField = () => {
  const [searchFilter, setSearchFilter] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );

  return (
    <Input
      type="text"
      value={searchFilter}
      onChange={e => setSearchFilter(e.target.value)}
      placeholder="Search by name..."
    />
  );
};

export default SearchField;
