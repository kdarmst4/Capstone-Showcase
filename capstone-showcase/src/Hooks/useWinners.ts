import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type ShowcaseEntry = {
  course: string;
  video: string;
  EntryID: number;
  shouldDisplay: "YES" | "NO";
  position: number;
  members: string;
  Sponsor: string;
  description: string;
  ProjectTitle: string;
  winning_pic: string | null;
  NDA: "Yes" | "No";
  year: number;
  semester: "Spring" | "Summer" | "Fall" | "Winter";
  department?: string;
};

interface Filters {
  semester: string;
  year: string;
  department: string;
};

export default function useWinnersM<T extends Record<string, any>>(initData: T[] = []) {
  const { semesterParam, yearParam } = useParams<{ semesterParam?: string; yearParam?: string }>();

  const [pastWinnersData, setPastWinnersData] = useState<T[]>(initData);
  const [filteredWinnersData, setFilteredWinnersData] = useState<T[]>([]);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<Filters>({
    semester: semesterParam ?? "all",
    year: yearParam ?? "all",
    department: "all",
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      semester: semesterParam ?? "all",
      year: yearParam ?? "all",
    }))
  }, []);

  const departmentMap: Record<string, string> = {
    "computer-science": "CS/E",
    "computer-systems-engineering": "Computer Systems Engineering",
    "biomedical-engineering": "Biomedical Engineering",
    "mechanical-engineering": "Mechanical Engineering",
    "electrical-engineering": "Electrical Engineering",
    "industrial-engineering": "IEE",
    "informatics": "Informatics",
    "interdisciplinary": "Interdisciplinary",
  };

  function applyTextSearch(data: T[], text: string): T[] {
    if (!text) return data;
    const value = text.toLowerCase();
    return data.filter((entry) => {
      // return (
      //   entry.ProjectTitle.toLowerCase().includes(value) ||
      //   entry.members.toLowerCase().includes(value) ||
      //   entry.description.toLowerCase().includes(value) ||
      //   entry.Sponsor.toLowerCase().includes(value)
      // );
      return Object.values(entry).some((field) => String(field).toLowerCase().includes(value));
    });
  }

function applySelectFilters(data: T[], f: Filters) {
  return data.filter((entry) => {
    return Object.entries(f).every(([key, value]) => {
      if (value.toLowerCase() === "all") return true; 

      const entryValue = entry[key as keyof T];

      // Special handling for department mapping
      if (key === "department" && departmentMap[value.toLowerCase() as keyof typeof departmentMap]) {
        const mapped = departmentMap[value.toLowerCase() as keyof typeof departmentMap];
        return Object.values(entry).some((field) =>
          String(field).toLowerCase().includes(mapped.toLowerCase())
        );
      }

      return String(entryValue).toLowerCase() === value.toLowerCase();
    });
  });
}


  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setHasFiltered(true);
    const searched = applyTextSearch(pastWinnersData, value);
    console.log('searched', searched);
    setFilteredWinnersData(searched);
  };

  const handleFilterSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setHasFiltered(true);
    const filtered = applySelectFilters(pastWinnersData, filters);
    setFilteredWinnersData(filtered);
  };

  const clearFilters = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setHasFiltered(false);
    setSearchValue("");
    setFilteredWinnersData(pastWinnersData);
    setFilters({ semester: "all", year: "all", department: "all" });
  };

  return {
    pastWinnersData,
    setPastWinnersData,
    filteredWinnersData,
    hasFiltered,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    handleSearchChange,
    handleFilterSubmit,
    clearFilters,
  } as const;
}