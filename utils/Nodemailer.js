require("dotenv").config();
const nodemailer = require("nodemailer");
const { _formattedTime, _formattedDate } = require("./Formatting");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // TODO: your gmail account
    pass: process.env.PASS, // TODO: your gmail password
  },
});

module.exports.IntroductoryEmail = ({
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  let mailOptions = {
    from: "wwwoa.wrestling@gmail.com",
    to: email,
    subject: `A Message For ${firstName} ${lastName}`,
    text: ` Congratulations! Your WWWOA account has been activated by a representing executive board member!
        The information added is as follows:

        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone Number: ${phoneNumber}

        YOUR TEMPORARY PASSWORD IS:    password

        Please login to your account at your convenience to update any and all information. Please update your password as well for your security.

        Thank you and we look forward to having you on!

        `,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return err;
    }
    return log("Email sent!!!");
  });
};

module.exports.AnnouncementsEmail = ({ users, name, title, message }) => {
  console.log(users);
  users.map(({ email, firstName }) => {
    let mailOptions = {
      from: "wwwoa.wrestling@gmail.com",
      to: email,
      subject: `WWWOA Announcement | ${title}`,
      text: ` Hi ${firstName},

      ${title}


      ${message}
        

      -- Thanks,

      ${name}

        `,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return err;
      }
      return log("Email sent!!!");
    });
  });
};

module.exports.MeetingsEmail = ({ users, name, location, time, date }) => {
  time = _formattedTime(time);
  date = _formattedDate(date);
  users.map(({ email, firstName }) => {
    let mailOptions = {
      from: "wwwoa.wrestling@gmail.com",
      to: email,
      subject: `WWWOA New Meeting | ${title}`,
      text: ` Hi ${firstName},

      A new meeting has just been scheduled:
      
      Date: ${date}
      
      Time: ${time}

      Location: ${location}
        

      -- Thanks,

      ${name}

        `,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return err;
      }
      return log("Email sent!!!");
    });
  });
};
