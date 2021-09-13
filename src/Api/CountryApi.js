
import axios from "axios"

export const getCountry = async (path) => {
    try {
        const res = await axios({
            method: "GET",
            url: `https://www.universal-tutorial.com/api${path}`,
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJraG9raGFydHVzaGFyMTVAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieDFqQTNuYVV6Y0xKQm84ODY2ZHQ3U3c0bzdTbXl6VDFYMHhEbWlta3Nja0NVTkJTcVoxa2w2a18wSDRJemZMbnUtNCJ9LCJleHAiOjE2MzEyODU1OTR9.f-WhwkIM7atlj0bQUWse8lnu2XJaDHu5DLySIj7f9gk",
                "Accept": "application/json"
            }
        })
        return res
    } catch (error) {
        return error.response
    }

}


// <label className='label'>City</label>
//                             <select className="form-select input-border" name='city' value={formdata.personal.city} onChange={onChangeHandler} onClick={getCityData}>
//                                 <option selected disabled value="">City</option>
//                                 {typeof (countries) == 'object' ? countries.map(({state_name},index) => {
//                                     return <option value={state_name} key={index}>{state_name}</option>
//                                 }) : <option value='' disabled>{countries}</option>}

//                             </select>


// x1jA3naUzcLJBo8866dt7Sw4o7SmyzT1X0xDmimksckCUNBSqZ1kl6k_0H4IzfLnu-4