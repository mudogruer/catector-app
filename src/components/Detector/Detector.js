import React, { useState } from 'react'
import axios from 'axios';

import roboflowConfig from '../../config/roboflow';
import chatgptConfig from '../../config/chatgpt';

import styles from '../../styles';

export default function Detector(props) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [information, setInformation] = useState(null);

    const onImageChange = async (event) => {
        // Checks there is any selected image
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            // Converts format to base64
            const data = await convertBase64(img);
            // Set image state to preview
            setImage(data);
            // Start detecting via api call
            detect(data);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    };

    const detect = async (img) => {
        // Show loading message until response received
        setLoading(true);
        
        // Call roboflow api with image data
        axios({
            method: "POST",
            url: "https://detect.roboflow.com/cat-breeds-detection/1",
            params: {
                api_key: roboflowConfig.key.trim()
            },
            data: img,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(function (response) {
                // Hide loading message
                setLoading(false);

                // Check the response
                if (response.data && response.data.predictions && response.data.predictions.length > 0) {
                    // Set prediction data to show cat class
                    setPrediction(response.data.predictions[0].class);

                    // Start analysing the cat class
                    analyse(response.data.predictions[0].class);
                }
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const analyse = async (className) => {
        // Show loading message until ChatGPT response received
        setLoading(true);
        
        // Prepare question to ask
        let data = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": `Give an advice about the cat ${className}.`
                }
            ]
        });

        // Call the ChatGPT api with the question for the cat class
        axios({
            method: "POST",
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + chatgptConfig.token.trim()
            },
            data: data
        })
            .then((response) => {
                // Hide loading message
                setLoading(false);

                // Check ChatGPT response and set the information state to show details from AI
                if (response.data && response.data.choices && response.data.choices.length > 0) {
                    setInformation(response.data.choices[0].message.content);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div style={{ display: 'table', width: '100%' }}>
            <div style={styles.content}>
                <div>
                    <div style={{ display: 'table', width: '100%' }}>
                        <div style={{ float: 'left', width: 500, minHeight: 200, backgroundColor: '#444', margin: 20 }}>
                            {image && <img src={image} alt="cat-preview" width={500} />}
                        </div>
                        <div style={{ float: 'left' }}>
                            <h4>Select Image</h4>
                            <input type="file" name="myImage" onChange={onImageChange} />
                        </div>
                        <div>

                        {
                            loading && <div style={{ display: 'table', paddingTop: 50}}>Detecting & Analysing...</div>
                        }
                        </div>
                    </div>
                    <div>
                        {
                            prediction && <div style={{ display: 'table', width: '100%' }}>
                                <h4 style={{ marginBottom: 10 }}>{prediction}</h4>
                                <div dangerouslySetInnerHTML={{ __html: information ? information.replace(/\n/g, "<br />") : '' }}></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
