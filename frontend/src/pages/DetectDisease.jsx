import { useRef, useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

function DetectDisease() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  // =========================
  // 📂 UPLOAD IMAGE
  // =========================
  const handleUpload = async () => {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://krishi-backend-bx6e.onrender.com/detect-disease",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();
    setResult(data);

    setLoading(false);
  };

  // =========================
  // 📸 CAMERA (FIXED)
  // =========================
  const startCamera = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      const blob = await fetch(photo.webPath).then(r => r.blob());

      setLoading(true);

      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      const response = await fetch(
        "https://krishi-backend-bx6e.onrender.com/detect-disease",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      setResult(data);

      setLoading(false);

    } catch (err) {
      alert("Camera error");
    }
  };

  return (
    <div style={main}>

      <h1 style={title}>🌿 Detect Crop Disease</h1>

      {/* OPTION BUTTONS */}
      <div style={optionBox}>

        {/* 📂 UPLOAD */}
        <div style={card}>
          <h3>📂 Upload Image</h3>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <br /><br />

          <button onClick={handleUpload} style={btn}>
            Detect
          </button>
        </div>

        {/* 📸 CAMERA */}
        <div style={card}>
          <h3>📸 Take Photo</h3>

          <button onClick={startCamera} style={btn}>
            Open Camera
          </button>
        </div>

      </div>

      {/* LOADING */}
      {loading && <div style={loader}></div>}

      {/* RESULT */}
      {result && (
        <div style={resultBox}>
          <h2>Disease: {result.disease}</h2>
          <p><b>Treatment:</b> {result.treatment}</p>
          <p><b>Organic:</b> {result.organic_solution}</p>
        </div>
      )}

    </div>
  );
}

export default DetectDisease;

/* ========================= */
/* ===== STYLES (UNCHANGED) ===== */
/* ========================= */

const main = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#c8f7c5,#7bd389)",
  padding: "40px",
  textAlign: "center"
};

const title = {
  fontSize: "28px",
  marginBottom: "20px"
};

const optionBox = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap"
};

const card = {
  backdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.35)",
  padding: "25px",
  borderRadius: "20px",
  width: "280px"
};

const btn = {
  padding: "10px 20px",
  background: "#1b5e20",
  color: "white",
  border: "none",
  borderRadius: "10px"
};

const resultBox = {
  marginTop: "30px",
  backdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.35)",
  padding: "25px",
  borderRadius: "20px",
  fontSize: "18px"
};

const loader = {
  margin: "20px auto",
  width: "40px",
  height: "40px",
  border: "5px solid #ccc",
  borderTop: "5px solid green",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};