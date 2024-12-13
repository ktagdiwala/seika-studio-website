-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 12, 2024 at 11:30 PM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `walidelg_seika_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `custom_set`
--

CREATE TABLE `custom_set` (
  `user_id` int DEFAULT NULL,
  `set_id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `size` varchar(20) DEFAULT NULL,
  `length` smallint DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='User can customize a nail set';

--
-- Dumping data for table `custom_set`
--

INSERT INTO `custom_set` (`user_id`, `set_id`, `name`, `type`, `size`, `length`, `description`) VALUES
(1, 5, 'Potato-Nails', 'Simple Design', 'Small', 10000, 'Potatoes on a Nail'),
(1, 8, 'Trez', 'Simple Design', 'Small', 3, 'Three lines of white on three nails with three pearl charms on each of the three lines'),
(1, 9, 'Chevron', 'Complex Design', 'Medium', 1000, ' Base color is off-white. All nails are half painted light grey diagonally. Chevron pattern and bow charms on ring nails with light grey and light blue. '),
(0, 12, 'Sakura', 'Simple Design', 'Medium', 1000, 'Pink cherry blossom designs with white background and matte finish.');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '0',
  `price` decimal(6,2) NOT NULL DEFAULT (0),
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` tinytext,
  `category` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Premade nail sets';

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `title`, `price`, `image_url`, `description`, `category`) VALUES
(1, 'SKZ-mas Love', 50.00, 'https://lh3.googleusercontent.com/pw/AP1GczMIeYDMsDYLj3J56GJ4X8a_k33QPpJFGA9WWiqfEqPCZbuVvq7j3hvSACkEDKZ6ycib4CSUfLgeZsFoqPa234lwXcOm-UvOrO9S4y-buqaQWML0il_ouhNmm0mPpFdHVcUmGgz5LK8oXqmgHZJoZDSf=w929-h919-s-no-gm', 'Heavily influenced by “Christmas Love” by Stray Kids. As a stay, this is probably the most prized set made. Enjoy the holiday season with this christmas set!', 'Christmas'),
(2, 'Winter Wonder', 45.00, 'https://lh3.googleusercontent.com/pw/AP1GczPPoVsp-6mPdcTmCxgOyAYGjsIgD2LJNSI8-IWx3PgUam2iAM--1pS6ycmX_stHR1JXpvS57IkpU4nsQIRIyZHyB73og4GX9yEW3ij21vQjqj30xO4pHvJxzZFUU26E5yrZJcv_3aku6Ha37-lfWDgg=w919-h919-s-no-gm', 'Influenced by White Christmas, Frosty the Snowman, and Blue Christmas. These concepts mixed and matched to bring out this beautiful set “Winter Wonders”.', 'Christmas'),
(3, 'Silver Snow', 45.00, 'https://lh3.googleusercontent.com/pw/AP1GczMdyU3ZDAjPaMaNEBnDBDKJqph1GcyCO1jzEaJOVGNsqu0v4t9u-2YA6Xean0XKKVXrR48IKNE7HXWkyrWt3LWGjONiTAwC56Do3uRU2iojee1TrupHsBEJb85cHo-PP0ls0nws9D-stPgKLFdmhVXu=w919-h919-s-no-gm', 'Like the first snow of the winter, this set exudes purity and classiness. A love at first sight. The perfect silver snowy winter set for this holiday season.', 'Christmas'),
(4, 'Starling Christmas', 45.00, 'https://lh3.googleusercontent.com/pw/AP1GczNzxl7j4LqxdY0GvuCnZwgvg-NEIQCsOoqXrANeGa4XAPdmesCQmys6uvLMBD4bB_MAiIx4fBSKpDdrAkMfdsKfzHV8ASQVomw5AkDsM3fdJbVwH9jaPl6lkkBrKwRXf2AxUNb_LykG7z-4gZqB9E3y=w920-h919-s-no-gm', 'Inspired by the elegance that green brings in during Christmas, this set includes accent nails that relates to the holiday season.', 'Christmas'),
(5, 'Bluephoria', 45.00, 'https://lh3.googleusercontent.com/pw/AP1GczPRYZ1jUaQxdD0h9o1DFvttIijHOZfRYRU7p_m-reWkc_6jcSQbCIqeAgKZRZjw3FjeX6Iy9uMV8LCYgcTECnrxtSvlfjxFoxySd32GrErfFihl0MjakBBvSJyJLRx03AilJsdOQ6Uk8DYzuCKG0Grd=w919-h919-s-no-gm', 'A beautiful blue tulip garden set with 3D handcrafted flowers. The first set of the Barbie collection. Inspired by the barbie movie “The Princess and the Pauper”.', 'Miscellaneous'),
(6, 'Grand Melody', 35.00, 'https://lh3.googleusercontent.com/pw/AP1GczM2M14iEcHGrv_VRCT58hvQXSa5EelBM16maGQfDtNlgMeK0Zmq-jH-BmoQcblwwYhe3PBoK-8ppbF2l1Dt2UkXk7AkkFQgWAs7rOCakrKvjhp47-HRCp1g80_quWIOPRHJr5rK1FjcSHa-T8Vdutko=w919-h919-s-no-gm', 'Piano based nail design with a simple line art and a contradicting black and white base. Perfect for musicians and lovers alike.', 'Miscellaneous'),
(7, 'Pacific', 35.00, 'https://lh3.googleusercontent.com/pw/AP1GczPLPCY9CqqFtB1PwUMlht30nrBKjIbzgqa-965Lo4gHJXI8y_qbmoZ3M7Xkj2iPbw4GOcLH5GXBo_v1CRXO6S9H7gJjWO_9D7cI1VLV1Xb97mZd-0BJhpd5LQ34WLDNwxYgPuWrS6ln2ytKGV0le6GB=w900-h900-s-no-gm', 'A nail set that captures the blue ocean hue, and the wonderful things within.', 'Miscellaneous'),
(8, 'Christmas Blues', 35.00, 'https://lh3.googleusercontent.com/pw/AP1GczOk7V8tNZfvFjrvUcHzrmQNBb5HiIUPb8gAwELhm4c37SB84FZt3_8OJ0hwjn5lQSLkk0O0fvnpqGyO5vEdRy_KN6fq6Ej2M0aHtoifcpFa4GO2dyXTR085TUjjn3yWEhEnDx6v4_TqDC5Y5Xh69oTt=w919-h919-s-no-gm', 'Another set for the Christmas season! A simple blue set with hints of glitter to get into this holiday season.', 'Christmas'),
(9, 'Night Light', 30.00, 'https://lh3.googleusercontent.com/pw/AP1GczMwR4lvnSEZPOCVq13YYUJ67iKtEf2vJ789ewNYeT8_axhZ1_5XQkYBlcpRMgBsqNai-ByMHLmRs_LWdxgP2jmZf-b7zxg_8MSfRquaLrdCWLJnk5NGqVHRCxR73eMads10XAzSDH-GtbIqrHs9xcYM=w919-h919-s-no-gm', 'Fireworks in the night.', 'Miscellaneous'),
(10, 'Gambler\'s Hand', 40.00, 'https://lh3.googleusercontent.com/pw/AP1GczPZmZSsarkP6Y2M_6PwerzFsMg95uI6cCBcA2uxSWfYRD-4mZ2ktyZF3b6WDmHwMtOkes-P97fK3t14xq_hfyn2cASLFTmf14EFkx1Vq4qOyZbTP7IJCRkD4g7MQVzSPFx_CxxNEzWlIHpSGWgZafhD=w818-h818-s-no-gm', 'A set of nails inspired by the idea of cards, dice, and everything a gambler would use.', 'Miscellaneous'),
(11, 'Holy Night', 50.00, 'https://lh3.googleusercontent.com/pw/AP1GczPa5zyFk6i2Wqnyz06yUcIztjTcFyLht46Lm6aJ3j2oI0dhye7zVv1ZD_cPJyIEvhsPrs73OYnCMLrU8m-rlUXmWNfDoTfTH1SaUxDbPGd_5T2CxxTgSa4muv5EO3PIotaGgqJl0lTn8Q1ifn8jMlB9=w919-h919-s-no-gm', 'Another stunning set in our Premium collection for this Christmas season. The combination of red and white deliver an angelic yet festive feels to the concept of Christmas. Carefully crafted and decorated with beautiful charms and hand drawn arts.', 'Christmas'),
(12, 'Santa\'s Workshop', 50.00, 'https://lh3.googleusercontent.com/pw/AP1GczPN4ja6fTMvBt6zK9ygKv1bXwSUJjo8qyZYsUlNbhervJwAwCA7yLvN78LOHY5em_1ABIkfKcHePbmux_B1kv00eS34bwlYnU1vKniSyV_hnsHN4o6y_LNsjkmbhDriQVcePW0egvmdZF4H7XE23rwg=w919-h919-s-no-gm', 'A set of nails inspired by the work that happens in Santa’s workshop once every year.', 'Christmas'),
(13, 'Pretty In Pink', 25.00, 'https://lh3.googleusercontent.com/pw/AP1GczO79sBKl_94gCAamqndYSCWRSBMdw6RPURcVBHXvQfX_CrkOuf0uYyzZ-PShacw4JTuQrHn0n500ZNktJZy_B5xGkVISt3yomxWMVg80bxYwOLxSQCzP09QbWqtfjjijHWLpKpWo5A4PLjjfhO1rBhl=w919-h919-s-no-gm?authuser=0', 'A simple set inspired by SKZ-mas Love.', 'Miscellaneous'),
(14, 'Festive Shimmer', 20.00, 'https://lh3.googleusercontent.com/pw/AP1GczNHcG6gGQq8iGc8Tqe1KaeucsahzFDyu6imWOhYcOju12BhmLsCW5VfbIuANq7BplOhzyL7ek0xgoeZCXURGU-QFTiiC73JVlHZCrHegDeBSVNpH9v4dHjMI_QdZVn4qBvuItQl6kMCEx3pXneOi2ex=w634-h634-s-no-gm', 'A short and simple set to get into the holiday spirit!', 'Christmas');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` int DEFAULT (0),
  `zip` int DEFAULT '0',
  `password` varchar(72) NOT NULL,
  `isAdmin` binary(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Website users';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `name`, `phone`, `zip`, `password`, `isAdmin`) VALUES
(0, 'test@csumb.edu', 'test', 0, 95391, '$2b$10$pySS.4ZGTOYg8lNLGOI4wOOAkpJebdmwYzrW8HW9v0Ir4FTNIGNjy', 0x30),
(1, 'seikastudio0124@gmail.com', 'admin', 0, 95391, '$2a$10$K68c56KUyiOpYicu3qI5POV2zE6NymN71W30i5/RAxtskzKUo.1j6', 0x31),
(31, 'test@test', 'Name Test', 2097767767, 95382, '$2b$10$LMDgFv6U/LFf0IU.DNAPB.IOMwJOZWqOw0GxP/LlrSXH7GbNmmmYa', 0x30),
(44, 'otter@csumb.edu', 'Otter', 0, 0, '$2b$10$K8LFkE64SaM1pnDF4Mh7/e5EjTlI4NjaqHNbn9dTwU1SvZcZjb2D6', 0x30),
(50, 'potato@csumb.edu', 'Potato', 0, 0, '$2b$10$pDBXn31wClZi9wEncVvEN.ZKBRyhJz5urP7koH/lsnEYdlzeTULHi', 0x30),
(51, 'jesusmartinez9498@gmail.com', 'Jesus', 1234567890, 95340, '$2b$10$LUfaZfHrtKE.4XBo/s8cNuos6ogJGlxBWESK9hX.GpjKu1j48RCIS', 0x30),
(52, 'hamborgar@yahoo.com', 'Ritsu Tainaka', 2147483647, 82601, '$2b$10$FXevnUMM3cIZDCaolkHdcOOABT35xgOz5qJZCBufFVKUQSLiUD.tK', 0x30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `custom_set`
--
ALTER TABLE `custom_set`
  ADD PRIMARY KEY (`set_id`),
  ADD KEY `FK__user` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `custom_set`
--
ALTER TABLE `custom_set`
  MODIFY `set_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `custom_set`
--
ALTER TABLE `custom_set`
  ADD CONSTRAINT `FK__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
