const jwt = require('jsonwebtoken');

const users = [
    {
      id: 1,
      username: 'bbrightvc',
      password: '123admin',
      name: "bright",
      role: 'admin',
    },
    {
      id: 2,
      username: 'winmetawin',
      password: '123member',
      name: "win",
      role: 'user',
    },
  ];

const secretkey = '12345@12345'; /// không share dc

const loginController = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      secretkey
    );
    res.json({
      accessToken,
    });
  } else {
    res.send('Username or password incorrect');
  }
};

const decodeJWT = (token) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

const getUserProfileController = (req, res) => {
    const user = req.user;
    console.log('user', user);
    const userProfile = users.find((user) => user.username === user.username);
    res.json({
      name: userProfile.name,
      age: userProfile.age,
    });
  };

const deleteUserController = (req, res) => {
    const user = req.user;
    const role = user.role;
    if (role !== 'admin') {
      res.send('loi');
    }
  
    res.json({
      status: 'OK',
    });
  };
  
const authentication = (req, res, next) => {
    const headers = req.headers;
    const token = headers['authorization'];
    const data = decodeJWT(token);
    if (!data) {
      res.send('loi');
    }
    req.user = data;
    next();
};

module.exports = {
    authentication, 
    getUserProfileController, 
    deleteUserController, 
    loginController,
};