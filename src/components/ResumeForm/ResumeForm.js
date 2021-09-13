import React, { useContext } from 'react'
import { useState } from 'react'
import { getCountry } from '../../Api/CountryApi'
import Progressbar from './Progressbar'
import './ResumeForm.css'
import { degree, months, years, skill_levels } from '../../Api/StaticData'
import MoreEducation from './MoreEducation'
import { ResumeContext } from '../../ResumeContext/ResumeContext'
import { useHistory, useLocation } from 'react-router-dom'

const ResumeForm = (props) => {
    const { formData, showdiv, onChangeHandler, prev, next, save } = useContext(ResumeContext)
    const [countries, setContries] = useState([])

    const [checkbox, setCheckbox] = useState({
        checkbox1: false,
        checkbox2: false
    })

    const [showEducationDiv, setShowEducationDiv] = useState(true)
    const [showAddBtn, setShowAddBtn] = useState(false)
    const [totalSkills, setTotalSkills] = useState([
        { skill1: 'level1' }
    ])
    const history = useHistory()

    const getCountryData = async () => {
        const res = await getCountry('/countries')
        console.log(res);
        if (res.status == 200) {
            setContries([...res.data])
        }
        else {
            setContries('Somthing went wrong')
        }
    }
    const checkboxHandler = (id) => {
        setCheckbox({ ...checkbox, [id]: !checkbox[id] })
    }

    const saveData = () => {
        if (formData.education.length > 0) {
            setShowEducationDiv(!showEducationDiv)
            setShowAddBtn(!showAddBtn)
        }
        else {
            alert("Enter Data")
        }
    }

    const addBtn = () => {
        setShowEducationDiv(!showEducationDiv)
        setShowAddBtn(!showAddBtn)
    }

    const addSkillHandler = () => {
        let value = `level${totalSkills.length + 1}`
        setTotalSkills([...totalSkills, { [`skill${totalSkills.length + 1}`]: value }])
    }

    if (showdiv == 6) {
        history.push('/layout')
    }
    return (
        <>
            <Progressbar step={showdiv} />

            <div className='container'>
                {showdiv == 1 && <div>

                    <div className='row'>
                        <h5 className='heading'>COMPLETE YOUR RESUME HEADING</h5>
                        <p className='p-tag'>Employers will use this information to contact you.</p>
                    </div>
                    <div className="row new-div" >
                        <div className="col-6">
                            <label className='label'>First Name</label>
                            <input className="form-control input-border" type="text" name='fname' value={formData.personal.fname} placeholder="e.g. John" onChange={onChangeHandler} />
                        </div>
                        <div className="col-6">
                            <label className='label'>Last Name</label>
                            <input className="form-control input-border" type="text" name='lname' value={formData.personal.lname} placeholder="e.g. William" onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-12">
                            <label className='label'>Address</label>
                            <input className="form-control input-border" type="text" name='address' value={formData.personal.address} placeholder="e.g. 60,Collins st." onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-6">
                            <label className='label'>City</label>
                            <input className="form-control input-border" type="text" name='city' placeholder="e.g. San Fransico" value={formData.personal.city} onChange={onChangeHandler} />
                        </div>
                        <div className="col-3">
                            <label className='label'>ZIP code</label>
                            <input className="form-control input-border" type="text" name='zipcode' placeholder="e.g. 60185" value={formData.personal.zipcode} onChange={onChangeHandler} />
                        </div>
                        <div className="col-3">
                            <label className='label'>Country</label>
                            <select className="form-select input-border" name='country' value={formData.personal.country} onChange={onChangeHandler} onClick={getCountryData}>
                                <option selected disabled value="">country</option>
                                {typeof (countries) == 'object' ? countries.map(({ country_name }, index) => {
                                    return <option value={country_name} key={index}>{country_name}</option>
                                }) : <option value='' disabled>{countries}</option>}

                            </select>
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-6">
                            <label className='label'>Email address</label>
                            <input className="form-control input-border" type="text" name='email' value={formData.personal.email} placeholder="e.g. abc@gmail.com" onChange={onChangeHandler} />
                        </div>
                        <div className="col-6">
                            <label className='label'>Phone</label>
                            <input className="form-control input-border" type="text" name='phone' value={formData.personal.phone} placeholder="e.g. 01011-10254" onChange={onChangeHandler} />
                        </div>
                    </div>
                </div>}

                {/* second div */}
                {showdiv == 2 && <div>
                    <div className='row'>
                        <h5 className='heading'>EXPERIENCE</h5>
                        <p className='p-tag'>List your work experience, from the most recent to the oldest. Feel free to use our pre-written examples.</p>
                    </div>

                    <div className="row new-div" >
                        <div className="col-6">
                            <label className='label'>Employer</label>
                            <input className="form-control input-border" type="text" name='employer' value={formData.experience.employer} placeholder="e.g. IBM" onChange={onChangeHandler} />
                        </div>
                        <div className="col-6">
                            <label className='label'>Job title</label>
                            <input className="form-control input-border" type="text" name='jobtitle' value={formData.experience.jobtitle} placeholder="e.g. Engineer" onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-6">
                            <label className='label'>City</label>
                            <input className="form-control input-border" type="text" name='city' value={formData.experience.city} placeholder="e.g. San Fransico" onChange={onChangeHandler} />
                        </div>
                        <div className="col-6">
                            <label className='label'>State</label>
                            <input className="form-control input-border" type="text" name='state' value={formData.experience.state} placeholder="e.g. California" onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="row row-margin">
                        <div className="col-3">
                            <label className='label'>Start date</label>
                            <select className="form-select input-border" name='startdate_month' value={formData.experience.startdate_month} onChange={onChangeHandler}>
                                <option selected disabled value="">Month</option>
                                {months.map((month) => {
                                    return <option value={month}>{month}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label className='label' style={{ marginTop: '17px' }}></label>
                            <select className="form-select input-border" name='startdate_year' value={formData.experience.startdate_year} onChange={onChangeHandler}>
                                <option selected disabled value="" >Year</option>
                                {years.map((year) => {
                                    return <option value={year}>{year}</option>
                                })}

                            </select>
                        </div>
                        <div className="col-3">
                            <label className='label'>End date</label>
                            <select className="form-select input-border" name='enddate_month' disabled={checkbox.checkbox1} value={formData.experience.enddate_month} onChange={onChangeHandler}>
                                <option selected disabled value="">Month</option>
                                {months.map((month) => {
                                    return <option value={month}>{month}</option>
                                })}
                            </select>
                            <input type="checkbox" name="" id="checkbox1" onClick={() => { checkboxHandler('checkbox1') }} checked={checkbox.checkbox1} />
                            <label className='checkbox-label' htmlFor='checkbox1'>I presently work here</label>
                            {/* <Checkbox> I presently work here </Checkbox> */}
                        </div>
                        <div className="col-3">
                            <label className='label' style={{ marginTop: '17px' }}></label>
                            <select className="form-select input-border" name='enddate_year' disabled={checkbox.checkbox1} value={formData.experience.enddate_year} onChange={onChangeHandler}>
                                <option selected disabled value="">Year</option>
                                {years.map((year) => {
                                    return <option value={year}>{year}</option>
                                })}
                            </select>
                        </div>
                        <div className="row row-margin">
                            <div className="col-12">
                                <label className='label'>Job description</label>
                                <textarea className="form-control input-border" rows="3" name='job_description' value={formData.experience.job_description} placeholder="Describe your job responsibilities and achievements." onChange={onChangeHandler}></textarea>
                            </div>
                        </div>
                    </div>
                </div>}

                {/* third div */}
                {showdiv == 3 && <div>
                    {formData.education.length > 0 && formData.education.map((item, index) => {
                        return <MoreEducation key={index} item={item} />
                    })}
                    {(formData.education.length == 0 || showEducationDiv) && <div>
                        <div className='row'>
                            <h5 className='heading'>EDUCATION</h5>
                            <p className='p-tag'>Add information about your educational background.</p>
                        </div>

                        <div className="row new-div" >
                            <div className="col-6">
                                <label className='label'>School name</label>
                                <input className="form-control input-border" type="text" name='schoolname' value={formData.education.schoolname} placeholder="e.g. Harvard University" onChange={onChangeHandler} required />
                            </div>
                            <div className="col-6">
                                <label className='label'>City</label>
                                <input className="form-control input-border" type="text" name='city' value={formData.education.city} placeholder="e.g. San Fransico" onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-6">
                                <label className='label'>State</label>
                                <input className="form-control input-border" type="text" name='state' value={formData.education.state} placeholder="e.g. California" onChange={onChangeHandler} />
                            </div>
                            <div className="col-6">
                                <label className='label'>Select a degree</label>
                                <select className="form-select input-border" name='degree' value={formData.education.degree} onChange={onChangeHandler}>
                                    <option selected disabled value=""></option>
                                    {degree.map((item) => {
                                        return <option value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row new-div" >
                            <div className="col-6">
                                <label className='label'>Field of study</label>
                                <input className="form-control input-border" type="text" name='field_of_study' value={formData.education.field_of_study} placeholder="e.g.Engineer" onChange={onChangeHandler} />
                            </div>
                            <div className="col-3">
                                <label className='label'>Graduation date</label>
                                <select className="form-select input-border" disabled={checkbox.checkbox2} name='graduation_month' value={formData.education.graduation_month} onChange={onChangeHandler}>
                                    <option selected disabled value="">Month</option>
                                    {months.map((month) => {
                                        return <option value={month}>{month}</option>
                                    })}
                                </select>
                                <input type="checkbox" name="" id="checkbox2" onClick={() => { checkboxHandler('checkbox2') }} checked={checkbox.checkbox2} />
                                <label className='checkbox-label' htmlFor='checkbox2'>I presently attend here</label>
                                {/* <Checkbox> I presently attend here </Checkbox> */}
                            </div>
                            <div className="col-3">
                                <label className='label' style={{ marginTop: '17px' }}></label>
                                <select className="form-select input-border" name='graduation_year' disabled={checkbox.checkbox2} value={formData.education.graduation_year} onChange={onChangeHandler}>
                                    <option selected disabled value="">Year</option>
                                    {years.map((year) => {
                                        return <option value={year}>{year}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>}
                </div>}

                {/* forth div */}
                {showdiv == 4 && <div>
                    <div className='row'>
                        <h5 className='heading'>SKILLS</h5>
                        <p className='p-tag'>Highlight 6-8 of your top skills.</p>
                    </div>

                    {totalSkills.map((item, index) => {
                        return <div className="row new-div" key={index}>
                            <div className="col-6">
                                <label className='label'>Skill</label>
                                <input className="form-control input-border" type="text" placeholder="e.g. Project Management" name={Object.keys(item)} value={formData.skills.skill} onChange={onChangeHandler} />
                            </div>
                            <div className="col-6">
                                <label className='label'>Level</label>
                                <select className="form-select input-border" name={Object.values(item)} value={formData.skills.skill_level} onChange={onChangeHandler}>
                                    <option selected disabled value="">Select Your Skill level</option>
                                    {skill_levels.map((level) => {
                                        return <option value={level}>{level}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    })}
                </div>}

                {/* fifth div */}
                {showdiv == 5 && <div>
                    <div className='row'>
                        <h5 className='heading'>PROFESSIONAL SUMMARY</h5>
                        <p className='p-tag'>Write a short summary telling more about yourself, your strengths and experience. Feel free to use our pre-written examples.</p>
                    </div>
                    <div className="row new-div" >
                        <div className="col-12">
                            <label className='label'>Summary</label>
                            <textarea className="form-control input-border" rows="5" placeholder="e.g. Write a short summary telling more about yourself, your strengths and experience." name='summary' value={formData.summray.summray} onChange={onChangeHandler}></textarea>
                        </div>
                    </div>
                </div>}

               
                {/* button div */}
                <div className='btn-div'>
                    <div className="row">
                        <div className="col-4 text-center">
                            {showdiv >= 2 ? <button type="button" className="btn btn-dark" onClick={prev}>Back</button> : <button type="button" className="btn btn-dark" disabled>Back</button>}
                        </div>
                        <div className="col-4 text-center">
                            {formData.education.length > 0 && showAddBtn && showdiv == 3 ?
                                <button type="button" className="btn btn-outline-success" onClick={addBtn}>+ Add Another Degree </button>
                                : showdiv == 4 && <button type="button" className="btn btn-outline-success" onClick={addSkillHandler} >+ Add Another Skill </button>
                            }
                        </div>
                        <div className="col-4 text-center">
                            {(showdiv == 3 && showEducationDiv) ?
                                <button type="button" className="btn btn-warning" onClick={() => { save(); saveData() }}>Save</button>
                                : <button type="button" className="btn btn-warning" onClick={next}>Next</button>}

                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )

}

export default ResumeForm