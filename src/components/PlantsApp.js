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
        added: ''
    }
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [{plantName, growthCondition, maxHeight, imageUrl, infoUrl}, setPlant] = useState(initialState)
    const [plants, setPlants] = useState([]);
    const [editId, setEditId] = useState('');
    const plantNameRef = useRef();
    const growthConditionRef = useRef();
    const maxHeightRef = useRef();
    const imageUrlRef = useRef();
    const infoUrlRef = useRef();
    const plantNameUpdateRef = useRef();
    const growthConditionUpdateRef = useRef();
    const maxHeightUpdateRef = useRef();
    const imageUrlUpdateRef = useRef();
    const infoUrlUpdateRef = useRef();

    
    const collectionRef = collection(db, 'plants');

    const clearForm = () => {
        setPlant({...initialState});
    }

    // Add Entry to Firestore

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            
            const payload = {         
                plantName: plantNameRef.current.value,
                growthCondition: growthConditionRef.current.value,
                maxHeight: maxHeightRef.current.value,
                imageUrl: imageUrlRef.current.value,
                infoUrl: infoUrlRef.current.value
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
                setPlant(() => docSnap.data());
                console.log("Growth Condition:", docSnap.data().growthCondition);
            } else {
                console.log("No such document");
            }
        } catch(error){
            alert(error);
        }
        return id;
    }

    // Retrieve entries from Firestore

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(db, 'plants'), (snapshot) => {           // onSnapshot is a realtime listener, data will update itself each time there's a change in the database. Setting it to a constant so that we can unhook it later
            setPlants(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
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
                infoUrl: infoUrlUpdateRef.current.value
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

    return (
        <div className='main'>
            <header className="App-header">
                <figure className="head-image">
                    <img src="images/head-image.jpg" alt="Top Banner" />
                </figure>
                <div className="entry">
                    <form autoComplete="off" onSubmit={submitHandler}>
                        <div className="one-input-row">
                            <label htmlFor="plantName">Plant Name* </label>
                            <input type="text" name="plantName" id="plantName" ref={plantNameRef} required />
                        </div>
                        <div className="two-input-row">
                            <div className="input-one">
                                <label htmlFor="growthCondition">Growth Condition</label>
                                <input type="text" name="growthCondition" ref={growthConditionRef} id="growthCondition" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="maxHeight">Maximum Height</label>
                                <input type="text" name="maxHeight" ref={maxHeightRef} id="maxHeight" />
                            </div>
                        </div>
                        <div className="two-input-row">
                            <div className="input-one">
                                <label htmlFor="imageUrl">Image URL</label>
                                <input type="text" name="imageUrl" ref={imageUrlRef} id="imageUrl" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="infoUrl">Info URL</label>
                                <input type="text" name="infoUrl" ref={infoUrlRef} id="infoUrl" />
                            </div>
                        </div>
                        <div className="cta">
                            <button type="submit" >Enter</button>
                        </div>
                    </form>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <button className="closeModal" onClick={() => setModalIsOpen(false)}>x</button>
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
                        <div className="two-input-row">
                            <div className="input-one">
                                <label htmlFor="imageUrl">Image URL</label>
                                <input type="text" name="imageUrl" defaultValue={imageUrl || ''} ref={imageUrlUpdateRef} id="imageUrl" />
                            </div>
                            <div className="input-two">
                                <label htmlFor="infoUrl">Info URL</label>
                                <input type="text" name="infoUrl" defaultValue={infoUrl || ''} ref={infoUrlUpdateRef} id="infoUrl" />
                            </div>
                        </div>
                        <div className="cta">
                            <button type="submit" >Update</button>
                        </div>
                    </form>
                    
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
                                <td>
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