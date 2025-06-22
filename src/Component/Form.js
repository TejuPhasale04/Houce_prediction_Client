import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    area: '',
    bedrooms: '',
    bathrooms: '',
    stories: '',
    mainroad: 'yes',
    guestroom: 'no',
    basement: 'no',
    hotwaterheating: 'no',
    airconditioning: 'no',
    parking: '',
    prefarea: 'no',
    furnishingstatus: 'furnished'
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://housepriceprediction-t77w.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setPredictedPrice(data.predicted_price);
  };

  return (
    <div className="form">
      <h1>🏠 House Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>Area (sq ft): <input type="number" name="area" value={formData.area} onChange={handleChange} /></label><br />
        <label>Bedrooms: <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} /></label><br />
        <label>Bathrooms: <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} /></label><br />
        <label>Stories: <input type="number" name="stories" value={formData.stories} onChange={handleChange} /></label><br />
        <label>Main Road:
          <select name="mainroad" value={formData.mainroad} onChange={handleChange}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label><br />
        <label>Guest Room:
          <select name="guestroom" value={formData.guestroom} onChange={handleChange}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label><br />
        <label>Basement:
          <select name="basement" value={formData.basement} onChange={handleChange}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label><br />
        <label>Hot Water Heating:
          <select name="hotwaterheating" value={formData.hotwaterheating} onChange={handleChange}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label><br />
        <label>Air Conditioning:
          <select name="airconditioning" value={formData.airconditioning} onChange={handleChange}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label><br />
        <label>Parking: <input type="number" name="parking" value={formData.parking} onChange={handleChange} /></label><br />
        <label>Preferred Area:
          <select name="prefarea" value={formData.prefarea} onChange={handleChange}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </label><br />
        <label>Furnishing Status:
          <select name="furnishingstatus" value={formData.furnishingstatus} onChange={handleChange}>
            <option value="furnished">Furnished</option>
            <option value="semi-furnished">Semi-Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </label><br /><br />

        <button type="submit">Predict Price</button>
      </form>

      {predictedPrice && (
        <h2>💰 Estimated Price: ₹ {parseInt(predictedPrice).toLocaleString()}</h2>
      )}
    </div>
  );
}

export default Form;
