import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import svg from '../assets/image.svg'
import './Form.css'
import { storage } from "../firebase";
import tick from '../assets/check.png'
import toast, { Toaster } from 'react-hot-toast';
export const Form = () => {
    const [dragareatext, setDragareatext] = useState("Drag & Drop your image here")
    const [url, setUrl] = useState(null)
    const [progress, setProgress] = useState(null)
    const [done, setDone] = useState(null)
    function dragEnterhandle(e) {
        e.preventDefault();
        setDragareatext("Release your image")
        document.getElementById('border').style.border = "1px solid #97BEF4"
    }
    function handleDragleave(e) {
        e.preventDefault();
        setDragareatext("Drag & Drop your image here")
        document.getElementById('border').style.border = "1px dashed #97BEF4"
    }
    function handleDrop(e) {
        e.preventDefault();
        document.getElementById('border').style.border = "1px dashed #97BEF4"
        const data = e.dataTransfer.files[0]
        if (data.type === "image/png" || data.type === "image/jpg" || data.type === "image/jpeg" ||  data.type === "image/gif") {
            upload(data)
        }
        else {
            toast.error('Not a avalid extension', {
                duration: 2000,
                position: 'top-center',
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '11px'
                },
            });
        }
    }
    function upload(file) {
        if (!file) return;
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                setProgress(true)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

            },
            (e) => {
                toast.error('Error Uploading ..', {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '11px'
                    },
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    setUrl(downloadURL);
                });
                setDone(true)
            }
        );
    }
    function copy() {
        navigator.clipboard.writeText(url);
        toast.success('copied to clipboard', {
            duration: 2000,
            position: 'top-center',
            style: {
                fontFamily: 'Poppins',
                fontSize: '11px'
            },
        });
    }
    function filecustom(e) {
        const data = e.target.files[0]
        if (data.type === "image/png" || data.type === "image/jpg" || data.type === "image/jpeg" ||  data.type === "image/gif") {
            upload(data)
        }
        else {
            toast.error('Not a avalid extension', {
                duration: 2000,
                position: 'top-center',
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '11px'
                },
            });
        }
    }
    return (
        progress ? (
            done ? (<>

                <div className="form">
                    <Toaster />
                    <div className="imageuploader">
                        <img style={{ width: '35px', height: '35px', marginTop: '39px' }} src={tick} alt="" />
                        <p className="header" style={{ fontSize: '18px', width: '198px', marginTop: '9px', marginBottom: '16px' }}>Uploaded Successfully!</p>
                        <img style={{ width: '338px', height: '224.4px', borderRadius: '12px' }} src={url} alt="" />
                        <div className="urlshow" style={{ width: '322px', height: '34px', backgroundColor: '#F6F8FB', border: '1px solid #E0E0E0', margin: 'auto', borderRadius: '8px', marginTop: '25px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", padding: '0 2px' }}>
                            <div className="urtoimg"><p>{url?.slice(0, 36)}...</p></div>
                            <div className="btntocopy"><button onClick={copy}>Copy Link</button></div>
                        </div>
                    </div>
                </div>
            </>) : (<div className="form2">
                <div className="boxbar">
                    <p className="header">Uploading ...</p>
                    <div className="barprogree" style={{ width: '75%', margin: 'auto', marginTop: '29px', borderRadius: '13px', overflow: 'hidden' }}>
                        <LinearProgress />
                    </div>
                </div>
            </div>)

        ) : (
            <div className='form' >
                <Toaster />
                <div className="imageuploader" >
                    <p className="header">Upload your image</p>
                    <p className="types" style={{width:'fit-content'}}>File should be Jpeg, Png, Gif...</p>
                    <div className="drag-area" onDragLeave={handleDragleave} onDragOver={dragEnterhandle} onDrop={handleDrop} id="border">
                        <img src={svg} alt="" />
                        <p className="drag-area-p">{dragareatext}</p>
                    </div>
                    <p className="or">or</p>
                    <input type="file" id="fileinput" onChange={filecustom} hidden />
                    <label htmlFor="fileinput">Choose File</label>
                </div>
            </div>)
    )
};
