import React, { useContext } from "react";
import { useState } from "react";
import { getCountry } from "../../Api/CountryApi";
import Progressbar from "./Progressbar";
import "./ResumeForm.css";
import { degree, months, years, skill_levels } from "../../Api/StaticData";
import MoreEducation from "./MoreEducation";
import { ResumeContext } from "../../ResumeContext/ResumeContext";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { schema, formValidationData } from "../../Validation/Formikvalidation";
import * as Yup from "yup";

const ResumeForm = (props) => {
    const { formData, showdiv, onChangeHandler, prev, next, save } = useContext(ResumeContext);
    // const { error } = formData
    const formik = useFormik({
        initialValues: formValidationData,
        validationSchema: Yup.object().shape(schema),
        // onSubmit: () => {
        // }
    });
    const [countries, setContries] = useState([]);

    const [checkbox, setCheckbox] = useState({
        checkbox1: false,
        checkbox2: false,
    });

    const [showEducationDiv, setShowEducationDiv] = useState(true);
    const [showAddBtn, setShowAddBtn] = useState(false);
    const [totalSkills, setTotalSkills] = useState([{ skill1: "level1" }]);
    const history = useHistory();

    const getCountryData = async () => {
        const res = await getCountry("/countries");
        console.log(res);
        if (res.status == 200) {
            setContries([...res.data]);
        } else {
            setContries("Somthing went wrong");
        }
    };
    const checkboxHandler = (id) => {
        setCheckbox({ ...checkbox, [id]: !checkbox[id] });
    };

    const saveData = () => {
        if (formData.education.length > 0) {
            setShowEducationDiv(!showEducationDiv);
            setShowAddBtn(!showAddBtn);
        } else {
            alert("Enter Data");
        }
    };

    const addBtn = () => {
        setShowEducationDiv(!showEducationDiv);
        setShowAddBtn(!showAddBtn);
    };

    const addSkillHandler = () => {
        let value = `level${totalSkills.length + 1}`;
        setTotalSkills([...totalSkills, { [`skill${totalSkills.length + 1}`]: value }]);
    };

    if (showdiv == 6) {
        history.push("/layout");
    }
    return (
        <>
            <Progressbar step={showdiv} />

            <div className="container">
                {showdiv == 1 && (
                    <div>
                        <div className="row">
                            <h5 className="heading">COMPLETE YOUR RESUME HEADING</h5>
                            <p className="p-tag">Employers will use this information to contact you.</p>
                        </div>
                        <div className="row new-div">
                            <div className="col-6">
                                <label className="label">First Name</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="fname"
                                    value={formData.personal.fname}
                                    placeholder="e.g. John"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.fname && formik.errors.fname ? <span className="error_text">{formik.errors.fname}</span> : null}
                                {/* {error && error.fname ? <span className="error_text">{error.fname}</span> : null} */}
                            </div>
                            <div className="col-6">
                                <label className="label">Last Name</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="lname"
                                    value={formData.personal.lname}
                                    placeholder="e.g. William"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lname && formik.errors.lname ? <span className="error_text">{formik.errors.lname}</span> : null}
                                {/* {error && error.lname ? <span className="error_text">{error.lname}</span> : null} */}
                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-12">
                                <label className="label">Address</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="address"
                                    value={formData.personal.address}
                                    placeholder="e.g. 60,Collins st."
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.address && formik.errors.address ? <span className="error_text">{formik.errors.address}</span> : null}
                                {/* {error && error.address ? <span className="error_text">{error.address}</span> : null} */}

                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-6">
                                <label className="label">City</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="city"
                                    placeholder="e.g. San Fransico"
                                    value={formData.personal.city}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.city && formik.errors.city ? <span className="error_text">{formik.errors.city}</span> : null}
                                {/* {error && error.city ? <span className="error_text">{error.city}</span> : null} */}

                            </div>
                            <div className="col-3">
                                <label className="label">ZIP code</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="zipcode"
                                    placeholder="e.g. 60185"
                                    value={formData.personal.zipcode}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.zipcode && formik.errors.zipcode ? <span className="error_text">{formik.errors.zipcode}</span> : null}
                                {/* {error && error.zipcode ? <span className="error_text">{error.zipcode}</span> : null} */}

                            </div>
                            <div className="col-3">
                                <label className="label">Country</label>
                                <select
                                    className="form-select input-border"
                                    name="country"
                                    value={formData.personal.country}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onClick={getCountryData}
                                >
                                    <option selected disabled value="">
                                        country
                                    </option>
                                    {typeof countries == "object" ? (
                                        countries.map(({ country_name }, index) => {
                                            return (
                                                <option value={country_name} key={index}>
                                                    {country_name}
                                                </option>
                                            );
                                        })
                                    ) : (
                                        <option value="" disabled>
                                            {countries}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-6">
                                <label className="label">Email address</label>
                                <input
                                    className="form-control input-border"
                                    type="email"
                                    name="email"
                                    value={formData.personal.email}
                                    placeholder="e.g. abc@gmail.com"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ? <span className="error_text">{formik.errors.email}</span> : null}
                                {/* {error && error.email ? <span className="error_text">{error.email}</span> : null} */}

                            </div>
                            <div className="col-6">
                                <label className="label">Phone</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="phone"
                                    value={formData.personal.phone}
                                    placeholder="e.g. 01011-10254"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone ? <span className="error_text">{formik.errors.phone}</span> : null}
                                {/* {error && error.phone ? <span className="error_text">{error.phone}</span> : null} */}
                            </div>
                        </div>
                    </div>
                )}

                {/* second div */}
                {showdiv == 2 && (
                    <div>
                        <div className="row">
                            <h5 className="heading">EXPERIENCE</h5>
                            <p className="p-tag">List your work experience, from the most recent to the oldest. Feel free to use our pre-written examples.</p>
                        </div>

                        <div className="row new-div">
                            <div className="col-6">
                                <label className="label">Employer</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="employer"
                                    value={formData.experience.employer}
                                    placeholder="e.g. IBM"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.employer && formik.errors.employer ? <span className="error_text">{formik.errors.employer}</span> : null}
                                {/* {error && error.employer ? <span className="error_text">{error.employer}</span> : null} */}

                            </div>
                            <div className="col-6">
                                <label className="label">Job title</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="jobtitle"
                                    value={formData.experience.jobtitle}
                                    placeholder="e.g. Engineer"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.jobtitle && formik.errors.jobtitle ? <span className="error_text">{formik.errors.jobtitle}</span> : null}
                                {/* {error && error.jobtitle ? <span className="error_text">{error.jobtitle}</span> : null} */}

                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-6">
                                <label className="label">City</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="city"
                                    value={formData.experience.city}
                                    placeholder="e.g. San Fransico"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.city && formik.errors.city ? <span className="error_text">{formik.errors.city}</span> : null}
                                {/* {error && error.city ? <span className="error_text">{error.city}</span> : null} */}

                            </div>
                            <div className="col-6">
                                <label className="label">State</label>
                                <input
                                    className="form-control input-border"
                                    type="text"
                                    name="state"
                                    value={formData.experience.state}
                                    placeholder="e.g. California"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.state && formik.errors.state ? <span className="error_text">{formik.errors.state}</span> : null}
                                {/* {error && error.state ? <span className="error_text">{error.state}</span> : null} */}

                            </div>
                        </div>
                        <div className="row row-margin">
                            <div className="col-3">
                                <label className="label">Start date</label>
                                <select
                                    className="form-select input-border"
                                    name="startdate_month"
                                    value={formData.experience.startdate_month}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option selected disabled value="">
                                        Month
                                    </option>
                                    {months.map((month) => {
                                        return <option value={month}>{month}</option>;
                                    })}
                                </select>
                                {formik.touched.startdate_month && formik.errors.startdate_month ? <span className="error_text">{formik.errors.startdate_month}</span> : null}
                                {/* {error && error.startdate_month ? <span className="error_text">{error.startdate_month}</span> : null} */}

                            </div>
                            <div className="col-3">
                                <label className="label" style={{ marginTop: "17px" }}></label>
                                <select
                                    className="form-select input-border"
                                    name="startdate_year"
                                    value={formData.experience.startdate_year}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option selected disabled value="">
                                        Year
                                    </option>
                                    {years.map((year) => {
                                        return <option value={year}>{year}</option>;
                                    })}
                                </select>
                                {formik.touched.startdate_year && formik.errors.startdate_year ? <span className="error_text">{formik.errors.startdate_year}</span> : null}
                                {/* {error && error.startdate_year ? <span className="error_text">{error.startdate_year}</span> : null} */}

                            </div>
                            <div className="col-3">
                                <label className="label">End date</label>
                                <select className="form-select input-border" name="enddate_month" disabled={checkbox.checkbox1} value={formData.experience.enddate_month} onChange={onChangeHandler}>
                                    <option selected disabled value="">
                                        Month
                                    </option>
                                    {months.map((month) => {
                                        return <option value={month}>{month}</option>;
                                    })}
                                </select>
                                <input
                                    type="checkbox"
                                    name=""
                                    id="checkbox1"
                                    onClick={() => {
                                        checkboxHandler("checkbox1");
                                    }}
                                    checked={checkbox.checkbox1}
                                />
                                <label className="checkbox-label" htmlFor="checkbox1">
                                    I presently work here
                                </label>
                                {/* <Checkbox> I presently work here </Checkbox> */}
                            </div>
                            <div className="col-3">
                                <label className="label" style={{ marginTop: "17px" }}></label>
                                <select className="form-select input-border" name="enddate_year" disabled={checkbox.checkbox1} value={formData.experience.enddate_year} onChange={onChangeHandler}>
                                    <option selected disabled value="">
                                        Year
                                    </option>
                                    {years.map((year) => {
                                        return <option value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="row row-margin">
                                <div className="col-12">
                                    <label className="label">Job description</label>
                                    <textarea
                                        className="form-control input-border"
                                        rows="3"
                                        name="job_description"
                                        value={formData.experience.job_description}
                                        placeholder="Describe your job responsibilities and achievements."
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            onChangeHandler(e);
                                        }}
                                        onBlur={formik.handleBlur}
                                    ></textarea>
                                    {formik.touched.job_description && formik.errors.job_description ? <span className="error_text">{formik.errors.job_description}</span> : null}
                                    {/* {error && error.job_description ? <span className="error_text">{error.job_description}</span> : null} */}

                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* third div */}
                {showdiv == 3 && (
                    <div>
                        {formData.education.length > 0 &&
                            formData.education.map((item, index) => {
                                return <MoreEducation key={index} item={item} />;
                            })}
                        {(formData.education.length == 0 || showEducationDiv) && (
                            <div>
                                <div className="row">
                                    <h5 className="heading">EDUCATION</h5>
                                    <p className="p-tag">Add information about your educational background.</p>
                                </div>

                                <div className="row new-div">
                                    <div className="col-6">
                                        <label className="label">School name</label>
                                        <input
                                            className="form-control input-border"
                                            type="text"
                                            name="schoolname"
                                            value={formData.education.schoolname}
                                            placeholder="e.g. Harvard University"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                onChangeHandler(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.schoolname && formik.errors.schoolname ? <span className="error_text">{formik.errors.schoolname}</span> : null}
                                        {/* {error && error.schoolname ? <span className="error_text">{error.schoolname}</span> : null} */}

                                    </div>

                                    <div className="col-6">
                                        <label className="label">City</label>
                                        <input
                                            className="form-control input-border"
                                            type="text"
                                            name="city"
                                            value={formData.education.city}
                                            placeholder="e.g. San Fransico"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                onChangeHandler(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.city && formik.errors.city ? <span className="error_text">{formik.errors.city}</span> : null}
                                        {/* {error && error.city ? <span className="error_text">{error.city}</span> : null} */}

                                    </div>
                                </div>

                                <div className="row row-margin">
                                    <div className="col-6">
                                        <label className="label">State</label>
                                        <input
                                            className="form-control input-border"
                                            type="text"
                                            name="state"
                                            value={formData.education.state}
                                            placeholder="e.g. California"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                onChangeHandler(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.state && formik.errors.state ? <span className="error_text">{formik.errors.state}</span> : null}
                                        {/* {error && error.state ? <span className="error_text">{error.state}</span> : null} */}

                                    </div>
                                    <div className="col-6">
                                        <label className="label">Select a degree</label>
                                        <select
                                            className="form-select input-border"
                                            name="degree"
                                            value={formData.education.degree}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                onChangeHandler(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option selected disabled value=""></option>
                                            {degree.map((item) => {
                                                return <option value={item}>{item}</option>;
                                            })}
                                        </select>
                                        {formik.touched.degree && formik.errors.degree ? <span className="error_text">{formik.errors.degree}</span> : null}
                                        {/* {error && error.degree ? <span className="error_text">{error.degree}</span> : null} */}

                                    </div>
                                </div>
                                <div className="row new-div">
                                    <div className="col-6">
                                        <label className="label">Field of study</label>
                                        <input
                                            className="form-control input-border"
                                            type="text"
                                            name="field_of_study"
                                            value={formData.education.field_of_study}
                                            placeholder="e.g.Engineer"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                onChangeHandler(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.field_of_study && formik.errors.field_of_study ? <span className="error_text">{formik.errors.field_of_study}</span> : null}
                                        {/* {error && error.employer ? <span className="error_text">{error.employer}</span> : null} */}

                                    </div>
                                    <div className="col-3">
                                        <label className="label">Graduation date</label>
                                        <select className="form-select input-border" disabled={checkbox.checkbox2} name="graduation_month" value={formData.education.graduation_month} onChange={onChangeHandler}>
                                            <option selected disabled value="">
                                                Month
                                            </option>
                                            {months.map((month) => {
                                                return <option value={month}>{month}</option>;
                                            })}
                                        </select>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="checkbox2"
                                            onClick={() => {
                                                checkboxHandler("checkbox2");
                                            }}
                                            checked={checkbox.checkbox2}
                                        />
                                        <label className="checkbox-label" htmlFor="checkbox2">
                                            I presently attend here
                                        </label>
                                        {/* <Checkbox> I presently attend here </Checkbox> */}
                                    </div>
                                    <div className="col-3">
                                        <label className="label" style={{ marginTop: "17px" }}></label>
                                        <select className="form-select input-border" name="graduation_year" disabled={checkbox.checkbox2} value={formData.education.graduation_year} onChange={onChangeHandler}>
                                            <option selected disabled value="">
                                                Year
                                            </option>
                                            {years.map((year) => {
                                                return <option value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* forth div */}
                {showdiv == 4 && (
                    <div>
                        <div className="row">
                            <h5 className="heading">SKILLS</h5>
                            <p className="p-tag">Highlight 6-8 of your top skills.</p>
                        </div>

                        {totalSkills.map((item, index) => {
                            return (
                                <div className="row new-div" key={index}>
                                    <div className="col-6">
                                        <label className="label">Skill</label>
                                        <input className="form-control input-border" type="text" placeholder="e.g. Project Management" name={Object.keys(item)} value={formData.skills.skill} onChange={onChangeHandler} />
                                    </div>
                                    <div className="col-6">
                                        <label className="label">Level</label>
                                        <select className="form-select input-border" name={Object.values(item)} value={formData.skills.skill_level} onChange={onChangeHandler}>
                                            <option selected disabled value="">
                                                Select Your Skill level
                                            </option>
                                            {skill_levels.map((level) => {
                                                return <option value={level}>{level}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* fifth div */}
                {showdiv == 5 && (
                    <div>
                        <div className="row">
                            <h5 className="heading">PROFESSIONAL SUMMARY</h5>
                            <p className="p-tag">Write a short summary telling more about yourself, your strengths and experience. Feel free to use our pre-written examples.</p>
                        </div>
                        <div className="row new-div">
                            <div className="col-12">
                                <label className="label">Summary</label>
                                <textarea
                                    className="form-control input-border"
                                    rows="5"
                                    placeholder="e.g. Write a short summary telling more about yourself, your strengths and experience."
                                    name="summary"
                                    value={formData.summray.summray}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        onChangeHandler(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.touched.summary && formik.errors.summary ? <span className="error_text">{formik.errors.summary}</span> : null}
                                {/* {error && error.summary ? <span className="error_text">{error.summary}</span> : null } */}

                            </div>
                        </div>
                    </div>
                )}

                {/* button div */}
                <div className="btn-div">
                    <div className="row">
                        <div className="col-4 text-center">
                            {showdiv >= 2 ? (
                                <button type="button" className="btn btn-dark" onClick={prev}>
                                    Back
                                </button>
                            ) : (
                                <button type="button" className="btn btn-dark" disabled>
                                    Back
                                </button>
                            )}
                        </div>
                        <div className="col-4 text-center">
                            {formData.education.length > 0 && showAddBtn && showdiv == 3 ? (
                                <button type="button" className="btn btn-outline-success" onClick={addBtn}>
                                    + Add Another Degree{" "}
                                </button>
                            ) : (
                                showdiv == 4 && (
                                    <button type="button" className="btn btn-outline-success" onClick={addSkillHandler}>
                                        + Add Another Skill{" "}
                                    </button>
                                )
                            )}
                        </div>
                        <div className="col-4 text-center">
                            {showdiv == 3 && showEducationDiv ? (
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => {
                                        save();
                                        saveData();
                                    }}
                                >
                                    Save
                                </button>
                            ) : (
                                <button type="button" className="btn btn-warning" onClick={next}>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        </>
    );
};

export default ResumeForm;
