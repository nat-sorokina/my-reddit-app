import React, {useState, useEffect} from 'react';
import Article from './components/Article';
import './App.css';

function App() {
  const [articles, setArtciles] = useState([]);
  const [subreddit, setSubreddit] = useState('');

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
      if (res.status !== 200) {
        console.log("ERROR");
        return;
      }

      res.json().then(data => {
        if (data !== null) {
          setArtciles(data.data.children);
        }
      });
    })
    .catch(error => {
      console.error('An error occurred: ', error.message)
    });

  }, [subreddit]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)}/>
      </header>
      <div className="articles">
        {
          (articles !== null) ? articles.map((article,index) => <Article key={index} article={article.data} />) : ''
        }
      </div>
    </div>
  );
}

export default App;
