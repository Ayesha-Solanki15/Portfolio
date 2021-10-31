const TypeWriter=function(txtElement,words,wait=3000){
  this.txtElement=txtElement;
  this.words= words;
  this.txt ='';
  this.wordIndex=0;
this.wait=parseInt(wait,10);
this.type();
this.isDeleting=false;
}
//Type Method
TypeWriter.prototype.type= function(){
  //Current index of word
const current = this.wordIndex % this.words.length;
//Get full text of current word
const fulltxt = this.words[current];

//check if deleting
if(this.isDeleting) {
  //Remove char
  this.txt=fulltxt.substring(0,this.txt.length - 1);
}else{
  //Add char
  this.txt=fulltxt.substring(0,this.txt.length + 1);
}

//Insert txt into element
this.txtElement.innerHTML =`<span class="txt">${this.txt}</span>`;

//initial type speed
let typeSpeed =300;
if(this.isDeleting){
  typeSpeed /=2;
}

//If word is complete
if(!this.isDeleting && this.txt===fulltxt){
  //Make a pause at end
  typeSpeed= this.wait;
  //Set delete to true
  this.isDeleting =true;
  }
  else if(this.isDeleting && this.txt ===''){
this.isDeleting=false;
//Move to next word
this.wordIndex++;
//Pause before startb typing
typeSpeed=500;
  }

  setTimeout(() => this.type(), 500)
} 


//Init On DOM Load
document.addEventListener('DOMContentLoaded',init);
//Init App
function init(){
  const txtElement= document.querySelector('.txt-type');
  const words= JSON.parse(txtElement.getAttribute('data-words'));
  const wait=txtElement.getAttribute('data-wait');

  //Init TypeWriter
  new TypeWriter(txtElement, words, wait);


}