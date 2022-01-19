/**
 *  getUser 는 로딩시 사용자 정보를 가져오는 함수입니다.
 */
async function getUser() {
    console.log("getUser 실행");
    try {
        // const res=await axios.get("/users");
        const res=await axios.get("/users");
        const users=res.data;
        const list=document.getElementById("list");
        list.innerHTML="";

        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            const userDiv=document.createElement("div");
            const span=document.createElement("span");
            span.textContent=users[key];

            const edit=document.createElement("button");
            edit.textContent="수정";

            edit.addEventListener("click", async ()=>{
                const name=prompt("바꿀 이름을 입력하세요");
                if (!name) return alert("이름을 반드시 입력하셔야 합니다.");

                try{
                    await axios.put("/user"+key, { name });
                    getUser();
                } catch (err) {
                    console.log(err);
                }
            });

            const remove=document.createElement("button");
            remove.textContent="삭제";
            remove.addEventListener("click", async()=>{
                try {
                    await axios.delete("/user/"+key);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            })

            userDiv.appendChild(span);
            userDiv.appendChild(submit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(data);
        }); // End of Object.keys(users).map();
    } catch(err) {
        console.error(err);
    } // Enf of try catch
}

window.onload=getUser;

// 폼 제출시 실행
document.getElementById("form").addEventListener("submit", async(event)=>{
    event.preventDefault();

    const name=event.target.username.value;
    if (!name) return alert("이름을 입력하세요");

    try {
        await axios.post("/user", { name });
        getUser();
    } catch (error) {
        console.error(error);
    }
    event.target.username.value="";
})