-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 10, 2026 at 09:07 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `authgate`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `refresh_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@authgate.com', '$2b$12$.OkM2lTNtEG3dWzqUdW3OOiFhdeQSleLUBpokLKkz4qqf/7Bc./2W', 'admin', NULL, '2026-05-10 09:00:45', '2026-05-10 09:00:45'),
(2, 'denny', 'denny@mail.com', '$2b$12$s1F.ZX579T/79qckqVNTYuPRCn0qFvEbUVquMjhR2.oLOoX4.djpe', 'user', NULL, '2026-05-10 09:00:45', '2026-05-10 09:00:45'),
(3, 'sinta', 'sinta@mail.com', '$2b$12$71wnt3NLBOdm4bFGQlw88uHTUHFvIx2naW7LWmGDsMgR2Yqbr6wze', 'user', NULL, '2026-05-10 09:00:46', '2026-05-10 09:00:46'),
(4, 'rafi', 'rafi@mail.com', '$2b$12$ZzVsO9UlyWgQ8jXjDR5quO75WY4eHgmjylskf.s8Ger2mrgFs4U6S', 'admin', NULL, '2026-05-10 09:00:46', '2026-05-10 09:00:46'),
(5, 'ihsan', 'ihsan@mail.com', '$2b$12$6Io2SuMb4qtH9azSRr0.LOjALboE1GRqrOqbvvQVc.J8tCqyPr7..', 'user', NULL, '2026-05-10 09:00:46', '2026-05-10 09:00:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
