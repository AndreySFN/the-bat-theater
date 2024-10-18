/* eslint-disable */
// @ts-nocheck

'use client';
import React from 'react';
import { useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [blur, setBlur] = useState(0);
  const [copySuccess, setCopySuccess] = useState(''); // Состояние для уведомления о копировании

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        setWidth(img.width);
        setHeight(img.height);
        setImage(img);
        drawImage(img, img.width, img.height, 0);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const drawImage = (img, newWidth, newHeight, blurAmount) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    ctx.filter = 'none';
  };

  const applyChanges = () => {
    if (!image) {
      alert('Пожалуйста, загрузите изображение.');
      return;
    }
    const newWidth = parseInt(width) || image.width;
    const newHeight = parseInt(height) || image.height;
    const blurAmount = parseInt(blur) || 0;
    drawImage(image, newWidth, newHeight, blurAmount);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const copyDataURL = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    try {
      await navigator.clipboard.writeText(dataURL);
      setCopySuccess('DataURL скопирован в буфер обмена!');
      setTimeout(() => setCopySuccess(''), 3000); // Сброс уведомления через 3 секунды
    } catch (err) {
      console.error('Не удалось скопировать DataURL: ', err);
      setCopySuccess('Не удалось скопировать DataURL.');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Редактор изображений</h1>
      <div style={styles.controls}>
        <div style={styles.control}>
          <label>Загрузить изображение:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div style={styles.control}>
          <label>Новая ширина (px):</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="1"
            placeholder="Например, 800"
          />
        </div>
        <div style={styles.control}>
          <label>Новая высота (px):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="1"
            placeholder="Например, 600"
          />
        </div>
        <div style={styles.control}>
          <label>
            Гауссово размытие (px): <span>{blur}</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={blur}
            onChange={(e) => setBlur(e.target.value)}
          />
        </div>
      </div>
      <canvas ref={canvasRef} style={styles.canvas}></canvas>
      <div style={styles.buttons}>
        <button onClick={applyChanges} style={styles.button}>
          Применить изменения
        </button>
        <button
          onClick={downloadImage}
          style={{ ...styles.button, backgroundColor: '#007bff' }}
        >
          Скачать изображение
        </button>
        <button
          onClick={copyDataURL}
          style={{ ...styles.button, backgroundColor: '#6c757d' }}
        >
          Скопировать dataURL
        </button>
      </div>
      {copySuccess && <p style={styles.copySuccess}>{copySuccess}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
  },
  control: {
    flex: '1',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  canvas: {
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    border: '1px solid #ccc',
  },
  buttons: {
    textAlign: 'center',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  copySuccess: {
    textAlign: 'center',
    marginTop: '10px',
    color: 'green',
    fontWeight: 'bold',
  },
};
