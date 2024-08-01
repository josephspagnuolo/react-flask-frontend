import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/button";
import PrimaryTextInput from "../components/textinput";
import '../App.css';
import PrimaryInputLabel from "../components/inputlabel";
import ProfilePictureInput from "../components/profilepictureinput";
import CountryInput from "../components/countries";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const imgPrefix = "https://uzczobapchtqdpahuled.supabase.co/storage/v1/object/public/fullstackdevassignment/profile/";

const Edit = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://react-flask-backend.vercel.app/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const latestEntry = data.result[0];
        if (latestEntry) {
          setFileName(latestEntry.file_name || "")
          setFirstName(latestEntry.first_name || "");
          setLastName(latestEntry.last_name || "");
          setPhoneNumber(latestEntry.phone_number || "");
          setJobTitle(latestEntry.job_title || "");
          setCountry(latestEntry.country || "");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const validatePhoneNumber = (number) => {
    const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phonePattern.test(number);
  };

  async function saveEdits() {
    if (!validatePhoneNumber(phoneNumber) && phoneNumber !== "") {
      alert("Phone number must be in the format (123) 456-7891");
      return;
    }
    setLoading(true);
    var newFileName = "avatar" + Date.now() + ".png";

    if (file) {
      await supabase.storage
        .from('fullstackdevassignment')
        .remove([`profile/${fileName}`]);

      await supabase.storage
        .from('fullstackdevassignment')
        .upload(`profile/${newFileName}`, file, {
          upsert: true
        });
    }
    try {
      const response = await fetch("https://react-flask-backend.vercel.app/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file ? newFileName : fileName,
          firstName,
          lastName,
          phoneNumber,
          jobTitle,
          country,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
    alert("Successfully saved your contact information.");
    navigate("/");
  }

  if (loading) {
    return (
      <main className="main">
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="header">
        <h2>Edit your Contact Information</h2>
        <PrimaryButton text="Save" func={saveEdits} />
      </div>
      <div className="profile">
        <ProfilePictureInput setter={setFile} prefix={imgPrefix} fileName={fileName} />
      </div>
      <div className="container">
        <div className="namefields">
          <div>
            <PrimaryInputLabel label="First Name" htmlFor="firstName" />
            <PrimaryTextInput id="firstName" placeholder="First Name" value={firstName} setter={setFirstName} />
          </div>
          <div>
            <PrimaryInputLabel label="Last Name" htmlFor="lastName" />
            <PrimaryTextInput id="lastName" placeholder="Last Name" value={lastName} setter={setLastName} />
          </div>
        </div>
        <div className="fields">
          <PrimaryInputLabel label="Phone Number" htmlFor="phoneNumber" />
          <PrimaryTextInput id="phoneNumber" placeholder="(123) 456-7891" value={phoneNumber} setter={setPhoneNumber} />
        </div>
        <div className="fields">
          <PrimaryInputLabel label="Job Title" htmlFor="jobTitle" />
          <PrimaryTextInput id="jobTitle" placeholder="Chief Financial Officer" value={jobTitle} setter={setJobTitle} />
        </div>
        <div className="fields">
          <PrimaryInputLabel label="Country" />
          <CountryInput value={country} setter={setCountry} />
        </div>
      </div>
    </main>
  );
};

export default Edit;
