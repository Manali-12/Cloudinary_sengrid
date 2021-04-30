import React,{useState} from 'react';
import "../src/feedback.css"

function Feedback() {
 
    const [values, setValues]=useState(
        {
            name:"",
            email:"",
            message:"",
            phone:"",
            uploadFiles:[],
            buttonText:"Submit",
            uploadPhotosButtonText:"Upload Files"
        }
    );
    const handleChange = (name) => event =>
    {
           setValues({...values,[name]:event.target.value});
    };

    const handleSubmit = (event) => 
    {
        event.preventDefault();
        setValues({...values,buttonText:"...sending"})
        console.table({name,email,message,phone,uploadFiles});
    };

    
   
    const {name,email,message,phone,uploadFiles,buttonText,uploadPhotosButtonText } = values;

    const{ REACT_APP_API, REACT_APP_CLOUDINARY_CLOUD_NAME , REACT_APP_CLOUDINARY_UPLOAD_SECRET}= process.env ;

    const uploadWidget = ()=> {
        window.cloudinary.openUploadWidget({ cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME, upload_preset:REACT_APP_CLOUDINARY_UPLOAD_SECRET , tags:["ebooks "]},
            function( error , result) {
                // console.log(result);
                setValues
                ({...values,
                     uploadFiles:result ,
                     uploadPhotosButtonText:`${result ? result.length:0} Photos Uploaded`});
            });
    }


    const feedbackForm = () =>(
        <React.Fragment>

            <div className="form-group pt-5">
                <button onClick={()=>uploadWidget()} className="btn  btn-block p-5 uploadButton"> {uploadPhotosButtonText} </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea 
                        type="text" 
                        className="form-control" 
                        onChange={handleChange("message")} 
                        value={message}
                        required>                           
                        </textarea>
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Name</label>
                    <input 
                        className="form-control"
                        type="text" 
                        onChange={handleChange("name")} 
                        value={name} 
                        required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Email</label>
                    <input 
                        type="email" 
                        className="form-control"
                        onChange={handleChange("email")} 
                        value={email} 
                        required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Your Phone</label>
                    <input 
                        type="number" 
                        className="form-control"
                        onChange={handleChange("phone")} 
                        value={phone} 
                        required />
                </div>
                <button className="btn btn-block submitButton">{buttonText}</button>
            </form>
        </React.Fragment>
    )

        

    return (
        <div className="p-5">
            {feedbackForm()}
        </div>
    )
}

export default Feedback
