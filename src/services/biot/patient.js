/**
 * This service handles patient-related API calls.
 * 
 * You can add any patient-related API methods here or create additional services as needed.
 * 
 * Note: Ensure that your plugin's user service has the necessary permissions 
 * before making any API calls to the backend.
 */

import { search, get } from "./base.js";


export const searchOnlyFemalePatients = async (newToken, traceparent) => {   
    return searchPatients(newToken, traceparent, {
        "_gender" : {
            eq: 'FEMALE'
        }
    })
};


export const searchPatients = async (newToken, traceparent, filter) => {
    const searchPatientsUrl = `/organization/v1/users/patients`;
    return search(newToken, traceparent, searchPatientsUrl, {filter})
};

export const getPatient = async (newToken, traceparent, patientId) => {
    const getPatientUrl = `/organization/v1/users/patients/${patientId}`;
    return get(newToken, traceparent, getPatientUrl)
};
