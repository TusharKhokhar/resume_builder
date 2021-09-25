import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { Validation } from '../Validation/Validation'

export const ResumeContext = createContext({
    formData: {
        personal: {},
        experience: {},
        education: [],
        skills: {},
        summray: {},
        error: {}
    },
    showdiv: 1,
    next: () => { },
    prev: () => { },
    save: () => { },
    onChangeHandler: () => { }
})


const ResumeContextProvider = (props) => {
    const [formdata, setFormData] = useState(
        {
            personalInfo: {},
            experienceInfo: {},
            educationInfo: [],
            skillsInfo: {},
            summrayInfo: {},
            error: {}

        }
    )
    const [showdiv, setShowdiv] = useState(1)
    const [error, setError]=useState({})
    const [educationData, setEducationData] = useState({})
    const backButtonHandler = () => {
        setShowdiv(preVal => preVal - 1)
    }

    const nextButtonHandler = () => {
        // const error = Validation(formdata)
        // if (Object.keys(error).length > 0) {
            // console.log("here");
            setError(error)
        // }
        // else {
            // setError({})
            setShowdiv(preVal => preVal + 1)
        // }

    }
    // console.log(error);
    const saveHandler = () => {
        if (Object.keys(formdata)[showdiv - 1] == 'educationInfo') {
            if (Object.keys(educationData).length !== 0) {
                formdata.educationInfo.push(educationData)
                setEducationData({})
            }

        }
    }
    const changeHandler = (e) => {
        // setError({error})
        if (Object.keys(formdata)[showdiv - 1] == 'educationInfo') {
            // setError({...error,[e.target.name]:''})
            setEducationData({
                ...educationData,
                [e.target.name]: e.target.value
            })

        }
        else {
            // setError({...error,[e.target.name]:''})
            setFormData({
                ...formdata, [Object.keys(formdata)[showdiv - 1]]: {
                    ...formdata[Object.keys(formdata)[showdiv - 1]],
                    [e.target.name]: e.target.value
                }
            })
        }

    }
    const resumeContextValue = {
        formData: {
            personal: formdata.personalInfo,
            experience: formdata.experienceInfo,
            education: formdata.educationInfo,
            skills: formdata.skillsInfo,
            summray: formdata.summrayInfo,
            error:error
        },
        showdiv: showdiv,
        next: nextButtonHandler,
        prev: backButtonHandler,
        save: saveHandler,
        onChangeHandler: changeHandler
    }

    return (
        <ResumeContext.Provider value={resumeContextValue}>
            {props.children}
        </ResumeContext.Provider>
    )

}

export default ResumeContextProvider