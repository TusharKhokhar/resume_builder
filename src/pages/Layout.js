import React from 'react'
import { useContext } from 'react'
import { ResumeContext } from '../../src/ResumeContext/ResumeContext'
import TelegramIcon from '@material-ui/icons/Telegram';
import './Layout.css'
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolIcon from '@material-ui/icons/School';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import LinearProgress from '@material-ui/core/LinearProgress';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import { PdfDocument } from './PdfDocument';
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Layout = (props) => {
    const { formData } = useContext(ResumeContext)
    const { fname, lname, address, city, zipcode, country, email, phone } = formData.personal
    let { employer, jobtitle, state, startdate_month, startdate_year, job_description, enddate_month, enddate_year } = formData.experience

    const { summary } = formData.summray
    const show = true
    var CurrentDate = moment().format();

    const skill = []
    Object.entries(formData.skills).map((item, index) => {
        if (index % 2 == 0) {
            skill.push(item[1])
        }
    })

    const level = []
    Object.entries(formData.skills).map((item, index) => {
        if (index % 2 == 1) {
            level.push(item[1])
        }
    })

    const newObj = {}

    skill.map((item, index) => {
        newObj[item] = level[index]
    })

    const levelValue = {
        Beginner: '25',
        Skillfull: '50',
        Experienced: '75',
        Expert: '100'
    }

    return (
        <>
            <div className='preview'>
                <div className='main_div'>
                    <div className="container">
                        <div className="row">
                            <h3 className='name_heading'>{fname} {lname}</h3>
                            <div>
                                <TelegramIcon color='primary' />
                                <span className='profile_span'>{address}, {city}, {zipcode}, ({country})</span>
                            </div>
                            <div>
                                <EmailIcon color='primary' />
                                <span className='profile_span'>{email}</span>
                            </div>
                            <div>
                                <PhoneIcon color='primary' />
                                <span className='profile_span'>{phone}</span>
                            </div>
                        </div>

                        <div className="row row_margin">
                            <div className="col">
                                <div className='education'>
                                    <SchoolIcon className='schoolIcon' color='primary' />
                                    <h5 className='name_heading'>Education</h5>
                                </div>
                                {formData.education.length > 0 && formData.education.map(({ schoolname, city, state, degree, graduation_month, graduation_year, field_of_study }, index) => {
                                    return <div className='education_detail'>
                                        <div className='education_detail_heading'>{schoolname}, {city}, {state}</div>
                                        <div>{degree}, {field_of_study}, {graduation_month && graduation_year ? `${graduation_month}, ${graduation_year}` : 'Present'}</div>
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className="row row_margin">
                            <div className="col">
                                <div className='education'>
                                    <StarHalfIcon className='starIcon' color='primary' />
                                    <h5 className='name_heading'>Skills</h5>
                                </div>
                                {Object.entries(newObj).map((item, index) => {
                                    return <div className='col-6 skil_div'>
                                        <span>{item[0]}</span>
                                        <LinearProgress variant="determinate" color='primary' value={levelValue[item[1]]} />
                                    </div>
                                })}

                            </div>
                        </div>

                        <div className="row row_margin">
                            <div className="col">
                                <div className='education'>
                                    <WorkOutlineIcon className='schoolIcon' color='primary' />
                                    <h5 className='name_heading'>Work Experience</h5>
                                </div>
                                <div>
                                    <span><span className='label'>Employer</span> : {employer}</span>
                                </div>
                                <div>
                                    <span><span className='label'>Job title</span> : {jobtitle}</span>
                                </div>
                                <div>
                                    <span><span className='label'>Job Description</span> : {job_description}</span>
                                </div>
                                <div>
                                    <span><span className='label'>Date</span> :{enddate_month && enddate_year ? `${startdate_month}, ${startdate_year} - ${enddate_month}, ${enddate_year}` : 'Present'} </span>
                                </div>
                                <div>
                                    <span><span className='label'>City</span> : {formData.experience.city}</span>
                                </div>
                                <div>
                                    <span><span className='label'>State</span> : {state}</span>
                                </div>
                            </div>
                        </div>

                        <div className="row row_margin">
                            <div className="col">
                                <div className='education'>
                                    <DescriptionIcon className='schoolIcon' color='primary' />
                                    <h5 className='name_heading'>Professional Summary</h5>
                                </div>
                                <div className='education_detail'>
                                    <div className=''>
                                        <div>
                                            {summary}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {show && (
                    <PDFDownloadLink
                        document={<PdfDocument formData={formData}/>}
                        fileName={`RESUME_${CurrentDate}`}
                        style={{
                            textDecoration: "none",
                            padding: "10px",
                            color: "black",
                            backgroundColor: "#fcba03",
                            marginBottom: '20px'
                        }}

                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download Pdf"
                        }
                    </PDFDownloadLink>
                )}
            </div>
        </>
    )

}

export default Layout