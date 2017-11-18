var comments = [{
        "id": 1,
        "comment_text": "asdasdadasdsadsadadsa",
        "author": "kunalganglani",
        "post_id": 1,
        "ancestry": null,
        "archived": false,
        "created_at": "2007-12-15T22:24:17Z",
        "updated_at": "2007-12-15T22:24:17Z",
        "is_moderated": false,
        "numOfLikes": 4,
        "numOfDislikes": 1,
        "avatar_url": null,
        "slug": null,
        "blog_id": 2,
        "children": [

        ]
    },
    {
        "id": 2,
        "comment_text": "idlsfghlskdhvbsldfhjdsl",
        "author": "thehulk",
        "post_id": 1,
        "ancestry": null,
        "archived": false,
        "created_at": "2008-12-15T22:24:17Z",
        "updated_at": "2008-12-15T22:24:17Z",
        "is_moderated": false,
        "numOfLikes": 3,
        "numOfDislikes": 1,
        "avatar_url": null,
        "slug": null,
        "blog_id": 2,
        "children": [{
            "id": 3,
            "comment_text": "note no 3",
            "author": "thehulk",
            "post_id": 1,
            "ancestry": "2",
            "archived": false,
            "created_at": "2009-12-15T22:24:17Z",
            "updated_at": "2009-12-15T22:24:17Z",
            "is_moderated": false,
            "numOfLikes": 1,
            "numOfDislikes": 2,
            "avatar_url": null,
            "slug": null,
            "blog_id": 2,
            "children": [{
                "id": 4,
                "comment_text": "note num 4",
                "author": "ironman",
                "post_id": 1,
                "ancestry": "2/3",
                "archived": false,
                "created_at": "2010-12-15T22:24:17Z",
                "updated_at": "2010-12-15T22:24:17Z",
                "is_moderated": false,
                "numOfLikes": 1,
                "numOfDislikes": 0,
                "avatar_url": null,
                "slug": null,
                "blog_id": 2,
                "children": [{
                    "id": 5,
                    "comment_text": "note numb 5",
                    "author": "ironman",
                    "post_id": 1,
                    "ancestry": "2/3/4",
                    "archived": false,
                    "created_at": "2007-12-15T22:24:17Z",
                    "updated_at": "2007-12-15T22:24:17Z",
                    "is_moderated": false,
                    "numOfLikes": 0,
                    "numOfDislikes": 0,
                    "avatar_url": null,
                    "slug": null,
                    "blog_id": 2,
                    "children": [

                    ]
                }]
            }]
        }]
    }
];

function addOptions() {

    addPostEvent();
    addButtonEvents();

    var jsonArray = JSON.parse(data);
    var select = document.getElementById('dd');
    var option;
    for (var i = 0; i < jsonArray.length; i++) {
        option = document.createElement('option');
        option.text = jsonArray[i]["username"];
        select.add(option);
    }
    loadComments();
}

function createTemplate(comment) {
    var tmpl = document.getElementById('comment-template').content.cloneNode(true);
    tmpl.querySelector('.usernameStyle').innerText = comment.author;
    tmpl.querySelector('.timeStampStyle').innerText = prettyDate(comment.updated_at);
    tmpl.querySelector('.commentText').innerText = comment.comment_text;
    jQuery.data(tmpl.querySelector('.commentText'),"key",comment);
    return tmpl;
}

function loadComments() {

    // Get a reference to the comments list in the main DOM.
    var commentsList = document.getElementById('content');

    // Loop through each of the comments and add them to the comments list.
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        var tmpl = createTemplate(comment);
        var parentComment = commentsList.appendChild(tmpl);
        // parentComment.data("commentObj", comment);
        if (comment.children.length != 0) {
            addChilds(parentComment, comment.children)
        }

    }

}

function addChilds(parentObj, childs) {
    for (var i = 0; i < childs.length; i++) {
        var comment = childs[i];
        var tmpl = createTemplate(comment);
        var y = parentObj.appendChild(tmpl);
        if (childs[0].ancestry) {
            var mar = childs[0].ancestry.split('/').length;
            parentObj.children[0].style.marginLeft = (mar * 40) + 5 + "px";
        } else {
            parentObj.children[0].style.marginLeft = (i + 1) * 10 + "px";
        }
        document.getElementById('content').appendChild(parentObj);
        if (comment.children.length != 0) {
            addChilds(y, comment.children)
        }
    }

}

function addComment() {
    // console.log('comment added');
    var commentsList = document.getElementById('content');

    var tmpl = document.getElementById('comment-template').content.cloneNode(true);
    tmpl.querySelector('.usernameStyle').innerText = document.getElementById('dd').value;
    tmpl.querySelector('.commentText').innerText = document.getElementsByClassName('postText')[0].value;

    // tmpl.querySelector('.timeStampStyle').innerText = prettyDate(comment.updated_at);
    // tmpl.querySelector('.numOfLikes').innerText = formatReaction("0");
    // tmpl.querySelector('.numOfDislikes').innerText = formatReaction("0");

    // tmpl.querySelector('.commentText').innerText = comment.comment_text;
    commentsList.appendChild(tmpl);

}

function formatReaction(numOfReaction) {
    if (Number(numOfReaction) === 0) {
        return '';
    }
    return numOfReaction;

}

function prettyDate(time) {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    var myDate = new Date(time)
    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return myDate.getDate() + '/' + myDate.getMonth() + '/' + myDate.getFullYear();

    return day_diff == 0 && (
        diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}

function addPostEvent() {

    document.querySelector('.postText').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            addComment();
            this.value = "";
            alert('Comment Posted Successfuly');
        }
    });
    document.querySelector('.postText').addEventListener('focus', function (e) {
        if (this.value === "Type to make note..") {
            this.value = '';
        }
    });
    document.querySelector('.postText').addEventListener('blur', function (e) {
        if (this.value === "") {
            this.value = 'Type to make note..';
        }
    });
}

function addButtonEvents() {
    document.addEventListener('click', function (e) {
        if (hasClass(e.target, 'buttonStyle')) {
            let parentCommentId = jQuery.data(e.target.parentElement.previousElementSibling).key.id;
            let parentAncestory = jQuery.data(e.target.parentElement.previousElementSibling).key.ancestry;
            let newCommentAncestry;
            if(parentAncestory === null){
                newCommentAncestry = "2";
            }
            else{
                let childLevel = Number(parentAncestory.split('/')[parentAncestory.split('/').length-1])+1;
                newCommentAncestry = parentAncestory + "/"+ childLevel;
            }
            if (e.target.innerText === "New Note") {
                bootbox.prompt("Please enter your note.", function (result) {
                    var newComment = {
                        "id": comments.length,
                        "comment_text": result,
                        "author": "kunalganglani",
                        // "post_id": 1,
                        "ancestry": newCommentAncestry,
                        "archived": false,
                        "created_at": "2007-12-15T22:24:17Z",
                        "updated_at": "2007-12-15T22:24:17Z",
                        "is_moderated": false,
                        "numOfLikes": 4,
                        "numOfDislikes": 1,
                        "avatar_url": null,
                        "slug": null,
                        "blog_id": 2,
                        "children": [
                
                        ]
                    };
                    function addNewComment(comment){
                        
                            if(comment.id === parentCommentId){
                                comment.children.push(newComment);
                                return;
                            }
                            if(comment.children.length>0){
                                for(var childComment of comment.children){
                                    addNewComment(childComment)   
                                }
                            }
                            
                    } 
                    for(var comment of comments){
                        addNewComment(comment)   
                    }
                    
                    // comments.splice(parentCommentId, 0, newComment);   
                    document.getElementById("content").innerHTML = '';
                    loadComments(); // reloading comment as there may be an update from other users of app
                    
                })
            }
            if (e.target.innerText === "Delete Note") {
                comments = comments.filter(function removeItem(item) {
                        if(item.children.length){
                            item.children = item.children.filter(function(child){
                                if(child.children.length){
                                    removeItem(child)
                                }
                                return child.id !== parentCommentId; 
                            })
                        }
                        
                    return item.id !== parentCommentId;
                });

                // comments.splice(parentCommentId, 1);
                document.getElementById("content").innerHTML = '';
                loadComments(); // reloading comment as there may be an update from other users of app
            }
        }
    }, false);
}

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}