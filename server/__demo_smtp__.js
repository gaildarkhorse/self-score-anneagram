router.post('/user-invite', (req, res) => {
    console.log('validating input...');
    const { errors, isValid } = validateInviteInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;

    console.log('updating permissions...');
    // update permissions
    User.findOne({ email: email }).then(user => {
        if (user) {
            let update = {'permissions': req.body.permissions};
            User.update({ email: email}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update permissions.' });
                } else {
                    return res.status(200).json({ message: 'Updated permissions successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'No user found to invite.' });
        }
    });

    console.log('creating transport...');
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'alinkon0207@gmail.com',
            pass: 'btet hlwp iarz zlmu',
        },
    });

    console.log('configuring mail options2...');
    const mailOptions = {
        from: 'alinkon0207@gmail.com',
        to: email,
        subject: 'Invite to PayQin-Stellar',
        text: req.body.note,
    };

    console.log('sending mail...');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(400).json(error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
});