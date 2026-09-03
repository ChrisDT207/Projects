using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class KitchenServiceSimulation
    {
        public event AlertDelegate OnAlertThread;

        public void CookDish(string contestant, string station, int cookingTime)
        {
            Console.WriteLine($"{contestant} started cooking at the {station} station");

            Thread.Sleep(cookingTime);

            Console.WriteLine($"{contestant} has finished cooking at the {station}");

            if (OnAlertThread != null)
            {
                Console.WriteLine($"ALERT: {contestant}'s dish is ready");
                Console.ReadKey();
            }
        }

        public void Simulation()
        { 
            Console.WriteLine($"=========================");
            Console.WriteLine($"HELL'S KITCHEN SIMULATION");
            Console.WriteLine($"=========================");

            Console.WriteLine();

            Console.WriteLine("Dinner service started! Orders coming in");

            Thread worker1 = new Thread(() => CookDish("Contestant 12", "Grill", 5000));
            Thread worker2 = new Thread(() => CookDish("Contestant 7", "Seafood", 3000));
            Thread worker3 = new Thread(() => CookDish("Contestant 14", "Orange", 9000));

            worker1.Start();
            worker2.Start();
            worker3.Start();

            worker1.Join();
            worker2.Join();
            worker3.Join();

            Console.WriteLine();

            Console.WriteLine("All dishes has been completed");
            Console.ReadKey();
        }
    }
}
