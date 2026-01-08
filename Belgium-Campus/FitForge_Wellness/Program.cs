using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject
{
    internal class Program
    {
        enum MenuOptions 
        {
            CaptureMemberDetails = 1,
            CheckWellnessRewardQualification,
            ShowStats,
            SaveToFile,
            Exit
        }
        // These lists store information about all the members who apply for the wellness reward
           static List<string> names = new List<string>(); 
           static List<int> ages = new List<int>(); // = new list ensures that the list is empty when the program starts
           static List<int> ranks = new List<int>();
           static List<DateTime> joinDates = new List<DateTime>();
           static List<int> smoothiesPurchased = new List<int>();
           static List<double> treadmillDistances = new List<double>();
           static List<bool> isEmployed = new List<bool>();
           static List<string> favouriteSmoothies = new List<string>();
           static List<int> totalSmoothies = new List<int>(); 
           static List<int> qualifiedIndexes = new List<int>(); 

        static void Main(string[] args) // using void because program captures, process and display and doesnt need an result
        {
            bool running = true; 
            while (running)
            {
                Console.Clear(); 

                Console.WriteLine("===== FitForge Wellness Centre =====");
                Console.WriteLine("1. Capture Member Details");
                Console.WriteLine("2. Check Wellness Reward Qualification");
                Console.WriteLine("3. Show FitForge Stats");
                Console.WriteLine("4. Save Member Details to File");
                Console.WriteLine("5. Exit");
                Console.Write("Choose an option: ");

                if (Enum.TryParse(Console.ReadLine(), out MenuOptions choice)) // reads the users input and convert it into a value from enum (TryParse)
                {
                    switch (choice) 
                    {
                        case MenuOptions.CaptureMemberDetails:
                            CaptureMemberDetails();
                            break;
                        case MenuOptions.CheckWellnessRewardQualification: 
                            CheckQualification();
                            break;
                        case MenuOptions.ShowStats:
                            ShowStats();
                            break;
                        case MenuOptions.SaveToFile:
                            SaveMemberDetailsToFile(); // Save member details to file
                            break;
                        case MenuOptions.Exit:
                            running = false; // Stops Loop
                            break;
                        default: //Not expected in the options
                            Console.WriteLine("Invalid option. Press Enter to try again.");
                            Console.ReadLine();
                            break;
                    }
                }
                else
                {
                    Console.WriteLine("Invalid input. Press Enter to try again.");
                    Console.ReadLine(); // When user input invalid input
                }
            }
        }

        static void CaptureMemberDetails() 
        {
            Console.Clear();

            string more = "Y";
            while (more.ToUpper() == "Y") // Loop to capture multiple members if Y 
            { // From List
                Console.Write("Enter name: ");
                names.Add(Console.ReadLine());

                Console.Write("Enter age: ");
                ages.Add(int.Parse(Console.ReadLine()));

                Console.Write("Enter membership rank: ");
                ranks.Add(int.Parse(Console.ReadLine()));

                Console.Write("Enter join date (yyyy-MM-dd): ");
                joinDates.Add(DateTime.Parse(Console.ReadLine()));

                Console.Write("Enter number of smoothies purchased: ");
                smoothiesPurchased.Add(int.Parse(Console.ReadLine()));

                Console.Write("Enter treadmill distance (km): ");
                treadmillDistances.Add(double.Parse(Console.ReadLine()));

                Console.Write("Are they employed? (Y/N): ");
                isEmployed.Add(Console.ReadLine().ToUpper() == "Y");

                Console.Write("Enter favourite smoothie flavour: ");
                favouriteSmoothies.Add(Console.ReadLine());

                Console.Write("Enter total smoothies consumed since joining: ");
                totalSmoothies.Add(int.Parse(Console.ReadLine()));

                Console.Write("Do you want to enter another applicant? (Y/N): ");
                more = Console.ReadLine();
            } // Back to the lobby
        }

        static void CheckQualification() 
        {
            Console.Clear();
            qualifiedIndexes.Clear();

            for (int i = 0; i < names.Count; i++) // Loop through all members in list, I is index for current member
            {
                int months = ((DateTime.Now.Year - joinDates[i].Year) * 12) + DateTime.Now.Month - joinDates[i].Month;
                double smoothiesPerMonth = months > 0 ? (double)totalSmoothies[i] / months : 0; // devides smoothies per month
                bool employedOrGuardian = isEmployed[i] || (ages[i] < 18); 
                bool longEnough = (DateTime.Now - joinDates[i]).TotalDays >= 730; // checks if member is a member for more than 2 years
                bool goodPerformance = ranks[i] > 2000 || treadmillDistances[i] > 20;
                bool healthySmoothieRate = smoothiesPerMonth >= 4;
                bool tooMuchSmoothies = smoothiesPerMonth > 20;
                bool badFlavour = favouriteSmoothies[i].ToLower() == "chocochurned chaos";

                if (employedOrGuardian && longEnough && goodPerformance && healthySmoothieRate && !tooMuchSmoothies && !badFlavour) 
                {
                    qualifiedIndexes.Add(i); // Add index of qualified member
                }
            }

            Console.WriteLine("Qualification check complete. Press Enter to return to the main menu."); 
            Console.ReadLine();
        }

        static void ShowStats() // Method to show statistics
        {
            Console.Clear(); 

            Console.WriteLine("===== FitForge Stats =====");
            Console.WriteLine($"Total Members: {names.Count}"); // .Count gives items in that list
            Console.WriteLine($"Qualified Members: {qualifiedIndexes.Count}"); // $ lets it sees as code
            Console.WriteLine($"Not Qualified: {names.Count - qualifiedIndexes.Count}");
            Console.WriteLine($"Press Enter to return to the main menu.");
            Console.ReadLine();


        }
            static void SaveMemberDetailsToFile() 
        {
            Console.Clear();
            string filePath = "FitForgeMembers.txt"; // Variable to File path to save the details

            using (StreamWriter writer = new StreamWriter(filePath, true)) // Using statement to ensure the file is closed after writing 
            {
                writer.WriteLine("===== FitForge Wellness Centre Members ====="); 
                writer.WriteLine($"Total Members: {names.Count}");
                writer.WriteLine($"Qualified Members: {qualifiedIndexes.Count}");
                writer.WriteLine($"Not Qualified Members: {names.Count - qualifiedIndexes.Count}");
                writer.WriteLine("-------------------------------------------------");

                for (int i = 0; i < names.Count; i++) // Loop through all the members
                {
                    writer.WriteLine($"Name: {names[i]}"); // Uses StreamWriter to store the details in the file
                    writer.WriteLine($"Age: {ages[i]}");
                    writer.WriteLine($"Membership Rank: {ranks[i]}");
                    writer.WriteLine($"Join Date: {joinDates[i]:yyyy-MM-dd}");
                    writer.WriteLine($"Smoothies Purchased: {smoothiesPurchased[i]}");
                    writer.WriteLine($"Treadmill Distance: {treadmillDistances[i]} km");
                    writer.WriteLine($"Employed: {(isEmployed[i] ? "Yes" : "No")}");
                    writer.WriteLine($"Favourite Smoothie: {favouriteSmoothies[i]}");
                    writer.WriteLine($"Total Smoothies: {totalSmoothies[i]}");
                    writer.WriteLine($"Qualified: {(qualifiedIndexes.Contains(i) ? "YES" : "NO")}");
                    writer.WriteLine("-------------------------------------------------");
                }
            }

            Console.WriteLine("Member details saved successfully to 'FitForgeMembers.txt'. Press Enter to return to the main menu.");
            Console.ReadLine();
        }
    }   
}

