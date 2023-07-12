var preambles = [
  "So, I was knitting the other day and... ",
  "Why did the chicken cross the road? Anyways... ",
  "Oops, dropped my yoga mat! Now, where was I? Oh yes... ",
  "Just finished my meditation and had this thought: ",
  "This cat video really made me laugh. Also... ",
  "Tried a new vegan recipe today! And guess what else? ",
  "Painted a rainbow today and it made me realize: ",
  "Here's some wisdom from my Tai Chi class: ",
  "Dancing to some disco tunes and it struck me: ",
  "Had a revelation while doing my origami: ",
  "My salsa dance teacher always says... ",
  "Gardening is such a joy! It reminds me: ",
  "Baking cookies is such a therapy. Speaking of sweet... ",
  "Do unicorns exist? Anyhow... ",
  "During my peaceful bird-watching, I pondered: ",
  "Stargazing last night led to this realization: ",
  "Isn't it funny that we humans... ",
  "Knitting a scarf got me thinking...",
  "Stroking my pet unicorn, I had a revelation...",
  "Mid-somersault, it occurred to me...",
  "While doing my daily sun salutation, I realized...",
  "Just back from my interpretive dance class and...",
  "Sipping my homemade kombucha, I mused...",
  "Guess what my tarot cards said today...",
  "A moment from my laughter yoga session...",
  "Funny story from my recent hot air balloon trip...",
  "Baking vegan cupcakes led me to think...",
  "While feeding my pet parrot, I pondered...",
  "So, while I was writing my new pop song...",
  "As I was painting rainbows, it struck me...",
  "Thinking about my next cosplay, I realised...",
  "Watching my favourite rom-com, I had a thought...",
  "Mid-plant potting, it dawned on me...",
  "Doing a crossword puzzle, I had an epiphany...",
  "Daydreaming about mermaids, I considered...",
  "Looking at my lava lamp, I pondered...",
  "Sipping on my chai latte, I thought...",
  "Doing my daily Sudoku, I realised...",
  "Mid-karaoke session, it dawned on me...",
  "Just back from my retro roller-skating...",
  "Taking a bubble bath, I considered...",
  "While making some origami, I had an insight...",
  "In the middle of my DIY pottery class...",
  "While playing with my hula hoop...",
  "Suddenly, in my weekly puppet theater meeting...",
  "While I was making my scrapbooking...",
  "While cooking a delicious tofu stir-fry...",
  "While selecting my new tie-dye t-shirt...",
  "On my recent bird watching expedition...",
  "Trying a new jellybean flavor, I thought...",
  "While mastering my latest yo-yo trick...",
  "During my moonlit skinny-dip, it occurred to me...",
  "While polishing my collection of healing crystals...",
  "Fresh off a competitive hopscotch game, I considered...",
  "Practising my didgeridoo, I had this revelation...",
  "Perfecting my backstroke, I had a thought...",
  "Mid-wine tasting, it dawned on me...",
  "In the middle of my macramé project...",
  "While creating my bonsai tree masterpiece...",
  "Attempting a new magic trick, I pondered...",
  "During my floating yoga session, I mused...",
  "Practising my mime routine, I had an epiphany...",
  "Watching reruns of my favourite soap opera...",
  "Arranging my bouquet of daisies...",
  "While grooving to my favourite disco...",
  "While practising my balloon animal creations...",
  "After finishing my recent poetry slam...",
  "During a spirited game of bingo, I realised..."

];


function reformatTweet(tweet) {
  var lines = tweet.split('\n');
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i - 1].endsWith('?') || lines[i - 1].endsWith('!') || lines[i - 1].endsWith('.')) {
      if (lines[i].startsWith(' ')) {
        lines[i] = lines[i].slice(1);
      }
      lines[i] = '[NEWLINE]' + lines[i].charAt(0).toUpperCase() + lines[i].slice(1);
    } else {
      lines[i] = ' ' + lines[i].charAt(0).toLowerCase() + lines[i].slice(1);
    }
  }

  // Randomly select a preamble
  var preamble = preambles[Math.floor(Math.random() * preambles.length)];

  // Prepend the preamble and join the lines back together without space and replace all double spaces with a single space.
  return preamble + '\n\n' + lines.join('').replace(/  +/g, ' ');
}




function reformatPageTweets() {
  var tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach((tweetNode) => {
    var author = tweetNode.querySelector('div span span').textContent;
    if (author === 'Dr Jordan B Peterson' && !tweetNode.hasAttribute('data-formatted')) {
      var tweetContent = tweetNode.querySelector('[lang="en"] > span').textContent;
      var formattedContent = reformatTweet(tweetContent);
      // Add two new lines in place of the [NEWLINE] token to make the tweet look more like a paragraph.
      formattedContent = formattedContent.replace(/\[NEWLINE\]/g, '\n\n');
      tweetNode.querySelector('[lang="en"] > span').textContent = formattedContent;
      // Add a custom data attribute to indicate that this tweet has been formatted
      tweetNode.setAttribute('data-formatted', 'true');
    }
  });
}


reformatPageTweets();

var targetNode = document.querySelector('body');
var config = { childList: true, subtree: true };

var callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      reformatPageTweets();
    }
  }
};

var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
