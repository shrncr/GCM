/* API endpoints associated with the GCM webapp
* Includes get requests to obtain the edit, and post/update requests for admin to edit data
*from admin side
*/
const express = require("express");

const router = express.Router(); //to define routes aligning with the exhibits 
const Sessions = require('../models/Sessions');
const Exhibit = require("../models/Exhibit") //exhibit schema
const Admin = require("../models/Admin"); //admin schema
const Skills = require("../models/Skills")
const Updates = require("../models/Updates")
const dbo = require("../db/conn");
const mongoose = require('mongoose');
const Impressions = require('../models/Impressions');
const Activities = require("../models/Activities");
const Feedback = require("../models/Feedback");
const HomeText = require("../models/HomeText");
const PlayStyle = require("../models/PlayStyles")
const Map = require("../models/Map");
const PlayStyles = require("../models/PlayStyles");
const ObjectId = require("mongodb").ObjectId;
const { Parser } = require('json2csv');






//returns text associated with homepage
router.get('/home', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "Main" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});

//returns text associated with homepage
router.post('/home', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "Main" }, options)
  res.json(data)
  
});

//returns text associated with homepage
router.get('/resources', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "Resources" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});
//returns text associated with homepage
router.post('/resources', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "Resources" }, options);
  res.json(data);
});

//returns text associated with homepage
router.get('/Playstylespage', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "playstyles" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});
//returns text associated with homepage
router.post('/Playstylespage', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "playstyles" }, options);
  res.json(data);
});


router.get('/Exhibitspage', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "exhibits" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});
//returns text associated with homepage
router.post('/Exhibitspage', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "exhibits" }, options);
  res.json(data);
});


router.get('/Mappage', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "map" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});
//returns text associated with homepage
router.post('/Mappage', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "map" }, options);
  res.json(data);
});

router.get('/Activitiespage', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "activities" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});
//returns text associated with homepage
router.post('/Activitiespage', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "activities" }, options);
  res.json(data);
});

router.get('/Skillspage', async (req, res) => {
  try {
    let data = await HomeText.findOne({ num: "skills" }); //find all
    res.json(data);
  } catch (err) {
    res.error;
    console.log("err");
  }
});
//returns text associated with homepage
router.post('/Skillspage', async (req, res) => {
  console.log("here")
  //);
  let options = {
    desc: req.body.homeText
  };
  let data = HomeText.findOneAndUpdate({ num: "skills" }, options);
  res.json(data)
});

//returns map locations
router.get('/map', async (req, res) => { //must load in all the pins
  try {
    let data = await Map.find({}); //find all
    res.json(data)
  } catch (err) {
    console.log(err);
  }
});

//returns playstyle data
router.get('/playstyles', async (req, res) => {
  try {
    let data = await PlayStyle.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
//returns the playstyle which is associated with given skill
router.get('/playstylesBySkill/:skill', async (req, res) => {
  try {
    console.log(req.params.skill)
    let ps = await PlayStyle.find({skills: req.params.skill});
    res.json(ps);
  } catch (err) {
    console.log(err);
  }
});

router.get('/activities', async (req, res) => {
  try {
    let data = await Activities.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get('/homeactivities', async (req, res) => {
  try {
    let data = await Activities.find({atHome: true});
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get('/skills', async (req, res) => {
  try {
    let data = await Skills.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//returns a playstyle's data and data of associated skills
router.get('/playstyles/:id', async (req, res) => {
  try {
    let playstyle = await PlayStyle.findById(req.params.id);
    let playstyleSkills = await Skills.find({ title: playstyle.skills });
    res.json({ baseData: playstyle, dropdown: playstyleSkills });
  } catch (err) {
    console.log(err);
  }
});
router.delete('/Exhibits/delete', async (req, res) => {
  try {
    let data = await Exhibit.deleteOne({ _id: req.body.id })
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
router.delete('/Playstyles/delete', async (req, res) => {
  try {
    let data = await PlayStyle.deleteOne({ _id: req.body.id })
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
router.delete('/Map/delete', async (req, res) => {
  try {
    let data = await Map.deleteOne({ _id: req.body.id })
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
router.delete('/Activities/delete', async (req, res) => {
  try {
    let data = await Activities.deleteOne({ _id: req.body.id })
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
router.delete('/Skills/delete', async (req, res) => {
  try {
    let data = await Skills.deleteOne({ _id: req.body.id })
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//returns data for a specific map location
router.get('/playPlaces/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let exhibit = await Exhibit.findById(req.params.id);
    let exhibitActivities = await Activities.find({ title: exhibit.activities });
    console.log(exhibitActivities)
    console.log("paninipanini\n\n");
    res.json({ baseData: exhibit, dropdown: exhibitActivities });
  } catch (err) {
    console.log(err);
  }
});

//returns data for an exhibit, associated activities, and names of skills
router.get('/exhibits/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let exhibit = await Exhibit.findById(req.params.id);
    conosle.log(exhibit.activities)
    let exhibitActivities = await Activities.findOne({ title: exhibit.activities[0] });
    conosle.log(exhibitActivities)
    res.json({ baseData: exhibit, dropdown: exhibitActivities });
  } catch (err) {
    console.log(err);
    console.log('ioesngiesnf')
  }
});


//returns data for a specific map location
router.get('/skills/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let skill = await Skills.findById(req.params.id);
    let skillActivities = await Activities.find({ title: skill.Activities });
    res.json({ baseData: exhibit, dropdown: skillActivities });
  } catch (err) {
    console.log(err);
  }
});

//returns data for a specific activity
router.get('/athome/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let activity = await Activities.findById(req.params.id);
    let activitySkills = await Skills.find({ title: activity.skills });
    res.json({ baseData: activity, dropdown: activitySkills });
  } catch (err) {
    console.log(err);
  }
});
//returns data for a specific activity
router.get('/activity/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let activity = await Activities.findById(req.params.id);
    let activitySkills = await Skills.find({ title: activity.skills });
    res.json({ baseData: activity, dropdown: activitySkills });
  } catch (err) {
    console.log(err);
  }
});

//returns all currently existing feedback
router.get('/feedback', async (req, res) => {
  try {
    let feedback = await Feedback({});
    res.json(feedback);
  } catch (err) {
    console.log(err);
  }
});

router.get('/ageRanges', async (req, res) => {
  try {
    let data = await Skills.find({isAge: true});
    console.log(data);
    res.json(data);
    
  } catch (err) {
    console.log(err);
  }
});


// add a new feedback instance to the database
router.post('/feedback', (req, res) => {
  //   const feedbackData = {
  //   ...req.body,
  // };
  let age;
  if (req.body.childAge === "prefer-not-to-say") {
    age = -1;
  }else{
    age = req.body.childAge;
  }

  const feedbackData = {
    'exhibitId':req.body.exhibitId,
    'rating':req.body.rating,
    'childAge':age 
    };
    console.log(req.body.exhibitId)
    console.log(req.body.rating)
    console.log(age)


  // create a new impression instance with the provided data
  const feedback = new Feedback(feedbackData);

  // save the impression to the database
  feedback.save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({ error: err }));
});

// Route to download feedback data as CSV
router.get('/download-feedback-csv', async (req, res) => {
  try {
    const data = await Feedback.find();
    const fields = ['Feedback_id', 'Exhibit', 'Rating', 'Child Age'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('feedback.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});



//returns all exhibits whose status is set to true, (visible)
router.get('/exhibits', async (req, res) => {
  try {
    let data = await Exhibit.find({ status: true });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//returns all exhibits regardless of visible or not
router.get('/allexhibits', async (req, res) => { //find all exhibit
  try {
    let data = await Exhibit.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});


//idk if we use this...
router.get('/playplace', async (req, res) => {
  try {
    let data = await Exhibit.find({ status: true });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//must load in all the learning style data. also not sure if used
router.get('/exhibitsandplaystyles'), async (req, res) => {
  try {
    let exdata = await Exhibit.find({});
    let playdata = await PlayStyle.find({});
    res.json(exdata, playdata);
  } catch (err) {
    console.log(err);
  }
};


//ADMIN OPTIONS

//used when attempting to login
router.post('/admin', async (req, res) => {
  try {
    console.log(req.body);
    let data = await Admin.findOne({ username: req.body.username, password: req.body.password });
    console.log(data)
    if (data) {
      // const sessionUser = sessionizeUser(data);
      // console.log("1");
      // req.session.user = sessionUser
      // console.log("2");
      // res.send(sessionUser);
      res.json(data)
    }

  } catch (err) {
    console.log("err")
  }
});


//when adding or editing map pins. incomplete
router.post('/admin/editmap', async (req, res) => {
  try {
    const options = {
      title: req.body.title,
      desc: req.body.desc,
      address: req.body.address,
      playstyle: req.body.playstyle,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      image: req.body.image
    };

    console.log(req.body);

    const result = await Map.findOneAndUpdate({ _id: req.body.id }, options, { new: true });

    if (result) {
      res.status(200).json({ message: 'Map updated successfully', map: result });
    } else {
      res.status(404).json({ message: 'Map not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }

});

router.delete("", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy(err => {
        if (err) throw (err);
        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

router.put('/admin/editlearningstyle', async (req, res) => {
  try {
    const options = {
      title: req.body.title,
      desc: req.body.desc,
      image: req.body.image,
      skills: req.body.skills
    };

    console.log(req.body);

    const result = await PlayStyle.findOneAndUpdate({ _id: req.body.id }, options, { new: true });

    if (result) {
      res.status(200).json({ message: 'PlayStyle updated successfully', playstyle: result });
    } else {
      res.status(404).json({ message: 'PlayStyle not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

//edit already existing exhibit
router.put('/admin/editexhibit', async (req, res) => {
  try {
    const options = {
      title: req.body.title,
      desc: req.body.desc,
      image: req.body.image,
      status: req.body.status,
      activities: req.body.activities
    };

    console.log(req.body);

    const result = await Exhibit.findOneAndUpdate({ _id: req.body.id }, options, { new: true });

    if (result) {
      res.status(200).json({ message: 'Exhibit updated successfully', exhibit: result });
    } else {
      res.status(404).json({ message: 'Exhibit not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});


//add new activity
router.post("/admin/addactivity", async (req, res) => {
  try {
    console.log("lig");
    let id = new mongoose.Types.ObjectId(); //make a unique objID
    console.log("ma");
    let data = await Activities.create({ //create new exhibit w/ the model
      'title': req.body.title,
      'desc': req.body.desc,
      'skills': req.body.connections,
      'atHome': req.body.atHome
    }
    );
    res.json(data)
    console.log("bawls");
  } catch (err) {
    console.log(err); // we will know if error
  }
});


router.post("/admin/editactivity", async (req, res) => {
  try {
    console.log(req.body);
    const options = {
      title: req.body.title,
      desc: req.body.desc,
      skills: req.body.skills,
      atHome: req.body.atHome
    };
    const result = await Activities.findOneAndUpdate({ _id: req.body.id }, options, { new: true });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  } 
});

router.post("/admin/editskill", async (req, res) => {
  try {
    console.log("meow meow");
    console.log(req.body);

    const options = {
      title: req.body.title,
      desc: req.body.desc,
      activities: req.body.activities,
      isAge: req.body.isAge
    };

    const result = await Skills.findOneAndUpdate({ _id: req.body.id }, options, { new: true });

    if (result) {
      res.status(200).json({ message: 'Skill updated successfully', skill: result });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});
router.post("/admin/addskill", async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(); //make a unique objID
    let data = await Skills.create({ //create new exhibit w/ the model
      'title': req.body.title,
      'desc': req.body.desc,
      'Activities': req.body.connections,
      'isAge': req.body.isAge
    }
    );
    res.json(data)
  } catch (err) {
    console.log(err); // we will know if error
  }
});

//add a new pin to pin page
router.post("/admin/addmap", async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(); //make a unique objID
    let data = await Map.create({ //create new exhibit w/ the model
      'map_id': id,
      'longitude': req.body.long,
      'latitude': req.body.lat,
      'address': req.body.address,
      'title': req.body.title,
      'desc': req.body.desc,
      'playstyle': req.body.playstyle,
      'image': req.body.image

    }
    );
    res.json(data)
  } catch (err) {
    console.log(err); // we will know if error
  }
});

//add a new exhibit to exhibits page
router.post("/admin/addexhibit", async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(); //make a unique objID
    let data = await Exhibit.create({ //create new exhibit w/ the model
      'exhibit_id': id,
      'title': req.body.title,
      'desc': req.body.desc,
      'image': req.body.image,
      'status': req.body.status,
      'activities': req.body.activities
    }
    );
    res.json(data)
  } catch (err) {
    console.log(err); // we will know if error
  }
});


//edit an already existing exhibit
router.post("/admin/addlearningstyle", async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(); //make a unique objID
    let data = await PlayStyle.create({ //create new exhibit w/ the model
      'style_id': id,
      'title': req.body.title,
      'desc': req.body.desc,
      'image': req.body.image,
      'skills': req.body.skills
    }
    );
    res.json(data);
  } catch (err) {
    console.log(err); // we will know if error
  }
});

//find all admin who have accounts
router.get("/admin/admininfo", async (req, res) => {
  try {
    let data = await Admin.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//making a new impression
router.post('/create', (req, res) => {
  



  const impressionData = {
    ...req.body,
    impression_id: new mongoose.Types.ObjectId(),
    time_of_day: new Date(req.body.time_of_day), // ensure time_of_day is a Date object
  };

  // create a new impression instance with the provided data
  const impression = new Impressions(impressionData);

  // save the impression to the database
  impression.save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({ error: err }));
});

// route to download Impressions data as CSV
router.get('/download-impressions-csv', async (req, res) => {
  try {
    const data = await Impressions.find();
    const fields = ['impression_id', 'page', 'time_of_day', 'deviceType'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('impressions.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});
// create a new session instance in db
router.post('/sessions/end', async (req, res) => {
  try {
    const { deviceType, sessionDuration, bounce, page } = req.body;
    const newSession = new Sessions({
      sessionEnd: new Date(),
      session_id: new mongoose.Types.ObjectId(),
      sessionDuration,
      bounce,
      deviceType,
      page
    });

    await newSession.save();
    res.status(200).json({ message: 'Session ended successfully', data: newSession });
  } catch (error) {
    console.error('Failed to end session:', error);
    res.status(500).send({ error: 'Error ending session', details: error.message });
  }
});

// route to download sessions data as CSV
router.get('/download-sessions-csv', async (req, res) => {
  try {
    const data = await Sessions.find();
    const fields = ['session_id', 'sessionStart', 'sessionEnd', 'sessionDuration', 'bounce', 'deviceType', 'page'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('sessions.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});

// route to download feedback data as CSV
router.get('/download-feedback-csv', async (req, res) => {
  try {
    const data = await Feedback.find();
    const fields = ['feedback_id', 'exhibit', 'rating', 'childAge'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('feedback.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});

module.exports = router; //export so you can use this file in other files