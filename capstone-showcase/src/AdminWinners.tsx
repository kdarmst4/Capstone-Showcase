import {useState, useEffect} from "react";
import "./CSS/AdminWinners.css";

export interface WinnerSelection {
    position: string;
    projectId:number;
    projectName: string;
    pictures: string[];
}
export function Winners()
{
    const[projects, setProjects] = useState([]);
    const [selectedWinners, setSelectedWinners] = useState<WinnerSelection[] | null>(null);
    const[semester, setSemester] = useState(new Date().getMonth() >=0 && new Date().getMonth() <=5 ? "sp" : "fa");
    const[year, setYear] = useState(new Date().getFullYear());
    useEffect(()=>
    {
        fetchProjects();
    }, [])
    const fetchProjects = async () =>
    {
        try {
            // const response = await fetch('http://localhost:3000/api/projects/fa/2024') 
            // const data = await response.json();
            // setProjects(data);
            // console.log(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    const currMonth = new Date().getMonth();
    const currYear = new Date().getFullYear();
    const years = Array.from({length:10}, (_, i) => currYear - i);
    const semesters = ["fa", "sp"];
    return (
        <div className="admin-set-winners-page">
            <p className="edit-title">Set Capstone Showcase Winners</p>
            <form>
                <section>
                    <label htmlFor="semester">Semester:</label>
                    <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
                        {semesters.map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                </section>
                <section>
                    <label htmlFor="year">Year:</label>
                    <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                        {years.map((yr) => (
                            <option key={yr} value={yr}>{yr}</option>
                        ))}
                    </select>
                </section>
                <section>
                    <button type="button" onClick={fetchProjects} className="fetch-projects-btn">Fetch Projects</button>
                </section>
                
            </form>
            <div className="projects-list">
                {projects.length === 0 ? (
                    <p className="winner-small-title" style={{fontSize:''}}>No projects available for the selected semester and year.</p>
                ) : (
                    projects.map((project: any) => (
                        <div key={project.id} className="project-card">
                            <h3>{project.name}</h3>
                            <img src={project.pictures[0]} alt={project.name} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};