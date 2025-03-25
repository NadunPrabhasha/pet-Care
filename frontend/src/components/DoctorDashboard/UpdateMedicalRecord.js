import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMedicalRecord = () => {

    let navigate = useNavigate(); 

    const [successMessage, setSuccessMessage] = useState("");
    const [medicalRecord, setMedicalRecord] = useState({
        petName: '',
        date: '',
        diagnosis: '',
        treatment: '',
        weight: '',
    })

    const { recordID } = useParams()

    const handleFormSubmit = async () => {
         try{
            const response = await axios.put(`http://localhost:3001/medicalRecord_api/update_record/${recordID}`, medicalRecord)
            setSuccessMessage(response.data.message);
            // Reset form fields after successful submission
            setMedicalRecord({
                petName: '',
                date: '',
                diagnosis: '',
                treatment: '',
                weight:'',
            })
         }catch (error){
            console.error("update medical record submit error ", error)
         }
    }

    useEffect(() => {
        const fetchRecords = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/medicalRecord_api/get_one_record/${recordID}`);
                setMedicalRecord(response.data)
            } catch (error){
                console.error("update medical record retrieve error", error)
            }
        }
        fetchRecords()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMedicalRecord({...medicalRecord, [name]:value })
    }
    

    return ( 
        <div className="createForm">
            <h1>Update Medical Record</h1>
            {successMessage && <div className="successMessage" style={{color: 'yellow'}}>{successMessage}</div>}
            <form onSubmit={handleFormSubmit}>
                <div className="createFormInput">
                    <label htmlFor="petName">Pet Name :</label>
                    <input type="text" id="petName" name="petName" value={medicalRecord.petName} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="date">Date :</label>
                    <input type="date" id="date" name="date" value={medicalRecord.date} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="diagnosis">Diagnosis :</label>
                    <input type="text" id="diagnosis" name="diagnosis" value={medicalRecord.diagnosis} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="treatment">Treatment :</label>
                    <input type="text" id="treatment" name="treatment" value={medicalRecord.treatment} onChange={handleChange} />
                </div>
                <div className="createFormInput">
                    <label htmlFor="weight">weight :</label>
                    <input type="text" id="weight" name="weight" value={medicalRecord.weight} onChange={handleChange} />
                </div>
                <div className="createFormSubmit">
                    <button type="submit">Update Record</button>
                </div>
            </form>
        </div>
     );
}
 
export default UpdateMedicalRecord;