import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import "../CSS/EditPresentation.css";

const EditPresentation: React.FC = () => {
    
        const [time, setTime] = useState<string>('');
        const [date, setDate] = useState<string>('');
        const navigate = useNavigate();

        const savedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event?.target.files?.[0];
            if(file){

                const reader = new FileReader();
                reader.onloadend = () => {
                    const map = reader.result as string;
                    localStorage.setItem('savedImage', map);
                    
                };
                reader.readAsDataURL(file);
            } 
        };

        const submitChangesClick = () => {
            localStorage.setItem('savedTime', time);
            localStorage.setItem('savedDate', date);
            
            navigate('/');
        }
        
    return(
        <body className="presentation">
            <div>
                <h1>Capstone Presentation Information</h1>
                <input type="text" id="userInputTime" name="userInputTime" placeholder="Change the Time..." value = {time} onChange = {(e) => setTime(e.target.value)}></input>
                <input type="text" id="userInputDate" name="userInputDate" placeholder="Change the Date..." value = {date} onChange = {(e) => setDate(e.target.value)}></input>
                <label>Choose Image for Map</label>
                <input type="file" accept="image/*" onChange={savedImage} />
                <button className="submit-button" onClick={submitChangesClick}>Submit Changes</button>
                
                
            </div>
        </body>
       
    )
}
export default EditPresentation;