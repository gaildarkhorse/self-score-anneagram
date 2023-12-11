erxports.sendResetEmail = async (to, name, link, link_html) => {
    return new Promise(async (resolve, reject) => {
      const msg = {
        to: to,
        from: {
          name: 'Trooper-Jobs',
          email: process.env.SG_VERIFIED_SENDER,
        },
        templateId: 'd-e490ed1f59ce4fc89d73ae801681425f',
        dynamic_template_data: {
          name: name,
          link: link,
          link_html: link_html,
        }
      }
      sgMail
        .send(msg)
        .then((response) => {
          console.log('response >>> ', response);
          resolve(response);
        })
        .catch((error) => {
          console.log('error >>> ', error);
          reject(error);
        })
    })
    
  }
  
  
  SENDGRID_API_KEY=`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`
  SG_VERIFIED_SENDER=`Team@trooper-jobs.com`
  
  
  `please try googling sendgrid email sending, 
  not using html template.
  only send via text and html`
  