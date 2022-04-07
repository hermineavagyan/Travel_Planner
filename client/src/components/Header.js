import {Link} from "react-router-dom";




const Header = (props)=>{

    const {appName, titleText, link, linkText} = props;


    return(
        <header>
            <h2 style={{
                fontSize: "30px", borderBottom: "5px double lightgray",
                marginLeft: "450px", marginRight: "450px"
            }}>
           {appName}
                
            </h2>

            <h1>{titleText}</h1>
            <Link to={link}>{linkText}</Link>


        </header>
    )
}




export default Header;