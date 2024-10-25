/*
 Source Server         : rockpi
 Source Server Type    : MariaDB
 Source Server Version : 100808 (10.8.8-MariaDB-1:10.8.8+maria~ubu2204)
 Source Host           : rockpi.lan:3308
 Source Schema         : thai_data

 Target Server Type    : MariaDB
 Target Server Version : 100808 (10.8.8-MariaDB-1:10.8.8+maria~ubu2204)
 File Encoding         : 65001

 Date: 21/12/2023 19:32:13
*/


-- ----------------------------
-- Table structure for thai_geographies
-- ----------------------------
DROP TABLE IF EXISTS "thai_geographies";
CREATE TABLE "thai_geographies" (
  id int NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of thai_geographies
-- ----------------------------
BEGIN;
INSERT INTO "thai_geographies" ("id", "name") VALUES (1, 'ภาคเหนือ');
INSERT INTO "thai_geographies" ("id", "name") VALUES (2, 'ภาคกลาง');
INSERT INTO "thai_geographies" ("id", "name") VALUES (3, 'ภาคตะวันออกเฉียงเหนือ');
INSERT INTO "thai_geographies" ("id", "name") VALUES (4, 'ภาคตะวันตก');
INSERT INTO "thai_geographies" ("id", "name") VALUES (5, 'ภาคตะวันออก');
INSERT INTO "thai_geographies" ("id", "name") VALUES (6, 'ภาคใต้');
COMMIT;

