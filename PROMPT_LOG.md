# NHẬT KÝ PROMPT ENGINEERING (VIBE CODING LOG)

- **Họ và tên:** Nguyễn Minh Nhật
- **MSSV:** [Điền MSSV của bạn]
- **Tên đề tài Website:** LUNE Studio — Website giới thiệu và trưng bày thời trang
- **Công cụ AI đã sử dụng:** ChatGPT

> **Lưu ý:** Đây là bản nhật ký mẫu được soạn theo quá trình xây dựng bộ mã nguồn. Sinh viên nên đọc lại, cập nhật các prompt/nhận xét cho đúng quá trình làm bài thực tế trước khi nộp.

## 1. Yêu cầu ban đầu (System/Initial Prompt)

> Hãy xây dựng website thời trang tên LUNE Studio bằng HTML5, CSS3 và JavaScript thuần. Thiết kế giao diện theo phong cách tối giản, cao cấp, màu kem và xanh olive, có responsive cho máy tính và điện thoại. Website cần có header/navigation, hero, danh mục thời trang, lưới sản phẩm, phần giới thiệu thương hiệu, form nhận tin và footer. Tuân thủ Semantic HTML5, dùng CSS Variables, Flexbox/Grid; tích hợp Animate.css và AOS; thêm hiệu ứng hover/focus dễ chịu. Tạo file index.html, style.css, script.js và PROMPT_LOG.md để đăng lên GitHub Pages.

## 2. Quá trình tinh chỉnh & Giải quyết sự cố (Iteration Iterations)

### Lần 1: Dựng khung Semantic HTML & CSS Variables

- **Prompt đã dùng:** Hãy dùng các thẻ semantic như `header`, `nav`, `main`, `section`, `article`, `form` và `footer` đúng ngữ nghĩa. Chỉ dùng `div` khi thực sự cần làm wrapper trình bày. Khai báo biến màu sắc, font, khoảng cách và transition ở `:root` trong CSS.
- **Kết quả AI tạo ra:** Khung trang gồm thanh thông báo, header, các section nội dung, danh sách sản phẩm và footer; CSS dùng biến màu và Grid/Flexbox để xây bố cục.
- **Nhận xét & tinh chỉnh của SV:** Kiểm tra thứ tự heading, nhãn form, thuộc tính `alt` cho hình ảnh và đảm bảo điều hướng có nhãn. Dùng `article` riêng cho từng sản phẩm để cấu trúc rõ ràng hơn.

### Lần 2: Thiết kế giao diện responsive và hoàn thiện UI/UX

- **Prompt đã dùng:** Hãy làm giao diện có tính thẩm mỹ hơn: dùng font serif cho heading, sans-serif cho nội dung; tạo nhiều khoảng trắng, màu nền kem, điểm nhấn olive, card ảnh tỷ lệ nhất quán và hiệu ứng hover. Bố cục phải chuyển thành một cột trên màn hình nhỏ, không xuất hiện tràn ngang.
- **Kết quả AI tạo ra:** Giao diện LUNE Studio với hero, category cards, product cards, phần câu chuyện thương hiệu, newsletter và footer; có breakpoint cho tablet và mobile.
- **Nhận xét & tinh chỉnh của SV:** Giữ màu sắc và khoảng cách thống nhất qua CSS Variables, giảm cỡ chữ/đổi lưới khi màn hình nhỏ, thêm trạng thái `:focus-visible` để hỗ trợ bàn phím.

### Lần 3: Tích hợp thư viện Animate.css & AOS

- **Prompt đã dùng:** Tích hợp Animate.css qua CDN để tạo hiệu ứng xuất hiện cho phần hero. Tích hợp AOS qua CDN cho các section và card sản phẩm khi cuộn trang; đặt thời lượng vừa phải, chỉ chạy một lần và tôn trọng thiết lập giảm chuyển động của người dùng.
- **Kết quả AI tạo ra:** Hero dùng `animate__animated animate__fadeInUp`; các section dùng `data-aos="fade-up"` hoặc hướng tương ứng; AOS được khởi tạo trong JavaScript.
- **Nhận xét & tinh chỉnh của SV:** Không dùng hiệu ứng cho mọi phần tử để tránh rối mắt. Thêm kiểm tra `window.AOS` nhằm tránh lỗi JavaScript nếu thư viện ngoài không tải được.

### Lần 4: Bổ sung tương tác và tự kiểm tra

- **Prompt đã dùng:** Hãy thêm chức năng lọc danh mục, tìm kiếm sản phẩm, nút thêm vào giỏ hàng và cập nhật tổng tiền, nút xóa món hàng, menu mobile và thông báo đăng ký nhận tin. Đây là bài demo nên không cần backend hoặc thanh toán thật; cần ghi rõ giới hạn đó cho người dùng.
- **Kết quả AI tạo ra:** `script.js` xử lý lọc và tìm kiếm sản phẩm, cập nhật số lượng giỏ hàng, tính tổng tạm thời, menu mobile, thông báo toast và form newsletter demo.
- **Thách thức gặp phải:** Các thành phần tương tác có thể mất đồng bộ khi lọc sản phẩm hoặc thêm nhiều món giống nhau vào giỏ hàng; thư viện CDN cũng phụ thuộc kết nối mạng.
- **Cách sửa prompt (Debug prompt):** “Hãy gom việc cập nhật giao diện giỏ hàng vào một hàm `renderCart()`, cộng số lượng khi sản phẩm đã có, dùng `data-filter` để lọc đúng danh mục, kiểm tra tồn tại của AOS trước khi gọi và ghi thông báo rõ rằng giỏ hàng/newsletter chỉ là demo.”
- **Kết quả sau tinh chỉnh:** Logic được tách thành các hàm nhỏ, có cập nhật số lượng và tổng tiền, trạng thái rỗng, nhãn truy cập cơ bản và thông báo giới hạn của bản demo.

## 3. Đánh giá cá nhân về quá trình Vibe Coding

- **AI đã giúp tiết kiệm thời gian ở phần nào nhất?** AI hỗ trợ dựng khung HTML, thiết lập bộ biến CSS và tạo bố cục responsive nhanh hơn. Nhờ đó, thời gian còn lại có thể dành cho việc xem lại nội dung, điều chỉnh giao diện và thử chức năng.
- **Bài học rút ra khi đặt câu hỏi (Prompt) cho AI trong thiết kế web?** Prompt nên nêu rõ mục tiêu website, nhóm người dùng, màu sắc, cấu trúc bắt buộc, công nghệ được phép dùng và kích thước màn hình cần hỗ trợ. Sau lần tạo đầu tiên, cần yêu cầu AI chỉnh từng vấn đề cụ thể thay vì chỉ nói chung chung rằng “làm đẹp hơn”. Sinh viên vẫn phải tự đọc mã nguồn, kiểm tra lỗi và hiểu những phần sẽ trình bày với giảng viên.
