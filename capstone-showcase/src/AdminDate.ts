export function TodaysDate() {
  const curr_year = new Date().getFullYear();
  const curr_month = new Date().getMonth() + 1;
  let semester = "fa";
  // Determine current semester based on month
  if (curr_month >= 0 && curr_month <= 4) {
    // Jan-May
    semester = "sp"; // Spring
  } else if (curr_month >= 5 && curr_month <= 7) {
    // Jun-Aug
    semester = "su"; // Summer
  } else {
    // Sep-Dec
    semester = "fa"; // Fall
  }
  return {
    year: curr_year,
    semester: semester
  };
}
