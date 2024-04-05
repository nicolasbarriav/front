const mainUrl = "http://localhost:3000";
const myOptions = {
    method: "POST",
};

function fetchReset(){
    const myRequest = new Request(mainUrl+'/reset', myOptions);

    fetch(myRequest).then(() => {
        location.reload(); 
    });
    return 0;
}

function fetchPopulate(){
    const myRequest = new Request(mainUrl+'/populate', myOptions);

    fetch(myRequest).then(() => {
        location.reload(); 
    });
    
    return 0;
}

async function fetchUsers(){
    const response = (await fetch(mainUrl+'/users')).json();
    return response;
}
async function fetchPosts(){
    const response = (await fetch(mainUrl+'/posts')).json();
    return response;
}
async function fetchComments(postid){
    const response = (await fetch(mainUrl+'/comments')).json();
    return response;
}

async function showPosts(){
    var publications = await fetchPosts();
    var comments= await fetchComments();
    var users = await fetchUsers();

    // console.log(comments);
    for(post in publications){
        // console.log(publications[post]);
        HtmlPublication(users[publications[post].userid -1] , users, publications[post],comments);
    }
}

async function showPostsPerfil(user_id){
    // TODO: ORDENAR CRONOLOGICAMENTE
    var publications = await fetchPosts();
    var users = await fetchUsers();
    var comments= await fetchComments();

    const user = users[user_id - 1];
    // console.log(user);

    HtmlPerfil(user);

    for(post in publications){
        
        if(publications[post].userid == user_id){
            // console.log(publications[post]);
            HtmlPublication(user, users, publications[post],comments);
        }
    }
}


function HtmlPublication(user,users, post, comments){
    let username =user.username;
    let user_img = user.avatar;
    let post_title = post.title;
    let post_content = post.content;
    let img = post.image;
    let post_id = post.id;

    let url = `./perfil.html?userid=${user.id}`;
    let url2 = `./perfil.html?userid=`;

    let html_pub = document.createElement("div");
    html_pub.className="publicaction";

    // html_pub.innerHTML=`<div class='username'><img class="img02" src='${user_img}'><a href='${url}'>${username}</a>: <strong>${post_title}</strong></div> <div class='center-img'><img class='img00' src='${img}'></div><div class="content">${post_content}</div><div class='options'>    <input type='text' id='new_name' placeholder='comment'/>    <button onclick='postComment('${post_id}','${user_id}')'>Send</button>    </div><div class='comments'>   <div class='userComment'>        nicolas    </div>    <div class='comment'>        muy bueno    </div>    </div>`
    // TODO: TODOS LOS COMENTARIOS
    html_pub.innerHTML=`<div class='username'><img class="img02" src='${user_img}'><a href='${url}'>${username}</a>: <strong>${post_title}</strong></div> <div class='center-img'><img class='img00' src='${img}'></div><div class="content">${post_content}</div><div class='options'> <input type='text' id='new_comment${post.id}' placeholder='comment'/>    <button onclick='postComment(${post_id},1)'>Send</button></div><div class='comments'>`;
    for(comment in comments){
        if(comments[comment].postid == post_id){
            html_pub.innerHTML +=`<div class='combody'><div class='userComment'> <a href='${url2}${comments[comment].userid}'>${users[comments[comment].userid - 1].username}</a>:</div><div class='comment'> ${comments[comment].content}</div></div>`; 
            console.log(comments[comment].content);
        }
    }
    
    html_pub.innerHTML +="</div>"

    // const html_username = document.createElement("div").className="username";

    // const  html_img = document.createElement("img").className="img00";

    // const html_options= document.createElement("div").className="options";
    // const html_text = document.createElement("input").setAttribute("id","new_name").setAttribute("placeholder","comment");
    // const html_button = document.createElement("button","Send").setAttribute("onclick",postComment());

    // const html_comments = document.createElement("div").className="comments";
    // // hay que agregar todos los comments
    // const html_userComment = document.createElement("div",user).className="userComment";
    // const html_comment = document.createElement("div").className="comment";    
    
    document.getElementsByClassName("container")[0].appendChild(html_pub);
}

function HtmlPerfil(user){
    let username =user.username;
    let user_img = user.avatar;

    let html_peril = document.createElement("div");
    html_peril.className="publicaction";
    // console.log(html_pub);

    // TODO: TODOS LOS COMENTARIOS
    html_peril.innerHTML=`<div class='username'><img class="img02" src='${user_img}'><a href='/perfil/#/?userid=${user.id}'>${username}</a></div>`

    
    document.getElementsByClassName("perfil")[0].appendChild(html_peril);
}


function createPublication(posts, users){
}

function postComment(postid, userid){
    const content = document.getElementById(`new_comment${postid}`).value;
    
    const bod = {
        content:content,
        userid:userid,
        postid: postid
    }
    console.log(bod);
    const opt = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bod), // body data type must match "Content-Type" header
    };
    try{
        const myRequest = new Request(mainUrl+'/comments', opt);
        fetch(myRequest).then(() => {
            location.reload(); 
        });
    }catch (error) {
        console.error("Error:", error);
    }
    
    return 0;
}
