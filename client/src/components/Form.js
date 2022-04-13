import React from "react";

const Form = (props)=>{

    const {submitHandler, onChangeHandler, city, errors, buttonText } = props;

    return(
        <div>
            <form onSubmit={submitHandler}>

                <div>
                    <label>Name</label>
                    <input name="name" value={city.name} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.name ?
                            <span>{errors.name.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label>Country</label>
                    <input name="country" value={city.country} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.country ?
                            <span>{errors.country.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label>Fun Fact</label>
                    <input name="funFact" value={city.funFact} onChange={(e) => onChangeHandler(e)} type="text" />
                    <br />
                    {
                        errors.funFact ?
                            <span>{errors.funFact.message}</span>
                            : null
                    }
                </div>

                {/* <div>
                    <label>Weather</label>
                    <select value={city.weather} name="weather" onChange={onChangeHandler} >
                        <option defaultValue hidden>Select a Weather condition </option>
                        <option value="Windy">Windy</option>
                        <option value="Snowy">Snowy</option>
                        <option value="Rainy">Rainy</option>
                        <option value="Jungle">Jungle</option>
                        <option value="Sunny">Sunny</option>
                    </select>
                    <br />
                    {
                        errors.weather ?
                            <span>{errors.weather.message}</span>
                            : null
                    }
                </div> */}

                <div>
                    <label>City Image</label>
                    <input name="cityImage" value={city.cityImage} onChange={onChangeHandler} type="text" />
                    <br />
                    {
                        errors.cityImage ?
                            <span>{errors.cityImage.message}</span>
                            : null
                    }
                </div>

                <div>
                    <label>Pet Friendly?</label>
                    <input checked={city.petFriendly} name="petFriendly" onChange={onChangeHandler} type="checkbox" />
                    <br />
                    {
                        errors.petFriendly ?
                            <span>{errors.petFriendly.message}</span>
                            : null
                    }
                </div>
                {/* <div>
                    <label>Year Built</label>
                    <input name="yearBuilt" value={city.yearBuilt} onChange={onChangeHandler} type="number" />
                    <br />
                    {
                        errors.yearBuilt ?
                            <span>{errors.yearBuilt.message}</span>
                            : null
                    }
                </div> */}

                <button>{buttonText}</button>

            </form>

        </div>
    )
}


export default Form;