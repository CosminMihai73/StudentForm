import React, { useState } from 'react';
import axios from 'axios';
import {
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBTypography,
    MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit';

const StudentForm = () => {
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [facultate, setFacultate] = useState('');
    const [numberOfLines, setNumberOfLines] = useState(1);
    const [pdfUrl, setPdfUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const response = await axios.post('http://localhost:5097/Student/generate-pdf', {
                Nume: nume,
                Prenume: prenume,
                Facultate: facultate,
                NumberOfLines: numberOfLines,
            }, { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setPdfUrl(url);
        } catch (error) {
            console.error('Eroare la generarea PDF-ului:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <MDBContainer className="py-5">
            <MDBCard className="mx-auto col-md-6 col-12 shadow-5">
                <MDBCardBody className="p-4">
                    <MDBTypography tag="h1" className="text-center mb-4 text-primary fw-bold">
                        Fișa Studentului
                    </MDBTypography>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <MDBInput
                                label="Nume"
                                id="nume"
                                type="text"
                                value={nume}
                                onChange={(e) => setNume(e.target.value)}
                                required
                                size="lg"
                                className="rounded-0"
                            />
                        </div>
                        <div className="mb-4">
                            <MDBInput
                                label="Prenume"
                                id="prenume"
                                type="text"
                                value={prenume}
                                onChange={(e) => setPrenume(e.target.value)}
                                required
                                size="lg"
                                className="rounded-0"
                            />
                        </div>
                        <div className="mb-4">
                            <MDBInput
                                label="Facultate"
                                id="facultate"
                                type="text"
                                value={facultate}
                                onChange={(e) => setFacultate(e.target.value)}
                                required
                                size="lg"
                                className="rounded-0"
                            />
                        </div>
                        <div className="mb-4">
                            <MDBInput
                                label="Numărul de linii"
                                id="numberOfLines"
                                type="number"
                                min="1"
                                max="10000"
                                value={numberOfLines}
                                onChange={(e) => setNumberOfLines(e.target.value)}
                                required
                                size="lg"
                                className="rounded-0"
                            />
                        </div>

                       
                        {isLoading ? (
                            <MDBBtn color="primary" className="w-100 mb-3" size="lg" disabled>
                                <MDBSpinner grow size="sm" role="status" tag="span" className="me-2" />
                                Generare în curs...
                            </MDBBtn>
                        ) : (
                            <MDBBtn type="submit" color="primary" className="w-100 mb-3" size="lg">
                                <MDBIcon fas icon="file-pdf" className="me-2" /> Generează PDF
                            </MDBBtn>
                        )}
                    </form>

                    {pdfUrl && (
                        <div className="text-center mt-4">
                            <MDBTypography tag="h2" className="text-success">PDF Generat</MDBTypography>
                            <a href={pdfUrl} download="FisaStudentului.pdf">
                                <MDBBtn color="success" className="mt-2" size="lg">
                                    <MDBIcon fas icon="download" className="me-2" /> Descarcă PDF
                                </MDBBtn>
                            </a>
                        </div>
                    )}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default StudentForm;
