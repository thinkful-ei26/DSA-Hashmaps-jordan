'use strict';

class HashMap {
  constructor(intialCapacity=8){
    //to keep track of the hash map length
    this.length = 0;
    //set slots to an empty array 
    this._slots = [];
    //set capacity to the initial capacity
    this._capacity = intialCapacity;
    //keep track of deleted elements
    this._deleted = 0;
  }

  //call findSlot to get the key, then return the key value
  get(key){
    const index = this._findSlot(key);
    if (this._slots[index] === undefined){
      throw new Error('Key error');
    }
    //if the key we search for is present, return the key's value
    return this._slots[index].value;
  }

  //resize
  _resize(size){
    const oldSlots = this._slots;
    this._capacity = size;
    //reset the length, it gets rebuilt as items are added
    this.length = 0;
    this._slots = [];

    //*if the slot exists, call the set method and add the new key/value pair
    for (const slot of oldSlots){
      if (slot !== undefined){
        this.set(slot.key, slot.value);
      }
    }
  }

  //check if load ratio > given maximum ration
  set(key, value){
    const loadRatio = (this.length + this._deleted +1) / this._capacity;


    //if load ratio is > given max, resize the hash map
    if (loadRatio > HashMap.MAX_LOAD_RATIO){
      //take the size of the hash map and multiply by 3
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    console.log('key',key);

    //find the appropriate slot, create an object with the key/value pair add that object to the _slots array -- that will also increase the length
    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  //find the correct slot for a given key 
  _findSlot(key){
    //calculate the hash of the key
    const hash = HashMap._hashString(key);
    //modulos the hash to fit within the current capacity
    const start = hash % this._capacity;
        
    //use start to get close to where your key will be
    //loop through the array stopping on an empty slot or the slot that contains the key/value pair you were looking for
    for (let i = start; i<start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key == key){
        return index;
      }
    }
  }

  //delete an item from the hash map
  remove(key){
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined){
      throw new Error('Key error');
    }
    //set deleted to true, decrease the length, increase deletion count
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }


  static _hashString(string){
    //set hash to a safe, large prime number
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      //add each character code to the hash for the smallest possible chance of collision
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //resizes the giant number back to a 32 bit character
      hash = hash & hash;
    }
    //force shift the left most bit of the value to 0 to make it an absolute value and so it's not a negative
    return hash >>> 0;
  }
}

//create the MAX_LOAD_RATIO and SIZE_RATIO properties 
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main(){
  const lor = new HashMap();

  lor.set("Hobbit","Bilbo");
  lor.set("Hobbit","Frodo");
  lor.set("Wizard","Gandolf");
  lor.set("Human","Aragon");
  lor.set("Elf","Legolas");
  lor.set("Maiar","The Necromancer");
  lor.set("Maiar","Sauron");
  lor.set("RingBearer","Gollum");
  lor.set("LadyOfLight","Galadriel");
  lor.set("HalfElven","Arwen");
  lor.set("Ent","Treebeard");
//   console.log('this is Maiar: ',lor.get('Maiar'));
//   console.log(lor);
}
// main();

//check if any permutation of a string is a palindrome

//input: 'acecarr', 'randy', 'hnnaah'
//output: true, false, true

//given a string, find all the permutations
    //starting with an array, take each letter and see if there is a pair
    //if the string doesn't contain any paired letters, it's not a palindrome
    //if the string contains paired letters, keep going until we get to the letter without a pair
    //if string.length is odd, then find the character without a pair and move into the middle
    //divide the length of the string by two and use math.floor() to find the center
    //every letter will have to have a pair with the exception of one if it is an odd length, but only one

    //we put each character into it's own slot
    //if old slot.value = current slot.value

function palindrome(string){
    let pal = new Map();
    let odd_count = 0;

    //iterate through the string, populate the hash
    for (let i = 0; i < string.length; i++){
        pal.set(string[i], string[i]);
    }

    //get the value of each key
   pal.get()

    //check the hash for chars that appear an odd number of times
    for (let char in pal._slots){
        console.log("pal:", pal._slots.length)
        if (pal[char] % 2 !== 0){
            odd_count++
        }
        if (odd_count > 1){
            return false;
        }    
    }
    // console.log('hash map:', pal)
    // console.log(odd_count)
    return true;
}

console.log(palindrome('randy'));
