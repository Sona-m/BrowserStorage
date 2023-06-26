 export const idb = window.indexedDB;

 export const createCollectionsInIndexedDB = () =>{
    if(!idb){
      console.log('idb not present')
      return;
    }
    console.log(idb);
    const request = idb.open('test-db' ,1);

    request.onerror =(event) =>{
        console.log('Error' , event)
    }

    request.onupgradeneeded = () =>{
      const db = request.result;
      if(!db.objectStoreNames.contains('dbStore')){
        db.createObjectStore('dbStore', {
            keyPath : 'id'
        })
      }
    }

    request.onsuccess = ()=>{
      console.log('database opened successfully')
    }
  }


  