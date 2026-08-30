using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class ManageDishes
    {
        List<DishesAndKitchenStations> dishesAndKitchenStationsList = new List<DishesAndKitchenStations>();

        public void DishManagement()
        {
            Console.WriteLine("===============");
            Console.WriteLine("Dish Management");
            Console.WriteLine("===============");

            Console.WriteLine();

            Console.WriteLine("Enter dish name: ");
            string userInputDishName = Console.ReadLine();

            Console.WriteLine();

            Console.WriteLine("Enter dish Category: ");
            string userInputDishCategory = Console.ReadLine();

            Console.WriteLine();

            Console.WriteLine("Enter preperation time: ");
            int userInputPrepTimer = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter dish difficulty: ");
            int userInputDifficulty = int.Parse(Console.ReadLine());

            Console.WriteLine();

            Console.WriteLine("Enter assigned contestant: ");
            string userInputAssignedContestant = Console.ReadLine();

            Console.WriteLine();

            Console.WriteLine("Enter kitchen Station: ");
            string userInputKitchenStation = Console.ReadLine();

            Console.WriteLine();

            Console.WriteLine("======================");
            Console.WriteLine("Select Kitchen Station");
            Console.WriteLine("======================");

            Console.WriteLine();

            Console.WriteLine("Select an option: ");
            Console.WriteLine("1. Grill Station \n2. Fish Station \n3. Garnish Station \n4. Dessert Station");

            string userChoice = Console.ReadLine();

            switch (userChoice)
            {
                case "1":
                    GrillStation newGrillStation = new GrillStation(userInputDishName, userInputDishCategory, userInputPrepTimer, userInputDifficulty, userInputAssignedContestant, userInputKitchenStation);    
                    dishesAndKitchenStationsList.Add(newGrillStation);
                    Console.WriteLine("Successfully added to Grill Station");
                break;
                case "2":
                    FishStation newFishStation = new FishStation(userInputDishName, userInputDishCategory, userInputPrepTimer, userInputDifficulty, userInputAssignedContestant, userInputKitchenStation);
                    dishesAndKitchenStationsList.Add(newFishStation);
                    Console.WriteLine("Successfully added to Fish Station");
                break;
                case "3":
                    GarnishStation newGarnishStation = new GarnishStation(userInputDishName, userInputDishCategory, userInputPrepTimer, userInputDifficulty, userInputAssignedContestant, userInputKitchenStation);
                    dishesAndKitchenStationsList.Add(newGarnishStation);
                    Console.WriteLine("Successfully added to Garnish Station");
                break;
                case "4":
                    DessertStation newDesertStation = new DessertStation(userInputDishName, userInputDishCategory, userInputPrepTimer, userInputDifficulty, userInputAssignedContestant, userInputKitchenStation);
                    dishesAndKitchenStationsList.Add(newDesertStation);
                    Console.WriteLine("Successfully added to Dessert Station");
                break;
                default:
                    Console.WriteLine("Invalid option");    
                break;
            }
        }
    }
}
