import React, {Component} from 'react'

function ShowImage({ccode, key}){
	ccode = "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/"+ccode+".svg"
	return <img src={decodeURI(ccode)} key={ccode} className="svgImg"/>
}
export default ShowImage