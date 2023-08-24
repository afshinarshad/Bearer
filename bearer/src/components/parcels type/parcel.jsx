import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { appFirebase } from "../../firebase/firebase";
import {
  getFirestore,
  CollectionReference,
  collection,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "./parcel.css";

const Parcel = (props) => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { parcelData, setParcelData } = useContext(AppContext);

  useEffect(() => {
    setParcelData(parcels);
    // Read the "bearerParcels" collection from Firestore
    const fetchParcels = async () => {
      try {
        const storage = getStorage(appFirebase);
        const db = getFirestore(appFirebase);
        const parcelCollection = collection(db, "bearerParcels");
        const parcelCollectionRef = ref(parcelCollection);
        const parcelDocument = await getDocs(parcelCollectionRef);
        const parcels = await Promise.all(
          parcelDocument.docs.map(async (doc) => {
            const data = doc.data();
            const imageUrl = data.parcel_img_url;
            const imageUrlRef = ref(storage, imageUrl);
            const url = await getDownloadURL(imageUrlRef);
            return { ...data, imageUrl: url };
          })
        );

        setParcels(parcels);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching parcels:", error);
      }
    };
    fetchParcels();
  }, [setParcelData]);

  const handleParcelClick = (parcel) => {
    setParcelData(parcel);
    setSelectedParcel(parcel);
  };

  // Call the onConfirm prop and move to next tab for transport options
  const handleConfirmParcelClick = () => {
    props.onConfirm();
  };

  return (
    <main className="parcel-container">
      {loading ? (
        // Display skeleton loading animation while loading is true
        Array.from({ length: 4 }, (_, index) => (
          <article
            className={`parcel-item ${selectedParcel === parcels[index] ? "selected" : ""}`}
            key={index}
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={400}
              height={100}
            />
          </article>
        ))
      ) : (
        // Render the parcel items when loading is false
        parcels.map((parcel, index) => (
          <article
            className={`parcel-item ${selectedParcel === parcel ? "selected" : ""}`}
            key={index}
            onClick={() => handleParcelClick(parcel)}
          >
            <section className="image">
              <img src={parcel.imageUrl} alt={parcel.parcel_type} />
            </section>

            <p className="type">{parcel.parcel_type}</p>

            <footer className="description">
              <p>
                {parcel.parcel_min_weight} - {parcel.parcel_max_weight} kg
              </p>
              <p>{parcel.parcel_description}</p>
            </footer>
          </article>
        ))
      )}
      <button onClick={handleConfirmParcelClick}>confirm</button>
    </main>
  );
};

export default Parcel;