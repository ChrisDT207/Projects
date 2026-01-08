using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiceRoller_D_D_
{
    internal class Program
    {
        enum Dices
        {
            D4 = 1,
            D6,
            D8,
            D10,
            D12,
            D20,
            D100,
            Exit
        }

        static void Main(string[] args)
        {
            Random dice = new Random();
            int d4 = dice.Next(1, 5);
            int d6 = dice.Next(1, 7);
            int d8 = dice.Next(1, 9);
            int d10 = dice.Next(1, 11);
            int d12 = dice.Next(1, 13);
            int d20 = dice.Next(1, 21);
            int d100 = dice.Next(1, 101);

            bool running = true;

            while (running)
            {
                for (int i = 1; i <= Enum.GetValues(typeof(Dices)).Length; i++)
                {
                    Console.WriteLine($"{i}. {Enum.GetName(typeof(Dices), i)}");
                }

                int choices = int.Parse(Console.ReadLine());

                switch (choices)
                {
                    case 1:
                        Console.WriteLine($"Your roll is: {d4}");
                    break;

                    case 2:
                        Console.WriteLine($"Your roll is: {d6}");
                    break;

                    case 3:
                        Console.WriteLine($"Your roll is: {d8}");
                    break;

                    case 4:
                        Console.WriteLine($"Your roll is: {d10}");
                    break;

                    case 5:
                        Console.WriteLine($"Your roll is: {d12}");
                    break;

                    case 6:
                        Console.WriteLine($"Your roll is: {d20}");
                    break;

                    case 7:
                        Console.WriteLine($"Your roll is: {d100}");
                        break;

                    case 8:
                        running = false;
                    break;
                }

                Console.ReadLine();
                Console.Clear();
            }
        }
    }
}
