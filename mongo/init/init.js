var newUsers = [
  {
        user: 'teamportal',
        pwd: 'nekoneko2255deltalab',
        roles: [
            {
                role: 'readWrite',
                db: 'tlab'
            }
        ]
    }
];

var currentUsers = db.getUsers();
if (currentUsers.length === newUsers.length) {
    quit();
}
db.dropAllUsers();

for (var i = 0, length = newUsers.length; i < length; ++i) {
    db.createUser(newUsers[i]);
}
