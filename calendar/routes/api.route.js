 const router = require('express').Router();
 const { google } = require('googleapis')

  const GOOGLE_CLIENT_ID = '708105023641-t350k3usoo751tfnilu9hrdokjmmli8v.apps.googleusercontent.com'
  const GOOGLE_CLIENT_SECRET = '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'

 const oauth2Client = new google.auth.OAuth2(
   GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET,
   'http://localhost:3000'
 )

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    // NEXT LINE TOKEN FROM CONSOLE
    const REFRESH_TOKEN =
    ''
    const { code } = req.body
    const { tokens } = await oauth2Client.getToken(code)
    res.send(tokens) // DO NOT SEND BACK THE TOKEN IN THE APP

  } catch (error) {
    next(error)
  }
})

// cREATING EVENT TOT THE GOOGLE CALENDER FOR AUTHENTICATED USERS

router.post('/create-event', async (req, res, next) => {
try {
  const {
    summary, 
    description, 
    location, 
    startDateTime, 
    endDatetime,

  } = req.body

  oauth2Client.setCredentials({refresh_tken: REFRESH_TOKEN})
  const calendar = google.calendar('v3')
  const response = await calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    requestBody: {
      summary,
      description: description,
      location: location,
      colorId: '6',
      start: {
        dateTime: new Date(startDateTime)
      },
      end: {
        dateTime: new Date(endDatetime)
      },
    },
  })
  res.send(response)
} catch (error) {
  next(error)
}
})

module.exports = router;
