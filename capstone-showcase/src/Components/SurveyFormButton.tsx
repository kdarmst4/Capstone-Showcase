import { useNavigate } from "react-router-dom";

function SurveyFormButton() {

  const navigate = useNavigate();
  const handleSurveyFormClick = () => {
    navigate("/survey");
  };

  return (
    <button
      className="survey-form-button"
      onClick={handleSurveyFormClick}
      aria-label="Survey Form Button"
    >
      Survey Form
    </button>
  );
}

export default SurveyFormButton;