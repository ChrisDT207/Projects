using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class ContestantManager
    {
        public event AlertDelegate ContestantAdded;

        List<Contestants> contestantsList = new List<Contestants>();
        public void RegisterContestantsMenu()
        {
            Console.WriteLine("===================="); 
            Console.WriteLine("REGISTER CONTESTANTS");
            Console.WriteLine("====================");

            Console.WriteLine();

            Console.WriteLine("Enter Contestant Number: ");
            int userInputNumber = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter Contestant Name: ");
            string userInputName = Console.ReadLine();

            Console.WriteLine();

            Console.WriteLine("Enter Contestant Age: ");
            int userInputAge = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter Contestant Cooking Expiernce (Years): ");
            int userInputCookingExpiernceYears = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter Contestant Team: ");
            string userInputTeam = Console.ReadLine();

            Console.WriteLine();

            Console.Clear();

            Console.WriteLine("====================");
            Console.WriteLine("CONTESTANT SPECIALTY");
            Console.WriteLine("====================");

            Console.WriteLine();

            Console.WriteLine("Choose Contestant Specialty: ");
            Console.WriteLine("1. Pastry \n2. Seafood \n3. Grill \n4. Italian \n5. Asian");

            Console.WriteLine();

            string userChoice = Console.ReadLine();

            switch (userChoice)
            {
                case "1":
                    Pastry newPastryContestant = new Pastry(userInputNumber,userInputName,userInputAge,userInputCookingExpiernceYears,userInputTeam);
                    contestantsList.Add(newPastryContestant);
                break;
                case "2":
                    Seafood newSeafoodContestant = new Seafood(userInputNumber, userInputName, userInputAge, userInputCookingExpiernceYears, userInputTeam);
                    contestantsList.Add(newSeafoodContestant);
                break;
                case "3":
                    Grill newGrillContestant = new Grill(userInputNumber, userInputName, userInputAge, userInputCookingExpiernceYears, userInputTeam);
                    contestantsList.Add(newGrillContestant);
                break;
                case "4":
                    Italian newItalianContestant = new Italian(userInputNumber, userInputName, userInputAge, userInputCookingExpiernceYears, userInputTeam);
                    contestantsList.Add(newItalianContestant);
                break;
                case "5":
                    Asian newAsianContestant = new Asian(userInputNumber, userInputName, userInputAge, userInputCookingExpiernceYears, userInputTeam);
                    contestantsList.Add(newAsianContestant);
                break;
                default:
                    Console.WriteLine("Inavlid Input, please try again");
                break;
            }

            if (ContestantAdded != null)
            {
                ContestantAdded($"ALERT: New contestant {userInputName} has been added to the list");
                Console.ReadKey();
            }
        }

        public void ViewContestants()
        {
            Console.Clear(); 

            Console.WriteLine("================");
            Console.WriteLine("VIEW CONTESTANTS");
            Console.WriteLine("================");

            Console.WriteLine("");

            if (contestantsList.Count == 0)
            {
                Console.WriteLine("No contestants listed, please add contestants");    
            }

            foreach (var item in contestantsList)
            {
                item.Specialty();
            }

            Console.ReadKey();
        }
    }
}
