using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    abstract class DishesAndKitchenStations
    {
        private string dishName;
        private string category;
        private int preperationTime;
        private int difficulty;
        private string assignedContestant;
        private string kitchenStation;

        protected DishesAndKitchenStations(string dishName, string category, int preperationTime, int difficulty, string assignedContestant, string kitchenStation)
        {
            this.DishName = dishName;
            this.Category = category;
            this.PreperationTime = preperationTime;
            this.Difficulty = difficulty;
            this.AssignedContestant = assignedContestant;
            this.KitchenStation = kitchenStation;
        }

        public string DishName { get => dishName; set => dishName = value; }
        public string Category { get => category; set => category = value; }
        public int PreperationTime { get => preperationTime; set => preperationTime = value; }
        public int Difficulty { get => difficulty; set => difficulty = value; }
        public string AssignedContestant { get => assignedContestant; set => assignedContestant = value; }
        public string KitchenStation { get => kitchenStation; set => kitchenStation = value; }

        public abstract void Dishes();
        
    }
}
