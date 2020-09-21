
if ('serviceWorker' in navigator) {
    // we are checking here to see if the browser supports the service worker api
     window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
           // Registration was successful
           console.log('Service Worker registration was successful with scope: ', registration.scope);
           
            // We don't want to check for updates on first load or we will get a false
            // positive. registration.active will be falsy on first load.
            if(registration.active) {
              // Check if an updated sw.js was found
              registration.addEventListener('updatefound', () => {
                console.log('Update found. Waiting for install to complete.');
                const installingWorker = registration.installing;

                // Watch for changes to the worker's state. Once it is "installed", our cache
                // has been updated with our new files, so we can prompt the user to instantly
                // reload.
                installingWorker.addEventListener('statechange', () => {
                  if(installingWorker.state === 'installed') {
                    console.log('Install complete. Triggering update prompt.');
                    onUpdateFound();
                  }
                });
              });
            }
         }, function(err) {
           // registration failed :(
           console.log('ServiceWorker registration failed: ', err);
         });

        navigator.serviceWorker.ready.then(function(registration) {
          console.log('Service Worker Ready')
          return registration.sync.register('sendFormData')
        }).then(function () {
         console.log('sync event registered')
        }).catch(function() {
         // system was unable to register for a sync,
         // this could be an OS-level restriction
         console.log('sync registration failed')
        });
      });
      
      
 }



function onUpdateFound() {

  document.querySelector('body').innerHTML += '<div class="modal fade top" id="appUpdateNotification" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"'
                                              +'aria-hidden="false" data-backdrop="false">'
                                              +'<div class="modal-dialog modal-frame modal-bottom modal-notify modal-info" role="document">'
                                              +'<div class="modal-content">'
                                              +'<div class="modal-body">'
                                              +'<div class="row d-flex justify-content-center align-items-center">'
                                              +'<p class="pt-3 pr-2">We prepared some updates to improve your experience</p>'
                                              +'<div class="buttons"><a type="button" class="btn btn-primary  waves-effect">Learn more <i class="fas fa-book ml-1"></i></a>'
                                              +'<a type="button" class="btn btn-outline-primary waves-effect" onclick="updateNow()">Update Now</a></div>'
                                              +'</div>'
                                              +'</div>'
                                              +'</div>'
                                              +'</div>'
                                              +'</div><style>div#appUpdateNotification{height: auto; bottom: 15px; padding: 0px!important; margin: 0px auto;top:unset;position:fixed;left:20px;right:20px;max-width:1300px;width:calc(100% - 40px);box-shadow:0 0 15px grey}div#appUpdateNotification .modal-frame .modal-body .row{justify-content:space-between!important;padding:0 2%}div#appUpdateNotification .modal-frame .modal-body .row .btn{margin:0 20px!important}div#appUpdateNotification .modal-dialog.modal-frame.modal-bottom.modal-notify.modal-info{width:100%;height:100%;margin:0;display:flex;max-width:none}</style>';

  $("#appUpdateNotification").modal('show');
  document.querySelector('body').classList.remove('modal-open');
}

function updateNow(){
  location.reload();
}


function submitFunction (event) {
  event.preventDefault()
  console.log('submitted', event)
  first_name = $('#first_name').val()
  middle_name = $('#middle_name').val()
  last_name = $('#last_name').val()
  date_of_birth = $('#date_of_birth').val()
  address = $('#address').val()
  hobby = $('#hobby').val()
  console.log('values,', first_name, middle_name, last_name, date_of_birth, address, hobby)
  $('#my_form').hide()
    // send  to server
  var data = {
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    date_of_birth: date_of_birth,
    address: address,
    hobby: hobby
  }
  // send message to service worker via postMessage
  var msg = {
    'form_data': data
  }
  navigator.serviceWorker.controller.postMessage(msg)  // <--- This line right here sends our data to sw.js

  $.ajax({
    type: "POST",
    url: '/submit',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function () {
      console.log('data sent to server successfully')
    },
    dataType: 'json'
  });

  message = 'Your data has been sent to the server'
  $('#message').append(message)

  return false
}