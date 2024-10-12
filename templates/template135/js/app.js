// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getDatabase, onValue, push, ref, set,} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
// Firebase configuration (replace with your own Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCf7SsnI44vm30MP71lc0YVHHI6DtjP5Bc",
    authDomain: "myproject-fb3fe.firebaseapp.com",
    projectId: "myproject-fb3fe",
    storageBucket: "myproject-fb3fe.appspot.com",
    messagingSenderId: "1069308141712",
    appId: "1:1069308141712:web:68563fd4ce0b82c3a47815",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const add_data = document.getElementById("btn-submit-comment");

function sendGreetings() {
    const name = document.getElementById("name-comment").value;
    const content = document.getElementById("content").value;
    if (name !== "" && content !== "") {
        const newStudentRef = push(ref(db, "wedding-ht"));
        set(newStudentRef, {
            name: name,
            content: content,
        });
    }
    document.getElementById("name-comment").value = "";
    document.getElementById("content").value = "";
    ReadData();
}

add_data.addEventListener("click", sendGreetings);

// Read Data in real-time using onValue
function ReadData() {
    const userRef = ref(db, "wedding-ht/");
    onValue(userRef, (snapshot) => { // Sử dụng onValue để cập nhật dữ liệu theo thời gian thực
        const data = snapshot.val();
        const table = document.querySelector("#show-comments");
        let html = "";
        const keys = Object.keys(data).reverse();
        keys.forEach(key => {
            const {name, content} = data[key];
            html += `
                 <div class="box-comment pb-3">
                        <h4 class="mt-1 user-name-comment">${name}</h4>
                        <p class="m-0 comment-detail">${content}</p>
                    </div>
              `;
        });
        table.innerHTML = html;
    });
}

ReadData();