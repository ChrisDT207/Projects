using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class GarnishStation : DishesAndKitchenStations
    {
        public GarnishStation(string dishName, string category, int preperationTime, int difficulty, string assignedContestant, string kitchenStation) : base(dishName, category, preperationTime, difficulty, assignedContestant, kitchenStation)
        {
        }

        public override void Dishes()
        {
            Console.WriteLine($"Dish name: {DishName} | Category: {Category} | Preperation Time: {PreperationTime} | Difficulty: {Difficulty} | Assigned Contestant: {AssignedContestant} | Kitchen Station: {KitchenStation}");
        }
    }
}
