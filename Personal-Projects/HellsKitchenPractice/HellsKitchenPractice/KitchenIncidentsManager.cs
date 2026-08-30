using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class KitchenIncidentsManager
    {
        public event AlertDelegate KitchenIncidentsAlert;

        List<KitchenAccidents> kitchenAccidentsList = new List<KitchenAccidents>();
        public void AccidentReport()
        {
            Console.WriteLine("===============");
            Console.WriteLine("ACCIDENT REPORT");
            Console.WriteLine("===============");

            Console.WriteLine();

            try
            {
                Console.WriteLine("Enter kitchen accident: ");
                string userInputKitchenAccident = Console.ReadLine();

                Console.WriteLine();

                Console.WriteLine("Enter accident severity: (1-10)");
                int userInputSeverity = int.Parse(Console.ReadLine());
                if (userInputSeverity < 1 || userInputSeverity > 10)
                {
                    throw new KitchenAccidentException($"ERROR: {userInputSeverity} is invalid. Please use a number between 1-10");
                }

                Console.WriteLine($"{userInputKitchenAccident} has been successfully added with an severity of {userInputSeverity}.");

                KitchenAccidents newKitchenAccidents = new KitchenAccidents(userInputKitchenAccident, userInputSeverity);
                kitchenAccidentsList.Add(newKitchenAccidents);
            }
            catch (KitchenAccidentException customError)
            {
                Console.WriteLine(customError.Message);
            }
            catch (FormatException)
            {
                Console.WriteLine("ERROR: Severity must be an number.");
            }
            catch (Exception) 
            {
                Console.WriteLine("ERROR: An unexpected error has occured. Please try again");
            }

            if (KitchenIncidentsAlert != null)
            {
                KitchenIncidentsAlert($"ALERT: An accident has occured in the kitchen!");
            }
        }

        public void viewAll()
        {
            foreach (var item in kitchenAccidentsList)
            {
                Console.WriteLine($"Accident: {item.KitchenAccident1} | Severity: {item.AccidentSeverity}");   
            }
        }
    }
}
