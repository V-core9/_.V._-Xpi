
var CACHE_NAME = 'offline-form';
var FOLDER_NAME = 'post_requests'
var FOLDER_NAME_GET = 'get_requests'
var IDB_VERSION = 2
var form_data
var urlsToCache = [
  '/',
  '/dev/XOmega/app/node_modules/bootstrap/dist/css/bootstrap.min.css',
  '/dev/XOmega/app/node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css',
  '/dev/XOmega/app/custom.css',
  '/dev/XOmega/app/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  '/dev/XOmega/app/assets/js/script.js',
  '/dev/XOmega/app/node_modules/toastr/build/toastr.min.css',
  '/dev/XOmega/app/node_modules/jquery/dist/jquery.min.js',
  '/dev/XOmega/app/node_modules/popper.js/dist/umd/popper.min.js',
  '/dev/XOmega/app/node_modules/bootstrap/dist/js/bootstrap.min.js',
  '/dev/XOmega/app/node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js',
  '/dev/XOmega/app/node_modules/toastr/build/toastr.min.js',
  '/dev/XOmega/app/assets/js/public-helpers.js',
  '/dev/XOmega/app/assets/js/public-navigation.js',
  '/dev/XOmega/app/assets/js/public.js',
  '/dev/XOmega/app/templates/public/static_pages/home_page/index.php',
  '/dev/XOmega/app/templates/public/navigation/index.temp.html',
  '/dev/XOmega/app/login',
  '/dev/XOmega/app/register',
  '/dev/XOmega/app/',
  '/dev/XOmega/app/index',
  '/dev/XOmega/app/index.html',
  '/dev/XOmega/app/templates/public/static_pages/authentication/register.temp.html',
  '/dev/XOmega/app/about-us',
  '/dev/XOmega/app/templates/public/static_pages/about_us_page/index.php',
  '/dev/XOmega/app/templates/public/static_pages/authentication/login.register.alt.temp.html',
  '/dev/XOmega/app/assets/img/logo-192.png',
  '/dev/XOmega/app/manifest.webmanifest',
  '/dev/XOmega/app/assets/css/login-register.min.css',
  '/dev/XOmega/app/node_modules/@iconscout/unicons/fonts/line/unicons-1.woff2',
  '/dev/XOmega/app/assets/js/lr-particles-config.js',
  '/dev/XOmega/app/node_modules/particles.js/particles.js',
  '/dev/XOmega/app/node_modules/@iconscout/unicons/css/line.css',
  '/dev/XOmega/app/node_modules/@iconscout/unicons/fonts/line/unicons-7.ttf',
  '/dev/XOmega/app/node_modules/@iconscout/unicons/fonts/line/unicons-8.ttf',
  '/dev/XOmega/app/node_modules/@iconscout/unicons/fonts/line/unicons-7.woff2',
  '/dev/XOmega/app/node_modules/@iconscout/unicons/fonts/line/unicons-8.woff2',
  '/dev/XOmega/app/node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
  '/dev/XOmega/app/node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-1_s02nlg.png',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-2_f8dowd.png',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834130/avatar-3_hzlize.png',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834132/avatar-4_ozhrib.png',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg',
  'https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png',
];

self.addEventListener('install', function(event) {
  // install file needed offline
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

function getObjectStore (storeName, mode) {
  return our_db.transaction(storeName, mode).objectStore(storeName)
}

function savePostRequests (url, payload) {
  var request = getObjectStore(FOLDER_NAME, 'readwrite').add({
    url: url,
    payload: payload,
    method: 'POST'
  })
  request.onsuccess = function (event) {
    console.log('a new pos_ request has been added to indexedb')
  }

  request.onerror = function (error) {
    console.error(error)
  }
}

function saveGetRequests (url, payload) {
  var request = getObjectStore(FOLDER_NAME_GET, 'readwrite').add({
    url: url,
    payload: payload,
    method: 'GET'
  })
  request.onsuccess = function (event) {
    console.log('a new get_ request has been added to indexedb')
  }

  request.onerror = function (error) {
    console.error(error)
  }
}

function openDatabase () {
  // if `flask-form` does not already exist in our browser (under our site), it is created
  var indexedDBOpenRequest = indexedDB.open('flask-form', )

  indexedDBOpenRequest.onerror = function (error) {
    // errpr creatimg db
    console.error('IndexedDB error:', error)
  }

  
  indexedDBOpenRequest.onupgradeneeded = function () {
    // This should only execute if there's a need to create/update db.
    this.result.createObjectStore(FOLDER_NAME, { autoIncrement: true, keyPath: 'id' })
  }

  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    our_db = this.result
  }
}

var our_db
openDatabase()

function openGetDatabase () {
  // if `flask-form` does not already exist in our browser (under our site), it is created
  var indexedDBOpenRequest = indexedDB.open('flask-form', )

  indexedDBOpenRequest.onerror = function (error) {
    // errpr creatimg db
    console.error('IndexedDB error:', error)
  }

  
  indexedDBOpenRequest.onupgradeneeded = function () {
    // This should only execute if there's a need to create/update db.
    this.result.createObjectStore(FOLDER_NAME_GET, { autoIncrement: true, keyPath: 'id' })
  }

  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    our_db = this.result
  }
}

var our_db_get
openGetDatabase()

self.addEventListener('fetch', function(event) {
  // every request from our site, passes through the fetch handler
  // I have proof
  console.log('I am a request with url: ', event.request.clone().url)
  if (event.request.method === 'GET') {
    event.respondWith(
      // check all the caches in the browser and find
      // out whether our request is in any of them
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            // if we are here, that means there's a match
            //return the response stored in browser
            return response;
          }
          // no match in cache, use the network instead
          return fetch(event.request.clone()).catch(function (error) {saveGetRequests(event.request.clone().url, form_data)})
        }
      )
    );
    
  } else if (event.request.clone().method === 'POST') {
    // attempt to send request normally
    console.log('form_data', form_data)
    event.respondWith(fetch(event.request.clone()).catch(function (error) {
      // only save post requests in browser, if an error occurs
      savePostRequests(event.request.clone().url, form_data)
    }))
  }
});

self.addEventListener('message', function (event) {
  console.log('form data', event.data)
  if (event.data.hasOwnProperty('form_data')) {
    // receives form data from script.js upon submission
    form_data = event.data.form_data
  }
})

function sendPostToServer () {
  var savedRequests = []
  var req = getObjectStore(FOLDER_NAME).openCursor() // FOLDERNAME = 'post_requests'

  req.onsuccess = async function (event) {
    var cursor = event.target.result

    if (cursor) {
      // Keep moving the cursor forward and collecting saved requests.
      savedRequests.push(cursor.value)
      cursor.continue()
    } else {
      // At this point, we have collected all the post requests in indexedb.
        for (let savedRequest of savedRequests) {
          // send them to the server one after the other
          console.log('saved request', savedRequest)
          var requestUrl = savedRequest.url
          var payload = JSON.stringify(savedRequest.payload)
          var method = savedRequest.method
          var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } // if you have any other headers put them here
          fetch(requestUrl, {
            headers: headers,
            method: method,
            body: payload
          }).then(function (response) {
            console.log('server response', response)
            if (response.status < 400) {
              // If sending the POST request was successful, then remove it from the IndexedDB.
              getObjectStore(FOLDER_NAME, 'readwrite').delete(savedRequest.id)
            } 
          }).catch(function (error) {
            // This will be triggered if the network is still down. The request will be replayed again
            // the next time the service worker starts up.
            console.error('Send to Server failed:', error)
            // since we are in a catch, it is important an error is thrown,
            // so the background sync knows to keep retrying sendto server
            throw error
          })
        }
    }
  }
}

function sendGetToServer () {
  var savedRequests = []
  var req = getObjectStore(FOLDER_NAME_GET).openCursor() // FOLDERNAME = 'post_requests'

  req.onsuccess = async function (event) {
    var cursor = event.target.result

    if (cursor) {
      // Keep moving the cursor forward and collecting saved requests.
      savedRequests.push(cursor.value)
      cursor.continue()
    } else {
      // At this point, we have collected all the post requests in indexedb.
        for (let savedRequest of savedRequests) {
          // send them to the server one after the other
          console.log('saved request', savedRequest)
          var requestUrl = savedRequest.url
          var payload = JSON.stringify(savedRequest.payload)
          var method = savedRequest.method
          var headers = {
            'Accept': 'text/html',
            'Content-Type': 'text/html'
          } // if you have any other headers put them here
          fetch(requestUrl, {
            headers: headers,
            method: method,
            body: payload
          }).then(function (response) {
            console.log('server response', response)
            if (response.status < 400) {
              // If sending the POST request was successful, then remove it from the IndexedDB.
              getObjectStore(FOLDER_NAME_GET, 'readwrite').delete(savedRequest.id)
            } 
          }).catch(function (error) {
            // This will be triggered if the network is still down. The request will be replayed again
            // the next time the service worker starts up.
            console.error('Send to Server failed:', error)
            // since we are in a catch, it is important an error is thrown,
            // so the background sync knows to keep retrying sendto server
            throw error
          })
        }
    }
  }
}


self.addEventListener('sync', function (event) {
  console.log('now online')
  if (event.tag === 'sendFormData') { // event.tag name checked here must be the same as the one used while registering sync
    event.waitUntil(
      // Send our POST request to the server, now that the user is online
      sendPostToServer()
      )
  }
})