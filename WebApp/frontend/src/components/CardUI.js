//import React from 'react';
import React, { useState } from 'react';
const baseURL = '/api';
// const baseURL = 'http://localhost:5001/api';

function CardUI()
{
    var card = '';
    var search = '';
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;


    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    const addCard = async event => 
    {
	    event.preventDefault();

        var obj = {userId:userId,card:card.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(`${baseURL}/addcard`,
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
	};



    const searchCard = async event => 
    {
        event.preventDefault();
        		
        var obj = {userId:userId,search:search.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(`${baseURL}/searchcards`,
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res.results;
            var resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };


    return(
        <div id="cardUIDiv">
        <br />
        <input type="text" id="searchText" placeholder="Card To Search For" 
          ref={(c) => search = c} />
        <button type="button" id="searchCardButton" class="buttons" 
          onClick={searchCard}> Search Card</button><br />
        <span id="cardSearchResult">{searchResults}</span>
        <p id="cardList">{cardList}</p><br /><br />
        <input type="text" id="cardText" placeholder="Card To Add" 
          ref={(c) => card = c} />
        <button type="button" id="addCardButton" class="buttons" 
          onClick={addCard}> Add Card </button><br />
        <span id="cardAddResult">{message}</span>
      </div>
      
    );
}

export default CardUI;
