using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class CreateServices
    {
        public event AlertDelegate CreateServicesAlert;

        List<ResturantServices> resturantServicesList = new List<ResturantServices>();
        public void CreateService()
        {
            Console.WriteLine("===============");
            Console.WriteLine("CREATE SERVICES");
            Console.WriteLine("===============");

            Console.WriteLine();

            Console.WriteLine("Enter service Number: ");
            int userInputNumber = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter number of Guests: ");
            int userInputGuests = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter service type: ");
            string userInputServiceType = Console.ReadLine();

            Console.WriteLine();

            Console.WriteLine("Enter time limit: ");
            int userInputTimeLimit = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter current status: ");
            string userInputCurrentStatus = Console.ReadLine();

            Console.WriteLine();

            Console.Clear();

            Console.WriteLine("===============");
            Console.WriteLine("Kitchen Service");
            Console.WriteLine("===============");

            Console.WriteLine();

            Console.WriteLine("Choose Service: ");
            Console.WriteLine("1. Standard Service \n2. VIP Service \n3.Challenge Service");

            Console.WriteLine();

            string userInputChoice = Console.ReadLine();

            switch (userInputChoice)
            {
                case "1":
                    StandardService standardService = new StandardService(userInputNumber, userInputGuests, userInputServiceType, userInputTimeLimit, userInputCurrentStatus);
                    resturantServicesList.Add(standardService);
                break;
                case "2":
                    VIPService vipService = new VIPService(userInputNumber, userInputGuests, userInputServiceType, userInputTimeLimit, userInputCurrentStatus);
                    resturantServicesList.Add(vipService);
                break;
                case "3":
                    Challenge challengeService = new Challenge(userInputNumber, userInputGuests, userInputServiceType, userInputTimeLimit, userInputCurrentStatus);
                    resturantServicesList.Add(challengeService);
                break;
                default:
                    Console.WriteLine("Invalid input");
                break;
            }

            if (CreateServicesAlert != null)
            {
                CreateServicesAlert($"ALERT: New service {userInputServiceType} has been added to the list.");
                Console.ReadKey();
            }
        }
    }
}
