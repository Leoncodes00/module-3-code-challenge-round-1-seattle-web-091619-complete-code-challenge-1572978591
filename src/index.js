document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3855;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchContents(imageURL);
})

function fetchContents(imageURL){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(json => {
    displayContents(json);
  })
}

function displayContents(response){
  let imageCard = document.getElementById('image');
  imageCard.src = response.url;
  let titleImage = document.getElementById('name');
  titleImage.textContent = response.name;
  let likes = document.getElementById('likes');
  likes.textContent = response.like_count;
  let likeButton = document.getElementById('like_button');
  likeButton.addEventListener('click', () => {
    likes.textContent = response.like_count += 1
    postRequestLike(response);
  })
  let commentForm = document.getElementById('comment_form');
  let commentInput = document.getElementById('comment_input');
  let commentList = document.getElementById('comments');
  commentForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let commentLi = document.createElement('li');
    commentLi.textContent = commentInput.value;
    commentList.appendChild(commentLi);
    postRequestComment(response);
  })

}

function postRequestLike(response){
  let responseId = 3855;
  fetch(`https://randopic.herokuapp.com/likes/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify( {
      image_id: responseId
    })
  })
  .then(resp => resp.json())
  .then(json => {
    console.log(json);
  })
}

function postRequestComment(response){
  let responseId = 3855;
  let comments = response.comments;
  
  fetch(`https://randopic.herokuapp.com/comments/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify( {
      image_id: responseId,
      content: response
    })
  })
  .then(resp => resp.json())
  .then(json => {
    console.log(json);
  })
}