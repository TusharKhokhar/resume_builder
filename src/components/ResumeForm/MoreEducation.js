import React from 'react'
import './MoreEducation.css'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const MoreEducation = (props) => {
    const { schoolname, degree, graduation_month, graduation_year } = props.item

    const month_year = graduation_month && graduation_year ? <span>{graduation_month}, {graduation_year}</span> : <span>Present</span>

    return (
        <div className="row education-row">
            <div className="col-12 education-col">
                <div className='col_data'>
                    <span>{schoolname},{degree}</span>
                    {month_year}
                </div>
                <div>
                    <EditIcon />
                    <DeleteOutlineIcon />
                </div>
            </div>
        </div>
    )

}

export default MoreEducation