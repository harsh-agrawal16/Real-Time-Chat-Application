//helper functions declared here to manage the users in the application.
let users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const isPresent = users.find((user) => user.name === name && user.room === room);

    if(isPresent){
        console.log('Sorry , a user with this username is already present in the room');
        return {error : 'Username is already taken by another.'}
    }
    
    const user = {id, name, room};
    users = [...users, user];

    return {user : user};
}

const removeUser = (id) => {
    const userIndex = users.find((user) => user.id === id);

    if(userIndex !== -1){
        return users.splice(userIndex,1)[0];
    }
    // delete users[userIndex];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInOneRoom = (room) => {
    const usersInOneRoom = users.filter((user) => user.room === room);
    return usersInOneRoom;
}

module.exports = { addUser , removeUser, getUser , getUsersInOneRoom};