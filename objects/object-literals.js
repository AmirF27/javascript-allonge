/*
 * Basic object literal representing a user.
**/

var user = {
    id: 1,
    name: {
        first: "Amir",
        last: "F. Aldeen"
    },
    username: "AmirF27",
    password: "12345",
    email: "amir@something.com",
    friends: [
        "User1",
        "User2",
        "User3"
    ],
    addFriend(username) {
        this.friends.push(username);
    },
    deleteFriend(username) {
        for (let idx in this.friends) {
            if (this.friends[idx] === username) {
                this.friends.splice(idx, 1);
                return true;
            }
        }

        return false;
    }
};

var userToAdd = "User4",
    userToDelete = "User2";

console.log(user.friends);
// Output:
// [ 'User1', 'User2', 'User3' ]

user.addFriend(userToAdd);
console.log(`${userToAdd} added to friends.`);
console.log(user.friends);
// Output:
// User4 added to friends.
// [ 'User1', 'User2', 'User3', 'User4' ]

if (user.deleteFriend(userToDelete)) {
    console.log(`${userToDelete} deleted from friends.`);
}
else {
    console.log(`${userToDelete} was not found in friends.`);
}
console.log(user.friends);
// Output:
// User2 deleted from friends.
// [ 'User1', 'User3', 'User4' ]

// object destructuring
var {name: {first: firstName}, friends: [firstFriend, ...restOfFriends]} = user;
console.log("First name:", firstName);
console.log("First friend:", firstFriend);
console.log("Rest of friends:", restOfFriends);
// Output:
// First name: Amir
// First friend: User1
// Rest of friends: [ 'User3', 'User4' ]
