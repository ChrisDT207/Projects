USE master
GO

CREATE DATABASE Fifa2026_DB
ON PRIMARY 
(
	NAME = Fifa2026_Data1,
	FILENAME = 'C:\data\Fifa2026_Data1.mdf',
	SIZE = 10MB,
	MAXSIZE = 100MB,
	FILEGROWTH = 5MB
),

FILEGROUP SECONDARY
(
	NAME = Fifa2026_Data2,
	FILENAME = 'C:\data\Fifa2026_Data2.ndf',
	SIZE = 10MB,
	MAXSIZE = 100MB,
	FILEGROWTH = 5MB	
)

LOG ON 
(
	NAME = Fifa2026_Log,
	FILENAME = 'C:\data\Fifa2026_Log1.ldf',
	SIZE = 10MB,
	MAXSIZE = 100MB,
	FILEGROWTH = 5MB
)

USE [Fifa2026_DB]
GO

-- Creating the Tables
-- Parent Tables

CREATE TABLE Teams
(
	TeamID INT IDENTITY(1,1) PRIMARY KEY,
	TeamName VARCHAR (100) NOT NULL,
	TeamGroup CHAR(1) NOT NULL -- Groups will be 'A', 'B', 'C' and so on
)

CREATE TABLE HostCountry
(
	CountryID INT IDENTITY (1,1) PRIMARY KEY,
	CountryName VARCHAR (100) NOT NULL
)

CREATE TABLE HostCity
(
	CityID INT IDENTITY (1,1) PRIMARY KEY,
	CountryID INT NOT NULL,
	CityName VARCHAR (100) NOT NULL,

	CONSTRAINT FK_HostCity_HostCountry FOREIGN KEY (CountryID) 
    REFERENCES HostCountry (CountryID)
)

CREATE TABLE Fan 
(
	FanID INT IDENTITY (1,1) PRIMARY KEY,
	FanFirstName VARCHAR (100) NOT NULL,
	FanLastName VARCHAR (100) NOT NULL,
	FanEmail VARCHAR (150) UNIQUE NOT NULL
)

-- Child Tables

CREATE TABLE Player
(
	PlayerID INT IDENTITY (1,1) PRIMARY KEY,
	TeamID INT NOT NULL, 
	PlayerName VARCHAR (150) NOT NULL,
	PlayerPosition VARCHAR (50) NOT NULL,
	
	CONSTRAINT FK_Player_Team FOREIGN KEY (TeamID)
	REFERENCES Teams (TeamID)
)

CREATE TABLE Stadium
(
	StadiumID INT IDENTITY (1,1) PRIMARY KEY,
	CityID INT NOT NULL,
	StadiumName VARCHAR (150) NOT NULL,
	Capacity INT NOT NULL,

	CONSTRAINT FK_Stadium_HostCity FOREIGN KEY (CityID)
	REFERENCES HostCity (CityID)
)

-- Transaction Tables

CREATE TABLE Matches
(
	MatchID INT IDENTITY (1,1) PRIMARY KEY,
	StadiumID INT NOT NULL,
	MatchDate DATE NOT NULL,
	MatchTime TIME NOT NULL,
	Stage VARCHAR (50) NOT NULL, -- "Group Stage" , "Quarter Finals" and so on

	CONSTRAINT FK_Match_Stadium FOREIGN KEY (StadiumID)
	REFERENCES Stadium (StadiumID),
)

CREATE TABLE MatchTeam
(
	MatchTeamID INT IDENTITY (1,1) PRIMARY KEY,
	MatchID INT NOT NULL,
	TeamID INT NOT NULL,
	IsHomeTeam BIT NOT NULL, -- 1 = Home, 0 = Away

	CONSTRAINT FK_MatchTeam_Match FOREIGN KEY (MatchID)
	REFERENCES Matches (MatchID),
	CONSTRAINT FK_MatchTeam_Team FOREIGN KEY (TeamID)
	REFERENCES Teams (TeamID)
)

-- Match dependent tables

CREATE TABLE Ticket
(
	TicketID INT IDENTITY (1,1) PRIMARY KEY,
	MatchID INT NOT NULL,
	FanID INT NOT NULL,
	TicketPrice DECIMAL (10,2) NOT NULL,
	SeatNumber VARCHAR (20) NOT NULL,

	CONSTRAINT FK_Ticket_Match FOREIGN KEY (MatchID)
	REFERENCES Matches (MatchID),
	CONSTRAINT FK_Ticket_Fan FOREIGN KEY (FanID)
	REFERENCES Fan (FanID)
)

CREATE TABLE PlayerStats 
(
	StatID INT IDENTITY (1,1) PRIMARY KEY,
	PlayerID INT NOT NULL,
	MatchID INT NOT NULL,
	GoalsScored INT DEFAULT 0,
	YellowCards INT DEFAULT 0,
	RedCards INT DEFAULT 0,

	CONSTRAINT FK_PlayerStats_Player FOREIGN KEY (PlayerID)
	REFERENCES Player (PlayerID),
	CONSTRAINT FK_PlayerStats_Match FOREIGN KEY (MatchID) 
	REFERENCES Matches (MatchID)
)

-- Populating the tables

INSERT INTO Teams (TeamName, TeamGroup)
VALUES 
('Argentina', 'A'),
('France', 'B'),
('USA', 'C'),
('Mexico', 'A'),
('Canada', 'B'),
('Brazil', 'C'),
('England', 'D'),
('Japan', 'D')

INSERT INTO HostCountry (CountryName)
VALUES 
('Mexico'), 
('Canada'), 
('USA')

INSERT INTO HostCity (CountryID, CityName)
VALUES 
(1, 'Mexico City'), 
(1, 'Monterrey'),
(2, 'Toronto'),     
(2, 'Vancouver'),
(3, 'New York/NJ'), 
(3, 'Dallas'),
(3, 'Los Angeles')

INSERT INTO Fan (FanFirstName, FanLastName, FanEmail)
VALUES 
('Morena', 'Molefe', 'morenamolefe@gmail.com'),
('James', 'Ball', 'jamesball@gmail.com'),
('Christiaan', 'Du Toit', 'christiaandutoit@gmail.com'),
('Arno', 'Naude', 'arnonaude@gmail.com'),
('Wian', 'Naude', 'wiannaude@gmail.com'),
('Masego', 'Leeuw', 'masegoleeuw@gmail.com')

INSERT INTO Stadium (CityID, StadiumName, Capacity)
VALUES
(1, 'Estadio Azteca', 83000), -- Mexico City
(2, 'Estadio BBVA', 53500), -- Monterrey
(3, 'BMO Field', 45000), -- Toronto
(4, 'BC Place', 54000), -- Vancouver
(5, 'MetLife Stadium', 82500), -- New York
(6, 'AT&T Stadium', 80000), -- Dallas
(7, 'SoFi Stadium', 70000) -- Los Angeles

INSERT INTO Player (TeamID, PlayerName, PlayerPosition)
VALUES
-- Team 1: Argentina
(1, 'Emiliano Martínez', 'Goal Keeper'),
(1, 'Nicolás Otamendi', 'Defender'),
(1, 'Rodrigo De Paul', 'Midfielder'),
(1, 'Lionel Messi', 'Forward'),

-- Team 2: France
(2, 'Mike Maignan', 'Goalkeeper'),
(2, 'William Saliba', 'Defender'),
(2, 'Antoine Griezmann', 'Midfielder'),
(2, 'Kylian Mbappé', 'Forward'),

-- Team 3: USA
(3, 'Matt Turner', 'Goalkeeper'),
(3, 'Antonee Robinson', 'Defender'),
(3, 'Weston McKennie', 'Midfielder'),
(3, 'Christian Pulisic', 'Forward'),

-- Team 4: Mexico
(4, 'Guillermo Ochoa', 'Goalkeeper'),
(4, 'Johan Vásquez', 'Defender'),
(4, 'Edson Álvarez', 'Midfielder'),
(4, 'Santiago Giménez', 'Forward'),

-- Team 5: Canada
(5, 'Milan Borjan', 'Goalkeeper'),
(5, 'Alphonso Davies', 'Defender'),
(5, 'Stephen Eustáquio', 'Midfielder'),
(5, 'Jonathan David', 'Forward'),

-- Team 6: Brazil
(6, 'Alisson Becker', 'Goalkeeper'),
(6, 'Marquinhos', 'Defender'),
(6, 'Bruno Guimarães', 'Midfielder'),
(6, 'Vinícius Júnior', 'Forward'),

-- Team 7: England
(7, 'Jordan Pickford', 'Goalkeeper'),
(7, 'John Stones', 'Defender'),
(7, 'Jude Bellingham', 'Midfielder'),
(7, 'Harry Kane', 'Forward'),

-- Team 8: Japan
(8, 'Zion Suzuki', 'Goalkeeper'),
(8, 'Takehiro Tomiyasu', 'Defender'),
(8, 'Wataru Endo', 'Midfielder'),
(8, 'Kaoru Mitoma', 'Forward')

INSERT INTO Matches (StadiumID, MatchDate, MatchTime, Stage)
VALUES 
(7, '2026-06-12', '18:00:00', 'Group Stage'), -- Match 1: USA vs Mexico
(5, '2026-06-15', '20:00:00', 'Group Stage'), -- Match 2: Argentina vs Brazil 
(6, '2026-06-18', '19:30:00', 'Group Stage'), -- Match 3: England vs France 
(4, '2026-06-20', '15:00:00', 'Group Stage')  -- Match 4: Canada vs Japan

INSERT INTO MatchTeam (MatchID, TeamID, IsHomeTeam)
VALUES
(1, 3, 1), -- USA is Home Team
(1, 4, 0), -- MEX is Away Team
(2, 1, 1),
(2, 6, 0),
(3, 7, 1),
(3, 2, 0),
(4, 5, 1),
(4, 8, 1)

INSERT INTO Ticket (MatchID, FanID, TicketPrice, SeatNumber) 	
VALUES 
(1, 1, 250.00, 'Sec 1, Row F, Seat 9'),  
(1, 2, 250.00, 'Sec 1, Row G, Seat 6'), 
(2, 3, 450.00, 'Sec 6, Row A, Seat 1'),
(3, 4, 350.00, 'Sec 5, Row C, Seat 7'),
(3, 5, 175.50, 'Sec 2, Row D, Seat 8'),
(4, 6, 175.50, 'Sec 3, Row B, Seat 2')

INSERT INTO PlayerStats (PlayerID, MatchID, GoalsScored, YellowCards, RedCards)
VALUES
-- Match 1: USA vs Mexico
(12, 1, 1, 0, 0), -- USA scores 1 goal
(16, 1, 1, 1, 0), -- MEX scorees 1 goal, yellow card

-- Stats for Match 2
(4, 2, 2, 0, 0), -- ARG scores 2 goals
(24, 2, 1, 0, 0), -- BRA Scores 1 goal
(3, 2, 0, 1, 0), -- ARG gets yellow card

-- Stats for Match 3 
(8, 3, 1, 0, 0),  -- FRA scores 1 goal
(27, 3, 1, 0, 0), -- ENG scores 1 goal

-- Stats for Match 4 
(18, 4, 1, 0, 0), -- CAN scores 1 goal
(32, 4, 1, 0, 0)  -- JPN scores 1 goal

-- View and Main Query
GO 

CREATE VIEW TournamentDashboard
WITH ENCRYPTION, SCHEMABINDING 
AS

WITH MatchTicketSales AS -- CTE: Calculate total tickets per match sold
(
	SELECT MatchID, COUNT(TicketID) AS TotalTicketsSold
	FROM Ticket
	GROUP BY MatchID
)

SELECT m.MatchID, m.MatchDate, t_home.TeamName AS HomeTeam, t_away.TeamName AS AwayTeam, s.StadiumName, hc.CityName, co.CountryName, s.Capacity, ISNULL(mts.TotalTicketsSold, 0) AS TicketsSold, -- Main Query
	CASE
		WHEN ISNULL (mts.TotalTicketsSold, 0) >= s.Capacity THEN 'Sold Out'
		WHEN ISNULL (mts.TotalTicketsSold, 0) >= (s.Capacity * 0.8) THEN 'High Demand'
	ELSE 'Tickets Available'
END AS TicketStatus
FROM Matches m

-- Joins
INNER JOIN MatchTeam mt_home -- Get the Home Team
ON m.MatchID = mt_home.MatchID AND mt_home.IsHomeTeam = 1
INNER JOIN Teams t_home ON mt_home.TeamID = t_home.TeamID

-- Get the Away Team
INNER JOIN MatchTeam mt_away 
ON m.MatchID = mt_away.MatchID AND mt_away.IsHomeTeam = 0
INNER JOIN Teams t_away 
ON mt_away.TeamID = t_away.TeamID

-- Get Location Details
INNER JOIN Stadium s 
ON m.StadiumID = s.StadiumID
INNER JOIN HostCity hc 
ON s.CityID = hc.CityID
INNER JOIN HostCountry co 
ON hc.CountryID = co.CountryID

-- Get the Ticket Sales (LEFT JOIN in case 0 tickets are sold)
LEFT JOIN MatchTicketSales mts 
ON m.MatchID = mts.MatchID

-- Subquery to find the Top Scorer 
GO 

SELECT p.PlayerName, t.TeamName, ps.GoalsScored
FROM Player p
INNER JOIN Teams t 
ON p.TeamID = t.TeamID
INNER JOIN PlayerStats ps
ON p.PlayerID = ps.PlayerID
WHERE ps.GoalsScored = (SELECT MAX(GoalsScored)
						FROM PlayerStats)

-- Procedure
GO

CREATE PROCEDURE BookTicket
@FanFirstName VARCHAR (100),
@FanLastName VARCHAR (100),
@FanEmail VARCHAR (150),
@MatchID INT,
@TicketPrice DECIMAL (10,2),
@SeatNumber VARCHAR (20)
AS

BEGIN
SET NOCOUNT ON -- Prevent row count messages
DECLARE @FanID INT 

BEGIN TRY
	BEGIN TRANSACTION
	
		IF EXISTS (SELECT 1 FROM Fan WHERE FanEmail = @FanEmail) -- Check if fan mail already exists
			BEGIN 
				SELECT @FanID = FanID FROM Fan WHERE FanEmail = @FanEmail -- If they exists, gets the ID
			END
		ELSE 
			BEGIN 
				INSERT INTO Fan (FanFirstName, FanLastName, FanEmail) 
				VALUES 
				(@FanFirstName, @FanLastName, @FanEmail)

				SET @FanID = SCOPE_IDENTITY()
			END
				INSERT INTO Ticket (MatchID, FanID, TicketPrice, SeatNumber) -- Book the ticket with the FanID
				VALUES (@MatchID, @FanID, @TicketPrice, @SeatNumber)

	COMMIT TRANSACTION 
		PRINT 'SUCCESS: Fan processed and ticket booked.' -- If both succeed, then it saves
END TRY

BEGIN CATCH -- If all fails, then it rollsback
	IF @@TRANCOUNT > 0
		BEGIN 
			ROLLBACK TRANSACTION 
		END
		PRINT 'FAILED: Transaction rolled back due to an error' -- Error message if it fails
		PRINT ERROR_MESSAGE()
END CATCH 
END

EXECUTE BookTicket 'Lionel', 'Scaloni', 'lscaloni@email.com', 2, 850.00, 'VIP-Box-1' -- Run to test if it works!!!

GO

CREATE FUNCTION fn_CalculateMatchRevenue (@MatchID INT)
RETURNS DECIMAL(12, 2)
AS 
BEGIN
	DECLARE @TotalRevenue DECIMAL(12,2)

	SELECT @TotalRevenue = SUM(TicketPrice) -- Calculate the sum of all ticket prices for the specific match
	FROM Ticket
	WHERE MatchID = @MatchID

	IF @TotalRevenue IS NULL -- If no tickets are sold yet, the sum will be NULL
	BEGIN 
		SET @TotalRevenue = 0.00 -- We use this IF statement to return a clean 0.00 instead of a blank error.
	END
	RETURN @TotalRevenue
END

GO

-- Cursor

PRINT 'Fifa 2026 Match Revenue Report'

DECLARE @CurrentMatchID INT -- Variables to hold the data as we go line through line with the Cursor
DECLARE @CurrentMatchDate DATE
DECLARE @MatchRevenue DECIMAL (12,2)

DECLARE RevenueCursor CURSOR FOR
SELECT MatchID, MatchDate 
FROM Matches

OPEN RevenueCursor

FETCH NEXT FROM RevenueCursor INTO @CurrentMatchID, @CurrentMatchDate -- Fetch the first row of data and stuff

WHILE @@FETCH_STATUS = 0
BEGIN 
	SET @MatchRevenue = dbo.fn_CalculateMatchRevenue (@CurrentMatchID) -- The function we build to get our money from the specific match
	PRINT 'Match ' + CAST (@CurrentMatchID AS VARCHAR (10)) +
		  ' on ' + CAST (@CurrentMatchDate AS VARCHAR (15)) + 
		  ' generated: $' + CAST (@MatchRevenue AS VARCHAR (20))

	FETCH NEXT FROM RevenueCursor INTO @CurrentMatchID, @CurrentMatchDate
END

CLOSE RevenueCursor
DEALLOCATE RevenueCursor -- Deletes it to free up server memory

GO

-- Triggers

CREATE TABLE TicketAuditLog
(
    LogID INT IDENTITY (1,1) PRIMARY KEY,
    TicketID INT,
    ActionDate DATETIME DEFAULT GETDATE(),
    LogMessage VARCHAR (255)
)

-- AFTER Trigger

GO

CREATE TRIGGER AfterTicketBooked
ON Ticket 
AFTER INSERT
AS
BEGIN
	INSERT INTO TicketAuditLog (TicketID, LogMessage)
	SELECT 
		TicketID, 'New ticket successfully booked and verified'
	FROM inserted -- 'inserted' is a temporary table SQL creates during an INSERT
END

-- To test
EXECUTE BookTicket 'Cristiano', 'Ronaldo', 'cr7@email.com', 1, 950.00, 'VIP-Box-7';

-- Check the log to see if the trigger caught it
SELECT * FROM TicketAuditLog

-- INSTEAD OF Trigger

GO

CREATE TRIGGER PreventedFanDeletion
ON Fan
INSTEAD OF DELETE
AS 
BEGIN 
	/* We are intentionally NOT putting a DELETE command here. 
	   By doing nothing, the original delete is cancelled*/
	PRINT 'Security Alert: You cannot delete Fan profiles directly.',
	PRINT 'If a fan wants to leave, you must mark their account as "Inactive".'
END 

-- Test if it works
DELETE FROM Fan WHERE FanEmail = 'christiaandutoit@gmail.com'

SELECT * FROM Fan WHERE FanEmail = 'christiaandutoit@gmail.com'

-- Security 

-- Authentication

GO
USE master
GO

IF EXISTS (SELECT * FROM sys.server_principals WHERE name = 'TicketAgentLogin')
DROP LOGIN TicketAgentLogin
GO -- Drops the login if you are re-running this script. ONLY when re-running!!!

CREATE LOGIN TicketAgentLogin WITH PASSWORD = 'password' -- This is the keycard to the server with a super secure password
PRINT 'Server Login Created Successfully'
GO

USE Fifa2026_DB -- Switch to Fifa database to create the User and assign permissions
GO

CREATE USER TicketAgentUser FOR LOGIN TicketAgentLogin -- Creates the database badge and link it to the server

ALTER ROLE db_datareader ADD MEMBER TicketAgentUser -- Let them read and write data but NOT delete tables
ALTER ROLE db_datawriter ADD MEMBER TicketAgentUser

PRINT 'Database User Created and Roles Assigned Successfully'
GO

--Encryption

USE Fifa2026_DB
GO

ALTER TABLE Fan -- Add a new column to hold the encrypted data
ADD EncryptedPassport VARBINARY (MAX) -- Must be VARBINARY to hold scrambled ciphertext
GO

UPDATE Fan -- Use ENCRYPTBYPASSPHRASE with a secret key 'FifaSecretKey'
SET EncryptedPassport = ENCRYPTBYPASSPHRASE ('FifaSecretKey', 'PASSPORT-AB123456')
WHERE FanEmail = 'christiaandutoit@gmail.com'
GO

SELECT FanFirstName, FanLastName, FanEmail, -- This shows the scrambled data next to the clean data
EncryptedPassport AS ScrambledData, -- The encryption
CONVERT(VARCHAR (100), DECRYPTBYPASSPHRASE('FifaSecretKey', EncryptedPassport)) AS DecryptedData -- Uses the secret key to translate it back to the text
FROM Fan
WHERE FanEmail = 'christiaandutoit@gmail.com'
GO

-- Backup 
-- This creates a  full backup of the database to the C: drive
/* Windows forbits dropping SQL files into C: files/filepaths so running this script will give an error.
   For the backup I had to manauly go to the files and create a backup there:
   Object Explorer -> Right click Fifa_DB -> hover over tasks -> click backup.
   Then it will give a filepath (the one inserted below) where SQL can create the database without errors*/
BACKUP DATABASE Fifa2026_DB
TO DISK = 'C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\BACKUP\Fifa2026_DB.bak'
WITH FORMAT,
MEDIANAME = 'SQLServerBackups',
NAME = 'Full backup of FIFA 2026 Database'
GO