using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace ToDoList
{
    internal class Program
    {
        static List<string> todos = new List<string>();
        static void Main(string[] args)
        {
            bool running = true;

            while (running)
            { 
                Console.Clear();

                Console.WriteLine("Hello!");
                Console.WriteLine();
                Console.WriteLine("What do you want to do?");
                Console.WriteLine("[S]ee all todo's");
                Console.WriteLine("[A]dd a todo");
                Console.WriteLine("[R]emove a todo");
                Console.WriteLine("[E]xit");
                Console.WriteLine();

                string userInput = Console.ReadLine();

                switch (userInput)
                {
                    case "S":
                    case "s":
                        SeeAllToDo();
                    break;

                    case "A":
                    case "a":
                        AddAToDo();
                    break;

                    case "R":
                    case "r":
                        RemoveAToDo();
                    break;

                    case "E":
                    case "e":
                        Console.WriteLine("Goodbye!");
                        running = false;
                    break;

                    default:
                        Console.Clear();
                        Console.WriteLine("Invalid Input");
                        Console.WriteLine("Press any key to continue");
                        Console.ReadKey();
                    break;
                }

                Console.ReadKey();
            }
        }

        static void SeeAllToDo()
        {
            Console.Clear();

            Console.WriteLine("=== ToDo's ===");
            Console.WriteLine();

            if (todos.Count == 0) 
            {
                Console.WriteLine("No TODO's have been added yet.");
                Console.WriteLine("Press any key to continue");
                Console.WriteLine();
            }

            else 
            {
                for (int i = 0; i < todos.Count; i++)
                {
                    Console.WriteLine($"{i + 1}. {todos[i]}");
                    Console.WriteLine();
                }
            }         
        }

        static void AddAToDo()
        {

            Console.Clear();
            Console.WriteLine("=== Add a ToDo ===");
            Console.WriteLine();
            Console.WriteLine("Enter the todo description: ");
            Console.WriteLine();

            string userInputA = Console.ReadLine();

            if (userInputA == "")
            {
                Console.Clear();
                Console.WriteLine("The description cannot be empty.");
                Console.WriteLine();
                Console.WriteLine("Enter a todo description: ");
                Console.WriteLine();
                userInputA = Console.ReadLine();
            }

            else if (todos.Contains(userInputA))
            {
                Console.Clear();
                Console.WriteLine("The description must be unique.");
                Console.WriteLine();
                Console.WriteLine("Enter a todo description: ");
                Console.WriteLine();
                userInputA = Console.ReadLine();
            }

            else
            {
                Console.WriteLine();
                Console.WriteLine("Description added successfully");
                Console.WriteLine("Press any key to continue");
                todos.Add(userInputA);
            }   
        }

        static void RemoveAToDo()
        {
            Console.Clear();

            Console.WriteLine("=== Remove a ToDo ===");
            Console.WriteLine();
  
            if (todos.Count == 0)
            {
                Console.WriteLine("No TODO's have been added yet.");
                Console.WriteLine("Press any Key to return to the menu");
                return;
            }

            else
            {
                for (int i = 0; i < todos.Count; i++)
                {
                    Console.WriteLine($"{i + 1}. {todos[i]}");
                    Console.WriteLine();
                }
            }

            Console.WriteLine("Select the index of the todo you want to remove: ");
            Console.WriteLine();
            string userInputR = Console.ReadLine();
            int.TryParse(userInputR, out int userNumber);

            if (userNumber == 0)
            {
                Console.Clear();
                Console.WriteLine("Selected index cannot be empty.");
                Console.WriteLine("Press any key to continue");
                Console.WriteLine();
                return;
            }

            while (userNumber > todos.Count)
            {
                Console.Clear();    
                Console.WriteLine("The given index is not valid.");
                Console.WriteLine("Press any key to continue");
                Console.WriteLine();
                return; 
            }

            Console.WriteLine();
            Console.WriteLine($"Todo removed: {todos[userNumber - 1]}");
            todos.RemoveAt(userNumber - 1);
        }      
    }
}
