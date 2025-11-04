import { useEffect, useState } from "react";

interface UseFetchProjectsResult {
  projects: any[];
  loading: boolean;
  error: string | null;
}

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api" // Relative URL - will use https://showcase.asucapstone.com/api
    : "http://localhost:3000/api";

export default function useFetchProjects(
  major: string,
  semester: string,
  year: string
): UseFetchProjectsResult {

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    document.body.classList.add(`${major}-page-body`);

    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/survey/${major}/term=${semester}-${year}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) setProjects(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
        console.error("Error fetching projects:", err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      }
    );

    return () => {
      document.body.classList.remove(`${major}-page-body`);
      ignore = true;
    };
  }, [major, semester, year]);

  return { projects, loading, error };
}