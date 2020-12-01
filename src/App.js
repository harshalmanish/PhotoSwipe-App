import './App.css';
import React, {useState, useEffect} from "react";
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipe} from 'react-photoswipe';
import {PhotoSwipeGallery} from 'react-photoswipe';
import {Container} from 'react-bootstrap';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);

  let items = [];

  useEffect(()=>{
    fetch('https://www.reddit.com/r/memes.json?limit=1000')
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      setList(jsonResponse.data.children);
    })
    .catch(err=>{
      console.log(err);
    })
  },[]);
        
    for(let i=2;i<list.length;i++){
      items.push({
        src:`${list[i].data.url}`,
        thumbnail:`${list[i].data.thumbnail}`,
        w: 1200,
        h: 900,
        title: `${list[i].data.title}`
      })
    }

    let options = {
      //http://photoswipe.com/documentation/options.html
    };
          
    const handleClose = () => {
      setIsOpen(false);
    };
    
    const getThumbnailContent = (item) => {
      return (
        <img src={item.thumbnail} width={120} height={90} alt="unavailable"/>
        );
      }
      
  return (
    <Container>
        <h1 style={{textAlign: "center"}}>PhotoSwipe Gallery</h1>
        <PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent}/>
        <PhotoSwipe isOpen={isOpen} items={items} options={options} onClose={handleClose}/>
    </Container>
  );
}

export default App;