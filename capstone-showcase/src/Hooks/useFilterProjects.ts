import { useMemo, useState } from "react";

export default function useFilterProjects(projects: any[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSponsor, setSelectedSponsor] = useState("all");

  const uniqueSponsors = useMemo(() => {
    const sponsors = new Set(
      projects.map((p) => (p.sponsor ?? "").toString().trim()).filter(Boolean)
    );
    return ["all", ...Array.from(sponsors).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filterProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const sponsor = selectedSponsor.toLowerCase();

    return projects.filter((p) => {
      const title = (p.projectTitle ?? "").toLowerCase();
      const desc = (p.projectDescription ?? "").toLowerCase();
      const team = (p.teamMemberNames ?? "").toLowerCase();
      const sp = (p.sponsor ?? "").toLowerCase();

      const matchesSearch =
        q === "" || title.includes(q) || desc.includes(q) || team.includes(q);
      const matchesSponsor = sponsor === "all" || sp === sponsor;

      return matchesSearch && matchesSponsor;
    });
  }, [projects, searchQuery, selectedSponsor]);

  return {
    searchQuery,
    setSearchQuery,
    selectedSponsor,
    setSelectedSponsor,
    uniqueSponsors,
    filterProjects,
  };
}
