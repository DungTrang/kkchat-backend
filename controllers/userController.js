const User = require('../models/User');

// Đăng ký người dùng mới
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tạo người dùng mới
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Người dùng được tạo thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ký người dùng', error });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    res.json({ message: 'Đăng nhập thành công', user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng nhập', error });
  }
};

module.exports = { registerUser, loginUser };
