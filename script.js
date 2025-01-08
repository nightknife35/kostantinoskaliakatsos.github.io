infoWindow = document.getElementById('info-window');
musicPlayerWindow = document.getElementById('music-player-window');

// takes care of the transitions
window.onload = async function() {
    
    const divs = document.querySelectorAll('.ease-in');
    divs.forEach(div => {
        div.classList.add('fade-in');
    });

    const anchors = document.querySelectorAll('a');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            divs.forEach(div => {
                div.classList.add('fade-out');
            });
            setTimeout(() => {
                window.location.href = anchor.getAttribute('href');
            }, 500);
        });
    });  

    //--------------------------------------------------
    
        
    if(sessionStorage.getItem('info-btn-state') == "true"){
        navButtonClick('info-btn', 'info-window')
    }
    infoWindow.style.left = sessionStorage.getItem('info-window-x')
    infoWindow.style.top = sessionStorage.getItem('info-window-y')


    if(sessionStorage.getItem('music-btn-state') == "true"){
        navButtonClick('music-btn', 'music-player-window')
    }
    musicPlayerWindow.style.left = sessionStorage.getItem('music-window-x')
    musicPlayerWindow.style.top = sessionStorage.getItem('music-window-y')

};

/*
// takes care of the music
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play-pause-btn');
    const audioPlayer = document.getElementById('audioPlayer');


    pnp = true;
    playButton.addEventListener('click', function() {
        if(pnp){
            audioPlayer.play();
            document.getElementById("play-btn-icon").style.display = "none"
            document.getElementById("pause-btn-icon").style.display = "block"           
            pnp = !pnp
        }
        else{
            audioPlayer.pause();
            document.getElementById("play-btn-icon").style.display = "block"
            document.getElementById("pause-btn-icon").style.display = "none"
            pnp = !pnp
        }
    });
});
*/

// -----------------------------------------------------
function navButtonClick(btn_id, window_id){

    btn = document.getElementById(btn_id);
    info4Window = document.getElementById(window_id);
    x = btn.classList.toggle("selected");
    string = btn_id + '-state'
    sessionStorage.setItem(string, x);

    if(x){info4Window.style.visibility = "visible";}
    else{info4Window.style.visibility = "hidden";}
}


const makeDraggable = (windowElement, storagePrefix) => {
    windowElement.addEventListener("mousedown", (event) => {
        event.preventDefault();
        
        if (event.target.classList.contains("moveable")) {
            const rectX = event.clientX - windowElement.getBoundingClientRect().left;
            const rectY = event.clientY - windowElement.getBoundingClientRect().top;

            const moveHandler = (event) => {
                let x = event.clientX - rectX;
                let y = event.clientY - rectY;

                // Uncomment the following lines to enforce boundary limits
                /*
                const screenWidth = document.documentElement.clientWidth;
                const screenHeight = document.documentElement.clientHeight;
                const rectWidth = windowElement.getBoundingClientRect().width;
                const rectHeight = windowElement.getBoundingClientRect().height;

                if (x + rectWidth >= screenWidth) x = screenWidth - rectWidth;
                if (y + rectHeight >= screenHeight) y = screenHeight - rectHeight;
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                */

                windowElement.style.left = x + 'px';
                windowElement.style.top = y + 'px';
            };

            const stopMoving = () => {
                document.removeEventListener("mousemove", moveHandler);
                document.removeEventListener("mouseup", stopMoving);
                
                sessionStorage.setItem(`${storagePrefix}-x`, windowElement.style.left);
                sessionStorage.setItem(`${storagePrefix}-y`, windowElement.style.top);
            };

            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", stopMoving);
        }
    });
};

makeDraggable(infoWindow, 'info-window');
makeDraggable(musicPlayerWindow, 'music-window');








msg_counter = 0;
const msgs = [
    { p: "are u sure u want to leave?", left: "yes", right: "no" },
    { p: "u clicked yes, is that correct?", left: "yes", right: "no" },
    { p: "really?", left: "yes", right: "no" },
    { p: "theres more cool stuff to see!", left: "i wanna leave", right: "ok ill stay" },
    { p: "dont you want to stay a little longer?", left: "i said wanna leave", right: "ok ill stay" },
    { p: ":(", left: "dont give me that", right: "fine ill stay" },
    { p: "So, you're definitely leaving?", left: "yes", right: "no" },
    { p: "ok, click yes if u want to leave", left: "no", right: "yes" },
    { p: "aaahh u caught that!", left: "i did", right: "well played, ill stay" },
    { p: "well played good sir", left: "will u now let me go", right: "thank you" },
    { p: "u still remember that huh", left: "yes, let me go", right: "yes, but ill stay" },
];

box = document.getElementById("sure-u-wanna-leave");
box2msg = null
box1msg = null
button1text = null
button2text = null

function closeFunction(){
    box.style.visibility = "hidden";
    msg_counter = 0;
    box1msg.innerHTML = msgs[msg_counter].p
    button1text.innerHTML = msgs[msg_counter].left
    button2text.innerHTML = msgs[msg_counter].right
    document.body.style.pointerEvents = "all"

}

function rightbtn_x(){
    if(box1msg.innerHTML == "ok, click yes if u want to leave"){
        box1msg.innerHTML = msgs[msg_counter].p;
        button1text.innerHTML = msgs[msg_counter].left;
        button2text.innerHTML = msgs[msg_counter].right;
        msg_counter++;
    }else{
        closeFunction()
    }
}

function leftbtn(){
    if(msg_counter == msgs.length){
        box2msg.innerHTML = '<p id="mesg">ok ill let u go... but itll take some time, to... umm. load stuff and... do things to prepare for that \nIn the meantime u can expore this website :). Ill let u know when its time :)</p>'
        
        box.style.alignItems = 'center';
        box.style.justifyContent = 'space-evenly';
        box.style.margin = '5px';
        box.style.fontSize= '15px';

    }
    else{
        if(box1msg.innerHTML == "ok, click yes if u want to leave"){
            closeFunction() 
        }
        else{
            box1msg.innerHTML = msgs[msg_counter].p;
            button1text.innerHTML = msgs[msg_counter].left;
            button2text.innerHTML = msgs[msg_counter].right;
            msg_counter++;
        }
    }
}


function openWindow(){
    box.style.visibility = "visible";
    box2msg = document.getElementById('mesg2');
    box2msg.innerHTML = '<p id="mesg">are u sure u want to leave?</p><div id="yes-no-buttons"><button id="btn1text" onclick="leftbtn()">yes</button><button id="btn2text" onclick="rightbtn_x()">no</button></div>'
    
    
    box1msg = document.getElementById('mesg');
    button1text = document.getElementById('btn1text');
    button2text = document.getElementById('btn2text');

    
    document.body.style.pointerEvents = "none"
    box.style.pointerEvents = "all"

}

cbox =  document.querySelector("#card-box")
fc =  document.querySelector("#filter-by-category")

big_window = document.querySelector("#all-projects")
project =  document.querySelector("#project")
project.style.visibility = 'hidden'
project.style.position = 'absolute'

cards = document.querySelectorAll(".card")

cards.forEach(card => {
    card.addEventListener('click', () =>{
        console.log(1)
        big_window.style.visibility = 'hidden'
        project.style.visibility = 'visible'
    })
});



function gooooooooo(){
    project.style.visibility = 'hidden'
    big_window.style.visibility = 'visible'
}

function filterz(){
    fc.classList.toggle("inviziBILL")
    cbox.classList.toggle("inviziBILL")
}