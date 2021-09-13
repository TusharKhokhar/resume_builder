import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const ResumeContext = createContext({
    formData: {
        personal: {},
        experience: {},
        education: [],
        skills: {},
        summray: {},
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
        }
    )
    const [showdiv, setShowdiv] = useState(1)

    const [educationData, setEducationData] = useState({})
    const backButtonHandler = () => {
        setShowdiv(preVal => preVal - 1)
    }

    const nextButtonHandler = () => {
        setShowdiv(preVal => preVal + 1)

    }
    const saveHandler = () => {
        if (Object.keys(formdata)[showdiv - 1] == 'educationInfo') {
            if (Object.keys(educationData).length !== 0) {
                formdata.educationInfo.push(educationData)
                setEducationData({})
            }

        }
    }
    const changeHandler = (e) => {
        if (Object.keys(formdata)[showdiv - 1] == 'educationInfo') {
            setEducationData({
                ...educationData,
                [e.target.name]: e.target.value
            })

        }
        else {
            console.log(Object.keys(formdata)[showdiv - 1]);
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