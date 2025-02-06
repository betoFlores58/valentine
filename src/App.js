'use client';
import { useState, useEffect, useCallback } from 'react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import './index.css';
import './App.css';


export default function Home() {
  const mensajes = [
    "Nelson",
    "Negativo",
    "No",
    "Paso",
    "No me interesa",
    "No quiero",
  ];
  
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setMensaje(mensajes[Math.floor(Math.random() * mensajes.length)]);
    document.title = "❣️ K&A ❣️";
  }, []);

  const handleClick = useCallback(() => {
    setOpen(true);
    
  }, []);

  const handleMoveButtonClick = useCallback(() => {
    const button = document.querySelector('#moveButton');
    if (button instanceof HTMLElement) {
    if (button) {
      const randomX = Math.floor(Math.random() * (window.innerWidth - button.clientWidth));
      const randomY = Math.floor(Math.random() * (window.innerHeight - button.clientHeight));
      button.style.position = 'absolute';
      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
      // button.style.transform = `scale(${1 - clickCount * 0.1})`; // Reduce size by 10% each click
    }
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        setSnackbarOpen(true);
        setTimeout(() => setSnackbarOpen(false), 3000);
        return 0;
      }
      return newCount;
    });
    }
  }, [clickCount]);

  return (
    <Box display={'flex'} position={'fixed'} alignItems={'center'} justifyContent={'center'} minHeight={'100vh'} sx={{ minWidth: 275, width: "100vw", height: "100vh", opacity: 1, zIndex: 10}}>
    <Card sx={{ 
      minWidth: 275, 
      boxShadow: 1, 
      zIndex: -1,
      }}>
      <CardMedia
      component="img"
      height="180"
      image="vale.jpeg"
      />
    <CardActions sx={{ justifyContent: "center"}}>
      <Button 
      onClick={handleClick}
      color='success'
      startIcon={<Favorite style={{color: 'red'}} />}
      variant="contained" 
      endIcon={open ? <FavoriteBorder style={{ color: 'red' }} /> : <Favorite style={{ color: 'red' }} />} 
      size="small">
      SÍ QUIEROOOOO!
      </Button>
      <Button 
        color='error' 
        variant="contained" 
        endIcon="😠"
        size="small"
        onClick={handleMoveButtonClick}
        id="moveButton"
      >
      {mensaje}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}>
        <Alert
        onClose={() => setSnackbarOpen(false)}
        severity="error"
        variant='filled'
        sx={{ width: '100%' }}
        >
        Lo sentimos, esa opcion no es válida. 😢
        </Alert>
      </Snackbar>
    </CardActions>
    </Card>
    {/* Alert without Snackbar */}
    {open && (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} position={'fixed'} top={0} left={0} width={'100vw'} height={'100vh'} bgcolor={'rgba(0, 0, 0, 0.5)'}>
      <Alert 
      onClose={() => setOpen(false)} 
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 4, fontSize: "1.5rem", bgcolor: "white", borderRadius: "12px", boxShadow: 3 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        🎉 ¡Aceptaste! ❤️ 
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZndtNnA3MXN6cjFsN2U2bnBrcnA5Zmh1OHM2ZDMzMXZvZTAyOWc2OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif" alt="heart gif" style={{ width: '115px', height: '115px' }} />
        </Box>
      </Alert>
    </Box>
    )}
    </Box>
  );
}