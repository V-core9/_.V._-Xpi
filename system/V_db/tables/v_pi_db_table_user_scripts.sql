
-- --------------------------------------------------------

--
-- Table structure for table `user_scripts`
--

CREATE TABLE `user_scripts` (
  `id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'draft',
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `owner` bigint(20) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
