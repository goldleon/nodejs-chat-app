const expect = require("expect");

const {Users} = require("./users");

describe("Users", () => {
    var users; 
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'anass',
            room: 'Node Course'
        },{
            id: '2',
            name: 'React User',
            room: 'React Course'
        },{
            id: '3',
            name: 'node user',
            room: 'Node Course'
        }];
    });
    it("Should add new User", () => {

        // var users = new Users();
        var user = {
            id: '123',
            name: 'Anass',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(resUser).toEqual(user);
    });

    it('Should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user', () => {
        var userId = '7';
        var user = users.removeUser(userId);
        expect(typeof user).toBe('undefined');
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Should not find user', () => {
        var userId = '4';
        var user = users.getUser(userId);

        expect(typeof user).toBe("undefined");
    });


    it('Should return names for Node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['anass', 'node user']);
    });

    it('Should return names for React course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['React User']);
    });
});