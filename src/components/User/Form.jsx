import Form from 'react-bootstrap/Form';
import "../../CSS/connect.css";
import { useState } from 'react';
import baseURL from "../../Api Services/baseURL";
import { toast } from "react-toastify";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Details() {
      const[newDatas,setNewDatas]=useState({
          fullName:"",
          phone:"",
          email:"",
          location:"",
          info_from:"",
          message:""
      })
// console.log(newDatas);


      const handlePhoneChange = (value, country) => {
        if (!value) {
            setNewDatas({...newDatas,phone:""});
          return;
        }
        const formattedPhone = `+${country.dialCode} ${value.slice(country.dialCode.length)}`;
        setNewDatas({...newDatas,phone:formattedPhone});
        // console.log(formattedPhone); 
      };
    
        const addNewForm=async (e)=>{
            e.preventDefault()
            try {
                const formData = new FormData();
                formData.append("fullName", newDatas.fullName);
                formData.append("phone", newDatas.phone);
                formData.append("email", newDatas.email);
                formData.append("location", newDatas.location);
                formData.append("info_from", newDatas.info_from);
                formData.append("message", newDatas.message);
    
                const response = await baseURL.post("/contactForm/formSubmit", formData,{
                    headers: {
                        "Content-Type": "application/json"
                    },
                });            
    
                if (response.status === 201) {
                    toast.success(" Datas submitted successfully!");
                    setNewDatas({
                        fullName:"",
                        phone:"91",
                        email:"",
                        location:"",
                        info_from:"",
                        message:""
                    })
                }
            } catch (error) {
                console.error("Error adding news:", error);
            
                if (error.name === 'ValidationError') {
                    const errorMessages = Object.values(error.errors).map(err => err.message);
                    toast.error(`Validation Error: ${errorMessages.join(', ')}`);
                } else if (error.response) {
                    if (error.response.data) {
                        const errorMessage = error.response.data.error || "An error occurred";
                        toast.error(`${errorMessage}`);
                        console.log(error);
                    } else {
                        toast.error("Server responded with an error.");
                    }
                } else if (error.request) {
                    toast.error("No response received from the server.");
                } else {
                    toast.error(`Error: ${error.message}`);
                }
            }
        } 
  return (
    <div className=" w-full mx-auto px-10 py-8 md:px-4">
      <Form onSubmit={addNewForm} className="flex flex-col  max-w-[712px] mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl mx-auto text-sm sm:text-lg md:text-lg xl:text-lg xl-leading-7 2xl:leading-10 2xl:text-2xl">
        <div className="mb-3  flex justify-center  items-center">
          <Form.Control

           
          style={{
                 outline: 'rgb(187, 190, 192)',
                 border: '0.89px solid  #0A0A0ACC',
                 height:'53.4px',
                 width: '100%',
                 maxWidth: '712px',
                 color:'rgba(0, 0, 0, 0.74)',
                        
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = 'black';
                        e.target.style.boxShadow = '0 0 1px black';
                      
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#0A0A0ACC'; // Default border color on blur
                        e.target.style.boxShadow = 'none';
                        
                      }}


            type="text"
            id="fullname"
            placeholder="Full Name"
            className="bg-white mobdiv  place text-black placeholder-black p-3 "
            value={newDatas.fullName} 
            onChange={(e) =>
              setNewDatas({ ...newDatas, fullName: e.target.value })}
          />
        </div>

        <div className="mb-3 flex justify-center connectPhoneInput items-center ">
        <PhoneInput 
        value={newDatas.phone}
        country={"in"}
       
       containerClass="phone-input-container"
        enableSearch={true}
        onChange={(value, country) => handlePhoneChange(value, country)}
      />
        </div>
        {/* <div className="mb-3 flex justify-center items-center">
          <Form.Control

           style={{
            outline: 'rgb(187, 190, 192)',
            height:'53.4px',
             border: '0.89px solid  #0A0A0ACC',
                width: '100%',
                maxWidth: '712px',
                color:'rgba(0, 0, 0, 0.74)',
            
            
          }}
          onFocus={e => {
            e.target.style.borderColor = 'black';
            e.target.style.boxShadow = '0 0 1px black';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#0A0A0ACC'; // Default border color on blur
            e.target.style.boxShadow = 'none';
          }}

          value={newDatas.phone} 
          onChange={(e) =>
            setNewDatas({ ...newDatas, phone: e.target.value })}
            type="text"
            id="contactnumber"
            placeholder="Contact Number"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="bg-white   text-black placeholder-black p-3 place"
          />
        </div> */}

        <div className="mb-3 flex justify-center items-center">
          <Form.Control

           style={{
            outline: 'rgb(187, 190, 192)',
            height:'53.4px',
            border: '0.89px solid  #0A0A0ACC',
                width: '100%',
                maxWidth: '712px',
                color:'rgba(0, 0, 0, 0.74)',
            
          }}
          onFocus={e => {
            e.target.style.borderColor = 'black';
            e.target.style.boxShadow = '0 0 1px black';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#0A0A0ACC'; // Default border color on blur
            e.target.style.boxShadow = 'none';
          }}


            type="text"
            id="email"
            placeholder="Email-ID"
            className="bg-white   text-black placeholder-black p-3 mobdiv place"
            value={newDatas.email} 
            onChange={(e) =>
              setNewDatas({ ...newDatas, email: e.target.value })}
          />
        </div>

        <div className="mb-3 flex justify-center items-center">
          <Form.Control

           style={{
            outline: 'rgb(187, 190, 192)',
            height:'53.4px',
            border: '0.89px solid  #0A0A0ACC',
            width: '100%',
            maxWidth: '712px',
            color:'rgba(0, 0, 0, 0.74)',
            
          }}
          onFocus={e => {
            e.target.style.borderColor = 'black';
            e.target.style.boxShadow = '0 0 1px black';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#0A0A0ACC'; // Default border color on blur
                e.target.style.boxShadow = 'none';
          }}

            
            type="text"
            id="location"
            placeholder="Where Are You Located?"
            className="bg-white text-black placeholder-black p-3 place mobdiv"
            value={newDatas.location} 
            onChange={(e) =>
              setNewDatas({ ...newDatas, location: e.target.value })}
          />
        </div>

        <div className="mb-3 flex justify-center items-center">
          <Form.Select
            id="howDidYouHear"
            value={newDatas.info_from} 
            onChange={(e) =>
              setNewDatas({ ...newDatas, info_from: e.target.value })}
            className="bg-white   placeholder-black p-3 place mobdiv"
            
            style={{
              
              borderRadius: "0.35rem",
              outline: 'rgb(187, 190, 192)',
              height:'53.4px',
                border: '0.89px solid  #0A0A0ACC',
                width: '100%',
                maxWidth: '712px',
                color: 'rgba(0, 0, 0, 0.985)',
    
            }}
            // style={{
            //   border: '0.2px solid rgba(10, 10, 10, 0.82)',
            //   borderRadius: '0.35rem',
            //   color: 'rgba(170, 167, 167, 0.82)',
            //   width: '100%',
            //   maxWidth: '712px',
            // }}
            onFocus={e => {
              e.target.style.borderColor = 'black';
              e.target.style.boxShadow = '0 0 1px black';

            }}
            onBlur={e => {
              e.target.style.borderColor = '#0A0A0ACC'; // Default border color on blur
              e.target.style.boxShadow = 'none';
            }}
            
          >
            <option value="" disabled  hidden >
            How Did You Hear About Us?
            </option>
            <option value="Social Media" >Social Media</option>
            <option value="Search Engine">Search Engine</option>
            <option value="Friend or Family">Friend or Family</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Others">Other</option>
          </Form.Select>
        </div>
        
        <div className="mb-3 flex justify-center items-center ">
          <Form.Control

           style={{
            outline: 'rgb(187, 190, 192)',
            border: '0.89px solid  #0A0A0ACC',
               
                width: '100%',
                maxWidth: '712px',
                color:'rgba(0, 0, 0, 0.74)',
            height: '150px'
          }}
          onFocus={e => {
            e.target.style.borderColor = 'black';
            e.target.style.boxShadow = '0 0 1px black';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#0A0A0ACC'; // Default border color on blur
                e.target.style.boxShadow = 'none';

            }}
            as="textarea"
            id="message"
            placeholder="Message"
            value={newDatas.message} 
            onChange={(e) =>
              setNewDatas({ ...newDatas, message: e.target.value })}


            
            className="bg-white   text-black placeholder-black p-3 place "

        


          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className=" mt-3 text-white transform hover:scale-105 hover:bg-blue-700 bg-gradient-to-r from-[#FF9D00] via-[#FFC100] to-[#FF9D00] px-8 py-2 rounded-md md:font-semibold md:text-black"
          >
            Submit
          </button>
        </div>

        <div className="pt-3 mb-5">
          <h6 className="team text-center text-sm  md:text-xl xl:text-lg xl-leading-7 2xl:leading-10 2xl:text-xl">
          Or email{" "}
            <a
              href="mailto:operations@trackpi.in"
              className="connect-text-Color"
              style={{ textDecoration: "none" }}
            >
              operations@trackpi.in
            </a>{" "}
            to get in touch with our team.
          </h6>
        </div>
      </Form>
    </div>
  );
}

export default Details;