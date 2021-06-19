
-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `id` bigint(20) NOT NULL COMMENT 'API_KEY ID',
  `status` varchar(50) NOT NULL DEFAULT 'inactive' COMMENT '- active\r\n-disabled\r\n-inactive\r\n-blocked',
  `api_key` text NOT NULL COMMENT 'Access Key Space',
  `owner` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
