# Jigsaw Puzzle 3
## I.Hướng dẫn:
### 1.Màn hình chính:
![a](https://i.ibb.co/Z6MmwQp/Untitled.png)
* Màn hình chính hiển thị danh sách các bộ sưu tập ảnh

### 2.Bộ sưu tập ảnh
![a](https://i.ibb.co/Wfsjs8B/Untitled.png)
* Sau khi chọn bộ sưu tập, danh sách người ảnh trong bộ sưu tập hiện ra, người chơi chọn ảnh trong bộ sưu tập để bắt đầu chơi

### 3.Màn hình chơi game
![a](https://i.ibb.co/Tb4T8KC/Untitled.png)
* Người chơi cần di chuyển cách mảnh ghép theo hàng hoặc theo cột.
* Các hàng hoặc cột cạnh nhau để đúng vị trí được di chuyển cùng lúc.
* Số lần di chuyển còn lại của người chơi được hiển thị ở phí trên cùng của màn hình.
* Người chơi hoàn thành bức hình trong số lần di chuyển cho trước sẽ dành chiến thắng.
* Ngược lại, khi lượt di chuyển trở về 0 mà bức hình vẫn chưa được hoàn thành, người chơi thất bại.
<br><br>

## II.Thêm dữ liệu
### 1.Thêm dữ liệu bộ sưu tập
![a](https://i.ibb.co/d4bJzkZ/Untitled.png)
* Mở file 'data-button.js', thêm thông tin nút vào button:
	* button[0] là thông tin về màn hình chính
		* name: Tiêu đề màn hình chính
		* headerColor: màu nền của phần header
	* Các button khác là thông tin về bộ sưu tập
		* name: Tên bộ sưu tập
		* headerColor: Màu header trong bộ sưu tập
		* butBackground: Nền của nút chọn bộ sưu tập

### 2.Thêm dữ liệu ảnh
![a](https://i.ibb.co/XYzbJ6f/image.png)
* Mở file 'data-game.js', thêm thông tin ảnh bào game:
	* id: Id của ảnh gồm 3 chữ số:
		* Chữ số đầu tiên: Số thứ tự của bộ sưu tập tương ứng với ảnh
		* Hai chữ số sau: Số thứ tụ của ảnh trong bộ sưu tập
	* path: Đường dẫn file ảnh (960x540)
	* background: Màu nền của màn hình chơi game
	* headerColor: Màu header của màn hình chơi game
	* rows: Số hàng mà ảnh sẽ được chia
	* cols: Số cột mà ảnh sẽ được chia
	* swaprow: Số lần đảo vị trí theo hàng
	* swapcol: Số lần đảo vị trí theo cột
	* moves: Số lần di chuyển tối đa

