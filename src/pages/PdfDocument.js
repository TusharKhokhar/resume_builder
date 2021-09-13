import React from "react";
import { Page, Text, View, Document, StyleSheet, Canvas, Image } from '@react-pdf/renderer';
import './Layout.css'
import { useContext } from 'react'
import { ResumeContext } from '../../src/ResumeContext/ResumeContext'

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black'

    },
    info: {
        fontSize: '10px',
        marginBottom: '3px',
    },

    info_heading: {
        fontSize: 12,
        marginBottom: '3px',
        fontWeight: 600,
    },
    section: {
        margin: '20px',
        marginBottom: 0,
    },

    personalInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    skills: {
        fontSize: '10px',
        marginBottom: '7px'
    },
    heading: {
        fontWeight: 700,
        fontSize: 13,
        marginBottom: '10px',
    },
    summary: {
        fontSize: '10px',
        // lineHeight: '1.5px'
    }
});


export const PdfDocument = ({formData}) => {
    const { fname, lname, address, city, zipcode, country, email, phone } = formData.personal
    const { employer, jobtitle, state, startdate_month, startdate_year, job_description, enddate_month, enddate_year } = formData.experience

    const { summary } = formData.summray

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


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.personalInfo}>
                        <Text style={styles.heading}>{fname} {lname}</Text>
                        <Text style={styles.info}>{address}, {city}, {zipcode}, ({country})</Text>
                        <Text style={styles.info}>{email}</Text>
                        <Text style={styles.info}>{phone}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.personalInfo}>
                        <Text style={styles.heading}>Education</Text>
                        {formData.education.length > 0 && formData.education.map(({ schoolname, city, state, degree, graduation_month, graduation_year, field_of_study }, index) => {
                            return <View>
                                <Text style={styles.info_heading}>{schoolname}, {city}, {state}</Text>
                                <Text style={styles.info}>{degree}, {field_of_study}, {graduation_month && graduation_year ? `${graduation_month}, ${graduation_year}` : 'Present'}</Text>
                            </View>
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.personalInfo}>
                        <Text style={styles.heading}>Skills</Text>
                        {Object.entries(newObj).map((item, index) => {
                           return <Text style={styles.skills}>{item[0]} : {item[1]}</Text>
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.personalInfo}>
                        <Text style={styles.heading}>Work Experience</Text>
                        <Text style={styles.skills}>Employer  : {employer}</Text>
                        <Text style={styles.skills}>Job title:  {jobtitle}</Text>
                        <Text style={styles.skills}>Job Description : {job_description}</Text>
                        <Text style={styles.skills}>Date : {enddate_month && enddate_year ? `${startdate_month}, ${startdate_year} - ${enddate_month}, ${enddate_year}` : 'Present'}</Text>
                        <Text style={styles.skills}>State : {state}</Text>
                        <Text style={styles.skills}>City : {formData.experience.city}</Text>

                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.personalInfo}>
                        <Text style={styles.heading}>Professional Summary</Text>
                        <Text style={styles.summary}>{summary}</Text>
                    </View>
                </View>

                {/* <View>
                    <Image src='https://source.unsplash.com/random'/>
                </View> */}
            </Page>
        </Document>
    );
}
