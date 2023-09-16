import { getCookie } from "../../helpers/cookie";

function Home() {
  const token = getCookie("token");
  const fullName = getCookie("fullName");

  return (
    <>
      {token && (
        <>        
          <p>
            Xin chào, <strong>{fullName}</strong>
          </p>
          <p>Chúc mừng bạn đã đăng nhập thành công!</p>
          <hr style={{margin: "20px 0"}} />
        </>
      )}
      <p>
        Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến
        cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc
        nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập trình
        Frontend.
      </p>
      <p>
        Đối với các lập trình viên Frontend, website trắc nghiệm online cung cấp
        các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình trong
        các công nghệ và công cụ lập trình như HTML, CSS, Javascript, jQuery,
        Bootstrap, Angular, React, Vue,....
      </p>
    </>
  );
}
export default Home;
