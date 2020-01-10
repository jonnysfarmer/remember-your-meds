import React, { useState, useEffect } from 'react'




const AddReminder = (props) => {

  const [propsData, setPropsData] = useState()

  //initiate our data from our props
  const setDataFromProps = () => {
    console.log('setting props data')
    const remType = !props.location.state ? null : props.location.state.reminderType 
    setPropsData({ 
      ['prescriptionId']: props.match.params.id, 
      ['reminderType']: remType
    })
  }
  
  //===== PRESCRIPTION INFO

  

  //===== REMINDER TYPE
  //----- check params for reminderType


  useEffect(() => {
    console.log('useeffect')
    setDataFromProps()
  },[props])

  console.log(propsData)
  

  return (
    <div>

    </div>
  )
}


export default AddReminder