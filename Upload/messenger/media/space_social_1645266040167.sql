-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 16, 2022 lúc 07:01 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `space_social`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `member_room_chat`
--

CREATE TABLE `member_room_chat` (
  `id` bigint(20) NOT NULL,
  `idRoom` varchar(200) NOT NULL,
  `idUser` varchar(200) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `member_room_chat`
--

INSERT INTO `member_room_chat` (`id`, `idRoom`, `idUser`, `create_at`, `update_at`) VALUES
(0, '1', '333de9a0-7c31-11ec-bd00-6999f228e63a', '2022-01-25 12:06:18', '2022-02-06 08:31:04'),
(1, '1', '847c4b30-7c32-11ec-bd00-6999f228e63a', '2022-01-25 12:06:30', '2022-02-06 08:31:07'),
(2, '2', '333de9a0-7c31-11ec-bd00-6999f228e63a', '2022-01-26 01:48:06', '2022-02-06 08:31:09'),
(3, '2', '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '2022-01-26 01:48:19', '2022-02-06 08:31:13'),
(4, '3', '333de9a0-7c31-11ec-bd00-6999f228e63a', '2022-02-06 08:30:48', '2022-02-06 08:31:18'),
(5, '3', '847c4b30-7c32-11ec-bd00-6999f228e63a', '2022-02-06 08:31:38', '2022-02-06 08:31:38'),
(6, '3', '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '2022-02-06 08:31:49', '2022-02-06 08:31:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL,
  `sourceId` varchar(200) NOT NULL,
  `targetId` varchar(200) NOT NULL,
  `type` bigint(20) NOT NULL,
  `read` tinyint(1) NOT NULL,
  `trash` tinyint(1) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `notification`
--

INSERT INTO `notification` (`id`, `sourceId`, `targetId`, `type`, `read`, `trash`, `create_at`, `update_at`) VALUES
(13, 'a7507d10-87f5-11ec-acc3-374cbbf66052', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 0, 0, '2022-02-15 04:57:27', '2022-02-15 04:57:27'),
(14, '15c06180-8a57-11ec-9f39-ad966a268645', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 0, 0, '2022-02-14 07:55:39', '2022-02-14 07:55:39'),
(20, '89bb4770-8a58-11ec-9f39-ad966a268645', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, 0, 0, '2022-02-10 10:10:28', '2022-02-10 10:10:28'),
(32, '89bb4770-8a58-11ec-9f39-ad966a268645', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 0, 0, '2022-02-10 10:45:52', '2022-02-10 10:45:52'),
(34, '333de9a0-7c31-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 2, 0, 0, '2022-02-15 04:57:35', '2022-02-15 04:57:35'),
(39, '847c4b30-7c32-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 1, 0, 0, '2022-02-14 06:48:31', '2022-02-14 06:48:31'),
(40, '847c4b30-7c32-11ec-bd00-6999f228e63a', '89bb4770-8a58-11ec-9f39-ad966a268645', 2, 0, 0, '2022-02-14 07:28:44', '2022-02-14 07:28:44'),
(41, '333de9a0-7c31-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 1, 0, 0, '2022-02-15 04:58:12', '2022-02-15 04:58:12'),
(42, 'a7507d10-87f5-11ec-acc3-374cbbf66052', '333de9a0-7c31-11ec-bd00-6999f228e63a', 2, 0, 0, '2022-02-15 04:58:22', '2022-02-15 04:58:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification_template`
--

CREATE TABLE `notification_template` (
  `id` bigint(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(2048) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `notification_template`
--

INSERT INTO `notification_template` (`id`, `title`, `description`, `create_at`, `update_at`) VALUES
(1, 'Kết bạn', 'đã gửi lời mời kết bạn cho bạn.', '2022-02-10 02:19:31', '2022-02-10 02:19:31'),
(2, 'Đồng ý kết bạn', 'đã đồng ý lời mời kết bạn.', '2022-02-10 02:19:58', '2022-02-10 02:19:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_comment`
--

CREATE TABLE `post_comment` (
  `id` bigint(20) NOT NULL,
  `idUser` varchar(200) NOT NULL,
  `idPost` varchar(200) NOT NULL,
  `comment` tinytext NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `post_comment`
--

INSERT INTO `post_comment` (`id`, `idUser`, `idPost`, `comment`, `create_at`, `update_at`) VALUES
(1, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'Quá đẹp luôn', '2022-01-24 06:45:45', '2022-01-24 06:45:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_emotion`
--

CREATE TABLE `post_emotion` (
  `id` bigint(20) NOT NULL,
  `idUser` varchar(200) NOT NULL,
  `idPost` varchar(200) NOT NULL,
  `emotion` smallint(6) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `post_emotion`
--

INSERT INTO `post_emotion` (`id`, `idUser`, `idPost`, `emotion`, `create_at`, `update_at`) VALUES
(1, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 1, '2022-01-24 05:07:01', '2022-01-24 05:07:01'),
(2, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 1, '2022-01-24 05:07:37', '2022-01-24 05:07:37'),
(3, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 1, '2022-01-24 06:27:01', '2022-01-24 06:27:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_chat`
--

CREATE TABLE `room_chat` (
  `id` varchar(200) NOT NULL,
  `type` smallint(6) NOT NULL,
  `nameRoom` tinytext DEFAULT NULL,
  `avatarRoom` varchar(200) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `room_chat`
--

INSERT INTO `room_chat` (`id`, `type`, `nameRoom`, `avatarRoom`, `create_at`, `update_at`) VALUES
('1', 1, NULL, NULL, '2022-01-25 12:05:34', '2022-01-25 14:42:02'),
('2', 1, NULL, NULL, '2022-01-26 01:47:46', '2022-01-26 01:47:46'),
('3', 2, 'Nhóm 3', NULL, '2022-02-06 08:30:27', '2022-02-06 08:30:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `share_post`
--

CREATE TABLE `share_post` (
  `id` bigint(20) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  `idPost` varchar(50) NOT NULL,
  `type` smallint(6) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `passwordHash` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `registeredAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `passwordHash`, `email`, `registeredAt`) VALUES
('15c06180-8a57-11ec-9f39-ad966a268645', 'thanh', '$2a$12$5AObKYrPde243BSxe3ucwOx460R5fqt2Bv7Xg0Dunc2Yn6JkpfrMW', 'ncthanh@gmail.com', '2022-02-10 09:51:57'),
('333de9a0-7c31-11ec-bd00-6999f228e63a', 'chien', '$2a$12$9gzJ.D/JsGiwH0BOve2B1uyxh9ab/YPpPYdYBd29L4af8SdjfjdO2', 'chien@gmail.com', '2022-01-23 09:45:30'),
('68837de0-7cdc-11ec-bd2d-f12fabebfd3c', 'teo', '$2a$12$FnYIamJw39B9qBpgmDG/ieVQojYPPddggtWNrHCrc4lGCVww6OzSq', 'teo@gmail.com', '2022-01-24 06:11:03'),
('847c4b30-7c32-11ec-bd00-6999f228e63a', 'trung', '$2a$12$vbygADIL.J2K6i8JpSeHkOj5WXJjLCHCtt.t60moCz1x9dUbLzBCC', 'hvtrung@gmail.com', '2022-01-23 09:54:55'),
('89bb4770-8a58-11ec-9f39-ad966a268645', 'dung', '$2a$12$oV7xNCzu4IU/0VV4uxojEObHGTvI6XcFWhZ0FXh93LgAhLYK9FyfC', 'dung@gmail.com', '2022-02-10 10:02:21'),
('a7507d10-87f5-11ec-acc3-374cbbf66052', 'ty', '$2a$12$SArqSfThGrkcMfKqtqRQ1uaksUxNBaPQj5BqCXNHptH5V8hNlrPzG', 'ty@gmail.com', '2022-02-07 09:09:29'),
('f2cccdf0-8a5e-11ec-8d9c-938e329ec0bc', 'thuan', '$2a$12$X9s5vHtoILS.yF9uojsaCuxh1XzP2r45mcorfcqH90nD9f4MhwcqW', 'thuan@gmail.com', '2022-02-10 10:48:15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_detail`
--

CREATE TABLE `user_detail` (
  `id` int(11) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `intro` tinytext NOT NULL,
  `profile` text NOT NULL,
  `lastLogin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_detail`
--

INSERT INTO `user_detail` (`id`, `idUser`, `firstName`, `lastName`, `avatar`, `intro`, `profile`, `lastLogin`) VALUES
(1, '333de9a0-7c31-11ec-bd00-6999f228e63a', 'Nguyễn', 'Chiến', '/upload/avatar/anh900080.jpg', '', '', '2022-02-15 13:04:50'),
(4, '847c4b30-7c32-11ec-bd00-6999f228e63a', 'Hồ', 'Trung', NULL, '', '', '2022-02-14 14:30:21'),
(5, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', 'Nguyễn', 'Tèo', NULL, '', '', '2022-02-14 15:07:58'),
(6, 'a7507d10-87f5-11ec-acc3-374cbbf66052', 'Trần', 'Tý', NULL, '', '', '2022-02-15 12:07:28'),
(7, '15c06180-8a57-11ec-9f39-ad966a268645', 'Nguyễn', 'Thành', NULL, '', '', '2022-02-14 15:00:36'),
(8, '89bb4770-8a58-11ec-9f39-ad966a268645', 'Nguyễn', 'Dũng', NULL, '', '', '2022-02-14 14:44:31'),
(9, 'f2cccdf0-8a5e-11ec-8d9c-938e329ec0bc', 'Nguyễn', 'Thuần', NULL, '', '', '2022-02-10 17:54:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_follower`
--

CREATE TABLE `user_follower` (
  `id` bigint(20) NOT NULL,
  `sourceId` varchar(50) NOT NULL,
  `targetId` varchar(50) NOT NULL,
  `type` smallint(6) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_follower`
--

INSERT INTO `user_follower` (`id`, `sourceId`, `targetId`, `type`, `create_at`, `update_at`) VALUES
(1, '333de9a0-7c31-11ec-bd00-6999f228e63a', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, '2022-01-28 03:01:26', '2022-01-28 03:01:26'),
(2, '333de9a0-7c31-11ec-bd00-6999f228e63a', '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', 1, '2022-01-28 03:01:42', '2022-01-28 03:01:42'),
(3, '847c4b30-7c32-11ec-bd00-6999f228e63a', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, '2022-01-28 03:01:58', '2022-01-28 03:01:58'),
(4, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, '2022-01-28 03:02:15', '2022-01-28 03:02:15'),
(5, '847c4b30-7c32-11ec-bd00-6999f228e63a', '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', 1, '2022-01-28 03:02:32', '2022-01-28 03:02:32'),
(8, '15c06180-8a57-11ec-9f39-ad966a268645', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, '2022-02-10 10:01:25', '2022-02-10 10:01:25'),
(9, '89bb4770-8a58-11ec-9f39-ad966a268645', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, '2022-02-10 10:02:33', '2022-02-10 10:02:33'),
(10, '89bb4770-8a58-11ec-9f39-ad966a268645', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, '2022-02-10 10:10:28', '2022-02-10 10:10:28'),
(12, '847c4b30-7c32-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 1, '2022-02-14 06:38:45', '2022-02-14 06:38:45'),
(13, 'a7507d10-87f5-11ec-acc3-374cbbf66052', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, '2022-02-14 07:01:22', '2022-02-14 07:01:22'),
(14, '847c4b30-7c32-11ec-bd00-6999f228e63a', '89bb4770-8a58-11ec-9f39-ad966a268645', 1, '2022-02-14 07:12:28', '2022-02-14 07:12:28'),
(17, '333de9a0-7c31-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 1, '2022-02-15 04:58:11', '2022-02-15 04:58:11'),
(18, 'a7507d10-87f5-11ec-acc3-374cbbf66052', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, '2022-02-15 04:58:22', '2022-02-15 04:58:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_friend`
--

CREATE TABLE `user_friend` (
  `id` int(11) NOT NULL,
  `sourceId` varchar(50) NOT NULL,
  `targetId` varchar(50) NOT NULL,
  `type` smallint(6) NOT NULL,
  `status` smallint(6) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_friend`
--

INSERT INTO `user_friend` (`id`, `sourceId`, `targetId`, `type`, `status`, `create_at`, `update_at`) VALUES
(1, '333de9a0-7c31-11ec-bd00-6999f228e63a', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, 1, '2022-01-24 05:10:33', '2022-01-24 05:10:33'),
(2, '847c4b30-7c32-11ec-bd00-6999f228e63a', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 1, '2022-01-24 05:10:58', '2022-01-24 05:10:58'),
(3, '333de9a0-7c31-11ec-bd00-6999f228e63a', '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', 1, 1, '2022-01-24 06:12:07', '2022-01-24 06:12:07'),
(4, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 1, '2022-01-24 06:12:21', '2022-01-24 06:12:21'),
(30, '89bb4770-8a58-11ec-9f39-ad966a268645', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, 1, '2022-02-10 10:10:28', '2022-02-14 07:28:44'),
(42, '89bb4770-8a58-11ec-9f39-ad966a268645', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 0, '2022-02-10 10:45:51', '2022-02-10 10:45:51'),
(49, '847c4b30-7c32-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 1, 1, '2022-02-14 06:48:30', '2022-02-14 07:01:22'),
(50, 'a7507d10-87f5-11ec-acc3-374cbbf66052', '847c4b30-7c32-11ec-bd00-6999f228e63a', 1, 1, '2022-02-14 07:01:22', '2022-02-14 07:15:48'),
(58, '847c4b30-7c32-11ec-bd00-6999f228e63a', '89bb4770-8a58-11ec-9f39-ad966a268645', 1, 1, '2022-02-14 07:28:44', '2022-02-14 07:28:44'),
(62, '333de9a0-7c31-11ec-bd00-6999f228e63a', 'a7507d10-87f5-11ec-acc3-374cbbf66052', 1, 1, '2022-02-15 04:58:11', '2022-02-15 04:58:22'),
(63, 'a7507d10-87f5-11ec-acc3-374cbbf66052', '333de9a0-7c31-11ec-bd00-6999f228e63a', 1, 1, '2022-02-15 04:58:22', '2022-02-15 04:58:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_message`
--

CREATE TABLE `user_message` (
  `id` bigint(20) NOT NULL,
  `sourceId` varchar(50) NOT NULL,
  `idRoom` varchar(200) NOT NULL,
  `message` tinytext NOT NULL,
  `typeMess` smallint(6) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_message`
--

INSERT INTO `user_message` (`id`, `sourceId`, `idRoom`, `message`, `typeMess`, `create_at`, `update_at`) VALUES
(22, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19JV36X2JWeHHIxjeBfET3u0Oczy7XsFjs=', 0, '2022-01-30 06:17:49', '2022-01-30 06:17:49'),
(23, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/LoBvlClfuQlnKimD+bOho17iEvwBuE7k=', 0, '2022-01-30 06:17:51', '2022-01-30 06:17:51'),
(24, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+qedHLdAqdROv1stJV1UtBPBf/QPx10Ug8uk/W4hrm31OUOHsUGXGp', 0, '2022-01-30 06:20:13', '2022-01-30 06:20:13'),
(25, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX18uKngQzwOMXKmrZzMQ048YZiIqTJ/QGPQ=', 0, '2022-01-30 06:20:28', '2022-01-30 06:20:28'),
(26, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'U2FsdGVkX18oCOW/51ayFYWLQcZ9HordYbOYzWr9fy0=', 0, '2022-01-30 06:21:57', '2022-01-30 06:21:57'),
(27, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '2', 'U2FsdGVkX186sWYeRkIVaAn9Hlc8kK/BntAeJc9Z4HM=', 0, '2022-01-30 06:23:51', '2022-01-30 06:23:51'),
(28, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+NCBjLRPtlevGkSqsi3VELBGXIU1sYKEQ=', 0, '2022-02-04 06:56:17', '2022-02-04 06:56:17'),
(29, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19xw2rsrcANk/Udte1lplZxNC7Yie/lzHirZqJ9ojxzhDcYKd87Q/iH', 0, '2022-02-05 03:55:05', '2022-02-05 03:55:05'),
(30, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/e+4hEMxjwH1NWY408zU5CiaZT1UA16tE=', 0, '2022-02-05 03:55:28', '2022-02-05 03:55:28'),
(31, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/5w2pAtQI7rEvt97ueKi5Cg7tYjsGUVn0=', 0, '2022-02-05 03:56:17', '2022-02-05 03:56:17'),
(32, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/1y1t5nEFA82hwh/knN5HKc0cAReUsNm8=', 0, '2022-02-05 03:56:40', '2022-02-05 03:56:40'),
(33, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/CEu+SsDi6VW1rbinYNUZHsC0UcQcoewU=', 0, '2022-02-06 08:09:10', '2022-02-06 08:09:10'),
(34, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/fU/ZchymBWYRNyGc0gMeWR5ebc5HkhXI=', 0, '2022-02-06 08:09:47', '2022-02-06 08:09:47'),
(36, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX18mckeEA2VAdY8ICrQRYzrBC2NP9eu5gWw=', 0, '2022-02-06 08:56:02', '2022-02-06 08:56:02'),
(37, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+Fs6s+FEe9GbvOkR3HbFd9TncjsqjWC3w=', 0, '2022-02-06 08:56:56', '2022-02-06 08:56:56'),
(38, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/bfDEoyrb8wPiD7IjTBR7YliRuENNV94Ax6IGTaxint0coUGnn/lVb', 0, '2022-02-06 08:57:37', '2022-02-06 08:57:37'),
(39, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '3', 'U2FsdGVkX18RzNfR4fQ+SoNRJ6VvcYGh+en3T8C0cb8=', 0, '2022-02-06 08:58:12', '2022-02-06 08:58:12'),
(40, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX194vCuzhHLpxaYoW4s1gk1HEbf7f15yOM4=', 0, '2022-02-06 09:14:49', '2022-02-06 09:14:49'),
(41, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX18riG9z+UdPnIQrZ+1DDsx9EOWxIV4e+4U=', 0, '2022-02-06 09:15:32', '2022-02-06 09:15:32'),
(42, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/CgTdmxlcGYdAS/VKNkFDRZeIkqpsp+pdtGl/E81mT+PCf4H95fZ8j', 0, '2022-02-06 09:15:57', '2022-02-06 09:15:57'),
(47, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1976J/Vl5zX+MYwo2mlrPCXMEZyUJOoQ5o=', 0, '2022-02-06 10:07:09', '2022-02-06 10:07:09'),
(48, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/PsPNTaDYCSRW95LMljEVkq6avrSr6/fw=', 0, '2022-02-06 10:10:52', '2022-02-06 10:10:52'),
(49, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/Zc4iB7n30orLfECJeSrPTp/ViDdL4Gng=', 0, '2022-02-06 10:12:02', '2022-02-06 10:12:02'),
(50, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '2', 'U2FsdGVkX19X4SfmOan7jH7St655ggA/9SyagA/7kmg=', 0, '2022-02-06 12:51:52', '2022-02-06 12:51:52'),
(51, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/4U5Kx0dmunCOiF4Gj+03CRPFhZFWuWEE=', 0, '2022-02-07 04:02:26', '2022-02-07 04:02:26'),
(52, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/+kDm65GadSxGy04K07iM8iJxM32uy52g=', 0, '2022-02-07 04:02:44', '2022-02-07 04:02:44'),
(53, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX19PkD2yUiHMi5dZcInWdcS7HdsiC7ln47E=', 0, '2022-02-07 04:02:58', '2022-02-07 04:02:58'),
(54, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+Lg/zpI+t039BoANYBLly268RihC4CTI0=', 0, '2022-02-07 04:06:53', '2022-02-07 04:06:53'),
(55, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX19o9zrokP1QqxSQ4hn4UmJkWuhkpNmiwvk=', 0, '2022-02-07 04:07:01', '2022-02-07 04:07:01'),
(56, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX186v/jrbcdQKHx2uBz9phUbjiLGaMwu9sc=', 0, '2022-02-07 04:07:16', '2022-02-07 04:07:16'),
(57, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX19BACo5b1fqXp8GR17TOD9aSZt/cF2EqCw=', 0, '2022-02-07 04:07:34', '2022-02-07 04:07:34'),
(58, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+0d+5/9ir8K2NUxX9cr4nLWrozfudBAP8=', 0, '2022-02-07 04:07:45', '2022-02-07 04:07:45'),
(59, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX18eawg30ZjqwlUTtKDoC9Mg4DBnlvWf/7o=', 0, '2022-02-07 04:08:10', '2022-02-07 04:08:10'),
(60, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/zrFIAHbhL9iGcqRdCmyXe1QnOgAoET+0=', 0, '2022-02-07 04:08:16', '2022-02-07 04:08:16'),
(61, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/7oWDLp6fbyJe0+7ZrJtU/SECRosMhvo8=', 0, '2022-02-07 04:10:18', '2022-02-07 04:10:18'),
(62, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+VwGjr42FrxFqBaYd/5jnE8hBaVkY/NZI=', 0, '2022-02-07 04:10:24', '2022-02-07 04:10:24'),
(63, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+oV95fixPS7WI4vn9tizz32DSdJsFFeEE=', 0, '2022-02-07 04:10:37', '2022-02-07 04:10:37'),
(64, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+kk79xEqreHS/jjL3pY2wxrjGydvLSY7Y=', 0, '2022-02-07 04:10:44', '2022-02-07 04:10:44'),
(65, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1+Mq8pTnIggsiK3McMtzvxJN26BhOXyR3g=', 0, '2022-02-07 04:12:48', '2022-02-07 04:12:48'),
(66, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19ThAupaaf5aNjox9nWHfw/ix/cOhfQjhQ=', 0, '2022-02-07 04:13:29', '2022-02-07 04:13:29'),
(67, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX18osLtMXdEZMMcWBbTrhcXt+SZWOgtyBlY=', 0, '2022-02-07 04:13:38', '2022-02-07 04:13:38'),
(68, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19F0gJgbtr4EJYDVn5Zl8sU+VB7y4ry/cA=', 0, '2022-02-07 04:13:47', '2022-02-07 04:13:47'),
(69, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/OEktHQ9AtnMXK3xjXuYwSaw5cPAxm+rs=', 0, '2022-02-07 04:13:57', '2022-02-07 04:13:57'),
(70, '847c4b30-7c32-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/+caC77qWOqfRnqfWd9++3kTj3YAfkRJ0=', 0, '2022-02-07 04:14:11', '2022-02-07 04:14:11'),
(71, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+aQFz1Z7qWXb+vuIzQy9K3ygogC9T2UM4=', 0, '2022-02-07 04:15:31', '2022-02-07 04:15:31'),
(72, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX181Z5nIHqW/VGLu3FneLSp3qL+Cy0j7/kY=', 0, '2022-02-07 04:15:45', '2022-02-07 04:15:45'),
(73, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/5+iajAVD/KgHJtZRcO5h4AO+xR1acV7M=', 0, '2022-02-07 04:15:59', '2022-02-07 04:15:59'),
(74, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/SOap4SIjhtv0k0NmtzS8/mJhXY2p/X6E=', 0, '2022-02-07 04:18:35', '2022-02-07 04:18:35'),
(75, '333de9a0-7c31-11ec-bd00-6999f228e63a', '3', 'U2FsdGVkX1/ahroT+uSfbfHKgu5lfO3+bRxCLhOtuKc=', 0, '2022-02-07 04:18:50', '2022-02-07 04:18:50'),
(76, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'U2FsdGVkX19iOik8gtXfAJTQEAaXaqnbSRJi25w1IM8=', 0, '2022-02-07 10:02:43', '2022-02-07 10:02:43'),
(77, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'U2FsdGVkX18XjOtQpcxtTcfD+erGGv+Ui6wa/5o3kIA=', 0, '2022-02-07 10:03:09', '2022-02-07 10:03:09'),
(78, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'U2FsdGVkX1+ez3axD+FxiASy7IWC3Eo/5o2Pd8YHJJM=', 0, '2022-02-07 10:03:22', '2022-02-07 10:03:22'),
(79, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+hwYNK36+OkjAguJhyc4ybmqvw4eWIq2A=', 0, '2022-02-07 11:02:10', '2022-02-07 11:02:10'),
(80, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+24X1J90+fWQJrIGnQNv4/4I0gFe8D01g=', 0, '2022-02-07 11:02:18', '2022-02-07 11:02:18'),
(81, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+FTS9Gf3livR5MEC1j6GaF0Nt33VGjhSE=', 0, '2022-02-07 11:02:24', '2022-02-07 11:02:24'),
(82, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/owTtpzYkYMC7U9x+nBFB524w13Cj/Z48=', 0, '2022-02-07 11:27:39', '2022-02-07 11:27:39'),
(83, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19ejJ1DamcbVSVQtDtmpUGathfDnd/jR6s=', 0, '2022-02-07 11:28:49', '2022-02-07 11:28:49'),
(84, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/2jMC0xBcGOjH2n53CcFwrM47rH9bCk14=', 0, '2022-02-07 11:29:08', '2022-02-07 11:29:08'),
(85, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX18EHdRyKPXJu290SW62srUucvg3yTVcJz0=', 0, '2022-02-07 11:29:13', '2022-02-07 11:29:13'),
(86, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/cGdSJqXaXjB7Nd+zukjGi2j0n5Hyx+GE=', 0, '2022-02-07 11:29:59', '2022-02-07 11:29:59'),
(87, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1/uyc3o9y+laE7L196uzIRMW4frCjWluhg=', 0, '2022-02-07 11:32:32', '2022-02-07 11:32:32'),
(88, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19Mfaa2Tk7jUvOuysp1NPCugxAPJlqtCmw=', 0, '2022-02-07 11:33:35', '2022-02-07 11:33:35'),
(89, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '3', 'U2FsdGVkX1/AxasqX9nxxF0CP0CNDpe5dY72G9BALaz/HvUg+aEt4kebTnSTTr4a', 0, '2022-02-07 15:00:03', '2022-02-07 15:00:03'),
(90, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '3', 'U2FsdGVkX184q1rMsQ1NNi8uE+WRYX46eKwdCTAKzTQ=', 0, '2022-02-07 15:00:31', '2022-02-07 15:00:31'),
(91, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19Ah8z3INI5TaupF5ZBaZdbewaWYzt9f1M=', 0, '2022-02-09 08:20:33', '2022-02-09 08:20:33'),
(92, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+CrJpJ28bSnPZ06co43q22fqgDdu/QpEE=', 0, '2022-02-09 08:20:52', '2022-02-09 08:20:52'),
(93, '847c4b30-7c32-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX1+3itt2NCrGtqFYB4xzdRHyH3yFZkglpM4=', 0, '2022-02-10 05:02:19', '2022-02-10 05:02:19'),
(94, '333de9a0-7c31-11ec-bd00-6999f228e63a', '1', 'U2FsdGVkX19okm734q59w3nH5ORpKX8nRRDj71YoMW8=', 0, '2022-02-10 05:02:31', '2022-02-10 05:02:31'),
(95, '68837de0-7cdc-11ec-bd2d-f12fabebfd3c', '2', 'U2FsdGVkX19LnSLAVA3lmlIIs4SJraXZxoz5+ZKpGelItbJg7NW3ulWv4S1GYGlA', 0, '2022-02-11 05:45:59', '2022-02-11 05:45:59'),
(96, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'U2FsdGVkX1+mzdNNd/8WHMRNIqmwmFTyRVri2r36oH8=', 0, '2022-02-14 07:41:42', '2022-02-14 07:41:42'),
(97, '333de9a0-7c31-11ec-bd00-6999f228e63a', '2', 'U2FsdGVkX190Ut2cmFCkj3zOKbGKMz3uWBXwhDAhfmsseBGKnt8AULAQys3TA65WIcphB1fmFNlxdaknx5/lbYMnGd/TsC6f93+lRkXrh9P584LEosMcrxnuVpx1MlKifsHnOAOkgVUg7K7kph8/MziVlJHXftFUEgZVmrmj3nzAH3CWSjadUyQEiZFj0JLP2/e7I2bfFlAfMXVJaXycLAiABMhVxFNcKbay9ha6qyHBN1ookBAsFmZuQ4jHE5i', 0, '2022-02-14 08:07:32', '2022-02-14 08:07:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_post`
--

CREATE TABLE `user_post` (
  `id` varchar(50) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  `message` tinytext NOT NULL,
  `image_description` longtext NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_post`
--

INSERT INTO `user_post` (`id`, `idUser`, `message`, `image_description`, `create_at`, `update_at`) VALUES
('1', '333de9a0-7c31-11ec-bd00-6999f228e63a', 'Thời tiết hôm nay tuyệt đẹp', 'https://camerabox.vn/uploads/news/2018_07/chup-anh-phong-canh-thu-vi.jpg', '2022-01-24 05:06:19', '2022-01-24 05:06:19'),
('2', '847c4b30-7c32-11ec-bd00-6999f228e63a', 'Ngồi câu cá zui zui.', 'https://vnn-imgs-f.vgcloud.vn/2021/04/02/11/troll-chong-ngay-ca-thang-tu-toi-nhan-ve-cai-ket-dang-ngat.jpg', '2022-01-24 06:08:47', '2022-01-24 06:08:47'),
('3', '333de9a0-7c31-11ec-bd00-6999f228e63a', 'Mèo quá đẹp', '/Upload/post/meo.jpg', '2022-02-10 08:28:59', '2022-02-10 08:33:19');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `member_room_chat`
--
ALTER TABLE `member_room_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRoom` (`idRoom`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sourceId` (`sourceId`),
  ADD KEY `targetId` (`targetId`),
  ADD KEY `type` (`type`);

--
-- Chỉ mục cho bảng `notification_template`
--
ALTER TABLE `notification_template`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `post_comment`
--
ALTER TABLE `post_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPost` (`idPost`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `post_emotion`
--
ALTER TABLE `post_emotion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPost` (`idPost`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `room_chat`
--
ALTER TABLE `room_chat`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `share_post`
--
ALTER TABLE `share_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPost` (`idPost`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `user_follower`
--
ALTER TABLE `user_follower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sourceId` (`sourceId`),
  ADD KEY `targetId` (`targetId`);

--
-- Chỉ mục cho bảng `user_friend`
--
ALTER TABLE `user_friend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sourceId` (`sourceId`),
  ADD KEY `targetId` (`targetId`);

--
-- Chỉ mục cho bảng `user_message`
--
ALTER TABLE `user_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sourceId` (`sourceId`),
  ADD KEY `user_message_ibfk_2` (`idRoom`);

--
-- Chỉ mục cho bảng `user_post`
--
ALTER TABLE `user_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `notification_template`
--
ALTER TABLE `notification_template`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `post_comment`
--
ALTER TABLE `post_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `post_emotion`
--
ALTER TABLE `post_emotion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `share_post`
--
ALTER TABLE `share_post`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `user_follower`
--
ALTER TABLE `user_follower`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `user_friend`
--
ALTER TABLE `user_friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT cho bảng `user_message`
--
ALTER TABLE `user_message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `member_room_chat`
--
ALTER TABLE `member_room_chat`
  ADD CONSTRAINT `member_room_chat_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `room_chat` (`id`),
  ADD CONSTRAINT `member_room_chat_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`sourceId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`targetId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`type`) REFERENCES `notification_template` (`id`);

--
-- Các ràng buộc cho bảng `post_comment`
--
ALTER TABLE `post_comment`
  ADD CONSTRAINT `post_comment_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `user_post` (`id`),
  ADD CONSTRAINT `post_comment_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `post_emotion`
--
ALTER TABLE `post_emotion`
  ADD CONSTRAINT `post_emotion_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `user_post` (`id`),
  ADD CONSTRAINT `post_emotion_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `share_post`
--
ALTER TABLE `share_post`
  ADD CONSTRAINT `share_post_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `user_post` (`id`),
  ADD CONSTRAINT `share_post_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `user_detail_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user_follower`
--
ALTER TABLE `user_follower`
  ADD CONSTRAINT `user_follower_ibfk_1` FOREIGN KEY (`sourceId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_follower_ibfk_2` FOREIGN KEY (`targetId`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user_friend`
--
ALTER TABLE `user_friend`
  ADD CONSTRAINT `user_friend_ibfk_1` FOREIGN KEY (`sourceId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_friend_ibfk_2` FOREIGN KEY (`targetId`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user_message`
--
ALTER TABLE `user_message`
  ADD CONSTRAINT `user_message_ibfk_1` FOREIGN KEY (`sourceId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_message_ibfk_2` FOREIGN KEY (`idRoom`) REFERENCES `room_chat` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_post`
--
ALTER TABLE `user_post`
  ADD CONSTRAINT `user_post_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
