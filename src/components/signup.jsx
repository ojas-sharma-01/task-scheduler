import React, {useState} from "react";
import Nv from "./topnav";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import load from "./load.gif";
import Ham from "./ham";


const Sgnup = () => {
    const [fdata, setfdata] = useState({username : "", email : "", passwd : ""});
    const navv = useNavigate();
    const handlefdata = (e) => {
        const {name, value} = e.target;
        setfdata({...fdata, [name] : value});
    };
    const [restxt, setrstext] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        setrstext(<img src={load} className="h-[80px]" />);
        fetch("https://task-scheduler-kt4g.onrender.com/register", {
            method : "POST",
            body : JSON.stringify(fdata),
            headers : {
                "Content-Type" : "application/json",
            },
        })
        .then(r => r.json())
        .then(d => {
            // console.log(d);
            setrstext(d.msg);
            if (d.msg === "registered"){
                setTimeout(() => {
                    navv("/home", { state: { userid: fdata.username, uuid: d.uuid } });
                }, 1000);
            }
        })
        .catch(e => {
            console.log(e);
            setrstext("Some Error Occured");
        });
    };

    return (
        <div>
             {window.innerWidth < 450 ? <Ham /> : <Nv />}
            <form className="sgnup"onSubmit={handlesubmit} style={{display: "flex", flexDirection: "column",margin: "5% auto",padding: "20px",boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",}}>
                <label for="username" style={{marginBottom: "8px" }}> Username </label>
                <input name = "username" onChange = {handlefdata} className="border-2 border-black"
                value = {fdata.username} style={{padding: "10px", marginBottom: "16px", borderRadius: "5px"}}placeholder="Enter your username" required="true" />
                <label for="email" style={{marginBottom: "8px" }}> Email </label>
                <input name = "email" className="border-2 border-black"
                style={{padding: "10px", marginBottom: "16px", borderRadius: "5px"}}placeholder="Enter your email id" required="true" onChange={handlefdata} value={fdata.email}/>
                <label for="passwd" style={{marginBottom: "8px" }}> Password </label>
                <input name="passwd" className="border-2 border-black"
                placeholder="Enter your password" required="true" onChange={handlefdata} value={fdata.passwd}
                style={{ padding: "10px", marginBottom: "16px", borderRadius: "5px" }}/>
                <button type="submit" style = {{width: "fit-content", margin: "auto", marginTop:"10px",marginBottom:"10px", padding: "10px 20px", backgroundColor: "orange",color: "white", border: "none",borderRadius: "5px",
            cursor: "pointer",}}> Signup </button>
                <p style={{ marginTop:"10px",marginBottom:"10px"}}>Dont have an account ? <a href = "/">Signup</a></p> 
                <button style={{width : "fit-content", backgroundColor : "orange" ,  marginTop:"10px",marginBottom:"10px",
                borderRadius : "5px", padding: "10px 20px", color : "white", border : "none", margin: "0 auto 16px auto"}}> 
                <Link to = "/login" style={{color : "white"}}> Back to login </Link></button>
                {restxt && <p style={{margin: "auto", backgroundColor :"blue", borderRadius : "10px", padding : "8px 16px", color :"white"}}>{restxt}</p>}
            </form>
        </div>
    );
};

export default Sgnup;