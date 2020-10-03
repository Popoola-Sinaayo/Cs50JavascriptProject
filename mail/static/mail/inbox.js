document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
    document.querySelector("#sent").onclick = () => {
      sent_mail();
      mail() 
    document.querySelector("#sent").disabled = true;
  } 
  // Shows the inbox 
  document.querySelector("#inbox").onclick = () => {
    load_mailbox('inbox')
    inbox()
  }

// Shows the Archives

document.querySelector("#archived").onclick = () => {
  load_mailbox('archive')
  Archived_mails()

}
  
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector("#sent-mails").style.display = 'none';
  document.querySelector("#archive_mails").style.display = 'none'
  document.querySelector('#reply_form').style.display = 'none'
  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector("#sent-mails").style.display = 'none';
  document.querySelector("#archive_mails").style.display = 'none'
  document.querySelector('#reply_form').style.display = 'none'
  if (mailbox === 'archive') {
    document.querySelector("#archive_mails").style.display = 'block'
  }
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)} </h3>  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-inbox" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
</svg>`;
}

// Loads The Sent Mail

function sent_mail() {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').innerHTML = '<h1 style="color: green;"> Sent Mails </h1>' ;
  document.querySelector("#sent-mails").style.display = 'block'
  document.querySelector("#archive_mails").style.display = 'none'
  document.querySelector('#reply_form').style.display = 'none'
}

// Send Email Function

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#compose-form").onsubmit = () => {
    email_recipient = document.querySelector("#compose-recipients").value;
    email_subject = document.querySelector("#compose-subject").value;
    email_body = document.querySelector("#compose-body").value;
    // Fucntion that submits the form and sends the mail
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: email_recipient,
          subject: email_subject,
          body: email_body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });
  }
})

// Load the sent mail box

function mail() {
  fetch('/emails/sent')
  .then(response => response.json())
  .then(result => {
    console.log(result)
    for (var i = 0; i < result.length; i++) {
      var obj = result[i]
      console.log(obj.subject)
      console.log(obj.body)
      console.log(obj.archived)
      console.log(obj.id)
      console.log(obj.read)
      console.log(obj.recipients['0'])
      console.log(obj.timestamp)
      const element = document.createElement('div')
      const p0 = document.createElement('p')
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      const p3 = document.createElement('p')
      const p4 = document.createElement('p')
      const p5 = document.createElement('p')
      const h1 = document.createElement('h1')
      element.className = 'email_views'
      if (obj.read === true) {
        element.style.backgroundColor = 'gray';
      } else {
        element.style.backgroundColor = 'white';
      }
      h1.innerHTML = `To: ${obj.recipients['0']} `
      p0.innerHTML = `Subject: ${obj.subject}`
      p1.innerHTML = `Body: ${obj.body}`
      p2.innerHTML = `Read-Status: ${obj.read}`
      p3.innerHTML = `Recipient: ${obj.recipients['0']}`
      p4.innerHTML = `Time Sent: ${obj.timestamp}`
      p5.innerHTML = `Archived-Status: ${obj.archived}`
      element.appendChild(h1)
      element.appendChild(p0)
      element.appendChild(p1)
      element.appendChild(p2)
      element.appendChild(p3)
      element.appendChild(p4)
      element.appendChild(p5)
      document.querySelector("#sent-mails").append(element)
      //element.onclick = () => {
        //email_details(obj.id)
      //}
    for (let i = 0; i < obj.length; i++) {
    /*document.querySelector("#body").innerHTML = obj.body
    document.querySelector("#archive").innerHTML = obj.archived 
    document.querySelector("#id").innerHTML = obj.id 
    document.querySelector("#read").innerHTML = obj.read
    document.querySelector("#recipient").innerHTML = obj.recipient
    document.querySelector("#subject").innerHTML = obj.subject
    document.querySelector("#time").innerHTML =  obj.timestamp
    */
    }
    } 
    
   /*const element = document.createElement('div')
    element.className = 'email_views'
    element.innerHTML = 
    document.querySelector("#sent-mails").append(element)
    */
    for (results in result.values()) {
    /*document.querySelector("#body").innerHTML = results['body'] 
    document.querySelector("#archive").innerHTML = results['archived'] 
    document.querySelector("#id").innerHTML = results['id'] 
    document.querySelector("#read").innerHTML = results['read']
    document.querySelector("#recipient").innerHTML = results['recipients']
    document.querySelector("#subject").innerHTML = results['subject']
    document.querySelector("#time").innerHTML =  results['timestamp']
    */
    }
    
  }) 
} 

/*for (let i = 0; i < result.length; i++) {

}
*/

// Function that gets the inbox
function inbox () {
  fetch("emails/inbox")
  .then(response => response.json())
  .then(result => {
    console.log(result)
    
    for (var i = 0; i < result.length; i++) {
      var obj = result[i]
      console.log(obj.subject)
      console.log(obj.body)
      console.log(obj.archived)
      console.log(obj.id)
      console.log(obj.read)
      console.log(obj.sender)
      console.log(obj.timestamp)

      const element_i = document.createElement('div')
      const p0i = document.createElement('p')
      const p1i = document.createElement('p')
      const p2i = document.createElement('p')
      const p3i = document.createElement('p')
      const p4i = document.createElement('p')
      const p5i = document.createElement('p')
      const h1i = document.createElement('h1')
      const button = document.createElement('button')
      const buttoni = document.createElement('button')
      // Next thing to work on is the use of children
      // Use the div .append Child to make n ew chidren that are nested in a div
      // You  can use the div.children to show the elements that are in the div
      element_i.style.backgroundColor = "gray";
      h1i.innerHTML = `From: ${obj.sender} `
      p0i.innerHTML = `Subject: ${obj.subject}`
      p1i.innerHTML = `Body: ${obj.body}`
      p2i.innerHTML = `Read-Status: ${obj.read}`
      p3i.innerHTML = `Recipient: ${obj.recipients['0']}`
      p4i.innerHTML = `Time Sent: ${obj.timestamp}`
      p5i.innerHTML = `Archived-Status: ${obj.archived}`
      button.innerHTML = 'Archive'
      buttoni.innerHTML = 'Reply'
      element_i.appendChild(h1i)
      element_i.appendChild(p0i)
      element_i.appendChild(p1i)
      element_i.appendChild(p2i)
      element_i.appendChild(p3i)
      element_i.appendChild(p4i)
      element_i.appendChild(p5i)
      element_i.appendChild(buttoni)
      if (obj.archived === false) {
        element_i.appendChild(button) 
      } else {
        console.log('Already Archived!')
      }
      document.querySelector("#emails-view").append(element_i)
      //document.addEventListener("DOMContentLoaded", () => {
        buttoni.onclick = () => {
          reply(obj)
          buttoni.disabled = true
          //document.querySelector('#reply_form').style.display = 'block'
        }
      //})
      button.onclick = () => {
        to_archive(obj.id)
        button.disabled = true
      }
      element_i.onclick = () => {
        email_read(obj.id)
      }
    }
  })
}

function email_read(email_id) {
  fetch(`emails/${email_id}`, {
    method: "PUT", 
    body: JSON.stringify({
      read: true
    })
  })
  //.then(response => response.json())
  //.then(result => {
   // console.log(result)

  //})
}

// Function that archives

function to_archive(mail_id) {
  fetch(`emails/${mail_id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: true
    })
  })
}

// Function To Show Archived Mails

function Archived_mails()  {
  fetch('emails/archive')
  .then(response => response.json())
  .then(result => {
    console.log(result)
    for (var i = 0; i < result.length; i++) {
      var obj = result[i]
      console.log(obj.subject)
      console.log(obj.body)
      console.log(obj.archived)
      console.log(obj.id)
      console.log(obj.read)
      console.log(obj.recipients['0'])
      console.log(obj.timestamp)
      const element_a = document.createElement('div')
      const p0a = document.createElement('p')
      const p1a = document.createElement('p')
      const p2a = document.createElement('p')
      const p3a = document.createElement('p')
      const p4a = document.createElement('p')
      const p5a = document.createElement('p')
      const h1a = document.createElement('h1')
      const buttona = document.createElement('button')
      const buttona_0 = document.createElement('button')
      element_a.style.backgroundColor = "gray";
      h1a.innerHTML = `From: ${obj.sender} `
      p0a.innerHTML = `Subject: ${obj.subject}`
      p1a.innerHTML = `Body: ${obj.body}`
      p2a.innerHTML = `Read-Status: ${obj.read}`
      p3a.innerHTML = `Recipient: ${obj.recipients['0']}`
      p4a.innerHTML = `Time Sent: ${obj.timestamp}`
      p5a.innerHTML = `Archived-Status: ${obj.archived}`
      buttona.innerHTML = 'Unarchive'
      buttona_0.innerHTML = 'Reply' 
      element_a.appendChild(h1a)
      element_a.appendChild(p0a)
      element_a.appendChild(p1a)
      element_a.appendChild(p2a)
      element_a.appendChild(p3a)
      element_a.appendChild(p4a)
      element_a.appendChild(p5a)
      element_a.appendChild(buttona)
      element_a.appendChild(buttona_0)
      document.querySelector('#archive_mails').append(element_a)
      buttona_0.onclick = () => {
        reply(obj)
        //document.querySelector('#reply_form').style.display = 'block'
      }
      buttona.onclick = () => {
        Unarchive_mail(obj.id)
      }
    }
  })
}

// Function to Unarchive

function Unarchive_mail(mail_id) {
  fetch(`emails/${mail_id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: false
    }) 
  })
}

// Function that replies

function reply(mail) {
  const form = document.createElement('form')
  const input_0 = document.createElement('input')
  const input_1 = document.createElement('input')
  const input_2 = document.createElement('input')
  //const input_3 = document.createElement('input')
  //const input_4 =  document.createElement('input')
  //const input_5 = document.createElement('input')
  //const input_6 =  document.createElement('input')
  const button_r = document.createElement('button')
  input_0.type = 'text'
  input_1.type = 'text'
  input_2.type = 'text'
  input_0.disabled = true
  //input_3.type = 'text'
  //input_4.type = 'text'
  //input_5.type = 'text'
  //input_6.type = 'text'
  input_0.value = `${mail.sender}`
  input_1.value = `Re: ${mail.subject}`
  input_2.value = `${mail.body}`
  button_r.innerHTML = 'Submit'
  form.appendChild(input_0)
  form.appendChild(input_1)
  form.appendChild(input_2)
  form.appendChild(button_r)
  document.querySelector("#reply_form").append(form)
  document.querySelector('#reply_form').style.display = 'block'
  form.onsubmit = () => {
    fetch('/emails', {
      method: "POST",
      body: JSON.stringify({
        recipients: input_0.value,
        subject: input_1.value,
        body: input_2.value
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
  }
}