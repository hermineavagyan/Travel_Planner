import React, {useState} from "react"
import {Country} from 'country-state-city'

const Form = (props)=>{

    const {submitHandler, onChangeHandler, city, errors, buttonText } = props;
    const [selectedCountry, setSelectedCountry] = useState("");

    const countriesArray = Country.getAllCountries();
    let countries = [];
    for (let i = 0; i < countriesArray.length; i++){
        countries.push(countriesArray[i]);
    }
    console.log(countries);

    const handleCountrySelect = (e)=> {
        console.log("Selected country", e.target.value);
        // const countrySelection = e.target.value;
        city.country = e.target.value
        if (city.country !== ""){
            console.log("Bug here")
            setSelectedCountry(city.country)
        }
       

        //setSelectedCountry(countrySelection);
    }

    return(
        
        <div>
        <div  className = "formStyle">
            <form  class = "form-control" onSubmit={submitHandler}>

                <div>
                    <label for="exampleFormControlInput1">Name</label>
                    <input class="form-control" name="name" value={city.name} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.name ?
                            <span>{errors.name.message}</span>
                            : null
                    }
                </div>

                <select

            name="country"
            onChange={e => handleCountrySelect(e)}
            value={selectedCountry}
            >
            <option value="">Select the country</option>
            {countries.map((country, key) => (
                <option key={key} value={country.name}>
                {country.name}
                </option>
            ))}
        </select>
                <div>
                    {/* <label for="exampleFormControlInput1">Country</label>
                    <input class="form-control" name="country" value={city.country} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br /> */}
                    {
                        errors.country ?
                            <span>{errors.country.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label for="exampleFormControlInput1">Fun Fact</label>
                    <input class="form-control" name="funFact" value={city.funFact} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.funFact ?
                            <span>{errors.funFact.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label for="exampleFormControlInput1">Info</label>
                    <input class="form-control" name="cityInfo" value={city.cityInfo} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.cityInfo ?
                            <span>{errors.cityInfo.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label for="exampleFormControlInput1">Price</label>
                    <input class="form-control" name="price" value={city.price} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.price ?
                            <span>{errors.price.message}</span>
                            : null
                    }
                </div>


                <div>
                    <label for="exampleFormControlInput1">City Image</label>
                    <input class="form-control" name="cityImage" value={city.cityImage} onChange={onChangeHandler} type="text" />
                    <br />
                    {
                        errors.cityImage ?
                            <span>{errors.cityImage.message}</span>
                            : null
                    }
                </div>

               

                <button>{buttonText}</button>
               
            </form>
            
            </div>    
        </div>
    )
}


export default Form;