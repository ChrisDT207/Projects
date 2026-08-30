using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    public delegate void AlertDelegate(string message);
    internal class Program
    {
        static void Main(string[] args)
        {
            ContestantManager manager = new ContestantManager();
            CreateServices services = new CreateServices();
            ManageDishes dishes = new ManageDishes();
            KitchenIncidentsManager kitchenAccidents = new KitchenIncidentsManager();

            manager.ContestantAdded += DisplayAlert;
            services.CreateServicesAlert += DisplayAlert;
            kitchenAccidents.KitchenIncidentsAlert += DisplayAlert;

            bool running = true;

            while (running)
            {
                Console.WriteLine("======================");
                Console.WriteLine("HELL'S KITCHEN CONTROL");
                Console.WriteLine("======================");

                Console.WriteLine();

                Console.WriteLine("1. Register Contestants"); // done
                Console.WriteLine("2. View Contestants"); // done
                Console.WriteLine("3. Create Service"); // done
                Console.WriteLine("4. Manage Dishes"); // done
                Console.WriteLine("5. Record Kitchen Incident"); // done
                Console.WriteLine("6. View Kitchen Information"); // done
                Console.WriteLine("7. Start Service Simulation"); // EVENT!!!
                Console.WriteLine("8. Exit"); // done

                string userChoice = Console.ReadLine();

                switch (userChoice)
                {
                    case "1":
                        Console.Clear();
                        manager.RegisterContestantsMenu();
                    break;
                    case "2":
                        Console.Clear();
                        manager.ViewContestants();
                    break;
                    case "3":
                        Console.Clear();
                        services.CreateService();
                    break;
                    case "4":
                        Console.Clear();
                        dishes.DishManagement();
                    break;
                    case "5":
                        Console.Clear();
                        kitchenAccidents.AccidentReport();
                    break;
                    case "6":
                        Console.Clear();
                        kitchenAccidents.viewAll();
                    break;
                    case "7":
                        Console.Clear();

                    break;
                    case "8":
                        Console.Clear();
                        running = false;
                    break;
                    default:
                        Console.Clear();
                        Console.WriteLine("ERROR: Invalid Input");    
                    break;
                }
            }
        }

        static void DisplayAlert(string message)
        {
            Console.WriteLine();
            Console.WriteLine(message);
        }
    }
}
