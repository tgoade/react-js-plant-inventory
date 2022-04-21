import Modal from 'react-modal';
import db from '../firebase';
import { useEffect, useState, useRef } from 'react';
import { collection, addDoc, setDoc, doc, getDoc, deleteDoc, onSnapshot } from 'firebase/firestore';



Modal.setAppElement('#root');       // To remove the Accessibility console errors

const PlantsApp = () => {
    
    const initialState = {
        plantName: '',
        growthCondition: '',
        maxHeight: '',
        imageUrl: '',
        infoUrl: '',
        videoUrl: '',
        tips: '',
        added: ''
    }
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [{plantName, growthCondition, maxHeight, imageUrl, infoUrl, videoUrl, tips}, setSelectedPlant] = useState(initialState)
    const [enteredName, setEnteredName] = useState('');
    const [enteredCondition, setEnteredCondition] = useState('');
    const [enteredHeight, setEnteredHeight] = useState('');
    const [enteredImage, setEnteredImage] = useState('');
    const [enteredInfo, setEnteredInfo] = useState('');
    const [enteredVideo, setEnteredVideo] = useState('');
    const [enteredTips, setEnteredTips] = useState(''); 
    const [plants, setPlants] = useState([]);
    const [editId, setEditId] = useState('');
    //const [videoId, setVideoId] = useState('');
    //const [sortName, setSortName] = useState('asc');
    const plantNameUpdateRef = useRef();
    const growthConditionUpdateRef = useRef();
    const maxHeightUpdateRef = useRef();
    const imageUrlUpdateRef = useRef();
    const infoUrlUpdateRef = useRef();
    const videoUrlUpdateRef = useRef();
    const tipsUpdateRef = useRef();
    
    const collectionRef = collection(db, 'plants');

    // Add Entry to Firestore

    const enteredNameHandler = (event) => {
        setEnteredName(event.target.value);
    }
    const enteredConditionHandler = (event) => {
        setEnteredCondition(event.target.value);
    }
    const enteredHeightHandler = (event) => {
        setEnteredHeight(event.target.value);
    }
    const enteredImageHandler = (event) => {
        setEnteredImage(event.target.value);
    }
    const enteredInfoHandler = (event) => {
        setEnteredInfo(event.target.value);
    }
    const enteredVideoHandler = (event) => {
        setEnteredVideo(event.target.value);
    }
    const enteredTipsHandler = (event) => {
        setEnteredTips(event.target.value);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            
            const payload = {         
                plantName: enteredName,
                growthCondition: enteredCondition,
                maxHeight: enteredHeight,
                imageUrl: enteredImage,
                infoUrl: enteredInfo,
                videoUrl: enteredVideo,
                tips: enteredTips
            }
            const docRef = await addDoc(collectionRef, payload);             // Adding the const let us get the auto generated id in Firestore by retrieving 'docRef.id' 
            console.log(`The new plant id is ${docRef.id}`);
            
        } catch(error){
            alert(error);
        }
        clearForm();
    }      

    // Trigger Modal

    const modalHandler = async (id) => {
        setEditId(id);
        setModalIsOpen(true);
        clearForm();
        try {
        const docRef = doc(db, 'plants', id);
        const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.log("Document data:", docSnap.data());
                setSelectedPlant(() => docSnap.data());
                console.log("Selected Plant Name:", docSnap.data().plantName);
                //setSelectedName(docSnap.data().plantName);
            } else {
                console.log("No such document");
            }
        } catch(error){
            alert(error);
        }
        return id;
    }

    // Trigger Video Modal

    const videoModalHandler = async (id) => {
        setVideoModal(true);
        //setVideoId(id);
        try {
        const docRef = doc(db, 'plants', id);
        const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setSelectedPlant(() => docSnap.data());
                
            } else {
                console.log("No such document");
            }
        } catch(error){
            alert(error);
        }
    }

    // Retrieve entries from Firestore

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(db, 'plants'), (snapshot) => {           // onSnapshot is a realtime listener, data will update itself each time there's a change in the database. Setting it to a constant so that we can unhook it later
            
            const plantsRandom = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            plantsRandom.forEach(plant => {
                console.log(plant.plantName);
            });
            const plantsCompare = (a,b) => {
                let plantA = a.plantName.toLowerCase().trim();  // to avoid case sensitivity and remove any whitespace at the start and end of string
                let plantB = b.plantName.toLowerCase().trim();              
                    if (plantA < plantB) { return -1 }; // sorting string ascending
                    if (plantA > plantB) { return 1 };
                    return 0 ;
            }
            const plantsSorted = plantsRandom.sort(plantsCompare);           
            setPlants(plantsSorted);
        });
        return unSubscribe;                                                                 // returning the function to useEffect so that it can terminate the listener.  This can also be written without the 'return', the {} after the arrow, and the constant to imply a return of the following single object.
    }, []) 

    // Edit Entry

    const editHandler = async (e) => {
        e.preventDefault();
        console.log(`Plant ID: ${editId}`);
        try {
            const docRef = doc(db, 'plants', editId);
            const payload = {
                plantName: plantNameUpdateRef.current.value,
                growthCondition: growthConditionUpdateRef.current.value,
                maxHeight: maxHeightUpdateRef.current.value,
                imageUrl: imageUrlUpdateRef.current.value,
                infoUrl: infoUrlUpdateRef.current.value,
                videoUrl: videoUrlUpdateRef.current.value,
                tips: tipsUpdateRef.current.value
            }
            await setDoc(docRef, payload);
        } catch(error){
            alert(error);
        }
        setModalIsOpen(false)
    }

    // Delete Entry

    const deleteHandler = async (deleteId) => {
        const docRef = doc(db, 'plants', deleteId);
        await deleteDoc(docRef);
    }

    // Clear form

    const clearForm = () => {
        setEnteredName('');
        setEnteredCondition('');
        setEnteredHeight('');
        setEnteredImage('');
        setEnteredInfo('');
        setEnteredVideo('');
        setEnteredTips('');
        setSelectedPlant({...initialState});
    }

    return (
        <div className='main'>
            <header className="App-header">
                <figure className="head-image">
                    <img src="images/head-image.jpg" alt="Top Banner" />
                </figure>
                <div className="entry">
                    <h2 className="centered">Add a Plant</h2>
                    <form autoComplete="off" onSubmit={submitHandler} >
                        <div className="one-input-row">
                            <label htmlFor="plantName">Plant Name* </label>
                            <input type="text" name="plantName" id="plantName" value={enteredName} onChange={enteredNameHandler}  required />
                        </div>
                        <div className="two-input-row">
                            <div className="input-one">
                                <label htmlFor="growthCondition">Growth Condition</label>
                                <input type="text" name="growthCondition" value={enteredCondition} onChange={enteredConditionHandler} id="growthCondition" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="maxHeight">Maximum Height</label>
                                <input type="text" name="maxHeight" value={enteredHeight} onChange={enteredHeightHandler} id="maxHeight" />
                            </div>
                        </div>
                        <div className="three-input-row">
                            <div className="input-one">
                                <label htmlFor="imageUrl">Image URL</label>
                                <input type="text" name="imageUrl" value={enteredImage} onChange={enteredImageHandler} id="imageUrl" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="infoUrl">Info URL</label>
                                <input type="text" name="infoUrl" value={enteredInfo} onChange={enteredInfoHandler} id="infoUrl" />
                            </div>
                            <div className="input-three">
                                <label htmlFor="infoUrl">Video URL</label>
                                <input type="text" name="videoUrl" value={enteredVideo} onChange={enteredVideoHandler} id="videoUrl" />
                            </div>
                        </div>
                        <div className="one-input-row">
                            <label htmlFor="plantName">Tips </label>
                            <textarea name="tips" rows="1" value={enteredTips} onChange={enteredTipsHandler} ></textarea>
                        </div>
                        <div className="cta">
                            <button type="submit">Enter</button>
                        </div>
                    </form>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <button className="closeModal" onClick={() => setModalIsOpen(false)}>x</button>
                    <h2 className="centered">Plant Details</h2>
                    <form autoComplete="off" onSubmit={editHandler}>
                        <div className="one-input-row">
                            <label htmlFor="plantName">Plant Name* </label>
                            <input type="text" name="plantName" id="plantName" defaultValue={plantName || ''} ref={plantNameUpdateRef} required />
                        </div>
                        <div className="two-input-row">
                            <div className="input-one">
                                <label htmlFor="growthCondition">Growth Condition</label>
                                <input type="text" name="growthCondition" defaultValue={growthCondition || ''} ref={growthConditionUpdateRef} id="growthCondition" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="maxHeight">Maximum Height</label>
                                <input type="text" name="maxHeight" defaultValue={maxHeight || ''} ref={maxHeightUpdateRef} id="maxHeight" />
                            </div>
                        </div>
                        <div className="three-input-row">
                            <div className="input-one">
                                <label htmlFor="imageUrl">Image URL</label>
                                <input type="text" name="imageUrl" defaultValue={imageUrl || ''} ref={imageUrlUpdateRef} id="imageUrl" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="infoUrl">Info URL</label>
                                <input type="text" name="infoUrl" defaultValue={infoUrl || ''} ref={infoUrlUpdateRef} id="infoUrl" />
                            </div>
                            <div className="input-three">
                                <label htmlFor="infoUrl">Youtube Video ID</label>
                                <input type="text" name="videoUrl" defaultValue={videoUrl || ''} ref={videoUrlUpdateRef} id="videoUrl" />
                            </div>
                        </div>
                        <div className="one-input-row">
                            <label htmlFor="plantName">Tips </label>
                            <textarea name="tips" rows="1" defaultValue={tips || ''} ref={tipsUpdateRef}></textarea>
                        </div>
                        <div className="cta">
                            <button type="submit" >Update</button>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={videoModal} onRequestClose={() => setVideoModal(false)} className="video-modal">
                    <button className="closeModal" onClick={() => setVideoModal(false)}>x</button>
                    <iframe src={`https://www.youtube.com/embed/${videoUrl}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                     
                </Modal>
        </header>

        <div className="inventory">
                <table className="list" id="plantList">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Plant Name</th>
                            <th>Growth Condition</th>
                            <th>Max Height</th>
                            <th>Tips</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {plants && plants.map((plant) => (
                            <tr key={plant.id}>
                                <td><a href={plant.infoUrl} target="_blank" rel="noreferrer" className="plant.infoLink"><figure><img src={plant.imageUrl} alt="" className="plantThumbPic"/></figure></a></td>
                                <td>{plant.plantName}</td>
                                <td>{plant.growthCondition}</td>
                                <td>{plant.maxHeight}</td>
                                <td>{plant.tips}</td>
                                <td>
                                    {plant.videoUrl ? <i className="far fa-play-circle" onClick={() => videoModalHandler(plant.id)}></i> : ""}
                                    <i className="far fa-edit" onClick={() => modalHandler(plant.id)}></i>
                                    <i className="far fa-trash-alt" onClick={() => deleteHandler(plant.id)}></i>
                                </td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
            </div>
        
      </div>
    )
}

export default PlantsApp;