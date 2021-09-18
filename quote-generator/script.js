const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get quotes from API
let apiQuotes = [];
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote(true);
  } catch (error) {
    console.error('Error while trying to fetch quotes', error);
    console.log('fetching random local quote');
    newQuote(false);
  }
}
//Show new quote
function newQuote(apiQuote) {
  loading();
  //Pick a random quote from apiQuotes array
  let quote;
  if (apiQuote) {
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
  } else {
    quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
  }
  authorText.textContent = !quote.author ? 'Unknown' : quote.author;
  //check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}- ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();
