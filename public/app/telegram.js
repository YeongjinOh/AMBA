/**
 * Created by Lightsoo on 2016. 10. 28..
 */
requirejs(['online'], function (online) {

    //online.connect();

    var parent = div().append().size('auto', 'auto')
        .borderOption(1).borderOption('#EBE8E7', 'color');

    var teleHeader = div().appendTo(parent).size('auto','40').color('green').displayBlock();
    var headerTitle = div().appendTo(teleHeader).size('auto',40)
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .text('AMBATA').fontColor('white').fontSize(26);
    var headerFreinds = div().appendTo(teleHeader).size('auto',40)
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .text('친구목록').fontColor('white').fontSize(26);
    var headerRooms = div().appendTo(teleHeader).size('auto',40)
        .borderRight('solid 2px').borderRightColor('#EBE8E7')
        .paddingLeft(2).paddingRight(2)
        .text('채팅방 목록').fontColor('white').fontSize(26);



    //방목록 or 친구목록을 보여준다.
    var listView = div().appendTo(parent).size(328,550).overflow('scroll')
        .borderOption(1).borderOption('#EBE8E7', 'color');

    //채팅 내용
    var contentView = div().appendTo(parent).size(500,550).overflow('scroll')
        .borderOption(1).borderOption('#EBE8E7', 'color');

    //using div.deco()
    var friendView = function (dv) {
        dv.size('326','50').color('white')
            .borderOption(1).borderOption('#EBE8E7', 'color').displayBlock();
    };

    var setFriend = function (friendData) {
        var friend = div().appendTo(listView).deco(friendView);


        var profileWrapper = div().appendTo(friend).size(50, 50).padding(3);
        var profile = div().appendTo(profileWrapper).size('100%','100%').color('green');
        var name = div().appendTo(friend)
            .text(friendData.username);

        friend.hoverColor('black','white')
            .click(function () {
                contentView.text(name.text());
            });

    };

    //data
    var friendData = function (obj) {
       return {
            username : obj.username
       }
    };

    var NetworkManager = function () {
        this.getFreinds = function () {
            $.get('/users',{/*query*/}
                , function(result) {
                    //array
                    var friends = result.data.map(friendData);
                    console.log('friends\n', friends);
                    for(var i=0;i<friends.length;i++){
                        setFriend(friends[i]);
                    }
            });
            return this;
        };
        this.getRooms = function () {
            $.get('/users',{/*query*/}
                , function(result) {
                    //array
                    var friends = result.data.map(friendData)
                    for(var i=0;i<friends.length;i++){
                        setFriend(friends[i]);
                    }
                });
            return this;
        }
    };

    var networkManager = new NetworkManager();
    networkManager.getFreinds();

});