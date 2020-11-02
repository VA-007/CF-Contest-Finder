const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getContests = require('./utils/getContest')


const app = express();
const port = process.env.PORT || 3000;

// --> Setting up a extensions array in options object to get the html type extensions for other html files such as about,contests,etc and also simplify routing and hence we need not write saperate app.get code for getting the respective pages in the browser.
const options = {
  extensions: ['html', 'htm']
}

// --> Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join('__dirname', '../templates/views');
const partialsPath = path.join('__dirname', '../templates/partials');

// --> Setting up handlebars, views location and registering handlebars location for partials path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// --> Setting up the static directory to serve
app.use(express.static(publicDirectoryPath, options));          // Using the public folder and serving its contents as per the request of the user
// Note: Here static means the content of the page is static and dosent change upon refreshing

// --> Setting up the get requests for pages
app.get('', (req, res) => {
  res.render('index');
});

app.get('/howto', (req, res) => {
  res.render('howto');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// --> Setting up the query string to take in user handles and provide the list of contests
app.get('/contests', (req, res) => {
  if (!req.query.user1 || !req.query.user2) {
    return res.send({
      error: 'You must provide user handles!'
    });
  }

  let search = '';
  if (!req.query.search) {
    search = "0";
  } else {
    search = req.query.search;
  }

  getContests(req.query.user1, req.query.user2, search, (error, data) => {
    if (error) {
      return res.send({
        error
      });
    }

    res.send([data[0], data[1], data[2], data[3], data[4]]);
  });
});

// Setting up 404 pages
app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});